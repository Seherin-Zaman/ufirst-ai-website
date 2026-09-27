import type { Service, ServiceCategory } from "@/types/content";

/** Categories used by the interactive service map. One service can belong to several. */
export const serviceCategories: ServiceCategory[] = [
  {
    id: "ai-rag",
    name: "AI & RAG",
    description: "Shared knowledge and retrieval infrastructure",
    color: "#4FA893",
  },
  {
    id: "communication",
    name: "Communication",
    description: "Everyday customer contact",
    color: "#7FA6D6",
  },
  {
    id: "crm-lead",
    name: "CRM & Lead Automation",
    description: "Capture, qualify and follow up",
    color: "#D4B876",
  },
  {
    id: "social-content",
    name: "Social & Content",
    description: "Content creation and publishing",
    color: "#B59AE0",
  },
  {
    id: "document-call",
    name: "Document & Call",
    description: "Turn conversations and documents into action",
    color: "#D19A6A",
  },
];

/** Cross-cutting capabilities that sit behind every service. */
export const platformWideCapabilities = [
  { name: "Automation", text: "Automation connects many services." },
  { name: "Human handoff", text: "Human handoff remains available where required." },
  { name: "Monitoring", text: "Monitoring supports the platform." },
];

/**
 * The 10 core services. Names, numbering and one-line summaries follow the
 * company presentation exactly. Capabilities and workflow steps expand each
 * summary without adding claims beyond it.
 */
