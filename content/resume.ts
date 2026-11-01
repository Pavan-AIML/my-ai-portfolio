/**
 * Single source of truth for resume content.
 * Keep in sync with /public/CV.pdf.
 */

export const profile = {
  name: "Pavan Kumar",
  title: "Full-Stack AI Engineer",
  location: "Munich, Germany",
  email: "pavanln049@gmail.com",
  phone: "+49 176 35687027",
  linkedin: "https://www.linkedin.com/in/kumar-pavan/",
  github: "https://github.com/Pavan-AIML",
  cvPath: "/CV.pdf",
  summary:
    "AI Engineer with 4+ years of engineering experience, including 2 years shipping GenAI features end-to-end - from prompt engineering and RAG pipeline design through to cloud deployment on AWS/Azure. I build LLM-powered products that cut manual work and lift accuracy, and I'm comfortable owning the full ML life cycle in fast-moving teams.",
  headline:
    "I ship AI applications from prototype to production: full-stack apps, agentic workflows and MLOps around them.",
};

export const metrics = [
  { value: "4+", label: "Years engineering" },
  { value: "2+", label: "Years shipping GenAI" },
  { value: "70%", label: "Manual work reduced" },
  { value: "30%", label: "Accuracy gained" },
];

export type SkillGroup = { title: string; items: string[] };

export const skillGroups: SkillGroup[] = [
  {
    title: "AI / ML",
    items: ["PyTorch", "scikit-learn", "LangChain", "LangGraph", "LangSmith", "Google ADK", "Optuna"],
  },
  {
    title: "Full-Stack",
    items: ["Python", "TypeScript", "Node.js", "React", "FastAPI", "SQL", "MongoDB"],
  },
  {
    title: "MLOps / DevOps",
    items: ["Docker", "Kubernetes", "Terraform", "GitHub Actions", "ArgoCD", "MLflow", "Kubeflow", "Prometheus", "Grafana"],
  },
  {
    title: "Cloud",
    items: ["AWS (EKS)", "Azure", "Databricks", "Linux", "Git"],
  },
];

export type ExperienceCategory = "aiops" | "ai" | "data" | "ml" | "devops" | "platform";

export type Experience = {
  role: string;
  org: string;
  location: string;
  start: string;
  end: string;
  type: string;
  category: ExperienceCategory;
  tags: string[];
  bullets: string[];
};

export const experiences: Experience[] = [
  {
    role: "AIOps Engineer, Intern",
    org: "Munich Re",
    location: "Munich, Germany",
    start: "Sep 2025",
    end: "Feb 2026",
    type: "Internship",
    category: "aiops",
    tags: ["Power Automate", "LLM Tool-Calling", "FastAPI", "Docker", "AWS EKS", "GitHub Actions", "LangSmith"],
    bullets: [
      "Architected a multi-step credit-control workflow in Microsoft Power Automate, integrating LLM tool-calling and human-in-the-loop approvals to automate checks and route decisions to responsible stakeholders, replacing a fully manual end-to-end process.",
      "Deployed an agentic RAG backend with FastAPI, Docker and AWS EKS, using GitHub Actions for CI/CD and LangSmith for observability.",
    ],
  },
  {
    role: "AI Engineer, Working Student",
    org: "MERMEC Group",
    location: "Munich, Germany",
    start: "Jun 2025",
    end: "Aug 2025",
    type: "Working Student",
    category: "ai",
    tags: ["LangGraph", "Deepagents", "Hybrid RAG", "Docker", "Kubernetes", "AWS", "GitLab CI/CD"],
    bullets: [
      "Built a multi-agent system with LangGraph (Deepagents) and hybrid RAG over internal technical documentation so engineers could query specs instead of digging through PDFs.",
      "Containerized the app with Docker, ran it on Kubernetes on AWS, and used GitLab CI/CD to ship it to production.",
    ],
  },
  {
    role: "Data Engineer, Working Student",
    org: "BMW Group",
    location: "Munich, Germany",
    start: "Jun 2024",
    end: "Sep 2024",
    type: "Working Student",
    category: "data",
    tags: ["Azure Databricks", "ETL", "SQL", "Power BI"],
    bullets: [
      "Built Azure Databricks ETL pipelines for vehicle sensor data, with SQL analysis and Power BI KPI reporting for leadership.",
    ],
  },
  {
    role: "ML Engineer, Intern",
    org: "ZEISS, Corporate Research & Technology",
    location: "Oberkochen, Germany",
    start: "Sep 2023",
    end: "Apr 2024",
    type: "Full-time Internship",
    category: "ml",
    tags: ["PyTorch", "Polynomial Regression", "Optuna", "AWS Deployment", "MLFlow", "CI/CD", "Docker"],
    bullets: [
      "Implemented polynomial regression from scratch in PyTorch to interpolate 3D printer data.",
      "Tuned model architectures with Optuna and deployed the final model to production on AWS.",
    ],
  },
  {
    role: "ML Engineer, Intern",
    org: "Max Planck Institute",
    location: "Garching, Munich",
    start: "Jun 2023",
    end: "Aug 2023",
    type: "Internship",
    category: "ml",
    tags: ["scikit-learn", "Random Forest", "XGBoost", "CNN", "Computer Vision"],
    bullets: [
      "Built scikit-learn pipelines for spectral image preprocessing and classification, benchmarking Random Forest / XGBoost against CNNs.",
    ],
  },
  {
    role: "Digital Platform & Automation, Intern",
    org: "Infineon Technologies",
    location: "Munich, Germany",
    start: "Aug 2022",
    end: "Jan 2023",
    type: "Internship",
    category: "platform",
    tags: ["Python", "Pandas", "Automation", "Content Deployment"],
    bullets: [
      "Automated training-data processing with Python / Pandas and streamlined digital content deployment workflows on Infineon's internal platform.",
    ],
  },
  {
    role: "Project Manager (DevOps Engineer), Full-Time",
    org: "HomeLane",
    location: "Pune, India",
    start: "Mar 2019",
    end: "Sep 2020",
    type: "Full-time",
    category: "devops",
    tags: ["AWS", "Terraform", "CI/CD", "Prometheus", "Grafana", "Full-Stack"],
    bullets: [
      "Developed HomeLane's internal full-stack platform and made it scalable and reliable on AWS.",
      "Used Terraform to provision infrastructure as code and set up CI/CD pipelines for automated deployments.",
      "Instrumented the platform with Prometheus and Grafana for monitoring and alerting across services.",
    ],
  },
];

