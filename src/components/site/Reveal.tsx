import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeader({ eyebrow, title, description }: { eyebrow?: string; title: string; description?: string }) {
  return (
    <Reveal className="max-w-3xl mb-12">
      {eyebrow && <div className="text-xs uppercase tracking-[0.3em] text-rose-gold mb-4 font-mono">{eyebrow}</div>}
      <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light leading-[1.05] mb-5">
        {title.split("|").map((part, i) =>
          i % 2 ? <span key={i} className="text-gradient-gold italic">{part}</span> : <span key={i}>{part}</span>
        )}
      </h2>
      {description && <p className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">{description}</p>}
    </Reveal>
  );
}
