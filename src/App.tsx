import React from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import { NotificationProvider } from './context/NotificationContext';
import { ToastContainer } from './components/common/ToastContainer';
import { ScrollToTop } from './components/common/ScrollToTop';
import Home from './pages/Home';
import Documentation from './pages/Documentation';
import Developers from './pages/Developers';
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Chat from './pages/Chat';

function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  // Keep /docs sub-section navigation smooth without full page unmount flicker
  const routeKey = location.pathname.startsWith('/docs') ? '/docs' : location.pathname;

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={routeKey}>
        <Route
          path="/"
          element={
            <PageTransition>
              <Home />
            </PageTransition>
          }
        />
        <Route
          path="/docs"
          element={
            <PageTransition>
              <Documentation />
            </PageTransition>
          }
        />
        <Route
          path="/docs/:sectionId"
          element={
            <PageTransition>
              <Documentation />
            </PageTransition>
          }
        />
        <Route
          path="/developers"
          element={
            <PageTransition>
              <Developers />
            </PageTransition>
          }
        />
        <Route
          path="/about"
          element={
            <PageTransition>
              <About />
            </PageTransition>
          }
        />
        <Route
          path="/login"
          element={
            <PageTransition>
              <Login />
            </PageTransition>
          }
        />
        <Route
          path="/signup"
          element={
            <PageTransition>
              <Signup />
            </PageTransition>
          }
        />
        <Route
          path="/chat"
          element={
            <PageTransition>
              <Chat />
            </PageTransition>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ThemeProvider>
        <NotificationProvider>
          <BrowserRouter>
            <ScrollToTop />
            <AnimatedRoutes />
            <ToastContainer />
          </BrowserRouter>
        </NotificationProvider>
      </ThemeProvider>
    </MotionConfig>
  );
}
