/**
 * Homepage content, transcribed from the website design supplied by the
 * company. Edit wording here; the homepage sections read from this file.
 */

export const hero = {
  brand: "uFirst AI",
  eyebrow: "AI-powered solutions | Global impact",
  titleLines: ["Build Smarter.", "Automate Faster."],
  titleHighlight: "Scale with AI.",
  description:
    "uFirst AI delivers intelligent AI Agents, Automation and Custom AI Solutions that transform business operations, customer experience and growth.",
  primary: { label: "Explore Our AI Solutions", href: "/services" },
  secondary: { label: "Get in Touch", href: "#contact" },
  highlights: [
    { icon: "zap", label: "Better Efficiency" },
    { icon: "chart", label: "Higher Productivity" },
    { icon: "leaf", label: "Sustainable Growth" },
  ],
} as const;

/**
 * Homepage hero banner slides (auto-rotating). Slide 1 is the main brand
 * message and carries the page's H1. To use a photo/graphic banner instead
 * of the built-in illustration, add `image: "/images/banners/your-file.jpg"`.
 */
export type HeroSlide = {
  id: string;
  eyebrow: string;
  titleLines: readonly string[];
  titleHighlight: string;
  description: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
  visual: "network" | "leads" | "agents";
  image?: string;
};

export const heroSlides: readonly HeroSlide[] = [
  { id: "brand", ...hero, visual: "network" },
  {
    id: "sales-agent",
    eyebrow: "Flagship product | AI Sales & Lead Generation Agent",
    titleLines: ["Find the Right Leads.", "Reach Them First."],
    titleHighlight: "Close with AI.",
    description:
      "Our AI Sales & Lead Generation Agent researches, qualifies and engages the decision-makers who matter to your business, so your team spends its time on conversations, not spreadsheets.",
    primary: { label: "Explore Our Products", href: "/products" },
    secondary: { label: "Book a Demo", href: "/contact" },
    visual: "leads",
  },
  {
    id: "agents",
    eyebrow: "AI agents & automation | Built for your business",
    titleLines: ["AI Agents That", "Work Around"],
    titleHighlight: "the Clock.",
    description:
      "From AI receptionists and helpdesks to document processing and CRM automation, uFirst AI configures intelligent agents around the way your business already works.",
    primary: { label: "View Our Services", href: "/services" },
    secondary: { label: "Get in Touch", href: "#contact" },
    visual: "agents",
  },
];

export const about = {
  eyebrow: "About uFirst AI",
  title: "Your Trusted AI Partner for a Smarter Tomorrow",
  text:
    "uFirst AI Limited is an AI-focused company delivering practical, scalable AI automation and agentic AI solutions for businesses in Bangladesh and international markets. We help organizations work smarter, serve customers better and grow faster with AI.",
  cta: { label: "Learn More About Us", href: "/about" },
  pillars: [
    { icon: "bot", title: "AI Automation", text: "Automate routine tasks, boost productivity and reduce costs." },
    { icon: "agent", title: "Agentic AI", text: "Intelligent agents that think, act and deliver real business value." },
    { icon: "brain", title: "Custom AI Systems", text: "Tailored solutions for your unique business needs and goals." },
    { icon: "cloud", title: "AI SaaS Products", text: "Scalable, secure and easy-to-use AI-powered SaaS for modern businesses." },
  ],
} as const;

export const mission =
  "To help organizations reduce manual work, improve decision-making, enhance customer experiences, and accelerate growth through practical, secure and scalable AI.";

export const vision =
  "To become a trusted global AI solutions partner, enabling businesses across Bangladesh and international markets to operate intelligently, efficiently and at scale.";

export const whatWeBuild = {
  eyebrow: "Our Services",
  title: "What We Build",
  description: "Innovative AI solutions designed to solve real business challenges.",
  items: [
    { icon: "workflow", title: "AI Automation & Workflow Engineering" },
    { icon: "agent", title: "AI Agents & Agentic Workflows" },
    { icon: "cloud", title: "Custom AI System Development" },
    { icon: "chat", title: "AI Chatbots & Conversational AI" },
    { icon: "voice", title: "Voice AI Agents" },
    { icon: "shield", title: "AI-powered CRM/ERP Integrations" },
    { icon: "cloudCog", title: "AI SaaS Product Development" },
    { icon: "puzzle", title: "AI Strategy, Integration & Optimization" },
  ],
} as const;

export const industries = {
  eyebrow: "Industries & Global Markets",
  title: "Solutions for Every Industry",
  description:
    "We serve a wide range of industries with AI-powered solutions and have a global presence.",
  items: [
    { icon: "health", label: "Healthcare" },
    { icon: "education", label: "Education" },
    { icon: "finance", label: "Finance" },
    { icon: "retail", label: "Retail & Ecommerce" },
    { icon: "manufacturing", label: "Manufacturing" },
    { icon: "logistics", label: "Logistics & Operations" },
    { icon: "government", label: "Government & Public Sector" },
    { icon: "more", label: "More" },
  ],
  markets: [
    { flag: "🇧🇩", label: "Bangladesh" },
    { flag: "🇬🇧", label: "UK" },
    { flag: "🇲🇾", label: "Malaysia" },
    { flag: "🇪🇺", label: "Europe" },
    { flag: "🇺🇸", label: "America" },
    { flag: "🇨🇦", label: "Canada" },
    { flag: "🇦🇺", label: "Australia" },
  ],
} as const;

export const whyChoose = {
  eyebrow: "Why uFirst AI?",
  title: "Why Choose uFirst AI?",
  items: [
    { icon: "team", title: "Expert Team", text: "Skilled professionals with global experience." },
    { icon: "results", title: "Proven Results", text: "Delivering measurable business impact." },
    { icon: "secure", title: "Secure & Reliable", text: "Enterprise-grade security and compliance." },
    { icon: "partnership", title: "Long-term Partnership", text: "Your growth is our priority." },
  ],
} as const;

export const getInTouch = {
  title: "Get in Touch",
  text: "Have a project in mind? Let's talk about how uFirst AI can help your business grow with AI.",
  location: "Bangladesh – Global Delivery",
} as const;
