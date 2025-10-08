import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { generateChatResponse, generateWelcomeMessage } from "./services/openai";
import { chatRequestSchema, type ChatResponse } from "@shared/schema";
import { nanoid } from "nanoid";

export async function registerRoutes(app: Express): Promise<Server> {
  // Chat endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, sessionId } = chatRequestSchema.parse(req.body);
      
      // Get or create session
      const currentSessionId = sessionId || nanoid();
      let conversation = await storage.getConversation(currentSessionId);
      
      if (!conversation) {
        conversation = await storage.createConversation({
          sessionId: currentSessionId,
        });
      }

      // Save user message
      await storage.createMessage({
        conversationId: conversation.id,
        role: "user",
        content: message,
        htmlContent: null,
        metadata: null,
      });

      // Get conversation history for context
      const history = await storage.getConversationHistory(currentSessionId);
      const conversationContext = history.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      // Generate AI response
      const htmlResponse = await generateChatResponse(message, conversationContext);

      // Save AI message
      const aiMessage = await storage.createMessage({
        conversationId: conversation.id,
        role: "assistant",
        content: message, // Store original user message for context
        htmlContent: htmlResponse,
        metadata: null,
      });

      const response: ChatResponse = {
        id: aiMessage.id,
        role: "assistant",
        content: aiMessage.content,
        htmlContent: aiMessage.htmlContent || undefined,
        sessionId: currentSessionId,
        createdAt: aiMessage.createdAt.toISOString(),
      };

      res.json(response);
    } catch (error) {
      console.error("Chat API error:", error);
      res.status(500).json({ 
        message: error instanceof Error ? error.message : "Failed to process chat message" 
      });
    }
  });

  // Get conversation history
  app.get("/api/conversation/:sessionId", async (req, res) => {
    try {
      const { sessionId } = req.params;
      const messages = await storage.getConversationHistory(sessionId);
      
      const formattedMessages = messages.map(msg => ({
        id: msg.id,
        role: msg.role,
        content: msg.content,
        htmlContent: msg.htmlContent || undefined,
        createdAt: msg.createdAt.toISOString(),
      }));

      res.json(formattedMessages);
    } catch (error) {
      console.error("Get conversation error:", error);
      res.status(500).json({ 
        message: "Failed to retrieve conversation" 
      });
    }
  });

  // Get welcome message
  app.get("/api/welcome", async (req, res) => {
    try {
      const welcomeHtml = await generateWelcomeMessage();
      res.json({ htmlContent: welcomeHtml });
    } catch (error) {
      console.error("Welcome message error:", error);
      res.status(500).json({ 
        message: "Failed to generate welcome message" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
