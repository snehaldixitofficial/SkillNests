// Centralized site data. Drill-down structures: PYQ → Subject → Year → Papers,
// plus simpler two-level lists for Career, Olympiad, MUN, Community, Coding.

export type Paper = {
  id: string;
  title: string;
  board: "CBSE" | "ICSE" | "State" | "IB" | "IGCSE";
  grade: string; // e.g. "Class X"
  pages: number;
  duration: string; // e.g. "3h"
  marks: number;
};

export type SubjectYear = {
  year: number;
  papers: Paper[];
};

export type Subject = {
  slug: string;
  name: string;
  icon: string; // lucide name as string
  blurb: string;
  hint: string;
  years: SubjectYear[];
};

const boards: Paper["board"][] = ["CBSE", "ICSE", "State", "IB", "IGCSE"];
const grades = ["Class X", "Class XII"];

function makePapers(subjectSlug: string, year: number): Paper[] {
  // Deterministic synthetic set so the UI is rich but data is consistent.
  return boards.flatMap((board, bi) =>
    grades.map((grade, gi) => ({
      id: `${subjectSlug}-${year}-${board}-${gi}`,
      title: `${grade} — ${board} ${year}`,
      board,
      grade,
      pages: 8 + ((bi + gi + year) % 12),
      duration: gi === 0 ? "3h" : "3h",
      marks: gi === 0 ? 80 : 80,
    })),
  );
}

function makeYears(subjectSlug: string): SubjectYear[] {
  return [2024, 2023, 2022, 2021, 2020].map((y) => ({
    year: y,
    papers: makePapers(subjectSlug, y),
  }));
}

export const pyq: Subject[] = [
  { slug: "mathematics", name: "Mathematics", icon: "Calculator",
    blurb: "Algebra, geometry, calculus — taught with patience and proofs.",
    hint: "5 yrs · CBSE / ICSE / IB", years: makeYears("mathematics") },
  { slug: "science", name: "Science", icon: "Atom",
    blurb: "Physics, chemistry, biology — wonder first, marks second.",
    hint: "Phy · Chem · Bio", years: makeYears("science") },
  { slug: "english", name: "English", icon: "BookOpen",
    blurb: "Literature, language, comprehension — read deeply, write clearly.",
    hint: "Lit & Lang", years: makeYears("english") },
  { slug: "social-studies", name: "Social Studies", icon: "Globe",
    blurb: "History, geography, civics — context for the world you'll shape.",
    hint: "Hist · Geo · Civ", years: makeYears("social-studies") },
  { slug: "languages", name: "Languages", icon: "Languages",
    blurb: "Hindi, Sanskrit, French — for fluency, not just marks.",
    hint: "Hindi · Skt · Fr", years: makeYears("languages") },
  { slug: "arts", name: "Arts & Electives", icon: "Palette",
    blurb: "Visual art, music, theatre — electives that complete a learner.",
    hint: "Electives", years: makeYears("arts") },
];

export function getSubject(slug: string) {
  return pyq.find((s) => s.slug === slug);
}

export function getSubjectYear(slug: string, year: number) {
  const s = getSubject(slug);
  return s?.years.find((y) => y.year === year);
}

/* ---------------- Career ---------------- */

export type CareerSession = {
  slug: string;
  title: string;
  domain: string;
  mentor: string;
  date: string; // e.g. "Mon, 18 Jun"
  time: string;
  duration: string;
  live: boolean;
  seats: number;
  taken: number;
  description: string;
  outcomes: string[];
};

