import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { generateChatResponse } from "./services/chatService";

export async function registerRoutes(app: Express): Promise<Server> {
  app.options('/api/chat', (req: Request, res: Response) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.sendStatus(200);
  });

  app.post('/api/chat', async (req: Request, res: Response) => {
    try {
      const { message, language, conversationHistory } = req.body;

      if (!message || typeof message !== 'string' || !message.trim()) {
        return res.status(400).json({ error: 'Message is required' });
      }

      if (!language || (language !== 'en' && language !== 'ar')) {
        return res.status(400).json({ error: 'Valid language is required (en or ar)' });
      }

      const result = await generateChatResponse({
        message: message.trim(),
        language,
        conversationHistory
      });

      res.json({
        response: result.response,
        success: result.success
      });
    } catch (error: any) {
      res.status(500).json({ 
        error: 'Internal server error',
        response: 'I apologize, but I encountered an error. Please try again or contact us directly.'
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
