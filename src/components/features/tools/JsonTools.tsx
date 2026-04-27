import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import { encode } from "@toon-format/toon";

type Tab = "formatter" | "toon";
type Expanded = false | "formatter" | "toon";
type TextPart = { text: string; isMatch: boolean; matchIndex: number };

// ── Search ──────────────────────────────────────────────────────

function splitByQuery(text: string, query: string): TextPart[] {
  if (!query.trim() || !text) return [{ text, isMatch: false, matchIndex: -1 }];
  const parts: TextPart[] = [];
  const lower = text.toLowerCase();
  const lowerQ = query.toLowerCase();
  let pos = 0, mIdx = 0;
  while (pos <= text.length) {
    const found = lower.indexOf(lowerQ, pos);
    if (found === -1) {
      if (pos < text.length) parts.push({ text: text.slice(pos), isMatch: false, matchIndex: -1 });
      break;
    }
    if (found > pos) parts.push({ text: text.slice(pos, found), isMatch: false, matchIndex: -1 });
    parts.push({ text: text.slice(found, found + lowerQ.length), isMatch: true, matchIndex: mIdx++ });
    pos = found + lowerQ.length;
  }
  return parts;
}

// ── JSON syntax highlighting ────────────────────────────────────

type JType = "key" | "string" | "number" | "boolean" | "null" | "punct" | "plain";
const J_CLS: Record<JType, string> = {
  key:     "text-blue-600",
  string:  "text-emerald-700",
  number:  "text-amber-600",
  boolean: "text-violet-600",
  null:    "text-rose-500",
  punct:   "text-black/40",
  plain:   "",
};

function renderJSON(text: string) {
  const out: React.ReactNode[] = [];
  // group 1+2 = key string + colon, group 3 = string value,
  // group 4 = number, group 5 = keyword, group 6 = punctuation
  const re = /("(?:\\.|[^"\\])*")(\s*:)|("(?:\\.|[^"\\])*")|(-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)(?=[\s,\}\]\n]|$)|(true|false|null)(?=[\s,\}\]\n]|$)|([{}\[\],:])/g;
  let pos = 0, m: RegExpExecArray | null, idx = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > pos) out.push(<span key={idx++}>{text.slice(pos, m.index)}</span>);
    const [, ks, kc, sv, num, kw, pu] = m;
    if (ks !== undefined) {
      out.push(<span key={idx++} className={J_CLS.key}>{ks}</span>);
      out.push(<span key={idx++} className={J_CLS.punct}>{kc}</span>);
    } else if (sv !== undefined) {
      out.push(<span key={idx++} className={J_CLS.string}>{sv}</span>);
    } else if (num !== undefined) {
      out.push(<span key={idx++} className={J_CLS.number}>{num}</span>);
    } else if (kw !== undefined) {
      out.push(<span key={idx++} className={kw === "null" ? J_CLS.null : J_CLS.boolean}>{kw}</span>);
    } else if (pu !== undefined) {
      out.push(<span key={idx++} className={J_CLS.punct}>{pu}</span>);
    }
    pos = re.lastIndex;
  }
  if (pos < text.length) out.push(<span key={idx++}>{text.slice(pos)}</span>);
  return out;
}

// ── TOON syntax highlighting ────────────────────────────────────

function toonValueNode(text: string, key: number): React.ReactNode {
  const trimmed = text.trimStart();
  const lead = text.slice(0, text.length - trimmed.length);
  let cls = "text-emerald-700";
  if (/^-?\d/.test(trimmed)) cls = "text-amber-600";
  else if (trimmed === "true" || trimmed === "false") cls = "text-violet-600";
  else if (trimmed === "null") cls = "text-rose-500";
  return <span key={key}>{lead}<span className={cls}>{trimmed}</span></span>;
}

function renderTOON(text: string) {
  const lines = text.split("\n");
  return lines.map((line, i) => {
    const nl = i < lines.length - 1 ? "\n" : "";
    // Indented data row (no key: pattern)
    if (/^ {2,}/.test(line) && !/^ *[\w][\w.-]*\s*:/.test(line)) {
      return <span key={i}><span className="text-emerald-700">{line}</span>{nl}</span>;
    }
    // key[n]{fields}: value
    const m = line.match(/^(\s*)([\w][\w.-]*)(\[\d+\])?(\{[^}]*\})?(\s*:)(.*)?$/);
    if (m) {
      const [, indent, key, arr, fields, colon, rest = ""] = m;
      return (
        <span key={i}>
          {indent}
          <span className="text-blue-600">{key}</span>
          {arr && <span className="text-amber-500">{arr}</span>}
          {fields && <span className="text-violet-500">{fields}</span>}
          <span className="text-black/40">{colon}</span>
          {rest && toonValueNode(rest, i + 1000)}
          {nl}
        </span>
      );
    }
    return <span key={i}>{line}{nl}</span>;
  });
}

// ── Icons ───────────────────────────────────────────────────────

const ExpandIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
  </svg>
);

