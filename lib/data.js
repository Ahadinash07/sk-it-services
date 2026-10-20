// ───────── Single source of truth for all business info & content ─────────
export const BIZ = {
  name: "SK IT Services",
  tagline: "Connected by Technology, Powered by Trust.",
  phoneRaw: "+60192399656",
  phoneWa: "601157579656",
  phoneDisplay: "+60192399656",
  whatsappDisplay: "011-57579656",
  email: "skitsvc@gmail.com",
  contactPerson: "Syed Abdul Kather",
  addressLines: ["SK IT Services – Plaza Imbi", "Lot 1.36, 1st Floor, Plaza Imbi,", "Jalan Imbi, 55100 Kuala Lumpur,", "Malaysia."],
  addressOneLine: "Lot 1.36, First Floor, Imbi Plaza, Jalan Imbi, 55100 Kuala Lumpur, Malaysia",
  hours: ["Monday – Saturday", "10:00 AM – 7:00 PM", "(Closed on Sunday)"],
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Imbi+Plaza+Jalan+Imbi+Kuala+Lumpur",
};

export const NAV = [
  { label: "Home", href: "#home" },
  { label: "Products", href: "#products" },
  { label: "Repair Services", href: "#services" },
  { label: "Business IT", href: "#business-it" },
  { label: "About Us", href: "#why" },
  { label: "Contact", href: "#contact" },
];

export const HERO_FEATURES = [
  { icon: "monitor", title: "Quality Computers", sub: "New & Refurbished" },
  { icon: "wrench", title: "Expert Repairs", sub: "Laptop & Desktop" },
  { icon: "users", title: "Business IT Solutions", sub: "For Individuals & Businesses" },
];

export const SERVICES = [
  { id: "repair", img: "/images/why-2.jpg", kicker: "Repair & Restore", title: "Laptop & Computer Repair", text: "Screen, battery, keyboard, charging or performance issues? We help identify the fault and discuss the next step.", items: ["Screen, keyboard & battery repairs", "Charging port & hardware issues", "Virus removal, cleaning & maintenance"], cta: "Discuss a repair", msg: "I'd like to discuss a laptop / computer repair." },
  { id: "refurbished", img: "/images/why-5.jpg", kicker: "Smarter Spending", title: "Refurbished & New Computers", text: "Find a computer that suits your budget, whether it is for classes, everyday work or your business.", items: ["Tested refurbished laptops", "New desktops & all-in-one PCs", "Help choosing the right device"], cta: "Find your computer", msg: "I'm looking for a refurbished or new computer." },
  { id: "parts", img: "/images/prod-1.jpg", kicker: "Parts & Performance", title: "Computer Parts, RAM & SSD", text: "Give an older computer a new lease on life with the right upgrades and accessories.", items: ["RAM and SSD upgrades", "Chargers, batteries & keyboards", "Mice, bags, cables & accessories"], cta: "Plan an upgrade", msg: "I'd like to plan a RAM / SSD upgrade." },
  { id: "software", img: "/images/prod-3.jpg", kicker: "Ready to Use", title: "Software Installation & Setup", text: "Get your system set up properly with operating systems, essential software, drivers and security settings.", items: ["Windows & OS installation", "Office and business software", "Drivers, updates & backup setup"], cta: "Set up my device", msg: "I need software installation / setup for my device." },
  { id: "network", img: "/images/why-4.jpg", kicker: "Stay Connected", title: "Networking & Wi-Fi Setup", text: "Build a more reliable connection at home, in your shop or across your office.", items: ["Wi-Fi coverage & router setup", "LAN cabling, switches & access points", "Slow network troubleshooting"], cta: "Improve my network", msg: "I'd like help with networking / Wi-Fi setup." },
  { id: "custom-build", img: "/images/prod-4.jpg", kicker: "Built Around You", title: "Custom PC Builder", text: "A PC built around what you do and what you want to spend — not a one-size-fits-all setup.", items: ["Gaming & streaming builds", "Video editing workstations", "Office and home PCs"], cta: "Plan my build", msg: "I'd like to plan a custom PC build." },
  { id: "business-it", img: "/images/why-3.jpg", kicker: "Business Technology", title: "IT Consulting & Business Support", text: "Practical technology advice for small businesses, growing teams and new office setups.", items: ["IT needs assessment & planning", "Hardware recommendations & budgets", "Ongoing support & helpdesk"], cta: "Talk to an expert", msg: "I'd like to talk to an expert about IT support for my business." },
  { id: "online", img: "/images/prod-2.jpg", kicker: "Shop with Confidence", title: "Online Sales & Accessories", text: "Ask us about laptops, computers, parts and accessories, with guidance to help you choose.", items: ["Laptops and desktops", "Computer parts & accessories", "Product guidance before purchase"], cta: "Ask about products", msg: "I'd like to ask about your products and accessories." },
];

