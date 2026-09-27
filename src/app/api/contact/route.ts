import { handleFormPost } from "@/lib/form-handler";
import { contactSchema } from "@/lib/validation";

export async function POST(request: Request) {
  return handleFormPost(request, contactSchema, "contact");
}
