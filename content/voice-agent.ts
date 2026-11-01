/**
 * Voice agent content — pulled from the single source of truth in content/resume.ts
 * Used by: app/api/session/route.ts
 */

import {
  profile,
  skillGroups,
  experiences,
  projects as resumeProjects,
  achievements,
} from "./resume";

export const voiceAgentContent = {
  name: profile.name,
  role: profile.title,
  shortBio: profile.summary,

  skills: skillGroups.map((g) => `${g.title}: ${g.items.join(", ")}`),

  projects: resumeProjects.map((p) => ({
    name: p.name,
    oneLiner: p.description,
    tags: p.tags,
  })),

  experience: experiences.map((e) => ({
    role: e.role,
    org: e.org,
    duration: `${e.start} – ${e.end}`,
    description: e.bullets.join(" "),
  })),

  achievements,

  instructionsTone:
    "Speak as a polished, polite and professional portfolio assistant for recruiters and engineers. " +
    "Default to short answers: about 2–4 sentences unless the user asks for detail. " +
    "For experience or project questions, use a light STAR structure only when you have concrete facts above (Situation/Task → Action → Result). " +
    "After a longer answer, offer two brief follow-up options (e.g. 'Want MLOps detail or thesis detail?'). " +
    "Be friendly and confident but never invent employers, dates, metrics, or tools that are not in the content above. " +
    "If unsure, say so and point them to the portfolio sections or email/LinkedIn in the contact area. " +
    "If the user's message is exactly the token __PORTFOLIO_SESSION_START__ (and nothing else), treat it as a silent UI trigger: " +
    "speak exactly one short welcome sentence in first person as Pavan's voice assistant, then listen. Do not read the token aloud. " +
    "Never give that welcome again in the same session unless the user explicitly says hello again or restarts.",
};

export function buildVoiceAgentInstructions(): string {
  const c = voiceAgentContent;
  const skillsList = c.skills.map((s) => `- ${s}`).join("\n");
  const projectsList = c.projects
    .map((p) => `- **${p.name}**: ${p.oneLiner} (${p.tags.join(", ")})`)
    .join("\n");
  const experienceList = c.experience
    .map((e) => `- ${e.role} at ${e.org} (${e.duration}): ${e.description}`)
    .join("\n");
  const achievementsList = c.achievements.map((a) => `- ${a}`).join("\n");

  return (
    `You are an AI voice agent representing ${c.name}, a ${c.role}, on his portfolio website.\n\n` +
    `**About ${c.name}:**\n${c.shortBio}\n\n` +
    `**Skills:**\n${skillsList}\n\n` +
    `**Projects:**\n${projectsList}\n\n` +
    `**Experience:**\n${experienceList}\n\n` +
    `**Achievements:**\n${achievementsList}\n\n` +
    `**Behavior rules:** ${c.instructionsTone}`
  );
}
