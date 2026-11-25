import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Navbar } from '../components/navigation/Navbar';
import { Footer } from '../components/navigation/Footer';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { BodhLogo } from '../components/common/BodhLogo';
import { MotionReveal } from '../components/homepage/MotionReveal';

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-[#080B1A] text-slate-900 dark:text-[#F8FAFC]">
      <Navbar />

      <main className="flex-1">
        {/* Editorial Hero */}
        <section className="border-b border-slate-200 dark:border-slate-800/80 py-16 lg:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <p className="text-xs font-semibold tracking-wide text-[#6366F1] dark:text-[#22D3EE]">
              About Bodh
            </p>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.1] text-balance text-slate-900 dark:text-[#F8FAFC]">
              Reimagining AI as a patient, rigorous partner in{' '}
              <span className="bodh-gradient-text">understanding.</span>
            </h1>
            <p className="text-base sm:text-lg leading-relaxed text-slate-600 dark:text-[#94A3B8] max-w-2xl">
              &ldquo;Don&apos;t just get answers. Gain understanding.&rdquo; Bodh exists to shift
              educational technology away from shortcut completion toward deep, transferable
              comprehension.
            </p>
          </div>
        </section>

        {/* Editorial Narrative Body */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 space-y-16">
          {/* 1. What Bodh Is */}
          <MotionReveal>
            <section className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              <div className="md:col-span-4">
                <span className="text-xs font-mono text-[#6366F1] dark:text-[#22D3EE] tabular-nums">
                  01.
                </span>
                <h2 className="mt-1 text-xl font-bold text-slate-900 dark:text-[#F8FAFC]">
                  What Bodh Is
                </h2>
              </div>
              <div className="md:col-span-8 space-y-4 text-[15px] leading-7 text-slate-600 dark:text-slate-300">
                <p>
                  Bodh is an educational AI platform centered on conceptual clarity, scientific
                  accuracy, misconception detection, adaptive teaching, and logical reasoning. Its
                  name reflects awakening and insight—the moment when an abstract rule suddenly
                  clicks into an intuitive mental model.
                </p>
                <p>
                  Rather than functioning as an all-purpose text generator, Bodh is specifically
                  shaped for learners exploring foundational STEM and analytical disciplines where
                  how you reason matters just as much as the final result.
                </p>
              </div>
            </section>
          </MotionReveal>

          <hr className="border-slate-200 dark:border-slate-800/80" />

          {/* 2. Why It Was Created */}
          <MotionReveal>
            <section className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              <div className="md:col-span-4">
                <span className="text-xs font-mono text-[#6366F1] dark:text-[#22D3EE] tabular-nums">
                  02.
                </span>
                <h2 className="mt-1 text-xl font-bold text-slate-900 dark:text-[#F8FAFC]">
                  Why It Was Created
                </h2>
              </div>
              <div className="md:col-span-8 space-y-4 text-[15px] leading-7 text-slate-600 dark:text-slate-300">
                <p>
                  Information has never been easier to retrieve, yet genuine conceptual mastery
                  remains stubbornly difficult. When learners rely on tools that immediately print
                  polished solutions, they bypass the exact cognitive effort that builds memory and
                  analytical skill.
                </p>
                <p>
                  Bodh was created to show what an AI learning interface looks like when it respects
                  the learner&apos;s mind—slowing down where misconceptions hide, naming hidden
                  assumptions, and building confidence through honest reasoning.
                </p>
              </div>
            </section>
          </MotionReveal>

          <hr className="border-slate-200 dark:border-slate-800/80" />

          {/* 3. Educational Philosophy */}
          <MotionReveal>
            <section className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              <div className="md:col-span-4">
                <span className="text-xs font-mono text-[#6366F1] dark:text-[#22D3EE] tabular-nums">
                  03.
                </span>
                <h2 className="mt-1 text-xl font-bold text-slate-900 dark:text-[#F8FAFC]">
                  Educational Philosophy
                </h2>
              </div>
              <div className="md:col-span-8 space-y-5">
                <p className="text-[15px] leading-7 text-slate-600 dark:text-slate-300">
                  Three convictions anchor Bodh&apos;s educational philosophy:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    {
                      title: 'Why Before How',
                      desc: 'Formulas become effortless to recall once the underlying physical or logical mechanism is clear.',
                    },
                    {
                      title: 'Misconceptions Are Data',
                      desc: 'Wrong intuition is not failure—it is the most valuable starting point for lasting correction.',
                    },
                    {
                      title: 'Rigor With Empathy',
                      desc: 'Scientific precision and approachable, calm explanation belong together.',
                    },
                  ].map((item) => (
                    <Card key={item.title} padding="sm" className="space-y-1.5">
                      <h3 className="text-sm font-semibold text-slate-900 dark:text-[#F8FAFC]">
                        {item.title}
                      </h3>
                      <p className="text-xs leading-relaxed text-slate-600 dark:text-[#94A3B8]">
                        {item.desc}
                      </p>
                    </Card>
                  ))}
                </div>
              </div>
            </section>
          </MotionReveal>

          <hr className="border-slate-200 dark:border-slate-800/80" />

          {/* 4. Approach to Learning */}
          <MotionReveal>
            <section className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              <div className="md:col-span-4">
                <span className="text-xs font-mono text-[#6366F1] dark:text-[#22D3EE] tabular-nums">
                  04.
                </span>
                <h2 className="mt-1 text-xl font-bold text-slate-900 dark:text-[#F8FAFC]">
                  Approach to Learning
                </h2>
              </div>
              <div className="md:col-span-8 space-y-4 text-[15px] leading-7 text-slate-600 dark:text-slate-300">
                <p>
                  Effective learning happens through structured dialogue: anchoring a new idea in
                  familiar intuition, articulating formal definitions cleanly, checking boundary
                  cases, and testing transfer on a slightly different problem.
                </p>
                <p>
                  Every screen in Bodh—from the uncluttered chat workspace to the 14-section
                  documentation—is designed to keep focus on ideas rather than visual noise.
                </p>
              </div>
            </section>
          </MotionReveal>

          <hr className="border-slate-200 dark:border-slate-800/80" />

          {/* 5. Long-Term Vision */}
          <MotionReveal>
            <section className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              <div className="md:col-span-4">
                <span className="text-xs font-mono text-[#6366F1] dark:text-[#22D3EE] tabular-nums">
                  05.
                </span>
                <h2 className="mt-1 text-xl font-bold text-slate-900 dark:text-[#F8FAFC]">
                  Long-Term Vision
                </h2>
              </div>
              <div className="md:col-span-8 space-y-4 text-[15px] leading-7 text-slate-600 dark:text-slate-300">
                <p>
                  Our long-term vision is a trustworthy educational AI ecosystem that supports
                  independent learners, complements classroom educators, and raises the standard for
                  scientific explanation across subjects.
                </p>
                <p>
                  Today, this application serves as the foundational frontend experience—allowing
                  visitors to explore Bodh&apos;s philosophy, documentation, and simulated learning
                  workspace while future model engineering progresses responsibly.
                </p>
              </div>
            </section>
          </MotionReveal>

          {/* Subtle Editorial Closing CTA */}
          <MotionReveal>
            <Card padding="lg" className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <BodhLogo size="lg" showWordmark={false} />
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-[#F8FAFC]">
                    Experience the Bodh workspace
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-[#94A3B8]">
                    Try simulated conceptual walkthroughs or read our full documentation.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <Button variant="secondary" onClick={() => navigate('/docs')}>
                  Documentation
                </Button>
                <Button onClick={() => navigate('/chat')} rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Open Chat
                </Button>
              </div>
            </Card>
          </MotionReveal>
        </article>
      </main>

      <Footer />
    </div>
  );
}
