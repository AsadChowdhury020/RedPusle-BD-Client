import React from "react";
import Container from "../../../../components/Shared/Container";

const faqs = [
  {
    question: "Who can donate blood?",
    answer:
      "Healthy individuals between the ages of 18 and 60 can donate blood if they meet the medical requirements.",
  },
  {
    question: "Is blood donation safe?",
    answer:
      "Yes. Blood donation is completely safe. Sterile and disposable equipment is used for every donor.",
  },
  {
    question: "How often can I donate blood?",
    answer:
      "Generally, you can donate whole blood every 3 to 4 months depending on medical advice.",
  },
  {
    question: "Is this service free?",
    answer:
      "Yes. RedPulseBD is a completely free platform connecting blood donors and recipients.",
  },
  {
    question: "How can I find blood in an emergency?",
    answer:
      "You can create an urgent blood request on our platform and nearby donors will be notified instantly.",
  },
  {
    question: "Is my personal information secure?",
    answer:
      "Yes. We prioritize user privacy and never share personal information without consent.",
  },
];

const FAQSection = () => {
  return (
    <Container>
      <section className="py-16 bg-base-200">
        <div className="max-w-4xl mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-4xl font-bold text-primary">
              Frequently Asked Questions
            </h2>
            <p className="mt-3 text-gray-600">
              Find answers to common questions about blood donation and
              RedPulseBD.
            </p>
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="collapse collapse-arrow bg-white rounded-xl"
              >
                <input type="checkbox" />
                <div className="collapse-title text-lg font-medium">
                  {faq.question}
                </div>
                <div className="collapse-content text-gray-600">
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Note */}
          <p className="mt-8 text-center text-sm text-gray-500">
            Still have questions? Feel free to contact our support team anytime.
          </p>
        </div>
      </section>
    </Container>
  );
};

export default FAQSection;
