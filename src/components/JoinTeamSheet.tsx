// src/components/JoinTeamSheet.tsx
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mldkoeyz"; // замени на свой URL из Formspree

const TEXT = {
  "en": {
    "trigger": "Join our team",
    "title": "Join Alba",
    "desc": "Join Alba and be part of a team that values creativity, quality, and community. We're always looking for passionate individuals who share our love for exceptional food, drinks and warm hospitality.",
    "name": "Full Name",
    "email": "Email",
    "phone": "Phone",
    "position": "Position of Interest",
    "positionPh": "e.g., Chef, Server, Barista",
    "exp": "Previous Experience",
    "expPh": "Tell us about your background and why you'd like to join our team...",
    "sending": "Sending...",
    "submit": "Submit Application",
    "ok": "Thank you! Your application has been submitted.",
    "err": "Something went wrong. Please try again later."
  },
  "pt": {
    "trigger": "Junte-se à equipa",
    "title": "Junte-se ao Alba",
    "desc": "Junte-se ao Alba e faça parte de uma equipa que valoriza a criatividade, a qualidade e a comunidade. Procuramos sempre pessoas apaixonadas que partilhem o nosso gosto por boa comida, boas bebidas e um serviço acolhedor.",
    "name": "Nome completo",
    "email": "Email",
    "phone": "Telefone",
    "position": "Função pretendida",
    "positionPh": "ex.: Cozinheiro, Empregado de mesa, Barista",
    "exp": "Experiência anterior",
    "expPh": "Fale-nos do seu percurso e porque gostaria de se juntar à nossa equipa...",
    "sending": "A enviar...",
    "submit": "Enviar candidatura",
    "ok": "Obrigado! A sua candidatura foi enviada.",
    "err": "Algo correu mal. Tente novamente mais tarde."
  }
};

export const JoinTeamSheet: React.FC<{ lang?: "en" | "pt"; triggerClassName?: string }> = ({ lang = "en", triggerClassName }) => {
  const tx = TEXT[lang];
  const [status, setStatus] = React.useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        {triggerClassName ? (
          <button className={triggerClassName}>{tx.trigger}</button>
        ) : (
        <button className="font-kommon text-xs md:text-sm focus:outline-none">
          {/* мобильная версия — просто текст-ссылка */}
          <span className="inline-block md:hidden text-[#644A42] hover:text-[#4B362F] transition-colors">
            {tx.trigger}
          </span>

          {/* десктопная версия — как текст под выделением */}
          <span className="hidden md:inline-block bg-[#644A42] text-[#f4f0eb] px-[0.5px] py-[2px] leading-[1.2]">
            {tx.trigger}
          </span>
        </button>
        )}
      </SheetTrigger>

      <SheetContent className="w-full sm:w-[540px] overflow-y-auto bg-background font-kommon">
        <SheetHeader>
          <SheetTitle className="text-xl font-semibold tracking-wide text-[#644A42]">
            {tx.title}
          </SheetTitle>
          <SheetDescription className="mt-2 text-sm text-[#644A42]/80 text-center">
            {tx.desc}
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {/* Full Name */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-[#644A42]">
              {tx.name}
            </label>
            <input
              type="text"
              name="fullName"
              required
              className="w-full rounded-md border border-[#e0d5cb] bg-background px-3 py-2 text-sm text-[#644A42] placeholder:text-[#b8a89c] focus:outline-none focus:ring-2 focus:ring-[#644A42]/40 focus:border-[#644A42]"
            />
          </div>

          {/* Email + Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-[#644A42]">
                {tx.email}
              </label>
              <input
                type="email"
                name="email"
                required
                className="w-full rounded-md border border-[#e0d5cb] bg-background px-3 py-2 text-sm text-[#644A42] placeholder:text-[#b8a89c] focus:outline-none focus:ring-2 focus:ring-[#644A42]/40 focus:border-[#644A42]"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-sm font-medium text-[#644A42]">
                {tx.phone}
              </label>
              <input
                type="tel"
                name="phone"
                className="w-full rounded-md border border-[#e0d5cb] bg-background px-3 py-2 text-sm text-[#644A42] placeholder:text-[#b8a89c] focus:outline-none focus:ring-2 focus:ring-[#644A42]/40 focus:border-[#644A42]"
              />
            </div>
          </div>

          {/* Position of Interest */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-[#644A42]">
              {tx.position}
            </label>
            <input
              type="text"
              name="position"
              placeholder={tx.positionPh}
              className="w-full rounded-md border border-[#e0d5cb] bg-background px-3 py-2 text-sm text-[#644A42] placeholder:text-[#b8a89c] focus:outline-none focus:ring-2 focus:ring-[#644A42]/40 focus:border-[#644A42]"
            />
          </div>

          {/* Previous Experience */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-[#644A42]">
              {tx.exp}
            </label>
            <textarea
              rows={5}
              name="experience"
              placeholder={tx.expPh}
              className="w-full rounded-md border border-[#e0d5cb] bg-background px-3 py-2 text-sm text-[#644A42] placeholder:text-[#b8a89c] focus:outline-none focus:ring-2 focus:ring-[#644A42]/40 focus:border-[#644A42] resize-vertical"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={status === "submitting"}
            className="mt-2 w-full rounded-md bg-[#3b302b] px-4 py-2.5 text-sm font-semibold text-white tracking-wide hover:bg-[#2b211d] disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
          >
            {status === "submitting" ? tx.sending : tx.submit}
          </button>

          {status === "success" && (
            <p className="text-xs text-green-700 text-center mt-2">
              {tx.ok}
            </p>
          )}

          {status === "error" && (
            <p className="text-xs text-red-700 text-center mt-2">
              {tx.err}
            </p>
          )}
        </form>
      </SheetContent>
    </Sheet>
  );
};
