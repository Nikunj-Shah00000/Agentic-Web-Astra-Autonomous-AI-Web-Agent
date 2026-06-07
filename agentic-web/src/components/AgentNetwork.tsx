import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const nodes = [
  { id: "gpt4", name: "GPT-4 Agent", x: 500, y: 300, color: "var(--primary)" },
  { id: "playwright", name: "Playwright Bot", x: 200, y: 150, color: "var(--secondary)" },
  { id: "rag", name: "RAG Engine", x: 800, y: 150, color: "var(--primary)" },
  { id: "neo4j", name: "Neo4j Graph", x: 800, y: 450, color: "var(--secondary)" },
  { id: "redis", name: "Redis Queue", x: 200, y: 450, color: "var(--primary)" },
  { id: "crew", name: "CrewAI Master", x: 350, y: 250, color: "var(--secondary)" },
  { id: "vector", name: "Vectorizer", x: 650, y: 250, color: "var(--primary)" },
  { id: "scrape", name: "WebScraper", x: 100, y: 300, color: "var(--secondary)" },
  { id: "monitor", name: "Monitor", x: 500, y: 500, color: "var(--primary)" },
];

const edges = [
  { source: "gpt4", target: "rag" },
  { source: "gpt4", target: "crew" },
  { source: "gpt4", target: "vector" },
  { source: "crew", target: "playwright" },
  { source: "crew", target: "redis" },
  { source: "playwright", target: "scrape" },
  { source: "scrape", target: "redis" },
  { source: "redis", target: "gpt4" },
  { source: "rag", target: "neo4j" },
  { source: "vector", target: "rag" },
  { source: "neo4j", target: "monitor" },
  { source: "gpt4", target: "monitor" },
];

export function AgentNetwork() {
  const [activeNode, setActiveNode] = useState<string>("gpt4");
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomNode = nodes[Math.floor(Math.random() * nodes.length)].id;
      setActiveNode(randomNode);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const getNodeRole = (id: string) => {
    switch(id) {
      case "gpt4": return "Processing 143 tokens/s";
      case "redis": return "Queue depth: 12 tasks";
      case "neo4j": return "Graph size: 1.2M nodes";
      case "scrape": return "Crawling 4 domains";
      case "rag": return "Similarity threshold: 0.85";
      default: return "System nominal: 99.9% uptime";
    }
  };

  return (
    <section id="network" className="py-24 px-6 relative z-10 bg-card/10 border-y border-border/50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Live Agent <span className="text-secondary">Network</span></h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Visualize multi-agent orchestration in real-time. Watch as tasks are delegated, executed, and resolved across the cluster.</p>
        </div>

        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] max-h-[600px] rounded-2xl border border-border/50 bg-[#050505] overflow-hidden shadow-2xl">
          {/* Subtle Background Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:2rem_2rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

          {/* SVG Canvas */}
          <svg className="w-full h-full absolute inset-0" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid meet">
            <style>
              {`
                @keyframes dash {
                  to { stroke-dashoffset: 0; }
                }
                .flow-line {
                  stroke-dasharray: 8 8;
                  animation: dash 2s linear infinite;
                }
              `}
            </style>

            {/* Edges */}
            {edges.map((edge, i) => {
              const source = nodes.find(n => n.id === edge.source)!;
              const target = nodes.find(n => n.id === edge.target)!;
              const isActive = edge.source === activeNode || edge.target === activeNode;
              
              return (
                <g key={`edge-${i}`}>
                  <line 
                    x1={source.x} y1={source.y} x2={target.x} y2={target.y}
                    stroke="var(--border)" strokeWidth="2" opacity={0.4}
                  />
                  {isActive && (
                    <line 
                      x1={source.x} y1={source.y} x2={target.x} y2={target.y}
                      stroke="var(--primary)" strokeWidth="2"
                      className="flow-line"
                      strokeDashoffset="100"
                    />
                  )}
                  {/* Traveling Packet */}
                  {isActive && (
                    <circle r="4" fill="hsl(var(--primary))">
                      <animateMotion dur="1.5s" repeatCount="indefinite" path={`M${source.x},${source.y} L${target.x},${target.y}`} />
                    </circle>
                  )}
                </g>
              );
            })}

            {/* Nodes */}
            {nodes.map((node) => {
              const isActive = node.id === activeNode;
              const isHovered = node.id === hoveredNode;

              return (
                <g 
                  key={node.id} 
                  transform={`translate(${node.x}, ${node.y})`}
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  className="cursor-pointer"
                >
                  {/* Outer glow/pulse for active */}
                  {isActive && (
                    <circle r="30" fill="none" stroke={`hsl(${node.color})`} strokeWidth="1" className="animate-ping opacity-50" />
                  )}
                  {/* Glow shadow */}
                  {(isActive || isHovered) && (
                    <circle r="25" fill={`hsl(${node.color})`} opacity="0.2" filter="blur(8px)" />
                  )}
                  
                  {/* Main Node Circle */}
                  <motion.circle 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", bounce: 0.5 }}
                    r="14" 
                    fill="#111" 
                    stroke={`hsl(${node.color})`} 
                    strokeWidth={isActive || isHovered ? "4" : "2"} 
                    className="transition-all duration-300"
                  />

                  {/* Inner Dot */}
                  <circle r="4" fill={`hsl(${node.color})`} opacity={isActive ? 1 : 0.5} />

                  {/* Label background pill (for readability) */}
                  <rect 
                    x="-40" y="20" width="80" height="20" rx="4"
                    fill="rgba(0,0,0,0.8)" border="1px solid rgba(255,255,255,0.1)"
                  />
                  
                  {/* Label */}
                  <text 
                    y="34" 
                    textAnchor="middle" 
                    fill="#fff" 
                    fontSize="12" 
                    fontFamily="monospace"
                    className="pointer-events-none drop-shadow-md"
                  >
                    {node.name}
                  </text>

                  {/* Tooltip on Hover */}
                  {isHovered && (
                    <g transform="translate(0, -45)">
                      <rect x="-80" y="-20" width="160" height="26" rx="6" fill={`hsl(${node.color})`} />
                      <text y="-2" textAnchor="middle" fill="#000" fontSize="12" fontWeight="bold" fontFamily="monospace">
                        {getNodeRole(node.id)}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </section>
  );
}
