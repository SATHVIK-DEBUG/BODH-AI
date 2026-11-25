import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Code2,
  Layers,
  Target,
  Milestone,
  UserCheck,
  Pencil,
  Check,
  X,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';
import { Navbar } from '../components/navigation/Navbar';
import { Footer } from '../components/navigation/Footer';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { MotionReveal } from '../components/homepage/MotionReveal';
import { useNotification } from '../context/NotificationContext';
import { DeveloperProfileData } from '../types';

const DEFAULT_DEVELOPER_PROFILE: DeveloperProfileData = {
  name: 'Bodh Project Lead (Editable)',
  role: 'Platform Creator & Frontend Architect',
  organization: 'Bodh Educational AI Initiative',
  location: 'Editable Location',
  bio: 'Use the Edit Profile button to customize this developer profile section with verified creator details. No personal credentials or achievements are pre-fabricated here.',
  focusAreas: 'Educational Interface Design · Scientific Pedagogy · Modular Frontend Systems',
  contactEmail: 'contact@bodh.example',
  websiteLabel: 'bodh.example',
};

const TECH_STACK = [
  {
    name: 'React & TypeScript',
    category: 'UI Architecture',
    detail: 'Component-driven interface with strict static typing across pages, forms, and chat state.',
  },
  {
    name: 'Vite',
    category: 'Build & Tooling',
    detail: 'Fast development server and optimized production bundle pipeline.',
  },
  {
    name: 'Tailwind CSS',
    category: 'Design System',
    detail: 'Tokenized dark and light themes built on Bodh’s approved midnight indigo palette.',
  },
  {
    name: 'Framer Motion',
    category: 'Motion & Reactivity',
    detail: 'Subtle, compositor-friendly transitions with full reduced-motion accessibility support.',
  },
  {
    name: 'React Router',
    category: 'Client Routing',
    detail: 'Dedicated routes for Homepage, 14-section Docs, Developers, About, Auth, and Chat.',
  },
  {
    name: 'Decoupled Service Layer',
    category: 'Backend Readiness',
    detail: 'Isolated mockAIService module prepared for future verified model API integration.',
  },
];

const ROADMAP_PHASES = [
  {
    phase: 'Phase 01',
    status: 'Current Focus',
    title: 'Frontend Platform & Design System',
    description:
      'Establish the Bodh visual identity, public web presence, structured documentation portal, authentication UI flows, and simulated chat workspace.',
  },
  {
    phase: 'Phase 02',
    status: 'Planned',
    title: 'Pedagogical Curriculum & Misconception Taxonomy',
    description:
      'Organize subject-specific misconception patterns across physics, chemistry, mathematics, and biology with educator review.',
  },
  {
    phase: 'Phase 03',
    status: 'Planned',
    title: 'Backend API & Inference Adapter',
    description:
      'Replace the local mock service boundary with a secure backend service supporting structured conceptual reasoning and persistent sessions.',
  },
  {
    phase: 'Phase 04',
    status: 'Planned',
    title: 'Evaluation Rubrics & Adaptive Learning Loops',
    description:
      'Introduce educator-guided qualitative evaluation for scientific accuracy, scaffolding quality, and conceptual transfer.',
  },
];

