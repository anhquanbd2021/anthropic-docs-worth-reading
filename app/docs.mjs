// The widely-shared list is billed as 17 documents. The article names 13 of
// them explicitly (3 + 4 + 3 + 3) and never fabricates the remaining four.
export const LIST_SIZE = 17;

export const CLUSTERS = [
  {
    id: 'prompts',
    number: '01',
    title: 'Prompts you keep rewriting blindly',
    tagline: 'Prompt worked for weeks, then quietly degraded after a model upgrade.',
    failure: 'Guess-rotate-retry: the fix is edit-by-superstition.',
    advice: 'Read the prompting guides before the next rewrite.',
    docs: [
      { id: 'best-practices', name: 'Prompting best practices', note: 'Baseline doc. Explicit instructions, structured output, XML tags, chain-of-thought.' },
      { id: 'per-model', name: 'Per-model prompting guides', note: 'Opus, Sonnet, Fable respond differently to verbosity and structure.' },
      { id: 'metaprompt', name: 'The Metaprompt', note: 'A prompt that writes prompts, for the afternoon you would have spent hand-tuning.' },
    ],
  },
  {
    id: 'agent',
    number: '02',
    title: 'Agent you will over-build',
    tagline: 'Team builds a multi-agent framework for one loop and a tool.',
    failure: 'Drawing a second box before the first agent is given better tools.',
    advice: 'Simplest composition first; reach for multi-agent only when it demonstrably fails.',
    docs: [
      { id: 'building-agents', name: 'Building Effective Agents', note: 'Start with a prompt chain, a router, a single loop.' },
      { id: 'cc-best', name: 'Claude Code best practices', note: 'How the harness uses context; scope tasks; when CLAUDE.md pays for itself.' },
      { id: 'agent-sdk', name: 'Claude Agent SDK', note: 'Loop-as-a-library: subagents, hooks, MCP wiring, permission modes.' },
      { id: 'mcp', name: 'MCP documentation', note: 'One protocol instead of a bespoke integration per tool.' },
    ],
  },
  {
    id: 'context',
    number: '03',
    title: 'Context window you blame',
    tagline: 'Outputs get vaguer as sessions get longer.',
    failure: 'Debugging by context size instead of context content.',
    advice: 'Decide what goes into the window, not how big it is.',
    docs: [
      { id: 'context-eng', name: 'Context engineering', note: 'Why pasting more in degrades reasoning; structure what the model sees.' },
      { id: 'cookbooks', name: 'Claude Cookbooks & Quickstarts', note: 'Runnable RAG, tool use, extraction, agents — before you reinvent the pattern badly.' },
      { id: 'skills-repo', name: 'Agent Skills repo', note: 'Open-source reusable instruction packs and which ones exist.' },
    ],
  },
  {
    id: 'course',
    number: '04',
    title: 'Course you will buy instead',
    tagline: 'Paying for a summary of docs you can read free.',
    failure: 'Registering for the paid course before opening the free in-repo tutorial.',
    advice: 'Docs and course are the same material at different prices.',
    docs: [
      { id: 'prompt-tutorial', name: 'Interactive Prompt Engineering Tutorial', note: 'Hands-on, in-repo, free.' },
      { id: 'courses', name: 'Anthropic Courses', note: 'Structured curriculum: API, tool use, RAG, evals.' },
      { id: 'academy', name: 'Anthropic Academy', note: 'The formal training / certification path.' },
    ],
  },
];

export const SYMPTOMS = [
  {
    id: 'model-upgrade',
    label: 'My prompt broke after a model upgrade',
    cluster: 'prompts',
  },
  {
    id: 'second-agent',
    label: "I'm about to build a second agent",
    cluster: 'agent',
  },
  {
    id: 'vaguer',
    label: 'Outputs get vaguer as sessions get longer',
    cluster: 'context',
  },
  {
    id: 'buy-course',
    label: 'I was about to buy a course',
    cluster: 'course',
  },
];

const WRONG_PATHS = {
  prompts: { label: 'Add "please" and more capitals', doc: 'Prompting best practices' },
  agent: { label: 'Add another agent box', doc: 'Building Effective Agents' },
  context: { label: 'Enlarge the context window', doc: 'Context engineering' },
  course: { label: 'Buy the paid course', doc: 'Interactive Prompt Engineering Tutorial' },
};

export function diagnose(symptomId) {
  const symptom = SYMPTOMS.find((s) => s.id === symptomId);
  if (!symptom) return null;
  const cluster = CLUSTERS.find((c) => c.id === symptom.cluster);
  return {
    symptom,
    cluster,
    wrongPath: WRONG_PATHS[symptom.cluster],
  };
}