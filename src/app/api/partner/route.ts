import { handleFormPost } from "@/lib/form-handler";
import { partnerSchema } from "@/lib/validation";

export async function POST(request: Request) {
  return handleFormPost(request, partnerSchema, "partner");
}
