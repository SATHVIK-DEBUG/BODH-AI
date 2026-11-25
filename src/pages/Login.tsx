import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, ArrowLeft } from 'lucide-react';
import { BodhLogo } from '../components/common/BodhLogo';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { AuthWaveVisual } from '../components/auth/AuthWaveVisual';
import { useNotification } from '../context/NotificationContext';
import { useTheme } from '../context/ThemeContext';

export default function Login() {
  const navigate = useNavigate();
  const { notify } = useNotification();
  const { updateProfile } = useTheme();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [forgotOpen, setForgotOpen] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState('');

  const validate = () => {
    const nextErrors: { email?: string; password?: string } = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      nextErrors.email = 'Please enter your email address.';
    } else if (!emailPattern.test(email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }

    if (!password) {
      nextErrors.password = 'Please enter your password.';
    } else if (password.length < 6) {
      nextErrors.password = 'Password must be at least 6 characters.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      notify('error', 'Please review the highlighted fields.');
      return;
    }

    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      // Simulated error trigger for testing error feedback if user types "error@..."
      if (email.trim().toLowerCase().startsWith('error@')) {
        notify(
          'error',
          'Simulated sign-in error',
          'This demo triggers an error state for addresses starting with "error@".'
        );
        return;
      }

      const derivedName = email.trim().split('@')[0].replace(/[._-]+/g, ' ');
      const formattedName =
        derivedName
          .split(' ')
          .filter(Boolean)
          .map((w) => w[0].toUpperCase() + w.slice(1))
          .join(' ') || 'Learner';

      updateProfile({ name: formattedName, email: email.trim() });
      notify(
        'success',
        'Logged in (frontend simulation)',
        'Redirecting you to the Bodh Chat workspace.'
      );
      navigate('/chat');
    }, 650);
  };

  const handleSimulatedProvider = () => {
    notify(
      'info',
      'Visual-only preview button',
      'External OAuth sign-in is disabled in this frontend-only build.'
    );
  };

  const handleRecoverySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recoveryEmail.trim() || !recoveryEmail.includes('@')) {
      notify('error', 'Enter a valid email to preview recovery feedback.');
      return;
    }
    setForgotOpen(false);
    setRecoveryEmail('');
    notify(
      'info',
      'Password recovery simulated',
      'No email was sent—authentication is visual-only in this preview.'
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-[#080B1A] text-slate-900 dark:text-[#F8FAFC]">
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12">
        {/* Left Brand Showcase Panel (matching approved Bodh reference sheet) */}
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
              Frontend authentication preview. No real credentials are transmitted or stored on any
              server.
            </p>
          </div>

          <div className="relative z-0 -mx-12 -mb-12 opacity-90">
            <AuthWaveVisual />
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="lg:col-span-7 flex flex-col justify-center px-4 sm:px-8 py-10">
          <div className="w-full max-w-md mx-auto">
            {/* Mobile back & brand header */}
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
              {/* Login / Sign Up Top Switcher matching approved reference */}
              <div className="grid grid-cols-2 border-b border-slate-200 dark:border-slate-800 mb-7">
                <span className="pb-3 text-center text-sm font-semibold text-slate-900 dark:text-[#F8FAFC] border-b-2 border-[#6366F1]">
                  Login
                </span>
                <Link
                  to="/signup"
                  className="pb-3 text-center text-sm font-medium text-slate-500 dark:text-[#94A3B8] hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  Sign Up
                </Link>
              </div>

              <div className="mb-6">
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-[#F8FAFC]">
                  Welcome Back
                </h1>
                <p className="mt-1 text-sm text-slate-500 dark:text-[#94A3B8]">
                  Continue your learning journey with Bodh.
                </p>
              </div>

              <form onSubmit={handleSubmit} noValidate className="space-y-4">
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

                <Input
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  enablePasswordToggle
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
                  }}
                  error={errors.password}
                  leftIcon={<Lock className="w-4 h-4" />}
                />

                <div className="flex items-center justify-between gap-3 pt-1">
                  <label className="inline-flex items-center gap-2 text-xs text-slate-600 dark:text-[#94A3B8] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 accent-[#6366F1] rounded cursor-pointer"
                    />
                    <span>Remember Me</span>
                  </label>

                  <button
                    type="button"
                    onClick={() => setForgotOpen(true)}
                    className="text-xs font-medium text-[#6366F1] dark:text-[#818CF8] hover:underline cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                </div>

                <Button
                  type="submit"
                  fullWidth
                  size="lg"
                  loading={submitting}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                  className="mt-2"
                >
                  Login
                </Button>
              </form>

              <div className="my-6 flex items-center gap-3 text-xs text-slate-400 dark:text-slate-500">
                <span className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
                <span>OR</span>
                <span className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
              </div>

              <Button
                type="button"
                variant="secondary"
                fullWidth
                size="md"
                onClick={handleSimulatedProvider}
              >
                Continue with Google (Preview)
              </Button>

              <p className="mt-6 text-center text-xs text-slate-500 dark:text-[#94A3B8]">
                Don&apos;t have an account?{' '}
                <Link
                  to="/signup"
                  className="font-semibold text-[#6366F1] dark:text-[#22D3EE] hover:underline"
                >
                  Sign Up
                </Link>
              </p>

              <p className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/80 text-center text-[11px] text-slate-400 dark:text-slate-500">
                Visual-only UI preview · No live authentication backend is connected.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Simulated Forgot Password Dialog */}
      <Modal
        open={forgotOpen}
        onClose={() => setForgotOpen(false)}
        title="Password Recovery Preview"
        description="This frontend build does not send real reset emails or store user passwords."
        maxWidthClass="max-w-md"
      >
        <form onSubmit={handleRecoverySubmit} className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            value={recoveryEmail}
            onChange={(e) => setRecoveryEmail(e.target.value)}
            leftIcon={<Mail className="w-4 h-4" />}
          />
          <div className="flex justify-end gap-2.5 pt-1">
            <Button variant="secondary" size="sm" onClick={() => setForgotOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" size="sm">
              Simulate Recovery
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
