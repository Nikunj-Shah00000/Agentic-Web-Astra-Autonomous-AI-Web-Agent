import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Network, BrainCircuit, Database, Monitor, CheckCircle2, Loader2, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const tasks = [
  {
    id: "web-research",
    title: "Deep Web Research",
    desc: "Scrape and synthesize information from 50+ sources",
    icon: Globe,
    steps: [
      { name: "Initializing Agent", detail: "Spawning web crawler pool" },
      { name: "Query Expansion", detail: "Generating 12 search variants" },
      { name: "Scraping Content", detail: "Processing 54 web pages" },
      { name: "Data Extraction", detail: "Pulling entities and claims" },
      { name: "Fact Verification", detail: "Cross-referencing claims" },
      { name: "Synthesis", detail: "Generating final report" },
    ],
    results: { time: "14.2s", tokens: "42,105", extracted: "184 entities", confidence: "94%" }
  },
  {
    id: "kg-build",
    title: "Knowledge Graph Build",
    desc: "Extract entities and relationships into Neo4j",
    icon: Network,
    steps: [
      { name: "Loading Corpus", detail: "Reading 500 documents" },
      { name: "NER Extraction", detail: "Identifying Persons, Orgs, Locations" },
      { name: "Relationship Mapping", detail: "Finding edges between nodes" },
      { name: "Cypher Generation", detail: "Creating MERGE statements" },
      { name: "Neo4j Sync", detail: "Pushing to graph database" },
      { name: "Graph Analytics", detail: "Running PageRank algorithm" },
    ],
    results: { time: "28.5s", tokens: "156,000", extracted: "1,402 nodes", confidence: "89%" }
  },
  {
    id: "multi-agent",
    title: "Multi-Agent Analysis",
    desc: "Deploy 5 specialized agents in parallel",
    icon: BrainCircuit,
    steps: [
      { name: "Master Agent Boot", detail: "Reading task requirements" },
      { name: "Worker Spawning", detail: "Creating 5 specialized instances" },
      { name: "Parallel Execution", detail: "Agents researching sub-topics" },
      { name: "Peer Review", detail: "Agents critiquing each other" },
      { name: "Conflict Resolution", detail: "Master agent resolving discrepancies" },
      { name: "Final Output", detail: "Merging agent responses" },
    ],
    results: { time: "45.1s", tokens: "210,500", extracted: "5 perspectives", confidence: "98%" }
  },
  {
    id: "rag-qa",
    title: "RAG Document QA",
    desc: "Index and query 10,000 documents",
    icon: Database,
    steps: [
      { name: "Vector Search", detail: "Querying ChromaDB for context" },
      { name: "Chunk Retrieval", detail: "Fetching top 20 semantic matches" },
      { name: "Reranking", detail: "Re-ordering chunks by relevance" },
      { name: "Prompt Construction", detail: "Injecting context into prompt" },
      { name: "LLM Generation", detail: "Streaming answer" },
      { name: "Citation Mapping", detail: "Linking answer back to sources" },
    ],
    results: { time: "3.4s", tokens: "8,450", extracted: "6 citations", confidence: "96%" }
  },
  {
    id: "browser-automation",
    title: "Browser Automation",
    desc: "Fill forms, extract data, navigate 20 pages",
    icon: Monitor,
    steps: [
      { name: "Launch Playwright", detail: "Starting headless Chromium" },
      { name: "Authentication", detail: "Logging into target portal" },
      { name: "Navigation", detail: "Traversing to data dashboard" },
      { name: "DOM Parsing", detail: "Identifying target tables" },
      { name: "Pagination", detail: "Scraping across 20 pages" },
      { name: "Data Formatting", detail: "Converting to structured JSON" },
    ],
    results: { time: "112.0s", tokens: "12,000", extracted: "2,400 rows", confidence: "99%" }
  }
];

