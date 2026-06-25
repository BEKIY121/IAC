import type { SiteContent } from "./types";

function id() {
  return crypto.randomUUID();
}

export const defaultContent: SiteContent = {
  siteConfig: {
    name: "IAC",
    fullName: "Innovation & Incubation Center",
    tagline: "Empowering Ethiopia's Next Generation of Innovators",
    description:
      "The Innovation & Incubation Center (IAC), under the Ministry of Innovation and Technology (MinT), nurtures startups from idea to impact through mentorship, resources, and a thriving innovation ecosystem.",
    url: "https://iac.mint.gov.et",
    owner: {
      name: "Ministry of Innovation and Technology",
      shortName: "MinT",
      description:
        "The Ministry of Innovation and Technology drives Ethiopia's digital transformation and innovation agenda.",
    },
    contact: {
      email: "info@iac.mint.gov.et",
      phone: "+251 11 000 0000",
      address: "Addis Ababa, Ethiopia",
      hours: "Monday – Friday, 8:30 AM – 5:30 PM",
    },
    social: {
      twitter: "https://twitter.com/MoITEthiopia",
      linkedin: "https://linkedin.com/company/mint-ethiopia",
      youtube: "https://youtube.com",
    },
  },
  stats: [
    { id: id(), value: "120+", label: "Startups Supported" },
    { id: id(), value: "45", label: "Active Cohorts" },
    { id: id(), value: "ETB 2.5B+", label: "Funding Facilitated" },
    { id: id(), value: "850+", label: "Jobs Created" },
  ],
  capabilities: [
    {
      id: id(),
      icon: "lightbulb",
      title: "Idea Validation",
      description:
        "Transform raw concepts into validated business models with structured frameworks and expert feedback.",
    },
    {
      id: id(),
      icon: "users",
      title: "Mentorship Network",
      description:
        "Connect with seasoned entrepreneurs, industry leaders, and technical advisors across sectors.",
    },
    {
      id: id(),
      icon: "building",
      title: "Co-Working Spaces",
      description:
        "Modern, fully-equipped workspaces designed for collaboration, focus, and creative breakthroughs.",
    },
    {
      id: id(),
      icon: "wallet",
      title: "Funding Access",
      description:
        "Bridge to grants, angel investors, and venture capital through MinT-backed innovation funds.",
    },
    {
      id: id(),
      icon: "globe",
      title: "Market Linkage",
      description:
        "Access domestic and international markets through trade missions, expos, and partner networks.",
    },
    {
      id: id(),
      icon: "cpu",
      title: "Tech Infrastructure",
      description:
        "Cloud credits, prototyping labs, and digital tools to accelerate product development.",
    },
  ],
  programs: [
    {
      id: "pre-incubation",
      title: "Pre-Incubation",
      duration: "3 Months",
      description:
        "For early-stage founders with an idea. Focus on problem validation, customer discovery, and MVP planning.",
      features: [
        "Business model canvas workshops",
        "Customer interview training",
        "Pitch deck fundamentals",
        "Access to innovation labs",
      ],
      badge: "Entry Level",
    },
    {
      id: "incubation",
      title: "Incubation Program",
      duration: "6–12 Months",
      description:
        "Our flagship program for startups ready to build, launch, and scale their products in the Ethiopian market.",
      features: [
        "Dedicated mentor pairing",
        "Co-working desk allocation",
        "Legal & IP support",
        "Investor readiness training",
      ],
      badge: "Most Popular",
      featured: true,
    },
    {
      id: "acceleration",
      title: "Acceleration",
      duration: "4 Months",
      description:
        "Intensive growth program for startups with traction, preparing them for Series A and regional expansion.",
      features: [
        "Growth hacking sprints",
        "International market access",
        "Corporate partnership matching",
        "Demo day with investors",
      ],
      badge: "Growth Stage",
    },
    {
      id: "sector-labs",
      title: "Sector Innovation Labs",
      duration: "Ongoing",
      description:
        "Specialized tracks in AgriTech, FinTech, HealthTech, EdTech, and Green Energy with domain experts.",
      features: [
        "Sector-specific mentorship",
        "Regulatory sandbox access",
        "Pilot program facilitation",
        "Government procurement pathways",
      ],
      badge: "Specialized",
    },
  ],
  services: [
    {
      id: id(),
      title: "Business Development",
      description:
        "Strategic planning, market research, and go-to-market strategy tailored for the Ethiopian context.",
      icon: "trending-up",
    },
    {
      id: id(),
      title: "Legal & Compliance",
      description:
        "Company registration guidance, IP protection, and regulatory navigation for tech startups.",
      icon: "scale",
    },
    {
      id: id(),
      title: "Financial Advisory",
      description:
        "Financial modeling, bookkeeping support, and preparation for investor due diligence.",
      icon: "calculator",
    },
    {
      id: id(),
      title: "Technical Support",
      description:
        "Software architecture reviews, UX audits, and access to development resources and APIs.",
      icon: "code",
    },
    {
      id: id(),
      title: "HR & Talent",
      description:
        "Recruitment support, internship pipelines from universities, and team-building workshops.",
      icon: "user-plus",
    },
    {
      id: id(),
      title: "Marketing & Branding",
      description:
        "Brand identity development, digital marketing strategy, and media relations support.",
      icon: "megaphone",
    },
  ],
  startups: [
    {
      id: id(),
      name: "AgriSense",
      sector: "AgriTech",
      description:
        "IoT-powered soil monitoring and crop advisory platform serving 15,000+ smallholder farmers.",
      stage: "Growth",
      year: "2023",
    },
    {
      id: id(),
      name: "PayFlow ET",
      sector: "FinTech",
      description:
        "Mobile payment and micro-lending platform bridging the financial inclusion gap in rural Ethiopia.",
      stage: "Scale",
      year: "2022",
    },
    {
      id: id(),
      name: "MedLink",
      sector: "HealthTech",
      description:
        "Telemedicine platform connecting patients in underserved areas with specialist physicians.",
      stage: "Growth",
      year: "2023",
    },
    {
      id: id(),
      name: "EduSpark",
      sector: "EdTech",
      description:
        "Adaptive learning platform delivering personalized education in Amharic and regional languages.",
      stage: "Early",
      year: "2024",
    },
    {
      id: id(),
      name: "GreenGrid",
      sector: "Clean Energy",
      description:
        "Solar micro-grid solutions powering off-grid communities with smart energy management.",
      stage: "Growth",
      year: "2022",
    },
    {
      id: id(),
      name: "LogiChain",
      sector: "Logistics",
      description:
        "Blockchain-based supply chain transparency platform for Ethiopian coffee exporters.",
      stage: "Early",
      year: "2024",
    },
  ],
  testimonials: [
    {
      id: id(),
      quote:
        "IAC didn't just give us office space — they gave us a roadmap. The mentorship program transformed how we think about scaling in Africa.",
      author: "Selam T.",
      role: "CEO, AgriSense",
      initials: "ST",
    },
    {
      id: id(),
      quote:
        "As a first-time founder, the legal and financial workshops saved us months of costly mistakes. The MinT ecosystem is truly supportive.",
      author: "Daniel M.",
      role: "Founder, PayFlow ET",
      initials: "DM",
    },
    {
      id: id(),
      quote:
        "The sector innovation lab connected us directly with Ministry stakeholders. That access accelerated our pilot deployment by a year.",
      author: "Hanna K.",
      role: "CTO, MedLink",
      initials: "HK",
    },
  ],
  news: [
    {
      id: id(),
      title: "IAC Opens Applications for 2026 Incubation Cohort",
      excerpt:
        "Applications are now open for our flagship 12-month incubation program. Early-stage tech startups are encouraged to apply.",
      date: "June 15, 2026",
      category: "Announcement",
      published: true,
    },
    {
      id: id(),
      title: "Demo Day 2026: 20 Startups Pitch to Global Investors",
      excerpt:
        "Our annual Demo Day brought together investors from across Africa, Europe, and the Middle East to meet Ethiopia's brightest founders.",
      date: "May 28, 2026",
      category: "Event",
      published: true,
    },
    {
      id: id(),
      title: "MinT Launches FinTech Regulatory Sandbox at IAC",
      excerpt:
        "A new regulatory sandbox enables FinTech startups to test innovative products in a controlled environment with MinT oversight.",
      date: "April 10, 2026",
      category: "Partnership",
      published: true,
    },
    {
      id: id(),
      title: "IAC Partners with Leading Universities for Talent Pipeline",
      excerpt:
        "New partnerships with Addis Ababa University and Bahir Dar University create internship and research collaboration pathways.",
      date: "March 22, 2026",
      category: "Partnership",
      published: true,
    },
  ],
  resources: [
    {
      id: id(),
      title: "Startup Toolkit",
      description:
        "Templates for business plans, pitch decks, financial models, and legal checklists.",
      type: "Download",
    },
    {
      id: id(),
      title: "Founder's Guide to Ethiopia",
      description:
        "Comprehensive guide covering registration, taxation, and regulatory requirements.",
      type: "Guide",
    },
    {
      id: id(),
      title: "Webinar Library",
      description:
        "Recorded sessions on fundraising, product development, and scaling strategies.",
      type: "Video",
    },
    {
      id: id(),
      title: "Investor Directory",
      description:
        "Curated list of angel investors, VCs, and grant programs active in Ethiopia.",
      type: "Directory",
    },
    {
      id: id(),
      title: "IP & Patent Guide",
      description:
        "Step-by-step guide to protecting intellectual property in Ethiopia and abroad.",
      type: "Guide",
    },
    {
      id: id(),
      title: "Market Research Reports",
      description:
        "Sector analyses for AgriTech, FinTech, HealthTech, and emerging verticals.",
      type: "Report",
    },
  ],
  values: [
    {
      id: id(),
      title: "Innovation First",
      description:
        "We champion bold ideas that solve real problems for Ethiopians and beyond.",
    },
    {
      id: id(),
      title: "Inclusive Growth",
      description:
        "Our programs welcome founders from all backgrounds, regions, and sectors.",
    },
    {
      id: id(),
      title: "Integrity & Trust",
      description:
        "As a government institution, we uphold the highest standards of transparency.",
    },
    {
      id: id(),
      title: "Collaboration",
      description:
        "We build bridges between startups, government, academia, and industry.",
    },
  ],
  timeline: [
    {
      id: id(),
      year: "2018",
      event:
        "IAC established under MinT to formalize startup support infrastructure.",
    },
    {
      id: id(),
      year: "2020",
      event: "First incubation cohort launched with 15 startups across 4 sectors.",
    },
    {
      id: id(),
      year: "2022",
      event: "New co-working facility opened, capacity expanded to 80 startups.",
    },
    {
      id: id(),
      year: "2024",
      event:
        "Sector Innovation Labs launched for AgriTech, FinTech, and HealthTech.",
    },
    {
      id: id(),
      year: "2026",
      event:
        "120+ alumni startups, national innovation hub network expansion begins.",
    },
  ],
  applicationSteps: [
    {
      id: id(),
      step: 1,
      title: "Submit Application",
      description:
        "Complete the online form with your team info, idea summary, and sector.",
    },
    {
      id: id(),
      step: 2,
      title: "Initial Screening",
      description:
        "Our team reviews applications for fit, potential, and commitment level.",
    },
    {
      id: id(),
      step: 3,
      title: "Interview & Pitch",
      description:
        "Shortlisted founders present their vision to the selection committee.",
    },
    {
      id: id(),
      step: 4,
      title: "Onboarding",
      description:
        "Accepted startups join their cohort with a tailored development plan.",
    },
  ],
  contactSubmissions: [],
  applicationSubmissions: [],
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about/", label: "About" },
  { href: "/programs/", label: "Programs" },
  { href: "/services/", label: "Services" },
  { href: "/startups/", label: "Startups" },
  { href: "/resources/", label: "Resources" },
  { href: "/news/", label: "News & Events" },
  { href: "/contact/", label: "Contact" },
];