export const careerSessions: CareerSession[] = [
  {
    slug: "engineering-pathways",
    title: "Engineering Pathways",
    domain: "Engineering",
    mentor: "Dr. Aarav Mehta",
    date: "Mon, 18 Jun",
    time: "6:00 PM IST",
    duration: "75 min",
    live: true,
    seats: 80,
    taken: 62,
    description:
      "An honest walkthrough of engineering as a career — mechanical, software, civil, biotech — and how to choose without burning out.",
    outcomes: [
      "Frameworks to pick a stream without overwhelm",
      "Realistic day-in-the-life from four engineers",
      "How to design your next two years intentionally",
    ],
  },
  {
    slug: "design-careers",
    title: "Design Careers Demystified",
    domain: "Design & Product",
    mentor: "Ishani Rao",
    date: "Wed, 20 Jun",
    time: "7:30 PM IST",
    duration: "60 min",
    live: false,
    seats: 60,
    taken: 41,
    description:
      "UX, product, industrial, motion — what these jobs actually are, and how to build a portfolio that opens doors.",
    outcomes: [
      "Map of design disciplines (and pay)",
      "The 5-piece portfolio that gets interviews",
      "How to switch into design from any background",
    ],
  },
  {
    slug: "founders-and-builders",
    title: "Founders & Builders",
    domain: "Entrepreneurship",
    mentor: "Kabir Sethi",
    date: "Fri, 22 Jun",
    time: "8:00 PM IST",
    duration: "90 min",
    live: false,
    seats: 100,
    taken: 88,
    description:
      "From first idea to first cheque — the unglamorous middle of building something from zero.",
    outcomes: [
      "How real founders found their problem",
      "Pre-seed economics in plain English",
      "When school + building can actually co-exist",
    ],
  },
  {
    slug: "liberal-arts",
    title: "Liberal Arts & Beyond",
    domain: "Liberal Arts",
    mentor: "Meher Kapoor",
    date: "Sat, 23 Jun",
    time: "5:00 PM IST",
    duration: "60 min",
    live: false,
    seats: 70,
    taken: 33,
    description:
      "Policy, psychology, journalism, philosophy — futures that pay attention to people.",
    outcomes: [
      "What liberal arts actually trains you for",
      "Indian + global undergrad routes",
      "Reading list to start this month",
    ],
  },
  {
    slug: "medicine-and-bio",
    title: "Medicine & Bio Frontiers",
    domain: "Medicine",
    mentor: "Dr. Vihaan Khanna",
    date: "Sun, 24 Jun",
    time: "11:00 AM IST",
    duration: "75 min",
    live: false,
    seats: 90,
    taken: 47,
    description:
      "Beyond NEET — research, biotech, public health, and clinical paths that don't all look the same.",
    outcomes: [
      "Five careers in medicine, honestly compared",
      "How to begin research in school",
      "What to optimise in Class XI / XII",
    ],
  },
];

export function getCareerSession(slug: string) {
  return careerSessions.find((s) => s.slug === slug);
}

/* ---------------- Olympiad ---------------- */

export type Olympiad = {
  slug: string;
  name: string;
  short: string;
  body: string;
  icon: string;
  syllabus: string[];
  exams: { name: string; window: string; level: string }[];
  resources: { label: string; type: "problem-set" | "lecture" | "book" }[];
};

export const olympiads: Olympiad[] = [
  {
    slug: "mathematics-olympiad",
    name: "Mathematics Olympiad",
    short: "From combinatorics to number theory — train the muscle of beautiful proofs.",
    body:
      "A curated track for students who love mathematics as a craft. We sit with hard problems, write proofs longhand, and slowly build the instincts that competition rewards.",
    icon: "Calculator",
    syllabus: ["Number theory", "Combinatorics", "Algebra", "Geometry", "Inequalities", "Functional equations"],
    exams: [
      { name: "PRMO", window: "August", level: "Pre-RMO" },
      { name: "RMO", window: "October", level: "Regional" },
      { name: "INMO", window: "January", level: "National" },
      { name: "IMOTC", window: "April–May", level: "Camp" },
    ],
    resources: [
      { label: "Problem set: Number theory I", type: "problem-set" },
      { label: "Lecture: Pigeonhole revisited", type: "lecture" },
      { label: "Book: Engel — Problem Solving Strategies", type: "book" },
    ],
  },
  {
    slug: "science-olympiad",
    name: "Science Olympiad",
    short: "Physics, chemistry, biology — wonder first, win second.",
    body:
      "A patient introduction to olympiad-level science: building from first principles instead of memorisation, with weekly problem clinics.",
    icon: "Atom",
    syllabus: ["Mechanics", "Thermodynamics", "Organic chemistry", "Cell biology", "Genetics"],
    exams: [
      { name: "NSEP / NSEC / NSEB", window: "November", level: "National Stage 1" },
      { name: "INPhO / INChO / INBO", window: "January", level: "National Stage 2" },
      { name: "OCSC", window: "April–May", level: "Selection Camp" },
    ],
    resources: [
      { label: "Problem set: Mechanics II", type: "problem-set" },
      { label: "Lecture: Equilibrium intuitions", type: "lecture" },
      { label: "Book: Irodov — Problems in General Physics", type: "book" },
    ],
  },
  {
    slug: "informatics-olympiad",
    name: "Informatics Olympiad",
    short: "Algorithms, data structures, and the art of clean thought.",
    body:
      "A measured ramp from competitive programming basics to the kinds of problems that win INOI and IOI camps.",
    icon: "Terminal",
    syllabus: ["Recursion", "Greedy", "Dynamic programming", "Graphs", "Number theory", "Geometry"],
    exams: [
      { name: "ZIO", window: "November", level: "Zonal" },
      { name: "ZCO", window: "December", level: "Zonal Coding" },
      { name: "INOI", window: "January", level: "National" },
      { name: "IOITC", window: "April–May", level: "Camp" },
    ],
    resources: [
      { label: "Problem set: DP foundations", type: "problem-set" },
      { label: "Lecture: Graphs — BFS to Dijkstra", type: "lecture" },
      { label: "Book: CP Handbook (Laaksonen)", type: "book" },
    ],
  },
  {
    slug: "linguistics-olympiad",
    name: "Linguistics Olympiad",
    short: "Crack languages you've never heard of — pure pattern joy.",
    body:
      "No prerequisites, no syllabus, no rote — just puzzles made of real languages, decoded with logic alone.",
    icon: "Languages",
    syllabus: ["Phonology", "Morphology", "Syntax", "Numbering systems", "Writing systems"],
    exams: [
      { name: "PRIL", window: "December", level: "Preliminary" },
      { name: "IOL Selection", window: "March", level: "National" },
      { name: "IOL", window: "July", level: "International" },
    ],
    resources: [
      { label: "Problem set: Phonology starters", type: "problem-set" },
      { label: "Lecture: How to crack a script", type: "lecture" },
      { label: "Book: Payne — Describing Morphosyntax", type: "book" },
    ],
  },
];

