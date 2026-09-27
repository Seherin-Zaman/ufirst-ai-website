import type { BlogPost } from "@/types/content";

/**
 * SAMPLE articles that explain concepts from the uFirst.Ai platform.
 * They contain no statistics, client stories or claims. Replace or extend them
 * with real editorial content (CMS: "Blog post").
 */
export const posts: BlogPost[] = [
  {
    id: "post-rag",
    slug: "what-is-rag-and-why-it-matters-for-business-ai",
    title: "What is RAG, and why does it matter for business AI?",
    excerpt:
      "Retrieval-augmented generation gives an AI system access to your business's own knowledge, so answers come from your information instead of guesswork.",
    category: "Knowledge & RAG",
    tags: ["RAG", "Knowledge base", "Customer support"],
    authorId: "editorial",
    publishedAt: "2026-09-01",
    readingMinutes: 4,
    featured: true,
    isPlaceholder: true,
    body: [
      {
        type: "p",
        text: "A general-purpose AI model knows a lot about the world and nothing about your business. It has not read your policies, your pricing or your product manuals. RAG — retrieval-augmented generation — closes that gap by giving the AI access to your own information at the moment it answers.",
      },
      { type: "h2", text: "Simple input, grounded response" },
      {
        type: "p",
        text: "The idea is easy to describe. Business information goes in; a response grounded in that information comes out. In between, a small number of steps make it work.",
      },
      {
        type: "ul",
        items: [
          "Business information: PDFs, policies, manuals, FAQs and pricing.",
          "Document processing: the source material is structured for use.",
          "Knowledge base: organized business context is stored.",
          "Vector search and retrieval: the relevant context is found for each question.",
          "AI response: the answer is written from your business's own information.",
        ],
      },
      { type: "h2", text: "Configure once, reuse everywhere" },
      {
        type: "p",
        text: "Because the knowledge layer is separate from any single channel, the same RAG infrastructure can support several services. A customer support helpdesk, an internal knowledge base and a website chatbot can all draw on the same organized knowledge. When the information changes, it changes in one place.",
      },
      { type: "h2", text: "Where people fit in" },
      {
        type: "p",
        text: "Grounded answers do not remove the need for people. Good systems are designed to escalate — to hand a conversation to a person when a question falls outside the knowledge available or needs judgement. That handoff is part of the design, not an afterthought.",
      },
    ],
  },
  {
    id: "post-automation",
    slug: "understanding-decision-action-how-automation-connects-ai-to-real-work",
    title: "Understanding, decision, action: how automation connects AI to real work",
    excerpt:
      "AI can understand a request. Automation is what turns that understanding into a CRM update, a notification or a follow-up.",
    category: "Automation",
    tags: ["Automation", "n8n", "Workflows"],
    authorId: "editorial",
    publishedAt: "2026-09-08",
    readingMinutes: 4,
    isPlaceholder: true,
    body: [
      {
        type: "p",
        text: "An AI model can read a message and work out what someone wants. On its own, that is only half the job. The business still needs something to happen: a lead recorded, a team member notified, a follow-up scheduled. Automation is the layer that makes that happen.",
      },
      { type: "h2", text: "From interaction to action" },
      {
        type: "p",
        text: "A typical flow starts with a customer interaction — a message, email, call or website visit. The AI interprets the request and intent, retrieves business context where it is needed, and a decision is made about the next appropriate step. Then the business action happens. When a person needs to be involved, the flow escalates to them.",
      },
      {
        type: "ul",
        items: [
          "Customer interaction",
          "AI understanding",
          "Knowledge retrieval",
          "Decision",
          "Business action",
          "Human escalation when necessary",
        ],
      },
      { type: "h2", text: "The role of the automation layer" },
      {
        type: "p",
        text: "uFirst.Ai uses n8n as its automation layer for workflows, triggers, actions, scheduling, notifications and integrations. It is the connective tissue between AI and operations. The way to think about it stays simple: AI understands, automation acts, and people step in when required.",
      },
    ],
  },
  {
    id: "post-templates",
    slug: "one-platform-many-solutions-the-template-based-delivery-model",
    title: "One platform, many solutions: the template-based delivery model",
    excerpt:
      "Why reusable service templates make it possible to deliver a system that feels specific to each business.",
    category: "Platform",
    tags: ["Templates", "Delivery", "Configuration"],
    authorId: "editorial",
    publishedAt: "2026-09-15",
    readingMinutes: 4,
    isPlaceholder: true,
    body: [
      {
        type: "p",
        text: "A business that wants AI automation faces an awkward choice. Off-the-shelf tools rarely fit how the business actually works, while fully custom builds start from zero every time. A template-based delivery model sits between the two.",
      },
      { type: "h2", text: "Reusable core, client-specific configuration" },
      {
        type: "p",
        text: "The core technology — the AI engine, RAG engine, automation, integrations and monitoring — is built once. On top of it sit reusable service templates. Each template holds reusable logic, workflow structures, tools, integrations and configuration points. Then each client's system is configured around their own business.",
      },
      { type: "h2", text: "What gets configured" },
      {
        type: "ul",
        items: [
          "Business: information, brand identity, services and products.",
          "Knowledge: FAQs, internal policies, documents and communication style.",
          "Systems: CRM, email, WhatsApp and website.",
          "Channels: social platforms, customer touchpoints, lead qualification and follow-up processes.",
          "Operations: customers, business workflows, human escalation rules and internal procedures.",
        ],
      },
      {
        type: "p",
        text: "The result is a system that feels specific to the client while using the same foundation underneath. Not ten unrelated applications, but one platform shaped into the right system for each business.",
      },
    ],
  },
  {
    id: "post-scoping",
    slug: "scoping-an-ai-automation-project-what-to-think-about",
    title: "Scoping an AI automation project: what to think about",
    excerpt:
      "A checklist of the factors that shape the size of an implementation, from the number of services to testing and deployment requirements.",
    category: "Guides",
    tags: ["Scoping", "Planning", "Implementation"],
    authorId: "editorial",
    publishedAt: "2026-09-22",
    readingMinutes: 3,
    isPlaceholder: true,
    body: [
      {
        type: "p",
        text: "No two businesses need exactly the same system, so no two implementations are scoped in exactly the same way. If you are thinking about AI automation, these are the factors that typically shape the work.",
      },
      {
        type: "ul",
        items: [
          "The number of AI services you want.",
          "The overall complexity of the system.",
          "The number of integrations required.",
          "How much business knowledge needs to be processed.",
          "Any custom workflows.",
          "CRM integration.",
          "The communication channels you use.",
          "Website integration.",
          "Call automation.",
          "Document processing.",
          "Testing requirements.",
          "Deployment requirements.",
        ],
      },
      { type: "h2", text: "Start with the repetitive work" },
      {
        type: "p",
        text: "The most useful starting point is usually the repetitive communication, lead management or document work your team does every day. That is what business discovery is for: understanding the business, identifying which services are relevant and choosing the right reusable base before any configuration begins.",
      },
      {
        type: "p",
        text: "You do not have to take all ten services. Each client selects only the services they need, and can receive a proposal based on the complexity of their required system.",
      },
    ],
  },
];
