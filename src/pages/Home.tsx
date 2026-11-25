import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  Brain,
  Compass,
  ShieldCheck,
  BookOpen,
  Code2,
  GitBranch,
  Layers,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { Navbar } from '../components/navigation/Navbar';
import { Footer } from '../components/navigation/Footer';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { BodhLogo } from '../components/common/BodhLogo';
import { NeuralHeroVisual } from '../components/homepage/NeuralHeroVisual';
import { MotionReveal } from '../components/homepage/MotionReveal';
import { DocsBookGraphic } from '../components/documentation/DocsBookGraphic';

const WORKFLOW_STEPS = [
  {
    step: '01',
    title: 'Diagnose Current Mental Model',
    summary:
      'Bodh reads your question to identify not just the topic, but what assumptions and prior knowledge you bring to it.',
    examplePrompt: '“Why does a moving puck need a constant force to keep sliding?”',
    exampleOutput:
      'Detects a classic Newtonian inertia misconception rooted in everyday friction experience.',
  },
  {
    step: '02',
    title: 'Address Misconceptions Calmly',
    summary:
      'Rather than simply saying "incorrect," Bodh explains why the everyday intuition feels true and pinpoints where it breaks down.',
    examplePrompt: 'Counterexample introduced',
    exampleOutput:
      'Compares sliding a puck across rough wood versus near-frictionless ice to separate friction from motion.',
  },
  {
    step: '03',
    title: 'Construct First-Principles Reasoning',
    summary:
      'Connects physical intuition to the formal mathematical relationship so every symbol has clear meaning.',
    examplePrompt: 'Core relationship established',
    exampleOutput:
      'F_net = m · a shows that unbalanced force changes velocity; zero net force preserves constant velocity.',
  },
  {
    step: '04',
    title: 'Verify Transfer With a Check',
    summary:
      'Offers a concise "what-if" follow-up so you can test the new mental model in a fresh scenario.',
    examplePrompt: 'Transfer question',
    exampleOutput:
      '“What happens to a spacecraft’s speed in deep space after its thrusters shut off?”',
  },
];

const CAPABILITIES = [
  {
    index: '01',
    title: 'Conceptual Understanding',
    description:
      'Breaks topics into governing principles, cause-and-effect chains, and limiting cases instead of handing over memorized shortcut steps.',
    span: 'lg:col-span-7',
    highlight: 'First-principles derivations · Intuitive mental models · Transfer checks',
  },
  {
    index: '02',
    title: 'Misconception Detection',
    description:
      'Surfaces subtle scientific misunderstandings—like confusing heat with temperature or velocity with acceleration—before they solidify.',
    span: 'lg:col-span-5',
    highlight: 'Diagnostic reasoning · Clear counterexamples',
  },
  {
    index: '03',
    title: 'Adaptive Teaching',
    description:
      'Calibrates explanation depth, vocabulary, and mathematical rigor to match whether you are discovering a concept for the first time or reviewing derivations.',
    span: 'lg:col-span-5',
    highlight: 'Progressive scaffolding · Learner-paced depth',
  },
  {
    index: '04',
    title: 'Scientific Accuracy & Logical Reasoning',
    description:
      'Enforces dimensional consistency, explicit idealizing assumptions, and formal scientific definitions across physics, chemistry, mathematics, and biology.',
    span: 'lg:col-span-7',
    highlight: 'Unit verification · Explicit boundary conditions · Transparent limits',
  },
];

