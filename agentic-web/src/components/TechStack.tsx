import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiPython, SiFastapi, SiNodedotjs, SiOpenai, SiLangchain, SiPostgresql, SiRedis, SiSqlite, SiGooglechrome, SiSelenium, SiDocker, SiKubernetes, SiGooglecloud, SiGithubactions, SiChartdotjs, SiPlotly } from "react-icons/si";
import { motion } from "framer-motion";

const technologies = [
  {
    category: "Frontend",
    items: [
      { name: "React.js", icon: SiReact, color: "#61DAFB" },
      { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
    ]
  },
  {
    category: "Backend",
    items: [
      { name: "Python", icon: SiPython, color: "#3776AB" },
      { name: "FastAPI", icon: SiFastapi, color: "#009688" },
      { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
    ]
  },
  {
    category: "AI & Agents",
    items: [
      { name: "OpenAI", icon: SiOpenai, color: "#412991" },
      { name: "LangChain", icon: SiLangchain, color: "#1C3C3C" },
      // Custom CrewAI icon could go here if available, fallback to a general one or text
    ]
  },
  {
    category: "Databases",
    items: [
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
      { name: "Redis", icon: SiRedis, color: "#DC382D" },
      { name: "SQLite", icon: SiSqlite, color: "#003B57" },
    ]
  },
  {
    category: "Automation",
    items: [
      { name: "Playwright", icon: SiGooglechrome, color: "#2EAD33" },
      { name: "Selenium", icon: SiSelenium, color: "#43B02A" },
    ]
  },
  {
    category: "DevOps",
    items: [
      { name: "Docker", icon: SiDocker, color: "#2496ED" },
      { name: "Kubernetes", icon: SiKubernetes, color: "#326CE5" },
      { name: "Cloud / AWS", icon: SiGooglecloud, color: "#FF9900" },
      { name: "GitHub Actions", icon: SiGithubactions, color: "#2088FF" },
    ]
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export function TechStack() {
  return (
    <div className="w-full">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {technologies.map((group) => (
          <motion.div key={group.category} variants={itemVariants} className="p-6 rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm hover:border-primary/50 transition-colors duration-300">
            <h3 className="text-lg font-semibold text-foreground mb-6 font-mono border-b border-border/50 pb-2">{group.category}</h3>
            <div className="grid grid-cols-2 gap-4">
              {group.items.map((tech) => (
                <div key={tech.name} className="flex items-center space-x-3 group">
                  <div className="p-2 rounded bg-background border border-border group-hover:border-primary/50 transition-colors">
                    <tech.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" style={{ '--hover-color': tech.color } as any} />
                  </div>
                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{tech.name}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
