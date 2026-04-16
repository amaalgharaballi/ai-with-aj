// Drop this file at: lib/site.ts
// Single source of truth for all instructor/content data. Every component reads from here.
// When cousin confirms real pricing / dates / tools, update here — not inside components.

export const SITE = {
  instructor: {
    nameAr: "م. عبداللطيف الغربللي",
    nameEn: "Eng. Abdullatif Al-Gharballi",
    titleAr: "مهندس في شركة نفط الكويت · مدرّب معتمد في صناعة المحتوى بالذكاء الاصطناعي",
    titleEn: "KOC Engineer · Certified AI Content Creation Trainer",
    ig: "ai.with.aj",
    igUrl: "https://instagram.com/ai.with.aj",
  },

  // wa.me format: digits only, no +, no spaces, no dashes.
  whatsapp: "96599899499",

  stats: [
    { valueAr: "+٦٥٠", valueEn: "650+", labelAr: "متدرب", labelEn: "trainees" },
    { valueAr: "٩", valueEn: "9", labelAr: "ساعات تدريب", labelEn: "training hours" },
    { valueAr: "٥", valueEn: "5", labelAr: "جهات اعتماد", labelEn: "accreditations" },
  ],

  cohort: {
    // Update when cousin confirms the next cohort publicly.
    startIso: "2026-04-26T18:00:00+03:00", // Kuwait time
    endIso: "2026-04-28T21:00:00+03:00",
    labelAr: "٢٦–٢٨ أبريل ٢٠٢٦",
    labelEn: "April 26–28, 2026",
    venueAr: "فندق أرابيلا البدع · قاعة ليان",
    venueEn: "Arabella Beach Hotel · Layan Hall",
    cityAr: "الكويت",
    cityEn: "Kuwait",
  },

  // Placeholder pricing — confirm with cousin, then swap.
  tiers: [
    {
      id: "early-bird",
      nameAr: "الحجز المبكر",
      nameEn: "Early Bird",
      price: 75,
      currency: "KWD",
      seatsLeft: 10, // static — cousin edits manually
      isHighlighted: true,
      featuresAr: [
        "حضور الورشة الكاملة (٩ ساعات)",
        "دليل PDF شامل بكل الأدوات",
        "شهادة إتمام معتمدة",
        "وصول لمجموعة واتساب خاصة",
      ],
      featuresEn: [
        "Full 9-hour workshop access",
        "Comprehensive PDF guide (all tools)",
        "Accredited completion certificate",
        "Private WhatsApp community",
      ],
    },
    {
      id: "standard",
      nameAr: "السعر الكامل",
      nameEn: "Standard",
      price: 90,
      currency: "KWD",
      isHighlighted: false,
      featuresAr: [
        "حضور الورشة الكاملة (٩ ساعات)",
        "دليل PDF شامل بكل الأدوات",
        "شهادة إتمام معتمدة",
        "وصول لمجموعة واتساب خاصة",
        "جلسة أسئلة وأجوبة خاصة",
      ],
      featuresEn: [
        "Full 9-hour workshop access",
        "Comprehensive PDF guide (all tools)",
        "Accredited completion certificate",
        "Private WhatsApp community",
        "Exclusive Q&A session",
      ],
    },
  ],

  // The actual tools he teaches. Marquee pulls from this.
  // logo = path under /public/tools/ — you'll need clean monochrome SVGs.
  tools: [
    { name: "Gemini", logo: "/tools/gemini.svg", day: 1 },
    { name: "Veo 3.1", logo: "/tools/veo.svg", day: 1 },
    { name: "Flow", logo: "/tools/flow.svg", day: 1 },
    { name: "Higgsfield", logo: "/tools/higgsfield.svg", day: 1 },
    { name: "Reve AI", logo: "/tools/reve.svg", day: 1 },
    { name: "Nano Banana", logo: "/tools/nanobanana.svg", day: 1 },
    { name: "Seedance 2.0", logo: "/tools/seedance.svg", day: 2 },
    { name: "Kling AI", logo: "/tools/kling.svg", day: 2 },
    { name: "Sora 2", logo: "/tools/sora.svg", day: 2 },
    { name: "Suno", logo: "/tools/suno.svg", day: 3 },
    { name: "Envato", logo: "/tools/envato.svg", day: 3 },
    { name: "ElevenLabs", logo: "/tools/elevenlabs.svg", day: 3 },
  ],

  // 3 days × (outcome + tools) + bonuses. Curriculum grid reads from here.
  curriculum: [
    {
      index: "01",
      titleAr: "اليوم الأول · توليد الصور",
      titleEn: "Day 1 · Image Generation",
      bodyAr: "تتعلم كيف تنتج صور احترافية من الأوامر، وتتحكم في النمط والإضاءة.",
      bodyEn: "Produce professional AI images from prompts, control style and lighting.",
      toolNames: ["Gemini", "Veo 3.1", "Higgsfield", "Reve AI", "Nano Banana"],
    },
    {
      index: "02",
      titleAr: "اليوم الثاني · تحويل الصور إلى فيديو",
      titleEn: "Day 2 · Image → Video",
      bodyAr: "تحرّك صورك وتحولها لفيديوهات قابلة للاستخدام في الإعلانات والأفلام القصيرة.",
      bodyEn: "Animate your images into usable clips for ads and short films.",
      toolNames: ["Seedance 2.0", "Kling AI", "Sora 2", "Higgsfield"],
    },
    {
      index: "03",
      titleAr: "اليوم الثالث · الصوت والدمج",
      titleEn: "Day 3 · Audio & Compositing",
      bodyAr: "تركّب الصوت والموسيقى وتدمج تصوير حقيقي مع مولّد بالذكاء الاصطناعي.",
      bodyEn: "Compose audio, score, and blend real footage with AI-generated content.",
      toolNames: ["Suno", "Envato", "ElevenLabs"],
    },
    {
      index: "04",
      titleAr: "دليل PDF شامل",
      titleEn: "Comprehensive PDF Guide",
      bodyAr: "مرجع دائم بكل الأدوات والخطوات — ترجع له بعد الورشة متى ما احتجت.",
      bodyEn: "A lasting reference for every tool and step — return to it anytime after the workshop.",
    },
    {
      index: "05",
      titleAr: "ورشة تطبيقية مباشرة",
      titleEn: "Live Hands-On Practice",
      bodyAr: "تشتغل على مقطع فعلي خلال الورشة وتخرج بنتيجة حقيقية في يدك.",
      bodyEn: "Work on a real clip during the workshop and leave with a finished result.",
    },
    {
      index: "06",
      titleAr: "شهادة إتمام معتمدة",
      titleEn: "Accredited Certificate",
      bodyAr: "شهادة معتمدة من ٥ جهات رسمية تستلمها في اليوم الأخير.",
      bodyEn: "A certificate recognized by 5 official bodies, handed to you on the final day.",
    },
  ],

  accreditations: [
    { nameAr: "التعليم التطبيقي والتدريب", nameEn: "PAAET", logo: "/accred/paaet.svg" },
    { nameAr: "ديوان الخدمة المدنية", nameEn: "Civil Service Commission", logo: "/accred/csc.svg" },
    { nameAr: "وزارة التربية", nameEn: "Ministry of Education", logo: "/accred/moe.svg" },
    { nameAr: "اعتماد أمريكي دولي A.I.A", nameEn: "A.I.A (USA)", logo: "/accred/aia.svg" },
    { nameAr: "أكاديمية الاعتماد الكندية CAAA", nameEn: "CAAA (Canada)", logo: "/accred/caaa.svg" },
  ],

  faq: [
    {
      qAr: "هل الورشة مناسبة للمبتدئين؟",
      qEn: "Is this workshop suitable for beginners?",
      aAr: "نعم. نبدأ من الصفر، ولا تحتاج خلفية تقنية — فقط لابتوب أو آيباد.",
      aEn: "Yes. We start from zero. No technical background required — just a laptop or iPad.",
    },
    {
      qAr: "متى وأين تُعقد الورشة؟",
      qEn: "When and where is the workshop held?",
      aAr: "٢٦–٢٨ أبريل ٢٠٢٦، من ٦ إلى ٩ مساءً، في فندق أرابيلا البدع — قاعة ليان.",
      aEn: "April 26–28, 2026, 6–9 PM, Arabella Beach Hotel · Layan Hall.",
    },
    {
      qAr: "كيف يتم الدفع؟",
      qEn: "How do I pay?",
      aAr: "بعد إرسال طلب التسجيل عبر واتساب، يتواصل معك الفريق خلال ساعة ويرسل لك تفاصيل الدفع.",
      aEn: "After submitting your WhatsApp request, the team contacts you within an hour with payment details.",
    },
    {
      qAr: "هل سأحصل على شهادة؟",
      qEn: "Will I get a certificate?",
      aAr: "نعم، شهادة إتمام معتمدة من ٥ جهات رسمية تُسلّم في اليوم الأخير.",
      aEn: "Yes — a completion certificate recognized by 5 official bodies, handed out on the last day.",
    },
    {
      qAr: "الأدوات اللي تعلمتها تتغير كل شهر — هل الدورة تصلح بعد فترة؟",
      qEn: "AI tools change monthly — is the workshop still relevant later?",
      aAr: "نعلمك الطريقة والمنهج، مو أداة واحدة. لما تتغير الأداة، المنهج نفسه يشتغل على الجديدة.",
      aEn: "We teach the method, not just one tool. When tools change, the same method applies to the new ones.",
    },
  ],

  links: {
    instagram: "https://instagram.com/ai.with.aj",
  },
} as const;

export type SiteData = typeof SITE;
