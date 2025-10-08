import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  className?: string;
}

export function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const autoResize = useCallback(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = Math.min(textarea.scrollHeight, 128) + "px";
    }
  }, []);

  useEffect(() => {
    autoResize();
  }, [message, autoResize]);

  const handleSend = useCallback(() => {
    const trimmedMessage = message.trim();
    if (trimmedMessage && !isLoading) {
      onSendMessage(trimmedMessage);
      setMessage("");
    }
  }, [message, onSendMessage, isLoading]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }, [handleSend]);

  const characterCount = message.length;
  const isOverLimit = characterCount > 2000;
  const canSend = message.trim() && !isLoading && !isOverLimit;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
      <div className="max-w-4xl mx-auto p-4">
        <div className="flex items-end space-x-3">
          <div className="flex-1 relative">
            <Textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me about Eleganza apartments, pricing, amenities, or location benefits..."
              className="resize-none min-h-[48px] max-h-32 pr-12"
              rows={1}
              disabled={isLoading}
            />
            <Button
              onClick={handleSend}
              disabled={!canSend}
              size="sm"
              className="absolute right-2 bottom-2 w-8 h-8 p-0 rounded-full"
            >
              <i className="fas fa-paper-plane text-sm"></i>
            </Button>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="p-3 text-gray-500 hover:text-gray-700"
            disabled
          >
            <i className="fas fa-microphone"></i>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="p-3 text-gray-500 hover:text-gray-700"
            disabled
          >
            <i className="fas fa-paperclip"></i>
          </Button>
        </div>
        <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
          <span>Press Enter to send • Shift+Enter for new line</span>
          <span className={isOverLimit ? "text-red-500" : ""}>
            {characterCount}/2000
          </span>
        </div>
      </div>
    </div>
  );
}
