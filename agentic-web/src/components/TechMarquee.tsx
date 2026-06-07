import { motion } from "framer-motion";
import { 
  SiReact, SiNextdotjs, SiTypescript, SiPython, SiFastapi, SiOpenai, SiLangchain, 
  SiDocker, SiKubernetes, SiPostgresql, SiRedis, SiSelenium, SiGrafana, 
  SiPrometheus, SiGithubactions, SiGooglechrome 
} from "react-icons/si";

const row1 = [
  { name: "React", Icon: SiReact },
  { name: "Next.js", Icon: SiNextdotjs },
  { name: "TypeScript", Icon: SiTypescript },
  { name: "Python", Icon: SiPython },
  { name: "FastAPI", Icon: SiFastapi },
  { name: "OpenAI", Icon: SiOpenai },
  { name: "LangChain", Icon: SiLangchain },
  { name: "Docker", Icon: SiDocker },
  { name: "Kubernetes", Icon: SiKubernetes },
  { name: "PostgreSQL", Icon: SiPostgresql },
  { name: "Redis", Icon: SiRedis },
  { name: "Neo4j", Icon: SiGooglechrome }, // Fallback for missing icon
  { name: "Playwright", Icon: SiGooglechrome }, // Fallback for missing icon
  { name: "Selenium", Icon: SiSelenium },
  { name: "Grafana", Icon: SiGrafana },
  { name: "Prometheus", Icon: SiPrometheus },
  { name: "GitHub Actions", Icon: SiGithubactions },
  { name: "ChromaDB", Icon: SiGooglechrome }, // Fallback for missing icon
];

const row2 = [...row1].reverse(); // Shuffled

export function TechMarquee() {
  return (
    <section className="py-12 border-y border-border/50 bg-card/10 overflow-hidden relative z-10 flex flex-col gap-8">
      {/* Left scrolling row */}
      <div className="relative flex overflow-hidden w-full group">
        <motion.div
          className="flex whitespace-nowrap gap-8 pr-8"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          {[...row1, ...row1].map((item, i) => (
            <div key={`row1-${i}`} className="flex items-center gap-3 px-6 py-3 rounded-xl bg-card border border-border/50 text-muted-foreground whitespace-nowrap min-w-max hover:text-foreground hover:border-primary/50 transition-colors">
              <item.Icon className="w-5 h-5" />
              <span className="font-mono text-sm font-medium">{item.name}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Right scrolling row */}
      <div className="relative flex overflow-hidden w-full group">
        <motion.div
          className="flex whitespace-nowrap gap-8 pr-8"
          animate={{ x: ["-50%", "0%"] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          {[...row2, ...row2].map((item, i) => (
            <div key={`row2-${i}`} className="flex items-center gap-3 px-6 py-3 rounded-xl bg-card border border-border/50 text-muted-foreground whitespace-nowrap min-w-max hover:text-foreground hover:border-primary/50 transition-colors">
              <item.Icon className="w-5 h-5" />
              <span className="font-mono text-sm font-medium">{item.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
      
      {/* Gradient Masks */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-20 pointer-events-none" />
    </section>
  );
}
