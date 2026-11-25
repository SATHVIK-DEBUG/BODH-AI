import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Search,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Menu,
  X,
  BookOpen,
} from 'lucide-react';
import { Navbar } from '../components/navigation/Navbar';
import { Footer } from '../components/navigation/Footer';
import { DocsBookGraphic } from '../components/documentation/DocsBookGraphic';
import { CodeBlock } from '../components/documentation/CodeBlock';
import { EmptyState } from '../components/common/EmptyState';
import { DOC_GROUPS, DOCUMENTATION_SECTIONS } from '../data/documentation';
import { DocSection } from '../types';

export default function Documentation() {
  const { sectionId } = useParams<{ sectionId?: string }>();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [activeHeadingId, setActiveHeadingId] = useState<string>('');
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    'Getting Started': true,
    'Core Pedagogy': true,
    'Technical Overview': true,
    Reference: true,
  });

  const currentSectionIndex = useMemo(() => {
    if (!sectionId) return 0;
    const found = DOCUMENTATION_SECTIONS.findIndex((s) => s.id === sectionId);
    return found === -1 ? 0 : found;
  }, [sectionId]);

  const currentSection: DocSection = DOCUMENTATION_SECTIONS[currentSectionIndex];
  const prevSection = currentSectionIndex > 0 ? DOCUMENTATION_SECTIONS[currentSectionIndex - 1] : null;
  const nextSection =
    currentSectionIndex < DOCUMENTATION_SECTIONS.length - 1
      ? DOCUMENTATION_SECTIONS[currentSectionIndex + 1]
      : null;

  // Filtered sections for live frontend search
  const filteredSections = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return DOCUMENTATION_SECTIONS;
    return DOCUMENTATION_SECTIONS.filter(
      (sec) =>
        sec.title.toLowerCase().includes(q) ||
        sec.summary.toLowerCase().includes(q) ||
        sec.group.toLowerCase().includes(q) ||
        sec.blocks.some(
          (b) =>
            b.heading.toLowerCase().includes(q) ||
            b.paragraphs.some((p) => p.toLowerCase().includes(q))
        )
    );
  }, [searchQuery]);

  // Reset active heading on section change
  useEffect(() => {
    if (currentSection.blocks.length > 0) {
      setActiveHeadingId(currentSection.blocks[0].headingId);
    }
    setMobileNavOpen(false);
  }, [currentSection]);

  // Observe visible headings for right-side TOC indicator
  useEffect(() => {
    const headings = currentSection.blocks
      .map((b) => document.getElementById(b.headingId))
      .filter((el): el is HTMLElement => Boolean(el));

    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible?.target.id) {
          setActiveHeadingId(visible.target.id);
        }
      },
      { rootMargin: '-90px 0px -65% 0px', threshold: 0.1 }
    );

    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [currentSection]);

  const toggleGroup = (group: string) => {
    setExpandedGroups((prev) => ({ ...prev, [group]: !prev[group] }));
  };

  const handleSelectSection = (id: string) => {
    navigate(`/docs/${id}`);
    setMobileNavOpen(false);
  };

  const sidebarMarkup = (
    <div className="space-y-5">
      {/* Search simulation input */}
      <div className="relative">
        <Search
          className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
          aria-hidden="true"
        />
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search documentation..."
          aria-label="Search documentation"
          className="w-full h-10 pl-9 pr-3 rounded-xl text-xs bg-white dark:bg-[#11172B] text-slate-900 dark:text-[#F8FAFC] placeholder:text-slate-400 dark:placeholder:text-slate-500 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-[#6366F1]"
        />
      </div>

      {filteredSections.length === 0 ? (
        <EmptyState
          icon={<BookOpen className="w-5 h-5" />}
          title="No matching topics"
          description="Try searching for philosophy, misconceptions, architecture, or subjects."
        />
      ) : (
        <nav aria-label="Documentation sections" className="space-y-4">
          {DOC_GROUPS.map((group) => {
            const items = filteredSections.filter((s) => s.group === group);
            if (items.length === 0) return null;
            const isExpanded = searchQuery.trim().length > 0 ? true : expandedGroups[group];

            return (
              <div key={group}>
                <button
                  type="button"
                  onClick={() => toggleGroup(group)}
                  aria-expanded={isExpanded}
                  className="w-full flex items-center justify-between px-2 py-1.5 text-xs font-semibold text-slate-900 dark:text-[#F8FAFC] hover:text-[#6366F1] dark:hover:text-[#22D3EE] transition-colors cursor-pointer"
                >
                  <span>{group}</span>
                  {isExpanded ? (
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  )}
                </button>

                {isExpanded && (
                  <ul className="mt-1 space-y-0.5">
                    {items.map((item) => {
                      const active = item.id === currentSection.id;
                      return (
                        <li key={item.id}>
                          <button
                            type="button"
                            onClick={() => handleSelectSection(item.id)}
                            aria-current={active ? 'page' : undefined}
                            className={`w-full text-left px-3 py-2 rounded-lg text-[13px] transition-colors cursor-pointer ${
                              active
                                ? 'bg-[#6366F1]/14 dark:bg-[#192140] text-[#6366F1] dark:text-[#F8FAFC] font-semibold'
                                : 'text-slate-600 dark:text-[#94A3B8] hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 font-medium'
                            }`}
                          >
                            {item.title}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            );
          })}
        </nav>
      )}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-[#080B1A] text-slate-900 dark:text-[#F8FAFC]">
      <Navbar />

      {/* Mobile Docs Sub-bar */}
      <div className="lg:hidden sticky top-16 z-30 bg-white/95 dark:bg-[#0B1024]/95 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800 px-4 h-12 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setMobileNavOpen(true)}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-200 cursor-pointer"
        >
          <Menu className="w-4 h-4" />
          <span>Documentation Menu</span>
        </button>
        <span className="text-xs text-slate-500 dark:text-[#94A3B8] truncate max-w-[50%]">
          {currentSection.title}
        </span>
      </div>

      {/* Mobile Sidebar Drawer */}
      <AnimatePresence>
        {mobileNavOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileNavOpen(false)}
              className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-[84vw] max-w-xs h-full bg-[#F8FAFC] dark:bg-[#0A0F24] border-r border-slate-200 dark:border-slate-800 p-5 overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-5">
                <span className="text-sm font-bold text-slate-900 dark:text-[#F8FAFC]">
                  Documentation
                </span>
                <button
                  type="button"
                  onClick={() => setMobileNavOpen(false)}
                  aria-label="Close documentation menu"
                  className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-200 dark:hover:bg-white/10 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              {sidebarMarkup}
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      {/* Main 3-Column Documentation Layout */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-10 items-start">
          {/* Left Desktop Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-2">
            <h2 className="text-base font-bold text-slate-900 dark:text-[#F8FAFC] mb-4 px-1">
              Documentation
            </h2>
            {sidebarMarkup}
          </aside>

          {/* Main Documentation Article */}
          <article className="lg:col-span-9 xl:col-span-6 min-w-0">
            <motion.div
              key={currentSection.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* Clean unboxed breadcrumb metadata */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-[#94A3B8] mb-3">
                <span className="font-semibold text-[#6366F1] dark:text-[#22D3EE]">
                  Documentation
                </span>
                <span aria-hidden="true">/</span>
                <span>{currentSection.group}</span>
                <span aria-hidden="true">·</span>
                <span>{currentSection.lastUpdated}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-[#F8FAFC]">
                {currentSection.title}
              </h1>

              <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-[#94A3B8]">
                {currentSection.summary}
              </p>

              {currentSection.hasHeroGraphic && (
                <div className="mt-7">
                  <DocsBookGraphic />
                </div>
              )}

              <div className="mt-10 space-y-10">
                {currentSection.blocks.map((block) => (
                  <section
                    key={block.headingId}
                    id={block.headingId}
                    className="scroll-mt-24 space-y-4"
                  >
                    <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900 dark:text-[#F8FAFC]">
                      {block.heading}
                    </h2>

                    {block.paragraphs.map((para, idx) => (
                      <p
                        key={idx}
                        className="text-[15px] leading-7 text-slate-600 dark:text-slate-300"
                      >
                        {para}
                      </p>
                    ))}

                    {block.bulletPoints && (
                      <ul className="list-disc pl-5 space-y-2.5 text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">
                        {block.bulletPoints.map((bp, idx) => (
                          <li key={idx}>{bp}</li>
                        ))}
                      </ul>
                    )}

                    {block.callout && (
                      <div className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-[#11172B] border border-slate-200 dark:border-[#6366F1]/30 space-y-1.5">
                        <p className="text-xs font-semibold text-[#6366F1] dark:text-[#22D3EE]">
                          {block.callout.label}
                        </p>
                        <p className="text-sm leading-relaxed text-slate-600 dark:text-[#94A3B8]">
                          {block.callout.text}
                        </p>
                      </div>
                    )}

                    {block.codeExample && (
                      <CodeBlock
                        title={block.codeExample.title}
                        language={block.codeExample.language}
                        code={block.codeExample.code}
                      />
                    )}
                  </section>
                ))}
              </div>

              {/* Previous / Next Pagination */}
              <div className="mt-14 pt-8 border-t border-slate-200 dark:border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {prevSection ? (
                  <Link
                    to={`/docs/${prevSection.id}`}
                    className="group p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-[#6366F1]/50 bg-white dark:bg-[#11172B] transition-colors flex flex-col items-start"
                  >
                    <span className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-[#94A3B8]">
                      <ChevronLeft className="w-3.5 h-3.5" />
                      <span>Previous</span>
                    </span>
                    <span className="mt-1 text-sm font-semibold text-slate-900 dark:text-[#F8FAFC] group-hover:text-[#6366F1] dark:group-hover:text-[#22D3EE]">
                      {prevSection.title}
                    </span>
                  </Link>
                ) : (
                  <div />
                )}

                {nextSection && (
                  <Link
                    to={`/docs/${nextSection.id}`}
                    className="group p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-[#6366F1]/50 bg-white dark:bg-[#11172B] transition-colors flex flex-col items-end text-right"
                  >
                    <span className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-[#94A3B8]">
                      <span>Next</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                    <span className="mt-1 text-sm font-semibold text-slate-900 dark:text-[#F8FAFC] group-hover:text-[#6366F1] dark:group-hover:text-[#22D3EE]">
                      {nextSection.title}
                    </span>
                  </Link>
                )}
              </div>
            </motion.div>
          </article>

          {/* Right-side Table of Contents on xl screens */}
          <aside className="hidden xl:block xl:col-span-3 sticky top-24">
            <div className="pl-5 border-l border-slate-200 dark:border-slate-800/80 space-y-3">
              <p className="text-xs font-semibold text-slate-900 dark:text-[#F8FAFC]">
                On this page
              </p>
              <ul className="space-y-2 text-xs">
                {currentSection.blocks.map((block) => {
                  const isActive = activeHeadingId === block.headingId;
                  return (
                    <li key={block.headingId}>
                      <a
                        href={`#${block.headingId}`}
                        onClick={() => setActiveHeadingId(block.headingId)}
                        className={`block py-0.5 transition-colors ${
                          isActive
                            ? 'text-[#6366F1] dark:text-[#22D3EE] font-semibold'
                            : 'text-slate-500 dark:text-[#94A3B8] hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        {block.heading}
                      </a>
                    </li>
                  );
                })}
              </ul>
              <div className="pt-5 mt-5 border-t border-slate-200 dark:border-slate-800/80">
                <Link
                  to="/chat"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6366F1] dark:text-[#22D3EE] hover:underline"
                >
                  <span>Try simulated chat workspace</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  );
}
