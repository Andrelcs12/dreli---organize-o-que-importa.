"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MessageCircleQuestion, Sparkles } from "lucide-react";
import { useState } from "react";
import { assistantFaqs } from "@/features/landing/service/assistant-faq";

export function LandingAssistant() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const selected = assistantFaqs[selectedIndex];

  return (
    <section id="assistente" className="assistant-section shell">
      <div className="assistant-copy">
        <p className="eyebrow">
          <span /> Assistente inicial
        </p>
        <h2>Dúvidas objetivas, sem um chat vazio.</h2>
        <p>
          Enquanto o assistente contextual não existe, esta área responde as
          perguntas mais importantes sobre o Dreli. Depois, ela evolui com a sua
          biblioteca.
        </p>
        <div className="faq-questions">
          {assistantFaqs.map((item, index) => (
            <button
              className={selectedIndex === index ? "selected" : ""}
              key={item.question}
              onClick={() => setSelectedIndex(index)}
              type="button"
            >
              <MessageCircleQuestion />
              {item.question}
            </button>
          ))}
        </div>
      </div>
      <div className="faq-chat" aria-live="polite">
        <div className="chat-top">
          <span className="assistant-orb">
            <Sparkles />
          </span>
          <div>
            <strong>Assistente Dreli</strong>
            <small>Respostas sobre o produto</small>
          </div>
          <span className="chat-options">•••</span>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="faq-answer"
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            key={selected.question}
            transition={{ duration: 0.22 }}
          >
            <p className="faq-question">{selected.question}</p>
            <p>{selected.answer}</p>
          </motion.div>
        </AnimatePresence>
        <span className="faq-note">
          Em breve: respostas com base na sua própria biblioteca.
        </span>
      </div>
    </section>
  );
}
