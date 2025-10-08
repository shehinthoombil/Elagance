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
      {/* Header section */}
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

            {/* Nav section */}
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

      {/* Banner and Hero Section */}
      <div className="relative pt-[80px] pb-16 min-h-[600px] overflow-hidden">
        {/* Background Image/Video */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/exterior-2.jpg"
            alt="Eleganze Properties Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-300/60 to-purple-300/80"></div>

        </div>

        {/* Welcome Section in Banner */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-white drop-shadow-md mb-2">
            Welcome to Eleganza!
          </h1>
          <h2 className="text-lg sm:text-xl font-semibold text-blue-200 mb-3">
            Luxury Living in the Heart of Dubai
          </h2>
          <p className="text-sm sm:text-base text-white/90 max-w-xl">
            Elegantly designed apartments and townhouses in Jumeirah Village Circle by
            Danube Properties
          </p>
        </div>


        {/* Contents */}
        <div className="relative z-10 w-full px-6 lg:px-24">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Left Section - Branding & Payment Offer */}
            <div className="flex-1 lg:max-w-[60%]">

              <div className="mb-8">
                <h1 className="text-4xl lg:text-5xl font-bold text-white mb-2">Eleganz</h1>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-sans text-white/80">BY</span>
                  <span className="text-2xl lg:text-3xl font-bold text-white font-sans">AINAGER</span>
                </div>
              </div>

              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 mb-8 max-w-md border border-white/30">
                <div className="text-white">
                  <div className="text-sm mb-2">PAY</div>
                  <div className="text-6xl lg:text-7xl font-bold leading-none">
                    10%<span className="text-2xl">only</span>
                  </div>
                  <div className="text-sm mt-2">PER MONTH</div>
                </div>
              </div>

              {/* Company Elagance */}
              <div className="mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-white">ELAGANZE</span>
                  <span className="text-xl font-bold text-white/80">PROPERTIES</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Property Types and Services Section */}
      <div>
        <section className="bg-gray-50 py-16">
          <div className="max-w-6xl mx-auto px-6 space-y-6">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
              Available Property Types & Services
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition">
                <div className="flex items-start gap-4">
                  <i className="fas fa-bed text-indigo-600 text-2xl"></i>
                  <div>
                    <h3 className="text-indigo-700 font-semibold mb-1 cursor-pointer hover:underline">
                      Studio Apartments
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Starting from <span className="font-medium">420 sq ft</span> | AED 0.75M
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition">
                <div className="flex items-start gap-4">
                  <i className="fas fa-home text-indigo-600 text-2xl"></i>
                  <div>
                    <h3 className="text-indigo-700 font-semibold mb-1 cursor-pointer hover:underline">
                      1 Bedroom Apartments
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Starting from <span className="font-medium">813 sq ft</span> | AED 1.38M
                    </p>
                  </div>
                </div>
              </div>


              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition">
                <div className="flex items-start gap-4">
                  <i className="fas fa-building text-indigo-600 text-2xl"></i>
                  <div>
                    <h3 className="text-indigo-700 font-semibold mb-1 cursor-pointer hover:underline">
                      2 Bedroom Apartments
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Starting from <span className="font-medium">1,274 sq ft</span> | AED 2.04M
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition">
                <div className="flex items-start gap-4">
                  <i className="fas fa-city text-indigo-600 text-2xl"></i>
                  <div>
                    <h3 className="text-indigo-700 font-semibold mb-1 cursor-pointer hover:underline">
                      3 Bedroom Apartments
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Starting from <span className="font-medium">1,920 sq ft</span> | AED 3.25M
                    </p>
                  </div>
                </div>
              </div>


              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition">
                <div className="flex items-start gap-4">
                  <i className="fas fa-layer-group text-indigo-600 text-2xl"></i>
                  <div>
                    <h3 className="text-indigo-700 font-semibold mb-1 cursor-pointer hover:underline">
                      2 Bedroom Duplex
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Starting from <span className="font-medium">1,621 sq ft</span> | AED 2.76M
                    </p>
                  </div>
                </div>
              </div>


              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition">
                <div className="flex items-start gap-4">
                  <i className="fas fa-home text-indigo-600 text-2xl"></i>
                  <div>
                    <h3 className="text-indigo-700 font-semibold mb-1 cursor-pointer hover:underline">
                      4 Bedroom Townhouses
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Starting from <span className="font-medium">2,585 sq ft</span> | AED 4.50M
                    </p>
                  </div>
                </div>
              </div>


              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition">
                <div className="flex items-start gap-4">
                  <i className="fas fa-crown text-indigo-600 text-2xl"></i>
                  <div>
                    <h3 className="text-indigo-700 font-semibold mb-1 cursor-pointer hover:underline">
                      Luxury Penthouses
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Starting from <span className="font-medium">3,200 sq ft</span> | AED 6.25M
                    </p>
                  </div>
                </div>
              </div>


              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition">
                <div className="flex items-start gap-4">
                  <i className="fas fa-couch text-indigo-600 text-2xl"></i>
                  <div>
                    <h3 className="text-indigo-700 font-semibold mb-1 cursor-pointer hover:underline">
                      Studio Lofts
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Starting from <span className="font-medium">500 sq ft</span> | AED 1.10M
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>



      {/* Footer Section */}
      <footer className="bg-white border-t border-gray-200 py-6 sm:py-10">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Prime Location Benefits
            </h3>
            <p className="text-gray-600 text-sm">
              20 min to DXB Airport • 18 min to Dubai Mall • 15 min to Burj Al Arab
            </p>
            <p className="text-gray-500 text-sm mt-1">
              Located in Jumeirah Village Circle – Dubai’s most popular family-oriented community
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <button className="bg-indigo-100 text-indigo-600 border  hover:bg-indigo-600 hover:text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-200">
              View Payment Plans
            </button>

            <button className="bg-indigo-100 text-indigo-600 border hover:bg-indigo-600 hover:text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-200">
              Contact: +91 9895918918
            </button>

            <button className="bg-indigo-100 text-indigo-600 border hover:bg-indigo-600 hover:text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-200">
              0% Interest
            </button>

            <button className="bg-indigo-100 text-indigo-600 border  hover:bg-indigo-600 hover:text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-200">
              Luxury Amenities
            </button>

            <button className="bg-indigo-100 text-indigo-600 border  hover:bg-indigo-600 hover:text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-200">
              Ready to Move
            </button>
          </div>

          <p className="text-gray-500 text-sm mt-6">
            Developed by <span className="text-indigo-600 font-medium">Danube Properties</span> |
            Contact: <span className="font-medium text-gray-800">+91 9895918918</span>
          </p>
        </div>
      </footer>
      {/* Chat Input */}
      <ChatInput onSendMessage={sendMessage} isLoading={isLoading} className="max-w-full px-2 sm:px-6" />
    </div >
  );
} 
