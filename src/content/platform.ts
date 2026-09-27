import type {
  ArchitectureLayer,
  DeploymentExample,
  FaqItem,
  ProcessStep,
} from "@/types/content";

/** Hero + architecture visual: reusable core → client configuration → deployed solution. */
export const architectureLayers: ArchitectureLayer[] = [
  { id: "ai", title: "AI Engine", text: "Agent system, prompts, tools and responses", group: "core" },
  { id: "rag", title: "RAG Engine", text: "Documents, embeddings and retrieval", group: "core" },
  { id: "automation", title: "Automation", text: "Workflows, triggers, actions and scheduling", group: "core" },
  { id: "integration", title: "Integration", text: "APIs and webhooks to WhatsApp, email, CRM, social and web", group: "core" },
  { id: "config", title: "Client-Specific Configuration", text: "Business, brand, knowledge and processes", group: "client" },
  { id: "deployed", title: "Deployed Business Solution", text: "A system built around one business", group: "result" },
];

export const integrationChannels = ["WhatsApp", "Email", "CRM", "Social", "Web"];

export const ragSteps = [
  { title: "Business information", text: "PDFs, policies, manuals, FAQs and pricing" },
  { title: "Document processing", text: "Structure the source material" },
  { title: "Knowledge base", text: "Organized business context" },
  { title: "Vector search / retrieval", text: "Find the relevant context" },
  { title: "AI response", text: "Answer from the business's own information" },
];

export const ragConsumers = ["Customer Support", "Knowledge Base", "Website Chatbot"];

export const automationSteps = [
  { title: "Customer interaction", text: "Message, email, call or website visit", phase: "Understanding" },
  { title: "AI understanding", text: "Interpret the request and intent", phase: "Understanding" },
  { title: "Knowledge retrieval", text: "Use business context where required", phase: "Understanding" },
  { title: "Decision", text: "Choose the next appropriate step", phase: "Decision" },
  { title: "Business action", text: "CRM update, notification, follow-up or scheduling", phase: "Action" },
  { title: "Human escalation when necessary", text: "Keep a person in the loop when needed", phase: "Action" },
] as const;

export const configurationAreas = [
  { name: "Business", items: ["Business information", "Brand identity", "Services", "Products"] },
  { name: "Knowledge", items: ["FAQs", "Internal policies", "Documents", "Communication style"] },
  { name: "Systems", items: ["CRM", "Email", "WhatsApp", "Website"] },
  { name: "Channels", items: ["Social platforms", "Customer touchpoints", "Lead qualification", "Follow-up processes"] },
  { name: "Operations", items: ["Customers", "Business workflows", "Human escalation rules", "Internal procedures"] },
];

export const processSteps: ProcessStep[] = [
  { number: "01", title: "Business Discovery", text: "Understand the business and its repetitive work.", phase: "Choose services" },
  { number: "02", title: "Service Selection", text: "Identify which services are relevant.", phase: "Choose services" },
  { number: "03", title: "Template Selection", text: "Choose the right reusable base.", phase: "Choose services" },
  { number: "04", title: "Custom Configuration", text: "Fit the business, brand and systems.", phase: "Configure templates" },
  { number: "05", title: "Integration", text: "Connect the appropriate tools.", phase: "Configure templates" },
  { number: "06", title: "Knowledge Setup", text: "Process the relevant business information.", phase: "Configure templates" },
  { number: "07", title: "Testing", text: "Use realistic business scenarios.", phase: "Deploy" },
  { number: "08", title: "Deployment", text: "Deploy the finished client system.", phase: "Deploy" },
  { number: "09", title: "Handover", text: "Provide access, documentation and usage instructions.", phase: "Deploy" },
];

/**
 * Illustrative configurations taken from the company presentation.
 * The service selections are examples of how services can combine — not client case studies.
 */
export const deploymentExamples: DeploymentExample[] = [
  {
    id: "restaurant",
    name: "Restaurant",
    tagline: "Reservations, menu questions, opening hours and WhatsApp enquiries.",
    needs: ["Reservations", "Menu questions", "Opening hours", "WhatsApp enquiries"],
    serviceIds: ["ai-receptionist", "ai-customer-support"],
  },
  {
    id: "real-estate",
    name: "Real Estate",
    tagline: "Property enquiries, lead qualification, viewing requests and CRM follow-up.",
    needs: ["Property enquiries", "Lead qualification", "Viewing requests", "CRM follow-up"],
    serviceIds: ["ai-receptionist", "crm-automation"],
  },
  {
    id: "service-business",
    name: "Service-based business",
    tagline: "Customers arrive through WhatsApp, website and email — the system answers, routes and follows up.",
    needs: ["WhatsApp, website and email touchpoints", "Answers from business knowledge", "Routing and CRM updates"],
    serviceIds: ["ai-receptionist", "crm-automation", "ai-customer-support", "website-chatbot", "ai-email"],
  },
];

