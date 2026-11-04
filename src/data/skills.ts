import { SkillGroup } from "@/types";

export const skillGroups: SkillGroup[] = [
  {
    id: "languages",
    title: "LANGUAGES",
    dotColor: "#38bdf8", // Sky blue
    items: [
      { name: "Python", iconName: "SiPython", color: "#3776AB" },
      { name: "C++", iconName: "SiCplusplus", color: "#00599C" },
      { name: "JavaScript", iconName: "SiJavascript", color: "#F7DF1E" },
      { name: "TypeScript", iconName: "SiTypescript", color: "#3178C6" },
      { name: "Go", iconName: "SiGo", color: "#00ADD8" },
      { name: "SQL", iconName: "SiPostgresql", color: "#4169E1" },
      { name: "C", iconName: "SiC", color: "#A8B9CC" },
      { name: "Java", iconName: "FaJava", color: "#ED8B00" },
      { name: "HTML5", iconName: "SiHtml5", color: "#E34F26" },
      { name: "CSS3", iconName: "SiCss", color: "#1572B6" },
    ],
  },
  {
    id: "backend",
    title: "BACKEND & SYSTEMS",
    dotColor: "#a855f7", // Purple
    items: [
      { name: "Node.js", iconName: "SiNodedotjs", color: "#339933" },
      { name: "Express", iconName: "SiExpress", color: "#ffffff" },
      { name: "NestJS", iconName: "SiNestjs", color: "#E0234E" },
      { name: "Microservices", iconName: "TbTopologyComplex", color: "#a855f7" },
      { name: "Dist. Systems", iconName: "TbNetwork", color: "#c084fc" },
      { name: "High-Scale", iconName: "TbTrendingUp", color: "#e879f9" },
      { name: "Caching", iconName: "SiRedis", color: "#DC382D" },
      { name: "REST APIs", iconName: "TbApi", color: "#38bdf8" },
      { name: "System Design", iconName: "TbCpu", color: "#22d3ee" },
      { name: "Optimization", iconName: "TbGauge", color: "#4ade80" },
    ],
  },
  {
    id: "databases",
    title: "DATABASES",
    dotColor: "#f43f5e", // Rose/Red
    items: [
      { name: "PostgreSQL", iconName: "SiPostgresql", color: "#4169E1" },
      { name: "MongoDB", iconName: "SiMongodb", color: "#47A248" },
      { name: "MySQL", iconName: "SiMysql", color: "#4479A1" },
      { name: "Redis", iconName: "SiRedis", color: "#DC382D" },
      { name: "Supabase", iconName: "SiSupabase", color: "#3FCF8E" },
      { name: "Prisma", iconName: "SiPrisma", color: "#2D3748" },
    ],
  },
  {
    id: "cloud-devops",
    title: "CLOUD & DEVOPS",
    dotColor: "#06b6d4", // Cyan
    items: [
      { name: "Docker", iconName: "SiDocker", color: "#2496ED" },
      { name: "Kubernetes", iconName: "SiKubernetes", color: "#326CE5" },
      { name: "CI / CD", iconName: "SiGitlab", color: "#FC6D26" },
      { name: "Linux", iconName: "SiLinux", color: "#FCC624" },
      { name: "Bash", iconName: "SiGnubash", color: "#4EAA25" },
      { name: "GCP", iconName: "SiGooglecloud", color: "#4285F4" },
      { name: "GitHub Actions", iconName: "SiGithubactions", color: "#2088FF" },
      { name: "Nginx", iconName: "SiNginx", color: "#009639" },
    ],
  },
  {
    id: "frameworks",
    title: "FRAMEWORKS",
    dotColor: "#10b981", // Emerald
    items: [
      { name: "Next.js", iconName: "SiNextdotjs", color: "#ffffff" },
      { name: "React", iconName: "SiReact", color: "#61DAFB" },
      { name: "Tailwind CSS", iconName: "SiTailwindcss", color: "#06B6D4" },
      { name: "FastAPI", iconName: "SiFastapi", color: "#009688" },
      { name: "Django", iconName: "SiDjango", color: "#092E20" },
    ],
  },
  {
    id: "ai-algorithms",
    title: "AI TRAINING & ALGORITHMS",
    dotColor: "#f59e0b", // Amber
    items: [
      { name: "A* Search", iconName: "Bot", color: "#22d3ee" },
      { name: "RLHF / LLMs", iconName: "Sparkles", color: "#f59e0b" },
      { name: "Model Eval", iconName: "ShieldCheck", color: "#10b981" },
      { name: "Graph Theory", iconName: "Network", color: "#a855f7" },
      { name: "Dynamic Prog", iconName: "Cpu", color: "#38bdf8" },
      { name: "Codeforces CP", iconName: "Trophy", color: "#eab308" },
    ],
  },
  {
    id: "tools",
    title: "DEVELOPER TOOLS",
    dotColor: "#f97316", // Orange
    items: [
      { name: "Git", iconName: "SiGit", color: "#F05032" },
      { name: "GitHub", iconName: "SiGithub", color: "#ffffff" },
      { name: "GitLab", iconName: "SiGitlab", color: "#FC6D26" },
      { name: "Postman", iconName: "SiPostman", color: "#FF6C37" },
      { name: "VS Code", iconName: "TbBrandVscode", color: "#007ACC" },
      { name: "Jest", iconName: "SiJest", color: "#C21325" },
    ],
  },
];