export const TRUST_STRIP = [["shield", "Reliable Service"], ["users", "Professional Advice"], ["headset", "Friendly Support"]];
export const PRODUCT_TRUST = [["diamond", "Quality Products"], ["tag", "Trusted Brands"], ["headset", "Expert Guidance"]];

export const PRODUCTS = [
  { id: "laptops", img: "/images/prod-3.jpg", icon: "laptop", title: "Laptops", text: "New and refurbished laptops for work, study and everyday use. A wide selection from trusted brands.", short: "New and refurbished laptops for work, study and everyday use.", items: ["Business laptops", "Student laptops", "Refurbished laptops", "Gaming & high performance"], cta: "Shop Laptops", item: "Laptops" },
  { id: "desktops", img: "/images/prod-4.jpg", icon: "monitor", title: "Desktops", text: "Reliable desktop computers and workstations for home and office use.", short: "Reliable desktop computers and workstations for home and office use.", items: ["Office desktops", "Workstations", "All-in-one PCs", "Refurbished desktops"], cta: "Shop Desktops", item: "Desktops" },
  { id: "parts", img: "/images/prod-1.jpg", icon: "box", title: "Computer Parts", text: "Essential components to upgrade, repair or build your computer.", short: "Essential components to upgrade, repair or build your computer.", items: ["RAM & SSD", "Motherboards", "Graphics cards", "Power supply & cooling"], cta: "Shop Parts", item: "Computer Parts" },
  { id: "accessories", img: "/images/prod-2.jpg", icon: "mouse", title: "Accessories", text: "Everyday essentials to complete your setup.", short: "Everyday essentials to complete your setup.", items: ["Chargers & adapters", "Keyboards & mice", "Monitors & webcams", "Laptop bags & more"], cta: "Shop Accessories", item: "Accessories" },
];

export const PC_TYPES = [["gamepad", "Gaming Setups"], ["briefcase", "Work & Study Setups"], ["video", "Content Creation Setups"], ["gear", "Custom Builds on Request"]];
export const PC_STEPS = [
  ["chat", "Tell Us Your Needs", "Share your usage, budget and preferences."],
  ["cpu", "Get Parts Recommendations", "We'll suggest the best components for your needs."],
  ["wrench", "Professional Assembly", "Our team will build and test your PC for reliability."],
  ["monitor", "Ready to Use", "Get your custom PC, ready for work, study or play."],
];
export const PC_POINTS = ["Quality parts from trusted brands", "Professional assembly and testing", "Advice based on your needs and budget"];
export const PC_BRANDS = ["intel", "AMD", "ASUS", "MSI", "GIGABYTE", "Kingston"];

export const WHY = [
  { icon: "shield", img: "/images/why-3.jpg", title: "Reliable Service", text: "Honest advice and practical solutions based on your needs and budget." },
  { icon: "users", img: "/images/why-4.jpg", title: "Experienced Team", text: "Skilled technicians with hands-on experience in computers, repairs and IT solutions." },
  { icon: "tag", img: "/images/why-5.jpg", title: "Quality Products", text: "New and refurbished computers, parts and accessories from trusted brands." },
  { icon: "headset", img: "/images/why-6.jpg", title: "Friendly Support", text: "We take the time to understand your needs and provide clear guidance." },
  { icon: "gear", img: "/images/why-2.jpg", title: "Complete Solutions", text: "From sales and repairs to business IT assistance, all under one roof." },
  { icon: "handshake", img: "/images/why-1.jpg", title: "Customer Satisfaction", text: "Our customers' trust and positive feedback keep us moving forward." },
];

