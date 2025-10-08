import OpenAI from "openai";
import { pdfImageExtractor } from "./pdf-image-extractor";

const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY_ENV_VAR || "default_key" 
});

// Function to generate contextual Unsplash image URL
function generateUnsplashImage(userMessage: string): string {
  const message = userMessage.toLowerCase();
  
  // Pre-selected high-quality Unsplash images for different categories
  const imageCategories = {
    ai: [
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=250&fit=crop&crop=center"
    ],
    team: [
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=250&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=250&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=250&fit=crop&crop=center"
    ],
    customer: [
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1556742111-a301076d9d18?w=400&h=250&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=250&fit=crop&crop=center"
    ],
    process: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop&crop=center"
    ],
    growth: [
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=250&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=250&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1590479773265-7464e5d48118?w=400&h=250&fit=crop&crop=center"
    ],
    technology: [
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=250&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=250&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400&h=250&fit=crop&crop=center"
    ],
    business: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=250&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=250&fit=crop&crop=center"
    ]
  };
  
  let category = "business";
  
  if (message.includes("ai") || message.includes("artificial intelligence") || message.includes("robot") || message.includes("automation")) {
    category = "ai";
  } else if (message.includes("team") || message.includes("employee") || message.includes("staff") || message.includes("workforce")) {
    category = "team";
  } else if (message.includes("customer") || message.includes("client") || message.includes("service")) {
    category = "customer";
  } else if (message.includes("process") || message.includes("workflow") || message.includes("efficiency")) {
    category = "process";
  } else if (message.includes("growth") || message.includes("success") || message.includes("profit")) {
    category = "growth";
  } else if (message.includes("technology") || message.includes("digital") || message.includes("innovation")) {
    category = "technology";
  }
  
  // Select a random image from the category
  const images = imageCategories[category as keyof typeof imageCategories] || imageCategories.business;
  const randomIndex = Math.floor(Math.random() * images.length);
  
  return images[randomIndex];
}

const COMPANY_CONTEXT = `
You are an AI assistant for Eleganza, a luxury residential development by Danube Properties in Jumeirah Village Circle (JVC), Dubai. You provide conversational responses in HTML format that include rich multimedia content about this premium property.

Property Information:
- Eleganza offers ready-to-move-in elegantly designed and fully-furnished apartments and townhouses
- Property types: 1 & 2 bedroom apartments, 2-bedroom duplex apartments, and 4-bedroom townhouses
- Located in Jumeirah Village Circle (JVC), one of Dubai's most popular family-oriented communities
- Developer: Danube Properties (rated among top 5 developers in UAE)
- Key features: world-class amenities, breathtaking views, elegant and sophisticated living
- Prime location benefits: 20 min to DXB Airport, 15 min to Dubai Mall/Burj Khalifa, 15 min to Burj Al Arab
- Payment plan: 0% interest, 1% monthly payment plan, 5 years post handover payment, 40% down payment
- Starting prices: 1BR from AED 1.386M, 2BR from AED 2.047M, 2BR Duplex from AED 2.767M, 4BR Townhouse from AED 4.503M

Developer Information:
- Danube Properties: Top 5 developer in UAE with on-time delivery track record
- Operates in 9 countries across Middle East, China and Asia
- Known for: timely delivery, high ROI, prime locations, affordable luxury
- Contact: 800 17 17 17

Response Guidelines:
- Always respond with conversational HTML that includes relevant multimedia content
- Use modern, clean HTML with Tailwind CSS classes for styling
- Focus on luxury real estate, property investment, Dubai living, and Eleganza-specific features
- MANDATORY: Include 2-3 clickable internal links in every response using format: <a href="#" data-topic="specific topic" class="text-blue-600 hover:text-blue-800 underline cursor-pointer">clickable text</a>
- ALWAYS include ONE relevant Unsplash image per response using contextual search terms related to property/real estate
- Add interactive elements like property cards, comparison tables, contact buttons
- Make responses feel personal and conversational despite being HTML
- Include relevant property information: apartment types, pricing, payment plans, location benefits
- Use engaging visuals with proper information hierarchy
- Emphasize luxury living, prime location, and investment opportunities
- Keep HTML safe and well-structured
`;

