// import { memo, useCallback } from "react";
// import type { ChatMessage } from "@/hooks/use-chat";
// import { TypingIndicator } from "./typing-indicator";
// import DOMPurify from "dompurify";

// interface MessageBubbleProps {
//   message: ChatMessage;
//   onLinkClick?: (topic: string) => void;
// }

// export const MessageBubble = memo(function MessageBubble({ message, onLinkClick }: MessageBubbleProps) {
//   if (message.isLoading) {
//     return <TypingIndicator />
//   }

//   if (message.role === "user") {
//     return (
//       <div className="flex items-start space-x-3 justify-end animate-in slide-in-from-bottom-4 duration-300">
//         <div className="bg-primary text-white rounded-xl shadow-sm p-4 max-w-xs lg:max-w-md">
//           <p className="whitespace-pre-wrap">{message.content}</p>
//         </div>
//         <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
//           <i className="fas fa-user text-gray-600 text-sm"></i>
//         </div>
//       </div>
//     );
//   }

//   // Handle internal link and button clicks
//   const handleClick = useCallback((e: React.MouseEvent) => {
//     const target = e.target as HTMLElement;
//     const clickable = target.closest('a[data-topic], button[data-topic]');

//     if (clickable && onLinkClick) {
//       e.preventDefault();
//       const topic = clickable.getAttribute('data-topic');
//       if (topic) {
//         onLinkClick(topic);
//       }
//     }
//   }, [onLinkClick]);

//   // Assistant message with HTML content
//   const cleanedHtml = message.htmlContent
//     ? message.htmlContent
//       .replace(/^```html\s*/gi, '')
//       .replace(/^```\s*/gi, '')
//       .replace(/```html\s*/gi, '')
//       .replace(/```\s*/gi, '')
//       .replace(/```\s*$/gi, '')
//       .replace(/```/gi, '')
//       .replace(/`{3,}html/gi, '')
//       .replace(/`{3,}/gi, '')
//       .trim()
//     : null;

//   const sanitizedHtml = cleanedHtml
//     ? DOMPurify.sanitize(cleanedHtml, {
//       ALLOWED_TAGS: [
//         'div', 'span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
//         'strong', 'em', 'u', 'b', 'i', 'br',
//         'img', 'video', 'audio', 'source',
//         'table', 'thead', 'tbody', 'tr', 'th', 'td',
//         'ul', 'ol', 'li',
//         'button', 'a',
//         'svg', 'path', 'circle', 'rect', 'g'
//       ],
//       ALLOWED_ATTR: [
//         'class', 'id', 'style',
//         'src', 'alt', 'width', 'height',
//         'href', 'target', 'rel', 'data-topic',
//         'controls', 'autoplay', 'loop', 'muted',
//         'type', 'poster',
//         'viewBox', 'd', 'fill', 'stroke', 'stroke-width'
//       ],
//       ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|data):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))|^#$/i
//     })
//     : null;

//   return (
//     <div className="flex items-start space-x-3 animate-in slide-in-from-bottom-4 duration-300">
//       <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
//         <i className="fas fa-robot text-white text-sm"></i>
//       </div>
//       <div className="bg-primary text-white rounded-xl shadow-sm p-4 max-w-md lg:max-w-lg">
//         {sanitizedHtml ? (
//           <div
//             className="prose prose-sm max-w-none"
//             dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
//             onClick={handleClick}
//           />
//         ) : (
//           <p className="text-gray-600 whitespace-pre-wrap">{message.content}</p>
//         )}
//       </div>
//     </div>
//   );
// });


