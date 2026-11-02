import { useTranslation, useLanguage, languages, isLanguage } from "./i18n";
import { useEffect, useRef, useState } from "react";
import {
  HashRouter,
  NavLink,
  Navigate,
  Route,
  Routes,
  Link,
  useParams,
} from "react-router-dom";
import {
  Activity,
  ArrowRight,
  BookOpen,
  Bookmark,
  Brain,
  Check,
  ChevronRight,
  Compass,
  GraduationCap,
  Heart,
  Layers,
  Leaf,
  Maximize,
  Minus,
  MousePointer2,
  Plus,
  RotateCcw,
  Search,
  Sparkles,
} from "lucide-react";
import { heartModel } from "./components/heart";
import { brainModel } from "./components/brain";
import { lungsModel } from "./components/lungs";
import { kidneysModel } from "./components/kidneys";
import {
  OrganViewer,
  organDefaultVisibility,
  type OrganViewerHandle,
} from "./components/organ-viewer";
import { TooltipProvider } from "./components/ui/tooltip";
import { useStudy } from "./store";
import "./App.css";

const organs = [
  {
    id: "heart",
    model: heartModel,
    icon: Heart,
    system: "Cardiovascular system",
    latin: "Cor",
    description:
      "Explore the chambers, muscular walls, and major vessels of the heart. Follow the structures that receive blood and direct it toward the lungs and the rest of the body.",
    focus: "Blood circulation",
    region: "Thorax",
    question: "Which chamber receives oxygen-rich blood from the lungs?",
    answers: ["Right atrium", "Left atrium", "Right ventricle"],
    correct: 1,
    explanation:
      "The left atrium receives blood from the lungs and passes it to the left ventricle.",
  },
  {
    id: "brain",
    model: brainModel,
    icon: Brain,
    system: "Nervous system",
    latin: "Encephalon",
    description:
      "Explore the brain from multiple perspectives. Select individual structures to understand their position and discover how the regions fit together.",
    focus: "Neural coordination",
    region: "Head",
    question: "Which system does the brain belong to?",
    answers: ["Respiratory system", "Urinary system", "Nervous system"],
    correct: 2,
    explanation:
      "The brain is part of the central nervous system, together with the spinal cord.",
  },
  {
    id: "lungs",
    model: lungsModel,
    icon: Activity,
    system: "Respiratory system",
    latin: "Pulmones",
    description:
      "Explore the paired lungs and their structures. Rotate the model to compare their shape and investigate the anatomy of the respiratory system.",
    focus: "Gas exchange",
    region: "Thorax",
    question: "What is the primary role of the lungs?",
    answers: ["Gas exchange", "Pumping blood", "Filtering blood into urine"],
    correct: 0,
    explanation:
      "The lungs exchange oxygen and carbon dioxide between air and blood.",
  },
  {
    id: "kidneys",
    model: kidneysModel,
    icon: Leaf,
    system: "Urinary system",
    latin: "Renes",
    description:
      "Explore the kidneys in three dimensions. Select the structures in the anatomy list to study their spatial relationships and read their descriptions.",
    focus: "Filtration",
    region: "Abdomen",
    question: "Which system includes the kidneys?",
    answers: ["Nervous system", "Urinary system", "Respiratory system"],
    correct: 1,
    explanation:
      "The kidneys are part of the urinary system and filter blood to form urine.",
  },
];
type Organ = (typeof organs)[number];

