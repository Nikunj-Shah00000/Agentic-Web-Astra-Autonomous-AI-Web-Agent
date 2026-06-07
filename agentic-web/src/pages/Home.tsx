import { useEffect, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Terminal } from "@/components/Terminal";
import { TechStack } from "@/components/TechStack";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { AgentNetwork } from "@/components/AgentNetwork";
import { MetricsDashboard } from "@/components/MetricsDashboard";
import { AgentPlayground } from "@/components/AgentPlayground";
import { TechMarquee } from "@/components/TechMarquee";
import { CommandPalette } from "@/components/CommandPalette";
import { 
  Network, 
  Globe, 
  Database, 
  Workflow, 
  Activity, 
  Cpu, 
  ShieldCheck, 
  Box, 
  BrainCircuit, 
  Layers, 
  Github, 
  Linkedin,
  ChevronRight,
  Terminal as TerminalIcon,
  Search
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [cmdOpen, setCmdOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCmdOpen((open) => !open);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="min-h-[100dvh] bg-background text-foreground overflow-x-hidden selection:bg-primary/30 font-sans dark">
      {/* Command Palette Hint */}
      <div 
        className="fixed bottom-6 right-6 z-40 hidden md:flex items-center gap-2 px-4 py-2 bg-card border border-border/50 rounded-full shadow-lg cursor-pointer hover:border-primary/50 transition-colors"
        onClick={() => setCmdOpen(true)}
      >
        <Search className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm font-medium text-muted-foreground">Press</span>
        <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono text-muted-foreground font-medium">
          ⌘K
        </kbd>
      </div>

      <CommandPalette open={cmdOpen} setOpen={setCmdOpen} />

      {/* Background Effects */}
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-secondary/10 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center border border-primary/50">
              <Network className="w-5 h-5 text-primary" />
            </div>
            <span className="font-bold text-lg tracking-tight">Agentic Web Astra</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <a href="#capabilities" className="hover:text-primary transition-colors">Capabilities</a>
            <a href="#network" className="hover:text-primary transition-colors">Network</a>
            <a href="#architecture" className="hover:text-primary transition-colors">Architecture</a>
            <a href="#metrics" className="hover:text-primary transition-colors">Metrics</a>
            <a href="#stack" className="hover:text-primary transition-colors">Stack</a>
            <a href="#playground" className="hover:text-primary transition-colors">Playground</a>
            <a href="#features" className="hover:text-primary transition-colors">Features</a>
          </div>
          <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary/10">
            Deploy Now <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          <motion.div 
            className="flex-1 text-center lg:text-left z-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-mono mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              v2.0 Orchestrator Live
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
              The Command Center for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Autonomous Agents</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0">
              Deploy AI pipelines that think, browse, and act. Raw computational power wrapped in an interface that orchestrates browser automation, knowledge graphs, and multi-agent execution at scale.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto h-12 px-8 text-base">
                Initialize Pipeline
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto h-12 px-8 text-base border-border hover:bg-card">
                <TerminalIcon className="w-4 h-4 mr-2" /> View Documentation
              </Button>
            </div>
          </motion.div>

          <motion.div 
            className="flex-1 w-full max-w-lg lg:max-w-none relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 blur-3xl rounded-full mix-blend-screen" />
            <Terminal />
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y border-border/50 bg-card/20 backdrop-blur-sm relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: 12, suffix: "+", label: "AI Frameworks" },
              { value: 50, suffix: "+", label: "Integrations" },
              { value: 10, suffix: "B+", label: "Tokens Processed" },
              { value: 99, suffix: ".9%", label: "Uptime" }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col gap-2">
                <div className="text-4xl md:text-5xl font-bold font-mono text-primary drop-shadow-[0_0_15px_rgba(var(--primary),0.5)]">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm font-medium text-muted-foreground tracking-wider uppercase">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TechMarquee />

      {/* Core Capabilities */}
      <section id="capabilities" className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Core <span className="text-primary">Capabilities</span></h2>
            <p className="text-muted-foreground text-lg max-w-2xl">Everything you need to orchestrate complex AI workflows, built into a single cohesive platform.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: BrainCircuit, title: "Autonomous AI Agents", desc: "Native support for GPT-4, LangChain, LangGraph, CrewAI, and AutoGen." },
              { icon: Globe, title: "Browser Automation", desc: "Orchestrate Playwright, Selenium, and Browser Use for deep web interaction." },
              { icon: Database, title: "Knowledge Graphs & RAG", desc: "Seamless integrations with Neo4j, ChromaDB, Pinecone, and Weaviate." },
              { icon: Layers, title: "Vector Search & Memory", desc: "Persistent agent memory powered by Sentence Transformers and Hugging Face." },
              { icon: Workflow, title: "Multi-Agent Orchestration", desc: "Coordinate distributed teams of specialized agents with shared context." },
              { icon: Activity, title: "Real-time Monitoring", desc: "Deep observability via Prometheus, Grafana, and the ELK Stack." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1 }}
                className="group p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_-5px_rgba(var(--primary),0.2)]"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-foreground">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AgentNetwork />

      {/* Architecture Flow */}
      <section id="architecture" className="py-24 px-6 bg-card/20 border-y border-border/50 relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-16">Pipeline <span className="text-secondary">Architecture</span></h2>
          
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute inset-0 bg-secondary/5 blur-[100px] rounded-full" />
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 relative z-10">
              {/* Nodes */}
              {[
                { title: "Input", icon: TerminalIcon, color: "text-muted-foreground" },
                { title: "Orchestrator", icon: Cpu, color: "text-primary" },
                { title: "Agents", icon: BrainCircuit, color: "text-secondary" },
                { title: "Knowledge", icon: Database, color: "text-primary" },
                { title: "Output", icon: Box, color: "text-green-400" },
              ].map((node, i) => (
                <div key={i} className="flex flex-col items-center gap-3 relative z-10">
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2, type: "spring" }}
                    className="w-16 h-16 rounded-xl bg-card border border-border flex items-center justify-center shadow-lg relative"
                  >
                    <node.icon className={`w-8 h-8 ${node.color}`} />
                    {/* Pulsing ring for active nodes */}
                    {(i === 1 || i === 2) && (
                       <span className="absolute inset-0 rounded-xl animate-ping border border-primary/50 opacity-20" style={{ animationDuration: '3s' }}></span>
                    )}
                  </motion.div>
                  <span className="font-mono text-sm font-medium">{node.title}</span>
                </div>
              ))}

              {/* Connecting Lines (Desktop) */}
              <div className="hidden md:block absolute top-8 left-8 right-8 h-0.5 bg-border -z-10">
                <motion.div 
                  className="h-full bg-gradient-to-r from-primary via-secondary to-green-400"
                  initial={{ width: "0%" }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />
                {/* Flowing dots */}
                <div className="absolute inset-0 overflow-hidden flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 rounded-full bg-white shadow-[0_0_10px_#fff]"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 800, opacity: [0, 1, 1, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.4, ease: "linear" }}
                      style={{ position: 'absolute' }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <MetricsDashboard />

      {/* Tech Stack */}
      <section id="stack" className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Powered by <span className="text-primary">Elite Tech</span></h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Built on the shoulders of giants. We integrate with the most powerful tools in the modern AI and DevOps ecosystem.</p>
          </div>
          
          <TechStack />
        </div>
      </section>

      <AgentPlayground />

      {/* Features Grid */}
      <section id="features" className="py-24 px-6 bg-card/30 border-t border-border/50 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-center md:text-left">Enterprise <span className="text-secondary">Grade</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Secure Authentication", desc: "JWT & OAuth 2.0 baked in.", icon: ShieldCheck },
              { title: "Containerized", desc: "Ready for Docker & Kubernetes deployment.", icon: Box },
              { title: "Observability", desc: "Real-time Prometheus/Grafana hooks.", icon: Activity },
              { title: "Graph Memory", desc: "Deep relationships with Neo4j.", icon: Network },
              { title: "Distributed Tasks", desc: "High-throughput queuing via Redis.", icon: Workflow },
              { title: "CI/CD Ready", desc: "Automated pipelines with GitHub Actions.", icon: Github }
            ].map((feat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="flex items-start gap-4 p-4"
              >
                <div className="mt-1 p-2 bg-secondary/10 rounded-md text-secondary">
                  <feat.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1">{feat.title}</h4>
                  <p className="text-sm text-muted-foreground">{feat.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer / CTA */}
      <footer className="py-24 px-6 border-t border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tight">
            Ready to initialize?
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Join the vanguard of developers building truly autonomous systems.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto h-14 px-10 text-lg font-bold">
              Deploy Astra Now
            </Button>
          </div>
          
          <div className="pt-10 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2 font-mono text-sm text-muted-foreground">
              <Network className="w-4 h-4" /> Agentic Web Astra © 2024
            </div>
            <div className="flex items-center gap-4">
              <a href="#" className="p-2 rounded-full bg-card hover:bg-primary/20 hover:text-primary transition-colors border border-border">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-card hover:bg-primary/20 hover:text-primary transition-colors border border-border">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
