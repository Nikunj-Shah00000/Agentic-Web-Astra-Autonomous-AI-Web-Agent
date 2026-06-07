import { useState, useEffect } from "react";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, RadialBarChart, RadialBar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { ArrowUp, ArrowDown } from "lucide-react";

const generateTokenData = () => Math.floor(Math.random() * 3200) + 800;
const generateLatencyData = () => ({ p50: Math.floor(Math.random() * 150) + 50, p99: Math.floor(Math.random() * 600) + 200 });
const getSystemHealth = () => [
  { name: 'CPU', value: Math.floor(Math.random() * 40) + 40, fill: 'hsl(var(--primary))' },
  { name: 'Memory', value: Math.floor(Math.random() * 30) + 50, fill: 'hsl(var(--secondary))' },
  { name: 'Network', value: Math.floor(Math.random() * 50) + 20, fill: 'hsl(var(--chart-3))' },
  { name: 'Agents Active', value: 85, fill: 'hsl(var(--chart-4))' },
];

export function MetricsDashboard() {
  const [tokenData, setTokenData] = useState<{time: string, tokens: number}[]>([]);
  const [latencyData, setLatencyData] = useState<{time: string, p50: number, p99: number}[]>([]);
  const [queueData, setQueueData] = useState<{name: string, value: number, fill: string}[]>([]);
  const [healthData, setHealthData] = useState(getSystemHealth());

  const [stats, setStats] = useState({
    agents: 142,
    tasks: 4520,
    latency: 124,
    uptime: 99.99
  });

  // Initialize data
  useEffect(() => {
    const initialTokens = Array.from({ length: 20 }, (_, i) => ({ time: `-${20-i}s`, tokens: generateTokenData() }));
    const initialLatency = Array.from({ length: 20 }, (_, i) => ({ time: `-${20-i}s`, ...generateLatencyData() }));
    setTokenData(initialTokens);
    setLatencyData(initialLatency);
    
    setQueueData([
      { name: 'Research', value: 120, fill: 'hsl(var(--primary))' },
      { name: 'Scrape', value: 340, fill: 'hsl(var(--secondary))' },
      { name: 'Extract', value: 210, fill: 'hsl(var(--chart-1))' },
      { name: 'Analyze', value: 80, fill: 'hsl(var(--chart-2))' },
      { name: 'Generate', value: 150, fill: 'hsl(var(--chart-3))' },
      { name: 'Monitor', value: 45, fill: 'hsl(var(--chart-4))' },
    ]);
  }, []);

  // Update interval
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute:'2-digit', second:'2-digit' });
      
      setTokenData(prev => [...prev.slice(1), { time: now, tokens: generateTokenData() }]);
      setLatencyData(prev => [...prev.slice(1), { time: now, ...generateLatencyData() }]);
      
      setQueueData(prev => prev.map(item => ({
        ...item,
        value: Math.max(10, item.value + (Math.floor(Math.random() * 40) - 20))
      })));

      setHealthData(getSystemHealth());

      setStats(prev => ({
        agents: Math.max(100, prev.agents + (Math.floor(Math.random() * 5) - 2)),
        tasks: Math.max(1000, prev.tasks + (Math.floor(Math.random() * 100) - 40)),
        latency: Math.max(50, prev.latency + (Math.floor(Math.random() * 20) - 10)),
        uptime: prev.uptime
      }));

    }, 1500);

    return () => clearInterval(interval);
  }, []);

  if (tokenData.length === 0) return null;

  return (
    <section id="metrics" className="py-24 px-6 relative z-10 bg-background/50">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 flex items-center gap-4">
              Real-time <span className="text-primary">Metrics</span>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-mono align-middle">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
                LIVE
              </span>
            </h2>
            <p className="text-muted-foreground text-lg">Monitor cluster health, throughput, and agent queues across all global regions.</p>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Active Agents", value: stats.agents, trend: "up", suffix: "" },
            { label: "Tasks/min", value: stats.tasks.toLocaleString(), trend: "up", suffix: "" },
            { label: "Avg Latency", value: stats.latency, trend: "down", suffix: "ms" },
            { label: "Uptime", value: stats.uptime, trend: "up", suffix: "%" },
          ].map((kpi, i) => (
            <div key={i} className="p-5 rounded-xl bg-card border border-border/50">
              <div className="text-sm font-medium text-muted-foreground mb-2">{kpi.label}</div>
              <div className="flex items-end justify-between">
                <div className="text-3xl font-bold text-foreground font-mono">{kpi.value}{kpi.suffix}</div>
                {kpi.trend === "up" ? (
                  <ArrowUp className="w-5 h-5 text-green-500 mb-1" />
                ) : (
                  <ArrowDown className="w-5 h-5 text-primary mb-1" />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Chart 1: AreaChart (Throughput) */}
          <div className="p-6 rounded-xl bg-card border border-border/50 flex flex-col h-[350px]">
            <h3 className="font-bold text-foreground mb-6 font-mono text-sm tracking-wider uppercase">Token Throughput (t/sec)</h3>
            <div className="flex-1 min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={tokenData}>
                  <defs>
                    <linearGradient id="colorTokens" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} tickMargin={10} minTickGap={30} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} domain={['dataMin - 500', 'dataMax + 500']} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                    itemStyle={{ color: 'hsl(var(--foreground))' }}
                  />
                  <Area type="monotone" dataKey="tokens" stroke="hsl(var(--primary))" strokeWidth={2} fillOpacity={1} fill="url(#colorTokens)" isAnimationActive={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: BarChart (Task Queue) */}
          <div className="p-6 rounded-xl bg-card border border-border/50 flex flex-col h-[350px]">
            <h3 className="font-bold text-foreground mb-6 font-mono text-sm tracking-wider uppercase">Agent Task Queue</h3>
            <div className="flex-1 min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={queueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickMargin={10} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                    itemStyle={{ color: 'hsl(var(--foreground))' }}
                    cursor={{ fill: 'hsl(var(--muted))', opacity: 0.2 }}
                  />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]} isAnimationActive={true}>
                    {queueData.map((entry, index) => (
                      <cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 3: LineChart (Latency) */}
          <div className="p-6 rounded-xl bg-card border border-border/50 flex flex-col h-[350px]">
            <h3 className="font-bold text-foreground mb-6 font-mono text-sm tracking-wider uppercase">Response Latency (ms)</h3>
            <div className="flex-1 min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={latencyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} tickMargin={10} minTickGap={30} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                  <Line type="monotone" dataKey="p99" name="P99 Latency" stroke="hsl(var(--secondary))" strokeWidth={2} dot={false} isAnimationActive={false} />
                  <Line type="monotone" dataKey="p50" name="P50 Latency" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} isAnimationActive={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 4: RadialBarChart (Health) */}
          <div className="p-6 rounded-xl bg-card border border-border/50 flex flex-col h-[350px]">
            <h3 className="font-bold text-foreground mb-6 font-mono text-sm tracking-wider uppercase">System Health Allocation</h3>
            <div className="flex-1 min-h-0 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart cx="50%" cy="50%" innerRadius="30%" outerRadius="100%" barSize={16} data={healthData} startAngle={90} endAngle={-270}>
                  <RadialBar
                    background={{ fill: 'hsl(var(--muted))', opacity: 0.5 }}
                    dataKey="value"
                    cornerRadius={8}
                    isAnimationActive={true}
                  />
                  <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={{ right: '0%', top: '50%', transform: 'translate(0, -50%)', fontSize: '12px', color: 'hsl(var(--muted-foreground))' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                    itemStyle={{ color: 'hsl(var(--foreground))' }}
                  />
                </RadialBarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
