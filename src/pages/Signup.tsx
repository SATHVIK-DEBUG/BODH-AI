import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Lock, ArrowRight, ArrowLeft } from 'lucide-react';
import { BodhLogo } from '../components/common/BodhLogo';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { AuthWaveVisual } from '../components/auth/AuthWaveVisual';
import { useNotification } from '../context/NotificationContext';
import { useTheme } from '../context/ThemeContext';

interface SignupErrors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  terms?: string;
}

export default function Signup() {
  const navigate = useNavigate();
  const { notify } = useNotification();
  const { updateProfile } = useTheme();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<SignupErrors>({});
  const [termsOpen, setTermsOpen] = useState(false);

  const passwordStrength = (() => {
    if (!password) return { label: '', score: 0 };
    let score = 0;
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score += 1;
    if (/[0-9]/.test(password) || /[^A-Za-z0-9]/.test(password)) score += 1;
    if (score <= 1) return { label: 'Weak', score: 1 };
    if (score === 2) return { label: 'Fair', score: 2 };
    return { label: 'Strong', score: 3 };
  })();

  const validate = () => {
    const next: SignupErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!fullName.trim() || fullName.trim().length < 2) {
      next.fullName = 'Please enter your full name.';
    }
    if (!email.trim()) {
      next.email = 'Please enter your email address.';
    } else if (!emailPattern.test(email.trim())) {
      next.email = 'Please enter a valid email address.';
    }
    if (!password) {
      next.password = 'Please create a password.';
    } else if (password.length < 8) {
      next.password = 'Password must be at least 8 characters long.';
    }
    if (confirmPassword !== password) {
      next.confirmPassword = 'Passwords do not match.';
    }
    if (!acceptTerms) {
      next.terms = 'Please accept the preview terms and conditions to continue.';
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      notify('error', 'Please complete all required fields.');
      return;
    }

    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      updateProfile({ name: fullName.trim(), email: email.trim() });
      notify(
        'success',
        'Account created (frontend simulation)',
        'Welcome to Bodh! Opening your local preview workspace.'
      );
      navigate('/chat');
    }, 700);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-[#080B1A] text-slate-900 dark:text-[#F8FAFC]">
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12">
        {/* Left Brand Showcase Panel */}
        <div className="hidden lg:flex lg:col-span-5 relative flex-col justify-between overflow-hidden bg-[#0A0E23] text-[#F8FAFC] p-10 xl:p-12 border-r border-slate-800/80">
          <div className="relative z-10">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Homepage</span>
            </Link>
          </div>

          <div className="relative z-10 flex flex-col items-center text-center my-auto py-8">
            <BodhLogo size="xl" showWordmark layout="stacked" />
            <p className="mt-5 text-base font-medium text-slate-200">
              Don&apos;t just get answers.
            </p>
            <p className="text-base font-semibold bodh-gradient-text">Gain understanding.</p>
            <p className="mt-4 text-xs leading-relaxed text-slate-400 max-w-xs">
              Start exploring conceptual science and mathematics through Bodh&apos;s simulated
              learning workspace.
            </p>
          </div>

          <div className="relative z-0 -mx-12 -mb-12 opacity-90">
            <AuthWaveVisual />
          </div>
        </div>

        {/* Right Signup Form Panel */}
        <div className="lg:col-span-7 flex flex-col justify-center px-4 sm:px-8 py-10">
          <div className="w-full max-w-md mx-auto">
            <div className="lg:hidden flex items-center justify-between mb-8">
              <Link to="/" aria-label="Bodh Home">
                <BodhLogo size="md" showWordmark />
              </Link>
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-[#94A3B8] hover:text-slate-900 dark:hover:text-white"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Home</span>
              </Link>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl bg-white dark:bg-[#11172B] border border-slate-200 dark:border-slate-800/90 p-6 sm:p-8 shadow-sm"
            >
              <div className="grid grid-cols-2 border-b border-slate-200 dark:border-slate-800 mb-7">
                <Link
                  to="/login"
                  className="pb-3 text-center text-sm font-medium text-slate-500 dark:text-[#94A3B8] hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  Login
                </Link>
                <span className="pb-3 text-center text-sm font-semibold text-slate-900 dark:text-[#F8FAFC] border-b-2 border-[#6366F1]">
                  Sign Up
                </span>
              </div>

              <div className="mb-6">
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-[#F8FAFC]">
                  Create Account
                </h1>
                <p className="mt-1 text-sm text-slate-500 dark:text-[#94A3B8]">
                  Set up your local preview profile to personalize Bodh Chat.
                </p>
              </div>

              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <Input
                  label="Full Name"
                  type="text"
                  autoComplete="name"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }));
                  }}
                  error={errors.fullName}
                  leftIcon={<User className="w-4 h-4" />}
                />

                <Input
                  label="Email Address"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                  }}
                  error={errors.email}
                  leftIcon={<Mail className="w-4 h-4" />}
                />

                <div>
                  <Input
                    label="Password"
                    type="password"
                    autoComplete="new-password"
                    placeholder="At least 8 characters"
                    enablePasswordToggle
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
                    }}
                    error={errors.password}
                    leftIcon={<Lock className="w-4 h-4" />}
                  />
                  {password.length > 0 && (
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex-1 grid grid-cols-3 gap-1.5">
                        {[1, 2, 3].map((level) => (
                          <span
                            key={level}
                            className={`h-1 rounded-full transition-colors ${
                              passwordStrength.score >= level
                                ? passwordStrength.score === 1
                                  ? 'bg-rose-500'
                                  : passwordStrength.score === 2
                                  ? 'bg-amber-500'
                                  : 'bg-emerald-500'
                                : 'bg-slate-200 dark:bg-slate-800'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-[11px] font-medium text-slate-500 dark:text-[#94A3B8]">
                        {passwordStrength.label}
                      </span>
                    </div>
                  )}
                </div>

                <Input
                  label="Confirm Password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Re-enter your password"
                  enablePasswordToggle
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (errors.confirmPassword)
                      setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
                  }}
                  error={errors.confirmPassword}
                  leftIcon={<Lock className="w-4 h-4" />}
                />

                <div className="space-y-1 pt-1">
                  <label className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-[#94A3B8] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={acceptTerms}
                      onChange={(e) => {
                        setAcceptTerms(e.target.checked);
                        if (errors.terms) setErrors((prev) => ({ ...prev, terms: undefined }));
                      }}
                      className="mt-0.5 w-4 h-4 accent-[#6366F1] rounded cursor-pointer shrink-0"
                    />
                    <span>
                      I agree to the{' '}
                      <button
                        type="button"
                        onClick={() => setTermsOpen(true)}
                        className="font-semibold text-[#6366F1] dark:text-[#22D3EE] hover:underline cursor-pointer"
                      >
                        Terms &amp; Conditions
                      </button>{' '}
                      for this frontend preview.
                    </span>
                  </label>
                  {errors.terms && (
                    <p role="alert" className="text-xs text-rose-500 dark:text-rose-400">
                      {errors.terms}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  fullWidth
                  size="lg"
                  loading={submitting}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Create Account
                </Button>
              </form>

              <p className="mt-6 text-center text-xs text-slate-500 dark:text-[#94A3B8]">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="font-semibold text-[#6366F1] dark:text-[#22D3EE] hover:underline"
                >
                  Login
                </Link>
              </p>

              <p className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/80 text-center text-[11px] text-slate-400 dark:text-slate-500">
                Visual-only signup screen · No account is created on any external server.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Preview Terms Dialog */}
      <Modal
        open={termsOpen}
        onClose={() => setTermsOpen(false)}
        title="Preview Terms & Privacy Summary"
        maxWidthClass="max-w-md"
      >
        <div className="space-y-3 text-xs leading-relaxed text-slate-600 dark:text-[#94A3B8]">
          <p>
            Bodh is currently running as a client-only frontend demonstration. No personal data,
            passwords, or chat transcripts are transmitted to a database or third-party AI API.
          </p>
          <p>
            Your display name and UI preferences are saved strictly in your browser&apos;s local
            storage so you can preview the personalized experience across pages.
          </p>
          <div className="pt-3 flex justify-end">
            <Button
              size="sm"
              onClick={() => {
                setAcceptTerms(true);
                setErrors((prev) => ({ ...prev, terms: undefined }));
                setTermsOpen(false);
              }}
            >
              Accept &amp; Close
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
