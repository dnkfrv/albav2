import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// Same Formspree inbox as the job form; "form" and "_subject" tell the two apart
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mldkoeyz";

export type ContactCopy = {
  trigger: string;
  title: string;
  intro: string;
  reasonLabel: string;
  reasons: string[];
  name: string;
  email: string;
  message: string;
  send: string;
  sending: string;
  ok: string;
  err: string;
};

const field =
  "w-full rounded-md border border-[#e0d5cb] bg-background px-3 py-2 text-sm text-[#644A42] placeholder:text-[#b8a89c] focus:outline-none focus:ring-2 focus:ring-[#644A42]/40 focus:border-[#644A42]";

export const ContactSheet: React.FC<{ copy: ContactCopy; triggerClassName?: string }> = ({
  copy,
  triggerClassName = "",
}) => {
  const [status, setStatus] = React.useState<"idle" | "sending" | "ok" | "err">("idle");
  const [reason, setReason] = React.useState(copy.reasons[0]);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);
    data.set("reason", reason);
    data.set("form", "contact");
    data.set("_subject", `Alba website: ${reason}`);
    try {
      const r = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!r.ok) throw new Error();
      setStatus("ok");
      form.reset();
      if (typeof window.gtag === "function") window.gtag("event", "contact_submit", { reason });
    } catch {
      setStatus("err");
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className={`font-kommon focus:outline-none ${triggerClassName}`} data-track="contact_open">
          {copy.trigger}
        </button>
      </SheetTrigger>
      <SheetContent className="w-full sm:w-[480px] overflow-y-auto bg-background font-kommon">
        <SheetHeader>
          <SheetTitle
            className="text-left text-3xl font-normal text-[#2a211d]"
            style={{ fontFamily: '"Times Now Light", serif' }}
          >
            {copy.title}
          </SheetTitle>
          <SheetDescription className="text-left text-sm text-[#644A42]">{copy.intro}</SheetDescription>
        </SheetHeader>

        <form onSubmit={submit} className="mt-6 space-y-5">
          <fieldset>
            <legend className="mb-2 text-sm text-[#644A42]">{copy.reasonLabel}</legend>
            <div className="flex flex-wrap gap-2">
              {copy.reasons.map((r) => (
                <button
                  key={r}
                  type="button"
                  aria-pressed={reason === r}
                  onClick={() => setReason(r)}
                  className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
                    reason === r
                      ? "border-[#644A42] bg-[#644A42] text-[#f4f0eb]"
                      : "border-[#e0d5cb] text-[#644A42] hover:border-[#644A42]"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="space-y-1 text-sm text-[#644A42]">
              <span className="block">{copy.name}</span>
              <input name="name" required className={field} autoComplete="name" />
            </label>
            <label className="space-y-1 text-sm text-[#644A42]">
              <span className="block">{copy.email}</span>
              <input name="email" type="email" required className={field} autoComplete="email" />
            </label>
          </div>

          <label className="block space-y-1 text-sm text-[#644A42]">
            <span className="block">{copy.message}</span>
            <textarea name="message" rows={5} required className={`${field} resize-y`} />
          </label>

          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full rounded-md bg-[#3b302b] px-4 py-2.5 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-[#2b211d] disabled:opacity-70"
          >
            {status === "sending" ? copy.sending : copy.send}
          </button>
          {status === "ok" && <p className="text-center text-xs text-green-700">{copy.ok}</p>}
          {status === "err" && <p className="text-center text-xs text-red-700">{copy.err}</p>}
        </form>
      </SheetContent>
    </Sheet>
  );
};
