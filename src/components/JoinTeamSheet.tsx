import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";

export const JoinTeamSheet: React.FC = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: сюда можно будет добавить отправку формы на backend / почту
    console.log("Join our team form submitted");
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        {/* 
          Мобилка: просто текст-ссылка.
          Десктоп: «выделенный» текст (фон + светлый текст).
        */}
        <button
          className="
            inline-block
            text-xs md:text-sm
            font-kommon
            leading-snug
            text-[#644A42]
            bg-transparent
            px-0 py-0
            hover:text-[#4B362F]
            md:px-1.5 md:py-[1px]
            md:bg-[#644A42]
            md:text-[#F5F1EC]
            md:hover:bg-[#644A42]
            md:hover:text-[#F5F1EC]
            rounded-[2px]
            select-none
            focus:outline-none
          "
        >
          Join our team
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
              placeholder="Tell us about your background and why you'd like to join our team..."
              className="w-full rounded-md border border-[#e0d5cb] bg-background px-3 py-2 text-sm text-[#644A42] placeholder:text-[#b8a89c] focus:outline-none focus:ring-2 focus:ring-[#644A42]/40 focus:border-[#644A42] resize-vertical"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="mt-2 w-full rounded-md bg-[#3b302b] px-4 py-2.5 text-sm font-semibold text-white tracking-wide hover:bg-[#2b211d] transition-colors"
          >
            Submit Application
          </button>
        </form>
      </SheetContent>
    </Sheet>
  );
};
