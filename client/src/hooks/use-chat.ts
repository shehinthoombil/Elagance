import { useState, useCallback } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { ChatRequest, ChatResponse } from "@shared/schema";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  htmlContent?: string;
  timestamp: Date;
  isLoading?: boolean;
  
}

export function useChat() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const queryClient = useQueryClient();

  // Get welcome message
  const { data: welcomeData } = useQuery<{ htmlContent: string }>({
    queryKey: ["/api/welcome"],
    staleTime: Infinity,
  });

  // Initialize with welcome message
  const initializeChat = useCallback(() => {
    if (welcomeData?.htmlContent && messages.length === 0) {
      setMessages([{
        id: "welcome",
        role: "assistant",
        content: "Welcome to TechCorp!",
        htmlContent: welcomeData.htmlContent,
        timestamp: new Date(),
      }]);
    }
  }, [welcomeData, messages.length]);

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: async (request: ChatRequest): Promise<ChatResponse> => {
      const response = await apiRequest("POST", "/api/chat", request);
      return response.json();
    },
    onSuccess: (data) => {
      // Remove loading message and add actual response
      setMessages(prev => {
        const filtered = prev.filter(msg => !msg.isLoading);
        return [...filtered, {
          id: data.id.toString(),
          role: data.role,
          content: data.content,
          htmlContent: data.htmlContent,
          timestamp: new Date(data.createdAt),
        }];
      });
      
      // Update session ID if it's new
      if (data.sessionId && !sessionId) {
        setSessionId(data.sessionId);
      }
    },
    onError: (error) => {
      // Remove loading message and show error
      setMessages(prev => {
        const filtered = prev.filter(msg => !msg.isLoading);
        return [...filtered, {
          id: `error-${Date.now()}`,
          role: "assistant",
          content: "I apologize, but I'm having trouble responding right now. Please try again.",
          htmlContent: `<div class="bg-red-50 border border-red-200 rounded-lg p-4">
            <div class="flex items-center">
              <i class="fas fa-exclamation-triangle text-red-500 mr-2"></i>
              <p class="text-red-800 text-sm">
                <strong>Error:</strong> ${error instanceof Error ? error.message : "Failed to send message"}
              </p>
            </div>
          </div>`,
          timestamp: new Date(),
        }];
      });
    },
  });

  const sendMessage = useCallback((content: string) => {
    if (!content.trim()) return;

    // Add user message immediately
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: content.trim(),
      timestamp: new Date(),
    };

    // Add loading message
    const loadingMessage: ChatMessage = {
      id: `loading-${Date.now()}`,
      role: "assistant",
      content: "AI is crafting your response...",
      timestamp: new Date(),
      isLoading: true,
    };

    setMessages(prev => [...prev, userMessage, loadingMessage]);

    // Send to API
    sendMessageMutation.mutate({
      message: content.trim(),
      sessionId: sessionId || undefined,
    });
  }, [sessionId, sendMessageMutation]);

  return {
    messages,
    sendMessage,
    isLoading: sendMessageMutation.isPending,
    initializeChat,
    sessionId,
  };
}