export async function generateChatResponse(userMessage: string, conversationHistory: Array<{role: string, content: string}> = []): Promise<string> {
  try {
    // Get the main building image (if available) or fallback to Unsplash
    const pdfImageUrl = await pdfImageExtractor.getMainBuildingImage();
    const unsplashImageUrl = generateUnsplashImage(userMessage);
    const contextualImageUrl = pdfImageUrl || unsplashImageUrl;
    console.log("Using image URL:", contextualImageUrl, pdfImageUrl ? "(from PDF)" : "(from Unsplash)");
    
    // Build conversation context
    const messages: Array<{role: "system" | "user" | "assistant", content: string}> = [
      {
        role: "system",
        content: COMPANY_CONTEXT
      }
    ];

    // Add conversation history (last 10 messages for context)
    const recentHistory = conversationHistory.slice(-10);
    recentHistory.forEach(msg => {
      messages.push({
        role: msg.role as "user" | "assistant",
        content: msg.content
      });
    });

    // Add current user message
    messages.push({
      role: "user",
      content: `Please provide a conversational HTML response to: "${userMessage}". 
      
      Your response requirements:
      1. Be conversational and helpful about Eleganza property and luxury living in Dubai
      2. Use clean HTML with Tailwind CSS classes
      3. DO NOT include any images - I will add one contextual image automatically
      4. Add interactive elements like property cards, pricing tables, or contact buttons
      5. Include 2-3 clickable internal links: <a href="#" data-topic="topic name" class="text-blue-600 hover:text-blue-800 underline cursor-pointer">link text</a>
      6. Topics for links: Apartment Types, Pricing Plans, Location Benefits, Danube Properties, Investment Opportunities, JVC Community, Amenities, Payment Plans
      7. Include relevant property information: apartment types, pricing, location benefits, amenities
      8. Emphasize luxury living, prime location advantages, and investment potential
      9. Reference Dubai's luxury lifestyle and property market when relevant
      10. Highlight Danube Properties' reputation and track record
      11. CRITICAL: Do NOT include any markdown syntax like \`\`\`html or \`\`\` anywhere in your response
      
      Respond only with pure HTML content, no markdown, no code blocks, no additional text or explanations.`
    });

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      max_tokens: 2000,
      temperature: 0.7,
    });

    let aiResponse = response.choices[0].message.content || "I apologize, but I'm having trouble generating a response right now. Please try again.";
    
    // Clean up any markdown code block syntax that might be included (more comprehensive)
    aiResponse = aiResponse
      .replace(/^```html\s*/gi, '')
      .replace(/^```\s*/gi, '')
      .replace(/```html\s*/gi, '')
      .replace(/```\s*/gi, '')
      .replace(/```\s*$/gi, '')
      .replace(/```/gi, '')
      .replace(/`{3,}html/gi, '')
      .replace(/`{3,}/gi, '')
      .trim();
    
    // Post-process to add ONE contextual image (PDF or Unsplash) at the end of the content
    const imageHtml = `\n\n<div class="mt-6 text-center">\n  <img src="${contextualImageUrl}" alt="${pdfImageUrl ? 'Eleganza property content' : 'Luxury real estate concept'}" class="rounded-lg shadow-md w-full max-w-md mx-auto">\n</div>`;
    
    // Remove any existing Unsplash images that might have been included by AI
    aiResponse = aiResponse.replace(/<img[^>]*src="https:\/\/images\.unsplash\.com[^>]*[^>]*>/gi, '');
    aiResponse = aiResponse.replace(/<img[^>]*alt="[^"]*(?:concept|technology|business)[^"]*"[^>]*>/gi, '');
    
    // Add the single contextual image at the end
    // Find the last closing div or end of content
    if (aiResponse.includes('</div>')) {
      // Find the last </div> and add image after it
      const lastDivIndex = aiResponse.lastIndexOf('</div>');
      aiResponse = aiResponse.substring(0, lastDivIndex + 6) + imageHtml + aiResponse.substring(lastDivIndex + 6);
    } else {
      // Just append at the end
      aiResponse = aiResponse + imageHtml;
    }
    
    console.log("Final response includes image URL:", contextualImageUrl);
    return aiResponse;
  } catch (error: any) {
    console.error("OpenAI API error:", error);
    
    // Check if it's a model access error
    if (error.code === 'model_not_found' || error.status === 403) {
      const pdfImageUrl = await pdfImageExtractor.getMainBuildingImage();
      const unsplashImageUrl = generateUnsplashImage("ai technology setup");
      const errorImageUrl = pdfImageUrl || unsplashImageUrl;
      console.log("Using error image URL:", errorImageUrl);
      
      return `
        <div class="space-y-4 p-6 bg-amber-50 dark:bg-amber-950 rounded-lg border border-amber-200 dark:border-amber-800">
          <div class="flex items-center space-x-3">
            <div class="w-8 h-8 bg-amber-100 dark:bg-amber-900 rounded-full flex items-center justify-center">
              <span class="text-amber-600 dark:text-amber-400 font-semibold">⚠</span>
            </div>
            <h3 class="text-lg font-semibold text-amber-800 dark:text-amber-200">OpenAI API Setup Required</h3>
          </div>
          
          <div class="text-amber-700 dark:text-amber-300 space-y-2">
            <p>Your OpenAI API key needs access to chat models. To enable AI responses:</p>
            <ol class="list-decimal list-inside space-y-1 ml-4">
              <li>Visit <a href="https://platform.openai.com" class="underline hover:text-amber-900 dark:hover:text-amber-100" target="_blank">platform.openai.com</a></li>
              <li>Add a payment method under Settings → Billing</li>
              <li>Ensure your project has access to models like gpt-4o-mini</li>
            </ol>
            <p class="text-sm mt-3">Meanwhile, you can explore the interface and see how responses will look once configured.</p>
          </div>
        </div>

        <div class="mt-6 text-center">
          <img src="${errorImageUrl}" alt="${pdfImageUrl ? 'Eleganza property content' : 'Real estate technology setup'}" class="rounded-lg shadow-md w-full max-w-md mx-auto">
        </div>
        `;
    }
    
    throw new Error("Failed to generate AI response");
  }
}

