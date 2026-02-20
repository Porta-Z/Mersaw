import { Shield, Target, Eye, Lock, ArrowRight, Scale } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ScrollReveal, { StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import ParticleBackground from "@/components/ParticleBackground";

const values = [
  { icon: Shield, title: "Integrity", desc: "Upholding the highest ethical standards in every engagement." },
  { icon: Target, title: "Strategy", desc: "Every case receives a meticulously crafted legal strategy." },
  { icon: Eye, title: "Precision", desc: "Attention to detail that leaves nothing to chance." },
  { icon: Lock, title: "Confidentiality", desc: "Absolute discretion in all client matters, without exception." },
];

const milestones = [
  { year: "2008", title: "Firm Founded", desc: "MERSAW Law Firm established in Alexandria with a focus on corporate law." },
  { year: "2012", title: "Regional Expansion", desc: "Expanded practice areas to include litigation, arbitration, and family law." },
  { year: "2016", title: "100+ Corporate Clients", desc: "Crossed a landmark milestone serving major businesses across Egypt." },
  { year: "2019", title: "International Partnerships", desc: "Formed strategic alliances with international legal networks." },
  { year: "2023", title: "Digital Transformation", desc: "Launched digital-first client services for faster, smarter legal support." },
];

const team = [
  { name: "Hossam Eldin", role: "Managing Partner", specialty: "Corporate & M&A" },
  { name: "Mohamed Sherif", role: "Senior Partner", specialty: "Litigation & Arbitration" },
  { name: "Amr Hassan", role: "Partner", specialty: "Real Estate Law" },
  { name: "Karim Ahmed", role: "Partner", specialty: "Family Law" },
];

const About = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-24 section-padding relative overflow-hidden min-h-[60vh] flex items-center">
        <ParticleBackground />
        
        {/* Animated mesh gradient background */}
        <div className="absolute inset-0 mesh-gradient opacity-60" />
        
        {/* Background decorations */}
        <motion.div
          className="absolute top-20 right-10 w-80 h-80 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(205,170,80,0.2) 0%, transparent 70%)" }}
          animate={{ y: [0, -30, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 left-10 w-56 h-56 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(205,170,80,0.12) 0%, transparent 70%)" }}
          animate={{ y: [0, 20, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background/80" />

        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <ScrollReveal>
            <p className="text-primary text-sm tracking-[0.25em] uppercase mb-4 font-body">About MERSAW</p>
          </ScrollReveal>
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-8">
            Built on <span className="gold-gradient-text">Trust</span>,<br />
            Driven by <span className="gold-gradient-text">Results</span>
          </h1>
          
          <div className="divider-diamond mx-auto mb-8" style={{ maxWidth: '180px' }}>
            <span>◆</span>
          </div>
          
          <ScrollReveal delay={0.2}>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
              For over a decade, MERSAW Law Firm has been the counsel of choice for discerning
              clients who demand not just legal representation, but strategic partnership.
              Based in Alexandria, Egypt, we combine rigorous legal expertise with a deep
              understanding of the commercial landscape.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Vision & Mission - Glassmorphism Cards */}
      <section className="section-padding bg-gradient-to-b from-card/30 to-card relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ScrollReveal direction="left">
              <motion.div 
                className="glass-elevated h-full relative overflow-hidden p-8 rounded-2xl" 
                whileHover={{ y: -6 }}
              >
                {/* Corner accents */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary/10 to-transparent" />
                <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-primary/5 to-transparent" />
                
                <p className="text-primary text-xs tracking-[0.25em] uppercase mb-4 font-body">Our Vision</p>
                <h3 className="font-heading text-2xl md:text-3xl font-semibold text-foreground mb-5">
                  Setting the Standard for Legal Excellence
                </h3>
                <p className="text-muted-foreground leading-relaxed text-base">
                  To be recognized as Egypt's most trusted legal institution — where innovation
                  meets tradition, and every client relationship is built on a foundation of
                  unwavering integrity and measurable results.
                </p>
              </motion.div>
            </ScrollReveal>
            <ScrollReveal direction="right" delay={0.1}>
              <motion.div 
                className="glass-elevated h-full relative overflow-hidden p-8 rounded-2xl" 
                whileHover={{ y: -6 }}
              >
                {/* Corner accents */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary/10 to-transparent" />
                <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-primary/5 to-transparent" />
                
                <p className="text-primary text-xs tracking-[0.25em] uppercase mb-4 font-body">Our Mission</p>
                <h3 className="font-heading text-2xl md:text-3xl font-semibold text-foreground mb-5">
                  Delivering Excellence Through Expertise
                </h3>
                <p className="text-muted-foreground leading-relaxed text-base">
                  To provide world-class legal services that empower our clients to achieve their goals.
                  We combine strategic insight with meticulous execution, ensuring every matter receives
                  the attention and expertise it deserves.
                </p>
              </motion.div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Values Section - Neumorphic Cards */}
      <section className="section-padding bg-gradient-to-b from-card to-card/50 relative overflow-hidden">
        <div className="container mx-auto relative z-10">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="text-primary text-sm tracking-[0.25em] uppercase mb-4 font-body">Our Core Values</p>
              <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground mb-6">
                What Defines Us
              </h2>
              <div className="divider-diamond mx-auto" style={{ maxWidth: '150px' }}>
                <span>◆</span>
              </div>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.1}>
            {values.map((value) => (
              <StaggerItem key={value.title}>
                <motion.div
                  className="neu-gold text-center p-8 group relative overflow-hidden rounded-2xl h-full"
                  whileHover={{ y: -6 }}
                >
                  {/* Background glow */}
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <motion.div
                    className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-primary/30 mb-5 group-hover:border-primary/60 transition-all relative"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="absolute inset-0 bg-primary/15 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                    <value.icon className="text-primary relative z-10" size={28} strokeWidth={1.5} />
                  </motion.div>
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-3">{value.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{value.desc}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="section-padding bg-gradient-to-b from-card/50 to-card relative overflow-hidden">
        <div className="container mx-auto relative z-10 max-w-4xl">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-primary text-sm tracking-[0.25em] uppercase mb-4 font-body">Our Journey</p>
              <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground mb-6">
                Milestones & Achievements
              </h2>
              <div className="divider-diamond mx-auto" style={{ maxWidth: '150px' }}>
                <span>◆</span>
              </div>
            </div>
          </ScrollReveal>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent" />

            {milestones.map((milestone, index) => (
              <ScrollReveal 
                key={milestone.year} 
                delay={index * 0.1}
              >
                <motion.div
                  className={`relative flex items-center mb-12 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-primary transform -translate-x-1/2 z-10">
                    <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-30" />
                  </div>
                  
                  {/* Content */}
                  <div className={`ml-12 md:ml-0 md:w-[45%] ${index % 2 === 0 ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'}`}>
                    <div className="glass-premium p-6 rounded-xl">
                      <span className="text-primary font-heading text-2xl font-bold">{milestone.year}</span>
                      <h4 className="font-heading text-lg font-semibold text-foreground mt-2 mb-2">{milestone.title}</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">{milestone.desc}</p>
                    </div>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-b from-card to-card/50 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto text-center relative z-10 max-w-3xl">
          <ScrollReveal>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground mb-6">
              Work With Our Expert Team
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-muted-foreground text-lg mb-8">
              Our experienced attorneys are ready to help you navigate your legal challenges.
              Discover how MERSAW can protect your interests.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="btn-luxury px-10 py-4 text-primary-foreground font-semibold rounded-xl inline-flex items-center gap-3"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Scale size={20} />
                <span>Book a Consultation</span>
              </motion.button>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link
                  to="/services"
                  className="btn-luxury-outline px-10 py-4 text-foreground font-medium rounded-xl inline-flex items-center gap-3"
                >
                  <span>Our Services</span>
                  <ArrowRight size={20} />
                </Link>
              </motion.div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
};

export default About;
