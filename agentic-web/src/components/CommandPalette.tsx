import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Play, Box, Layers, Activity, Database, Network, Trash, BarChart, Terminal, Download, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const commands = [
  { id: "init-pipeline", name: "Initialize new agent pipeline", category: "Pipelines", icon: Play, shortcut: "I" },
  { id: "deploy-k8s", name: "Deploy to Kubernetes cluster", category: "Pipelines", icon: Box, shortcut: "D" },
  { id: "scale-agents", name: "Scale agent pool (1→10)", category: "Pipelines", icon: Layers, shortcut: "S" },
  { id: "run-diagnostic", name: "Run diagnostic scan", category: "Pipelines", icon: Activity, shortcut: "R" },
  { id: "rebuild-vector", name: "Rebuild vector index", category: "Knowledge", icon: Database, shortcut: "V" },
  { id: "sync-neo4j", name: "Sync Neo4j graph", category: "Knowledge", icon: Network, shortcut: "N" },
  { id: "clear-rag", name: "Clear RAG cache", category: "Knowledge", icon: Trash, shortcut: "C" },
  { id: "open-grafana", name: "Open Grafana dashboard", category: "Monitoring", icon: BarChart, shortcut: "G" },
  { id: "stream-logs", name: "Stream agent logs", category: "Monitoring", icon: Terminal, shortcut: "L" },
  { id: "export-metrics", name: "Export metrics report", category: "Monitoring", icon: Download, shortcut: "E" },
];

interface CommandPaletteProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function CommandPalette({ open, setOpen }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [executing, setExecuting] = useState<string | null>(null);

  const filteredCommands = commands.filter(c => c.name.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % filteredCommands.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length);
      } else if (e.key === "Enter" && filteredCommands.length > 0) {
        e.preventDefault();
        executeCommand(filteredCommands[selectedIndex]);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, filteredCommands, selectedIndex, setOpen]);

  const executeCommand = (command: typeof commands[0]) => {
    setExecuting(command.name);
    setTimeout(() => {
      setExecuting(null);
      setOpen(false);
      setQuery("");
    }, 2000);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-32 px-4">
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />
      <div className="relative w-full max-w-2xl bg-card border border-border shadow-2xl rounded-xl overflow-hidden flex flex-col">
        <div className="flex items-center px-4 border-b border-border/50">
          <Search className="w-5 h-5 text-muted-foreground mr-3" />
          <input
            autoFocus
            className="flex-1 h-14 bg-transparent outline-none placeholder:text-muted-foreground text-lg"
            placeholder="Search agent commands, pipelines, configs..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <div className="flex items-center gap-2">
            <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 bg-muted rounded text-xs font-mono text-muted-foreground font-medium">
              <span className="text-xs">⌘</span>K
            </kbd>
            <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full" onClick={() => setOpen(false)}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="max-h-[400px] overflow-y-auto p-2">
          {filteredCommands.length === 0 ? (
            <div className="py-14 text-center text-muted-foreground">
              No commands found.
            </div>
          ) : (
            filteredCommands.map((cmd, i) => (
              <button
                key={cmd.id}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-colors ${
                  i === selectedIndex ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted/50"
                }`}
                onClick={() => executeCommand(cmd)}
                onMouseEnter={() => setSelectedIndex(i)}
              >
                <div className="flex items-center gap-3">
                  <cmd.icon className={`w-5 h-5 ${i === selectedIndex ? "text-primary" : "text-muted-foreground"}`} />
                  <div>
                    <div className="font-medium">{cmd.name}</div>
                    <div className="text-xs text-muted-foreground">{cmd.category}</div>
                  </div>
                </div>
                <kbd className="hidden sm:inline-block px-2 py-1 bg-background border border-border rounded text-xs text-muted-foreground font-mono">
                  {cmd.shortcut}
                </kbd>
              </button>
            ))
          )}
        </div>

        <div className="px-4 py-3 border-t border-border/50 bg-muted/20 text-xs text-muted-foreground flex justify-between items-center">
          <div>↑↓ to navigate · Enter to execute · Esc to close</div>
        </div>

        {executing && (
          <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-lg shadow-lg animate-in slide-in-from-top-2 fade-in font-medium flex items-center gap-2">
            <div className="w-4 h-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" />
            Executing: {executing}...
          </div>
        )}
      </div>
    </div>
  );
}
