"use client";

import { memo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Activity,
  BarChart3,
  Bell,
  Bot,
  Cloud,
  Code2,
  DollarSign,
  Smartphone,
  TrendingUp,
  Users,
} from "lucide-react";

const FloatPanel = memo(function FloatPanel({
  children,
  className = "",
  delay = 0,
  floatDelay = 0,
  panelClassName = "",
  reducedMotion = false,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  floatDelay?: number;
  panelClassName?: string;
  reducedMotion?: boolean;
}) {
  return (
    <motion.div
      initial={reducedMotion ? undefined : { opacity: 0, y: 16 }}
      animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      transition={
        reducedMotion
          ? undefined
          : { duration: 0.6, delay, ease: [0.21, 0.47, 0.32, 0.98] }
      }
      className={`absolute ${className}`}
    >
      <div
        className={`hero-glass-panel h-full w-full ${reducedMotion ? "" : "hero-float"} ${panelClassName}`}
        style={reducedMotion ? undefined : { animationDelay: `${floatDelay}s` }}
      >
        {children}
      </div>
    </motion.div>
  );
});

function KpiCard({
  label,
  value,
  change,
  icon: Icon,
}: {
  label: string;
  value: string;
  change: string;
  icon: React.ElementType;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center shrink-0">
        <Icon size={14} className="text-white/60" />
      </div>
      <div>
        <p className="text-[9px] text-white/40 uppercase tracking-wider">{label}</p>
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-semibold text-white">{value}</span>
          <span className="text-[10px] text-emerald-400">{change}</span>
        </div>
      </div>
    </div>
  );
}

