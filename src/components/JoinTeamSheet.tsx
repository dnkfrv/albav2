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

export const JoinTeamSheet: React.FC = () => {
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
        <button className="font-kommon text-xs md:text-sm focus:outline-none">
          {/* мобильная версия — просто текст-ссылка */}
          <span className="inline-block md:hidden text-[#644A42] hover:text-[#4B362F] transition-colors">
            Join our team
          </span>

          {/* десктопная версия — как текст под выделением */}
          <span className="hidden md:inline-block bg-[#644A42] text-[#f4f0eb] px-[0.5px] py-[2px] leading-[1.2]">
            Join our team
          </span>
        </button>
      </SheetTrigger>

      <SheetContent className="w-full sm:w-[540px] overflow-y-auto bg-background font-kommon">
        <SheetHeader>
          <SheetTitle className="text-xl font-semibold tracking-wide text-[#644A42]">
            Join Alba Bistro
          </SheetTitle>
          <SheetDescription className="mt-2 text-sm text-[#644A42]/80 text-center">
            Join Alba Bistro and be part of a team that values creativity,
            quality, and community. We&apos;re always looking for passionate
            individuals who share our love for exceptional food, drinks and
            warm hospitality.
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {/* Full Name */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-[#644A42]">
              Full Name
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
                Email
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
                Phone
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
              Position of Interest
            </label>
            <input
              type="text"
              name="position"
              placeholder="e.g., Chef, Server, Barista"
              className="w-full rounded-md border border-[#e0d5cb] bg-background px-3 py-2 text-sm text-[#644A42] placeholder:text-[#b8a89c] focus:outline-none focus:ring-2 focus:ring-[#644A42]/40 focus:border-[#644A42]"
            />
          </div>

          {/* Previous Experience */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-[#644A42]">
              Previous Experience
            </label>
            <textarea
              rows={5}
              name="experience"
              placeholder="Tell us about your background and why you'd like to join our team..."
              className="w-full rounded-md border border-[#e0d5cb] bg-background px-3 py-2 text-sm text-[#644A42] placeholder:text-[#b8a89c] focus:outline-none focus:ring-2 focus:ring-[#644A42]/40 focus:border-[#644A42] resize-vertical"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={status === "submitting"}
            className="mt-2 w-full rounded-md bg-[#3b302b] px-4 py-2.5 text-sm font-semibold text-white tracking-wide hover:bg-[#2b211d] disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
          >
            {status === "submitting" ? "Sending..." : "Submit Application"}
          </button>

          {status === "success" && (
            <p className="text-xs text-green-700 text-center mt-2">
              Thank you! Your application has been submitted.
            </p>
          )}

          {status === "error" && (
            <p className="text-xs text-red-700 text-center mt-2">
              Something went wrong. Please try again later.
            </p>
          )}
        </form>
      </SheetContent>
    </Sheet>
  );
};
