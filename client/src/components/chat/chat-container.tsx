import { useEffect, useRef } from "react";
import { MessageBubble } from "./message-bubble";
import { ChatInput } from "./chat-input";
import { useChat } from "@/hooks/use-chat";

export function ChatContainer() {
  const { messages, sendMessage, isLoading, initializeChat } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Initialize chat with welcome message
  useEffect(() => {
    initializeChat();
  }, [initializeChat]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-400 w-full border-b text-white fixed z-50 border-gray-200 py-4 shadow-sm">
        <div className="w-full px-6 lg:px-24">
          <div className="flex items-center justify-between">
            {/* Branding */}
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                <i className="fas fa-brain text-white text-lg"></i>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">ELEGANZA PROPERTIES</h1>
                <p className="text-sm flex items-center text-white/80">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Your luxury property guide
                </p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-white">
              <button className="flex items-center gap-1 hover:text-white/80 transition-colors">
                <span>PROJECTS</span>
                <i className="fas fa-chevron-down text-xs"></i>
              </button>
              <button className="flex items-center gap-1 hover:text-white/80 transition-colors">
                <span>ELEGANZA ASSIST</span>
                <i className="fas fa-chevron-down text-xs"></i>
              </button>
              <button className="flex items-center gap-1 hover:text-white/80 transition-colors">
                <span>ABOUT US</span>
                <i className="fas fa-chevron-down text-xs"></i>
              </button>
              <button className="flex items-center gap-1 hover:text-white/80 transition-colors">
                <span>MEDIA</span>
                <i className="fas fa-chevron-down text-xs"></i>
              </button>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-4">
              {/* Mobile menu */}
              <button className="lg:hidden p-2 text w-8 h-8 flex justify-center items-center rounded-full hover:bg-white/10">
                <i className="fas fa-ellipsis-v"></i>
              </button>

              {/* Desktop actions */}
              <div className="hidden lg:flex items-center gap-3">
                <button className="h-10 px-4 rounded border border-white text-white hover:bg-white/10 transition-colors flex items-center gap-2 text-sm font-medium">
                  <i className="fas fa-phone text-xs"></i>
                  <span>CONTACT US</span>
                </button>
                <a
                  className="h-10 px-4 rounded bg-[#25D366] text-white hover:brightness-110 transition flex items-center gap-2 text-sm font-medium"
                  href="#"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fab fa-whatsapp"></i>
                  <span>WHATSAPP</span>
                </a>
                <button className="h-10 px-3 rounded text-white hover:bg-white/10 transition-colors text-sm font-medium">
                  EN
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Banner Section */}
      <div className="relative pt-20 pb-16 min-h-[600px] overflow-hidden">
        {/* Background Image/Video */}
        <div className="absolute inset-0 z-0">
          {/* Image Background */}
          <img
            src="/assets/exterior-2.jpg"
            alt="Eleganze Properties Banner"
            className="w-full h-full object-cover"
          />

          {/* Video Background (uncomment to use video instead of image) */}

          {/* <video 
            className="w-full h-full object-cover"
            autoPlay 
            muted 
            loop 
            playsInline
          >
            <source src="/assets/EleganzWalkthrough-LowRes.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
           */}

          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-r to-purple-400/80"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 w-full px-6 lg:px-24">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Left Section - Branding & Payment Offer */}
            <div className="flex-1 lg:max-w-[60%]">
              {/* Branding */}
              <div className="mb-8">
                <h1 className="text-4xl lg:text-5xl font-bold text-white mb-2">Eleganz</h1>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-sans text-white/80">BY</span>
                  <span className="text-2xl lg:text-3xl font-bold text-white font-sans">AINAGER</span>
                </div>
              </div>

              {/* Payment Offer Badge */}
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 mb-8 max-w-md border border-white/30">
                <div className="text-white">
                  <div className="text-sm mb-2">PAY</div>
                  <div className="text-6xl lg:text-7xl font-bold leading-none">
                    1%<span className="text-2xl">*</span>
                  </div>
                  <div className="text-sm mt-2">PER MONTH</div>
                </div>
              </div>

              {/* Company Logo */}
              <div className="mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-white">ELAGANZE</span>
                  <span className="text-xl font-bold text-white/80">PROPERTIES</span>
                </div>
              </div>

              {/* Terms */}
              <p className="text-xs text-white/60">*T&C APPLY</p>
            </div>

            {/* Right Section - Features & Contact */}
            <div className="flex-1 lg:max-w-[40%]">
              {/* Feature Badges */}
              <div className="space-y-4 mb-8">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 border border-white/30">
                  <p className="text-white font-bold text-lg leading-tight">
                    READY TO MOVE-IN<br />
                    HOMES IN JVC
                  </p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 border border-white/30">
                  <p className="text-white font-bold text-lg">FULLY FURNISHED</p>
                </div>
              </div>

              {/* Property Types */}
              <div className="mb-8">
                <h3 className="text-2xl lg:text-3xl font-bold text-white leading-tight">
                  TOWN HOUSES<br />
                  & APARTMENTS
                </h3>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <div className="text-2xl font-bold text-white">+971 800 17 17 17</div>
                <div className="text-lg text-white/80">danubeproperties.com</div>

                {/* Call to Action */}
                <div className="flex items-center gap-4 mt-6">


                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Messages Area */}

     <div
  ref={chatContainerRef}
  className="flex-1 overflow-y-auto py-8 scroll-smooth">
  <div className="max-w-2xl mx-auto px-4 sm:px-6 space-y-6">
    {messages.map((message) => (
      <MessageBubble
        key={message.id}
        message={message}
        onLinkClick={(topic) => sendMessage(topic)}
      />
    ))}
    <div ref={messagesEndRef} />
  </div>
</div>

      {/* <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto py-24 scroll-smooth">
          
        <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message}
              onLinkClick={(topic) => sendMessage(topic)}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div> */}

      {/* Fixed Chat Input */}
      <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
    </div >
  );
} 