export default function HeroVisualization() {
  const reduced = useReducedMotion() ?? false;

  return (
    <div className="relative w-full h-[420px] sm:h-[480px] md:h-[540px] lg:h-[580px]">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[60%] rounded-full pointer-events-none opacity-70"
        style={{
          background:
            "radial-gradient(circle, rgba(249,115,22,0.12) 0%, transparent 70%)",
        }}
      />

      <FloatPanel
        delay={0.2}
        floatDelay={0}
        reducedMotion={reduced}
        panelClassName="hero-glass-panel-blur !p-0 overflow-hidden"
        className="top-[8%] left-1/2 -translate-x-1/2 w-[72%] md:w-[58%] z-20"
      >
        <div className="px-4 py-3 border-b border-white/[0.06] flex items-center justify-between bg-white/[0.02]">
          <div className="flex items-center gap-2">
            <BarChart3 size={13} className="text-white/50" />
            <span className="text-[11px] font-medium text-white/80">Analytics Dashboard</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-[9px] text-white/40">Live</span>
          </div>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-3 gap-2 mb-4">
            {[
              { l: "Revenue", v: "$2.4M", c: "+18%" },
              { l: "Users", v: "48.2K", c: "+12%" },
              { l: "Uptime", v: "99.9%", c: "Stable" },
            ].map((k) => (
              <div key={k.l} className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-2.5">
                <p className="text-[8px] text-white/35 uppercase tracking-wider mb-1">{k.l}</p>
                <p className="text-[13px] font-semibold text-white">{k.v}</p>
                <p className="text-[9px] text-emerald-400/80">{k.c}</p>
              </div>
            ))}
          </div>
          <div className="flex items-end gap-[3px] h-16 px-1">
            {[28, 42, 35, 58, 45, 72, 55, 85, 68, 92, 78, 88].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-[2px] bg-gradient-to-t from-white/10 to-white/30"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
      </FloatPanel>

      <FloatPanel
        delay={0.3}
        floatDelay={1.2}
        reducedMotion={reduced}
        className="top-[2%] left-[2%] md:left-[4%] w-[44%] md:w-[36%] z-30"
      >
        <div className="flex items-center gap-1.5 mb-2.5">
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-white/15" />
            <div className="w-2 h-2 rounded-full bg-white/15" />
            <div className="w-2 h-2 rounded-full bg-white/15" />
          </div>
          <Code2 size={10} className="text-white/30 ml-1" />
          <span className="text-[9px] text-white/35 font-mono">platform.ts</span>
        </div>
        <div className="font-mono text-[9px] leading-relaxed space-y-0.5">
          <p><span className="text-orange-300/80">const</span> <span className="text-white/80">deploy</span> = <span className="text-amber-200/70">async</span> () {"=> {"}</p>
          <p className="pl-2 text-white/40">await pipeline.run();</p>
          <p className="pl-2"><span className="text-orange-300/80">return</span> <span className="text-amber-300/70">scale</span>(100);</p>
          <p>{"}"}</p>
        </div>
      </FloatPanel>

      <FloatPanel
        delay={0.35}
        floatDelay={0.8}
        reducedMotion={reduced}
        className="top-[18%] right-[1%] md:right-[3%] w-[34%] md:w-[26%] z-25"
      >
        <div className="flex items-center gap-1.5 mb-3">
          <Smartphone size={12} className="text-white/45" />
          <span className="text-[10px] font-medium text-white/70">Mobile App</span>
        </div>
        <div className="rounded-xl bg-black/40 border border-white/[0.08] p-3 space-y-2">
          <div className="h-2 w-2/3 rounded-full bg-white/12" />
          <div className="h-2 w-1/2 rounded-full bg-white/6" />
          <div className="grid grid-cols-2 gap-1.5 mt-2">
            <div className="h-10 rounded-lg bg-white/[0.06]" />
            <div className="h-10 rounded-lg bg-white/[0.04]" />
          </div>
          <div className="h-8 rounded-lg bg-white/[0.05] mt-1" />
        </div>
      </FloatPanel>

      <FloatPanel
        delay={0.4}
        floatDelay={1.5}
        reducedMotion={reduced}
        className="bottom-[12%] left-[1%] md:left-[3%] w-[38%] md:w-[30%] z-28"
      >
        <div className="flex items-center gap-1.5 mb-2.5">
          <Cloud size={12} className="text-white/45" />
          <span className="text-[10px] font-medium text-white/70">Cloud Architecture</span>
        </div>
        {[
          { name: "AWS ECS", status: "Running" },
          { name: "Kubernetes", status: "Healthy" },
          { name: "Global CDN", status: "Active" },
        ].map((row) => (
          <div key={row.name} className="flex justify-between items-center py-1 border-b border-white/[0.04] last:border-0">
            <span className="text-[9px] text-white/45">{row.name}</span>
            <span className="text-[9px] text-emerald-400/80">{row.status}</span>
          </div>
        ))}
      </FloatPanel>

      <FloatPanel
        delay={0.45}
        floatDelay={0.5}
        reducedMotion={reduced}
        className="bottom-[28%] right-[2%] md:right-[5%] w-[32%] md:w-[24%] z-22"
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <DollarSign size={11} className="text-white/40" />
            <span className="text-[10px] font-medium text-white/70">Revenue</span>
          </div>
          <TrendingUp size={11} className="text-emerald-400/70" />
        </div>
        <svg viewBox="0 0 120 40" className="w-full h-10">
          <polyline
            fill="none"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            points="0,35 20,28 40,32 60,18 80,22 100,8 120,12"
          />
        </svg>
        <p className="text-[9px] text-emerald-400/70 mt-1">+24.5% this quarter</p>
      </FloatPanel>

      <FloatPanel
        delay={0.5}
        floatDelay={1.8}
        reducedMotion={reduced}
        className="top-[4%] right-[18%] md:right-[22%] w-[30%] md:w-[22%] z-26"
      >
        <div className="flex items-center gap-1.5 mb-2">
          <Bot size={12} className="text-white/45" />
          <span className="text-[10px] font-medium text-white/70">AI Workflow</span>
        </div>
        <div className="space-y-1.5">
          {["Analyze", "Process", "Deploy"].map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-white/[0.08] border border-white/[0.1] flex items-center justify-center text-[8px] text-white/50">
                {i + 1}
              </div>
              <span className="text-[9px] text-white/45">{step}</span>
            </div>
          ))}
        </div>
      </FloatPanel>

      <FloatPanel
        delay={0.55}
        floatDelay={2}
        reducedMotion={reduced}
        panelClassName="!p-2.5"
        className="top-[42%] left-[8%] md:left-[12%] w-[28%] md:w-[22%] z-35"
      >
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center shrink-0">
            <Bell size={11} className="text-white/50" />
          </div>
          <div>
            <p className="text-[9px] font-medium text-white/75">Deploy successful</p>
            <p className="text-[8px] text-white/35">v3.2.0 · Production</p>
          </div>
        </div>
      </FloatPanel>

      <FloatPanel
        delay={0.6}
        floatDelay={1}
        reducedMotion={reduced}
        className="bottom-[4%] right-[1%] md:right-[4%] w-[42%] md:w-[32%] z-24"
      >
        <div className="space-y-2.5">
          <KpiCard label="Active Users" value="12.4K" change="+8.2%" icon={Users} />
          <div className="border-t border-white/[0.05] pt-2.5">
            <KpiCard label="Performance" value="98ms" change="-14%" icon={Activity} />
          </div>
        </div>
      </FloatPanel>
    </div>
  );
}
