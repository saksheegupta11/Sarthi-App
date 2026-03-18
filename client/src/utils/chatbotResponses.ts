/**
 * Sarthi AI — Client-side chatbot response engine
 * Covers greetings, career guidance, exam prep, scholarships, internships,
 * subject tips, and motivational support tailored for Indian students.
 */

type Rule = {
  keywords: string[];
  response: string;
};

const rules: Rule[] = [
  // ─── Greetings ───────────────────────────────────────────────────────────
  {
    keywords: [
      "hi",
      "hello",
      "hey",
      "hlo",
      "helo",
      "hii",
      "hiii",
      "namaste",
      "namaskar",
      "good morning",
      "good afternoon",
      "good evening",
      "good night",
      "sup",
      "yo",
      "greetings",
    ],
    response: `Namaste! 🙏 Welcome to Sarthi AI — your personal educational & career guide.

I'm here to help you with:
• 🎯 Career path & stream selection
• 📚 JEE, NEET & other exam preparation
• 💡 Subject-wise study tips
• 🎓 Scholarships & financial aid
• 💼 Internship opportunities
• 📝 Mock test guidance
• 🌟 Motivational support

What would you like to explore today? Just ask!`,
  },

  // ─── Casual / How are you ─────────────────────────────────────────────────
  {
    keywords: [
      "how are you",
      "how r u",
      "how are u",
      "hows you",
      "how r you",
      "kaisa hai",
      "kaise ho",
      "kya haal",
      "whats up",
      "wassup",
      "what's up",
      "sup bro",
      "all good",
      "you ok",
    ],
    response: `I'm doing great, thank you for asking! 😊

As your Sarthi AI guide, I'm always energized and ready to help you achieve your academic and career goals.

You can ask me about:
• Career suggestions after 10th or 12th
• JEE / NEET / UPSC preparation
• Best colleges, cutoffs, and admission tips
• Scholarships you can apply for
• Internships in your field
• Study strategies and timetable planning

So, what's on your mind today? I'm all yours! 🚀`,
  },

  // ─── Identity / About Sarthi ─────────────────────────────────────────────
  {
    keywords: [
      "who are you",
      "what are you",
      "about sarthi",
      "introduce yourself",
      "tell me about yourself",
      "what is sarthi",
      "who is sarthi",
      "what can you do",
      "help",
      "features",
      "what do you offer",
    ],
    response: `I'm Sarthi AI 🤖 — your smart educational and career guidance assistant built specifically for Indian students!

Here's what I can help you with:

🎯 **Career Guidance**
  • Stream selection after 10th (PCM, PCB, Commerce, Arts)
  • Career options after 12th
  • Career roadmap in tech, medical, law, UPSC, and more

📚 **Exam Preparation**
  • JEE Main & Advanced tips
  • NEET preparation strategy
  • UPSC & Civil Services guidance
  • Board exam study tips

📖 **Subject Help**
  • Maths, Physics, Chemistry, Biology tips
  • Best books & free resources (NCERT, Khan Academy, etc.)

🎓 **Scholarships & Financial Aid**
  • National Scholarship Portal (NSP)
  • State government schemes
  • Private & merit-based scholarships

💼 **Internships**
  • Engineering, Medical, Commerce, Arts internships
  • Where to find them (Internshala, LinkedIn, etc.)

💪 **Motivation & Study Tips**
  • Study techniques (Pomodoro, Feynman, etc.)
  • Stress management & focus tips

Just type your question and I'll guide you! 🌟`,
  },

  // ─── Thank you ────────────────────────────────────────────────────────────
  {
    keywords: [
      "thank you",
      "thanks",
      "thnx",
      "thankyou",
      "thx",
      "helpful",
      "great help",
      "you helped",
      "good bot",
      "nice",
      "awesome",
      "shukriya",
      "dhanyawad",
    ],
    response: `You're most welcome! 😊 That's what I'm here for.

Remember — every question you ask is a step forward in your journey. Never hesitate to ask anything, no matter how small it seems.

Is there anything else you'd like to explore? Whether it's career planning, exam tips, scholarships, or just a motivational boost — I'm right here! 🌟`,
  },

  // ─── Goodbye ─────────────────────────────────────────────────────────────
  {
    keywords: [
      "bye",
      "goodbye",
      "tata",
      "alvida",
      "see you",
      "see ya",
      "cya",
      "later",
      "take care",
      "ok bye",
      "good bye",
    ],
    response: `Goodbye! 👋 Best of luck with your studies and career journey!

Remember:
✨ "Success is not final, failure is not fatal — it's the courage to continue that counts." — Winston Churchill

Come back anytime you need guidance. Sarthi AI is always here for you! 🙏`,
  },

  // ─── Motivation / Stress ──────────────────────────────────────────────────
  {
    keywords: [
      "stressed",
      "stress",
      "depressed",
      "depression",
      "fail",
      "failed",
      "demotivated",
      "unmotivated",
      "pressure",
      "give up",
      "quit",
      "can't do",
      "cannot do",
      "feeling low",
      "sad",
      "worried",
      "anxious",
      "nervous",
      "afraid",
      "scared",
      "hopeless",
      "not good enough",
      "weak in studies",
      "bad at studies",
    ],
    response: `I hear you, and it's completely okay to feel this way. 💙 Every great student has moments of doubt. Here's the truth:

🌟 **You Are Not Alone**
Millions of students face exam pressure and setbacks. It's part of the journey, not the end of it.

💪 **What You Can Do Right Now:**
1. Take a 10-minute break — walk, breathe, stretch
2. Drink water and eat something small
3. Write down ONE small task you can do today
4. Talk to a friend, parent, or teacher about how you feel

📚 **Study Smarter, Not Harder:**
• Break big topics into 25-minute Pomodoro sessions
• Reward yourself after completing each session
• Sleep 7–8 hours — memory consolidates during sleep
• Review what you've studied, not just read new content

🌈 **Remember:**
• Virat Kohli was dropped from the team — he came back as captain
• APJ Abdul Kalam failed at becoming a pilot — he became President
• Your one bad exam does NOT define your entire life

One step at a time. You've got this! 🚀 What specific challenge can I help you with today?`,
  },

  // ─── Career / Future ─────────────────────────────────────────────────────
  {
    keywords: [
      "career",
      "future",
      "job",
      "which field",
      "suggest me",
      "career options",
      "what to do",
      "career after",
      "career guidance",
      "career path",
      "career advice",
      "best career",
      "job opportunities",
      "work",
      "profession",
    ],
    response: `Great question! Career planning is one of the most important steps in a student's life. Here's a structured guide:

🎯 **Step 1 — Know Yourself**
• What subjects do you enjoy most?
• Are you analytical (Maths/Science) or creative (Arts/Commerce)?
• Do you prefer working with people, data, or ideas?

🔬 **Science Stream Careers:**
• Engineering (BTech/BE) — IT, CSE, Mechanical, Civil, Electronics
• Medical (MBBS/BDS/Pharmacy/Nursing)
• Research & Academia (BSc + MSc + PhD)
• Data Science, AI, Machine Learning (high demand!)
• Architecture, Biotechnology, Environmental Science

💰 **Commerce Stream Careers:**
• Chartered Accountancy (CA) — top finance career
• MBA (IIM, XLRI, etc.)
• Banking & Finance, Stock Market, Economics
• Company Secretary (CS), CMA

🎨 **Arts/Humanities Careers:**
• UPSC / Civil Services (IAS, IPS, IFS)
• Law (LLB) — judiciary or corporate law
• Psychology, Social Work, Education
• Journalism, Mass Communication, Media
• Design (Fashion, Graphic, Interior, UX)

💻 **High-Demand Fields in 2024–2030:**
• Artificial Intelligence & Data Science
• Cybersecurity
• Electric Vehicle & Green Energy
• Healthcare Technology
• Digital Marketing

📋 **Next Steps:**
1. Take our Career Quiz on the app for personalized suggestions
2. Research top colleges for your chosen field
3. Talk to professionals in fields you're interested in
4. Explore internships early (even in 11th/12th grade!)

What stream are you currently in? I can give more specific guidance! 🌟`,
  },

  // ─── JEE / IIT ───────────────────────────────────────────────────────────
  {
    keywords: [
      "jee",
      "iit",
      "jee main",
      "jee advanced",
      "jee preparation",
      "iit jee",
      "how to crack jee",
      "jee syllabus",
      "jee books",
      "jee tips",
    ],
    response: `JEE (Joint Entrance Examination) is the gateway to IITs, NITs, and top engineering colleges. Here's your complete guide:

📋 **JEE Structure:**
• **JEE Main** — Conducted by NTA, 4 times/year (Jan & April sessions)
  - 75 questions: Physics (25) + Chemistry (25) + Maths (25)
  - Duration: 3 hours | Score: 0-300
• **JEE Advanced** — For top ~2.5 lakh JEE Main qualifiers
  - Pathway to IITs only

📚 **Best Books:**
• **Physics:** HC Verma (Concepts of Physics Vol 1 & 2), DC Pandey
• **Chemistry:** NCERT (must!), OP Tandon (Organic), JD Lee (Inorganic)
• **Maths:** RD Sharma, Cengage, Arihant

🎯 **Preparation Strategy:**
1. **Class 11 & 12 NCERT first** — 40–50% questions are NCERT-based
2. Solve **previous 10 years' papers** (PYQs) — non-negotiable
3. Take **mock tests every week** from January of class 12
4. Focus on high-weightage chapters:
   - Physics: Mechanics, Electrostatics, Optics
   - Chemistry: Organic Reactions, Coordination Compounds, Equilibrium
   - Maths: Calculus, Coordinate Geometry, Algebra

📅 **Timeline:**
• Class 11: Build concepts, complete NCERT
• Class 12 (April–Oct): Revise + solve PYQs
• Class 12 (Nov–Jan): Full mock tests + weak topic revision
• JEE Main: January attempt (improves score in April)

🆓 **Free Resources:**
• Khan Academy (concepts)
• Unacademy / PW (PhysicsWallah) — free YouTube lectures
• ALLEN & Resonance study material PDFs (official free resources)
• NTA mock test portal: jeemain.nta.nic.in

💡 **Pro Tips:**
• Accuracy > Speed in JEE (negative marking!)
• Attempt all chemistry first (fastest), then Maths/Physics
• 6–8 hours of focused daily study beats 12 hours of distracted study

What specific topic or section would you like help with? 🚀`,
  },

  // ─── NEET / Medical ──────────────────────────────────────────────────────
  {
    keywords: [
      "neet",
      "mbbs",
      "doctor",
      "medical entrance",
      "neet preparation",
      "aiims",
      "medical college",
      "neet syllabus",
      "neet books",
      "neet tips",
      "bds",
      "veterinary",
      "ayurvedic",
    ],
    response: `NEET (National Eligibility cum Entrance Test) is the single gateway to MBBS, BDS, AYUSH, and Veterinary courses in India. Here's your complete guide:

📋 **NEET Structure:**
• Conducted by **NTA** — once a year (usually May)
• 180 questions: Physics (45) + Chemistry (45) + Biology (90)
• Duration: 3 hours 20 min | Score: 0-720
• Negative marking: +4 for correct, -1 for wrong

📚 **Best Books:**
• **Biology:** NCERT (11th + 12th) — THE most important! | MTG Fingertips Biology
• **Physics:** DC Pandey (NEET objective), HC Verma concepts
• **Chemistry:** NCERT (must) + MTG Objective Chemistry | Morrison & Boyd (Organic)

🎯 **Preparation Strategy:**
1. **NCERT Biology is KING** — 80–90% of biology questions come directly from NCERT lines
2. Read NCERT Biology 5–7 times minimum
3. Solve **previous 10 years' NEET papers** thoroughly
4. Take full mock tests every Sunday from January

📊 **High-Weightage Topics:**
• Biology: Human Physiology, Plant Physiology, Genetics, Ecology, Reproduction
• Chemistry: Organic (Reactions & Mechanisms), Equilibrium, Biomolecules
• Physics: Mechanics, Current Electricity, Modern Physics, Thermodynamics

📅 **Cutoff (approx):**
• AIIMS Delhi — 700+ marks
• Top Government MBBS — 580–640+
• Private MBBS — 400–500+

🆓 **Free Resources:**
• NCERT PDFs: ncert.nic.in
• Aakash / Allen free YouTube series
• PhysicsWallah (PW) — excellent free NEET content
• NTA mock portal: neet.nta.nic.in

💡 **Pro Tips:**
• Attempt Biology first (90 questions, highest marks)
• Don't skip any NCERT diagram — many questions come from diagrams
• Revise with NCERT before sleeping — spaced repetition works!

What specific subject or topic in NEET can I help you with? 🌟`,
  },

  // ─── Engineering / CSE / Tech ────────────────────────────────────────────
  {
    keywords: [
      "engineering",
      "btech",
      "cse",
      "programming",
      "software",
      "data science",
      "coding",
      "python",
      "ai",
      "machine learning",
      "ml",
      "artificial intelligence",
      "computer science",
      "it",
      "information technology",
      "web development",
      "app development",
      "developer",
      "software engineer",
    ],
    response: `Engineering and Computer Science offer some of the most exciting and in-demand careers! Here's your roadmap:

💻 **Top Engineering Branches (2024):**
1. **Computer Science (CSE)** — Software, AI/ML, Data Science
2. **Electronics & Communication (ECE)** — VLSI, Embedded Systems, Telecom
3. **Mechanical** — Manufacturing, Robotics, Automotive, Space
4. **Civil** — Infrastructure, Construction, Smart Cities
5. **Electrical** — Power Systems, Renewable Energy
6. **Data Science & AI** — Fastest growing field!

🎯 **Entrance Exams:**
• **JEE Main** — NITs, IIITs, GFTIs (rank-based admission)
• **JEE Advanced** — IITs
• **BITSAT** — BITS Pilani (top private college)
• **State CETs** — MHT-CET, AP EAMCET, KCET, etc.
• **VITEEE, SRMJEEE, MET** — top private colleges

🌟 **High-Demand Skills to Learn:**
• Programming: Python, JavaScript, Java (start with Python)
• Web Dev: HTML, CSS, React, Node.js
• Data Science: Pandas, NumPy, Scikit-learn, Tableau
• AI/ML: TensorFlow, PyTorch, LangChain
• Cloud: AWS, Azure, Google Cloud (certifications valued!)

📚 **Free Learning Resources:**
• CS50 (Harvard) — cs50.harvard.edu (FREE!)
• freeCodeCamp — freecodecamp.org
• Khan Academy CS courses
• Coursera (audit for free), edX, NPTEL
• YouTube: Apna College, CodeWithHarry (Hindi)

💰 **Average Salaries:**
• Fresher Software Engineer: ₹3–8 LPA
• Data Scientist (3 years exp): ₹10–25 LPA
• AI/ML Engineer: ₹12–40 LPA
• Google/Amazon/Microsoft: ₹30–1 Crore+ (top performers)

💡 **Tips:**
• Build projects from Day 1 of college
• Contribute to Open Source on GitHub
• Internships in 2nd/3rd year are critical
• Competitive programming: LeetCode, CodeForces, HackerRank

Want specific guidance on any branch or skill? Ask away! 🚀`,
  },

  // ─── Commerce / CA / MBA ─────────────────────────────────────────────────
  {
    keywords: [
      "commerce",
      "ca",
      "mba",
      "business",
      "accounting",
      "finance",
      "chartered accountant",
      "company secretary",
      "cs",
      "bcom",
      "economics",
      "stock market",
      "banking",
      "bank exam",
      "cfa",
    ],
    response: `Commerce is a powerful stream with diverse, high-paying career paths! Here's your guide:

💼 **Top Commerce Careers:**

🏆 **Chartered Accountancy (CA)** — Most prestigious
• Conducted by: ICAI (Institute of Chartered Accountants of India)
• Levels: CA Foundation → CA Intermediate → CA Final
• Duration: 4–5 years with articleship
• Salary: ₹7–25 LPA (fresher), ₹50+ LPA (top firms)
• Big 4 firms: Deloitte, PWC, EY, KPMG recruit CAs

🎓 **MBA** — Management career
• Top colleges: IIM Ahmedabad, IIM Bangalore, IIM Calcutta
• Entrance: CAT, XAT, GMAT (for abroad)
• Specializations: Finance, Marketing, HR, Operations, Analytics
• Salary: ₹10–30 LPA (IIM graduates: ₹25–1 Crore+)

🏦 **Banking & Finance:**
• IBPS PO/Clerk — nationalized banks
• SBI PO — State Bank of India
• RBI Grade B — Reserve Bank of India
• SEBI Grade A — Securities regulator

📊 **Other Commerce Paths:**
• **CMA** (Cost & Management Accountant) — ICMAI
• **Company Secretary (CS)** — ICSI
• **CFA** (Chartered Financial Analyst) — global finance
• **Stock Market / Trading** — BSE, NSE, NISM certification
• **Actuarial Science** — insurance & risk management

📚 **Key Subjects to Master:**
• Accountancy & Financial Reporting
• Business Economics & Micro/Macro Economics
• Business Law & Taxation (GST, Income Tax)
• Business Mathematics & Statistics

🆓 **Free Resources:**
• ICAI study material (free on icai.org)
• Unacademy Commerce section
• NCERT Economics (Class 11 & 12)
• CA Wallah by PW (YouTube)

What specific commerce career are you interested in? 🌟`,
  },

  // ─── Arts / Humanities / UPSC ────────────────────────────────────────────
  {
    keywords: [
      "arts",
      "humanities",
      "upsc",
      "ias",
      "psychology",
      "law",
      "journalism",
      "mass communication",
      "sociology",
      "history",
      "political science",
      "geography",
      "civil services",
      "ips",
      "ifs officer",
      "designer",
      "fashion design",
      "fine arts",
    ],
    response: `Arts & Humanities offer some of the most intellectually rewarding and socially impactful careers! Here's your guide:

🏛️ **Top Arts/Humanities Careers:**

⚖️ **Law (LLB / BA LLB):**
• Entrance: CLAT (National Law Universities) / AILET (NLU Delhi)
• Career: Corporate Lawyer, Advocate, Judge, Legal Advisor
• Top colleges: NLU Delhi, NLSIU Bangalore, NALSAR Hyderabad
• Salary: ₹5–50 LPA+ (corporate law can go higher)

🇮🇳 **UPSC / Civil Services (IAS, IPS, IFS, IRS):**
• India's most prestigious exam — full guide below ⬇️

🧠 **Psychology:**
• Courses: BA Psychology → MA → M.Phil/PhD
• Careers: Clinical Psychologist, Counselor, HR Professional, UX Researcher
• Growing demand — India faces mental health awareness surge

📰 **Journalism & Mass Communication:**
• Entrance: IPU CET, IIMC, ACJ
• Careers: Reporter, Editor, Content Creator, PR Manager, Documentary Filmmaker

🎨 **Design (Graphic, Fashion, Interior, UX):**
• Entrance: NID, NIFT, CEED (for M.Des at IITs)
• Careers: UI/UX Designer, Product Designer, Fashion Stylist
• UX Design: ₹8–30 LPA (tech industry)

📚 **Teaching & Academia:**
• NET/SET qualification → College Professor
• PhD → Research & Faculty positions
• International teaching opportunities in India & abroad

🌍 **International Relations / Foreign Service:**
• IFS (Indian Foreign Service) via UPSC
• MBA in International Business
• Work with UN, World Bank, NGOs

💡 **Truth about Arts:**
Arts is NOT a "backup stream" — it's a CHOICE for curious, creative, and critical thinkers. Many top leaders, entrepreneurs, and innovators come from humanities backgrounds!

What specific Arts/Humanities career would you like to know more about? 🌟`,
  },

  // ─── Scholarships ────────────────────────────────────────────────────────
  {
    keywords: [
      "scholarship",
      "scholarships",
      "financial aid",
      "funding",
      "fee waiver",
      "stipend",
      "free education",
      "merit scholarship",
      "government scholarship",
      "scholarship apply",
    ],
    response: `Great initiative to look for scholarships! Here's a comprehensive guide for Indian students:

🏛️ **Government Scholarships (FREE Money!):**

1. **National Scholarship Portal (NSP)** — scholarships.gov.in
   • Pre-Matric & Post-Matric scholarships for SC/ST/OBC/Minority students
   • Merit-cum-Means scholarships
   • Apply online, documents verified digitally

2. **PM Scholarship Scheme**
   • For children of ex-servicemen
   • ₹2,500–3,000/month

3. **Central Sector Scholarship**
   • For top 0.1% board exam scorers
   • ₹12,000–20,000/year for UG/PG

4. **Inspire Scholarship (DST)**
   • For BSc/Integrated MSc in Natural Sciences
   • ₹80,000/year + mentorship

5. **AICTE Pragati / Saksham Scholarship**
   • For girl students & differently-abled in AICTE approved colleges
   • ₹50,000/year

6. **State Government Scholarships**
   • Each state has its own portals — search "[your state] scholarship portal"

🏢 **Private/Corporate Scholarships:**

• **Tata Scholarships** — tata.com/scholarship
• **Infosys Foundation Scholarships** — for engineering students
• **Reliance Foundation Scholarship** — ₹6 lakh total
• **Wipro Cares** — STEM scholarships
• **LIC Golden Jubilee Scholarship** — meritorious students

🌍 **International Scholarships:**
• Fulbright (USA) — for postgrad
• Commonwealth Scholarship (UK)
• DAAD (Germany) — free/subsidized study
• Erasmus+ (Europe)

📋 **Documents Usually Required:**
• Income certificate (₹2.5–8 lakh limit varies)
• Caste certificate (for reserved category)
• Previous year marksheets
• Bank account details
• Bonafide student certificate

💡 **Pro Tips:**
• Apply on NSP portal every academic year
• Never pay anyone to "help" apply — scholarships are FREE
• Check application deadlines (usually July–October)
• Renew scholarships every year — don't assume it auto-continues

Check the Scholarships section in this app for direct links! 🎓`,
  },

  // ─── Internships ─────────────────────────────────────────────────────────
  {
    keywords: [
      "internship",
      "internships",
      "work experience",
      "placement",
      "industrial training",
      "summer internship",
      "winter internship",
      "paid internship",
      "unpaid internship",
      "where to find internship",
    ],
    response: `Internships are one of the BEST ways to launch your career! Here's everything you need to know:

🎯 **Why Internships Matter:**
• Real-world experience > textbook learning
• Build your portfolio & resume
• Networking with professionals
• Paid internships = ₹5,000–50,000+/month
• Many convert to full-time job offers

💼 **Best Platforms to Find Internships:**

1. **Internshala** (internshala.com) — India's #1 internship portal
   • Thousands of listings: Engineering, Marketing, Design, Finance, Law
   • Filter by stipend, duration, work-from-home

2. **LinkedIn** — linkedin.com
   • Search "internship [your city/field]"
   • Message professionals directly for opportunities

3. **Naukri.com** — has internship listings too

4. **LetsIntern / HelloIntern** — for freshers

5. **Government Internships:**
   • **PM Internship Scheme** — pminternship.mca.gov.in (top 500 companies)
   • **ISRO, DRDO, BARC, HAL** — visit official websites
   • **Ministries** — Parliament internships, MoE, NITI Aayog

🔬 **Domain-Specific:**
• **Engineering/Tech:** Internshala, GitHub, company websites (TCS, Infosys, Wipro, startups)
• **Medical:** Hospital internship through college, AIIMS observerships
• **Commerce/Finance:** CA firms, banks, Fintech startups
• **Media/Journalism:** News portals, Internshala media listings
• **Design:** Behance, Dribbble job boards, design agencies

📝 **How to Apply Successfully:**
1. Update your resume (1 page, clean format — use canva.com free templates)
2. Write a personalized cover letter for each application
3. Build a portfolio website (GitHub for tech, Behance for design)
4. Apply to 20–30 places — don't get discouraged by rejections
5. Prepare for basic interview questions

💡 **Pro Tips:**
• Start applying in 2nd year of college (not 3rd)
• Cold email companies you admire — many hire interns this way
• LinkedIn connections with seniors from your college = golden network
• An unpaid internship at a top company > paid at unknown company

Check the Internships section in this app for categorized listings! 🚀`,
  },

  // ─── Stream Selection / After 10th ───────────────────────────────────────
  {
    keywords: [
      "which stream",
      "after 10th",
      "pcm",
      "pcb",
      "stream select",
      "stream selection",
      "science commerce arts",
      "which stream to choose",
      "11th stream",
      "class 11 stream",
      "10th pass",
    ],
    response: `Choosing your stream after 10th is one of the most important decisions! Here's a clear guide:

🔬 **Science with PCM (Physics, Chemistry, Maths):**
Best if you:
✅ Love Maths & logical problem-solving
✅ Dream of engineering, IT, architecture, or research
✅ Have scored 75%+ in Maths & Science in 10th

Career paths: Engineering (IIT/NIT), Data Science, Architecture, Pilot, Defence (NDA)

🧬 **Science with PCB (Physics, Chemistry, Biology):**
Best if you:
✅ Are fascinated by living organisms, human body, nature
✅ Dream of becoming a doctor, pharmacist, or scientist
✅ Can handle lots of memorization along with concepts

Career paths: MBBS (NEET), BDS, Pharmacy, Nursing, Biotechnology, Veterinary

🔬🧬 **Science with PCM + Biology (PCMB):**
• Keeps all options open (both JEE & NEET)
• Higher workload — only if you're confident about managing 4 main subjects

💰 **Commerce:**
Best if you:
✅ Are interested in business, money, economics
✅ Want to become CA, banker, entrepreneur, or MBA professional
✅ Prefer less rote memorization, more application

Career paths: CA, MBA, Banking, Finance, Economics, Company Secretary

🎨 **Arts/Humanities:**
Best if you:
✅ Love history, languages, psychology, geography, or social sciences
✅ Want a career in civil services (IAS), law, journalism, or teaching
✅ Are creative or passionate about social change

Career paths: IAS/UPSC, Law, Journalism, Psychology, Design, Teaching

❌ **Common Myths to Ignore:**
• "Arts is for weak students" — FALSE! IAS toppers come from Arts
• "Commerce has no scope" — FALSE! CAs earn more than many engineers
• "Science is the only respected stream" — FALSE! India needs lawyers, journalists, and entrepreneurs too

🎯 **How to Decide:**
1. Ask: "What activities make me lose track of time?"
2. Shadow a professional for a day in your dream career
3. Talk to seniors who chose each stream
4. Take our Career Quiz on the app for personalized suggestions!

What are your interests? I can help you choose! 🌟`,
  },

  // ─── After 12th ──────────────────────────────────────────────────────────
  {
    keywords: [
      "after 12th",
      "12th ke baad",
      "courses after 12",
      "after class 12",
      "12th pass",
      "options after 12",
      "what to do after 12",
      "graduation options",
      "degree options",
    ],
    response: `After 12th is an exciting crossroads with many paths! Here are your options based on stream:

🔬 **After 12th Science (PCM):**
• **BTech/BE** — via JEE Main (NITs, IIITs) or JEE Advanced (IITs)
  Branches: CSE, ECE, Mechanical, Civil, Chemical, Data Science
• **BSc** — Physics, Chemistry, Maths, Statistics, Computer Science
• **B.Arch** — Architecture via NATA/JEE
• **NDA** — National Defence Academy (Army, Navy, Air Force)
• **BSc Nursing / Pharmacy** — healthcare without NEET
• **Diploma courses** — Polytechnic (3 years), then lateral entry to BTech

🧬 **After 12th Science (PCB):**
• **MBBS** — via NEET (5.5 years including internship)
• **BDS** — Dental Surgery via NEET
• **BAMS/BHMS** — Ayurvedic/Homeopathic medicine via NEET
• **B.Pharm** — Pharmacy (no NEET needed for most)
• **BSc Biotechnology / Microbiology / Genetics**
• **BSc Nursing** — great career, immediate job demand

💰 **After 12th Commerce:**
• **BCom / BCom Hons** — foundation for CA, MBA
• **CA Foundation** — start alongside graduation
• **BBA (Bachelor of Business Administration)**
• **BA Economics (Hons)** — Delhi University, JNU
• **B.Com + CS (Company Secretary) simultaneously**
• **IPMAT** — for 5-year integrated MBA at IIM Indore/Rohtak

🎨 **After 12th Arts:**
• **BA (Political Science, History, Psychology, Sociology, Geography)**
• **BA LLB** — 5-year integrated law (via CLAT)
• **BJourn / BMC** — Journalism / Mass Communication
• **BFA** — Fine Arts, Performing Arts
• **BEd** — Teaching (if you love education)
• **UPSC preparation** — start reading NCERT from Day 1

🌍 **Study Abroad Options:**
• USA: SAT + Common App
• UK: A-Levels or direct 12th marks
• Germany: Free education! TestDaF/DSH German proficiency
• Canada: IELTS + strong academics

💡 **Don't Rush:** Take a gap year if needed — to prepare well for JEE/NEET/CLAT is better than rushing into a wrong college. Many toppers take a drop year!

What stream are you in? I can give more specific guidance! 🚀`,
  },

  // ─── Study Tips ──────────────────────────────────────────────────────────
  {
    keywords: [
      "study tips",
      "how to study",
      "timetable",
      "concentrate",
      "padhai",
      "focus",
      "study techniques",
      "study habits",
      "memory",
      "remember",
      "forget",
      "revision",
      "time management",
      "schedule",
      "routine",
      "productive",
    ],
    response: `Here are proven, science-backed study techniques that top students use:

⏰ **The Pomodoro Technique (Most Effective!):**
• Study for 25 minutes → Break for 5 minutes → Repeat 4 times → Long break (15–30 min)
• Keeps brain fresh, prevents burnout
• Use apps: Forest, Be Focused, or just a timer

🧠 **The Feynman Technique (Deep Understanding):**
1. Study a concept
2. Explain it as if teaching a 10-year-old
3. Identify gaps where you got confused
4. Go back to source & fill those gaps
5. Simplify further

📅 **Sample Daily Timetable:**
• 5:30–6:00 AM: Wake up, freshen up, light exercise
• 6:00–8:00 AM: Most difficult subject (fresh brain = best learning!)
• 8:00–9:00 AM: Breakfast, news, relax
• 9:00–12:00 PM: School/College
• 1:00–2:00 PM: Lunch + 30-min rest
• 2:00–4:00 PM: Homework / Revision
• 4:00–4:30 PM: Break (play, walk, social media)
• 4:30–7:00 PM: Self-study (2nd & 3rd subjects)
• 8:00–9:30 PM: Evening revision (light reading)
• 10:00 PM: Sleep (minimum 7–8 hours!)

✅ **The Active Recall Method:**
• After reading a chapter, close the book and write everything you remember
• 3x more effective than re-reading!
• Use flashcards (Anki app is free and amazing)

📝 **Spaced Repetition:**
• Review notes: Same day → 3 days later → 7 days later → 21 days later
• This moves information from short-term to long-term memory
• Anki app automates this scheduling!

🚫 **Study Killers to Avoid:**
• Phone notifications during study (use Do Not Disturb!)
• Passive re-reading without testing yourself
• Pulling all-nighters (sleep is when brain consolidates memory)
• Studying in bed (brain associates bed with sleep)
• Multitasking (reduces retention by 40%!)

🏆 **Environment Matters:**
• Dedicated study space (not bedroom)
• Good lighting (avoid eye strain)
• No TV or music with lyrics
• Classical music or white noise = okay for some people

📱 **Useful Free Apps:**
• **Anki** — flashcards with spaced repetition
• **Notion** — notes & study planning
• **Forest** — focus timer with gamification
• **Todoist** — task management
• **Khan Academy** — free subject learning

What subject are you struggling with? I can give specific tips! 📚`,
  },

  // ─── Exam Preparation ────────────────────────────────────────────────────
  {
    keywords: [
      "exam prep",
      "mock test",
      "previous year",
      "prepare for exam",
      "exam preparation",
      "board exam",
      "how to prepare",
      "exam strategy",
      "time in exam",
      "attempt exam",
      "exam tips",
    ],
    response: `Here's a complete exam preparation strategy that toppers follow:

📅 **3-Month Exam Strategy:**

**Month 1 — Foundation:**
• Complete all syllabus topics (even weak ones)
• NCERT first for Science & Maths
• Make short notes for each chapter (keyword-based)

**Month 2 — Practice:**
• Solve previous year papers (last 10 years minimum!)
• Chapter-wise practice sets
• Identify weak topics — spend extra time here
• Take 1 mock test/week

**Month 3 — Revision & Mock Tests:**
• Only revise — no new topics
• 3–4 full mock tests per week
• Analyze mistakes in every mock test
• Revise formulas, diagrams, dates daily

📝 **During the Exam:**
1. Read all questions first (5 minutes overview)
2. Attempt easy/confident questions first
3. Mark difficult ones, come back later
4. Don't spend more than 2 minutes on any MCQ
5. Attempt all questions (unless negative marking)
6. Keep 15 minutes for review at the end

🎯 **Paper-Specific Tips:**
• **MCQ exams (JEE/NEET):** Elimination method works great
• **Subjective exams (Boards):** Answer in points, use diagrams
• **Essay exams (UPSC):** Introduction + 3–4 body paragraphs + conclusion

🚫 **Last-Week Mistakes to Avoid:**
• Don't start new topics in last week
• Don't compare yourself with friends
• Don't change your routine drastically
• Avoid social media the night before exam
• Sleep properly — memory consolidates during sleep!

🌙 **Night Before the Exam:**
• Light revision of key formulas/concepts only
• Prepare stationery, admit card, ID the night before
• Sleep by 10 PM if exam is at 9 AM
• Eat light breakfast — heavy food causes drowsiness

💪 **Exam Day Mental Prep:**
• Deep breaths before entering exam hall
• If you blank out: skip the question, move forward, come back
• Positive self-talk: "I have prepared well, I can do this"

Use the Mock Test section in this app to practice! 📊`,
  },

  // ─── Maths ───────────────────────────────────────────────────────────────
  {
    keywords: [
      "math",
      "maths",
      "mathematics",
      "calculus",
      "trigonometry",
      "algebra",
      "geometry",
      "statistics",
      "differentiation",
      "integration",
      "coordinate geometry",
      "probability",
      "number system",
      "matrices",
    ],
    response: `Mathematics is the language of the universe! Here's how to master it:

📚 **Key Topics & Their Importance:**

| Chapter | JEE Weightage | Board Weightage |
|---------|--------------|----------------|
| Calculus (Diff + Integral) | 25–30% | 20% |
| Algebra (Complex, P&C, Binomial) | 20% | 25% |
| Coordinate Geometry | 20% | 15% |
| Trigonometry | 10% | 10% |
| Vectors & 3D | 10% | 10% |
| Matrices & Determinants | 8% | 10% |

🎯 **How to Improve in Maths:**
1. **Never skip steps** while solving — write everything
2. **Understand the concept** before practicing (don't just memorize formulas)
3. Solve **minimum 10 problems** per concept before moving on
4. Make a **formula sheet** and revise daily
5. **Previous year questions** are the best practice material

📘 **Best Books:**
• **NCERT (Class 11 & 12)** — solve every exercise problem
• **RD Sharma** — for comprehensive practice
• **Cengage Maths** — for JEE advanced preparation
• **Arihant "Play with Graphs"** — for calculus graphs

🆓 **Free Resources:**
• Khan Academy (khanacademy.org) — excellent concept videos
• 3Blue1Brown (YouTube) — best visual Maths explanations
• PatrickJMT (YouTube) — step-by-step calculus
• Cuemath / Vedantu free videos

💡 **Common Mistakes:**
• Skipping NCERT examples (don't skip!)
• Not practicing enough problems (Maths needs practice, not just reading)
• Ignoring weak chapters (your score can't afford zeroes in Calculus!)

Which specific Math chapter or concept are you struggling with? Tell me and I'll help! 📐`,
  },

  // ─── Physics ─────────────────────────────────────────────────────────────
  {
    keywords: [
      "physics",
      "mechanics",
      "optics",
      "newton",
      "laws of motion",
      "thermodynamics",
      "electrostatics",
      "magnetism",
      "waves",
      "modern physics",
      "kinematics",
      "gravitation",
      "fluid",
      "semiconductors",
    ],
    response: `Physics is the foundation of science and engineering! Here's your mastery guide:

📚 **Key Chapters & Weightage (JEE/Boards):**
• **Mechanics** (Kinematics, Laws of Motion, Work-Energy) — 25–30%
• **Electrostatics & Current Electricity** — 20–25%
• **Optics** (Ray + Wave) — 10–15%
• **Modern Physics** (Photoelectric, Nuclear, Atoms) — 10–15%
• **Thermodynamics & Kinetic Theory** — 8–10%
• **Magnetism & EMI** — 10%
• **Waves & Oscillations** — 8%

🎯 **How to Study Physics:**
1. **Understand concepts deeply** — never memorize formulas without understanding derivations
2. **Draw diagrams** for every problem (FBD for mechanics, ray diagrams for optics)
3. After reading a concept, **solve 10 problems immediately**
4. Learn to **identify the concept** needed before solving
5. **Dimensional analysis** helps verify your answers

📘 **Best Books:**
• **HC Verma (Concepts of Physics Vol 1 & 2)** — BEST for concepts + problems
• **DC Pandey** — excellent objective problems for JEE/NEET
• **Pradeep / SL Arora** — for Board exams
• **NCERT Physics** — must-read for boards and NEET basics

🆓 **Free Resources:**
• Walter Lewin (MIT OpenCourseWare — YouTube) — best physics lectures ever
• PhysicsWallah (PW) on YouTube — Hindi explanations
• Vsauce & MinutePhysics — conceptual understanding

💡 **Common Mistakes:**
• Not understanding Newton's laws before doing advanced mechanics
• Memorizing formulas without deriving them
• Skipping thermodynamics (high-scoring chapter!)
• Not practicing numerical problems daily

Which physics chapter is giving you trouble? I can explain it step-by-step! ⚛️`,
  },

  // ─── Chemistry ───────────────────────────────────────────────────────────
  {
    keywords: [
      "chemistry",
      "organic",
      "periodic table",
      "inorganic",
      "physical chemistry",
      "chemical bonding",
      "equilibrium",
      "reaction",
      "organic chemistry",
      "named reactions",
      "p block",
      "d block",
      "electrochemistry",
      "coordination compounds",
      "polymers",
    ],
    response: `Chemistry is your secret weapon in board exams and competitive tests! Here's your guide:

📚 **Chemistry has 3 parts — each needs a different approach:**

**🔵 Physical Chemistry (Calculations-based):**
• Chapters: Mole Concept, Thermodynamics, Chemical Kinetics, Electrochemistry, Solutions, Equilibrium
• Study like Maths — practice numericals daily
• Understand formulas deeply before solving
• 30–35% of paper weightage

**🟢 Inorganic Chemistry (Memory-based):**
• Chapters: Periodic Table, Chemical Bonding, s/p/d/f Block, Coordination Compounds
• Make colourful notes with mnemonics
• Revise daily — 15 minutes reading of key facts
• 25–30% of paper weightage

**🔴 Organic Chemistry (Concept + Pattern-based):**
• Chapters: General Organic Chemistry, Reactions (Addition, Substitution, Elimination), Named Reactions, Biomolecules, Polymers
• Understand reaction MECHANISMS, not just products
• Make reaction flowcharts
• NCERT examples are very important
• 35–40% of paper weightage (NEET highest!)

📘 **Best Books:**
• **NCERT Chemistry (11th & 12th)** — MANDATORY for NEET & Boards
• **OP Tandon** (Physical + Organic) — excellent for JEE
• **VK Jaiswal** — Inorganic Chemistry for JEE
• **Morrison & Boyd** — Organic (advanced reference)
• **Narendra Awasthi** — Physical Chemistry numericals

🆓 **Free Resources:**
• Khan Academy Chemistry (organic reactions explained beautifully)
• Organic Chemistry Tutor (YouTube) — step by step
• PW Chemistry (YouTube — Hindi)

💡 **Pro Tips:**
• Write named reactions (Aldol, Cannizzaro, Hoffman, etc.) on sticky notes
• Learn periodic trends ONCE properly — saves time forever
• NCERT examples in Organic = direct board exam questions often!

Which chemistry topic is confusing you? Ask away! ⚗️`,
  },

  // ─── Biology ─────────────────────────────────────────────────────────────
  {
    keywords: [
      "biology",
      "human body",
      "genetics",
      "ncert biology",
      "zoology",
      "botany",
      "ecology",
      "evolution",
      "reproduction",
      "cell biology",
      "photosynthesis",
      "respiration",
      "nervous system",
    ],
    response: `Biology is absolutely fascinating and critical for NEET! Here's your complete guide:

📚 **NEET Biology Weightage (90 marks out of 720!):**

| Chapter Category | Approx Marks |
|-----------------|-------------|
| Human Physiology | 20–25 marks |
| Genetics & Evolution | 18–20 marks |
| Ecology & Biodiversity | 15–18 marks |
| Plant Physiology | 10–12 marks |
| Cell Biology & Biochemistry | 10–12 marks |
| Reproduction | 10–12 marks |
| Diversity in Living World | 8–10 marks |

🎯 **NCERT Biology — The Sacred Text for NEET:**
• Read NCERT 5–7 times minimum — seriously!
• 80–90% of NEET biology questions come DIRECTLY from NCERT lines
• Even diagrams in NCERT can appear in questions
• Read every table, every footnote, every caption!

📖 **Study Strategy for Biology:**
1. **Read NCERT actively** — not passively. Highlight, question, summarize
2. After each chapter, write **key points** from memory
3. Draw all important **diagrams from memory** (Krebs cycle, heart, nephron, mitosis/meiosis)
4. Make **comparison tables** (e.g., mitosis vs meiosis, C3 vs C4 plants)
5. Revise previous year NEET questions chapter-wise

📘 **Best Books:**
• **NCERT Biology (Class 11 + 12)** — PRIMARY source
• **MTG Fingertips Biology** — chapter-wise MCQs based on NCERT
• **Trueman's Biology** — supplementary reading
• **Dinesh Biology** — detailed reference

🆓 **Free Resources:**
• NCERT PDFs (ncert.nic.in) — FREE download
• Aakash Biology NEET videos (YouTube)
• PW Biology by Sachin Rana (YouTube — excellent!)
• Armando Hasudungan (YouTube) — beautiful anatomy/physiology explanations

💡 **Must-Master Diagrams:**
• Heart structure & blood flow
• Nephron (kidney) structure
• Neuron & synapse
• DNA replication & transcription
• Mitosis & Meiosis stages
• Life cycles (frog, cockroach, flowering plant)

Which biology topic is confusing you? I can explain it in simple terms! 🌱`,
  },

  // ─── Colleges ────────────────────────────────────────────────────────────
  {
    keywords: [
      "college",
      "which college",
      "iim",
      "nit",
      "top college",
      "cutoff",
      "college admission",
      "best engineering college",
      "best medical college",
      "iit admission",
      "college list",
      "rank for college",
      "josaa",
      "counselling",
    ],
    response: `Choosing the right college is crucial for your career! Here's a comprehensive guide:

🏛️ **Top Engineering Colleges:**

**IITs (Indian Institutes of Technology):**
• IIT Bombay, Delhi, Madras, Kanpur, Kharagpur (Top 5)
• Admission: JEE Advanced
• CSE cutoff IIT Bombay: Rank ~100 (JEE Advanced)
• IIT Roorkee, Hyderabad, Gandhinagar — excellent for specific branches

**NITs (National Institutes of Technology):**
• NIT Trichy, Warangal, Surathkal, Calicut, Rourkela (Top 5)
• Admission: JEE Main (JoSAA Counselling)
• CSE cutoff NIT Trichy: ~5,000–12,000 (General)

**IIITs:**
• IIIT Hyderabad, Allahabad, Bangalore — excellent for CSE/ECE
• Admission: JEE Main

**Top Private:**
• BITS Pilani (BITSAT) | VIT Vellore (VITEEE) | SRM | Manipal | MSIT

🏥 **Top Medical Colleges:**
• AIIMS Delhi (cutoff: ~700+ marks NEET)
• Maulana Azad Medical College, Delhi
• King George Medical University, Lucknow
• Grant Medical College, Mumbai
• Admission via NEET + MCC Counselling

💼 **Top Management Colleges:**
• IIM Ahmedabad, Bangalore, Calcutta (Top 3)
• IIM Lucknow, Kozhikode, Indore
• XLRI Jamshedpur, MDI Gurgaon, SPJIMR
• Admission: CAT (85-99%ile needed for IIMs)

⚖️ **Top Law Colleges:**
• NLSIU Bangalore (NLU 1), NLU Delhi (AILET), NALSAR Hyderabad
• Admission: CLAT

📋 **Counselling Processes:**
• **JoSAA** — for IITs/NITs/IIITs/GFTIs (josaa.nic.in)
• **MCC NEET Counselling** — for MBBS (mcc.nic.in)
• **CAP/State Counselling** — state engineering colleges
• **CLAT Counselling** — NLUs

💡 **College Selection Tips:**
1. Branch > College ranking (for career outcomes)
2. Research placement data — CTC offered, companies visiting
3. Check hostel/campus facilities
4. Talk to current students (LinkedIn is great for this!)
5. Consider location — tier-1 cities offer more internship opportunities

What's your target stream and rank/score? I can suggest specific colleges! 🎓`,
  },

  // ─── UPSC / Civil Services ───────────────────────────────────────────────
  {
    keywords: [
      "upsc",
      "civil services",
      "ias officer",
      "how to become ias",
      "ias preparation",
      "upsc syllabus",
      "ias books",
      "prelims",
      "mains",
      "interview upsc",
      "collector",
      "district magistrate",
      "ips preparation",
    ],
    response: `UPSC Civil Services is India's most prestigious exam. Here's your complete roadmap:

🏛️ **UPSC CSE Structure:**

**Stage 1: Prelims** (Objective)
• GS Paper I (100 MCQs) + CSAT Paper II (80 MCQs)
• Qualifying nature — ~2.5 lakh appear, ~15,000 qualify

**Stage 2: Mains** (Descriptive — 9 papers)
• Essay + GS I, II, III, IV + Optional (2 papers) + Language papers
• ~15,000 appear, ~2,800 qualify for interview

**Stage 3: Personality Test (Interview)**
• 275 marks
• Final merit = Mains + Interview

📅 **Timeline to IAS:**
• Notification: February
• Prelims: June
• Mains: September–October
• Interview: March–April (next year)
• Result: April–May

📚 **Essential Books (NCERT First!):**
• **History:** NCERT 6–12, Bipin Chandra (Modern India), Spectrum Modern History
• **Geography:** NCERT 6–12, G.C. Leong (Physical Geography), Oxford Atlas
• **Polity:** M. Laxmikanth (Indian Polity) — MUST READ!
• **Economy:** NCERT 11–12 Economics, Ramesh Singh (Indian Economy)
• **Science & Tech:** NCERT 6–10 Science, The Hindu Science articles
• **Environment:** Shankar IAS Book
• **Current Affairs:** The Hindu newspaper daily + Vision IAS Monthly Magazine

🎯 **Preparation Strategy:**
1. **Read all NCERT books** (Class 6–12) — 3–4 months
2. **Standard reference books** for each GS subject
3. **Daily newspaper** (The Hindu / Indian Express) — 1.5 hours/day
4. **Previous year questions** (Prelims + Mains) — solve all 10 years
5. **Mains answer writing practice** — start from Day 1
6. **Revise, revise, revise** — what you read once, revise 5 times

📊 **Success Statistics:**
• ~10 lakh apply → 5 lakh appear in Prelims → 15,000 qualify
• ~900–1,100 finally selected each year
• Average attempts: 2–3 (maximum 6 for General, 9 for OBC)

💡 **Pro Tips:**
• Optional subject selection = critical (pick what you're passionate about)
• Consistency > Intensity (daily 8–10 hours beats cramming)
• Join a test series — mock Prelims + Mains answer writing
• Network with UPSC toppers — many share free notes online

Want me to explain any specific UPSC topic in detail? 🇮🇳`,
  },
];

