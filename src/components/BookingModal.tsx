import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Scale } from "lucide-react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookingModal = ({ isOpen, onClose }: BookingModalProps) => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Enhanced dark overlay with blur */}
          <div className="absolute inset-0 bg-background/90 backdrop-blur-md" />
          
          {/* Golden glow behind modal */}
          <motion.div
            className="absolute pointer-events-none"
            style={{
              width: '500px',
              height: '500px',
              background: 'radial-gradient(circle, rgba(255, 215, 0, 0.15) 0%, rgba(212, 175, 55, 0.08) 40%, transparent 70%)',
              filter: 'blur(30px)',
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
            className="relative z-10 w-full max-w-lg rounded-lg border border-amber-500/30 bg-card/95 backdrop-blur-xl p-8 shadow-2xl shadow-amber-500/20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Enhanced gold corner decorations */}
            <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-amber-500/20 to-transparent rounded-tl-lg" />
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-amber-500/20 to-transparent rounded-tr-lg" />
            <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-amber-500/15 to-transparent rounded-bl-lg" />
            <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-amber-500/15 to-transparent rounded-br-lg" />
            
            {/* Inner glow border */}
            <div className="absolute inset-0 rounded-lg border border-amber-500/10 pointer-events-none" />
            
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-amber-500/10 rounded-full"
            >
              <X size={20} />
            </button>

            {submitted ? (
              <div className="text-center py-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-500/20 mb-4"
                >
                  <Scale className="text-primary w-8 h-8" />
                </motion.div>
                <h3 className="font-heading text-2xl gold-gradient-text mb-2">Thank You</h3>
                <p className="text-muted-foreground">We'll be in touch within 24 hours.</p>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                    <Scale className="text-primary w-5 h-5" />
                  </div>
                  <h3 className="font-heading text-2xl gold-gradient-text">Book a Consultation</h3>
                </div>
                <p className="text-muted-foreground text-sm mb-6">
                  Schedule a confidential meeting with our legal team.
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    required
                    className="w-full rounded-md border border-amber-500/20 bg-muted/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    required
                    className="w-full rounded-md border border-amber-500/20 bg-muted/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full rounded-md border border-amber-500/20 bg-muted/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
                  />
                  <select
                    className="w-full rounded-md border border-amber-500/20 bg-muted/50 px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
                    defaultValue=""
                  >
                    <option value="" disabled>Select Service</option>
                    <option>Corporate & Commercial Law</option>
                    <option>Contracts & Legal Drafting</option>
                    <option>Arbitration & Litigation</option>
                    <option>Family Law</option>
                    <option>Debt Collection</option>
                    <option>Intellectual Property</option>
                    <option>Real Estate Law</option>
                  </select>
                  <textarea
                    placeholder="Brief description of your matter"
                    rows={3}
                    className="w-full rounded-md border border-amber-500/20 bg-muted/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all resize-none"
                  />
                  <motion.button
                    type="submit"
                    className="w-full gold-gradient-bg text-primary-foreground py-3.5 rounded-md font-semibold text-sm relative overflow-hidden group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="relative z-10">Request Consultation</span>
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {/* Button glow */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 rounded-md blur opacity-30 group-hover:opacity-50 transition duration-300" />
                  </motion.button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;
