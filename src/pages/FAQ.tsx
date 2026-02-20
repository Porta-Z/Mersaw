import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Scale, Building2, Users, Shield, Globe, FileText, TrendingUp, Gavel, Languages, LucideIcon } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import GoldSeparator from "@/components/GoldSeparator";
import ParticleBackground from "@/components/ParticleBackground";

type Language = "ar" | "en";

interface FAQQuestion {
  question: string;
  answer: string;
}

interface FAQCategory {
  category: string;
  icon: LucideIcon;
  questions: FAQQuestion[];
}

const faqsAr: FAQCategory[] = [
  {
    category: "الأحوال الشخصية",
    icon: Users,
    questions: [
      {
        question: "ما الخدمات التي يقدمها مكتبكم في مجال الأحوال الشخصية؟",
        answer: "نقدم استشارات متعمقة في قضايا الطلاق، النفقة، حضانة الأطفال، وتقسيم التركات. نتعامل مع القضايا العابرة للحدود، بما في ذلك نزاعات الحضانة الدولية. نبحث عن الحلول الودية عند الإمكان، مع جاهزية قوية للدفاع أثناء التقاضي إذا تطلّب الأمر."
      },
      {
        question: "هل تتعاملون مع عقود الزواج من الأجانب؟",
        answer: "نعم، نتخصص في صياغة عقود الزواج التي تشمل أطرافًا أجانب، مع مراعاة القوانين المحلية والدولية لضمان صحة العقد واعتماده لدى الجهات الرسمية."
      },
      {
        question: "كيف تتعاملون مع قضايا الحضانة الدولية؟",
        answer: "لدينا خبرة واسعة في تمثيل العملاء في قضايا الحضانة العابرة للحدود، ونعمل مع شبكة من المحامين الدوليين لضمان تنفيذ الأحكام في مختلف الدول."
      }
    ]
  },
  {
    category: "التمثيل الجنائي",
    icon: Shield,
    questions: [
      {
        question: "ما أنواع القضايا الجنائية التي تتخصصون فيها؟",
        answer: "نقدم تمثيلًا قانونيًا متكاملًا في القضايا الجنائية الكبرى والمعقدة، بما في ذلك الجرائم المالية، وجرائم تقنية المعلومات، والجرائم الجسيمة. نعمل على بناء استراتيجيات دفاع دقيقة تستند إلى تحليل متعمق لوقائع القضية."
      },
      {
        question: "هل تمثلون العملاء في مراحل التحقيق؟",
        answer: "نعم، نتولى متابعة مراحل التحقيق والمحاكمة بكفاءة عالية، مع تحقيق أفضل النتائج الممكنة أمام المحاكم المصرية بمختلف درجاتها."
      }
    ]
  },
  {
    category: "تأسيس وإدارة الشركات",
    icon: Building2,
    questions: [
      {
        question: "ما الخدمات التي تقدمونها في مجال تأسيس الشركات؟",
        answer: "نوفّر دعمًا قانونيًا شاملًا لإنشاء الكيانات التجارية من البداية، مع إعداد دقيق واحترافي لجميع المستندات القانونية لضمان انطلاقة قوية ومتوافقة مع القوانين المصرية."
      },
      {
        question: "هل تقدمون خدمات إعادة الهيكلة والاندماج؟",
        answer: "نقدم استشارات قانونية متكاملة خلال عمليات إعادة الهيكلة والاندماجات والاستحواذات، بما يضمن سلاسة الإجراءات وتحقيق أقصى استفادة استراتيجية."
      },
      {
        question: "كيف تساعدون الشركات في الالتزام القانوني؟",
        answer: "نساعد الشركات على فهم واجباتها القانونية وتطبيقها بشكل سليم، مع تقديم حلول وقائية تُقلل من المخاطر وتُعزز من ثقة العملاء والشركاء."
      }
    ]
  },
  {
    category: "الملكية الفكرية",
    icon: TrendingUp,
    questions: [
      {
        question: "ما خدمات الملكية الفكرية التي تقدمونها؟",
        answer: "نقدم خدمات تسجيل العلامات التجارية وبراءات الاختراع محليًا ودوليًا، وإدارة النزاعات المتعلقة بالتعدّي على الحقوق الفكرية، وتقديم حلول استراتيجية لحماية أصول الملكية الفكرية وتعظيم قيمتها."
      }
    ]
  },
  {
    category: "التحكيم وتسوية النزاعات",
    icon: Gavel,
    questions: [
      {
        question: "ما خدماكم في مجال التحكيم؟",
        answer: "نمثل عملاءنا محليًا ودوليًا في نزاعات تجارية، إنشائية، واستثمارية. كما نقدم خدمات حل النزاعات عبر الوساطة والتحكيم لتسوية الخلافات بسرعة وكفاءة بعيدًا عن المسارات القضائية الطويلة والمكلفة."
      },
      {
        question: "هل تخططون اتفاقيات التحكيم؟",
        answer: "نعم، نُعدّ اتفاقيات تحكيم مصممة لحماية الحقوق وتقليل فرص النزاع، مع خبرة في التعامل مع قوانين التحكيم الدولية."
      }
    ]
  },
  {
    category: "التجارة الدولية",
    icon: Globe,
    questions: [
      {
        question: "ما خدمات التجارة الدولية التي تقدمونها؟",
        answer: "نقدم خدمات قانونية متكاملة في التجارة الدولية تشمل: صياغة العقود التجارية الدولية، حل النزاعات التجارية العابرة للحدود، الامتثال للمعايير والاتفاقيات الدولية، وإدارة المخاطر القانونية."
      },
      {
        question: "هل تساعدون في صياغة عقود التوريد والشراكات الدولية؟",
        answer: "نعم، نُعدّ اتفاقيات التوريد، الشراكات، والفرانشايز بدقة قانونية عملية تضمن حقوقك وتُعزّز العلاقات الدولية بثبات ووضوح."
      }
    ]
  },
  {
    category: "صياغة ومراجعة العقود",
    icon: FileText,
    questions: [
      {
        question: "ما خدمات صياغة العقود التي تقدمونها؟",
        answer: "نُعدّ العقود من الصفر بعد دراسة دقيقة لأهدافك وطبيعة العلاقة القانونية. نكتبها بلغة قانونية واضحة، وصياغات محكمة، ومرونة تتيح التنفيذ الواقعي. نشمل ذلك العقود التجارية والمدنية والشخصية، والشراكات المحلية والدولية، والعقود الابتكارية."
      },
      {
        question: "ما مميزات خدمة مراجعة العقود؟",
        answer: "نُراجع كل بند وكل شرط بعين قانونية خبيرة، نكشف الثغرات، نُقيّم التوازن بين الأطراف، ونقدم تقريرًا تفصيليًا يحتوي على تحليل الالتزامات والحقوق، وكشف المخاطر، وتوصيات عملية قبل التوقيع."
      },
      {
        question: "هل تعملون على عقود باللغة الإنجليزية؟",
        answer: "نعم، نُقدم خدمات الصياغة والمراجعة بالعربية والإنجليزية، مع ضمان توافق العقود مع النُظم القانونية المحلية والدولية."
      }
    ]
  },
  {
    category: "تحصيل الديون",
    icon: TrendingUp,
    questions: [
      {
        question: "ما خدمات تحصيل الديون التي تقدمونها؟",
        answer: "نُقدّم خدمات احترافية في تحصيل الديون التجارية والمدنية، سواء كانت شيكات مرتجعة، كمبيالات غير مدفوعة، التزامات مالية ناشئة عن عقود تجارية، أو مبالغ متعثرة بين أفراد أو شركات."
      },
      {
        question: "كيف تعملون على تحصيل الديون؟",
        answer: "نعتمد على مبدأ التدرج الذكي: نبدأ بالحلول الودية التي تحافظ على العلاقات، وإذا تعثّر الوصول إلى تسوية، نلجأ إلى إشعارات قانونية ملزمة، ثم رفع دعاوى مدنية وتجارية وتحريك إجراءات التنفيذ."
      },
      {
        question: "هل تعملون على تحصيل ديون من خارج مصر؟",
        answer: "نمتلك شبكة علاقات قانونية إقليمية ودولية تساعدنا على تحصيل الديون من جهات خارج الحدود، وفقًا للاتفاقيات والقوانين الدولية."
      }
    ]
  },
  {
    category: "لماذا تختارنا",
    icon: Scale,
    questions: [
      {
        question: "ما مميزات اختيار تحالف ميرسو والبيان؟",
        answer: "فريق قانوني من الطراز العالمي: نخبة من المحامين والمستشارين ذوي خلفيات أكاديمية ومهنية مرموقة. خبرة عميقة: سنوات من التميّز في إدارة القضايا المعقدة محليًا ودوليًا. حلول مبتكرة: نفكّر خارج الصندوق لنقدّم استراتيجيات قانونية مصممة خصيصًا لكل عميل. التزام مطلق بالنتائج: شغفنا بتحقيق أهداف عملائنا القانونية لا يتوقف."
      },
      {
        question: "كيف يمكنني التواصل معكم؟",
        answer: "يمكنكم التواصل معنا عبر: العنوان - 8 شارع كنيسة الديبانة، مربع رملة، الإسكندرية. البريد الإلكتروني - info@mersaw.net. الهاتف - 201147091999"
      }
    ]
  }
];

