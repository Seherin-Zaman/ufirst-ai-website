import { cn } from "@/lib/cn";

interface BaseProps {
  name: string;
  label: string;
  error?: string;
  required?: boolean;
  hint?: string;
}

const inputClasses =
  "w-full rounded-xl border bg-white px-4 py-3 text-[1rem] text-forest-950 placeholder:text-forest-950/40 transition-colors focus:border-forest-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-forest-600/30";

function Wrapper({ name, label, error, required, hint, children }: BaseProps & { children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-[0.93rem] font-medium text-fg">
        {label}
        {required ? (
          <span aria-hidden className="ml-0.5 text-gold-600">*</span>
        ) : (
          <span className="ml-1.5 font-normal text-muted">(optional)</span>
        )}
      </label>
      {children}
      {hint && !error && (
        <p id={`${name}-hint`} className="mt-1.5 text-sm text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${name}-error`} role="alert" className="mt-1.5 text-sm font-medium text-red-700 [.tone-dark_&]:text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}

const describedBy = (name: string, error?: string, hint?: string) =>
  error ? `${name}-error` : hint ? `${name}-hint` : undefined;

export function TextField({
  type = "text",
  autoComplete,
  ...props
}: BaseProps & { type?: "text" | "email" | "tel" | "url"; autoComplete?: string }) {
  const { name, error, required, hint } = props;
  return (
    <Wrapper {...props}>
      <input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={describedBy(name, error, hint)}
        className={cn(inputClasses, error ? "border-red-600" : "border-forest-950/20")}
      />
    </Wrapper>
  );
}

export function SelectField({ options, ...props }: BaseProps & { options: string[] }) {
  const { name, error, required, hint } = props;
  return (
    <Wrapper {...props}>
      <select
        id={name}
        name={name}
        required={required}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={describedBy(name, error, hint)}
        defaultValue=""
        className={cn(inputClasses, "appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2218%22 height=%2218%22 fill=%22none%22 stroke=%22%230a1a14%22 stroke-width=%222%22 viewBox=%220 0 24 24%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[length:18px] bg-[right_1rem_center] bg-no-repeat pr-11", error ? "border-red-600" : "border-forest-950/20")}
      >
        <option value="" disabled>
          Select an option
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </Wrapper>
  );
}

export function TextAreaField({ rows = 5, ...props }: BaseProps & { rows?: number }) {
  const { name, error, required, hint } = props;
  return (
    <Wrapper {...props}>
      <textarea
        id={name}
        name={name}
        rows={rows}
        required={required}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={describedBy(name, error, hint)}
        className={cn(inputClasses, "resize-y", error ? "border-red-600" : "border-forest-950/20")}
      />
    </Wrapper>
  );
}

/** Hidden anti-spam field. Real users never see or fill it. */
export function Honeypot() {
  return (
    <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label htmlFor="_gotcha">Leave this field empty</label>
      <input id="_gotcha" name="_gotcha" type="text" tabIndex={-1} autoComplete="off" />
    </div>
  );
}
