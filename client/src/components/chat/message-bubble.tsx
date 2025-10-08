import { memo, useCallback } from "react";
import type { ChatMessage } from "@/hooks/use-chat";
import { TypingIndicator } from "./typing-indicator";
import DOMPurify from "dompurify";

interface MessageBubbleProps {
  message: ChatMessage;
  onLinkClick?: (topic: string) => void;
}

export const MessageBubble = memo(function MessageBubble({ message, onLinkClick }: MessageBubbleProps) {
  if (message.isLoading) {
    return <TypingIndicator />
  }

  if (message.role === "user") {
    return (
      <div className="flex items-start space-x-3 justify-end animate-in slide-in-from-bottom-4 duration-300">
        <div className="bg-primary text-white rounded-xl shadow-sm p-4 max-w-xs lg:max-w-md">
          <p className="whitespace-pre-wrap">{message.content}</p>
        </div>
        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
          <i className="fas fa-user text-gray-600 text-sm"></i>
        </div>
      </div>
    );
  }

  // Handle internal link and button clicks
  const handleClick = useCallback((e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const clickable = target.closest('a[data-topic], button[data-topic]');

    if (clickable && onLinkClick) {
      e.preventDefault();
      const topic = clickable.getAttribute('data-topic');
      if (topic) {
        onLinkClick(topic);
      }
    }
  }, [onLinkClick]);

  // Assistant message with HTML content
  const cleanedHtml = message.htmlContent
    ? message.htmlContent
      .replace(/^```html\s*/gi, '')
      .replace(/^```\s*/gi, '')
      .replace(/```html\s*/gi, '')
      .replace(/```\s*/gi, '')
      .replace(/```\s*$/gi, '')
      .replace(/```/gi, '')
      .replace(/`{3,}html/gi, '')
      .replace(/`{3,}/gi, '')
      .trim()
    : null;

  const sanitizedHtml = cleanedHtml
    ? DOMPurify.sanitize(cleanedHtml, {
      ALLOWED_TAGS: [
        'div', 'span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'strong', 'em', 'u', 'b', 'i', 'br',
        'img', 'video', 'audio', 'source',
        'table', 'thead', 'tbody', 'tr', 'th', 'td',
        'ul', 'ol', 'li',
        'button', 'a',
        'svg', 'path', 'circle', 'rect', 'g'
      ],
      ALLOWED_ATTR: [
        'class', 'id', 'style',
        'src', 'alt', 'width', 'height',
        'href', 'target', 'rel', 'data-topic',
        'controls', 'autoplay', 'loop', 'muted',
        'type', 'poster',
        'viewBox', 'd', 'fill', 'stroke', 'stroke-width'
      ],
      ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|data):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))|^#$/i
    })
    : null;

  return (
    <div className="flex items-start space-x-3 animate-in slide-in-from-bottom-4 duration-300">
      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
        <i className="fas fa-robot text-white text-sm"></i>
      </div>
      <div className="bg-primary text-white rounded-xl shadow-sm p-4 max-w-md lg:max-w-lg">
        {sanitizedHtml ? (
          <div
            className="prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
            onClick={handleClick}
          />
        ) : (
          <p className="text-gray-600 whitespace-pre-wrap">{message.content}</p>
        )}
      </div>
    </div>
  );
});