export function getOlympiad(slug: string) {
  return olympiads.find((o) => o.slug === slug);
}

/* ---------------- MUN ---------------- */

export type MunTopic = {
  slug: string;
  title: string;
  committee: string;
  side: "crimson" | "navy";
  agenda: string;
  blocs: string[];
  resources: string[];
};

export const munTopics: MunTopic[] = [
  {
    slug: "climate-policy",
    title: "Climate Policy & The Global South",
    committee: "UNEP",
    side: "crimson",
    agenda:
      "Equitable climate finance and adaptation funding for vulnerable economies under the Paris and COP frameworks.",
    blocs: ["G77 + China", "EU", "AOSIS", "Arab Group", "United States"],
    resources: [
      "UNFCCC reports 2020–2024",
      "IPCC AR6 Synthesis",
      "OECD climate finance tracker",
    ],
  },
  {
    slug: "ai-governance",
    title: "AI Governance",
    committee: "UNGA First Committee",
    side: "navy",
    agenda:
      "International frameworks for the development, deployment, and dual-use risks of frontier AI systems.",
    blocs: ["EU", "United States", "China", "G77", "Tech-leading middle powers"],
    resources: ["EU AI Act", "Bletchley Declaration", "UN AI Advisory Body briefs"],
  },
  {
    slug: "press-freedom",
    title: "Press Freedom",
    committee: "UNESCO",
    side: "crimson",
    agenda:
      "Protecting journalism in conflict and the regulation of disinformation without restricting speech.",
    blocs: ["EU", "African Union", "ASEAN", "Latin America", "United States"],
    resources: ["RSF Index 2024", "CPJ casebook", "UNESCO Windhoek+30 Declaration"],
  },
  {
    slug: "refugee-law",
    title: "Refugee & Asylum Law",
    committee: "UNHCR",
    side: "navy",
    agenda:
      "Operationalising the Global Compact on Refugees in protracted displacement contexts.",
    blocs: ["Host states", "Donor states", "Transit states", "Origin states"],
    resources: ["1951 Convention", "Global Compact on Refugees 2018", "UNHCR Global Trends 2024"],
  },
];

export function getMunTopic(slug: string) {
  return munTopics.find((t) => t.slug === slug);
}

/* ---------------- Community ---------------- */

export type SkillPost = {
  slug: string;
  who: string;
  topic: string;
  category: string;
  learners: string;
  blurb: string;
  lessons: { title: string; minutes: number }[];
};

