"use client";

import * as Accordion from "@radix-ui/react-accordion";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: readonly FaqItem[];
}

export function FaqAccordion({ items }: FaqAccordionProps) {
  return (
    <Accordion.Root className="faq-accordion" type="single" collapsible>
      {items.map((item) => (
        <Accordion.Item key={item.id} className="faq-item" value={item.id}>
          <Accordion.Header>
            <Accordion.Trigger className="faq-trigger">
              <span>{item.question}</span>
              <span className="faq-plus" aria-hidden="true">
                +
              </span>
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="faq-content">
            <div>
              <p>{item.answer}</p>
            </div>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
