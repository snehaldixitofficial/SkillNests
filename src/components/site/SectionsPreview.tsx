import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  BookOpen, Compass, Trophy, Gavel, Users, Code2, Heart, ArrowUpRight,
  Calculator, Atom, FlaskConical, Dna,
} from "lucide-react";

const sections = [
  { to: "/pyq", icon: BookOpen, eyebrow: "01 — Academics", title: "Past-Year Papers", body: "Five years, drilled by subject and year.", count: "6 subjects · 5 yrs" },
  { to: "/career", icon: Compass, eyebrow: "02 — Direction", title: "Career Sessions", body: "Weekly mentor-led explorations across domains.", count: "5 sessions / wk" },
  { to: "/olympiad", icon: Trophy, eyebrow: "03 — Depth", title: "Olympiad Atelier", body: "Math, science, informatics and linguistics tracks.", count: "4 tracks" },
  { to: "/mun", icon: Gavel, eyebrow: "04 — Voice", title: "MUN & Debate", body: "Committee briefs, blocs and resources.", count: "4 agendas" },
  { to: "/community", icon: Users, eyebrow: "05 — Together", title: "Skill Nests", body: "Peer-led classes — art, chess, music, craft.", count: "6 classes" },
  { to: "/coding", icon: Code2, eyebrow: "06 — Build", title: "Coding Campus", body: "JS, Python, React, algorithms — taught live.", count: "4 tracks" },
  { to: "/founder", icon: Heart, eyebrow: "07 — Founder", title: "Founder's Corner", body: "A quiet note on why this nest exists.", count: "Read · DM" },
];

export function SectionsPreview() {
  return (
    <section className="relative py-24 px-4 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }} className="max-w-2xl mb-12"
        >
          <div className="text-xs uppercase tracking-[0.3em] text-rose-gold font-mono mb-3">The Atelier</div>
          <h2 className="font-serif text-4xl sm:text-5xl font-light leading-[1.05]">
            Choose your <span className="italic text-gradient-rose">corner.</span>
          </h2>
          <p className="mt-4 text-base text-muted-foreground leading-relaxed">
            Each section opens into its own quiet room — drill in as deep as you'd like.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {sections.map((s, i) => (
            <motion.div
              key={s.to}
              initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                to={s.to as any}
                className="group block matte-glass rounded-2xl p-6 h-full transition-transform duration-500 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-5">
                  <span className="grid h-11 w-11 place-items-center rounded-xl border border-rose-gold/25 bg-foreground/[0.03] text-rose-gold group-hover:text-primary group-hover:border-rose-gold/60 transition-colors">
                    <s.icon className="h-5 w-5" strokeWidth={1.3} />
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-rose-gold/40 group-hover:text-rose-gold transition-colors" />
                </div>
                <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-rose-gold/80 mb-2">{s.eyebrow}</div>
                <div className="font-serif text-2xl text-foreground mb-2">{s.title}</div>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.body}</p>
                <div className="mt-6 pt-4 border-t border-border text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
                  {s.count}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Standards */}
        <div className="mt-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }} className="max-w-2xl mb-10"
          >
            <div className="text-xs uppercase tracking-[0.3em] text-rose-gold font-mono mb-3">Academics</div>
            <h2 className="font-serif text-3xl sm:text-4xl font-light leading-[1.05]">
              Pick your <span className="italic text-gradient-rose">standard.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* 11th Standard */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px flex-1 bg-border" />
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-rose-gold">11th Standard</span>
                <div className="h-px flex-1 bg-border" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: "PYQ English", icon: BookOpen },
                  { name: "PYQ Mathematics", icon: Calculator },
                  { name: "PYQ Physics", icon: Atom },
                  { name: "PYQ Chemistry", icon: FlaskConical },
                  { name: "PYQ Biology", icon: Dna },
                ].map((sub, i) => (
                  <motion.div
                    key={sub.name}
                    initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                    className="group matte-glass rounded-2xl p-5 cursor-pointer transition-transform duration-500 hover:-translate-y-1"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <span className="grid h-10 w-10 place-items-center rounded-xl border border-rose-gold/25 bg-foreground/[0.03] text-rose-gold group-hover:text-primary group-hover:border-rose-gold/60 transition-colors">
                        <sub.icon className="h-4 w-4" strokeWidth={1.3} />
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-rose-gold/40 group-hover:text-rose-gold transition-colors" />
                    </div>
                    <div className="text-foreground font-serif text-lg">{sub.name}</div>
                    <div className="mt-3 flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
                      <ArrowUpRight className="w-3 h-3" /> Explore
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* 12th Standard */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px flex-1 bg-border" />
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-rose-gold">12th Standard</span>
                <div className="h-px flex-1 bg-border" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: "PYQ English", icon: BookOpen },
                  { name: "PYQ Mathematics", icon: Calculator },
                  { name: "PYQ Physics", icon: Atom },
                  { name: "PYQ Chemistry", icon: FlaskConical },
                  { name: "PYQ Biology", icon: Dna },
                ].map((sub, i) => (
                  <motion.div
                    key={sub.name}
                    initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                    className="group matte-glass rounded-2xl p-5 cursor-pointer transition-transform duration-500 hover:-translate-y-1"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <span className="grid h-10 w-10 place-items-center rounded-xl border border-rose-gold/25 bg-foreground/[0.03] text-rose-gold group-hover:text-primary group-hover:border-rose-gold/60 transition-colors">
                        <sub.icon className="h-4 w-4" strokeWidth={1.3} />
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-rose-gold/40 group-hover:text-rose-gold transition-colors" />
                    </div>
                    <div className="text-foreground font-serif text-lg">{sub.name}</div>
                    <div className="mt-3 flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
                      <ArrowUpRight className="w-3 h-3" /> Explore
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