export const skillPosts: SkillPost[] = [
  {
    slug: "watercolor-basics",
    who: "Ananya",
    topic: "Watercolor Basics",
    category: "Visual Art",
    learners: "2,400",
    blurb: "Start watercolour from zero — colour theory, brush control, three studies you can finish in a weekend.",
    lessons: [
      { title: "Setting up your palette", minutes: 8 },
      { title: "Brush pressure and water ratios", minutes: 14 },
      { title: "Study 1 — A monochrome leaf", minutes: 22 },
      { title: "Study 2 — A loose sky", minutes: 26 },
      { title: "Study 3 — A still life pear", minutes: 30 },
    ],
  },
  {
    slug: "chess-endgames",
    who: "Kabir",
    topic: "Chess Endgames",
    category: "Strategy",
    learners: "1,100",
    blurb: "Endgames most school players never study — and how learning them lifts the rest of your chess.",
    lessons: [
      { title: "King and pawn vs king", minutes: 12 },
      { title: "Lucena and Philidor positions", minutes: 18 },
      { title: "Rook endings: cut-off and shoulder check", minutes: 20 },
      { title: "Opposite-coloured bishops", minutes: 16 },
    ],
  },
  {
    slug: "calligraphy",
    who: "Ishani",
    topic: "Calligraphy",
    category: "Visual Art",
    learners: "3,800",
    blurb: "From holding the pen to writing your name in a hand you're proud of.",
    lessons: [
      { title: "Tools: nibs, ink, paper", minutes: 9 },
      { title: "Basic strokes drill", minutes: 14 },
      { title: "Lowercase italic alphabet", minutes: 28 },
      { title: "Composition: a small quote card", minutes: 24 },
    ],
  },
  {
    slug: "guitar-theory",
    who: "Rohan",
    topic: "Guitar Theory",
    category: "Music",
    learners: "920",
    blurb: "The musical theory guitar players actually use — major scale, CAGED, and why chords sound the way they do.",
    lessons: [
      { title: "Notes on the fretboard, fast", minutes: 16 },
      { title: "The major scale across the neck", minutes: 22 },
      { title: "CAGED system", minutes: 28 },
      { title: "Building chords from intervals", minutes: 20 },
    ],
  },
  {
    slug: "crochet-101",
    who: "Meher",
    topic: "Crochet 101",
    category: "Craft",
    learners: "4,200",
    blurb: "Hook, yarn, six stitches — and your first finished piece by lesson five.",
    lessons: [
      { title: "Yarn, hooks, and tension", minutes: 10 },
      { title: "Slip knot + chain stitch", minutes: 12 },
      { title: "Single + double crochet", minutes: 18 },
      { title: "Project: a small coaster", minutes: 26 },
      { title: "Project: a phone pouch", minutes: 34 },
    ],
  },
  {
    slug: "origami-folds",
    who: "Vihaan",
    topic: "Origami Folds",
    category: "Craft",
    learners: "1,700",
    blurb: "Six base folds that unlock most of traditional origami — taught slowly, with paper that's easy to find.",
    lessons: [
      { title: "Valley, mountain, petal", minutes: 10 },
      { title: "Square base + bird base", minutes: 14 },
      { title: "The crane, properly", minutes: 18 },
      { title: "Modular: a six-piece cube", minutes: 24 },
    ],
  },
];

export function getSkillPost(slug: string) {
  return skillPosts.find((p) => p.slug === slug);
}

/* ---------------- Coding ---------------- */

export type CodingTrack = {
  slug: string;
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  language: string;
  online: number;
  blurb: string;
  modules: { title: string; minutes: number }[];
};

export const codingTracks: CodingTrack[] = [
  {
    slug: "javascript-foundations",
    name: "JavaScript Foundations",
    level: "Beginner",
    language: "JavaScript",
    online: 18,
    blurb: "Variables to async — the version of JS you'll actually ship with.",
    modules: [
      { title: "Values, types, control flow", minutes: 45 },
      { title: "Functions and scope", minutes: 50 },
      { title: "Arrays, objects, destructuring", minutes: 55 },
      { title: "Async + fetch, properly", minutes: 60 },
      { title: "Project: a tiny weather app", minutes: 90 },
    ],
  },
  {
    slug: "python-for-thinkers",
    name: "Python for Thinkers",
    level: "Beginner",
    language: "Python",
    online: 24,
    blurb: "Python as a tool to think with — for science, automation, and small ideas.",
    modules: [
      { title: "Syntax + the REPL", minutes: 40 },
      { title: "Files, lists, dicts", minutes: 50 },
      { title: "Functions + iteration", minutes: 55 },
      { title: "Working with libraries", minutes: 60 },
      { title: "Project: scraping a news page", minutes: 90 },
    ],
  },
  {
    slug: "react-with-care",
    name: "React, with care",
    level: "Intermediate",
    language: "TypeScript",
    online: 12,
    blurb: "Component thinking, state that doesn't bite, and why hooks are the way they are.",
    modules: [
      { title: "Mental model of components", minutes: 50 },
      { title: "useState + lifting state", minutes: 55 },
      { title: "Effects, properly explained", minutes: 60 },
      { title: "Routing + data fetching", minutes: 70 },
      { title: "Project: a calm todo app", minutes: 90 },
    ],
  },
  {
    slug: "algorithms-quietly",
    name: "Algorithms, quietly",
    level: "Advanced",
    language: "C++ / Python",
    online: 9,
    blurb: "DSA for school students who want depth without panic.",
    modules: [
      { title: "Recursion mental model", minutes: 50 },
      { title: "Sorting & complexity", minutes: 55 },
      { title: "Hashing, trees, graphs", minutes: 70 },
      { title: "DP from first principles", minutes: 80 },
      { title: "Mock contest + post-mortem", minutes: 120 },
    ],
  },
];

export function getCodingTrack(slug: string) {
  return codingTracks.find((t) => t.slug === slug);
}