export const PROCESS = [
  { icon: "chat", img: "/images/why-6.jpg", title: "Get in Touch", text: "Contact us via WhatsApp, phone or visit our store. Tell us your needs or issues." },
  { icon: "search", img: "/images/why-2.jpg", title: "Assessment & Diagnosis", text: "We inspect and diagnose your device or review your requirements to find the best solution." },
  { icon: "file", img: "/images/contact-hero.jpg", title: "Receive a Free Quote", text: "We provide a clear quotation based on the diagnosis and your needs before proceeding." },
  { icon: "shield", img: "/images/why-1.jpg", title: "Approval & Completion", text: "Once you approve, we proceed with the agreed service, repair, setup or supply. Your device or solution will be ready for you to use." },
];

// NOTE: figures & reviews below come from the design mock-up. Replace with your real Google Reviews data before launch.
export const STATS = [
  { icon: "star", big: "4.9", small: "/5", label: "Average Rating (Google Reviews)" },
  { icon: "users", big: "500+", label: "Happy Customers" },
  { icon: "chat", big: "1,000+", label: "Devices Serviced" },
  { icon: "thumb", big: "98%", label: "Would Recommend SK IT Services" },
];
export const REVIEWS = [
  { name: "Ahmad Faris", when: "2 weeks ago", text: "Great service and very friendly staff. Helped me choose the right laptop for my studies and the price is reasonable. Highly recommended!" },
  { name: "Siti Nurhaliza", when: "1 month ago", text: "Very satisfied with the service. My desktop was fixed quickly and everything is working perfectly now. Staff are knowledgeable and explain clearly." },
  { name: "Marcus Tan", when: "3 weeks ago", text: "Bought a custom PC build from SK IT Services. The performance is excellent and the team gave good advice based on my budget. Will come again!" },
  { name: "Kumar Raj", when: "3 weeks ago", text: "Keyboard rosak and they managed to fix it on the same day. Fast service, reasonable price and very professional. Really appreciate their help." },
  { name: "Nur Aisyah", when: "2 weeks ago", text: "Good experience overall. Staff are patient and helped me set up my new laptop. After sales service is also very responsive. Highly recommended!" },
];

