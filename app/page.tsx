import Image from "next/image";
import { VoiceAgent } from "@/components/VoiceAgent";
import { ZoomableImage } from "@/components/ZoomableImage";

export default function Home() {
  const projects = [
    {
      name: "Master-Thesis",
      description: "Joint Spatial Estimation of Aerosol Optical Depth (AOD) and Ground-Level Particulate Matter (PM2.5) from Satellite and Ground Observations in Delhi: A Probabilistic Neural Process Approach",
      github: "https://github.com/Pavan-AIML/Master-Thesis",
      demo: "",
      image: "/projects/latitude_longitude_AOD_idw_PM2.5_idw____AOD_PM2.5_var_AOD.png",
      image2: "/projects/latitude_longitude_AOD_idw_PM2.5_idw____AOD_PM2.5_var_PM2.5.png",
      imageAlt: "Master thesis project result preview",
      tags: ["Deep Learning", "Python", "MLOps","Gaussian Process", "Probabilistic Machine Learning"],
    },
    {
      name: "Agentic RAG",
      description: "In this project I have built a multi-agent hybrid RAG retrieval pipeline. The Pipeline has been built using LangChain and OpenAI models. Used retrieval technique is hybrid RAG.",
      github: "https://github.com/Pavan-AIML/RAG_AGENT",
      demo: "",
      image: "/Agentic_RAG.jpg",
      tags: ["RAG", "Python"],
    },
    {
      name: "HR ChatBot",
      description: "In this project the HR ChatBot has been built using OpenAI models. The ChatBot is able to answer questions about the interview process and the company on behalf of the HR.",
      github: "https://github.com/Pavan-AIML/HR_Chatbot_for_interviewprocess_using_open-AI_model",
      demo: "",
      image: "/HR_Chatbot.png",
      tags: ["ChatBot", "Python"],
    },
  ];

  const certificates = [
    {
      name: "Data Scientist, Internship",
      issuer: "ZEISS",
      year: "2024",
      link: "https://drive.google.com/file/d/11dS-_wtbqFHSdUiu1Q40Rbbyow09v1xF/view?usp=sharing",
    },
    {
      name: "ML Engineer, Internship",
      issuer: "Max-Planck",
      year: "2023",
      link: "https://drive.google.com/file/d/1DfNyjbJdCPQeb35pTUW8UkTCm6_IUnO2/view?usp=sharing",
    },
    
  ];

  return (
    <div className="min-h-screen bg-zinc-950 font-sans text-white">
      {/* Colorful background blobs */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-fuchsia-600/30 blur-3xl" />
        <div className="absolute top-28 -left-24 h-[520px] w-[520px] rounded-full bg-sky-500/25 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[520px] w-[520px] rounded-full bg-violet-600/25 blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />
      </div>

      <main className="mx-auto w-full max-w-6xl px-6 pb-24">
        {/* Voice agent lives as a floating widget now */}
        <VoiceAgent autoOpen autoWelcome />

        {/* <section className="grid gap-10 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/30 backdrop-blur md:grid-cols-2 md:items-center"> */}
        <section className="relative grid gap-10 overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-r from-fuchsia-900/55 via-violet-900/55 to-sky-900/50 p-8 shadow-2xl shadow-black/50 backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:border-fuchsia-300/40 hover:shadow-2xl hover:shadow-fuchsia-500/15 md:grid-cols-[1.6fr_1fr] md:items-center">
        <div className="pointer-events-none absolute inset-0 opacity-40">
    <div className="absolute -top-20 -left-10 h-56 w-56 rounded-full bg-fuchsia-500 blur-3xl" />
    <div className="absolute -bottom-24 right-0 h-64 w-64 rounded-full bg-sky-400 blur-3xl" />
  </div>
          {/* LEFT: hero text */}
          <div className="flex w-full flex-col space-y-4 pr-8 md:ml-auto md:mr-0 md:pr-12">
            <p className="inline-flex w-fit items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-white/80">
              AI Engineer | Munich
            </p>
            <h1 className="text-left text-2xl font-bold leading-tight tracking-tight md:text-4xl">
              Hi, I&apos;m <span className="bg-gradient-to-r from-fuchsia-300 via-violet-200 to-sky-300 bg-clip-text text-transparent">Pavan Kumar</span>
            </h1>
            <p className="max-w-2xl text-base font-medium leading-7 text-zinc-100/95 md:text-lg">
              I build production-ready AI applications from model development to deployment.
            </p>
            <p className="max-w-2xl text-sm leading-7 text-zinc-200/90 md:text-base">
              I am studying Master&apos;s in Data Science and Applied Mathematics at TUM. Explore my work experience and projects below, or use the live voice assistant to ask about my background in LLMs, AI agents, data science and MLOps
            </p>
            <div className="flex flex-wrap gap-2.5 text-[11px] font-semibold">
              <span className="rounded-full border border-fuchsia-300/35 bg-fuchsia-500/15 px-3 py-1 text-fuchsia-100">Agentic AI</span>
              <span className="rounded-full border border-sky-300/35 bg-sky-500/15 px-3 py-1 text-sky-100">MLOps</span>
              <span className="rounded-full border border-violet-300/35 bg-violet-500/15 px-3 py-1 text-violet-100">Cloud Data Pipelines</span>
              <span className="rounded-full border border-emerald-300/35 bg-emerald-500/15 px-3 py-1 text-emerald-100">Production Applications</span>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="#workexperience"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-fuchsia-600 via-violet-600 to-sky-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition duration-300 hover:-translate-y-0.5 hover:opacity-95 hover:shadow-lg hover:shadow-fuchsia-500/30"
              >
                View experience
              </a>
              <a
                href="#projects"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-zinc-900/70 px-5 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:border-white/35 hover:bg-zinc-800/80 hover:shadow-lg hover:shadow-violet-500/15"
              >
                View projects
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-zinc-900/70 px-5 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:border-white/35 hover:bg-zinc-800/80 hover:shadow-lg hover:shadow-violet-500/15"
              >
                Contact
              </a>
            </div>
          </div>

          {/* RIGHT: just your image */}
          <div className="flex justify-center">
            <div className="relative h-52 w-52 overflow-hidden rounded-3xl border border-white/10 bg-white/10 shadow-xl shadow-black/40 transition duration-300 hover:-translate-y-1 hover:border-fuchsia-300/40 hover:shadow-xl hover:shadow-fuchsia-500/25 md:h-60 md:w-60">
              <Image
                src="/profile.jpg"
                alt="Portrait of Pavan Kumar"
                width={400}
                height={400}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </section>

        <section id="projects" className="mt-14">
          <h2 className="text-lg font-semibold">Projects:</h2>
          <p className="mt-2 text-sm text-zinc-200/90">Click a card to open the repo.</p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {projects.map((p) => (
              <article
                key={p.name}
                className="group relative overflow-hidden rounded-3xl border border-white/15 bg-zinc-900/70 p-5 shadow-xl shadow-black/40 transition duration-300 hover:-translate-y-0.5 hover:border-fuchsia-300/50 hover:bg-zinc-800/75 hover:shadow-xl hover:shadow-fuchsia-500/20"
              >
                <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
                  <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-fuchsia-500/20 blur-3xl" />
                  <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-sky-500/15 blur-3xl" />
                </div>

                <div className="relative flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold">{p.name}</p>
                    <p className="mt-2 text-sm leading-6 text-zinc-100/90">{p.description}</p>
                  </div>

                  <Image
                    src="/globe.svg"
                    alt=""
                    width={16}
                    height={16}
                    className="opacity-80 invert"
                  />
                </div>

                {"image" in p && p.image ? (
                  <div className="relative mt-4 overflow-hidden rounded-2xl border border-white/10 bg-black/20">
                    <Image
                      src={p.image}
                      alt={("imageAlt" in p && p.imageAlt) || ""}
                      width={1200}
                      height={700}
                      className="h-40 w-full object-cover md:h-44"
                    />
                  </div>
                ) : null}

                <div className="relative mt-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/10 bg-black/30 px-2.5 py-1 text-[11px] font-semibold text-white/80"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="relative mt-5 flex items-center gap-3 text-xs font-semibold">
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full bg-white px-3 py-1.5 text-black transition duration-300 hover:-translate-y-0.5 hover:opacity-95 hover:shadow-md hover:shadow-fuchsia-500/25"
                  >
                    GitHub
                  </a>
                  {p.demo ? (
                    <a
                      href={p.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-white/20 bg-zinc-900/70 px-3 py-1.5 text-white transition duration-300 hover:-translate-y-0.5 hover:border-fuchsia-300/40 hover:bg-zinc-800/80 hover:shadow-md hover:shadow-fuchsia-500/20"
                    >
                      Live demo
                    </a>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </section>


        {/* {Section for the work experience} */}
        <section id="workexperience" className="relative mt-16 overflow-hidden rounded-3xl border border-white/25 bg-gradient-to-r from-fuchsia-900/70 via-violet-900/65 to-sky-900/65 p-7 shadow-2xl shadow-black/60 transition duration-300 hover:-translate-y-0.5 hover:border-fuchsia-300/40 hover:shadow-2xl hover:shadow-fuchsia-500/15 md:p-10">
        <div className="pointer-events-none absolute inset-0 opacity-40">
          <div className="absolute -top-16 -left-10 h-44 w-44 rounded-full bg-fuchsia-500/40 blur-3xl" />
          <div className="absolute -bottom-16 right-0 h-48 w-48 rounded-full bg-sky-400/30 blur-3xl" />
        </div>
        <div className="relative grid gap-8 md:grid-cols-[1.5fr_1fr] md:items-start">
          {/* LEFT: experience timeline */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Work Experiences</h2>
            <p className="-mt-2 max-w-2xl text-sm leading-6 text-zinc-200/90 md:text-base">
              A timeline of impact across AI engineering, MLOps, data platforms, and business analytics.
            </p>
              <div className="relative space-y-6 border-l border-white/20 pl-6 text-base text-white/90">
                  <div className="group relative rounded-2xl border border-white/20 bg-zinc-950/75 p-5 shadow-lg shadow-black/30 transition duration-300 hover:-translate-y-0.5 hover:border-fuchsia-300/50 hover:bg-zinc-900/90 hover:shadow-fuchsia-500/20 md:p-6">
                  <span className="absolute -left-[34px] top-7 h-3 w-3 rounded-full border border-white/50 bg-fuchsia-300 shadow shadow-fuchsia-400/60" />
                  <p className="text-sm font-medium tracking-wide text-sky-200/90">September 2025 - February 2026</p>
          <p className="mt-1 text-base font-semibold md:text-lg">AI Engineer, Munich-RE</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <span className="rounded-full border border-sky-300/40 bg-sky-500/20 px-2.5 py-1 text-[11px] font-semibold text-sky-100">Python Automation</span>
            <span className="rounded-full border border-violet-300/40 bg-violet-500/20 px-2.5 py-1 text-[11px] font-semibold text-violet-100">SQL/SSMS</span>
            <span className="rounded-full border border-fuchsia-300/40 bg-fuchsia-500/20 px-2.5 py-1 text-[11px] font-semibold text-fuchsia-100">Power BI</span>
            <span className="rounded-full border border-emerald-300/40 bg-emerald-500/20 px-2.5 py-1 text-[11px] font-semibold text-emerald-100">Process Automation</span>
          </div>
          <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-7 text-zinc-100/90 md:text-[15px]">
          <li>
          Architected a multi-step agentic workflow in Microsoft Power Automate with LLM tool-calling to autonomously execute credit control checks and route decisions to the responsible stakeholders, replacing a fully manual end-to-end process.
          </li>
          <li>
          Queried MGA data in SSMS to support ad hoc analysis, feeding insights into Power BI dashboards used by leadership.
          </li>
      </ul>
      
    </div>

        <div className="group relative rounded-2xl border border-white/20 bg-zinc-950/75 p-5 shadow-lg shadow-black/30 transition duration-300 hover:-translate-y-0.5 hover:border-fuchsia-300/50 hover:bg-zinc-900/90 hover:shadow-fuchsia-500/20 md:p-6">
          <span className="absolute -left-[34px] top-7 h-3 w-3 rounded-full border border-white/50 bg-violet-300 shadow shadow-violet-400/60" />
          <p className="text-sm font-medium tracking-wide text-sky-200/90">June 2025 - Sep 2025</p>
          <p className="mt-1 text-base font-semibold md:text-lg">AI Engineer, Mermec, Work-Study</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <span className="rounded-full border border-fuchsia-300/40 bg-fuchsia-500/20 px-2.5 py-1 text-[11px] font-semibold text-fuchsia-100">LLM Agents</span>
            <span className="rounded-full border border-violet-300/40 bg-violet-500/20 px-2.5 py-1 text-[11px] font-semibold text-violet-100">LangGraph</span>
            <span className="rounded-full border border-sky-300/40 bg-sky-500/20 px-2.5 py-1 text-[11px] font-semibold text-sky-100">Hybrid RAG</span>
            <span className="rounded-full border border-emerald-300/40 bg-emerald-500/20 px-2.5 py-1 text-[11px] font-semibold text-emerald-100">CI/CD</span>
            <span className="rounded-full border border-amber-300/40 bg-amber-500/20 px-2.5 py-1 text-[11px] font-semibold text-amber-100">Docker</span>
          </div>
          <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-7 text-zinc-100/90 md:text-[15px]">
          <li>
          Automated critical railway workflows by building a multi-agent system using
          LangGraph, incorporating hybrid RAG to streamline access to technical documents.
          </li>
          <li>
          Implemented CI/CD pipelines using Docker and GitLab.
          </li>
          </ul>

        </div>
        <div className="group relative rounded-2xl border border-white/20 bg-zinc-950/75 p-5 shadow-lg shadow-black/30 transition duration-300 hover:-translate-y-0.5 hover:border-fuchsia-300/50 hover:bg-zinc-900/90 hover:shadow-fuchsia-500/20 md:p-6">
          <span className="absolute -left-[34px] top-7 h-3 w-3 rounded-full border border-white/50 bg-sky-300 shadow shadow-sky-400/60" />
          <p className="text-sm font-medium tracking-wide text-sky-200/90">June 2024 - August 2024</p>
          <p className="mt-1 text-base font-semibold md:text-lg">Data Engineer, BMW, Work-Study</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <span className="rounded-full border border-sky-300/40 bg-sky-500/20 px-2.5 py-1 text-[11px] font-semibold text-sky-100">Azure Data Lake</span>
            <span className="rounded-full border border-violet-300/40 bg-violet-500/20 px-2.5 py-1 text-[11px] font-semibold text-violet-100">Databricks</span>
            <span className="rounded-full border border-fuchsia-300/40 bg-fuchsia-500/20 px-2.5 py-1 text-[11px] font-semibold text-fuchsia-100">ETL Pipelines</span>
            <span className="rounded-full border border-emerald-300/40 bg-emerald-500/20 px-2.5 py-1 text-[11px] font-semibold text-emerald-100">SQL</span>
            <span className="rounded-full border border-amber-300/40 bg-amber-500/20 px-2.5 py-1 text-[11px] font-semibold text-amber-100">Power BI</span>
          </div>
          <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-7 text-zinc-100/90 md:text-[15px]">
          <li>
          Collected raw vehicle sensor data from Azure Data Lake
          </li>
          <li>
          Built ETL pipeline for data ingestion and transformation in Azure Databricks
          </li>
          <li>
          Used SSMS to query data from Azure SQL Database & visualize using Power BI
          </li>
          </ul>

        </div>
        <div className="group relative rounded-2xl border border-white/20 bg-zinc-950/75 p-5 shadow-lg shadow-black/30 transition duration-300 hover:-translate-y-0.5 hover:border-fuchsia-300/50 hover:bg-zinc-900/90 hover:shadow-fuchsia-500/20 md:p-6">
          <span className="absolute -left-[34px] top-7 h-3 w-3 rounded-full border border-white/50 bg-fuchsia-300 shadow shadow-fuchsia-400/60" />
          <p className="text-sm font-medium tracking-wide text-sky-200/90">October 2023 - April 2024</p>
          <p className="mt-1 text-base font-semibold md:text-lg">Data Scientist, ZEISS, Internship</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <span className="rounded-full border border-fuchsia-300/40 bg-fuchsia-500/20 px-2.5 py-1 text-[11px] font-semibold text-fuchsia-100">Modeling</span>
            <span className="rounded-full border border-violet-300/40 bg-violet-500/20 px-2.5 py-1 text-[11px] font-semibold text-violet-100">Optuna</span>
            <span className="rounded-full border border-sky-300/40 bg-sky-500/20 px-2.5 py-1 text-[11px] font-semibold text-sky-100">Fine-tuning</span>
            <span className="rounded-full border border-emerald-300/40 bg-emerald-500/20 px-2.5 py-1 text-[11px] font-semibold text-emerald-100">Production Deployment</span>
          </div>
          <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-7 text-zinc-100/90 md:text-[15px]">
          <li>
          Built a multi-degree polynomial regression model from scratch to interpolate the 3D printer dataset.
          </li>
          <li>
          Trained different AI model architectures using tool Optuna for fine-tuning
          </li>
          <li>
          Deployed the final model to production
          </li>
          </ul>

        </div>
        <div className="group relative rounded-2xl border border-white/20 bg-zinc-950/75 p-5 shadow-lg shadow-black/30 transition duration-300 hover:-translate-y-0.5 hover:border-fuchsia-300/50 hover:bg-zinc-900/90 hover:shadow-fuchsia-500/20 md:p-6">
          <span className="absolute -left-[34px] top-7 h-3 w-3 rounded-full border border-white/50 bg-violet-300 shadow shadow-violet-400/60" />
          <p className="text-sm font-medium tracking-wide text-sky-200/90">June 2023 - August 2023</p>
          <p className="mt-1 text-base font-semibold md:text-lg">Data Scientist, Max Planck, Work-Study</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <span className="rounded-full border border-sky-300/40 bg-sky-500/20 px-2.5 py-1 text-[11px] font-semibold text-sky-100">Data Pipeline</span>
            <span className="rounded-full border border-violet-300/40 bg-violet-500/20 px-2.5 py-1 text-[11px] font-semibold text-violet-100">CNN</span>
            <span className="rounded-full border border-fuchsia-300/40 bg-fuchsia-500/20 px-2.5 py-1 text-[11px] font-semibold text-fuchsia-100">Computer Vision</span>
          </div>
          <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-7 text-zinc-100/90 md:text-[15px]">
          <li>
          Built a data-analysis pipeline for spectral image dataset
          </li>
          <li>
          Trained a CNN to correctly identify the incorrect predictions by pipeline
          </li>

          </ul>

        </div>
  
        <div className="group relative rounded-2xl border border-white/20 bg-zinc-950/75 p-5 shadow-lg shadow-black/30 transition duration-300 hover:-translate-y-0.5 hover:border-fuchsia-300/50 hover:bg-zinc-900/90 hover:shadow-fuchsia-500/20 md:p-6">
          <span className="absolute -left-[34px] top-7 h-3 w-3 rounded-full border border-white/50 bg-sky-300 shadow shadow-sky-400/60" />
          <p className="text-sm font-medium tracking-wide text-sky-200/90">August 2022 - February 2023</p>
          <p className="mt-1 text-base font-semibold md:text-lg">Data Analyst, Infenion Technologies, Work-Study</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <span className="rounded-full border border-emerald-300/40 bg-emerald-500/20 px-2.5 py-1 text-[11px] font-semibold text-emerald-100">Pandas</span>
            <span className="rounded-full border border-sky-300/40 bg-sky-500/20 px-2.5 py-1 text-[11px] font-semibold text-sky-100">Excel</span>
            <span className="rounded-full border border-violet-300/40 bg-violet-500/20 px-2.5 py-1 text-[11px] font-semibold text-violet-100">Power BI</span>
            <span className="rounded-full border border-fuchsia-300/40 bg-fuchsia-500/20 px-2.5 py-1 text-[11px] font-semibold text-fuchsia-100">Reporting</span>
          </div>
          <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-7 text-zinc-100/90 md:text-[15px]">
          <li>
          Analyzed internal training data using Python (Pandas) and Excel
          </li>
          <li>
          Built interactive Power BI dashboards to enhance data monitoring and reporting
          </li>

          </ul>

        </div>
        
        <div className="group relative rounded-2xl border border-white/20 bg-zinc-950/75 p-5 shadow-lg shadow-black/30 transition duration-300 hover:-translate-y-0.5 hover:border-fuchsia-300/50 hover:bg-zinc-900/90 hover:shadow-fuchsia-500/20 md:p-6">
          <span className="absolute -left-[34px] top-7 h-3 w-3 rounded-full border border-white/50 bg-fuchsia-300 shadow shadow-fuchsia-400/60" />
          <p className="text-sm font-medium tracking-wide text-sky-200/90">March 2019 - September 2020</p>
          <p className="mt-1 text-base font-semibold md:text-lg">Data Analyst, HomeLane (Growing-Startup), Full-Time</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <span className="rounded-full border border-sky-300/40 bg-sky-500/20 px-2.5 py-1 text-[11px] font-semibold text-sky-100">SQL</span>
            <span className="rounded-full border border-violet-300/40 bg-violet-500/20 px-2.5 py-1 text-[11px] font-semibold text-violet-100">Python</span>
            <span className="rounded-full border border-fuchsia-300/40 bg-fuchsia-500/20 px-2.5 py-1 text-[11px] font-semibold text-fuchsia-100">Market Analytics</span>
            <span className="rounded-full border border-emerald-300/40 bg-emerald-500/20 px-2.5 py-1 text-[11px] font-semibold text-emerald-100">BI Dashboards</span>
          </div>
          <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-7 text-zinc-100/90 md:text-[15px]">
          <li>
          Market data and customer data analysis using SQL and Python
          </li>
          <li>
          Built Excel and BI dashboards for reporting and analysis
          </li>

          </ul>

        </div>
        <div className="group relative rounded-2xl border border-white/20 bg-zinc-950/75 p-5 shadow-lg shadow-black/30 transition duration-300 hover:-translate-y-0.5 hover:border-fuchsia-300/50 hover:bg-zinc-900/90 hover:shadow-fuchsia-500/20 md:p-6">
          <span className="absolute -left-[34px] top-7 h-3 w-3 rounded-full border border-white/50 bg-violet-300 shadow shadow-violet-400/60" />
          <p className="text-sm font-medium tracking-wide text-sky-200/90">October 2017 - February 2019</p>
          <p className="mt-1 text-base font-semibold md:text-lg">Young Engineer, L&W Construction, Full-Time</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <span className="rounded-full border border-amber-300/40 bg-amber-500/20 px-2.5 py-1 text-[11px] font-semibold text-amber-100">Execution Planning</span>
            <span className="rounded-full border border-sky-300/40 bg-sky-500/20 px-2.5 py-1 text-[11px] font-semibold text-sky-100">Project Coordination</span>
            <span className="rounded-full border border-violet-300/40 bg-violet-500/20 px-2.5 py-1 text-[11px] font-semibold text-violet-100">Tracking Automation</span>
          </div>
          <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-7 text-zinc-100/90 md:text-[15px]">
          <li>
          Planned, coordinated and executed Capgemini phase 3 Hinjewadi project
          </li>
          <li>
          Built Excel and Google Analytics interactive tracker to track the daily activities
          </li>

          </ul>

        </div>

        {/* Add more blocks here as you get more experiences */}
      </div>
    </div>

    {/* RIGHT: experience image */}
    <div className="flex justify-center">
      <div className="w-full max-w-xs space-y-3">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-r from-fuchsia-700/30 via-violet-700/30 to-sky-600/30 shadow-lg shadow-black/40 transition duration-300 hover:-translate-y-0.5 hover:border-fuchsia-300/40 hover:shadow-lg hover:shadow-fuchsia-500/20">
          <ZoomableImage
            src="/MunichRE.jpg"
            alt="Munich RE work experience image"
            width={900}
            height={600}
            className="h-32 w-full object-cover"
          />
        </div>
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-r from-fuchsia-700/30 via-violet-700/30 to-sky-600/30 shadow-lg shadow-black/40 transition duration-300 hover:-translate-y-0.5 hover:border-fuchsia-300/40 hover:shadow-lg hover:shadow-fuchsia-500/20">
          <div className="space-y-2 p-2">
            <ZoomableImage
              src="/BMW.jpeg"
              alt="BMW image 1"
              width={900}
              height={600}
              className="h-32 w-full rounded-xl object-cover"
            />
            <ZoomableImage
              src="/BMW_%21.jpeg"
              alt="BMW image 2"
              width={900}
              height={600}
              className="h-32 w-full rounded-xl object-cover"
            />
          </div>
        </div>
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-r from-fuchsia-700/30 via-violet-700/30 to-sky-600/30 shadow-lg shadow-black/40 transition duration-300 hover:-translate-y-0.5 hover:border-fuchsia-300/40 hover:shadow-lg hover:shadow-fuchsia-500/20">
          <ZoomableImage
            src="/ZEISS.jpeg"
            alt="ZEISS"
            width={900}
            height={600}
            className="h-32 w-full object-cover"
          />
        </div>
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-r from-fuchsia-700/30 via-violet-700/30 to-sky-600/30 shadow-lg shadow-black/40 transition duration-300 hover:-translate-y-0.5 hover:border-fuchsia-300/40 hover:shadow-lg hover:shadow-fuchsia-500/20">
          <ZoomableImage
            src="/Max_planck.png"
            alt="Max Planck work experience image"
            width={900}
            height={600}
            className="h-32 w-full object-cover"
          />
        </div>
      </div>
    </div>
  </div>
 </section>

        <section
          id="certificates"
          className="relative mt-14 overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-r from-fuchsia-900/40 via-violet-900/35 to-sky-900/35 p-6 shadow-xl shadow-black/50 transition duration-300 hover:-translate-y-0.5 hover:border-fuchsia-300/40 hover:shadow-xl hover:shadow-fuchsia-500/15"
        >
          <div className="pointer-events-none absolute inset-0 opacity-35">
            <div className="absolute -top-14 -left-10 h-40 w-40 rounded-full bg-fuchsia-500/30 blur-3xl" />
            <div className="absolute -bottom-12 right-0 h-44 w-44 rounded-full bg-sky-400/20 blur-3xl" />
          </div>
          <div className="relative">
            <h2 className="text-lg font-semibold">Certificates</h2>
            <p className="mt-2 text-sm text-zinc-100/90">
              Verified internship and work-study credentials. Open each certificate directly.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {certificates.map((c) => (
                <article
                  key={`${c.name}-${c.year}`}
                  className="rounded-3xl border border-white/20 bg-zinc-950/75 p-5 shadow-xl shadow-black/50 transition duration-300 hover:-translate-y-0.5 hover:border-fuchsia-300/50 hover:shadow-xl hover:shadow-fuchsia-500/20"
                >
                  <p className="text-sm font-semibold text-white">{c.name}</p>
                  <div className="mt-2 inline-flex rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[11px] font-semibold text-zinc-100">
                    {c.issuer}
                  </div>
                  <p className="mt-2 text-xs text-zinc-300/90">{c.year}</p>

                  {c.link ? (
                    <a
                      href={c.link}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex items-center justify-center rounded-full border border-sky-300/40 bg-sky-500/20 px-3 py-1.5 text-xs font-semibold text-sky-100 transition duration-300 hover:-translate-y-0.5 hover:bg-sky-500/30 hover:shadow-md hover:shadow-sky-500/25"
                    >
                      View certificate
                    </a>
                  ) : (
                    <p className="mt-4 text-[11px] text-zinc-400">Add certificate link</p>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="mt-14">
          <h2 className="text-lg font-semibold">Contact</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href="mailto:pavanln049@gmail.com"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-red-400/40 bg-red-500/20 px-4 py-2 text-sm font-semibold text-red-100 transition duration-300 hover:-translate-y-0.5 hover:border-red-300/60 hover:bg-red-500/30 hover:shadow-lg hover:shadow-red-500/25"
            >
              <span className="h-2 w-2 rounded-full bg-red-400" />
              Email
            </a>
            <a
              href="https://www.linkedin.com/in/kumar-pavan/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-sky-400/40 bg-sky-500/20 px-4 py-2 text-sm font-semibold text-sky-100 transition duration-300 hover:-translate-y-0.5 hover:border-sky-300/60 hover:bg-sky-500/30 hover:shadow-lg hover:shadow-sky-500/25"
            >
              <span className="h-2 w-2 rounded-full bg-sky-300" />
              LinkedIn
            </a>
            <a
              href="https://github.com/Pavan-AIML"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm font-semibold text-zinc-100 transition duration-300 hover:-translate-y-0.5 hover:border-zinc-500 hover:bg-black hover:shadow-lg hover:shadow-violet-500/20"
            >
              <span className="h-2 w-2 rounded-full bg-black ring-1 ring-zinc-500" />
              GitHub
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