export default function Developers() {
  const { notify } = useNotification();
  const [profile, setProfile] = useState<DeveloperProfileData>(() => {
    try {
      const saved = localStorage.getItem('bodh_developer_profile');
      if (saved) return { ...DEFAULT_DEVELOPER_PROFILE, ...JSON.parse(saved) };
    } catch {
      // Ignore storage access errors
    }
    return DEFAULT_DEVELOPER_PROFILE;
  });

  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState<DeveloperProfileData>(profile);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned: DeveloperProfileData = {
      name: draft.name.trim() || DEFAULT_DEVELOPER_PROFILE.name,
      role: draft.role.trim() || DEFAULT_DEVELOPER_PROFILE.role,
      organization: draft.organization.trim() || DEFAULT_DEVELOPER_PROFILE.organization,
      location: draft.location.trim() || DEFAULT_DEVELOPER_PROFILE.location,
      bio: draft.bio.trim() || DEFAULT_DEVELOPER_PROFILE.bio,
      focusAreas: draft.focusAreas.trim() || DEFAULT_DEVELOPER_PROFILE.focusAreas,
      contactEmail: draft.contactEmail.trim() || DEFAULT_DEVELOPER_PROFILE.contactEmail,
      websiteLabel: draft.websiteLabel.trim() || DEFAULT_DEVELOPER_PROFILE.websiteLabel,
    };
    setProfile(cleaned);
    try {
      localStorage.setItem('bodh_developer_profile', JSON.stringify(cleaned));
    } catch {
      // Ignore storage errors
    }
    setIsEditing(false);
    notify('success', 'Developer profile updated', 'Saved locally in your browser.');
  };

  const handleResetProfile = () => {
    setProfile(DEFAULT_DEVELOPER_PROFILE);
    setDraft(DEFAULT_DEVELOPER_PROFILE);
    try {
      localStorage.removeItem('bodh_developer_profile');
    } catch {
      // Ignore storage errors
    }
    setIsEditing(false);
    notify('info', 'Developer profile reset to defaults');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-[#080B1A] text-slate-900 dark:text-[#F8FAFC]">
      <Navbar />

      <main className="flex-1">
        {/* Page Header */}
        <section className="border-b border-slate-200 dark:border-slate-800/80 py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#6366F1] dark:text-[#22D3EE]">
                <Code2 className="w-4 h-4" />
                <span>Developers</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-balance text-slate-900 dark:text-[#F8FAFC]">
                Built with disciplined architecture for educational intelligence.
              </h1>
              <p className="text-base sm:text-lg leading-relaxed text-slate-600 dark:text-[#94A3B8]">
                An overview of Bodh&apos;s engineering philosophy, project background, technology
                stack, phased roadmap, and editable developer profile.
              </p>
            </div>
          </div>
        </section>

        {/* Philosophy & Background */}
        <section className="py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <MotionReveal>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <Card padding="lg" className="lg:col-span-6 space-y-4">
                  <p className="text-xs font-semibold text-[#6366F1] dark:text-[#22D3EE]">
                    Development Philosophy
                  </p>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-[#F8FAFC]">
                    Clarity in code reflects clarity in teaching.
                  </h2>
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-[#94A3B8]">
                    Bodh is developed with strict separation of concerns. User interface components,
                    brand design tokens, documentation content, and simulated AI adapters each live
                    in clean, focused modules. When real model infrastructure is introduced later,
                    the frontend remains stable and reusable.
                  </p>
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-[#94A3B8]">
                    We also value honesty over hype: simulated elements are explicitly marked, and
                    unverified model benchmarks are never fabricated.
                  </p>
                </Card>

                <Card padding="lg" className="lg:col-span-6 space-y-4">
                  <p className="text-xs font-semibold text-[#6366F1] dark:text-[#22D3EE]">
                    Project Background
                  </p>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-[#F8FAFC]">
                    Addressing the gap between answers and comprehension.
                  </h2>
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-[#94A3B8]">
                    Bodh began as a response to a recurring problem in modern digital learning:
                    students have instant access to generated solutions, yet still struggle to
                    explain why a physical law holds or how to approach a slightly altered problem.
                  </p>
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-[#94A3B8]">
                    The project starts by designing a calm, scientific, distraction-free web
                    platform tailored specifically to conceptual dialogue and structured study.
                  </p>
                </Card>
              </div>
            </MotionReveal>
          </div>
        </section>

        {/* Development Objectives */}
        <section className="py-16 lg:py-20 border-t border-slate-200 dark:border-slate-800/80 bg-white/60 dark:bg-[#0B1024]/55">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <MotionReveal>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#6366F1] dark:text-[#22D3EE] mb-3">
                <Target className="w-4 h-4" />
                <span>Development Objectives</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-[#F8FAFC] mb-10">
                What guides every engineering decision
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {[
                  {
                    num: '01',
                    title: 'Backend-Ready Modularity',
                    text: 'Keep simulated chat services cleanly isolated so future inference endpoints connect without UI rewrites.',
                  },
                  {
                    num: '02',
                    title: 'Accessible Across Devices',
                    text: 'Ensure smooth performance, readable typography, and zero horizontal overflow from desktop down to compact Android screens.',
                  },
                  {
                    num: '03',
                    title: 'Scientific Presentation',
                    text: 'Structure responses, documentation, and layouts so definitions, formulas, and misconceptions remain immediately scannable.',
                  },
                  {
                    num: '04',
                    title: 'Transparent Simulation',
                    text: 'Maintain an unambiguous boundary between frontend previews and future live AI or authentication systems.',
                  },
                ].map((obj) => (
                  <Card key={obj.num} padding="md" className="space-y-2.5">
                    <span className="text-xs font-mono font-semibold text-[#6366F1] dark:text-[#22D3EE] tabular-nums">
                      {obj.num}.
                    </span>
                    <h3 className="text-base font-semibold text-slate-900 dark:text-[#F8FAFC]">
                      {obj.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-slate-600 dark:text-[#94A3B8]">
                      {obj.text}
                    </p>
                  </Card>
                ))}
              </div>
            </MotionReveal>
          </div>
        </section>

        {/* Technology Stack */}
        <section className="py-16 lg:py-20 border-t border-slate-200 dark:border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <MotionReveal>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#6366F1] dark:text-[#22D3EE] mb-3">
                <Layers className="w-4 h-4" />
                <span>Technology Stack</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-[#F8FAFC] mb-10">
                Modern frontend foundation
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {TECH_STACK.map((item) => (
                  <Card key={item.name} interactive padding="md" className="space-y-2">
                    <p className="text-xs font-medium text-slate-500 dark:text-[#94A3B8]">
                      {item.category}
                    </p>
                    <h3 className="text-base font-semibold text-slate-900 dark:text-[#F8FAFC]">
                      {item.name}
                    </h3>
                    <p className="text-sm leading-relaxed text-slate-600 dark:text-[#94A3B8]">
                      {item.detail}
                    </p>
                  </Card>
                ))}
              </div>
            </MotionReveal>
          </div>
        </section>

        {/* Development Roadmap */}
        <section className="py-16 lg:py-20 border-t border-slate-200 dark:border-slate-800/80 bg-white/60 dark:bg-[#0B1024]/55">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <MotionReveal>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#6366F1] dark:text-[#22D3EE] mb-3">
                <Milestone className="w-4 h-4" />
                <span>Development Roadmap</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-[#F8FAFC] mb-10">
                Incremental path from interface to live learning model
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {ROADMAP_PHASES.map((step) => (
                  <Card key={step.phase} padding="lg" className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono font-semibold text-[#6366F1] dark:text-[#22D3EE] tabular-nums">
                        {step.phase}
                      </span>
                      <span
                        className={
                          step.status === 'Current Focus'
                            ? 'font-semibold text-emerald-600 dark:text-emerald-400'
                            : 'text-slate-500 dark:text-[#94A3B8]'
                        }
                      >
                        {step.status}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-[#F8FAFC]">
                      {step.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-slate-600 dark:text-[#94A3B8]">
                      {step.description}
                    </p>
                  </Card>
                ))}
              </div>
            </MotionReveal>
          </div>
        </section>

        {/* Editable Developer Profile Section */}
        <section className="py-16 lg:py-20 border-t border-slate-200 dark:border-slate-800/80">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <MotionReveal>
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#6366F1] dark:text-[#22D3EE] mb-2">
                    <UserCheck className="w-4 h-4" />
                    <span>Developer Profile</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-[#F8FAFC]">
                    Project Maintainer Information
                  </h2>
                </div>

                {!isEditing && (
                  <Button
                    variant="secondary"
                    size="sm"
                    leftIcon={<Pencil className="w-3.5 h-3.5" />}
                    onClick={() => {
                      setDraft(profile);
                      setIsEditing(true);
                    }}
                  >
                    Edit Profile Content
                  </Button>
                )}
              </div>

              <Card padding="lg">
                {isEditing ? (
                  <form onSubmit={handleSave} className="space-y-4">
                    <p className="text-xs text-slate-500 dark:text-[#94A3B8]">
                      Changes are stored locally in your browser so you can customize the developer
                      profile directly from the frontend.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        label="Display Name"
                        value={draft.name}
                        onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                      />
                      <Input
                        label="Role / Title"
                        value={draft.role}
                        onChange={(e) => setDraft({ ...draft, role: e.target.value })}
                      />
                      <Input
                        label="Organization / Initiative"
                        value={draft.organization}
                        onChange={(e) => setDraft({ ...draft, organization: e.target.value })}
                      />
                      <Input
                        label="Location"
                        value={draft.location}
                        onChange={(e) => setDraft({ ...draft, location: e.target.value })}
                      />
                      <Input
                        label="Contact Email"
                        type="email"
                        value={draft.contactEmail}
                        onChange={(e) => setDraft({ ...draft, contactEmail: e.target.value })}
                      />
                      <Input
                        label="Website / Handle"
                        value={draft.websiteLabel}
                        onChange={(e) => setDraft({ ...draft, websiteLabel: e.target.value })}
                      />
                    </div>
                    <Input
                      label="Focus Areas"
                      value={draft.focusAreas}
                      onChange={(e) => setDraft({ ...draft, focusAreas: e.target.value })}
                    />
                    <div className="space-y-1.5">
                      <label
                        htmlFor="dev-bio"
                        className="block text-xs font-medium text-slate-700 dark:text-slate-300"
                      >
                        Developer Summary
                      </label>
                      <textarea
                        id="dev-bio"
                        rows={3}
                        value={draft.bio}
                        onChange={(e) => setDraft({ ...draft, bio: e.target.value })}
                        className="w-full rounded-xl bg-white dark:bg-[#0D1326] text-sm text-slate-900 dark:text-[#F8FAFC] border border-slate-200 dark:border-slate-700/80 p-3.5 focus:outline-none focus:ring-2 focus:ring-[#6366F1]/40 focus:border-[#6366F1]"
                      />
                    </div>

                    <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
                        onClick={handleResetProfile}
                      >
                        Reset Default
                      </Button>
                      <div className="flex items-center gap-2.5">
                        <Button
                          type="button"
                          variant="secondary"
                          size="sm"
                          leftIcon={<X className="w-3.5 h-3.5" />}
                          onClick={() => setIsEditing(false)}
                        >
                          Cancel
                        </Button>
                        <Button type="submit" size="sm" leftIcon={<Check className="w-3.5 h-3.5" />}>
                          Save Changes
                        </Button>
                      </div>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                      <div className="w-16 h-16 rounded-2xl bodh-gradient-btn text-white text-xl font-bold flex items-center justify-center shrink-0">
                        {(profile.name[0] || 'B').toUpperCase()}
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-[#F8FAFC]">
                          {profile.name}
                        </h3>
                        <p className="text-sm font-medium text-[#6366F1] dark:text-[#22D3EE]">
                          {profile.role}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-[#94A3B8]">
                          {profile.organization} · {profile.location}
                        </p>
                      </div>
                    </div>

                    <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                      {profile.bio}
                    </p>

                    <div className="pt-5 border-t border-slate-200 dark:border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                      <div>
                        <p className="text-slate-500 dark:text-slate-400 mb-1">Focus Areas</p>
                        <p className="font-medium text-slate-900 dark:text-[#F8FAFC]">
                          {profile.focusAreas}
                        </p>
                      </div>
                      <div>
                        <p className="text-slate-500 dark:text-slate-400 mb-1">Contact</p>
                        <p className="font-medium text-slate-900 dark:text-[#F8FAFC]">
                          {profile.contactEmail}
                        </p>
                      </div>
                      <div>
                        <p className="text-slate-500 dark:text-slate-400 mb-1">Reference</p>
                        <p className="font-medium text-slate-900 dark:text-[#F8FAFC]">
                          {profile.websiteLabel}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </Card>

              <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
                <p className="text-sm text-slate-600 dark:text-[#94A3B8]">
                  Want to inspect the architecture contracts and planned system specifications?
                </p>
                <Link
                  to="/docs/model-architecture"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#6366F1] dark:text-[#22D3EE] hover:underline"
                >
                  <span>Read Architecture Documentation</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </MotionReveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