const faqsEn: FAQCategory[] = [
  {
    category: "Personal Status",
    icon: Users,
    questions: [
      {
        question: "What services does your office provide in personal status law?",
        answer: "We provide in-depth consultations on divorce cases, alimony, child custody, and estate distribution. We handle cross-border cases, including international custody disputes. We seek amicable solutions when possible, with strong readiness for litigation defense when needed."
      },
      {
        question: "Do you handle marriage contracts with foreigners?",
        answer: "Yes, we specialize in drafting marriage contracts involving foreign parties, taking into account local and international laws to ensure the contract's validity and recognition by official authorities."
      },
      {
        question: "How do you handle international custody cases?",
        answer: "We have extensive experience representing clients in cross-border custody matters, working with a network of international lawyers to ensure judgments are enforced in different countries."
      }
    ]
  },
  {
    category: "Criminal Defense",
    icon: Shield,
    questions: [
      {
        question: "What types of criminal cases do you specialize in?",
        answer: "We provide comprehensive legal representation in major and complex criminal cases, including financial crimes, cyber crimes, and serious offenses. We work on building precise defense strategies based on in-depth analysis of case facts."
      },
      {
        question: "Do you represent clients during investigation stages?",
        answer: "Yes, we efficiently handle investigation and trial stages, achieving the best possible results before Egyptian courts of all levels."
      }
    ]
  },
  {
    category: "Company Formation & Management",
    icon: Building2,
    questions: [
      {
        question: "What services do you provide in company formation?",
        answer: "We provide comprehensive legal support for establishing commercial entities from scratch, with accurate and professional preparation of all legal documents to ensure a strong start compliant with Egyptian laws."
      },
      {
        question: "Do you offer restructuring and merger services?",
        answer: "We provide integrated legal consultations during restructuring, merger, and acquisition operations, ensuring smooth procedures and maximum strategic benefit."
      },
      {
        question: "How do you help companies with legal compliance?",
        answer: "We help companies understand and properly apply their legal obligations, providing preventive solutions that minimize risks and enhance client and partner trust."
      }
    ]
  },
  {
    category: "Intellectual Property",
    icon: TrendingUp,
    questions: [
      {
        question: "What intellectual property services do you offer?",
        answer: "We offer trademark and patent registration services locally and internationally, managing disputes related to intellectual property infringement, and providing strategic solutions to protect and maximize intellectual property assets."
      }
    ]
  },
  {
    category: "Arbitration & Dispute Resolution",
    icon: Gavel,
    questions: [
      {
        question: "What are your arbitration services?",
        answer: "We represent our clients locally and internationally in commercial, construction, and investment disputes. We also offer dispute resolution services through mediation and arbitration to settle disagreements quickly and efficiently, away from lengthy and costly judicial paths."
      },
      {
        question: "Do you draft arbitration agreements?",
        answer: "Yes, we prepare arbitration agreements designed to protect rights and minimize dispute opportunities, with expertise in handling international arbitration laws."
      }
    ]
  },
  {
    category: "International Trade",
    icon: Globe,
    questions: [
      {
        question: "What international trade services do you offer?",
        answer: "We provide comprehensive legal services in international trade including: drafting international commercial contracts, resolving cross-border commercial disputes, compliance with international standards and agreements, and managing legal risks."
      },
      {
        question: "Do you help draft international supply and partnership contracts?",
        answer: "Yes, we prepare supply, partnership, and franchise agreements with precise legal expertise that protects your rights and strengthens international relationships with stability and clarity."
      }
    ]
  },
  {
    category: "Contract Drafting & Review",
    icon: FileText,
    questions: [
      {
        question: "What contract drafting services do you offer?",
        answer: "We prepare contracts from scratch after a thorough study of your objectives and the nature of the legal relationship. We write them in clear legal language, precise formulations, and flexibility that allows real implementation. This includes commercial, civil, and personal contracts, local and international partnerships, and innovative contracts."
      },
      {
        question: "What are the advantages of your contract review service?",
        answer: "We review every clause and condition with expert legal eyes, identify gaps, assess balance between parties, and provide a detailed report containing analysis of obligations and rights, risk identification, and practical recommendations before signing."
      },
      {
        question: "Do you work on contracts in English?",
        answer: "Yes, we offer drafting and review services in Arabic and English, ensuring contracts comply with local and international legal systems."
      }
    ]
  },
  {
    category: "Debt Collection",
    icon: TrendingUp,
    questions: [
      {
        question: "What debt collection services do you offer?",
        answer: "We provide professional services in commercial and civil debt collection, whether returned checks, unpaid promissory notes, financial obligations arising from commercial contracts, or outstanding amounts between individuals or companies."
      },
      {
        question: "How do you work on debt collection?",
        answer: "We rely on the smart gradation principle: we start with amicable solutions that preserve relationships, and if a settlement cannot be reached, we resort to binding legal notices, then file civil and commercial lawsuits and initiate enforcement procedures."
      },
      {
        question: "Do you work on collecting debts from outside Egypt?",
        answer: "We have regional and international legal relationships that help us collect debts from parties outside borders, in accordance with international agreements and laws."
      }
    ]
  },
  {
    category: "Why Choose Us",
    icon: Scale,
    questions: [
      {
        question: "What are the advantages of choosing Mersaw & El Bayan Alliance?",
        answer: "World-class legal team: An elite of lawyers and consultants with prestigious academic and professional backgrounds. Deep expertise: Years of excellence in managing complex cases locally and internationally. Innovative solutions: We think outside the box to provide legal strategies tailored to each client. Unwavering commitment to results: Our passion for achieving our clients' legal goals never stops."
      },
      {
        question: "How can I contact you?",
        answer: "You can contact us at: Address - 8 Kanisset El Debana Street, Ramla Square, Alexandria. Email - info@mersaw.net. Phone - 201147091999"
      }
    ]
  }
];

