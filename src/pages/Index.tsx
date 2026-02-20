import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Scale, Shield, FileText, Users, Building2, Landmark, Gavel, Quote, ArrowRight, Star } from "lucide-react";
import ScrollReveal, { StaggerContainer, StaggerItem, TextReveal, AnimatedCounter } from "@/components/ScrollReveal";
import GoldSeparator from "@/components/GoldSeparator";
import { useState, useRef, useEffect } from "react";
import BookingModal from "@/components/BookingModal";
import ParticleBackground from "@/components/ParticleBackground";

const services = [
  { icon: Building2, title: "Corporate & Commercial Law", desc: "Comprehensive corporate governance, M&A advisory, and regulatory compliance.", size: "wide" as const },
  { icon: FileText, title: "Contracts & Legal Drafting", desc: "Precision-crafted agreements that protect your interests at every level.", size: "normal" as const },
  { icon: Gavel, title: "Arbitration & Litigation", desc: "Strategic dispute resolution with a proven track record of success.", size: "normal" as const },
  { icon: Users, title: "Family Law", desc: "Sensitive and discreet handling of family matters with empathy and expertise.", size: "normal" as const },
  { icon: Scale, title: "Debt Collection", desc: "Efficient recovery strategies that maintain professional relationships.", size: "normal" as const },
  { icon: Landmark, title: "Real Estate Law", desc: "End-to-end property transactions, title verification, and dispute resolution.", size: "wide" as const },
];

const testimonials = [
  { name: "Ahmed El-Kady", role: "CEO, Delta Holdings", text: "MERSAW provided exceptional counsel during our merger. Their strategic approach saved us months of negotiation.", rating: 5 },
  { name: "Layla Hassan", role: "CFO, Nile Ventures", text: "The team's attention to detail in contract drafting is unmatched. They anticipated risks we hadn't considered.", rating: 5 },
  { name: "Omar Fathi", role: "Real Estate Developer", text: "Professional, discreet, and highly effective. MERSAW is our trusted legal partner for all property matters.", rating: 5 },
];

const whyUs = [
  { icon: Shield, title: "Proven Track Record", desc: "Decades of combined experience across complex legal landscapes." },
  { icon: Scale, title: "Strategic Approach", desc: "Every case receives a tailored strategy designed for optimal outcomes." },
  { icon: Users, title: "Client-Centered", desc: "Your objectives drive our process. Transparent communication at every step." },
  { icon: FileText, title: "Multidisciplinary Team", desc: "Specialists across seven practice areas working in concert for you." },
];

const stats = [
  { value: 500, suffix: "+", label: "Cases Won" },
  { value: 15, suffix: "+", label: "Years Experience" },
  { value: 200, suffix: "+", label: "Corporate Clients" },
  { value: 7, suffix: "", label: "Practice Areas" },
];

// Floating orb decorative component
const FloatingOrb = ({ size, x, y, delay }: { size: number; x: string; y: string; delay: number }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{
      width: size,
      height: size,
      left: x,
      top: y,
      background: "radial-gradient(circle, rgba(205,170,80,0.15) 0%, transparent 70%)",
    }}
    animate={{
      y: [0, -20, 0, 15, 0],
      x: [0, 10, 0, -10, 0],
      scale: [1, 1.1, 1, 0.95, 1],
    }}
    transition={{
      duration: 8 + delay,
      repeat: Infinity,
      ease: "easeInOut",
      delay,
    }}
  />
);

// Animated mesh gradient background component
const AnimatedMeshGradient = () => (
  <div className="absolute inset-0 overflow-hidden">
    <motion.div
      className="absolute inset-0"
      animate={{
        backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "linear",
      }}
      style={{
        background: `
          radial-gradient(at 20% 20%, hsl(46 75% 60% / 0.15) 0%, transparent 50%),
          radial-gradient(at 80% 0%, hsl(45 65% 50% / 0.1) 0%, transparent 50%),
          radial-gradient(at 0% 50%, hsl(220 45% 15% / 0.9) 0%, transparent 50%),
          radial-gradient(at 80% 50%, hsl(46 75% 60% / 0.06) 0%, transparent 50%),
          radial-gradient(at 0% 100%, hsl(45 65% 50% / 0.08) 0%, transparent 50%),
          radial-gradient(at 80% 100%, hsl(220 50% 10% / 0.7) 0%, transparent 50%)
        `,
        backgroundSize: "200% 200%",
      }}
    />
  </div>
);