export function AgentPlayground() {
  const [selectedTask, setSelectedTask] = useState(tasks[0]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (!isRunning) return;
    
    if (currentStep < selectedTask.steps.length) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 600);
      return () => clearTimeout(timer);
    } else {
      setIsDone(true);
      setIsRunning(false);
    }
  }, [isRunning, currentStep, selectedTask]);

  const handleRun = () => {
    setIsRunning(true);
    setCurrentStep(0);
    setIsDone(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setCurrentStep(-1);
    setIsDone(false);
  };

  const handleSelect = (task: typeof tasks[0]) => {
    if (isRunning) return;
    setSelectedTask(task);
    handleReset();
  };

  const progress = isDone 
    ? 100 
    : currentStep === -1 
      ? 0 
      : ((currentStep) / selectedTask.steps.length) * 100;

  return (
    <section id="playground" className="py-24 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Interactive <span className="text-primary">Playground</span></h2>
            <p className="text-muted-foreground text-lg max-w-2xl">Test our agent architectures live. Select a pipeline and watch the orchestration happen in real-time.</p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Panel - Task Selector */}
          <div className="w-full lg:w-1/3 flex flex-col gap-3">
            {tasks.map(task => (
              <button
                key={task.id}
                onClick={() => handleSelect(task)}
                disabled={isRunning}
                data-testid={`select-task-${task.id}`}
                className={`text-left p-5 rounded-xl border transition-all ${
                  selectedTask.id === task.id 
                    ? "bg-primary/10 border-primary shadow-[0_0_20px_-5px_rgba(var(--primary),0.3)]" 
                    : "bg-card border-border/50 hover:border-primary/50 hover:bg-card/80"
                } ${isRunning ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg ${selectedTask.id === task.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                    <task.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">{task.title}</h4>
                    <p className="text-sm text-muted-foreground leading-snug">{task.desc}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Right Panel - Execution Viewer */}
          <div className="w-full lg:w-2/3 rounded-xl border border-border bg-[#0a0a0a] shadow-2xl flex flex-col overflow-hidden">
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 bg-[#111]">
              <div className="flex items-center gap-3">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <span className="text-xs font-mono text-muted-foreground ml-2">{selectedTask.id}.sh</span>
              </div>
              
              <div className="flex items-center gap-3">
                {isDone ? (
                  <Button size="sm" variant="outline" onClick={handleReset} data-testid="reset-btn" className="h-8">
                    Reset
                  </Button>
                ) : (
                  <Button size="sm" onClick={handleRun} disabled={isRunning} data-testid="run-btn" className="h-8 bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Play className="w-3 h-3 mr-2" /> Run Agent
                  </Button>
                )}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="h-1 w-full bg-muted/20">
              <div 
                className="h-full bg-primary transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Execution Logs */}
            <div className="flex-1 p-6 min-h-[400px] flex flex-col gap-4 font-mono text-sm relative">
              <div className="absolute inset-0 bg-primary/5 pointer-events-none mix-blend-overlay"></div>
              
              {currentStep === -1 && !isDone && (
                <div className="text-muted-foreground/50 h-full flex items-center justify-center italic">
                  Waiting for execution to start...
                </div>
              )}

              <AnimatePresence>
                {selectedTask.steps.map((step, i) => {
                  if (i > currentStep) return null;
                  
                  const isCurrent = i === currentStep && !isDone;
                  const isCompleted = i < currentStep || isDone;

                  return (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-start gap-4"
                    >
                      <div className="mt-0.5">
                        {isCompleted ? (
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                        ) : isCurrent ? (
                          <Loader2 className="w-4 h-4 text-primary animate-spin" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-muted" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className={`font-medium ${isCompleted ? "text-foreground" : isCurrent ? "text-primary" : "text-muted-foreground"}`}>
                          {step.name}
                        </div>
                        <div className="text-muted-foreground/70 text-xs mt-1">
                          {step.detail}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {/* Results Card */}
              {isDone && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mt-6 p-4 rounded-lg bg-card/50 border border-primary/20 backdrop-blur-sm"
                >
                  <div className="text-primary font-bold mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> Pipeline Completed Successfully
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div>
                      <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Time Elapsed</div>
                      <div className="font-medium text-foreground">{selectedTask.results.time}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Tokens Used</div>
                      <div className="font-medium text-foreground">{selectedTask.results.tokens}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Extracted Data</div>
                      <div className="font-medium text-foreground">{selectedTask.results.extracted}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Confidence</div>
                      <div className="font-medium text-green-400">{selectedTask.results.confidence}</div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
