import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ChevronRight, Plus } from "lucide-react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export type Crumb = { label: string; to?: string; params?: Record<string, string> };

export function PageShell({
  eyebrow,
  title,
  description,
  crumbs,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  crumbs: Crumb[];
  children: ReactNode;
}) {
  return (
    <main className="relative min-h-screen">
      <Navbar />

      {/* ambient glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute left-1/2 top-0 h-[40rem] w-[60rem] -translate-x-1/2 rounded-full opacity-50 blur-3xl"
          style={{ background: "radial-gradient(circle, oklch(0.55 0.18 28 / 0.22), transparent 60%)" }}
        />
      </div>

      <section className="relative z-10 pt-28 pb-12 px-4 sm:px-6">
        <div className="mx-auto max-w-7xl">
          {/* breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-1.5 text-[12px] font-mono uppercase tracking-[0.18em] text-muted-foreground mb-8"
          >
            {crumbs.map((c, i) => {
              const last = i === crumbs.length - 1;
              return (
                <span key={i} className="flex items-center gap-1.5">
                  {c.to && !last ? (
                    <Link
                      to={c.to as any}
                      params={c.params as any}
                      className="hover:text-rose-gold transition-colors"
                    >
                      {c.label}
                    </Link>
                  ) : (
                    <span className={last ? "text-foreground/90" : ""}>{c.label}</span>
                  )}
                  {!last && <ChevronRight className="h-3 w-3 text-muted-foreground/60" />}
                </span>
              );
            })}
          </motion.nav>

          {eyebrow && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1, duration: 0.5 }}
              className="text-xs uppercase tracking-[0.35em] text-rose-gold font-mono mb-4"
            >
              {eyebrow}
            </motion.div>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-4xl sm:text-5xl md:text-6xl font-light leading-[1.02] tracking-tight"
          >
            {title}
          </motion.h1>

          {description && (
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mt-5 max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed"
            >
              {description}
            </motion.p>
          )}
        </div>
      </section>

      <section className="relative z-10 pb-28 px-4 sm:px-6">
        <div className="mx-auto max-w-7xl">{children}</div>
      </section>

      <Footer />
    </main>
  );
}