export default function Home() {
  const navigate = useNavigate();
  const prefersReduced = useReducedMotion();
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const activeStep = WORKFLOW_STEPS[activeStepIndex];

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-[#080B1A] text-slate-900 dark:text-[#F8FAFC]">
      <Navbar />

      <main className="flex-1">
        {/* SECTION 1: HERO SECTION */}
        <section className="relative overflow-hidden border-b border-slate-200 dark:border-slate-800/80">
          {/* Subtle grid + ambient glow backdrop */}
          <div className="absolute inset-0 bodh-grid-backdrop opacity-70 dark:opacity-100 pointer-events-none" />
          <div className="absolute -top-32 right-0 w-[560px] h-[560px] rounded-full bg-[#6366F1]/10 dark:bg-[#6366F1]/14 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[420px] h-[420px] rounded-full bg-[#22D3EE]/8 dark:bg-[#22D3EE]/10 blur-3xl pointer-events-none" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-12 lg:pt-20 lg:pb-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
              {/* Left Copy Column */}
              <motion.div
                initial={prefersReduced ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-7 space-y-6"
              >
                <div className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-wide text-[#6366F1] dark:text-[#22D3EE]">
                  <BodhLogo size="sm" showWordmark={false} />
                  <span>Introducing Bodh · Educational AI Platform</span>
                </div>

                <h1 className="text-[clamp(2.35rem,4.5vw,3.95rem)] font-extrabold tracking-tight leading-[1.08] text-balance text-slate-900 dark:text-[#F8FAFC]">
                  Intelligence built around{' '}
                  <span className="bodh-gradient-text">understanding.</span>
                </h1>

                <p className="text-base sm:text-lg leading-relaxed text-slate-600 dark:text-[#94A3B8] max-w-xl">
                  An educational AI designed to help you learn, reason and explore concepts deeply.
                </p>

                <div className="flex flex-wrap items-center gap-3.5 pt-2">
                  <Button
                    size="lg"
                    onClick={() => navigate('/chat')}
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    Get Started
                  </Button>
                  <Button variant="secondary" size="lg" onClick={() => navigate('/docs')}>
                    Read Documentation
                  </Button>
                </div>
              </motion.div>

              {/* Right Abstract Neural / Knowledge Visual */}
              <motion.div
                initial={prefersReduced ? false : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-5"
              >
                <NeuralHeroVisual />
              </motion.div>
            </div>

            {/* Feature Indicators Strip matching approved Bodh reference */}
            <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#6366F1]/10 dark:bg-[#131C3A] border border-[#6366F1]/25 flex items-center justify-center text-[#6366F1] dark:text-[#22D3EE] shrink-0">
                  <Brain className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-[#F8FAFC]">
                    Concept-Focused AI
                  </p>
                  <p className="text-xs text-slate-500 dark:text-[#94A3B8]">
                    Explains underlying principles, not bare shortcuts
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#6366F1]/10 dark:bg-[#131C3A] border border-[#6366F1]/25 flex items-center justify-center text-[#6366F1] dark:text-[#818CF8] shrink-0">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-[#F8FAFC]">
                    Adaptive Learning
                  </p>
                  <p className="text-xs text-slate-500 dark:text-[#94A3B8]">
                    Scaffolds pacing and rigor to your level
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#A855F7]/10 dark:bg-[#1A163A] border border-[#A855F7]/25 flex items-center justify-center text-[#A855F7] shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-[#F8FAFC]">
                    Scientifically Accurate
                  </p>
                  <p className="text-xs text-slate-500 dark:text-[#94A3B8]">
                    Grounded in precise definitions and unit checks
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: ABOUT BODH */}
        <section id="about-bodh" className="py-20 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <MotionReveal>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
                <div className="lg:col-span-7 space-y-5">
                  <p className="text-xs font-semibold tracking-wide text-[#6366F1] dark:text-[#22D3EE]">
                    About Bodh
                  </p>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-balance text-slate-900 dark:text-[#F8FAFC]">
                    Designed for learners who want to know why an answer is true.
                  </h2>
                  <p className="text-base leading-relaxed text-slate-600 dark:text-[#94A3B8]">
                    Bodh is an educational AI platform built around the science of learning. Instead
                    of treating education as fast text generation, Bodh organizes every interaction
                    around clear mental models, misconception detection, and structured reasoning.
                  </p>
                  <p className="text-base leading-relaxed text-slate-600 dark:text-[#94A3B8]">
                    Whether you are unpacking Newton&apos;s Laws, interpreting chemical bonding, or
                    building geometric intuition for calculus, Bodh keeps you actively engaged in
                    the reasoning chain rather than passively copying a final result.
                  </p>
                  <div className="pt-2">
                    <Link
                      to="/about"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#6366F1] dark:text-[#22D3EE] hover:underline"
                    >
                      <span>Explore Bodh&apos;s vision</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                {/* Editorial Quote Card from approved Bodh reference sheet */}
                <div className="lg:col-span-5">
                  <Card padding="lg" className="relative overflow-hidden">
                    <div className="absolute -right-12 -top-12 w-36 h-36 rounded-full bg-[#6366F1]/10 blur-2xl pointer-events-none" />
                    <span
                      className="block text-4xl font-serif leading-none text-[#6366F1] dark:text-[#818CF8] mb-4"
                      aria-hidden="true"
                    >
                      &ldquo;
                    </span>
                    <blockquote className="text-xl sm:text-2xl font-semibold tracking-tight leading-snug text-slate-900 dark:text-[#F8FAFC]">
                      Knowledge is the first step to intelligence. Understanding is what makes it
                      last.
                    </blockquote>
                    <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-[#94A3B8]">
                      <span>Bodh Educational Philosophy</span>
                      <BodhLogo size="sm" showWordmark={false} />
                    </div>
                  </Card>
                </div>
              </div>
            </MotionReveal>
          </div>
        </section>

        {/* SECTION 3: MODEL PHILOSOPHY */}
        <section className="py-20 lg:py-24 border-t border-slate-200 dark:border-slate-800/80 bg-white/60 dark:bg-[#0B1024]/55">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <MotionReveal>
              <div className="max-w-2xl space-y-4">
                <p className="text-xs font-semibold tracking-wide text-[#6366F1] dark:text-[#22D3EE]">
                  Model Philosophy
                </p>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-balance text-slate-900 dark:text-[#F8FAFC]">
                  Don&apos;t just get answers. Gain understanding.
                </h2>
                <p className="text-base leading-relaxed text-slate-600 dark:text-[#94A3B8]">
                  General-purpose assistants optimize for rapid completion. Bodh optimizes for
                  comprehension—making the shift from shortcut output to durable scientific mastery.
                </p>
              </div>

              <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card padding="lg">
                  <p className="text-xs font-semibold text-slate-500 dark:text-[#94A3B8] mb-3">
                    Conventional Answer Generators
                  </p>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-[#F8FAFC] mb-5">
                    Optimized for immediate completion
                  </h3>
                  <ul className="space-y-3.5 text-sm text-slate-600 dark:text-[#94A3B8]">
                    <li className="flex items-start gap-3">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
                      <span>Outputs final numerical answers without checking learner assumptions.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
                      <span>Leaves underlying scientific misconceptions unexamined.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
                      <span>Uses the same dense explanation regardless of student readiness.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
                      <span>Encourages copying rather than transferable reasoning.</span>
                    </li>
                  </ul>
                </Card>

                <Card
                  padding="lg"
                  className="border-[#6366F1]/40 dark:border-[#6366F1]/40 bg-gradient-to-br from-white to-indigo-50/40 dark:from-[#11172B] dark:to-[#131A38]"
                >
                  <p className="text-xs font-semibold text-[#6366F1] dark:text-[#22D3EE] mb-3">
                    Bodh Conceptual Model
                  </p>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-[#F8FAFC] mb-5">
                    Engineered for lasting comprehension
                  </h3>
                  <ul className="space-y-3.5 text-sm text-slate-700 dark:text-slate-200">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-[#6366F1] dark:text-[#22D3EE] shrink-0 mt-0.5" />
                      <span>Establishes physical and mathematical intuition before algebra.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-[#6366F1] dark:text-[#22D3EE] shrink-0 mt-0.5" />
                      <span>Detects flawed mental models and repairs them with clear counterexamples.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-[#6366F1] dark:text-[#22D3EE] shrink-0 mt-0.5" />
                      <span>Adapts pacing, analogies, and rigor across beginner to advanced levels.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-[#6366F1] dark:text-[#22D3EE] shrink-0 mt-0.5" />
                      <span>Closes with targeted checks that confirm real conceptual transfer.</span>
                    </li>
                  </ul>
                </Card>
              </div>
            </MotionReveal>
          </div>
        </section>

        {/* SECTION 4: CORE CAPABILITIES */}
        <section id="capabilities" className="py-20 lg:py-24 border-t border-slate-200 dark:border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <MotionReveal>
              <div className="max-w-2xl space-y-4 mb-12">
                <p className="text-xs font-semibold tracking-wide text-[#6366F1] dark:text-[#22D3EE]">
                  Core Capabilities
                </p>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-balance text-slate-900 dark:text-[#F8FAFC]">
                  Four pillars of disciplined educational reasoning.
                </h2>
                <p className="text-base leading-relaxed text-slate-600 dark:text-[#94A3B8]">
                  Every component of Bodh is architected to support clear scientific thinking from
                  first question to deep mastery.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                {CAPABILITIES.map((cap) => (
                  <Card
                    key={cap.index}
                    interactive
                    padding="lg"
                    className={`${cap.span} flex flex-col justify-between`}
                  >
                    <div>
                      <p className="text-xs font-mono font-medium text-[#6366F1] dark:text-[#22D3EE] tabular-nums mb-3">
                        {cap.index}.
                      </p>
                      <h3 className="text-xl font-semibold text-slate-900 dark:text-[#F8FAFC]">
                        {cap.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-[#94A3B8]">
                        {cap.description}
                      </p>
                    </div>
                    <p className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 text-xs text-slate-500 dark:text-[#94A3B8]">
                      {cap.highlight}
                    </p>
                  </Card>
                ))}
              </div>
            </MotionReveal>
          </div>
        </section>

        {/* SECTION 5: HOW BODH WORKS */}
        <section className="py-20 lg:py-24 border-t border-slate-200 dark:border-slate-800/80 bg-white/60 dark:bg-[#0B1024]/55">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <MotionReveal>
              <div className="max-w-2xl space-y-4 mb-12">
                <p className="text-xs font-semibold tracking-wide text-[#6366F1] dark:text-[#22D3EE]">
                  How Bodh Works
                </p>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-balance text-slate-900 dark:text-[#F8FAFC]">
                  A structured four-step reasoning loop.
                </h2>
                <p className="text-base leading-relaxed text-slate-600 dark:text-[#94A3B8]">
                  Select any stage below to see how Bodh guides a learner from an intuitive
                  misconception to verified understanding.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                {/* Interactive Step List */}
                <div className="lg:col-span-6 space-y-2.5">
                  {WORKFLOW_STEPS.map((item, idx) => {
                    const isSelected = idx === activeStepIndex;
                    return (
                      <button
                        key={item.step}
                        type="button"
                        onClick={() => setActiveStepIndex(idx)}
                        className={`w-full text-left p-5 rounded-2xl border transition-all duration-150 cursor-pointer ${
                          isSelected
                            ? 'bg-white dark:bg-[#11172B] border-[#6366F1] shadow-[0_12px_30px_-16px_rgba(99,102,241,0.45)]'
                            : 'bg-transparent border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <span
                            className={`text-xs font-mono font-semibold tabular-nums mt-0.5 ${
                              isSelected
                                ? 'text-[#6366F1] dark:text-[#22D3EE]'
                                : 'text-slate-400 dark:text-slate-500'
                            }`}
                          >
                            {item.step}
                          </span>
                          <div>
                            <h3 className="text-base font-semibold text-slate-900 dark:text-[#F8FAFC]">
                              {item.title}
                            </h3>
                            <p className="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-[#94A3B8]">
                              {item.summary}
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Live Stage Inspector Panel */}
                <div className="lg:col-span-6 flex">
                  <Card padding="lg" className="w-full flex flex-col justify-between">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-[#94A3B8] pb-4 border-b border-slate-200 dark:border-slate-800/80">
                        <span className="font-semibold text-[#6366F1] dark:text-[#22D3EE]">
                          Stage {activeStep.step} Walkthrough
                        </span>
                        <span>Classical Mechanics Example</span>
                      </div>

                      <div className="space-y-4">
                        <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#0B1024] border border-slate-200 dark:border-slate-800">
                          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">
                            Input / Focus
                          </p>
                          <p className="text-sm font-medium text-slate-900 dark:text-[#F8FAFC]">
                            {activeStep.examplePrompt}
                          </p>
                        </div>

                        <div className="p-4 rounded-xl bg-[#6366F1]/8 dark:bg-[#151D3B] border border-[#6366F1]/25">
                          <p className="text-xs font-medium text-[#6366F1] dark:text-[#22D3EE] mb-1.5">
                            Bodh Reasoning Action
                          </p>
                          <p className="text-sm leading-relaxed text-slate-800 dark:text-slate-100">
                            {activeStep.exampleOutput}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 pt-5 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between gap-4">
                      <span className="text-xs text-slate-500 dark:text-[#94A3B8]">
                        Try an interactive simulated walkthrough in Chat.
                      </span>
                      <Button size="sm" variant="secondary" onClick={() => navigate('/chat')}>
                        Try in Chat
                      </Button>
                    </div>
                  </Card>
                </div>
              </div>
            </MotionReveal>
          </div>
        </section>

        {/* SECTION 6: WHY CONCEPTUAL UNDERSTANDING MATTERS */}
        <section className="py-20 lg:py-24 border-t border-slate-200 dark:border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <MotionReveal>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                <div className="lg:col-span-5 space-y-4">
                  <p className="text-xs font-semibold tracking-wide text-[#6366F1] dark:text-[#22D3EE]">
                    Why Conceptual Understanding Matters
                  </p>
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-balance text-slate-900 dark:text-[#F8FAFC]">
                    Memorized steps fail the moment a problem changes shape.
                  </h2>
                </div>

                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2.5 pt-4 border-t border-slate-200 dark:border-slate-800">
                    <h3 className="text-base font-semibold text-slate-900 dark:text-[#F8FAFC]">
                      Transfer Across Contexts
                    </h3>
                    <p className="text-sm leading-relaxed text-slate-600 dark:text-[#94A3B8]">
                      When learners grasp conservation laws or rate-of-change intuition, they can
                      reason through unfamiliar physics, chemistry, and calculus problems without
                      relying on memorized templates.
                    </p>
                  </div>

                  <div className="space-y-2.5 pt-4 border-t border-slate-200 dark:border-slate-800">
                    <h3 className="text-base font-semibold text-slate-900 dark:text-[#F8FAFC]">
                      Self-Correcting Judgment
                    </h3>
                    <p className="text-sm leading-relaxed text-slate-600 dark:text-[#94A3B8]">
                      Conceptual thinkers notice immediately when an answer has the wrong sign,
                      impossible units, or violates a boundary condition—catching errors before they
                      compound.
                    </p>
                  </div>

                  <div className="space-y-2.5 pt-4 border-t border-slate-200 dark:border-slate-800">
                    <h3 className="text-base font-semibold text-slate-900 dark:text-[#F8FAFC]">
                      Lower Cognitive Overload
                    </h3>
                    <p className="text-sm leading-relaxed text-slate-600 dark:text-[#94A3B8]">
                      Organizing facts around a few core principles dramatically reduces what must
                      be memorized, turning disconnected chapters into one coherent scientific map.
                    </p>
                  </div>

                  <div className="space-y-2.5 pt-4 border-t border-slate-200 dark:border-slate-800">
                    <h3 className="text-base font-semibold text-slate-900 dark:text-[#F8FAFC]">
                      Curiosity That Compounds
                    </h3>
                    <p className="text-sm leading-relaxed text-slate-600 dark:text-[#94A3B8]">
                      Understanding the mechanism behind a phenomenon naturally leads to deeper
                      questions—turning study sessions from passive compliance into active inquiry.
                    </p>
                  </div>
                </div>
              </div>
            </MotionReveal>
          </div>
        </section>

        {/* SECTION 7: DOCUMENTATION INTRODUCTION */}
        <section className="py-20 lg:py-24 border-t border-slate-200 dark:border-slate-800/80 bg-white/60 dark:bg-[#0B1024]/55">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <MotionReveal>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-6 space-y-5">
                  <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#6366F1] dark:text-[#22D3EE]">
                    <BookOpen className="w-4 h-4" />
                    <span>Documentation</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-balance text-slate-900 dark:text-[#F8FAFC]">
                    Transparent documentation covering pedagogy, design, and boundaries.
                  </h2>
                  <p className="text-base leading-relaxed text-slate-600 dark:text-[#94A3B8]">
                    Read through fourteen structured sections detailing Bodh&apos;s model philosophy,
                    misconception detection methodology, supported STEM domains, planned system
                    architecture, and honest preview limitations.
                  </p>
                  <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-slate-500 dark:text-[#94A3B8] pt-1">
                    <Link to="/docs/model-philosophy" className="hover:text-[#6366F1] dark:hover:text-[#22D3EE]">
                      Model Philosophy
                    </Link>
                    <span aria-hidden="true">·</span>
                    <Link to="/docs/adaptive-teaching" className="hover:text-[#6366F1] dark:hover:text-[#22D3EE]">
                      Adaptive Teaching
                    </Link>
                    <span aria-hidden="true">·</span>
                    <Link to="/docs/model-architecture" className="hover:text-[#6366F1] dark:hover:text-[#22D3EE]">
                      Architecture
                    </Link>
                    <span aria-hidden="true">·</span>
                    <Link to="/docs/limitations" className="hover:text-[#6366F1] dark:hover:text-[#22D3EE]">
                      Limitations
                    </Link>
                  </div>
                  <div className="pt-2">
                    <Button
                      variant="secondary"
                      onClick={() => navigate('/docs')}
                      rightIcon={<ArrowRight className="w-4 h-4" />}
                    >
                      Open Documentation
                    </Button>
                  </div>
                </div>

                <div className="lg:col-span-6">
                  <DocsBookGraphic />
                </div>
              </div>
            </MotionReveal>
          </div>
        </section>

        {/* SECTION 8: DEVELOPER INTRODUCTION */}
        <section className="py-20 lg:py-24 border-t border-slate-200 dark:border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <MotionReveal>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-5">
                  <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#6366F1] dark:text-[#22D3EE]">
                    <Code2 className="w-4 h-4" />
                    <span>Developers &amp; Architecture</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-balance text-slate-900 dark:text-[#F8FAFC]">
                    Engineered with modular boundaries for future model integration.
                  </h2>
                  <p className="text-base leading-relaxed text-slate-600 dark:text-[#94A3B8]">
                    The Bodh frontend separates presentation components, design tokens, and
                    simulated AI service contracts cleanly—allowing future model inference and
                    evaluation pipelines to plug in without rebuilding the user interface.
                  </p>
                  <div className="pt-2">
                    <Button
                      variant="secondary"
                      onClick={() => navigate('/developers')}
                      rightIcon={<ArrowRight className="w-4 h-4" />}
                    >
                      View Developer Overview
                    </Button>
                  </div>
                </div>

                <div className="lg:col-span-5 space-y-3.5">
                  <Card padding="md" className="flex items-start gap-3.5">
                    <Layers className="w-5 h-5 text-[#6366F1] dark:text-[#22D3EE] shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900 dark:text-[#F8FAFC]">
                        Decoupled Service Layer
                      </h3>
                      <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-[#94A3B8]">
                        UI components read from typed adapters rather than hardcoding model logic.
                      </p>
                    </div>
                  </Card>
                  <Card padding="md" className="flex items-start gap-3.5">
                    <GitBranch className="w-5 h-5 text-[#A855F7] shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900 dark:text-[#F8FAFC]">
                        Phased Development Roadmap
                      </h3>
                      <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-[#94A3B8]">
                        Transparent milestones from frontend foundation to pedagogical evaluation.
                      </p>
                    </div>
                  </Card>
                </div>
              </div>
            </MotionReveal>
          </div>
        </section>

        {/* SECTION 9: FINAL GET STARTED / LOGIN SECTION */}
        <section className="py-20 lg:py-24 border-t border-slate-200 dark:border-slate-800/80">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <MotionReveal>
              <div className="relative overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#11172B] px-6 py-12 sm:px-12 sm:py-16 text-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.16),transparent_65%)] pointer-events-none" />
                <div className="relative z-10 max-w-2xl mx-auto space-y-5">
                  <div className="flex justify-center">
                    <BodhLogo size="lg" showWordmark={false} />
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-balance text-slate-900 dark:text-[#F8FAFC]">
                    Begin exploring concepts with clarity.
                  </h2>
                  <p className="text-sm sm:text-base leading-relaxed text-slate-600 dark:text-[#94A3B8]">
                    Open the Bodh Chat workspace to preview structured educational dialogues, or
                    visit the Login screen to experience the authentication interface.
                  </p>
                  <div className="pt-3 flex flex-wrap items-center justify-center gap-3.5">
                    <Button
                      size="lg"
                      onClick={() => navigate('/chat')}
                      leftIcon={<Sparkles className="w-4 h-4" />}
                    >
                      Launch Chat Workspace
                    </Button>
                    <Button variant="secondary" size="lg" onClick={() => navigate('/login')}>
                      Sign In
                    </Button>
                  </div>
                </div>
              </div>
            </MotionReveal>
          </div>
        </section>
      </main>

      {/* SECTION 10: PROFESSIONAL FOOTER */}
      <Footer />
    </div>
  );
}