// ─── Default response ─────────────────────────────────────────────────────

const DEFAULT_RESPONSE = `I'd be happy to help! I'm Sarthi AI, your educational and career guidance assistant. 🌟

I can assist you with:

🎯 **Career & Stream Guidance**
  → "Which stream should I choose after 10th?"
  → "What career suits me if I love Maths?"

📚 **Exam Preparation**
  → "How do I prepare for JEE/NEET?"
  → "Give me study tips for board exams"

📖 **Subject-Wise Help**
  → "How to improve in Physics / Chemistry / Maths / Biology?"

🎓 **Scholarships & Financial Aid**
  → "Which scholarships can I apply for?"

💼 **Internships**
  → "Where can I find engineering internships?"

🏛️ **College Admission**
  → "Which college for CSE with rank 5000 in JEE Main?"

🇮🇳 **UPSC Preparation**
  → "How to prepare for UPSC Civil Services?"

💪 **Motivation & Study Techniques**
  → "I'm feeling stressed about exams"

Just ask your question naturally and I'll give you a detailed, helpful answer! 🚀`;

// ─── Core matching function ───────────────────────────────────────────────

/**
 * Generate a chatbot response for the given message.
 * Tries to match against known rules; falls back to the default response.
 */
export function getChatbotResponse(message: string): string {
  const normalized = message.toLowerCase().trim();

  // Remove common punctuation for better matching
  const cleaned = normalized
    .replace(/[?!.,;:'"]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  for (const rule of rules) {
    for (const keyword of rule.keywords) {
      // Full-word / phrase match: the keyword must appear as a standalone phrase
      // Use word-boundary-like check: preceded and followed by space/start/end
      const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(`(^|\\s)${escaped}(\\s|$)`);
      if (regex.test(cleaned)) {
        return rule.response;
      }
    }
  }

  return DEFAULT_RESPONSE;
}