export type Project = {
  name: string;
  description: string;
  github?: string;
  demo?: string;
  image?: string;
  image2?: string;
  imageAlt?: string;
  tags: string[];
};

export const projects: Project[] = [
  {
    name: "Master's Thesis: Air Quality Forecasting from MODIS Satellite Data (TUM)",
    description:
      "Neural Process framework for spatio-temporal air-quality forecasting (AOD and PM2.5) from MODIS satellite data over Delhi, leveraging Bayesian Neural Networks, Gaussian Processes, CNNs, cKDTree and KNNs.",
    github: "https://github.com/Pavan-AIML/Master-Thesis",
    image: "/projects/latitude_longitude_AOD_idw_PM2.5_idw____AOD_PM2.5_var_AOD.png",
    image2: "/projects/latitude_longitude_AOD_idw_PM2.5_idw____AOD_PM2.5_var_PM2.5.png",
    imageAlt: "Master's thesis result preview",
    tags: ["Deep Learning", "Bayesian NN", "Gaussian Process", "Python"],
  },
  {
    name: "Supply-Chain Agent",
    description:
      "Production-grade supply-chain agent built with LangGraph, RAG and tool calling. Includes safety guardrails, observability and CI/CD. The kind of agent you'd actually trust in production.",
    github: "https://github.com/Pavan-AIML",
    image: "/Supply-Chain_Agent.jpg",
    tags: ["LangGraph", "RAG", "Tool Calling", "Guardrails", "CI/CD"],
  },
  {
    name: "Agentic RAG",
    description:
      "Multi-agent hybrid RAG retrieval pipeline built with LangChain and OpenAI models for high-accuracy question answering over enterprise documents.",
    github: "https://github.com/Pavan-AIML/RAG_AGENT",
    image: "/Agentic_RAG.jpg",
    tags: ["RAG", "LangChain", "Multi-Agent", "Python"],
  },
  {
    name: "Deploying an E-Commerce App on Azure with Kubernetes",
    description:
      "End-to-end DevOps setup that takes a web shop from code to production on Azure: separate test and live environments, fully automated deployments, safe rollouts that undo themselves if errors appear, and dashboards to monitor everything. Built with Terraform, AKS, Argo CD, GitHub Actions, Prometheus and Grafana.",
    github: "https://github.com/Pavan-AIML/st_repo",
    image: "/Ecommerce_Application.jpg",
    tags: ["Azure", "Kubernetes", "Terraform", "Argo CD", "CI/CD", "Prometheus", "Grafana"],
  },
];
export const education = [
  {
    degree: "M.Sc. Mathematics in Science and Engineering (Major: AI)",
    org: "Technical University of Munich (TUM)",
    location: "Munich, Germany",
    start: "Apr 2022",
    end: "Jul 2026",
    coursework: "Machine Learning, Deep Learning, Computer Vision, Foundations of LLMs, Numerics and Non-Linear Optimization.",
  },
  {
    degree: "B.Tech Engineering (Major: Mathematics)",
    org: "Vellore Institute of Technology (VIT)",
    location: "Vellore, India",
    start: "Jun 2013",
    end: "May 2017",
    coursework: "Probability & Statistics, Differential & Difference Equations, Computer Programming (C), Complex Variables & PDEs.",
  },
];

export const certificates = [
  {
    name: "European Hackathon League Winner",
    issuer: "TUM.ai",
    year: "2026",
    link: "https://ehl.gg/api/certificates/00000000-0000-0000-0000-000000000001/56ad7827-4eda-497e-bff0-86e5ddfa085c?member=836aebd8-6ab7-4d5a-a1b9-a6fcf9525fc8",
  },
  {
    name: "ML Engineer, Internship",
    issuer: "ZEISS",
    year: "2024",
    link: "https://drive.google.com/file/d/11dS-_wtbqFHSdUiu1Q40Rbbyow09v1xF/view?usp=sharing",
  },
  {
    name: "ML Engineer, Internship",
    issuer: "Max Planck",
    year: "2023",
    link: "https://drive.google.com/file/d/1DfNyjbJdCPQeb35pTUW8UkTCm6_IUnO2/view?usp=sharing",
  },
 
];

export const achievements = [
  "4th place in the TUM.ai Makeathon Challenge, among 40+ teams.",
];

export const languages = [
  { name: "English", level: "Fluent" },
  { name: "German", level: "A2" },
  { name: "Hindi", level: "Native" },
];