/** What determines the setup scope — from the commercial model slide. No prices are stated. */
export const scopingFactors = [
  "Number of AI services",
  "Complexity",
  "Number of integrations",
  "Business knowledge to process",
  "Custom workflows",
  "CRM integration",
  "Communication channels",
  "Website integration",
  "Call automation",
  "Document processing",
  "Testing requirements",
  "Deployment requirements",
];

export const commercialSteps = [
  "One-time setup",
  "Custom configuration",
  "Integration",
  "Knowledge setup",
  "Testing",
  "Deployment",
  "Handover",
];

export const technologyFoundation = [
  { area: "Frontend", tech: "Next.js + TypeScript", text: "" },
  { area: "Backend / database", tech: "Supabase", text: "Authentication, database, storage and backend services" },
  { area: "AI", tech: "OpenAI", text: "Core AI capabilities" },
  { area: "Automation", tech: "n8n", text: "Workflows, triggers, actions, scheduling, notifications and integrations" },
  { area: "Knowledge / RAG", tech: "PostgreSQL + pgvector", text: "Knowledge-base and retrieval functionality" },
  { area: "Integrations", tech: "APIs + Webhooks", text: "" },
  { area: "Hosting", tech: "Vercel", text: "" },
  { area: "Development", tech: "GitHub", text: "" },
];

/** The reusable technology layers uFirst.Ai builds. */
export const expertiseAreas = [
  { name: "Software", items: ["Platform code", "Frontend", "Backend", "APIs", "Database architecture"] },
  { name: "AI", items: ["Agent architecture", "Prompt architecture", "Tool calling", "Conversation management", "Structured responses"] },
  { name: "RAG", items: ["Document ingestion", "Retrieval architecture", "Knowledge-base architecture", "Vector search implementation"] },
  { name: "Automation", items: ["Workflow templates", "Triggers", "Actions", "Scheduling", "Notifications"] },
  { name: "Platform", items: ["Client management", "Dashboard", "Permissions", "Service activation", "Configuration", "Monitoring"] },
];

export const whyChooseUs = [
  {
    title: "One foundation, tailored to you",
    text: "Every system is built on the same reusable AI platform, then configured around your business, brand and processes.",
  },
  {
    title: "Only the services you need",
    text: "Choose from the ten core services. You do not have to buy them all.",
  },
  {
    title: "A defined path to deployment",
    text: "Nine clear steps from discovery to handover keep every engagement scoped and client-specific.",
  },
  {
    title: "People stay in the loop",
    text: "Human handoff is available where it matters, so AI supports your team rather than replacing judgement.",
  },
  {
    title: "Your data stays yours",
    text: "Client information and the uFirst.Ai platform are kept clearly separated.",
  },
  {
    title: "One-time implementation",
    text: "The primary model is a one-time setup for the system you need, with additional work handled separately when required.",
  },
];

/** Working principles derived from the delivery model. Formal company values are still to be supplied. */
export const workingPrinciples = [
  { title: "Build once, reuse widely", text: "Reusable technology and service templates make every deployment more consistent." },
  { title: "Configure for the business", text: "Each system reflects the client's brand, knowledge, systems and workflows." },
  { title: "Keep people in the loop", text: "Escalation and handoff are designed in wherever a person should step in." },
  { title: "Keep data separate", text: "Client data and platform technology stay clearly separated." },
  { title: "Scope honestly", text: "Every implementation is scoped to the system the client actually requires." },
];

export const homeFaqs: FaqItem[] = [
  {
    question: "Do I need all ten services?",
    answer:
      "No. Each client selects only the services they need. The deployment is shaped around your business and the channels you already use.",
  },
  {
    question: "Is uFirst.Ai a monthly subscription?",
    answer:
      "The primary model is a one-time implementation: setup, configuration, integration, knowledge setup, testing, deployment and handover. Additional work is handled separately when required. Get in touch to discuss the specifics for your business.",
  },
  {
    question: "What determines the setup price?",
    answer:
      "Every implementation is scoped to the system required — including the number of services, integrations, channels, knowledge to process and the complexity of your workflows. Each client can receive a proposal based on their requirements.",
  },
  {
    question: "What is RAG?",
    answer:
      "RAG gives AI access to your business's own knowledge. Your documents are processed into a knowledge base, relevant context is retrieved for each question, and the AI answers from that information.",
  },
  {
    question: "Can a person take over from the AI?",
    answer:
      "Yes. Human handoff remains available where required, and escalation rules are configured around how your business works.",
  },
  {
    question: "How is client data handled?",
    answer:
      "Client data and the uFirst.Ai platform should remain clearly separated. Get in touch to discuss the arrangements for your business.",
  },
];
