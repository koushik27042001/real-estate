import { useState } from "react";
import { faqs } from "./faqData";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <h3 className="text-2xl font-bold text-gray-800">Frequently asked questions</h3>
      <div className="mt-6 space-y-3">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={faq.question} className="rounded-lg border border-gray-100 p-4">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between text-left text-sm font-semibold text-gray-800"
              >
                <span>{faq.question}</span>
                <span className="text-lg">{isOpen ? "-" : "+"}</span>
              </button>
              {isOpen && <div className="mt-2 text-sm text-gray-600">{faq.answer}</div>}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FAQSection;
