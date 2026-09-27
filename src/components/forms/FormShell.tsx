import { CheckCircle2, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/Button";

type Status = "idle" | "submitting" | "success" | "error";

/** Shared success / error / submit chrome for the site's forms. */
export function FormSuccess({ title, text, onReset }: { title: string; text: string; onReset: () => void }) {
  return (
    <div role="status" className="rounded-3xl border border-forest-600/30 bg-forest-100 p-8 text-forest-900">
      <CheckCircle2 aria-hidden className="size-9 text-forest-600" />
      <h3 className="mt-4 font-display text-2xl font-semibold">{title}</h3>
      <p className="mt-2 max-w-md">{text}</p>
      <Button variant="secondary" className="mt-6 border-forest-900/25 text-forest-900 hover:bg-forest-200" onClick={onReset}>
        Submit another enquiry
      </Button>
    </div>
  );
}

export function FormError({ message, hasFieldErrors }: { message: string; hasFieldErrors: boolean }) {
  if (!message) return null;
  return (
    <div role="alert" className="flex gap-3 rounded-2xl border border-red-300 bg-red-50 p-4 text-[0.95rem] text-red-900">
      <TriangleAlert aria-hidden className="mt-0.5 size-5 shrink-0" />
      <p>{message}{hasFieldErrors ? " Review the highlighted fields below." : ""}</p>
    </div>
  );
}

export function SubmitButton({ status, children }: { status: Status; children: string }) {
  return (
    <Button type="submit" variant="primary" size="lg" arrow disabled={status === "submitting"} className="w-full sm:w-auto">
      {status === "submitting" ? "Sending…" : children}
    </Button>
  );
}
