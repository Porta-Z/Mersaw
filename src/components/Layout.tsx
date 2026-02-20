import { useState, useEffect, lazy, Suspense } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Scale } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedLuxuryLogo from "./AnimatedLuxuryLogo";

// Lazy load BookingModal - only loads when needed
const BookingModal = lazy(() => import("./BookingModal"));

// Loading fallback
const ModalLoader = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-amber-500"></div>
  </div>
);
import ParticleBackground from "./ParticleBackground";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
];

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col relative">
      <ParticleBackground />
      
      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        className="skip-link"
      >
        Skip to main content
      </a>
      
      {/* Navbar - Enhanced Glassmorphism with Premium Animations */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-700 ${
          scrolled ? "nav-solid" : "nav-glass"
        }`}
      >
        {/* Animated golden top accent line */}
        <motion.div 
          className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent"
          animate={{
            opacity: scrolled ? [0.3, 0.6, 0.3] : [0.5, 1, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        <div className="container mx-auto flex items-center justify-between h-16 md:h-20 px-4">
          {/* Animated Luxury Logo - Fixed in navbar, no parallax */}
          <AnimatedLuxuryLogo size="md" disableParallax={true} />

          {/* Desktop nav with premium hover effects */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium tracking-wide transition-all duration-300 relative group py-1 ${
                  location.pathname === link.to ? "text-primary" : "text-foreground/80 hover:text-primary"
                }`}
              >
                <motion.span
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  {link.label}
                </motion.span>
                {/* Animated underline with gold gradient */}
                <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary via-primary to-primary transform origin-left transition-transform duration-300 ${
                  location.pathname === link.to ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                }`} />
              </Link>
            ))}
            {/* Enhanced Book Consultation Button with Golden Glow */}
            <motion.button
              onClick={() => setBookingOpen(true)}
              className="relative group overflow-hidden rounded-lg golden-glow-btn"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Button background */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary to-primary rounded-lg" />
              {/* Shimmer effect */}
              <div className="absolute inset-0 overflow-hidden rounded-lg">
                <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:left-[100%] transition-transform duration-700" />
              </div>
              {/* Button content */}
              <div className="relative px-7 py-2.5 flex items-center gap-2">
                <Scale className="w-4 h-4" />
                <span className="text-sm font-bold tracking-wide text-primary-foreground">
                  Book Consultation
                </span>
              </div>
            </motion.button>
          </nav>

          {/* Mobile toggle with premium styling */}
          <button
            className="md:hidden text-foreground p-2 hover:bg-amber-500/10 rounded-lg transition-colors border border-transparent hover:border-amber-500/30 touch-manipulation relative"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
          >
            <motion.div
              animate={{ rotate: mobileOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {mobileOpen ? <X size={28} /> : <Menu size={28} />}
            </motion.div>
          </button>
        </div>

        {/* Mobile nav with slide and fade animation */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.nav
              id="mobile-nav"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden border-t border-border/50 bg-card/95 backdrop-blur-xl overflow-hidden"
            >
              <div className="container mx-auto py-4 px-4 flex flex-col gap-2">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, ease: "easeOut" }}
                  >
                    <Link
                      to={link.to}
                      onClick={() => setMobileOpen(false)}
                      className={`block text-base font-medium py-4 px-4 rounded-lg transition-all duration-300 min-h-[52px] flex items-center ${
                        location.pathname === link.to 
                          ? "text-primary bg-primary/10" 
                          : "text-foreground/80 hover:text-primary hover:bg-white/5"
                      }`}
                    >
                      <motion.span
                        whileTap={{ scale: 0.98 }}
                        className="w-full"
                      >
                        {link.label}
                      </motion.span>
                    </Link>
                  </motion.div>
                ))}
                {/* Mobile CTA - Golden Glow */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navLinks.length * 0.05 }}
                  className="pt-2"
                >
                  <motion.button
                    onClick={() => { setBookingOpen(true); setMobileOpen(false); }}
                    className="w-full relative group overflow-hidden min-h-[52px] rounded-lg golden-glow-btn"
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary to-primary rounded-lg" />
                    <div className="relative px-6 py-3 flex items-center justify-center gap-2">
                      <Scale className="w-5 h-5" />
                      <span className="text-base font-bold tracking-wide text-primary-foreground">
                        Book Consultation
                      </span>
                    </div>
                  </motion.button>
                </motion.div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content with Smooth Page Transitions */}
      <main id="main-content" className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer with Premium Glassmorphism */}
      <footer className="border-t border-amber-500/20 bg-gradient-to-b from-card to-card/80 relative overflow-hidden">
        {/* Decorative gold elements with subtle animations */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/60 to-transparent" />
        <motion.div 
          className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl pointer-events-none"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.3, 0.4, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        />
        
        <div className="container mx-auto px-4 py-12 md:py-16 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src="/logo.svg" 
                  alt="MERSAW Law Firm" 
                  className="h-10 w-auto"
                />
              </div>
              <p className="text-muted-foreground text-sm mt-3 leading-relaxed">
                Strategic legal counsel delivering measurable results for businesses and individuals across Egypt.
              </p>
              {/* Social Links with Gold Accents */}
              <div className="flex gap-4 mt-6">
                <a href="#" className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500/10 to-yellow-500/10 flex items-center justify-center text-muted-foreground hover:text-amber-500 hover:from-amber-500/20 hover:to-yellow-500/20 transition-all duration-300 border border-amber-500/20 hover:border-amber-500/50">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500/10 to-yellow-500/10 flex items-center justify-center text-muted-foreground hover:text-amber-500 hover:from-amber-500/20 hover:to-yellow-500/20 transition-all duration-300 border border-amber-500/20 hover:border-amber-500/50">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500/10 to-yellow-500/10 flex items-center justify-center text-muted-foreground hover:text-amber-500 hover:from-amber-500/20 hover:to-yellow-500/20 transition-all duration-300 border border-amber-500/20 hover:border-amber-500/50">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-foreground tracking-wide uppercase mb-4 relative inline-block">
                Quick Links
                <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-amber-500 to-yellow-500" />
              </h4>
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link key={link.to} to={link.to} className="text-sm text-muted-foreground hover:text-amber-500 hover:translate-x-1 transition-all duration-300">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-foreground tracking-wide uppercase mb-4 relative inline-block">
                Services
                <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-amber-500 to-yellow-500" />
              </h4>
              <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                <Link to="/services" className="hover:text-amber-500 cursor-pointer transition-colors">Corporate Law</Link>
                <Link to="/services" className="hover:text-amber-500 cursor-pointer transition-colors">Litigation</Link>
                <Link to="/services" className="hover:text-amber-500 cursor-pointer transition-colors">Real Estate</Link>
                <Link to="/services" className="hover:text-amber-500 cursor-pointer transition-colors">Family Law</Link>
                <Link to="/faq" className="hover:text-amber-500 cursor-pointer transition-colors">FAQ</Link>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-foreground tracking-wide uppercase mb-4 relative inline-block">
                Contact
                <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-amber-500 to-yellow-500" />
              </h4>
              <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  Alexandria, Egypt
                </span>
                <span className="flex items-center gap-2 hover:text-amber-500 cursor-pointer transition-colors">
                  <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  info@mersawlaw.com
                </span>
                <span className="flex items-center gap-2 hover:text-amber-500 cursor-pointer transition-colors">
                  <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  +20 3 XXX XXXX
                </span>
              </div>
            </div>
          </div>

          <div className="gold-line mt-12 mb-6" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} <span className="text-foreground font-semibold">MERSAW Law Firm</span>. All rights reserved.
            </p>
            <div className="flex gap-6 text-xs">
              <Link to="/privacy" className="text-muted-foreground hover:text-amber-500 transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="text-muted-foreground hover:text-amber-500 transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>

      <Suspense fallback={null}>
        <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
      </Suspense>
    </div>
  );
};

export default Layout;