function ExplorerRoute() {
  const { id } = useParams();
  const organ = organs.find((o) => o.id === id);
  return organ ? (
    <Explorer key={organ.id} organ={organ} />
  ) : (
    <Navigate to="/explore/heart" replace />
  );
}
function Explorer({ organ }: { organ: Organ }) {
  const { t } = useTranslation();
  const viewer = useRef<OrganViewerHandle>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [visibility, setVisibility] = useState<Record<string, boolean>>(() =>
    organDefaultVisibility(organ.model),
  );
  const [view, setView] = useState<string | null>(organ.model.defaultView);
  const [tab, setTab] = useState<"overview" | "review">("overview");
  const [answer, setAnswer] = useState<number | null>(null);
  const { saved, toggleSaved, completed, complete } = useStudy();
  const structure = organ.model.structures.find((s) => s.id === selected);
  const matches = organs.filter((o) =>
    (o.model.name + " " + o.system + " " + t(o.model.name) + " " + t(o.system))
      .toLowerCase()
      .includes(query.toLowerCase()),
  );
  const structures = organ.model.structures.filter((s) =>
    (s.label + " " + t(s.label)).toLowerCase().includes(query.toLowerCase()),
  );
  function reset() {
    viewer.current?.reset();
    setSelected(null);
    setVisibility(organDefaultVisibility(organ.model));
  }
  return (
    <>
      <div className="eyebrow">{t("A closer look at what makes us human")}</div>
      <div className="heading">
        <div>
          <h1>{t("The anatomy explorer")}</h1>
          <p>
            {t("Explore in 3D. Discover the details. Connect the systems.")}
          </p>
        </div>
        <span className="pill">
          <Sparkles size={12} /> {t("A new perspective on learning")}
        </span>
      </div>
      <div className="explorer">
        <aside className="sidebar">
          <div className="section-label">
            {t("ORGAN LIBRARY")} <span>04</span>
          </div>
          <label className="search">
            <Search size={15} />
            <input
              aria-label={t("Search organs and structures")}
              placeholder={t("Search anatomy…")}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
          <div className="organ-list">
            {matches.map((o) => (
              <Link
                className={
                  "organ-button " + (o.id === organ.id ? "selected" : "")
                }
                key={o.id}
                to={"/explore/" + o.id}
              >
                <span className="organ-icon">
                  <o.icon size={20} />
                </span>
                <span>
                  <strong>{t(o.model.name)}</strong>
                  <small>{t(o.system)}</small>
                </span>
                <ChevronRight className="chevron" size={13} />
              </Link>
            ))}
          </div>
          {!matches.length && (
            <p className="empty">{t("No matching organs.")}</p>
          )}
          <div className="divider" />
          <div className="section-label structure-heading">
            {t("STRUCTURES")}{" "}
            <span>{structures.length.toString().padStart(2, "0")}</span>
          </div>
          <div className="structure-list">
            {structures.map((s) => (
              <div
                className={"structure " + (selected === s.id ? "active" : "")}
                key={s.id}
              >
                <button
                  onClick={() => setSelected(selected === s.id ? null : s.id)}
                  aria-pressed={selected === s.id}
                >
                  <i className="dot" style={{ background: s.color }} />
                  {t(s.label)}
                </button>
                <input
                  type="checkbox"
                  aria-label={t("Show {name}", { name: t(s.label) })}
                  checked={visibility[s.id] !== false}
                  onChange={(e) => {
                    setVisibility({ ...visibility, [s.id]: e.target.checked });
                    if (!e.target.checked && selected === s.id)
                      setSelected(null);
                  }}
                />
              </div>
            ))}
            {!structures.length && (
              <p className="empty">{t("No matching structures.")}</p>
            )}
          </div>
        </aside>
        <div className="stage" ref={stage}>
          <div className="stage-header">
            <div>
              <h2>{t(organ.model.name)}</h2>
              <small>
                {t(view ?? "Free rotation")} · {t("Interactive model")}
              </small>
            </div>
            <div className="live">
              <i />
              {t("3D EXPLORER")}
            </div>
          </div>
          <div className="viewer-wrap">
            <OrganViewer
              ref={viewer}
              model={organ.model}
              controls={false}
              selectedId={selected}
              onSelectionChange={setSelected}
              visibility={visibility}
              onViewChange={setView}
            />
          </div>
          <div className="stage-bottom">
            <span>
              <MousePointer2 size={13} />
              {t("Drag to rotate · Scroll to zoom")}
            </span>
            <select
              aria-label={t("Camera view")}
              className="view-select"
              value={view ?? ""}
              onChange={(e) => viewer.current?.setView(e.target.value)}
            >
              <option value="" disabled>
                {t("Free rotation")}
              </option>
              {organ.model.views.map((v) => (
                <option key={v.name} value={v.name}>
                  {t(v.name)}
                </option>
              ))}
            </select>
            <div className="controls">
              <button
                aria-label={t("Zoom in")}
                onClick={() => viewer.current?.zoom(0.85)}
              >
                <Plus size={15} />
              </button>
              <button
                aria-label={t("Zoom out")}
                onClick={() => viewer.current?.zoom(1.15)}
              >
                <Minus size={15} />
              </button>
              <button aria-label={t("Reset model")} onClick={reset}>
                <RotateCcw size={14} />
              </button>
              <button
                aria-label={t("Fullscreen model")}
                onClick={() => {
                  if (document.fullscreenElement)
                    void document.exitFullscreen();
                  else void stage.current?.requestFullscreen().catch(() => {});
                }}
              >
                <Maximize size={14} />
              </button>
            </div>
          </div>
        </div>
        <aside className="details">
          <span className="details-tag">{t(organ.system)}</span>
          <div className="detail-title">
            <h2>{t(organ.model.name)}</h2>
            <button
              className={
                "icon-btn " + (saved.includes(organ.id) ? "bookmark-on" : "")
              }
              aria-label={
                saved.includes(organ.id)
                  ? t("Remove bookmark")
                  : t("Bookmark organ")
              }
              aria-pressed={saved.includes(organ.id)}
              onClick={() => toggleSaved(organ.id)}
            >
              <Bookmark size={19} />
            </button>
          </div>
          <p className="latin">{organ.latin}</p>
          <div className="tabs">
            <button
              className={tab === "overview" ? "active" : ""}
              onClick={() => setTab("overview")}
            >
              {t("Overview")}
            </button>
            <button
              className={tab === "review" ? "active" : ""}
              onClick={() => setTab("review")}
            >
              {t("Knowledge check")} {completed.includes(organ.id) && "✓"}
            </button>
          </div>
          {tab === "overview" ? (
            <>
              <p className="description">{t(organ.description)}</p>
              <h3>{t("At a glance")}</h3>
              <div className="facts">
                <div className="fact">
                  <small>{t("Primary function")}</small>
                  <strong>{t(organ.focus)}</strong>
                </div>
                <div className="fact">
                  <small>{t("Body region")}</small>
                  <strong>{t(organ.region)}</strong>
                </div>
                <div className="fact">
                  <small>{t("Model structures")}</small>
                  <strong>
                    {t("{count} selectable", {
                      count: organ.model.structures.length,
                    })}
                  </strong>
                </div>
                <div className="fact">
                  <small>{t("Perspectives")}</small>
                  <strong>
                    {t("{count} named views", {
                      count: organ.model.views.length,
                    })}
                  </strong>
                </div>
              </div>
              <h3>
                {structure ? t("Selected structure") : t("Explore a structure")}
              </h3>
              <p className="description" style={{ marginTop: 0 }}>
                {structure ? (
                  <>
                    <strong>{t(structure.label)}</strong>
                    <br />
                    {t(
                      structure.description ??
                        "Select and rotate the model to explore this structure.",
                    )}
                  </>
                ) : (
                  t(
                    "Select a structure in the model or the anatomy list to take a closer look.",
                  )
                )}
              </p>
              {structure && (
                <button
                  className="secondary"
                  style={{ marginTop: 12 }}
                  onClick={() => setSelected(null)}
                >
                  {t("Show whole organ")}
                </button>
              )}
              <div className="learn-card">
                <strong>
                  <GraduationCap size={17} />
                  {t("Make it stick")}
                </strong>
                <p>
                  {t(
                    "Turn a closer look into lasting knowledge with a quick review.",
                  )}
                </p>
                <button className="primary" onClick={() => setTab("review")}>
                  {t("Test your knowledge")} <ArrowRight size={13} />
                </button>
              </div>
            </>
          ) : (
            <div className="quiz">
              <p className="eyebrow">{t("QUICK REVIEW · 1 QUESTION")}</p>
              <p>{t(organ.question)}</p>
              {organ.answers.map((a, i) => (
                <button
                  key={a}
                  className={"answer " + (answer === i ? "chosen" : "")}
                  onClick={() => {
                    setAnswer(i);
                    if (i === organ.correct) complete(organ.id);
                  }}
                >
                  {t(a)}
                </button>
              ))}
              {answer !== null && (
                <div className="feedback" role="status">
                  <strong>
                    {answer === organ.correct
                      ? t("Correct. Review complete!")
                      : t("Not quite. Try again.")}
                  </strong>
                  <br />
                  {answer === organ.correct
                    ? t(organ.explanation)
                    : t("Revisit the overview, then choose another answer.")}
                </div>
              )}
            </div>
          )}
        </aside>
      </div>
      <footer className="footer">
        <span>
          {t(
            "Built for curiosity. For educational use, not clinical decisions.",
          )}
        </span>
        <span>
          {t("3D models & components by")}{" "}
          <a
            href="https://organui.com/docs/components/organs"
            target="_blank"
            rel="noreferrer"
          >
            OrganUI
          </a>{" "}
          {t("· Model credits available in the viewer")}
        </span>
      </footer>
    </>
  );
}
function Collection({ savedOnly = false }: { savedOnly?: boolean }) {
  const { t } = useTranslation();
  const { saved, completed, toggleSaved } = useStudy();
  const items = organs.filter((o) => !savedOnly || saved.includes(o.id));
  return (
    <>
      <div className="eyebrow">{t("Your personal anatomy workspace")}</div>
      <div className="heading">
        <div>
          <h1>
            {savedOnly
              ? t("Your saved collection")
              : t("Learn a little. Understand more.")}
          </h1>
          <p>
            {savedOnly
              ? t("The organs you want to come back to.")
              : t(
                  "{completed} of {total} knowledge checks completed. Progress is saved on this device.",
                  { completed: completed.length, total: organs.length },
                )}
          </p>
        </div>
        <Link className="secondary" to="/explore/heart">
          {t("Back to explorer")}
        </Link>
      </div>
      {!savedOnly && (
        <div
          className="progress"
          aria-label={t("{completed} of {total} completed", {
            completed: completed.length,
            total: organs.length,
          })}
        >
          <div style={{ width: `${(completed.length / 4) * 100}%` }} />
        </div>
      )}
      <div className="study-grid">
        {items.map((o) => (
          <article className="study-card" key={o.id}>
            <div className="flex items-center justify-between">
              <span className="organ-icon">
                <o.icon size={22} />
              </span>
              {completed.includes(o.id) && <Check size={18} color="#36714c" />}
              {savedOnly && (
                <button
                  className="icon-btn"
                  aria-label={t("Remove {name} bookmark", {
                    name: t(o.model.name),
                  })}
                  onClick={() => toggleSaved(o.id)}
                >
                  <Bookmark size={18} fill="#d7e6cb" />
                </button>
              )}
            </div>
            <h2>{t(o.model.name)}</h2>
            <p>{t(o.description)}</p>
            <Link className="primary" to={"/explore/" + o.id}>
              {completed.includes(o.id)
                ? t("Explore again")
                : t("Start exploring")}
              <ArrowRight size={14} />
            </Link>
          </article>
        ))}
      </div>
      {!items.length && (
        <div className="library-empty">
          <Bookmark size={26} className="mx-auto" />
          <h2>{t("Your collection starts here")}</h2>
          <p>{t("Bookmark an organ in the explorer to save it for later.")}</p>
          <Link className="secondary" to="/explore/heart">
            {t("Explore the heart")}
          </Link>
        </div>
      )}
    </>
  );
}
export default function App() {
  const { language, t } = useTranslation();
  const setLanguage = useLanguage((s) => s.setLanguage);
  useEffect(() => {
    document.documentElement.lang = language;
    document.title = `OrganUI — ${t("Anatomy explorer")}`;
  }, [language, t]);
  return (
    <HashRouter>
      <TooltipProvider>
        <div className="app">
          <header className="topbar">
            <Link
              to="/explore/heart"
              className="brand"
              aria-label={t("OrganUI home")}
            >
              <span className="brand-mark">
                <Layers size={23} />
              </span>
              organ<span>ui</span>
            </Link>
            <nav className="nav">
              <NavLink to="/explore">
                <Compass size={16} />
                {t("Anatomy explorer")}
              </NavLink>
              <NavLink to="/learn">
                <BookOpen size={16} />
                {t("Learning space")}
              </NavLink>
              <NavLink to="/saved">
                <Bookmark size={15} />
                {t("Saved collection")}
              </NavLink>
            </nav>
            <div className="profile">
              <label className="language-switcher">
                <span className="sr-only">{t("Language")}</span>
                <select
                  aria-label="Language / භාෂාව / மொழி"
                  value={language}
                  onChange={(e) => {
                    if (isLanguage(e.target.value)) setLanguage(e.target.value);
                  }}
                >
                  {languages.map((l) => (
                    <option key={l.code} value={l.code} lang={l.code}>
                      {l.label}
                    </option>
                  ))}
                </select>
              </label>
              <span>{t("A space for discovery")}</span>
              <div className="avatar">
                <GraduationCap size={19} />
              </div>
            </div>
          </header>
          <main className="workspace">
            <Routes>
              <Route path="/explore/:id" element={<ExplorerRoute />} />
              <Route path="/learn" element={<Collection />} />
              <Route path="/saved" element={<Collection savedOnly />} />
              <Route
                path="*"
                element={<Navigate to="/explore/heart" replace />}
              />
            </Routes>
          </main>
        </div>
      </TooltipProvider>
    </HashRouter>
  );
}