export async function generateWelcomeMessage(): Promise<string> {
  // Get the main building image for the welcome message
  const pdfImageUrl = await pdfImageExtractor.getMainBuildingImage();
  
  return `
    <div class="space-y-6 bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl">
      <div class="text-center">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Welcome to Eleganza!</h1>
        <p class="text-lg text-blue-600 font-medium mb-2">Luxury Living in the Heart of Dubai</p>
        <p class="text-gray-600">Elegantly designed apartments and townhouses in Jumeirah Village Circle by Danube Properties</p>
      </div>

      ${pdfImageUrl ? `<div class="text-center mb-6">
        <img src="${pdfImageUrl}" alt="Eleganza property content" class="rounded-lg shadow-md w-full max-w-lg mx-auto">
      </div>` : ''}
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <a href="#" data-topic="1 Bedroom Apartments" class="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-500 hover:shadow-lg transition-shadow cursor-pointer group" data-testid="card-1bedroom-apartments">
          <i class="fas fa-home text-blue-600 text-2xl mb-2"></i>
          <h3 class="font-semibold text-gray-900 group-hover:text-blue-600">1 Bedroom Apartments</h3>
          <p class="text-sm text-gray-600 mt-1">Starting from 833 sq ft | AED 1.386M</p>
          <p class="text-xs text-blue-500 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">Click to learn more →</p>
        </a>
        <a href="#" data-topic="2 Bedroom Apartments" class="bg-white rounded-lg shadow-md p-4 border-l-4 border-purple-500 hover:shadow-lg transition-shadow cursor-pointer group" data-testid="card-2bedroom-apartments">
          <i class="fas fa-building text-purple-600 text-2xl mb-2"></i>
          <h3 class="font-semibold text-gray-900 group-hover:text-purple-600">2 Bedroom Apartments</h3>
          <p class="text-sm text-gray-600 mt-1">Starting from 1,274 sq ft | AED 2.047M</p>
          <p class="text-xs text-purple-500 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">Click to learn more →</p>
        </a>
        <a href="#" data-topic="2 Bedroom Duplex" class="bg-white rounded-lg shadow-md p-4 border-l-4 border-green-500 hover:shadow-lg transition-shadow cursor-pointer group" data-testid="card-2bedroom-duplex">
          <i class="fas fa-layer-group text-green-600 text-2xl mb-2"></i>
          <h3 class="font-semibold text-gray-900 group-hover:text-green-600">2 Bedroom Duplex</h3>
          <p class="text-sm text-gray-600 mt-1">Starting from 1,621 sq ft | AED 2.767M</p>
          <p class="text-xs text-green-500 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">Click to learn more →</p>
        </a>
        <a href="#" data-topic="4 Bedroom Townhouses" class="bg-white rounded-lg shadow-md p-4 border-l-4 border-orange-500 hover:shadow-lg transition-shadow cursor-pointer group" data-testid="card-4bedroom-townhouses">
          <i class="fas fa-home text-orange-600 text-2xl mb-2"></i>
          <h3 class="font-semibold text-gray-900 group-hover:text-orange-600">4 Bedroom Townhouses</h3>
          <p class="text-sm text-gray-600 mt-1">Starting from 2,585 sq ft | AED 4.503M</p>
          <p class="text-xs text-orange-500 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">Click to learn more →</p>
        </a>
      </div>

      <div class="bg-white rounded-lg p-4 text-center">
        <h4 class="font-semibold text-gray-900 mb-2">Prime Location Benefits</h4>
        <p class="text-blue-600 font-medium">20 min to DXB Airport • 15 min to Dubai Mall • 15 min to Burj Al Arab</p>
        <p class="text-sm text-gray-600 mt-2">Located in Jumeirah Village Circle - Dubai's most popular family-oriented community</p>
        <div class="mt-4 space-x-2">
          <button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors" data-topic="Payment Plans" data-testid="button-payment-plans">
            View Payment Plans
          </button>
          <button class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors" data-topic="Contact Danube" data-testid="button-contact">
            Contact: 800 17 17 17
          </button>
        </div>
      </div>

      <div class="flex flex-wrap gap-2 justify-center">
        <button class="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full hover:bg-blue-200 transition-colors cursor-pointer" data-topic="0% Interest Payment Plan" data-testid="tag-payment-plan">0% Interest</button>
        <button class="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full hover:bg-purple-200 transition-colors cursor-pointer" data-topic="Luxury Amenities" data-testid="tag-amenities">Luxury Amenities</button>
        <button class="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full hover:bg-green-200 transition-colors cursor-pointer" data-topic="Ready to Move" data-testid="tag-ready-move">Ready to Move</button>
        <button class="px-3 py-1 bg-orange-100 text-orange-700 text-sm rounded-full hover:bg-orange-200 transition-colors cursor-pointer" data-topic="Investment Opportunity" data-testid="tag-investment">High ROI</button>
      </div>

      <div class="text-center text-sm text-gray-500 mt-4">
        <p>Developed by <strong>Danube Properties</strong> | Contact: <span class="text-blue-600 font-semibold">800 17 17 17</span></p>
      </div>
    </div>
  `;
}