// ── Output block (inline view) ──────────────────────────────────

function OutputBlock({ text, type, placeholder }: { text: string; type: Tab; placeholder: string }) {
  return (
    <div className="w-full h-72 overflow-auto p-4 border border-black/15 bg-black/[0.02] rounded-lg">
      {text ? (
        <pre className="font-code text-sm whitespace-pre m-0 p-0 bg-transparent border-none leading-relaxed">
          {type === "formatter" ? renderJSON(text) : renderTOON(text)}
        </pre>
      ) : (
        <span className="font-primary text-sm text-black/25">{placeholder}</span>
      )}
    </div>
  );
}

// ── Main component ──────────────────────────────────────────────

export function JsonTools() {
  const [activeTab, setActiveTab] = useState<Tab>("formatter");

  const [fInput, setFInput] = useState("");
  const [fOutput, setFOutput] = useState("");
  const [fError, setFError] = useState("");
  const [fCopied, setFCopied] = useState(false);

  const [tInput, setTInput] = useState("");
  const [tOutput, setTOutput] = useState("");
  const [tError, setTError] = useState("");
  const [tCopied, setTCopied] = useState(false);

  const [expanded, setExpanded] = useState<Expanded>(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [matchIndex, setMatchIndex] = useState(0);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const currentMatchRef = useRef<HTMLSpanElement>(null);

  const expandedOutput = expanded === "formatter" ? fOutput : expanded === "toon" ? tOutput : "";
  const expandedCopied = expanded === "formatter" ? fCopied : tCopied;
  const expandedSetCopied = expanded === "formatter" ? setFCopied : setTCopied;

  const parts = useMemo(() => splitByQuery(expandedOutput, searchQuery), [expandedOutput, searchQuery]);
  const totalMatches = useMemo(() => parts.filter((p) => p.isMatch).length, [parts]);

  useEffect(() => { setMatchIndex(0); }, [searchQuery]);
  useEffect(() => {
    if (totalMatches > 0 && matchIndex >= totalMatches) setMatchIndex(totalMatches - 1);
  }, [totalMatches, matchIndex]);
  useEffect(() => {
    currentMatchRef.current?.scrollIntoView({ block: "center", behavior: "smooth" });
  }, [matchIndex, parts]);
  useEffect(() => {
    if (expanded) setTimeout(() => searchInputRef.current?.focus(), 50);
  }, [expanded]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDialog();
      if (expanded && e.key === "Enter" && totalMatches > 0) {
        e.preventDefault();
        setMatchIndex((i) => (i + 1) % totalMatches);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [expanded, totalMatches]);

  const handleFormatterInput = useCallback((val: string) => {
    setFInput(val);
    if (!val.trim()) { setFOutput(""); setFError(""); return; }
    try { setFOutput(JSON.stringify(JSON.parse(val), null, 2)); setFError(""); }
    catch (e) { setFOutput(""); setFError((e as Error).message); }
  }, []);

  const handleToonInput = useCallback((val: string) => {
    setTInput(val);
    if (!val.trim()) { setTOutput(""); setTError(""); return; }
    try { setTOutput(encode(JSON.parse(val))); setTError(""); }
    catch (e) { setTOutput(""); setTError((e as Error).message); }
  }, []);

  const copy = (text: string, setCopied: (v: boolean) => void) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  const closeDialog = () => { setExpanded(false); setSearchQuery(""); };

  const isFormatter = activeTab === "formatter";
  const input = isFormatter ? fInput : tInput;
  const output = isFormatter ? fOutput : tOutput;
  const error = isFormatter ? fError : tError;
  const copied = isFormatter ? fCopied : tCopied;
  const setCopied = isFormatter ? setFCopied : setTCopied;
  const handleInput = isFormatter ? handleFormatterInput : handleToonInput;

  const tabClass = (tab: Tab) =>
    activeTab === tab
      ? "font-primary text-sm px-4 py-1.5 rounded-full border border-black bg-black text-white transition-colors"
      : "font-primary text-sm px-4 py-1.5 rounded-full border border-black/20 text-black/60 hover:border-black/50 hover:text-black transition-colors";

  return (
    <>
      <div>
        {/* Tab switcher */}
        <div className="flex items-center gap-2">
          <button className={tabClass("formatter")} onClick={() => setActiveTab("formatter")}>JSON Formatter</button>
          <button className={tabClass("toon")} onClick={() => setActiveTab("toon")}>JSON → TOON</button>
        </div>

        {/* Textarea pair */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {/* Input */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-primary uppercase tracking-widest text-black/40">Input JSON</label>
            <textarea
              value={input}
              onChange={(e) => handleInput(e.target.value)}
              placeholder='Paste your JSON here, e.g. {"name":"Alice","age":30}'
              className="w-full h-72 p-4 border border-black/15 bg-transparent font-code text-sm focus:outline-none focus:border-black/40 transition-colors rounded-lg resize-none"
              spellCheck={false}
            />
          </div>

          {/* Output */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-primary uppercase tracking-widest text-black/40">
                {isFormatter ? "Formatted Output" : "TOON Output"}
              </label>
              {isFormatter && fOutput && (
                <button onClick={() => setExpanded("formatter")} title="Expand" className="text-black/30 hover:text-black transition-colors">
                  <ExpandIcon />
                </button>
              )}
              {!isFormatter && tOutput && (
                <button onClick={() => setExpanded("toon")} title="Expand" className="text-black/30 hover:text-black transition-colors">
                  <ExpandIcon />
                </button>
              )}
            </div>
            <OutputBlock
              text={output}
              type={activeTab}
              placeholder={isFormatter ? "Formatted JSON will appear here…" : "TOON output will appear here…"}
            />
          </div>
        </div>

        {error && <p className="text-xs font-primary text-red-500 mt-2">{error}</p>}

        {/* Action bar */}
        <div className="flex items-center gap-3 mt-3">
          <button
            onClick={() => output && copy(output, setCopied)}
            disabled={!output}
            className="font-primary text-xs uppercase tracking-widest border border-black/20 px-3 py-1.5 text-black/60 hover:text-black hover:border-black/50 transition-colors rounded-md disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
          <button
            onClick={() => handleInput("")}
            className="font-primary text-xs uppercase tracking-widest text-black/40 hover:text-black transition-colors"
          >
            Clear
          </button>
          {!isFormatter && (
            <a href="https://jsontotoon.com/about" target="_blank" rel="noopener noreferrer"
              className="ml-auto font-primary text-xs text-black/30 hover:text-black/60 transition-colors">
              What is TOON? ↗
            </a>
          )}
        </div>
      </div>

      {/* Fullscreen dialog */}
      {expanded && (
        <div
          className="fixed inset-0 z-[200] bg-black/60 flex items-center justify-center p-4 md:p-8"
          onClick={(e) => { if (e.target === e.currentTarget) closeDialog(); }}
        >
          <div className="w-full max-w-5xl h-full bg-[hsl(60,29%,95%)] rounded-xl flex flex-col overflow-hidden">

            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-black/10 flex-shrink-0">
              <span className="text-xs font-primary uppercase tracking-widest text-black/30 hidden sm:block">
                {expanded === "formatter" ? "Formatted JSON" : "TOON Output"}
              </span>

              {/* Search */}
              <div className="relative flex-1 max-w-xs">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-black/30 pointer-events-none"
                  width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                </svg>
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search in output…"
                  className="w-full pl-8 pr-3 py-1.5 border border-black/15 bg-transparent font-primary text-sm focus:outline-none focus:border-black/40 transition-colors rounded-md"
                />
              </div>

              {/* Match nav */}
              {searchQuery && (
                <div className="flex items-center gap-1">
                  <span className="font-primary text-xs text-black/40 tabular-nums min-w-[4rem] text-center">
                    {totalMatches === 0 ? "No match" : `${matchIndex + 1} / ${totalMatches}`}
                  </span>
                  <button onClick={() => setMatchIndex((i) => (i - 1 + totalMatches) % totalMatches)}
                    disabled={totalMatches === 0}
                    className="p-1 text-black/40 hover:text-black disabled:opacity-30 transition-colors rounded">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 15l-6-6-6 6" /></svg>
                  </button>
                  <button onClick={() => setMatchIndex((i) => (i + 1) % totalMatches)}
                    disabled={totalMatches === 0}
                    className="p-1 text-black/40 hover:text-black disabled:opacity-30 transition-colors rounded">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6" /></svg>
                  </button>
                </div>
              )}

              {/* Copy + Close */}
              <div className="flex items-center gap-2 ml-auto">
                <button
                  onClick={() => copy(expandedOutput, expandedSetCopied)}
                  className="font-primary text-xs uppercase tracking-widest border border-black/20 px-3 py-1.5 text-black/60 hover:text-black hover:border-black/50 transition-colors rounded-md"
                >
                  {expandedCopied ? "Copied!" : "Copy"}
                </button>
                <button onClick={closeDialog}
                  className="p-1.5 text-black/40 hover:text-black transition-colors rounded-md hover:bg-black/5"
                  title="Close (Esc)">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Content: search highlights when searching, syntax highlight otherwise */}
            <div className="flex-1 overflow-auto p-6">
              <pre className="font-code text-sm whitespace-pre leading-relaxed m-0 p-0 bg-transparent border-none">
                {searchQuery ? (
                  parts.map((part, i) => {
                    if (!part.isMatch) return <span key={i}>{part.text}</span>;
                    const isCurrent = part.matchIndex === matchIndex;
                    return (
                      <span key={i} ref={isCurrent ? currentMatchRef : undefined}
                        className={isCurrent ? "bg-yellow-400 text-black rounded-sm" : "bg-yellow-200/80 text-black rounded-sm"}>
                        {part.text}
                      </span>
                    );
                  })
                ) : (
                  expanded === "formatter" ? renderJSON(expandedOutput) : renderTOON(expandedOutput)
                )}
              </pre>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
