import { useState } from "react";
import { faqs } from "./faqData";
import { ChevronDown, HelpCircle } from "lucide-react";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-3xl px-6">
        <div className="mb-12 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-600">
            <HelpCircle className="h-3.5 w-3.5" />
            Support
          </span>
          <h3 className="mt-3 text-2xl font-bold text-slate-800 md:text-3xl">
            Frequently asked questions
          </h3>
          <p className="mt-2 text-slate-600">Everything you need to know about posting your property</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className={`overflow-hidden rounded-xl border transition-all duration-200 ${
                  isOpen
                    ? "border-sky-200 bg-sky-50/30 shadow-sm"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-slate-50/50"
                >
                  <span className="font-semibold text-slate-800">{faq.question}</span>
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all ${
                      isOpen ? "rotate-180 bg-sky-100 text-sky-600" : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-200 ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="border-t border-slate-200/80 px-5 py-4 text-sm text-slate-600">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
