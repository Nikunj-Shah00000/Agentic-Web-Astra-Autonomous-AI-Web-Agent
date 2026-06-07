import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const terminalLines = [
  "> Initializing Agentic Web Astra...",
  "> Loading GPT-4 agent... ✓",
  "> Connecting to Neo4j knowledge graph... ✓",
  "> Agent Task: Research top AI frameworks 2024",
  "> Launching Playwright browser... ✓",
  "> Navigating to https://arxiv.org...",
  "> Extracting 47 research papers... ✓",
  "> Building knowledge graph (312 nodes)... ✓",
  "> Generating RAG summary... ✓",
  "> Task complete. 12.3s elapsed.",
];

export function Terminal() {
  const [lines, setLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  useEffect(() => {
    if (currentLineIndex >= terminalLines.length) {
      const timeout = setTimeout(() => {
        setLines([]);
        setCurrentLineIndex(0);
        setCurrentCharIndex(0);
      }, 3000);
      return () => clearTimeout(timeout);
    }

    const currentLine = terminalLines[currentLineIndex];

    if (currentCharIndex < currentLine.length) {
      const timeout = setTimeout(() => {
        setLines((prev) => {
          const newLines = [...prev];
          if (newLines[currentLineIndex] === undefined) {
            newLines[currentLineIndex] = "";
          }
          newLines[currentLineIndex] = currentLine.slice(0, currentCharIndex + 1);
          return newLines;
        });
        setCurrentCharIndex((prev) => prev + 1);
      }, 20 + Math.random() * 30); // Random typing speed
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setCurrentLineIndex((prev) => prev + 1);
        setCurrentCharIndex(0);
      }, 400); // Pause between lines
      return () => clearTimeout(timeout);
    }
  }, [currentLineIndex, currentCharIndex]);

  return (
    <div className="w-full max-w-2xl mx-auto rounded-lg overflow-hidden border border-border bg-[#0a0a0a] shadow-2xl relative">
      <div className="flex items-center px-4 py-2 border-b border-border/50 bg-[#111]">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
        </div>
        <div className="mx-auto text-xs text-muted-foreground font-mono">astra-agent-cli</div>
      </div>
      <div className="p-6 font-mono text-sm md:text-base text-primary-foreground min-h-[320px] relative">
        <div className="absolute inset-0 bg-primary/5 pointer-events-none mix-blend-overlay"></div>
        
        {lines.map((line, i) => (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            key={i}
            className={`mb-1 ${line.includes('✓') ? 'text-green-400' : line.includes('Task complete') ? 'text-primary' : 'text-muted-foreground'}`}
          >
            {line}
          </motion.div>
        ))}
        {currentLineIndex < terminalLines.length && (
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="inline-block w-2 h-4 bg-primary align-middle ml-1"
          />
        )}
      </div>
    </div>
  );
}
