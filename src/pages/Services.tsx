import { useState } from "react";
import { Building2, FileText, Gavel, Users, Scale, Landmark, Lightbulb, ChevronDown, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal, { StaggerContainer, StaggerItem, TextReveal } from "@/components/ScrollReveal";
import ParticleBackground from "@/components/ParticleBackground";

const services = [
  {
    icon: Building2, title: "Corporate & Commercial Law",
    desc: "Full-spectrum corporate legal services for businesses of all sizes.",
    details: "We advise on company formation, shareholder agreements, joint ventures, mergers & acquisitions, corporate governance, regulatory compliance, and commercial transactions. Our team ensures your business operations are legally sound at every stage of growth.",
  },
  {
    icon: FileText, title: "Contracts & Legal Drafting",
    desc: "Precision-crafted legal documents that safeguard your interests.",
    details: "From employment contracts to complex multi-party agreements, our drafting team produces clear, enforceable documents. We review, negotiate, and draft contracts that minimize risk and maximize protection for our clients.",
  },
  {
    icon: Gavel, title: "Arbitration & Litigation",
    desc: "Strategic dispute resolution with a proven winning record.",
    details: "Whether through negotiation, mediation, arbitration, or courtroom litigation, we pursue the most effective resolution for every dispute. Our litigators have represented clients in Egypt's highest courts and international arbitration tribunals.",
  },
  {
    icon: Users, title: "Family Law",
    desc: "Compassionate counsel for life's most personal legal matters.",
    details: "We handle divorce, custody, inheritance, and personal status matters with sensitivity and discretion. Our family law team understands the emotional complexity of these cases and works to achieve fair, sustainable outcomes.",
  },
  {
    icon: Scale, title: "Debt Collection",
    desc: "Efficient recovery strategies that maintain professional integrity.",
    details: "Our debt recovery practice combines legal rigour with commercial pragmatism. We help creditors recover outstanding debts through demand letters, negotiation, and legal proceedings while preserving business relationships where possible.",
  },
  {
    icon: Landmark, title: "Real Estate Law",
    desc: "Comprehensive property transactions and dispute resolution.",
    details: "From title verification and due diligence to property registration and dispute resolution, we provide end-to-end legal support for residential and commercial real estate transactions across Egypt.",
  },
  {
    icon: Lightbulb, title: "Intellectual Property",
    desc: "Protecting your innovations, brands, and creative assets.",
    details: "We register and defend trademarks, patents, copyrights, and trade secrets. Our IP team helps clients build and protect their intellectual property portfolios through strategic registration, licensing, and enforcement.",
  },
];

// Premium Bento Card Component for Services Page
const BentoCardService = ({ service, index }: { service: typeof services[0]; index: number }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      className="bento-item"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
    >
      <div className="bento-glow" />
      <div className="bento-card">
        {/* Number indicator */}
        <div className="absolute top-6 right-6 text-primary/15 font-heading text-5xl font-bold">
          {String(index + 1).padStart(2, '0')}
        </div>

        {/* Glow effects */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl transform translate-x-16 -translate-y-16 group-hover:translate-x-8 group-hover:-translate-y-8 transition-transform duration-500" />
        
        <motion.div
          className="inline-flex items-center justify-center w-16 h-16 rounded-2xl border border-primary/30 mb-6 group-hover:border-primary/60 transition-colors relative"
          whileHover={{ rotate: 5, scale: 1.1 }}
        >
          <div className="absolute inset-0 bg-primary/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
          <service.icon className="text-primary relative z-10" size={32} strokeWidth={1.5} />
        </motion.div>
        
        <h3 className="font-heading text-xl md:text-2xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">{service.title}</h3>
        <p className="text-muted-foreground text-base leading-relaxed mb-6">{service.desc}</p>

        <motion.button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-2 text-primary text-sm font-medium transition-all group"
          whileHover={{ x: 3 }}
        >
          <span>{expanded ? 'Show Less' : 'Learn More'}</span>
          <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <ChevronDown size={16} />
          </motion.span>
        </motion.button>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="pt-6 mt-6 border-t border-primary/20">
                <p className="text-muted-foreground text-base leading-relaxed">{service.details}</p>
                
                {/* CTA link */}
                <motion.div 
                  className="mt-6 flex items-center gap-2 text-primary"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="text-sm font-medium">Contact us about this service</span>
                  <ArrowRight size={16} />
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const Services = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-24 section-padding relative overflow-hidden min-h-[60vh] flex items-center">
        <ParticleBackground />
        
        {/* Animated mesh gradient background */}
        <div className="absolute inset-0 mesh-gradient opacity-60" />
        
        {/* Background decorations */}
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(205,170,80,0.2) 0%, transparent 70%)" }}
          animate={{ y: [0, -30, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-56 h-56 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(205,170,80,0.12) 0%, transparent 70%)" }}
          animate={{ y: [0, 20, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background/80" />

        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <ScrollReveal>
            <p className="text-primary text-sm tracking-[0.25em] uppercase mb-4 font-body">Practice Areas</p>
          </ScrollReveal>
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-8">
            <span className="gold-gradient-text">Legal Services</span>
          </h1>
          
          <div className="divider-diamond mx-auto mb-8" style={{ maxWidth: '180px' }}>
            <span>◆</span>
          </div>
          
          <ScrollReveal delay={0.3}>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
              MERSAW offers a comprehensive range of legal services, each delivered with the
              strategic precision and professional excellence our clients expect.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Services Grid - Bento Layout */}
      <section className="section-padding pt-0 bg-gradient-to-b from-card/30 to-card relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '30px 30px' }} />
        
        <div className="container mx-auto relative z-10">
          {/* Bento Grid Layout */}
          <div className="bento-grid max-w-6xl mx-auto">
            {services.map((service, i) => (
              <BentoCardService key={service.title} service={service} index={i} />
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
              Need Legal Assistance?
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-muted-foreground text-lg mb-8">
              Our team of experienced attorneys is ready to help you navigate your legal challenges.
              Schedule a consultation today.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <motion.button
              className="btn-luxury px-10 py-4 text-primary-foreground font-semibold rounded-xl inline-flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Scale size={20} />
              <span>Book a Consultation</span>
            </motion.button>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
};

export default Services;
