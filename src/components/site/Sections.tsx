import { motion } from "framer-motion";
import { Reveal, SectionHeader } from "./Reveal";
import {
  BookOpen, Atom, Calculator, Globe, Languages, Palette,
  Calendar, Compass, Trophy, Brain, Gavel, Users, Video, Plus,
  Terminal, Circle, MessageCircle,
} from "lucide-react";

/* ---------------- PYQ ---------------- */
const subjects = [
  { name: "Mathematics", icon: Calculator, hint: "5 yrs · CBSE / ICSE" },
  { name: "Science", icon: Atom, hint: "Phy · Chem · Bio" },
  { name: "English", icon: BookOpen, hint: "Lit & Lang" },
  { name: "Social Studies", icon: Globe, hint: "Hist · Geo · Civ" },
  { name: "Languages", icon: Languages, hint: "Hindi · Skt · Fr" },
  { name: "Arts & More", icon: Palette, hint: "Electives" },
];

export function PYQSection() {
  return (
    <section id="pyq" className="relative py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeader eyebrow="01 — Academics" title="Academic |Excellence| & PYQs."
          description="Access five years of school exam PYQs — curated, searchable, and beautifully presented. Study smart. Lower the noise. Reduce anxiety." />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 auto-rows-[180px]">
          {subjects.map((s, i) => {
            const Icon = s.icon;
            const span =
              i === 0 ? "md:col-span-2 md:row-span-2" :
              i === 3 ? "lg:col-span-2" : "";
            return (
              <Reveal key={s.name} delay={i * 0.05} className={span}>
                <motion.div whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 260, damping: 22 }}
                  className="group relative h-full glass rounded-2xl p-6 flex flex-col justify-between overflow-hidden cursor-pointer">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                       style={{ background: "radial-gradient(circle at 50% 0%, rgba(212,175,175,0.18), transparent 70%)" }} />
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                       style={{ boxShadow: "inset 0 0 0 1px rgba(212,175,175,0.5)" }} />
                  <Icon className="text-rose-gold w-7 h-7 relative" strokeWidth={1.2} />
                  <div className="relative">
                    <div className="font-serif text-2xl text-foreground">{s.name}</div>
                    <div className="text-xs text-muted-foreground mt-1 font-mono">{s.hint}</div>
                  </div>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Career ---------------- */
const sessions = [
  { day: "Mon", date: 18, title: "Engineering Pathways", time: "6:00 PM", live: true },
  { day: "Wed", date: 20, title: "Design Careers Demystified", time: "7:30 PM", live: false },
  { day: "Fri", date: 22, title: "Founders & Builders", time: "8:00 PM", live: false },
  { day: "Sat", date: 23, title: "Liberal Arts & Beyond", time: "5:00 PM", live: false },
];
const careerCards = [
  { title: "Design & Product", body: "From UX to industrial design — chart a creative path." },
  { title: "Engineering", body: "Mechanical, software, civil — find your edge." },
  { title: "Medicine & Bio", body: "Healthcare, research, biotech frontiers." },
  { title: "Finance & Business", body: "CA, IB, founders, analysts." },
  { title: "Liberal Arts", body: "Policy, psychology, journalism, philosophy." },
  { title: "Sports & Arts", body: "Yes, these are careers too." },
];

export function CareerSection() {
  return (
    <section id="career" className="relative py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeader eyebrow="02 — Direction" title="Navigate |Your Path.|"
          description="Career Guidance & Motivation Sessions designed to help you explore without pressure." />

        <div className="grid lg:grid-cols-2 gap-6">
          <Reveal>
            <div className="glass-strong rounded-3xl p-6 sm:p-8 h-full">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="text-xs uppercase tracking-widest text-rose-gold font-mono mb-1">This Week</div>
                  <h3 className="font-serif text-3xl">Class Schedule</h3>
                </div>
                <Calendar className="w-6 h-6 text-rose-gold" strokeWidth={1.2} />
              </div>
              <div className="space-y-3">
                {sessions.map((s) => (
                  <div key={s.title} className="group flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.05] hover:border-rose-gold/30 transition-all cursor-pointer">
                    <div className="text-center w-14 shrink-0">
                      <div className="text-xs text-muted-foreground font-mono">{s.day}</div>
                      <div className="font-serif text-2xl text-foreground">{s.date}</div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-foreground truncate">{s.title}</div>
                      <div className="text-xs text-muted-foreground font-mono">{s.time}</div>
                    </div>
                    {s.live ? (
                      <button className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-phoenix px-3 py-1.5 rounded-full border border-phoenix/40 hover:bg-phoenix/10">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inset-0 rounded-full bg-phoenix opacity-75" />
                          <span className="relative rounded-full h-2 w-2 bg-phoenix" />
                        </span>
                        Join Live
                      </button>
                    ) : (
                      <span className="text-xs text-muted-foreground font-mono">Upcoming</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="h-full flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <Compass className="w-5 h-5 text-rose-gold" strokeWidth={1.2} />
                <div className="text-sm text-muted-foreground font-mono">Explore by domain</div>
              </div>
              <div className="flex gap-4 overflow-x-auto pb-4 -mx-2 px-2 snap-x snap-mandatory scrollbar-none">
                {careerCards.map((c, i) => (
                  <motion.div key={i} whileHover={{ y: -4 }}
                    className="glass rounded-2xl p-6 min-w-[260px] snap-start flex flex-col justify-between aspect-[4/5] hover:border-rose-gold/40">
                    <div className="text-xs font-mono text-rose-gold">0{i + 1}</div>
                    <div>
                      <div className="font-serif text-2xl mb-2">{c.title}</div>
                      <div className="text-sm text-muted-foreground leading-relaxed">{c.body}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Olympiad ---------------- */
const olympiads = [
  { name: "Mathematics Olympiad", body: "From combinatorics to number theory — train the muscle of beautiful proofs.", icon: Calculator },
  { name: "Science Olympiad", body: "Physics, chemistry, biology — wonder first, win second.", icon: Atom },
  { name: "Informatics Olympiad", body: "Algorithms, data structures, and the art of clean thought.", icon: Terminal },
  { name: "Linguistics Olympiad", body: "Crack languages you've never heard of — pure pattern joy.", icon: Languages },
];

export function OlympiadSection() {
  return (
    <section id="olympiad" className="relative py-28 px-6">
      {/* node graphic */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.08]">
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 800 600">
          <g stroke="currentColor" fill="none" strokeWidth="0.5" className="text-rose-gold">
            {Array.from({ length: 30 }).map((_, i) => {
              const x1 = (i * 137) % 800, y1 = (i * 91) % 600;
              const x2 = (i * 211) % 800, y2 = (i * 173) % 600;
              return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
            })}
          </g>
        </svg>
      </div>

      <div className="max-w-5xl mx-auto relative">
        <SectionHeader eyebrow="03 — Depth" title="The |Olympiad| Hub."
          description="Fostering a love for deep subject knowledge and problem-solving — rather than just winning medals." />

        <Reveal>
          <div className="glass-strong rounded-3xl p-2 sm:p-3">
            {olympiads.map((o, i) => (
              <details key={o.name} className={`group ${i !== 0 ? "border-t border-white/[0.06]" : ""}`}>
                <summary className="flex items-center gap-5 p-5 sm:p-6 cursor-pointer list-none">
                  <o.icon className="w-6 h-6 text-rose-gold shrink-0" strokeWidth={1.2} />
                  <div className="flex-1 min-w-0">
                    <div className="font-serif text-xl sm:text-2xl">{o.name}</div>
                  </div>
                  <Plus className="w-5 h-5 text-muted-foreground transition-transform group-open:rotate-45" strokeWidth={1.2} />
                </summary>
                <div className="px-6 pb-6 pl-[3.75rem] text-muted-foreground leading-relaxed">{o.body}</div>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- MUN ---------------- */
const topics = [
  { side: "crimson", title: "Climate Policy & The Global South", desc: "UNEP · COP frameworks · equity." },
  { side: "navy", title: "AI Governance", desc: "Ethics, regulation, and the path forward." },
  { side: "crimson", title: "Press Freedom", desc: "Truth in an age of misinformation." },
  { side: "navy", title: "Refugee & Asylum Law", desc: "UNHCR · humanitarian rights." },
];

export function MUNSection() {
  return (
    <section id="mun" className="relative py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeader eyebrow="04 — Voice" title="Model UN |& Debate| Arena."
          description="A respectful space to voice opinions, debate politics, and develop critical thinking." />

        <div className="grid sm:grid-cols-2 gap-5">
          {topics.map((t, i) => (
            <Reveal key={t.title} delay={i * 0.05}>
              <motion.div whileHover={{ y: -4 }}
                className="glass relative rounded-2xl p-7 overflow-hidden h-full">
                <div className="absolute top-0 left-0 right-0 h-1"
                  style={{ background: t.side === "crimson"
                    ? "linear-gradient(90deg, transparent, rgba(220,80,80,0.7), transparent)"
                    : "linear-gradient(90deg, transparent, rgba(90,110,170,0.7), transparent)" }} />
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full grid place-items-center shrink-0"
                    style={{ background: t.side === "crimson" ? "rgba(220,80,80,0.12)" : "rgba(90,110,170,0.12)",
                             border: `1px solid ${t.side === "crimson" ? "rgba(220,80,80,0.35)" : "rgba(90,110,170,0.35)"}` }}>
                    {t.side === "crimson" ? <Gavel className="w-5 h-5 text-[#dc8585]" strokeWidth={1.2} /> : <Brain className="w-5 h-5 text-[#9bb0e0]" strokeWidth={1.2} />}
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] uppercase tracking-[0.3em] font-mono mb-2"
                         style={{ color: t.side === "crimson" ? "#dc8585" : "#9bb0e0" }}>
                      {t.side === "crimson" ? "Affirmative" : "Negative"}
                    </div>
                    <div className="font-serif text-2xl mb-2">{t.title}</div>
                    <div className="text-sm text-muted-foreground">{t.desc}</div>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Community ---------------- */
const posts = [
  { who: "Ananya", topic: "Watercolor Basics", views: "2.4k", h: 220 },
  { who: "Kabir", topic: "Chess Endgames", views: "1.1k", h: 180 },
  { who: "Ishani", topic: "Calligraphy", views: "3.8k", h: 260 },
  { who: "Rohan", topic: "Guitar Theory", views: "920", h: 200 },
  { who: "Meher", topic: "Crochet 101", views: "4.2k", h: 240 },
  { who: "Vihaan", topic: "Origami Folds", views: "1.7k", h: 190 },
];

export function CommunitySection() {
  return (
    <section id="community" className="relative py-28 px-6">
      <div className="max-w-7xl mx-auto relative">
        <SectionHeader eyebrow="05 — Together" title="Peer-to-Peer |Skill Nests.|"
          description="Share your unique skills. Post instructional videos and host online classes to help others grow." />

        <div className="columns-2 md:columns-3 lg:columns-3 gap-5 [column-fill:_balance]">
          {posts.map((p, i) => (
            <Reveal key={i} delay={(i % 3) * 0.05} className="mb-5 break-inside-avoid">
              <motion.div whileHover={{ y: -4 }}
                className="glass rounded-2xl overflow-hidden group cursor-pointer">
                <div className="relative overflow-hidden" style={{ height: p.h }}>
                  <div className="absolute inset-0"
                    style={{ background: `linear-gradient(135deg, hsl(${(i * 47) % 360} 30% 18%), hsl(${(i * 47 + 60) % 360} 25% 28%))` }} />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-black/40 grid place-items-center">
                    <Video className="w-10 h-10 text-rose-gold" strokeWidth={1.2} />
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full glass-strong grid place-items-center text-xs font-mono">{p.who[0]}</div>
                    <div className="text-xs text-foreground/90 truncate">{p.who}</div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="font-serif text-lg leading-snug">{p.topic}</div>
                  <div className="text-xs text-muted-foreground font-mono mt-1">{p.views} learners</div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}

/* ---------------- Coding ---------------- */
export function CodingSection() {
  const code = [
    `const future = new SkillNest({`,
    `  curious: true,`,
    `  competing: false,`,
    `});`,
    ``,
    `await future.learn("anything").live();`,
    `// → joined 1,248 peers`,
  ];
  return (
    <section id="coding" className="relative py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader eyebrow="06 — Build" title="Coding |Campus.|"
          description="Real-time, interactive coding sessions — pair-program, ship together, demure techno energy only." />

        <Reveal>
          <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            {/* terminal chrome */}
            <div className="flex items-center gap-2 px-4 py-3 bg-black/60 backdrop-blur border-b border-white/[0.06]">
              <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
              <div className="ml-4 text-xs font-mono text-muted-foreground">~/skillnests/live-session.ts</div>
              <div className="ml-auto flex items-center gap-2 text-xs font-mono text-[#27c93f]">
                <Circle className="w-2 h-2 fill-current" /> 12 online
              </div>
            </div>
            <div className="relative bg-[#0a0606]/90 backdrop-blur p-6 sm:p-8 font-mono text-sm sm:text-base overflow-hidden">
              {/* faded bg lines */}
              <div className="absolute inset-0 opacity-[0.06] pointer-events-none font-mono text-xs leading-relaxed p-8 select-none whitespace-pre">
                {Array.from({ length: 18 }).map((_, i) => `// line_${(i + 12).toString().padStart(3, "0")}  ${"const _ = await import('phoenix');"}`).join("\n")}
              </div>
              <pre className="relative text-foreground/90 leading-relaxed">
                {code.map((line, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                    <span className="text-muted-foreground/40 select-none mr-4">{(i + 1).toString().padStart(2, "0")}</span>
                    <span className="text-rose-gold">{line.replace(/\b(const|new|await|true|false)\b/g, (m) => `__${m}__`).split(/(__[^_]+__)/).map((p, j) =>
                      p.startsWith("__") ? <span key={j} className="text-phoenix">{p.replace(/__/g, "")}</span> : <span key={j}>{p}</span>
                    )}</span>
                  </motion.div>
                ))}
              </pre>

              <div className="relative mt-8 flex flex-wrap gap-3">
                <button className="btn-phoenix px-5 py-3 rounded-lg font-mono text-sm flex items-center gap-2">
                  <Circle className="w-2 h-2 fill-current animate-pulse" /> Join Google Meet Live
                </button>
                <button className="btn-ghost-gold px-5 py-3 rounded-lg font-mono text-sm">View Recording</button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Founder ---------------- */
export function FounderSection() {
  return (
    <section id="founder" className="relative py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader eyebrow="07 — Heart" title="Founder's |Corner.|" />
        <Reveal>
          <div className="glass-strong rounded-3xl p-6 sm:p-10 grid md:grid-cols-[260px_1fr] gap-8 items-center">
            <div className="relative mx-auto md:mx-0">
              <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden relative"
                style={{ background: "linear-gradient(135deg, oklch(0.3 0.08 30), oklch(0.2 0.05 25))" }}>
                <div className="absolute inset-0 grid place-items-center text-rose-gold/30">
                  <Users className="w-20 h-20" strokeWidth={0.8} />
                </div>
              </div>
              <div className="absolute -inset-1 rounded-2xl border border-rose-gold/30 -z-10 translate-x-2 translate-y-2" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-rose-gold font-mono mb-3">A note from the founder</div>
              <h3 className="font-serif text-3xl sm:text-4xl mb-4">We didn't build a school. We built a nest.</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Education today is loud, anxious, and exhausting. SkillNests is my quiet rebellion — a space
                for young minds to rise gently, like a phoenix; to choose depth over noise, community over
                comparison. If anything here moves you, write to me. I read every message.
              </p>
              <button className="btn-phoenix px-6 py-3 rounded-full flex items-center gap-2 font-semibold">
                <MessageCircle className="w-4 h-4" /> Direct Message the Founder
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Footer ---------------- */
export function Footer() {
  return (
    <footer className="relative pt-20 pb-10 px-6 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-[1.5fr_1fr_1fr_1fr] gap-10 mb-16">
          <div>
            <div className="font-serif italic text-4xl sm:text-5xl">
              <span className="text-gradient-gold">skill</span><span>nests</span><span className="text-phoenix">.in</span>
            </div>
            <p className="text-muted-foreground mt-4 text-sm max-w-sm leading-relaxed">
              Education that completes — and not competes.
            </p>
          </div>
          <FooterCol title="Platform" links={["Subscribe", "Login", "PYQ", "Olympiad"]} />
          <FooterCol title="Community" links={["MUN", "Coding", "Skill Nests", "Founder"]} />
          <FooterCol title="Legal" links={["Terms", "Privacy", "Refunds", "Contact"]} />
        </div>
        <div className="flex flex-col sm:flex-row justify-between gap-4 text-xs font-mono text-muted-foreground border-t border-white/[0.05] pt-6">
          <div>© {new Date().getFullYear()} skillnests.in — Built with care.</div>
          <div className="flex gap-5">
            <a href="#" className="hover:text-rose-gold">Instagram</a>
            <a href="#" className="hover:text-rose-gold">LinkedIn</a>
            <a href="#" className="hover:text-rose-gold">X</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-[0.25em] text-rose-gold font-mono mb-4">{title}</div>
      <ul className="space-y-2">
        {links.map((l) => <li key={l}><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition">{l}</a></li>)}
      </ul>
    </div>
  );
}
