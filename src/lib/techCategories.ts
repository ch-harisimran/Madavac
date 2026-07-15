export type TechCategory =
  | "Frontend"
  | "Backend"
  | "Mobile"
  | "Database"
  | "Cloud"
  | "DevOps"
  | "AI & LLM";

export interface TechnologyItem {
  name: string;
  description: string;
  logo?: string;
  simpleIcon?: string;
  color?: string;
}

export const techCategories: TechCategory[] = [
  "Frontend",
  "Backend",
  "Mobile",
  "Database",
  "Cloud",
  "DevOps",
  "AI & LLM",
];

export const technologiesByCategory: Record<TechCategory, TechnologyItem[]> = {
  Frontend: [
    {
      name: "React",
      description: "Building fast, interactive user interfaces at scale.",
      logo: "/tech-logos/react.svg",
    },
    {
      name: "Next.js",
      description: "Full-stack React framework for modern web applications.",
      logo: "/tech-logos/nextdotjs.svg",
    },
    {
      name: "TypeScript",
      description: "Type-safe JavaScript for maintainable frontend codebases.",
      simpleIcon: "typescript",
      color: "3178C6",
    },
    {
      name: "JavaScript",
      description: "The language powering dynamic web experiences worldwide.",
      simpleIcon: "javascript",
      color: "F7DF1E",
    },
    {
      name: "Tailwind CSS",
      description: "Utility-first CSS for rapid, consistent UI development.",
      simpleIcon: "tailwindcss",
      color: "06B6D4",
    },
    {
      name: "HTML5",
      description: "Semantic structure and accessibility for the modern web.",
      simpleIcon: "html5",
      color: "E34F26",
    },
    {
      name: "CSS3",
      description: "Advanced styling, layout, and motion on the web.",
      simpleIcon: "css",
      color: "1572B6",
    },
    {
      name: "Framer Motion",
      description: "Production-grade animation for React applications.",
      simpleIcon: "framer",
      color: "0055FF",
    },
  ],
  Backend: [
    {
      name: "Node.js",
      description: "High-performance JavaScript runtime for server-side apps.",
      logo: "/tech-logos/nodejs.svg",
    },
    {
      name: "Express.js",
      description: "Minimal, flexible framework for APIs and web services.",
      simpleIcon: "express",
      color: "FFFFFF",
    },
    {
      name: "Python",
      description: "Powering scalable backend services and automation.",
      logo: "/tech-logos/python.svg",
    },
    {
      name: "FastAPI",
      description: "Modern Python framework for fast, typed API development.",
      logo: "/tech-logos/fastapi.svg",
    },
    {
      name: "REST APIs",
      description: "Standardized interfaces for reliable system integration.",
      simpleIcon: "openapiinitiative",
      color: "6BA539",
    },
    {
      name: "GraphQL",
      description: "Flexible query language for efficient data fetching.",
      simpleIcon: "graphql",
      color: "E10098",
    },
  ],
  Mobile: [
    {
      name: "React Native",
      description: "Cross-platform mobile apps with native performance.",
      logo: "/tech-logos/react-native.svg",
    },
    {
      name: "Flutter",
      description: "Beautiful, natively compiled apps from a single codebase.",
      simpleIcon: "flutter",
      color: "02569B",
    },
    {
      name: "Expo",
      description: "Accelerated React Native development and deployment.",
      simpleIcon: "expo",
      color: "FFFFFF",
    },
    {
      name: "Android",
      description: "Native Android experiences for global mobile reach.",
      simpleIcon: "android",
      color: "3DDC84",
    },
    {
      name: "iOS",
      description: "Polished Apple ecosystem apps with premium UX.",
      simpleIcon: "apple",
      color: "FFFFFF",
    },
  ],
  Database: [
    {
      name: "PostgreSQL",
      description: "Advanced open-source relational database for enterprise data.",
      logo: "/tech-logos/postgresql.svg",
    },
    {
      name: "MongoDB",
      description: "Flexible document database for modern applications.",
      logo: "/tech-logos/mongodb.svg",
    },
    {
      name: "MySQL",
      description: "Trusted relational database for structured workloads.",
      simpleIcon: "mysql",
      color: "4479A1",
    },
    {
      name: "Redis",
      description: "In-memory data store for caching and real-time performance.",
      logo: "/tech-logos/redis.svg",
    },
  ],
  Cloud: [
    {
      name: "AWS",
      description: "Enterprise cloud infrastructure at global scale.",
      logo: "/tech-logos/aws.svg",
    },
    {
      name: "Azure",
      description: "Microsoft cloud platform for enterprise-grade deployments.",
      simpleIcon: "microsoftazure",
      color: "0078D4",
    },
    {
      name: "Google Cloud",
      description: "Scalable cloud services for data, compute, and AI workloads.",
      simpleIcon: "googlecloud",
      color: "4285F4",
    },
    {
      name: "Vercel",
      description: "Edge-first deployment for modern frontend frameworks.",
      simpleIcon: "vercel",
      color: "FFFFFF",
    },
    {
      name: "Cloudflare",
      description: "CDN, security, and edge computing for global applications.",
      simpleIcon: "cloudflare",
      color: "F38020",
    },
  ],
  DevOps: [
    {
      name: "Docker",
      description: "Containerized environments for consistent deployments.",
      logo: "/tech-logos/docker.svg",
    },
    {
      name: "Kubernetes",
      description: "Orchestration for scalable, resilient cloud workloads.",
      logo: "/tech-logos/kubernetes.svg",
    },
    {
      name: "GitHub Actions",
      description: "Automated CI/CD pipelines integrated with your codebase.",
      simpleIcon: "githubactions",
      color: "2088FF",
    },
    {
      name: "Linux",
      description: "Stable server foundation for production infrastructure.",
      simpleIcon: "linux",
      color: "FCC624",
    },
    {
      name: "NGINX",
      description: "High-performance reverse proxy and load balancing.",
      simpleIcon: "nginx",
      color: "009639",
    },
  ],
  "AI & LLM": [
    {
      name: "OpenAI",
      description: "Advanced language models for intelligent product features.",
      logo: "/tech-logos/openai.svg",
    },
    {
      name: "LangChain",
      description: "Framework for building context-aware AI applications.",
      simpleIcon: "langchain",
      color: "FFFFFF",
    },
    {
      name: "Hugging Face",
      description: "Access to state-of-the-art ML models and tooling.",
      simpleIcon: "huggingface",
      color: "FFD21E",
    },
    {
      name: "Ollama",
      description: "Run open-source LLMs locally with low-latency inference.",
      simpleIcon: "ollama",
      color: "FFFFFF",
    },
    {
      name: "Pinecone",
      description: "Vector search infrastructure for semantic retrieval.",
      simpleIcon: "pinecone",
      color: "FFFFFF",
    },
    {
      name: "Qdrant",
      description: "High-performance vector database for AI-powered search.",
      simpleIcon: "qdrant",
      color: "DC382D",
    },
  ],
};