// message-bubble.jsx
import { memo, useCallback } from "react";
import { Home, Building2, Bed, MapPin } from 'lucide-react';
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

  // USER MESSAGE - Keep your existing code
  if (message.role === "user") {
    return (
      <div className="flex items-start space-x-3 justify-end animate-in slide-in-from-bottom-4 duration-300">
        <div className="bg-blue-600 text-white rounded-xl shadow-sm p-4 max-w-md">
          <p className="whitespace-pre-wrap text-sm">{message.content}</p>
        </div>
        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
          <i className="fas fa-user text-gray-600 text-sm"></i>
        </div>
      </div>
    );
  }

  // ASSISTANT MESSAGE WITH PROPERTIES (New Eleganz Design)
  if (message.properties) {
    return (
      <div className="flex items-start space-x-3 animate-in slide-in-from-bottom-4 duration-300">
        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
          <i className="fas fa-robot text-white text-sm"></i>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden max-w-full">
          {/* Header Section */}
          <div className="text-center py-8 px-6 bg-gradient-to-b from-gray-50 to-white">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Home className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-light tracking-widest text-gray-400 mb-4">
              {message.content.toUpperCase()}
            </h2>
            {message.subtitle && (
              <p className="text-sm text-gray-500 mb-3 font-medium">{message.subtitle}</p>
            )}
            {message.description && (
              <p className="text-xs text-gray-400 leading-relaxed max-w-2xl mx-auto">
                {message.description}
              </p>
            )}
          </div>

          {/* Property Cards */}
          <div className="grid grid-cols-1 gap-4 p-6 bg-white">
            {message.properties.map((prop, idx) => (
              <div 
                key={idx} 
                className="border border-gray-200 rounded-lg p-4 hover:border-blue-400 transition-colors cursor-pointer"
                onClick={() => onLinkClick?.(prop.title)}
              >
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    {prop.icon === 'home' && <Home className="w-5 h-5 text-blue-600" />}
                    {prop.icon === 'building' && <Building2 className="w-5 h-5 text-blue-600" />}
                    {prop.icon === 'bed' && <Bed className="w-5 h-5 text-blue-600" />}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-blue-600 font-medium text-sm mb-1 underline hover:text-blue-800">
                      {prop.title}
                    </h3>
                    <p className="text-xs text-gray-500">{prop.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Features Grid */}
          {message.features && (
            <div className="border-t border-gray-200">
              <div className="text-center py-4 bg-gray-50">
                <p className="text-xs font-semibold text-gray-600">Prime Location Benefits</p>
              </div>
              <div className="grid grid-cols-1 divide-y divide-gray-200">
                {message.features.map((feature, idx) => (
                  <div key={idx} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                        {idx === 0 && <span className="text-gray-400">💰</span>}
                        {idx === 1 && <MapPin className="w-4 h-4 text-gray-400" />}
                        {idx === 2 && <span className="text-gray-400">📅</span>}
                        {idx === 3 && <Building2 className="w-4 h-4 text-gray-400" />}
                        {idx === 4 && <Bed className="w-4 h-4 text-gray-400" />}
                        {idx === 5 && <MapPin className="w-4 h-4 text-gray-400" />}
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">{feature.label}</p>
                        <p className="text-sm text-gray-700 font-light">{feature.value}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Location */}
          {message.location && (
            <div className="border-t border-gray-200 p-4 bg-gray-50 text-center">
              <p className="text-xs text-gray-500 mb-2">Located at {message.location}</p>
              <p className="text-xs text-gray-400">
                20 min to DXB Airport • 15 min to Dubai Mall • 15 min to Ski of Arab
              </p>
            </div>
          )}

          {/* Action Buttons */}
          {message.buttons && (
            <div className="border-t border-gray-200 p-4 bg-white">
              <div className="flex flex-wrap gap-2 justify-center mb-3">
                {message.buttons.slice(0, 2).map((btn, idx) => (
                  <button
                    key={idx}
                    onClick={() => onLinkClick?.(btn)}
                    className="px-4 py-2 bg-blue-600 text-white text-xs rounded-md hover:bg-blue-700 transition-colors"
                  >
                    {btn}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {message.buttons.slice(2).map((btn, idx) => (
                  <button
                    key={idx}
                    onClick={() => onLinkClick?.(btn)}
                    className="px-3 py-1.5 bg-blue-100 text-blue-700 text-xs rounded-md hover:bg-blue-200 transition-colors"
                  >
                    {btn}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="border-t border-gray-200 p-3 bg-gray-50 text-center">
            <p className="text-xs text-gray-400">
              Developed by <span className="font-medium text-gray-600">Danube Properties</span> • Launch: SEO T2 17 17
            </p>
          </div>
        </div>
      </div>
    );
  }

  // SIMPLE ASSISTANT MESSAGE (keep your existing HTML content handling)
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
      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
        <i className="fas fa-robot text-white text-sm"></i>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 max-w-full">
        {sanitizedHtml ? (
          <div
            className="prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
            onClick={handleClick}
          />
        ) : (
          <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
        )}
      </div>
    </div>
  );
});