export const FAQ_GROUPS = [
  { id: "general", icon: "help", label: "General", sub: "About SK IT Services", qa: [
    ["What is SK IT Services?", "SK IT Services is a computer shop offering laptop and desktop sales, computer repairs, upgrades, accessories and IT support for individuals and businesses."],
    ["Where are you located?", "We're located at Lot 1.36, 1st Floor, Plaza Imbi, Jalan Imbi, 55100 Kuala Lumpur."],
    ["What are your operating hours?", "We're open Monday to Saturday, 10:00 AM to 7:00 PM. Closed on Sundays and selected public holidays."],
    ["Can I walk in without an appointment?", "Yes! Walk-ins are welcome during our operating hours. You can also WhatsApp us before visiting to check availability."],
  ]},
  { id: "repair", icon: "wrench", label: "Repair Services", sub: "Diagnosis, repairs & upgrades", qa: [
    ["What types of computer repairs do you offer?", "We handle screen, hinge, keyboard, battery, charging and motherboard issues, as well as overheating and other laptop or desktop problems."],
    ["Do you charge for checking or diagnosing a computer?", "At the moment, our initial inspection and diagnosis are free. We'll let you know if any special testing or additional charges are required."],
    ["Will I receive a quotation before repair?", "Yes. We'll explain the issue and provide a quotation for your approval before proceeding with the repair."],
    ["How long does a repair take?", "Repair time depends on the problem and parts availability. Our team will advise you after checking your device."],
    ["Can you repair broken laptop hinges?", "Yes! Laptop hinge repair is one of our repair services. Bring your laptop in so we can assess the damage."],
    ["Can you upgrade my laptop or desktop?", "Yes. We offer RAM and SSD upgrades, subject to your device's compatibility."],
  ]},
  { id: "products", icon: "monitor", label: "Products", sub: "Laptops, desktops & accessories", qa: [
    ["Do you sell new and refurbished computers?", "Yes! We offer new and refurbished laptops, desktop PCs and all-in-one computers, subject to stock availability."],
    ["Can you help me choose a laptop or desktop?", "Of course! Tell us your budget and how you plan to use it, and we'll recommend suitable options."],
    ["Do you sell computer parts and accessories?", "Yes. We offer RAM, SSDs, chargers, keyboards, mice, monitors and other computer components and accessories."],
    ["Can I request a specific computer model?", "Yes! WhatsApp us the model or specifications you're looking for, and we'll check availability."],
    ["Do you offer custom-built PCs?", "Yes. We can discuss custom PC builds for gaming, work, study or business, based on your requirements and budget."],
  ]},
  { id: "business", icon: "users", label: "Business IT", sub: "Solutions for businesses", qa: [
    ["Do you provide IT support for businesses?", "Yes. We offer computer-related IT support and solutions for businesses based on their requirements."],
    ["Can you supply computers for offices?", "Yes. We can assist with sourcing laptops, desktops and accessories for office and business use."],
    ["Can you help with office network and Wi-Fi setup?", "You can share your requirements with us. We'll review the scope and advise on a suitable solution."],
    ["Do you buy used laptops and computers from companies?", "Yes! We purchase used laptops, desktops and other IT equipment from companies upgrading their systems, clearing old stock or closing down. Both individual units and bulk quantities are welcome, subject to condition and evaluation. WhatsApp us for more details."],
  ]},
  { id: "payment", icon: "shield", label: "Payments & Warranty", sub: "Payments, repairs & product warranty", qa: [
    ["What payment methods do you accept?", "Please contact our team to confirm the available payment methods before making payment."],
    ["Do your products come with a warranty?", "Warranty coverage depends on the product and its condition. We'll explain the applicable terms before purchase."],
    ["Do computer repairs come with a warranty?", "Warranty coverage varies depending on the type of repair and parts used. Our team will explain the terms before proceeding."],
    ["Can I get a quotation before purchasing?", "Yes! Tell us what you're looking for, and we'll provide pricing based on product or parts availability."],
  ]},
  { id: "others", icon: "chat", label: "Others", sub: "Pickup, delivery & enquiries", qa: [
    ["Do you offer pickup and delivery?", "Yes! Pickup and delivery services are available for selected areas. WhatsApp us to check availability and any applicable charges."],
    ["Do you offer home or office visits?", "Yes! Home and office visits are available depending on your location and service requirements. Additional charges may apply. WhatsApp us for more details."],
    ["Can I send my laptop using a delivery service?", "Yes! You can arrange delivery through services such as Lalamove. Please contact us before sending your device."],
    ["How can I contact SK IT Services?", "You can WhatsApp us at 011-57579656 or visit our store at Plaza Imbi, Kuala Lumpur. We're happy to help!"],
  ]},
];

export const INQUIRY_TYPES = ["Product Enquiry", "Repair Support", "Business IT Consultation", "General Questions"];

// ───────── Quote stepper form (matches the reference screens) ─────────
export const QUOTE_DEVICES = [["laptop", "Laptop"], ["laptop", "MacBook"], ["tablet", "Surface Pro"], ["monitor", "Computer"], ["plus", "Other"]];
export const QUOTE_MODELS = {
  Laptop: ["Dell", "HP", "Lenovo", "Acer", "ASUS", "MSI", "Other"],
  MacBook: ["MacBook Air", "MacBook Pro", "MacBook (older)", "Other"],
  "Surface Pro": ["Surface Pro 7", "Surface Pro 8", "Surface Pro 9", "Surface Pro 10", "Other"],
  Computer: ["Desktop PC", "All-in-One", "Gaming PC", "Custom Build", "Other"],
  Other: ["Tablet", "Printer", "Network device", "Other"],
};
export const QUOTE_ISSUES = [["monitor", "Screen damage"], ["power", "Won't power on"], ["gauge", "Slow performance"], ["battery", "Battery / charging"], ["keyboard", "Keyboard / trackpad"], ["gear", "Software / virus"], ["plus", "Other issue"]];