const translations = {
  ar: {
    headerTitle: "الأسئلة الشائعة",
    headerSubtitle: "اعثر على إجابة لاستفساراتك حول خدماتنا القانونية المتخصصة",
    ctaTitle: "جاهزون لمساعدتك",
    ctaText: "إذا لم تجد إجابة لسؤالك، لا تتردد في التواصل معنا. فريقنا مستعد لتقديم الاستشارات القانونية التي تحتاجها.",
    ctaButton: "تواصل معنا الآن",
    companyName: "تحالف ميرسو والبيان",
    contactTitle: "لا تتردد في التواصل معنا",
    switchToEn: "English",
    switchToAr: "العربية"
  },
  en: {
    headerTitle: "Frequently Asked Questions",
    headerSubtitle: "Find answers to your inquiries about our specialized legal services",
    ctaTitle: "Ready to Help You",
    ctaText: "If you can't find an answer to your question, don't hesitate to contact us. Our team is ready to provide the legal consultations you need.",
    ctaButton: "Contact Us Now",
    companyName: "Mersaw & El Bayan Alliance",
    contactTitle: "Don't Hesitate to Contact Us",
    switchToEn: "العربية",
    switchToAr: "English"
  }
};

const FAQItem = ({ question, answer, lang }: { question: string; answer: string; lang: Language }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isRTL = lang === "ar";

  return (
    <motion.div
      className="border-b border-amber-500/10 last:border-0"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full py-5 flex items-center justify-between group ${isRTL ? 'flex-row-reverse' : ''}`}
        aria-expanded={isOpen}
      >
        <span className={`font-heading text-base md:text-lg font-medium text-foreground group-hover:text-primary transition-colors ${isRTL ? 'text-right pl-4' : 'text-left pr-4'}`}>
          {question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="shrink-0 text-primary"
        >
          <ChevronDown size={22} />
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className={`pb-5 text-muted-foreground leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`} dir={isRTL ? "rtl" : "ltr"}>
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQ = () => {
  const [language, setLanguage] = useState<Language>("en");
  const faqs = language === "ar" ? faqsAr : faqsEn;
  const t = translations[language];
  const isRTL = language === "ar";

  const toggleLanguage = () => {
    setLanguage(prev => prev === "ar" ? "en" : "ar");
  };

  return (
    <>
      <section className="pt-32 pb-20 section-padding relative overflow-hidden">
        <ParticleBackground />
        <div className="absolute inset-0 bg-background/80 z-0" />
        
        {/* Background decorations */}
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(205,170,80,0.15) 0%, transparent 70%)" }}
          animate={{ y: [0, -20, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-48 h-48 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(205,170,80,0.1) 0%, transparent 70%)" }}
          animate={{ y: [0, 15, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          {/* Language Toggle */}
          <ScrollReveal>
            <div className="flex justify-center mb-6">
              <motion.button
                onClick={toggleLanguage}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-amber-500/10 border-2 border-amber-500/30 text-primary hover:bg-amber-500/20 hover:border-amber-500/50 transition-all font-medium shadow-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Languages size={20} />
                <span>{language === "ar" ? "English" : "العربية"}</span>
              </motion.button>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <p className="text-primary text-sm tracking-[0.2em] uppercase mb-4 font-body">{t.companyName}</p>
          </ScrollReveal>
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-6">
            {t.headerTitle}
          </h1>
          <GoldSeparator className="max-w-xs mx-auto" />
          <ScrollReveal delay={0.3}>
            <p className="text-muted-foreground text-lg leading-relaxed mt-6 max-w-2xl mx-auto">
              {t.headerSubtitle}
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding pt-0 bg-gradient-to-b from-card to-card/50 relative overflow-hidden">
        <div className="container mx-auto max-w-4xl relative z-10">
          {faqs.map((category, catIndex) => (
            <ScrollReveal key={category.category} delay={catIndex * 0.1}>
              <div className="mb-12 last:mb-0">
                <div className={`flex items-center gap-3 mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
                    {category.icon && <category.icon className="text-primary" size={24} />}
                  </div>
                  <h2 className={`font-heading text-xl md:text-2xl font-semibold text-foreground ${isRTL ? 'text-right' : 'text-left'}`}>
                    {category.category}
                  </h2>
                </div>
                <div className="card-premium">
                  {category.questions.map((faq, qIndex) => (
                    <FAQItem key={qIndex} question={faq.question} answer={faq.answer} lang={language} />
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-b from-card/50 to-card relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto max-w-2xl text-center relative z-10">
          <ScrollReveal>
            <p className="text-primary text-sm tracking-[0.2em] uppercase mb-4 font-body">{t.contactTitle}</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground mb-4">
              {t.ctaTitle}
            </h2>
          </ScrollReveal>
          <GoldSeparator className="max-w-xs mx-auto mb-6" />
          <ScrollReveal delay={0.2}>
            <p className={`text-muted-foreground mb-8 ${isRTL ? 'text-right' : 'text-left'}`} dir={isRTL ? "rtl" : "ltr"}>
              {t.ctaText}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <motion.a
              href="/contact"
              className="inline-flex items-center gap-2 gold-gradient-bg text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {t.ctaButton}
            </motion.a>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
};

export default FAQ;
