import { DocSection } from '../types';

export const DOCUMENTATION_SECTIONS: DocSection[] = [
  {
    id: 'introduction',
    title: 'Introduction to Bodh',
    group: 'Getting Started',
    summary:
      'Bodh is an educational AI platform designed to help learners build durable mental models rather than memorize surface-level answers.',
    lastUpdated: 'Frontend Preview Specification',
    hasHeroGraphic: true,
    blocks: [
      {
        headingId: 'what-is-bodh',
        heading: 'What is Bodh?',
        paragraphs: [
          'Bodh is an educational AI model and learning platform built around a single core principle: real intelligence in education is measured by what a student understands after the conversation ends, not by how quickly an answer is generated.',
          'Most general-purpose language interfaces optimize for immediate completion. When a learner asks a physics or chemistry question, a typical assistant prints the final equation and numeric answer. Bodh takes a fundamentally different approach—structuring dialogue around conceptual clarity, scientific accuracy, misconception detection, and step-by-step logical reasoning.',
        ],
        callout: {
          label: 'Frontend Preview Notice',
          text: 'This documentation describes the intended design, pedagogy, and architecture of the Bodh platform. The current web application runs entirely on the frontend with simulated responses and local session state while model engineering and backend systems are in development.',
        },
      },
      {
        headingId: 'our-philosophy-overview',
        heading: 'Our Philosophy',
        paragraphs: [
          'We believe true learning happens when you understand the why, not just the what. Every interface element in Bodh—from the structured conversation workspace to concept checkpoints—is designed to reduce cognitive friction while keeping the learner actively reasoning.',
        ],
        bulletPoints: [
          'Prioritize first-principles explanations over shortcut formulas.',
          'Surface hidden assumptions and common scientific misconceptions early.',
          'Adapt depth, examples, and vocabulary to the learner’s current level.',
          'Maintain strict transparency about uncertainty and system boundaries.',
        ],
      },
    ],
  },
  {
    id: 'model-philosophy',
    title: 'Model Philosophy',
    group: 'Getting Started',
    summary:
      'Why Bodh treats explanation quality, pedagogical pacing, and epistemic honesty as primary design goals.',
    lastUpdated: 'Frontend Preview Specification',
    blocks: [
      {
        headingId: 'beyond-answer-engines',
        heading: 'Beyond Answer Engines',
        paragraphs: [
          'An answer engine closes curiosity; a conceptual tutor opens it. When learners repeatedly copy solutions without wrestling with the underlying relationships, they develop an illusion of competence that breaks down as soon as a problem is framed differently.',
          'Bodh is conceived to counter that pattern. Instead of collapsing a multi-step problem into a single paragraph, Bodh isolates the governing principle, connects it to what the student already knows, and verifies comprehension before moving forward.',
        ],
      },
      {
        headingId: 'guiding-principles',
        heading: 'Four Guiding Principles',
        paragraphs: [
          'Every design choice across the Bodh platform aligns with four foundational commitments:',
        ],
        bulletPoints: [
          'Conceptual First: Establish physical, mathematical, or logical intuition before introducing symbolic manipulation.',
          'Socratic Without Friction: Ask targeted guiding questions when helpful, without turning straightforward lookups into frustrating riddles.',
          'Scientific Rigor: Respect dimensional consistency, conservation laws, formal definitions, and experimental evidence.',
          'Epistemic Humility: Clearly distinguish established principles, approximations, and open questions.',
        ],
      },
    ],
  },
  {
    id: 'core-capabilities',
    title: 'Core Capabilities',
    group: 'Getting Started',
    summary:
      'An overview of the reasoning, explanation, and adaptive dialogue capabilities planned for the Bodh system.',
    lastUpdated: 'Frontend Preview Specification',
    blocks: [
      {
        headingId: 'capability-pillars',
        heading: 'Capability Pillars',
        paragraphs: [
          'Bodh organizes its educational functionality into five tightly coordinated capabilities that work together during every learning session.',
        ],
        bulletPoints: [
          'Conceptual Decomposition: Breaks complex topics into prerequisite building blocks and clear mental models.',
          'Misconception Detection: Recognizes classic student misunderstandings (such as confusing velocity with acceleration or heat with temperature) and addresses them directly.',
          'Adaptive Teaching: Adjusts explanation depth, analogies, and mathematical formalism based on learner cues.',
          'Structured Problem Reasoning: Walks through setup, assumptions, symbolic derivation, and sanity checks.',
          'Scientific Accuracy Checking: Cross-verifies units, boundary conditions, and terminology consistency.',
        ],
      },
      {
        headingId: 'interaction-contract',
        heading: 'Planned Interaction Schema',
        paragraphs: [
          'To ensure the frontend stays cleanly decoupled from future model services, Bodh defines a typed message contract separating user prompts, pedagogical metadata, and response content.',
        ],
        codeExample: {
          title: 'Conceptual Response Payload (Frontend Interface)',
          language: 'typescript',
          code: `interface BodhEducationalResponse {
  id: string;
  conceptFocus: string;
  explanation: string;
  misconceptionCheck?: string;
  followUpSuggestions: string[];
  mode: 'simulated-preview' | 'live-model';
}`,
        },
      },
    ],
  },
  {
    id: 'conceptual-understanding',
    title: 'Conceptual Understanding',
    group: 'Core Pedagogy',
    summary:
      'How Bodh structures explanations around mental models, cause-and-effect chains, and transferable principles.',
    lastUpdated: 'Frontend Preview Specification',
    blocks: [
      {
        headingId: 'mental-models',
        heading: 'Building Durable Mental Models',
        paragraphs: [
          'Memorizing F = ma lets a student plug two numbers into a calculator, but understanding Newton’s Second Law means recognizing that net force determines the rate of change of motion—not motion itself.',
          'Bodh frames explanations around three layers: (1) an intuitive real-world anchor, (2) the formal scientific principle with precise definitions, and (3) boundary cases that test whether the concept truly holds.',
        ],
      },
      {
        headingId: 'transfer-testing',
        heading: 'Checking for Transfer',
        paragraphs: [
          'True conceptual mastery shows up when a learner can apply an idea in an unfamiliar setting. Bodh encourages transfer by posing quick "what-if" variations—such as asking what changes in an electric circuit if a parallel branch opens, or how photosynthesis responds when carbon dioxide becomes limiting.',
        ],
      },
    ],
  },
  {
    id: 'adaptive-teaching',
    title: 'Adaptive Teaching',
    group: 'Core Pedagogy',
    summary:
      'Tailoring pacing, analogies, and mathematical rigor to meet each learner where they currently are.',
    lastUpdated: 'Frontend Preview Specification',
    blocks: [
      {
        headingId: 'dynamic-scaffolding',
        heading: 'Dynamic Scaffolding',
        paragraphs: [
          'A middle-school student exploring chemical bonding needs a very different explanation than an undergraduate studying molecular orbital theory. Fixed-level textbooks force every reader down the same path.',
          'Bodh is designed to calibrate explanation granularity dynamically—starting with clear conceptual language and expanding into equations, derivations, or proofs when the learner asks to go deeper.',
        ],
      },
      {
        headingId: 'adaptation-signals',
        heading: 'Signals That Guide Adaptation',
        paragraphs: [
          'Future adaptive routing in Bodh will analyze conversational signals within a session:',
        ],
        bulletPoints: [
          'Terminology and mathematical notation used in the learner’s question.',
          'Requests for simpler analogies versus formal derivations.',
          'Specific steps where the learner pauses or expresses confusion.',
          'Follow-up choices selected after an explanation.',
        ],
      },
    ],
  },
  {
    id: 'misconception-detection',
    title: 'Misconception Detection',
    group: 'Core Pedagogy',
    summary:
      'Identifying deeply rooted intuitive errors and resolving them with constructive counterexamples.',
    lastUpdated: 'Frontend Preview Specification',
    blocks: [
      {
        headingId: 'why-misconceptions-persist',
        heading: 'Why Misconceptions Persist',
        paragraphs: [
          'In physics, chemistry, and biology, everyday intuition frequently conflicts with scientific reality. Students often believe heavier objects naturally fall faster in a vacuum, or that plants gain most of their dry mass from soil rather than atmospheric carbon dioxide.',
          'Simply repeating the textbook definition rarely dislodges these beliefs. Effective instruction first names the intuitive model respectfully, shows precisely where it breaks down, and then constructs the accurate explanation.',
        ],
      },
      {
        headingId: 'detection-workflow',
        heading: 'Three-Step Resolution Pattern',
        paragraphs: [
          'When Bodh encounters a flawed assumption in a student’s reasoning, responses are structured in three calm, non-judgmental steps:',
        ],
        bulletPoints: [
          'Acknowledge the intuition: Explain why the misconception feels reasonable from everyday experience.',
          'Introduce a clear counterexample: Highlight a concrete case where the naive rule fails.',
          'Rebuild the accurate model: Re-derive the correct principle and verify it against the same scenario.',
        ],
      },
    ],
  },
  {
    id: 'scientific-accuracy',
    title: 'Scientific Accuracy',
    group: 'Core Pedagogy',
    summary:
      'Standards for terminology precision, dimensional analysis, and transparent handling of scientific approximations.',
    lastUpdated: 'Frontend Preview Specification',
    blocks: [
      {
        headingId: 'precision-standards',
        heading: 'Precision Without Unnecessary Jargon',
        paragraphs: [
          'Simplifying an explanation for a beginner should never mean teaching something false that must be unlearned later. Bodh aims for progressive truthfulness—statements that are accessible today and remain valid as the learner advances.',
        ],
        bulletPoints: [
          'Explicitly state idealizing assumptions (frictionless surfaces, ideal gases, point masses).',
          'Preserve SI units and dimensional checks throughout quantitative derivations.',
          'Distinguish clearly between models, laws, hypotheses, and empirical observations.',
        ],
      },
      {
        headingId: 'handling-uncertainty',
        heading: 'Handling Uncertainty Honestly',
        paragraphs: [
          'When a question falls outside verified scientific consensus or requires empirical data not provided in the prompt, Bodh is designed to state what is missing rather than fabricating plausible-sounding numbers.',
        ],
      },
    ],
  },
  {
    id: 'model-architecture',
    title: 'Model Architecture',
    group: 'Technical Overview',
    summary:
      'High-level architectural vision for separating the frontend experience from future reasoning and pedagogical modules.',
    lastUpdated: 'Specification in Progress',
    blocks: [
      {
        headingId: 'layered-system-design',
        heading: 'Layered Platform Architecture',
        paragraphs: [
          'Detailed model weights, parameter counts, and inference specifications have not yet been finalized or published. Rather than inventing unverified technical numbers, this document outlines the clean modular boundary currently established for the platform.',
        ],
        bulletPoints: [
          'Presentation Layer (Current Scope): Responsive React + Vite frontend with modular views for documentation, authentication screens, and interactive chat simulation.',
          'Service Abstraction Layer: Isolated client service interface (`mockAIService`) that mirrors future request/response contracts so backend APIs can be connected without rewriting UI components.',
          'Planned Pedagogical Orchestration Layer: Future backend pipeline responsible for intent analysis, misconception taxonomy lookup, and structured response synthesis.',
        ],
      },
      {
        headingId: 'service-boundary-example',
        heading: 'Decoupled Service Boundary',
        paragraphs: [
          'UI components communicate exclusively through a lightweight service adapter. Swapping from local simulated responses to a verified backend endpoint requires updating only the service implementation.',
        ],
        codeExample: {
          title: 'Service Adapter Interface',
          language: 'typescript',
          code: `export interface ChatServiceAdapter {
  sendMessage(input: {
    conversationId: string;
    prompt: string;
    history: Array<{ role: 'user' | 'assistant'; content: string }>;
  }): Promise<{
    content: string;
    conceptFocus: string;
    followUpSuggestions: string[];
    isSimulated: boolean;
  }>;
}`,
        },
      },
    ],
  },
  {
    id: 'training-methodology',
    title: 'Training Methodology',
    group: 'Technical Overview',
    summary:
      'Planned pedagogical curation and alignment principles guiding future Bodh model development.',
    lastUpdated: 'Specification in Progress',
    blocks: [
      {
        headingId: 'pedagogical-alignment',
        heading: 'Pedagogical Alignment Objectives',
        paragraphs: [
          'Training methodologies for Bodh are currently in the research and planning phase. No training runs or benchmark numbers are claimed at this stage.',
          'The planned methodology centers on aligning model behavior not merely toward factual recall, but toward instructional effectiveness: recognizing prerequisite gaps, sequencing explanations logically, and avoiding premature answer dumping.',
        ],
      },
      {
        headingId: 'planned-stages',
        heading: 'Conceptual Development Stages',
        paragraphs: [
          'Future model work is planned across distinct quality stages:',
        ],
        bulletPoints: [
          'Domain Curated Foundations: Reviewing open educational curricula and verified scientific literature.',
          'Dialogue Structuring: Crafting multi-turn tutoring exemplars that demonstrate clear scaffolding and misconception correction.',
          'Educator Review Loops: Involving subject-matter reviewers to audit clarity, scientific fidelity, and tone.',
        ],
      },
    ],
  },
  {
    id: 'dataset-and-evaluation',
    title: 'Dataset and Evaluation',
    group: 'Technical Overview',
    summary:
      'How Bodh plans to evaluate conceptual clarity, misconception handling, and scientific accuracy once model training begins.',
    lastUpdated: 'Specification in Progress',
    blocks: [
      {
        headingId: 'evaluation-dimensions',
        heading: 'Qualitative & Structural Evaluation Criteria',
        paragraphs: [
          'Because Bodh has not yet published a trained model or benchmark suite, no quantitative accuracy percentages or test scores are reported here. Instead, evaluation is being designed around four observable educational dimensions:',
        ],
        bulletPoints: [
          'Factual & Dimensional Soundness: Are definitions, units, equations, and causal mechanisms scientifically accurate?',
          'Misconception Sensitivity: Does the response detect and gently repair flawed assumptions in the learner’s prompt?',
          'Scaffolded Progression: Are steps ordered from foundational intuition to formal synthesis?',
          'Honesty Under Ambiguity: Does the model ask for missing boundary conditions rather than guessing?',
        ],
      },
      {
        headingId: 'human-centered-review',
        heading: 'Human-Centered Rubric Design',
        paragraphs: [
          'Automated answer-key matching cannot measure whether a student actually understood an explanation. Planned evaluation workflows emphasize rubric-guided review across multi-turn learning dialogues.',
        ],
      },
    ],
  },
  {
    id: 'supported-subjects',
    title: 'Supported Subjects',
    group: 'Reference',
    summary:
      'Core STEM and analytical domains prioritized in Bodh’s conceptual learning curriculum.',
    lastUpdated: 'Frontend Preview Specification',
    blocks: [
      {
        headingId: 'primary-domains',
        heading: 'Initial Subject Coverage',
        paragraphs: [
          'Bodh focuses first on subjects where deep conceptual models and misconception repair yield the greatest learning impact:',
        ],
        bulletPoints: [
          'Physics: Classical mechanics, Newton’s laws, energy and momentum, thermodynamics, electromagnetism, and foundational quantum concepts.',
          'Chemistry: Atomic structure, chemical bonding, stoichiometry, thermodynamics, reaction kinetics, and equilibrium.',
          'Mathematics: Algebra, functions, geometry, trigonometry, calculus intuition (limits, derivatives, integrals), and probability.',
          'Biology: Cellular respiration, photosynthesis, genetics, molecular biology, and physiological systems.',
          'Computer Science Foundations: Algorithms, data structures, recursion, complexity reasoning, and formal logic.',
        ],
      },
      {
        headingId: 'preview-samples',
        heading: 'Available in Frontend Preview',
        paragraphs: [
          'In this frontend-only preview, the Chat interface includes curated simulated educational conversations across Quantum Mechanics, Newton’s Laws, Chemical Bonding, Mathematics, Thermodynamics, and Photosynthesis.',
        ],
      },
    ],
  },
  {
    id: 'limitations',
    title: 'Limitations',
    group: 'Reference',
    summary:
      'Important transparency notes regarding current frontend simulation boundaries and general AI education limits.',
    lastUpdated: 'Frontend Preview Specification',
    blocks: [
      {
        headingId: 'current-preview-limits',
        heading: 'Current Preview Boundaries',
        paragraphs: [
          'This build is strictly a frontend interface demonstration. Keep the following boundaries in mind while exploring:',
        ],
        bulletPoints: [
          'No Live AI Inference: Responses in the Chat workspace are predefined simulated educational samples, not outputs from a live neural network.',
          'Local Session Storage Only: Conversations, theme selection, and profile preferences stay in your browser session and are not synced to a cloud database.',
          'Visual Authentication Screens: Login and Sign Up screens demonstrate client-side validation and user flow without performing real account authentication.',
        ],
      },
      {
        headingId: 'educational-ai-limits',
        heading: 'General Limits of Educational AI',
        paragraphs: [
          'Even once connected to a full model, AI tutoring should complement—not replace—teachers, peer discussion, laboratory experiments, and authoritative peer-reviewed textbooks. Learners should always verify critical calculations and scientific references.',
        ],
      },
    ],
  },
  {
    id: 'faq',
    title: 'FAQ',
    group: 'Reference',
    summary: 'Answers to common questions about the Bodh platform, design philosophy, and current preview state.',
    lastUpdated: 'Frontend Preview Specification',
    blocks: [
      {
        headingId: 'faq-live-model',
        heading: 'Is the Bodh AI model live in this application?',
        paragraphs: [
          'No. The current release is a complete frontend prototype. All chat interactions are powered by a local mock service using clearly labelled simulated educational responses so you can explore the product workflow and design system.',
        ],
      },
      {
        headingId: 'faq-difference',
        heading: 'How is Bodh different from a standard chatbot?',
        paragraphs: [
          'Standard chat tools focus on fast answer completion. Bodh is designed around educational structure—highlighting the core concept, addressing likely misconceptions, breaking derivations into clear logical steps, and proposing follow-up questions that verify real comprehension.',
        ],
      },
      {
        headingId: 'faq-data-privacy',
        heading: 'Where is my chat history or login information stored?',
        paragraphs: [
          'Nothing is sent to any external server or database. Chat threads live in local session state, and optional UI preferences (such as dark/light theme) are saved only in your browser’s local storage.',
        ],
      },
      {
        headingId: 'faq-future-integration',
        heading: 'Can a real AI backend be connected later?',
        paragraphs: [
          'Yes. The frontend architecture isolates all simulated AI behavior inside a dedicated service layer (`src/services/mockAIService.ts`), enabling future backend API integration without redesigning the interface.',
        ],
      },
    ],
  },
  {
    id: 'changelog',
    title: 'Changelog',
    group: 'Reference',
    summary: 'Development log tracking frontend platform architecture and interface milestones.',
    lastUpdated: 'Frontend Preview Specification',
    blocks: [
      {
        headingId: 'milestone-frontend-foundation',
        heading: 'Frontend Platform Foundation',
        paragraphs: [
          'Initial complete frontend implementation of the Bodh web application following the approved brand identity and UI design system.',
        ],
        bulletPoints: [
          'Established Bodh design system using Plus Jakarta Sans, deep dark midnight canvas (#080B1A), elevated slate surfaces (#1E293B), and primary indigo/cyan/purple accents.',
          'Built full 10-section public homepage with interactive scroll-triggered motion and custom neural knowledge visual.',
          'Implemented 14-section Documentation portal with live frontend search, collapsible navigation, table of contents, and copyable code snippets.',
          'Created Developers page (with editable local profile section), editorial About page, and visual-only Login / Sign Up screens with client-side validation.',
          'Built responsive Chat workspace with local multi-conversation management, rename/delete controls, clearly labelled simulated responses, and Settings panel with Dark/Light/System theme support.',
        ],
      },
    ],
  },
];

export const DOC_GROUPS: Array<DocSection['group']> = [
  'Getting Started',
  'Core Pedagogy',
  'Technical Overview',
  'Reference',
];
