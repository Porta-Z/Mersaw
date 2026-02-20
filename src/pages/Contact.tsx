import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Linkedin, Send, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import GoldSeparator from "@/components/GoldSeparator";
import ParticleBackground from "@/components/ParticleBackground";
import { useToast } from "@/components/ui/use-toast";

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate form submission - Replace with actual email service
    // Options: Formspree, EmailJS, SendGrid, or custom backend
    try {
      // Example with Formspree: await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubmitted(true);
      toast({
        title: "Message Sent Successfully",
        description: "We'll respond within one business day.",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Error Sending Message",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="pt-32 pb-20 section-padding relative overflow-hidden">
        <ParticleBackground />
        <div className="absolute inset-0 bg-background/80 z-0" />
        
        {/* Background decorations */}
        <motion.div
          className="absolute top-20 right-10 w-64 h-64 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(205,170,80,0.15) 0%, transparent 70%)" }}
          animate={{ y: [0, -20, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 left-10 w-48 h-48 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(205,170,80,0.1) 0%, transparent 70%)" }}
          animate={{ y: [0, 15, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <ScrollReveal>
            <p className="text-primary text-sm tracking-[0.2em] uppercase mb-4 font-body">Get in Touch</p>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
              Contact <span className="gold-gradient-text">MERSAW</span>
            </h1>
            <GoldSeparator className="max-w-xs mx-auto" />
            <p className="text-muted-foreground text-lg leading-relaxed mt-6 max-w-2xl mx-auto">
              We welcome the opportunity to discuss how MERSAW can serve your legal needs.
              Reach out to schedule a confidential consultation.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding pt-0 bg-gradient-to-b from-card to-card/50 relative overflow-hidden">

        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Form */}
            <ScrollReveal>
              <div className="card-premium relative overflow-hidden">
                {/* Gold corner decoration */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-amber-500/10 to-transparent" />
                
                {submitted ? (
                  <div className="text-center py-12">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4"
                    >
                      <CheckCircle className="text-green-500" size={32} />
                    </motion.div>
                    <h3 className="font-heading text-2xl text-foreground mb-2">Message Sent!</h3>
                    <p className="text-muted-foreground mb-4">Thank you for contacting us. We'll respond within one business day.</p>
                    <button
                      onClick={() => { setSubmitted(false); setFormData({ name: "", email: "", phone: "", message: "" }); }}
                      className="text-primary hover:underline text-sm"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label htmlFor="name" className="text-sm text-foreground mb-1.5 block">Full Name</label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full rounded-md border border-amber-500/20 bg-muted px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="text-sm text-foreground mb-1.5 block">Email</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full rounded-md border border-amber-500/20 bg-muted px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="text-sm text-foreground mb-1.5 block">Phone</label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full rounded-md border border-amber-500/20 bg-muted px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
                        placeholder="+20 1XX XXX XXXX"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="text-sm text-foreground mb-1.5 block">Message</label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        required
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full rounded-md border border-amber-500/20 bg-muted px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all resize-none"
                        placeholder="How can we help you?"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full gold-gradient-bg text-primary-foreground py-3 rounded-md font-semibold text-sm hover:opacity-90 transition-opacity relative overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {loading ? (
                          <>
                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send size={16} />
                            Send Message
                          </>
                        )}
                      </span>
                      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  </form>
                )}
              </div>
            </ScrollReveal>

            {/* Info + Map */}
            <ScrollReveal delay={0.15}>
              <div className="space-y-6">
                <div className="card-premium relative overflow-hidden">
                  {/* Gold corner decoration */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-amber-500/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-amber-500/5 to-transparent" />
                  
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-5">Office Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="text-primary shrink-0 mt-0.5" size={18} />
                      <div>
                        <p className="text-sm text-foreground">Alexandria, Egypt</p>
                        <p className="text-xs text-muted-foreground">Smouha District</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="text-primary shrink-0 mt-0.5" size={18} />
                      <p className="text-sm text-foreground">+20 3 XXX XXXX</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Mail className="text-primary shrink-0 mt-0.5" size={18} />
                      <p className="text-sm text-foreground">info@mersawlaw.com</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="text-primary shrink-0 mt-0.5" size={18} />
                      <div>
                        <p className="text-sm text-foreground">Sun – Thu: 9:00 AM – 5:00 PM</p>
                        <p className="text-xs text-muted-foreground">Fri – Sat: Closed</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Linkedin className="text-primary shrink-0 mt-0.5" size={18} />
                      <a href="#" className="text-sm text-primary hover:underline">MERSAW on LinkedIn</a>
                    </div>
                  </div>
                </div>

                {/* Map */}
                <div className="rounded-lg overflow-hidden border border-amber-500/20 h-64 relative">
                  {/* Gold border glow */}
                  <div className="absolute inset-0 rounded-lg ring-1 ring-amber-500/20" />
                  <iframe
                    title="MERSAW Law Firm Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d109352.15385746522!2d29.84159!3d31.2156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f5c49126710fd3%3A0xb4e0cda629ee6bb7!2sAlexandria%2C%20Egypt!5e0!3m2!1sen!2sus!4v1700000000000"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