// Luxury Bento Card Component
const BentoCard = ({ 
  children, 
  className = "", 
  delay = 0,
  size = "normal" as "normal" | "large" | "wide"
}: { 
  children: React.ReactNode; 
  className?: string;
  delay?: number;
  size?: "normal" | "large" | "wide";
}) => {
  const sizeClasses = {
    normal: "",
    large: "md:col-span-2 md:row-span-2",
    wide: "md:col-span-2"
  };

  return (
    <motion.div
      className={`bento-item ${sizeClasses[size]} ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
    >
      <div className="bento-glow" />
      <div className="bento-card flex flex-col justify-between">
        {children}
      </div>
    </motion.div>
  );
};

const Index = () => {
  const [bookingOpen, setBookingOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  
  const heroImageY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  
  // Smooth scroll progress for navbar
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Mouse move handler for reactive background
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (heroRef.current) {
      const rect = heroRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMousePosition({ x, y });
    }
  };

  return (
    <>
      {/* Premium Hero Section - Ultimate Luxury Design */}
      <section 
        ref={heroRef} 
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        onMouseMove={handleMouseMove}
      >
        {/* Animated Mesh Gradient Background */}
        <AnimatedMeshGradient />
        
        {/* Mouse-Reactive Golden Orbs */}
        <motion.div
          className="absolute pointer-events-none"
          style={{
            top: '20%',
            left: '20%',
          }}
          animate={{
            x: (mousePosition.x - 50) * 0.5,
            y: (mousePosition.y - 50) * 0.3,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
        >
          <div 
            className="w-96 h-96 rounded-full"
            style={{
              background: 'radial-gradient(circle, hsl(46 75% 60% / 0.15) 0%, hsl(45 65% 50% / 0.08) 30%, transparent 70%)',
              filter: 'blur(40px)',
            }}
          />
        </motion.div>
        
        <motion.div
          className="absolute pointer-events-none"
          style={{
            bottom: '20%',
            right: '20%',
          }}
          animate={{
            x: (mousePosition.x - 50) * -0.3,
            y: (mousePosition.y - 50) * -0.4,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
        >
          <div 
            className="w-80 h-80 rounded-full"
            style={{
              background: 'radial-gradient(circle, hsl(46 75% 60% / 0.1) 0%, transparent 70%)',
              filter: 'blur(50px)',
            }}
          />
        </motion.div>

        {/* Additional ambient orbs */}
        <motion.div
          className="absolute pointer-events-none"
          style={{
            top: '60%',
            left: '70%',
          }}
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 12, repeat: Infinity }}
        >
          <div 
            className="w-48 h-48 rounded-full"
            style={{
              background: 'radial-gradient(circle, hsl(45 65% 50% / 0.06) 0%, transparent 70%)',
              filter: 'blur(30px)',
            }}
          />
        </motion.div>

        {/* Geometric Pattern Overlay */}
        <div className="absolute inset-0 geometric-pattern opacity-30" />

        {/* Particle Background - Golden Dust */}
        <ParticleBackground />

        {/* Subtle radial gradient for depth */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 80% 50% at 50% 50%, transparent 0%, hsl(220 50% 6% / 0.4) 100%)',
          }}
        />

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-background/50 via-background/30 to-background/70" />

        {/* Animated Logo - Premium entrance with enhanced glow */}
        <motion.div
          className="absolute pointer-events-none z-[2]"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            y: heroImageY,
          }}
          initial={{ opacity: 0, scale: 0.001 }}
          animate={{ 
            opacity: 0.18, 
            scale: 1,
          }}
          transition={{
            duration: 2.5,
            ease: [0.34, 1.56, 0.64, 1],
          }}
        >
          <img
            src="/logo.svg"
            alt="MERSAW Law Firm"
            className="w-[300px] md:w-[500px] lg:w-[650px]"
            style={{
              filter: 'drop-shadow(0 0 100px hsl(46 75% 60% / 1)) drop-shadow(0 0 200px hsl(45 65% 50% / 0.8))',
            }}
          />
        </motion.div>

        {/* Floating accent orbs */}
        <FloatingOrb size={250} x="5%" y="15%" delay={0} />
        <FloatingOrb size={180} x="80%" y="70%" delay={2} />
        <FloatingOrb size={120} x="70%" y="20%" delay={4} />

        {/* Content Container */}
        <motion.div 
          className="relative z-10 container mx-auto px-6 md:px-12"
          style={{ opacity: heroOpacity }}
        >
          <div className="max-w-4xl">
            {/* Location label - small and refined */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="h-px w-10 bg-primary/60" />
              <span className="text-primary/80 text-xs tracking-[0.35em] uppercase font-body font-medium">
                Alexandria, Egypt • Est. 2009
              </span>
              <span className="h-px w-10 bg-primary/60" />
            </motion.div>

            {/* Main headline - refined serif with strong value proposition */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
              className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold leading-[1.1] mb-8 text-foreground"
            >
              <span className="block">Strategic Legal</span>
              <span className="block gold-gradient-text mt-2">Excellence</span>
            </motion.h1>

            {/* Supporting paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5, ease: 'easeOut' }}
              className="text-muted-foreground/90 text-lg md:text-xl max-w-2xl mb-12 font-light leading-relaxed"
            >
              Distinguished counsel for corporations, investors, and individuals navigating Egypt's most complex legal challenges with precision and integrity.
            </motion.p>

            {/* CTA Buttons - Premium styling */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7, ease: 'easeOut' }}
              className="flex flex-col sm:flex-row gap-6 items-start sm:items-center"
            >
              {/* Primary CTA - Golden Glow with shimmer */}
              <motion.button
                onClick={() => setBookingOpen(true)}
                className="group relative overflow-hidden rounded-xl golden-glow-btn"
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Subtle glow effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-primary to-primary rounded-xl blur opacity-50 group-hover:opacity-80 transition duration-500" />
                {/* Button background */}
                <div className="relative bg-gradient-to-r from-primary via-primary to-primary rounded-xl px-10 py-4 flex items-center gap-3">
                  <Scale className="w-5 h-5 text-primary-foreground" />
                  <span className="text-primary-foreground text-base font-semibold tracking-wide">Book Consultation</span>
                </div>
              </motion.button>
              
              {/* Secondary CTA - Outline with hover effect */}
              <motion.div whileHover={{ y: -3, transition: { duration: 0.2 } }}>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-4 border border-primary/40 text-foreground px-10 py-4 rounded-xl text-base font-medium hover:bg-primary/10 hover:border-primary/60 transition-all duration-300 group micro-interaction"
                >
                  <span>Our Services</span>
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-primary"
                  >
                    <ArrowRight size={18} />
                  </motion.span>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator with elegant animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-3"
          >
            <span className="text-primary/40 text-[10px] tracking-[0.25em] uppercase">Discover</span>
            <div className="w-px h-12 bg-gradient-to-b from-primary/40 to-transparent" />
          </motion.div>
        </motion.div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background via-background/60 to-transparent z-10" />
      </section>

      {/* Stats Section - Glassmorphism Cards */}
      <section className="relative z-10 -mt-2 pb-20">
        {/* Background overlay with blur */}
        <div className="absolute inset-0 bg-background/80 backdrop-blur-md" />
        {/* Golden glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-primary/10 rounded-full blur-3xl" />
        {/* Section separator */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <div className="container mx-auto px-6 pt-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-gold-border rounded-xl p-6 text-center group hover:scale-105 transition-transform duration-300"
              >
                <div className="font-heading text-3xl md:text-4xl font-bold gold-gradient-text mb-2">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-foreground text-sm font-medium tracking-wide">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview - Elegant Design */}
      <section className="section-padding relative overflow-hidden">
        {/* Section separator */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        {/* Background overlay with blur */}
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
        {/* Golden glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-3xl" />
        <FloatingOrb size={300} x="85%" y="30%" delay={1} />
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <ScrollReveal>
            <p className="text-primary text-sm tracking-[0.25em] uppercase mb-4 font-body">About the Firm</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-8">
              A Legacy of Legal Distinction
            </h2>
          </ScrollReveal>
          <div className="divider-diamond my-8">
            <span>◆</span>
          </div>
          <ScrollReveal delay={0.2}>
            <p className="text-muted-foreground leading-relaxed text-lg md:text-xl max-w-2xl mx-auto">
              Founded in Alexandria, MERSAW Law Firm has established itself as a pillar of legal
              excellence in Egypt. Our multidisciplinary team combines deep expertise with innovative
              strategy, providing corporate and private clients with counsel that drives results.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <motion.div whileHover={{ x: 8 }} className="inline-block mt-10">
              <Link to="/about" className="inline-flex items-center gap-3 text-primary text-base font-medium hover:underline tracking-wide group">
                <span>Learn More About Us</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>

      {/* Services Section - Premium Bento Grid Layout */}
      <section className="section-padding bg-gradient-to-b from-card/30 to-card relative overflow-hidden">
        {/* Section separator */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        {/* Background overlay with blur for better readability */}
        <div className="absolute inset-0 bg-card/80 backdrop-blur-sm" />
        {/* Golden glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-3xl" />
        <FloatingOrb size={250} x="5%" y="50%" delay={3} />
        <FloatingOrb size={180} x="90%" y="20%" delay={1} />
        
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        
        {/* Gold accent lines */}
        <div className="absolute top-20 left-0 w-px h-64 bg-gradient-to-b from-transparent via-primary/10 to-transparent" />
        <div className="absolute bottom-20 right-0 w-px h-64 bg-gradient-to-b from-transparent via-primary/10 to-transparent" />
         
        <div className="container mx-auto relative z-10">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="text-primary text-sm tracking-[0.25em] uppercase mb-4 font-body">Practice Areas</p>
              <h2 className="font-heading text-4xl md:text-5xl font-semibold text-foreground mb-6">
                Our Core Services
              </h2>
              <div className="divider-diamond mx-auto" style={{ maxWidth: '200px' }}>
                <span>◆</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Bento Grid Layout */}
          <div className="bento-grid max-w-6xl mx-auto">
            {services.map((service, index) => (
              <BentoCard 
                key={service.title} 
                delay={index * 0.1}
                size={service.size}
              >
                {/* Card number indicator */}
                <div className="absolute top-4 right-4 text-primary/20 font-heading text-4xl font-bold">
                  {String(index + 1).padStart(2, '0')}
                </div>
                
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-2xl border border-primary/30 mb-6 group-hover:border-primary/60 transition-colors relative"
                  whileHover={{ rotate: 5, scale: 1.1 }}
                >
                  <div className="absolute inset-0 bg-primary/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <service.icon className="text-primary relative z-10" size={32} strokeWidth={1.5} />
                </motion.div>
                <h3 className="font-heading text-xl md:text-2xl font-semibold text-foreground mb-4 group-hover:text-primary transition-colors">{service.title}</h3>
                <p className="text-muted-foreground text-base leading-relaxed">{service.desc}</p>
              </BentoCard>
            ))}
          </div>

          <ScrollReveal delay={0.3}>
            <div className="text-center mt-16">
              <motion.div whileHover={{ x: 5 }} className="inline-block">
                <Link to="/services" className="inline-flex items-center gap-3 text-primary text-base font-medium hover:underline tracking-wide group">
                  <span>View All Services</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Why Choose Us - Neumorphic Cards */}
      <section className="section-padding relative overflow-hidden">
        {/* Section separator */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        {/* Background overlay with blur */}
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
        {/* Golden glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-3xl" />
        
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto relative z-10">
          <ScrollReveal>
            <div className="text-center mb-14">
              <p className="text-primary text-sm tracking-[0.25em] uppercase mb-4 font-body">Why MERSAW</p>
              <h2 className="font-heading text-4xl md:text-5xl font-semibold text-foreground mb-6">
                The MERSAW Difference
              </h2>
              <div className="divider-diamond mx-auto" style={{ maxWidth: '200px' }}>
                <span>◆</span>
              </div>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.1}>
            {whyUs.map((item) => (
              <StaggerItem key={item.title}>
                <motion.div
                  className="neu-gold text-center p-8 group relative overflow-hidden rounded-2xl"
                  whileHover={{ y: -6, transition: { duration: 0.3 } }}
                >
                  {/* Background glow */}
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <motion.div
                    className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-primary/30 mb-5 group-hover:border-primary/60 transition-all relative"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="absolute inset-0 bg-primary/15 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                    <item.icon className="text-primary relative z-10" size={28} strokeWidth={1.5} />
                  </motion.div>
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Testimonials - Premium Cards */}
      <section className="section-padding bg-gradient-to-b from-card/30 to-card relative overflow-hidden">
        {/* Section separator */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        {/* Background overlay with blur */}
        <div className="absolute inset-0 bg-card/80 backdrop-blur-sm" />
        {/* Golden glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-3xl" />
        <FloatingOrb size={220} x="90%" y="20%" delay={2} />
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '30px 30px' }} />
        <div className="absolute top-0 left-0 w-px h-64 bg-gradient-to-b from-transparent via-primary/10 to-transparent" />
        
        <div className="container mx-auto relative z-10">
          <ScrollReveal>
            <div className="text-center mb-14">
              <p className="text-primary text-sm tracking-[0.25em] uppercase mb-4 font-body">Testimonials</p>
              <h2 className="font-heading text-4xl md:text-5xl font-semibold text-foreground mb-6">
                Client Perspectives
              </h2>
              <div className="divider-diamond mx-auto" style={{ maxWidth: '200px' }}>
                <span>◆</span>
              </div>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto" staggerDelay={0.15}>
            {testimonials.map((t) => (
              <StaggerItem key={t.name}>
                <motion.div
                  className="glass-elevated h-full flex flex-col relative overflow-hidden p-8"
                  whileHover={{ y: -6, transition: { duration: 0.3 } }}
                >
                  {/* Corner decoration */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-primary/5 to-transparent" />
                  
                  {/* Stars */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="flex gap-1 mb-4"
                  >
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} size={16} className="fill-primary text-primary" />
                    ))}
                  </motion.div>
                  
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="relative"
                  >
                    <Quote className="text-primary/40 mb-4" size={32} />
                  </motion.div>
                  <p className="text-foreground/90 text-sm leading-relaxed flex-1 italic relative z-10">
                    "{t.text}"
                  </p>
                  <div className="mt-6 pt-4 border-t border-primary/20 flex items-center gap-3">
                    {/* Avatar placeholder */}
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/30 to-primary/30 flex items-center justify-center text-primary font-semibold text-sm border border-primary/30">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Banner - Ultimate Luxury Design */}
      <section className="elite-spacing relative overflow-hidden">
        <div className="container mx-auto relative z-10">
          <ScrollReveal direction="scale">
            <motion.div
              className="relative rounded-3xl border border-primary/20 p-10 md:p-16 text-center overflow-hidden"
              whileHover={{ boxShadow: "0 0 100px hsl(46 75% 60% / 0.25)" }}
              transition={{ duration: 0.5 }}
            >
              {/* Animated background glow */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "radial-gradient(circle at 50% 50%, hsl(46 75% 60% / 0.15) 0%, transparent 60%)",
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl -translate-x-20 -translate-y-20" />
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl translate-x-20 translate-y-20" />
              <div className="absolute top-1/2 left-0 w-px h-40 bg-gradient-to-b from-transparent via-primary/20 to-transparent" />
              <div className="absolute top-1/2 right-0 w-px h-40 bg-gradient-to-b from-transparent via-primary/20 to-transparent" />
              
              {/* Corner brackets */}
              <div className="absolute top-8 left-8 w-12 h-12 border-l-2 border-t-2 border-primary/30 rounded-tl-lg" />
              <div className="absolute top-8 right-8 w-12 h-12 border-r-2 border-t-2 border-primary/30 rounded-tr-lg" />
              <div className="absolute bottom-8 left-8 w-12 h-12 border-l-2 border-b-2 border-primary/30 rounded-bl-lg" />
              <div className="absolute bottom-8 right-8 w-12 h-12 border-r-2 border-b-2 border-primary/30 rounded-br-lg" />
               
              <div className="relative z-10">
                <ScrollReveal delay={0.1}>
                  <h2 className="font-heading text-3xl md:text-5xl font-semibold text-foreground mb-6">
                    Ready to Discuss Your Legal Needs?
                  </h2>
                </ScrollReveal>
                <ScrollReveal delay={0.2}>
                  <p className="text-muted-foreground max-w-xl mx-auto mb-10 text-lg">
                    Schedule a confidential consultation with our expert team. We'll provide a clear
                    assessment and strategic roadmap for your matter.
                  </p>
                </ScrollReveal>
                <ScrollReveal delay={0.3}>
                  <motion.button
                    onClick={() => setBookingOpen(true)}
                    className="relative group overflow-hidden rounded-xl golden-glow-btn micro-interaction"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {/* Button glow */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-primary to-primary rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-500" />
                    {/* Button content */}
                    <div className="relative px-10 py-4 gold-gradient-bg rounded-xl flex items-center gap-3">
                      <Scale className="w-5 h-5 text-primary-foreground" />
                      <span className="text-primary-foreground text-base font-bold tracking-wide">Schedule a Consultation</span>
                    </div>
                  </motion.button>
                </ScrollReveal>
              </div>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>

      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  );
};

export default Index;
