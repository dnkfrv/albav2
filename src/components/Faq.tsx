import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export type FaqItem = { q: string; a: string };

/** Accordion list of questions; one open at a time is not enforced on purpose. */
export const FaqList: React.FC<{ items: FaqItem[]; className?: string }> = ({
  items,
  className = "",
}) => (
  <div className={className}>
    {items.map((item) => (
      <details
        key={item.q}
        className="group border-b border-[#644A42]/20 py-2 [&_summary::-webkit-details-marker]:hidden"
      >
        <summary className="flex cursor-pointer list-none items-baseline justify-between gap-4 text-[#2a211d] hover:text-[#e62d3b] focus:outline-none focus-visible:text-[#e62d3b]">
          <span>{item.q}</span>
          <span
            aria-hidden="true"
            className="text-[#644A42] transition-transform duration-200 group-open:rotate-45"
          >
            +
          </span>
        </summary>
        <p className="mt-1.5 pr-6 text-[#644A42]">{item.a}</p>
      </details>
    ))}
  </div>
);

/** Mobile: a text link that opens the questions in a bottom sheet. */
export const FaqSheet: React.FC<{
  items: FaqItem[];
  title: string;
  trigger: string;
}> = ({ items, title, trigger }) => (
  <Sheet>
    <SheetTrigger asChild>
      <button className="font-kommon text-xs text-[#644A42] hover:text-[#4B362F] transition-colors focus:outline-none">
        {trigger}
      </button>
    </SheetTrigger>
    <SheetContent
      side="bottom"
      className="max-h-[85svh] overflow-y-auto bg-background font-kommon"
    >
      <SheetHeader>
        <SheetTitle
          className="text-left text-2xl font-normal text-[#2a211d]"
          style={{ fontFamily: '"Times Now Light", serif' }}
        >
          {title}
        </SheetTitle>
      </SheetHeader>
      <FaqList
        items={items}
        className="mt-4 text-[15px] leading-snug"
      />
    </SheetContent>
  </Sheet>
);
