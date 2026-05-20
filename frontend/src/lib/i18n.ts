import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      nav: { home: "Home", services: "Services", shop: "Portfolio", company: "Visualizer", contacts: "Contact", callback: "Callback", search: "Search", admin: "Admin", book: "Book" },
      hero: {
        eyebrow: "PREMIUM AUTOMOTIVE PAINTING",
        title: "Painted with precision. Finished with obsession.",
        subtitle: "Max Color delivers showroom-grade paintwork — full body, calipers, wheels — engineered for collectors and tuners who refuse compromise.",
        cta: "Book Consultation",
        secondary: "Explore Visualizer",
      },
      brand: {
        title: "Color is our craft",
        body: "Twenty years inside the booth. Aerospace-grade primers, ceramic clear coats, and a colorimetry lab that matches any pigment on earth.",
      },
      services: {
        title: "Types of Car Painting",
        subtitle: "Three disciplines. One uncompromising standard.",
        fullbody: { title: "Full Body Refinish", desc: "Complete strip, prime, paint and ceramic clear with factory-precise color matching." },
        caliper: { title: "Caliper Painting", desc: "Heat-resistant pigments and high-gloss finish that survives 700°C track days." },
        wheels: { title: "Custom Wheel Coating", desc: "Powder-coat or liquid finish in any color, matte to chrome — sealed for road salt and brake dust." },
        ceramic: { title: "Ceramic Coating", desc: "9H hydrophobic shield with up to 7-year UV stability and water-shedding gloss." },
        correction: { title: "Paint Correction", desc: "Multi-stage cut & polish to remove swirls, holograms and deep RIDS." },
        ppf: { title: "Paint Protection Film", desc: "Self-healing TPU film, full-body or partial — invisible armor against rock chips." },
        interior: { title: "Interior Detailing", desc: "Steam clean, leather conditioning, ozone odor removal and trim restoration." },
        cta: "View technical specs",
      },
      contact: {
        title: "Visit the studio",
        subtitle: "Walk-ins welcome. Consultations are always free.",
        address: "Address", phone: "Phone", email: "Email", hours: "Hours",
        directions: "Get directions", call: "Call now",
      },
      features: {
        title: "We can do what others can't",
        subtitle: "Capabilities that set our booth apart.",
        items: {
          color: { title: "Infinite color matching", desc: "Spectrophotometer-driven mixing across 12,000+ shades." },
          ceramic: { title: "Ceramic clear coats", desc: "9H hardness with 5-year hydrophobic warranty." },
          chrome: { title: "True chrome finishes", desc: "Vapor-deposition mirror finish — not vinyl." },
          custom: { title: "Custom liveries", desc: "Hand-masked race graphics, two-tone fades, candy pearls." },
        },
      },
      cta: { title: "Ready to paint your dream?", body: "Book a free consultation. We'll quote, plan, and deliver.", button: "Get Started" },
      footer: { tagline: "Premium automotive painting since 2004.", rights: "All rights reserved." },
      visualizer: {
        title: "AI Color Visualizer",
        subtitle: "Pick a silhouette. Apply Max Color. See it instantly.",
        select: "Select vehicle",
        color: "Pick color",
      },
      booking: {
        title: "Book your slot",
        subtitle: "Real-time workshop availability.",
        date: "Date", time: "Time", service: "Service", name: "Full name", email: "Email", phone: "Phone",
        confirm: "Confirm Booking",
        success: "Slot reserved. We'll email confirmation within minutes.",
      },
      portfolio: { title: "Portfolio", subtitle: "Selected work from the booth.", all: "All", filter: "Filter" },
      dashboard: { title: "My Dashboard", progress: "Paint progress", stage: "Current stage", login: "Sign in to view your project status." },
      notFound: { title: "Off the canvas", body: "This page doesn't exist in our color library.", home: "Back to home" },
      search: { placeholder: "Search services, portfolio, pages…", empty: "Nothing matched. Try another keyword." },
    },
  },
  ar: {
    translation: {
      nav: { home: "الرئيسية", services: "الخدمات", shop: "أعمالنا", company: "المحاكي", contacts: "اتصل بنا", callback: "اتصال بك", search: "بحث", admin: "الإدارة", book: "حجز" },
      hero: {
        eyebrow: "طلاء سيارات فاخر",
        title: "طلاء بدقة. إنهاء بهوس.",
        subtitle: "ماكس كولور تقدم أعمال طلاء بمستوى المعارض — هيكل كامل، فرامل، عجلات — لعشاق السيارات الذين يرفضون التنازل.",
        cta: "احجز استشارة",
        secondary: "جرب المحاكي",
      },
      brand: {
        title: "اللون هو حرفتنا",
        body: "عشرون عامًا داخل صالة الطلاء. أوليات بمعايير الطيران، طلاءات سيراميك، ومختبر ألوان يطابق أي صبغة.",
      },
      services: {
        title: "أنواع طلاء السيارات",
        subtitle: "ثلاث تخصصات. معيار واحد لا يتنازل.",
        fullbody: { title: "طلاء الهيكل الكامل", desc: "تجريد كامل، أساس، طلاء وسيراميك مع مطابقة دقيقة للون." },
        caliper: { title: "طلاء الفرامل", desc: "أصباغ مقاومة للحرارة تتحمل 700 درجة في حلبات السباق." },
        wheels: { title: "طلاء العجلات المخصص", desc: "طلاء مسحوق أو سائل بأي لون، مات إلى كروم — محكم ضد ملح الطرق." },
        ceramic: { title: "طلاء سيراميك", desc: "حماية 9H طاردة للماء حتى 7 سنوات." },
        correction: { title: "تصحيح الطلاء", desc: "تلميع متعدد المراحل لإزالة الخدوش والدوامات." },
        ppf: { title: "فيلم حماية الطلاء", desc: "غشاء TPU ذاتي الإصلاح ضد الحصى والخدوش." },
        interior: { title: "تنظيف داخلي", desc: "تنظيف بالبخار، تكييف الجلد، وإزالة الروائح." },
        cta: "عرض المواصفات التقنية",
      },
      contact: { title: "زر الاستوديو", subtitle: "الزيارات مرحب بها. الاستشارات مجانية.", address: "العنوان", phone: "الهاتف", email: "البريد", hours: "ساعات العمل", directions: "احصل على الاتجاهات", call: "اتصل الآن" },
      features: {
        title: "نفعل ما لا يستطيع الآخرون",
        subtitle: "قدرات تميز صالتنا.",
        items: {
          color: { title: "مطابقة ألوان لا نهائية", desc: "خلط بمقياس الطيف عبر أكثر من 12,000 درجة." },
          ceramic: { title: "طلاءات سيراميك", desc: "صلابة 9H مع ضمان 5 سنوات." },
          chrome: { title: "كروم حقيقي", desc: "طلاء كروم بالترسيب البخاري — ليس فينيل." },
          custom: { title: "تصاميم مخصصة", desc: "رسومات سباق يدوية، تدرجات، لآلئ." },
        },
      },
      cta: { title: "جاهز لطلاء حلمك؟", body: "احجز استشارة مجانية. نحن نخطط وننفذ.", button: "ابدأ الآن" },
      footer: { tagline: "طلاء سيارات فاخر منذ 2004.", rights: "جميع الحقوق محفوظة." },
      visualizer: { title: "محاكي الألوان", subtitle: "اختر سيارة. طبّق اللون. شاهد النتيجة.", select: "اختر مركبة", color: "اختر لون" },
      booking: { title: "احجز موعدك", subtitle: "توفر مباشر للورشة.", date: "التاريخ", time: "الوقت", service: "الخدمة", name: "الاسم الكامل", email: "البريد", phone: "الهاتف", confirm: "تأكيد الحجز", success: "تم الحجز. ستصلك رسالة قريبًا." },
      portfolio: { title: "أعمالنا", subtitle: "مختارات من الصالة.", all: "الكل", filter: "تصفية" },
      dashboard: { title: "لوحتي", progress: "تقدم الطلاء", stage: "المرحلة الحالية", login: "سجل الدخول لمتابعة مشروعك." },
      notFound: { title: "خارج اللوحة", body: "هذه الصفحة غير موجودة.", home: "العودة للرئيسية" },
      search: { placeholder: "ابحث في الخدمات والصفحات…", empty: "لا توجد نتائج." },
    },
  },
  de: {
    translation: {
      nav: { home: "Start", services: "Service", shop: "Portfolio", company: "Visualizer", contacts: "Kontakt", callback: "Rückruf", search: "Suche", admin: "Admin", book: "Termin" },
      hero: {
        eyebrow: "PREMIUM AUTOLACKIERUNG",
        title: "Lackiert mit Präzision. Vollendet mit Besessenheit.",
        subtitle: "Max Color liefert Showroom-Lackierung — Vollkarosserie, Bremssättel, Felgen — entwickelt für Sammler und Tuner ohne Kompromisse.",
        cta: "Beratung buchen",
        secondary: "Visualizer öffnen",
      },
      brand: {
        title: "Farbe ist unser Handwerk",
        body: "Zwanzig Jahre in der Kabine. Luftfahrt-Primer, Keramik-Klarlacke und ein Farblabor für jede Pigmentierung.",
      },
      services: {
        title: "Lackierungsarten",
        subtitle: "Drei Disziplinen. Ein kompromissloser Standard.",
        fullbody: { title: "Komplett-Lackierung", desc: "Strippen, grundieren, lackieren und Keramik-Klarlack mit präziser Farbabstimmung." },
        caliper: { title: "Bremssattel-Lackierung", desc: "Hitzebeständige Pigmente bis 700°C." },
        wheels: { title: "Felgen-Beschichtung", desc: "Pulver- oder Flüssiglack in jeder Farbe, matt bis chrom." },
        ceramic: { title: "Keramikbeschichtung", desc: "9H hydrophober Schutz mit bis zu 7 Jahren UV-Stabilität." },
        correction: { title: "Lackaufbereitung", desc: "Mehrstufiges Polieren zur Entfernung von Kratzern und Hologrammen." },
        ppf: { title: "Lackschutzfolie", desc: "Selbstheilende TPU-Folie gegen Steinschlag." },
        interior: { title: "Innenraum-Detailing", desc: "Dampfreinigung, Lederpflege, Geruchsbeseitigung." },
        cta: "Technische Daten ansehen",
      },
      contact: { title: "Besuchen Sie das Studio", subtitle: "Walk-ins willkommen. Beratung ist immer kostenlos.", address: "Adresse", phone: "Telefon", email: "E-Mail", hours: "Öffnungszeiten", directions: "Route", call: "Jetzt anrufen" },
      features: {
        title: "Was andere nicht können",
        subtitle: "Fähigkeiten, die unsere Kabine auszeichnen.",
        items: {
          color: { title: "Unbegrenzte Farbabstimmung", desc: "Spektrofotometer-Mischung in 12.000+ Tönen." },
          ceramic: { title: "Keramik-Klarlacke", desc: "9H Härte mit 5-Jahres-Garantie." },
          chrome: { title: "Echte Chromfinishes", desc: "Bedampfungsspiegel — kein Vinyl." },
          custom: { title: "Individuelle Designs", desc: "Handmaskierte Renngrafiken, Fades, Candy-Perl." },
        },
      },
      cta: { title: "Bereit, deinen Traum zu lackieren?", body: "Kostenlose Beratung buchen. Wir planen und liefern.", button: "Starten" },
      footer: { tagline: "Premium-Lackierung seit 2004.", rights: "Alle Rechte vorbehalten." },
      visualizer: { title: "KI Farb-Visualizer", subtitle: "Silhouette wählen. Farbe anwenden. Sofort sehen.", select: "Fahrzeug wählen", color: "Farbe wählen" },
      booking: { title: "Termin buchen", subtitle: "Echtzeit-Werkstattverfügbarkeit.", date: "Datum", time: "Uhrzeit", service: "Service", name: "Name", email: "E-Mail", phone: "Telefon", confirm: "Buchung bestätigen", success: "Termin reserviert. Bestätigung folgt per E-Mail." },
      portfolio: { title: "Portfolio", subtitle: "Ausgewählte Arbeiten.", all: "Alle", filter: "Filter" },
      dashboard: { title: "Mein Dashboard", progress: "Lackier-Fortschritt", stage: "Aktuelle Phase", login: "Anmelden, um Status zu sehen." },
      notFound: { title: "Außerhalb der Leinwand", body: "Diese Seite existiert nicht.", home: "Zurück zur Startseite" },
      search: { placeholder: "Services, Portfolio, Seiten…", empty: "Keine Treffer." },
    },
  },
};

if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: "en",
      supportedLngs: ["en", "ar", "de"],
      interpolation: { escapeValue: false },
      detection: {
        order: ["localStorage", "navigator"],
        caches: ["localStorage"],
      },
    });
}

export default i18n;