export const services: Service[] = [
  {
    id: "ai-receptionist",
    slug: "ai-receptionist-lead-intake",
    number: "01",
    name: "AI Receptionist & Lead Intake",
    summary: "Initial enquiries, lead information and routing.",
    description:
      "The AI Receptionist handles the first conversation with a prospect or customer. It gathers the details your business needs, captures them as lead information and routes each enquiry to the right person or workflow.",
    icon: "headset",
    categories: ["communication", "crm-lead"],
    capabilities: [
      "Respond to initial enquiries",
      "Capture lead information",
      "Route enquiries to the right person or workflow",
      "Hand over to a person when required",
    ],
    workflow: [
      { title: "Understand", text: "The enquiry is read and its intent identified." },
      { title: "Capture", text: "Contact and enquiry details are collected in a structured form." },
      { title: "Route", text: "The lead moves on to your CRM, a notification or a team member." },
    ],
  },
  {
    id: "ai-customer-support",
    slug: "ai-customer-support-rag-helpdesk",
    number: "02",
    name: "AI Customer Support / RAG Helpdesk",
    summary: "Answers grounded in business information.",
    description:
      "A helpdesk that answers customer questions from your own information — policies, FAQs, manuals and pricing — rather than from generic knowledge. It uses the shared RAG layer, so answers stay tied to what your business actually says.",
    icon: "life-buoy",
    categories: ["ai-rag", "communication"],
    capabilities: [
      "Answer questions from your own documents",
      "Use policies, FAQs, manuals and pricing as context",
      "Escalate to a person when a question needs one",
      "Share one knowledge layer with your other services",
    ],
    workflow: [
      { title: "Understand", text: "The customer's question and intent are interpreted." },
      { title: "Retrieve", text: "Relevant business information is found through vector search." },
      { title: "Answer", text: "The response is written from your information, or handed to a person." },
    ],
  },
  {
    id: "social-dm-agent",
    slug: "social-media-dm-comment-agent",
    number: "03",
    name: "Social Media DM & Comment Agent",
    summary: "Questions, opportunities and escalation.",
    description:
      "An agent for the conversations that happen in your social channels. It answers common questions, recognises when a message is a business opportunity and escalates to your team when a person should take over.",
    icon: "messages",
    categories: ["communication", "social-content"],
    capabilities: [
      "Respond to questions in direct messages and comments",
      "Recognise opportunities in social conversations",
      "Escalate to your team where a person should step in",
      "Follow your brand's communication style",
    ],
    workflow: [
      { title: "Listen", text: "Incoming messages and comments are picked up from your channels." },
      { title: "Respond", text: "Questions are answered in your communication style." },
      { title: "Escalate", text: "Opportunities and sensitive messages go to the right person." },
    ],
  },
  {
    id: "ai-email",
    slug: "ai-email-management",
    number: "04",
    name: "AI Email Management",
    summary: "Classify, draft and follow up appropriately.",
    description:
      "Email handled with structure. Incoming messages are classified, replies are drafted for the situation and follow-ups are prepared, with people kept in the loop wherever your process requires it.",
    icon: "mail",
    categories: ["communication"],
    capabilities: [
      "Classify incoming email",
      "Draft replies suited to the message",
      "Prepare appropriate follow-ups",
      "Keep a person in the loop where your process needs one",
    ],
    workflow: [
      { title: "Classify", text: "Each message is sorted by what it is and what it needs." },
      { title: "Draft", text: "A reply is prepared using your business context." },
      { title: "Follow up", text: "Follow-ups are scheduled or flagged as appropriate." },
    ],
  },
  {
    id: "knowledge-base",
    slug: "knowledge-base-rag-agent",
    number: "05",
    name: "Knowledge Base / RAG Agent",
    summary: "Organized knowledge accessible to AI systems.",
    description:
      "Your business information — PDFs, policies, manuals, FAQs and pricing — processed into an organized knowledge base that AI systems can search. It is the foundation the support helpdesk and website chatbot draw on.",
    icon: "book",
    categories: ["ai-rag"],
    capabilities: [
      "Process PDFs, policies, manuals, FAQs and pricing",
      "Organize them into a searchable knowledge base",
      "Retrieve the relevant context through vector search",
      "Configure knowledge once and reuse it across services",
    ],
    workflow: [
      { title: "Collect", text: "Your source documents are gathered." },
      { title: "Process", text: "Documents are structured and prepared for retrieval." },
      { title: "Retrieve", text: "AI systems find the relevant context when they need it." },
    ],
  },
  {
    id: "crm-automation",
    slug: "crm-automation-ai-follow-up",
    number: "06",
    name: "CRM Automation & AI Follow-up",
    summary: "Lead capture, updates, reminders and follow-ups.",
    description:
      "Keeps your CRM current and your leads moving. Lead details are captured, records are updated, and reminders and follow-ups are triggered so opportunities are not left waiting.",
    icon: "workflow",
    categories: ["crm-lead"],
    capabilities: [
      "Capture leads into your CRM",
      "Update records automatically",
      "Set reminders for your team",
      "Trigger follow-ups at the right moment",
    ],
    workflow: [
      { title: "Capture", text: "Lead details arrive from your channels." },
      { title: "Update", text: "CRM records are created or updated." },
      { title: "Follow up", text: "Reminders and follow-ups are triggered." },
    ],
  },
  {
    id: "content-scheduler",
    slug: "ai-content-social-media-scheduler",
    number: "07",
    name: "AI Content & Social Media Scheduler",
    summary: "Content prepared around brand and audience.",
    description:
      "Content prepared around your brand and your audience, then scheduled for publishing. The service works from your brand identity and communication style so what goes out sounds like your business.",
    icon: "calendar",
    categories: ["social-content"],
    capabilities: [
      "Prepare content around your brand and audience",
      "Follow your communication style",
      "Schedule posts for publishing",
      "Work alongside your social conversations",
    ],
    workflow: [
      { title: "Brief", text: "Your brand, audience and topics guide the content." },
      { title: "Prepare", text: "Content is drafted in your style." },
      { title: "Schedule", text: "Approved content is scheduled for publishing." },
    ],
  },
  {
    id: "call-summary",
    slug: "ai-call-summary-crm-integration",
    number: "08",
    name: "AI Call Summary & CRM Integration",
    summary: "Call workflows, summaries and CRM updates.",
    description:
      "Turns phone conversations into usable business records. Calls are summarised and the outcome flows into your CRM, so what was said on a call becomes an update rather than a memory.",
    icon: "audio",
    categories: ["crm-lead", "document-call"],
    capabilities: [
      "Support call workflows",
      "Summarise calls",
      "Update your CRM from call outcomes",
      "Connect calls to follow-up actions",
    ],
    workflow: [
      { title: "Capture", text: "The call is processed as part of a defined workflow." },
      { title: "Summarise", text: "A clear summary of the conversation is prepared." },
      { title: "Update", text: "Outcomes are written to your CRM." },
    ],
  },
  {
    id: "invoice-processor",
    slug: "smart-invoice-document-processor",
    number: "09",
    name: "Smart Invoice & Document Processor",
    summary: "Unstructured documents into usable data.",
    description:
      "Documents arrive in many shapes. This service turns unstructured invoices and documents into structured, usable data that your systems and your team can work with.",
    icon: "file-scan",
    categories: ["document-call"],
    capabilities: [
      "Read unstructured documents",
      "Extract the information that matters",
      "Produce structured, usable data",
      "Pass results on to your systems",
    ],
    workflow: [
      { title: "Receive", text: "Documents come in from the channels you already use." },
      { title: "Extract", text: "Key information is pulled out of the document." },
      { title: "Deliver", text: "Structured data is passed to where it is needed." },
    ],
  },
  {
    id: "website-chatbot",
    slug: "website-chatbot-human-handoff",
    number: "10",
    name: "Website Chatbot & Human Handoff",
    summary: "Website conversations with human escalation.",
    description:
      "A chatbot for your website that answers from your business knowledge and hands the conversation to a person when it should. Visitors get quick answers; your team steps in where it matters.",
    icon: "bot",
    categories: ["ai-rag", "communication"],
    capabilities: [
      "Hold website conversations",
      "Answer from your knowledge base",
      "Escalate to a person through human handoff",
      "Capture visitor details where appropriate",
    ],
    workflow: [
      { title: "Welcome", text: "Visitors start a conversation on your website." },
      { title: "Answer", text: "Responses draw on your business information." },
      { title: "Hand off", text: "A person takes over when the conversation calls for it." },
    ],
  },
];
