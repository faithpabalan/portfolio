/* =====================================================================
   YOUR PORTFOLIO CONTENT
   ---------------------------------------------------------------------
   This is the only file you need to edit to change what the site says.
   The design reads everything from here.

   QUICK RULES
   • Any text that starts with "✎ " shows up on the site as a dashed
     "fill me in" note. Replace it with real info (and delete the ✎).
   • To hide every remaining ✎ note before you share the link, set
     settings.showPlaceholderHints to false.
   • Image paths are relative, e.g. "assets/img/gallery/front.jpg".
     Leave an image as "" to show a cute placeholder frame instead.
   • Feature statuses: "implemented", "tested", "in-development",
     "planned", or "to-confirm".
   ===================================================================== */

window.PORTFOLIO = {

  settings: {
    showPlaceholderHints: true
  },

  /* ---------------- YOU ---------------- */
  profile: {
    firstName: "Nerrylle",
    fullName: "Nerrylle Faith Pabalan",
    initials: "NF",
    role: "Computer Engineering Student",
    school: "STI College Calamba",
    program: "BS Computer Engineering",
    gradYear: "2027",
    location: "Calamba, Laguna",
    tagline: "I build small machines for everyday problems, like never having exact change.",
    openTo: "Open to OJT placements in embedded systems, hardware, and IT.",
    photo: "",                 // e.g. "assets/img/me.jpg"
    photoCaption: "that's me ♡"
  },

  /* What the little kiosk says when someone taps it */
  greetings: [
    "Hi! Need change? ♡",
    "Kumusta! I swap bills and coins.",
    "Bills → coins, coins → bills.",
    "I'm a thesis in progress ✿",
    "Scroll down to see how I work!"
  ],

  about: [
    "I'm a fourth-year Computer Engineering student at STI College Calamba. My favorite part of engineering is the moment an idea stops being a sketch and starts doing something: a motor turns, a sensor trips, a screen answers back.",
    "Most of what I enjoy sits where hardware meets software. I like writing the code, wiring the circuit, and modeling the parts in CAD, then figuring out why they don't work together on the first try.",
    "Right now I'm the hardware-software lead on our capstone, a kiosk that swaps Philippine bills and coins. It has pushed me well past my comfort zone in mechanical design, computer vision, and patience, and I'm looking for an OJT placement where I can keep learning that way."
  ],

  facts: [
    { label: "Recently built", value: "a 4-module bill dispenser for our thesis" },
    { label: "Based in", value: "Calamba, Laguna" },
    { label: "Learning", value: "computer vision with OpenCV" },
    { label: "Certified in", value: "BOSH SO2 · Cisco Intro to Cybersecurity" }
  ],

  /* ---------------- CONTACT ----------------
     Leave a link as "" and it shows as "link coming soon" (not clickable).
     Phone number and home address are intentionally NOT on the public site. */
  contact: {
    intro: "I'm looking for an OJT placement for 2026–2027. If you're working on embedded systems, hardware, or IT and could use a curious, hands-on student, I'd love to hear from you.",
    email: "pabalan.361525@calamba.sti.edu.ph",
    links: [
      { label: "GitHub",    icon: "code",      url: "" },   // e.g. "https://github.com/yourname"
      { label: "LinkedIn",  icon: "briefcase", url: "" },   // e.g. "https://www.linkedin.com/in/yourname"
      { label: "Resume / CV", icon: "doc",     url: "assets/Pabalan_CV.pdf" }   // public copy: no home address or phone
    ]
  },

  /* =================================================================
     THESIS
     ================================================================= */
  thesis: {
    title: "Smart Bi-Directional Philippine Currency Exchanger for Bills and Coins",
    lede: "A self-service kiosk that breaks bills into coins and turns coins back into bills, built around a Raspberry Pi 4, an Arduino Mega, computer vision, and a bill dispenser we designed from scratch.",
    meta: [
      "Capstone Design 1 & 2",
      "June 2026 – present",
      "Team of 3",
      "My role: Hardware-Software Lead",
      "Status: in progress"
    ],

    problem: {
      text: [
        "In the Philippines, exact change is part of everyday life. Jeepney and tricycle fares, sari-sari store purchases, parking, and vending machines all go smoother with the right coins.",
        "But a big bill is often hard to break for a small purchase, and drivers and small stores don't always have coins to spare. When people swap money by hand, it depends on someone being available, it takes time, and it's easy to miscount."
      ],
      notes: [
        "Fares and small purchases need exact or near-exact change",
        "Large bills are hard to break for small amounts",
        "Manual exchange depends on a person, is slow, and can be miscounted",
        "Coins pile up at home but are a hassle to turn back into bills"
      ]
    },

    solution: [
      "Our kiosk works in both directions. Insert a bill and it gives back coins. Insert coins and it gives back a bill.",
      "A Raspberry Pi 4 runs the touchscreen app and recognizes bills with computer vision. An Arduino Mega handles the sensors, motors, and dispensers. The two talk over a serial link, so the screen always knows what the hardware is doing."
    ],

    /* Interactive walkthrough. "screen" picks the illustration:
       choose | insert | scan | count | confirm | dispense | receipt
       Add  img: "assets/img/gallery/ui-step1.png"  to show a real screenshot instead. */
    flows: {
      billsToCoins: [
        { title: "Choose Bills → Coins", desc: "The customer picks the exchange direction on the touchscreen.", tech: "Touchscreen web UI served by Flask on the Raspberry Pi 4", screen: "choose" },
        { title: "Insert a bill", desc: "The bill goes into the bill entry slot.", tech: "Bill acceptance hardware, controlled by the Arduino Mega", screen: "insert", item: "bill" },
        { title: "Recognize the denomination", desc: "The system checks the bill and identifies how much it's worth.", tech: "OpenCV with ORB feature matching on the Raspberry Pi 4", screen: "scan" },
        { title: "Confirm the exchange", desc: "The screen shows the amount so the customer can confirm before anything is dispensed.", tech: "Flask transaction logic", screen: "confirm", direction: "coins" },
        { title: "Collect the coins", desc: "The Pi sends a dispense command and the coins drop into the tray.", tech: "Serial command from the Pi → Arduino Mega → coin dispensing hardware", screen: "dispense", item: "coins" },
        { title: "Get an e-receipt", desc: "The customer can receive a receipt of the transaction by SMS.", tech: "SMS receipt feature", screen: "receipt" }
      ],
      coinsToBills: [
        { title: "Choose Coins → Bills", desc: "The customer picks the exchange direction on the touchscreen.", tech: "Touchscreen web UI served by Flask on the Raspberry Pi 4", screen: "choose" },
        { title: "Insert coins", desc: "Coins go into the coin slot one at a time.", tech: "Coin sensing hardware read by the Arduino Mega", screen: "insert", item: "coins" },
        { title: "Watch the total add up", desc: "Each coin is counted and the running total updates on screen.", tech: "Arduino reports each coin over serial; the UI polls status in real time", screen: "count" },
        { title: "Confirm the exchange", desc: "Once the total matches a bill amount, the customer confirms.", tech: "Flask transaction logic and inventory check", screen: "confirm", direction: "bill" },
        { title: "Collect the bill", desc: "One of the four dispenser modules feeds out a single bill.", tech: "Custom bill dispenser: gearmotor, kicker roller, feed rollers, IR sensor to confirm", screen: "dispense", item: "bill" },
        { title: "Get an e-receipt", desc: "The customer can receive a receipt of the transaction by SMS.", tech: "SMS receipt feature", screen: "receipt" }
      ],
      note: "The screens here are simple illustrations of each step, not screenshots of our real interface. ✎ Swap in real UI screenshots once the interface is final."
    },

    /* System map. Positions are on a 900 × 440 grid (x, y = top-left). */
    hardware: [
      { id: "screen",  col: "in",  x: 30,  y: 20,  title: "Touchscreen", sub: "customer interface", icon: "screen",
        desc: "Where customers pick an exchange direction, confirm amounts, and see live status. It shows a web interface served by the Raspberry Pi.", status: "in-development" },
      { id: "camera",  col: "in",  x: 30,  y: 120, title: "Camera", sub: "bill recognition", icon: "camera", confirm: true,
        desc: "Captures the inserted bill so the Pi can recognize its denomination with OpenCV. ✎ Add the camera model you used.", status: "to-confirm" },
      { id: "billin",  col: "in",  x: 30,  y: 220, title: "Bill entry", sub: "bill acceptance", icon: "bill",
        desc: "Takes in the customer's bill for checking. Controlled by the Arduino Mega. ✎ Add the acceptor model or describe your mechanism.", status: "in-development" },
      { id: "coinin",  col: "in",  x: 30,  y: 320, title: "Coin sensing", sub: "coin input", icon: "coin",
        desc: "Detects and counts inserted coins and reports them to the Arduino Mega. ✎ Add the coin acceptor or sensor model.", status: "in-development" },

      { id: "pi",      col: "mid", x: 355, y: 90,  title: "Raspberry Pi 4", sub: "Flask · OpenCV · UI", icon: "cpu", main: true,
        desc: "The brain of the kiosk. Runs the Flask app and touchscreen interface, does OpenCV/ORB bill recognition, handles transaction logic and inventory, and sends commands to the Arduino over serial.", status: "in-development" },
      { id: "mega",    col: "mid", x: 355, y: 270, title: "Arduino Mega", sub: "sensors · motors", icon: "chip", main: true,
        desc: "Handles the real-time hardware: bill acceptance, coin sensing, and every dispensing motor. Reports status back to the Pi so the screen stays in sync.", status: "in-development" },

      { id: "billout", col: "out", x: 670, y: 20,  title: "Bill dispenser ×4", sub: "one module per bill", icon: "box",
        desc: "Our own design, now built: four identical modules, one per denomination. Each has a 6 V TT gearmotor driving a kicker roller and a pinch pair of feed rollers through a 3-gear spur train. Only one module runs at a time. ✎ Add which four denominations it holds.", status: "implemented", link: "#ch-process" },
      { id: "coinout", col: "out", x: 670, y: 120, title: "Coin dispenser", sub: "coin output", icon: "coins", confirm: true,
        desc: "Releases coins into the tray for Bills → Coins exchanges. ✎ Describe the mechanism you used.", status: "to-confirm" },
      { id: "ir",      col: "out", x: 670, y: 220, title: "IR sensors", sub: "dispense check", icon: "sensor",
        desc: "An IR break-beam at each bill exit confirms a bill actually left the module and tells the motor to stop. A second sensor near the pickup for jam and empty-stack detection is planned.", status: "in-development" },
      { id: "sms",     col: "out", x: 670, y: 320, title: "SMS receipt", sub: "e-receipt", icon: "phone", confirm: true,
        desc: "Sends the customer a text receipt after a transaction. ✎ Add the GSM module or SMS service you used.", status: "to-confirm" }
    ],
    wires: [
      ["screen", "pi"], ["camera", "pi"], ["pi", "mega", "USB serial"],
      ["billin", "mega"], ["coinin", "mega"],
      ["mega", "billout"], ["mega", "coinout"], ["ir", "mega"], ["pi", "sms"]
    ],

    software: {
      text: [
        "The software is split into two layers that talk to each other. The Raspberry Pi side is written in Python and does everything that needs a screen, a camera, or a decision. The Arduino side does everything that needs precise, real-time control of hardware.",
        "We designed a serial communication protocol between the two, so the app can send commands like \"dispense\" and get back transaction status, inventory counts, and errors as they happen."
      ],
      stack: [
        { layer: "Touchscreen interface", tech: "HTML · CSS · JavaScript", desc: "What the customer sees and taps. Polls the backend for live hardware status." },
        { layer: "Application server", tech: "Python · Flask", desc: "Transaction flow, inventory tracking, and SMS receipts." },
        { layer: "Bill recognition", tech: "OpenCV · ORB feature matching", desc: "Matches the features of an inserted bill against reference images to identify the denomination." },
        { layer: "Serial protocol", tech: "USB serial · Pi ⇄ Mega", desc: "Commands go down, sensor events and status come back up." },
        { layer: "Firmware", tech: "Arduino (C/C++)", desc: "Reads sensors and drives the motors and dispensers." }
      ]
    },

    features: [
      { title: "Bills → Coins exchange", desc: "Insert a bill, receive coins.", status: "in-development" },
      { title: "Coins → Bills exchange", desc: "Insert coins, receive a bill.", status: "in-development" },
      { title: "Bill denomination recognition", desc: "OpenCV + ORB feature matching identifies the bill.", status: "in-development" },
      { title: "Coin counting", desc: "Each inserted coin is sensed and added to a running total.", status: "in-development" },
      { title: "Foreign currency checking and conversion", desc: "Check supported foreign currencies and convert. ✎ Confirm which currencies and how far this got.", status: "to-confirm" },
      { title: "Inventory monitoring", desc: "Tracks how many bills and coins are left in the machine.", status: "in-development" },
      { title: "Real-time hardware status", desc: "The interface shows what the hardware is doing as it happens.", status: "in-development" },
      { title: "SMS e-receipts", desc: "A text receipt after each transaction.", status: "in-development" },
      { title: "Touchscreen web interface", desc: "A friendly, step-by-step customer interface.", status: "in-development" }
    ],
    featureNote: "Statuses reflect that the thesis is still in progress. ✎ Update each one to implemented, tested, or planned as you finish.",

    /* Philippine denominations. Set supported: true/false once confirmed. */
    denominations: {
      bills: [
        { value: 20,   supported: null },
        { value: 50,   supported: null },
        { value: 100,  supported: null },
        { value: 200,  supported: null },
        { value: 500,  supported: null },
        { value: 1000, supported: null }
      ],
      coins: [
        { value: 1,  supported: null },
        { value: 5,  supported: null },
        { value: 10, supported: null },
        { value: 20, supported: null }
      ],
      note: "✎ Mark which denominations your kiosk accepts and dispenses (set supported: true or false)."
    },

    process: {
      text: [
        "The part of the project I've spent the most time on is the bill dispenser. We wanted an original horizontal mechanism that feeds out exactly one bill at a time, backed by our own engineering calculations rather than copied from an ATM or vending machine.",
        "Below is the design log: the real problems we ran into and what we decided."
      ],
      sideViewCaption: "Approximate side view of one dispenser module, drawn from my design notes (mm). Not a fabrication drawing.",
      log: [
        { tag: "Concept", title: "One module per denomination",
          problem: "Four denominations means four dispensing mechanisms. Four fully separate sets of motors, drivers, and power would be expensive and bulky.",
          decision: "Four identical modules that share control and power. Dispensing is sequential (only one motor runs at a time), so the power supply and driver only need to handle one motor's load." },
        { tag: "Drive", title: "Geared DC motor over a stepper",
          problem: "We needed enough torque to pull a bill off the stack without overcomplicating control.",
          decision: "A 6 V TT gearmotor per module (180 RPM no-load, about 78 mN·m stall torque) with sensor feedback, instead of a NEMA 17 stepper." },
        { tag: "Power transmission", title: "Linking the rollers with gears",
          problem: "The kicker roller and the feed rollers sit about 60 mm apart and must turn in the same direction.",
          decision: "A row of three identical spur gears with a free idler in the middle, inspired by a real motor-driven note dispenser. An even number of meshes keeps both rollers turning the same way, and the gears 3D-print easily. Sized and strength-checked in Solid Edge's Spur Gear Designer (passed)." },
        { tag: "Clearance", title: "Bearings that overlapped",
          problem: "608 bearings are Ø22 mm. Two of them can't fit side by side when the feed rollers are only 21.5 mm apart.",
          decision: "Switched to 688-2RS bearings: same 8 mm bore for the shafts, but only Ø16 mm outside." },
        { tag: "Electronics", title: "Choosing a motor driver",
          problem: "The gearmotor can draw up to 2.8 A at stall, which is more than the L293D driver we first planned on can handle.",
          decision: "Re-evaluated the driver (TB6612FNG and L298N were considered). ✎ Add the driver you finally chose and why." },
        { tag: "Reliability", title: "One bill, every time",
          problem: "Rollers that grip well can also pull two bills at once.",
          decision: "Rubber on only one curved face of the kicker so it grabs once per turn, a slight squeeze between the feed rollers, and a rubber separation pad at the exit set to one bill's thickness." },
        { tag: "Sensing", title: "Knowing a bill really came out",
          problem: "The machine needs to know a dispense actually happened before it updates the transaction.",
          decision: "An IR break-beam at the exit confirms each bill and stops the motor. A second sensor near the pickup is planned for empty-stack, jam, and double-feed detection." }
      ],
      gearSpec: [
        ["Module", "1.25"],
        ["Teeth", "24"],
        ["Pressure angle", "20°"],
        ["Pitch diameter", "Ø30 mm"],
        ["Outside diameter", "Ø32.5 mm"],
        ["Face width", "8 mm"],
        ["Bore", "8 mm"],
        ["Centre distance", "30 mm"]
      ],
      lessons: [
        "✎ What did this project teach you? (e.g. about designing for real tolerances, integrating hardware and software, or working as a team)",
        "✎ What would you do differently next time?",
        "✎ What was the hardest bug and how did you find it?"
      ]
    },

    results: {
      intro: "Testing is still underway. These cards will hold our verified results once we have them.",
      metrics: [
        { label: "Bill recognition accuracy", value: "✎ —", how: "✎ How you measured it (e.g. correct / total trials)" },
        { label: "Average transaction time", value: "✎ —", how: "✎ From bill insert to coins in tray" },
        { label: "Dispense success rate", value: "✎ —", how: "✎ Single-bill dispenses / total attempts" },
        { label: "Test transactions run", value: "✎ —", how: "✎ Total trials across all tests" }
      ],
      tests: [
        ["✎ Bill recognition per denomination", "✎", "✎", "✎"],
        ["✎ Single-bill dispensing", "✎", "✎", "✎"],
        ["✎ Coin counting", "✎", "✎", "✎"]
      ],
      feedback: { quote: "✎ Add a real quote from a user test or your panel, if you have one.", who: "✎ who said it" }
    },

    /* Put your photos in assets/img/gallery/ and set src to their path. */
    gallery: [
      { src: "", caption: "The full prototype, front view", alt: "Front view of the currency exchanger kiosk prototype" },
      { src: "", caption: "Enclosure", alt: "The kiosk enclosure" },
      { src: "", caption: "Touchscreen interface", alt: "The touchscreen user interface" },
      { src: "", caption: "Bill dispenser module (Solid Edge)", alt: "CAD model of one bill dispenser module in Solid Edge" },
      { src: "", caption: "Internal wiring and electronics", alt: "Raspberry Pi, Arduino Mega and wiring inside the kiosk" },
      { src: "", caption: "Testing day", alt: "The team testing the prototype" }
    ],

    contributions: {
      role: "Hardware-Software Lead",
      summary: "I'm one of three team members. ✎ Edit this list so it matches exactly what you did.",
      items: [
        "Led the system architecture and the integration between the Raspberry Pi and Arduino",
        "Designed the 4-module bill dispenser in Siemens Solid Edge: gear train, kicker roller, feed rollers, and separation system",
        "Built the serial communication protocol between the application and the embedded hardware",
        "Programmed the microcontroller to work with sensors and actuators",
        "Tested, debugged, and troubleshot the hardware and software with the team"
      ],
      team: [
        { name: "✎ Teammate name", role: "✎ their role" },
        { name: "✎ Teammate name", role: "✎ their role" }
      ],
      adviser: "✎ Adviser name (optional)"
    }
  },

  /* =================================================================
     OTHER PROJECTS
     category options: "hardware", "cad", "embedded", "software", "networking"
     To add a project, copy one { ... } block and edit it.
     ================================================================= */
  projects: [
    {
      title: "4-Module Bill Dispenser Mechanism",
      when: "2026",
      categories: ["cad", "hardware"],
      icon: "gear",
      image: "",
      summary: "An original horizontal mechanism that feeds one Philippine bill at a time from a stack. Designed for our thesis kiosk and now built.",
      tech: ["Siemens Solid Edge 2025", "Spur gear design", "TT gearmotor", "IR break-beam", "3D printing"],
      details: "Each module uses a kicker roller to pull the bottom bill, a pinch pair of feed rollers to carry it out, and a three-gear spur train to keep the rollers in sync. I modeled the custom parts (side plates, guide plate, rollers, shafts, gears) and used off-the-shelf bearings, fasteners, motors, and sensors.",
      contributions: ["Modeled the custom parts and assembly in Solid Edge", "Sized the gear train with the Spur Gear Designer", "Solved the bearing clearance and motor driver issues"],
      lessons: ["✎ What you learned"],
      links: [{ label: "Read the design log", url: "#ch-process" }]
    },
    {
      title: "Engineering Drafting and Design Prototyping",
      when: "AY 2024–2025",
      categories: ["cad"],
      icon: "box",
      image: "",
      summary: "Coursework in computer-aided drafting: parametric 3D models, assemblies, and production-ready engineering drawings.",
      tech: ["Siemens Solid Edge", "Parametric modeling", "Assemblies", "GD&T"],
      details: "Built accurate parametric 3D models and multi-part assemblies, then produced engineering drawings. Applied geometric dimensioning and tolerancing (GD&T) so parts and enclosures would fit and work as designed.",
      contributions: ["Project developer (academic coursework)"],
      lessons: ["✎ What you learned"],
      links: []
    },
    {
      placeholder: true,
      title: "✎ Your next project",
      when: "",
      categories: [],
      icon: "sparkle",
      image: "",
      summary: "Copy a project block in content.js to add more work here: a lab project, a circuit, an app, or anything you're proud of.",
      tech: [],
      details: "",
      contributions: [],
      lessons: [],
      links: []
    }
  ],

  /* =================================================================
     SKILLS — only things backed by your coursework, thesis, or certs.
     "used" explains where you used it (shown when someone clicks).
     ================================================================= */
  skills: [
    { category: "Programming", icon: "code", items: [
      { name: "Python", used: "Thesis: Flask app and OpenCV recognition on the Raspberry Pi" },
      { name: "C / C++", used: "Thesis: Arduino Mega firmware for sensors and motors" },
      { name: "Java", used: "Coursework: Object-Oriented Programming" },
      { name: "HDL", used: "Coursework: Introduction to HDL" },
      { name: "Object-Oriented Programming", used: "Coursework" },
      { name: "Data Structures & Algorithms", used: "Coursework" }
    ]},
    { category: "Embedded Systems", icon: "chip", items: [
      { name: "Arduino Mega", used: "Thesis: controls bill acceptance, coin sensing, and dispensing" },
      { name: "Raspberry Pi 4", used: "Thesis: runs the app, UI, and computer vision" },
      { name: "Serial communication", used: "Thesis: designed the Pi ⇄ Arduino protocol" },
      { name: "Sensors & actuators", used: "Thesis: IR break-beam sensing, gearmotors" },
      { name: "Microprocessors", used: "Coursework: Microprocessors, Embedded Systems" }
    ]},
    { category: "Hardware & Electronics", icon: "sensor", items: [
      { name: "Circuit analysis", used: "Coursework" },
      { name: "Logic circuit design", used: "Coursework: Logic Circuits and Design" },
      { name: "DC motors & drivers", used: "Thesis: TT gearmotor and motor driver selection" },
      { name: "Hardware troubleshooting", used: "Thesis: debugging across hardware and software" }
    ]},
    { category: "Web Development", icon: "screen", items: [
      { name: "Flask", used: "Thesis: application server and transaction logic" },
      { name: "HTML / CSS / JavaScript", used: "Thesis: touchscreen interface, and this portfolio" }
    ]},
    { category: "Computer Vision", icon: "eye", items: [
      { name: "OpenCV", used: "Thesis: bill recognition" },
      { name: "ORB feature matching", used: "Thesis: identifying bill denominations" }
    ]},
    { category: "Design & CAD", icon: "gear", items: [
      { name: "Siemens Solid Edge", used: "Thesis dispenser design; drafting coursework; Solid Edge certification" },
      { name: "GD&T", used: "Coursework: engineering drafting" },
      { name: "Spur gear design", used: "Thesis: 3-gear train sized in Spur Gear Designer" },
      { name: "3D printing", used: "Thesis: printed dispenser parts" }
    ]},
    { category: "Networking & Security", icon: "shield", items: [
      { name: "TCP/IP", used: "Coursework: Computer Network and Security, Network Technology" },
      { name: "Routing & switching", used: "Coursework: Network Technology" },
      { name: "Cybersecurity fundamentals", used: "Cisco Networking Academy: Introduction to Cybersecurity" },
      { name: "Systems administration", used: "Coursework: Systems Administration" }
    ]},
    { category: "Safety", icon: "heart", items: [
      { name: "OSH standards", used: "BOSH SO2 training (DOLE): RA 11058, DOLE DO 252-25" },
      { name: "Hazard identification & risk assessment", used: "BOSH SO2 training (DOLE)" }
    ]}
  ],

  certifications: [
    { name: "Safety Officer 2 (BOSH SO2)", issuer: "Department of Labor and Employment (DOLE)", date: "April 2026", url: "" },
    { name: "Certified Associate, Solid Edge", issuer: "Siemens Digital Industries Software", date: "✎ Month Year", url: "" },
    { name: "Introduction to Cybersecurity", issuer: "Cisco Networking Academy", date: "September 2026", url: "" }
  ],

  /* ---------------- EDUCATION & TIMELINE ---------------- */
  education: {
    school: "STI College Calamba",
    program: "Bachelor of Science in Computer Engineering",
    years: "Expected 2027",
    location: "Calamba, Laguna",
    coursework: [
      "Microprocessors", "Embedded Systems", "Logic Circuits and Design",
      "Data Structures and Algorithms", "Computer Network and Security",
      "Object-Oriented Programming", "Introduction to HDL",
      "Systems Administration", "Digital Signal Processing",
      "Network Technology", "CpE Laws and Professional Practice"
    ]
  },

  /* Oldest first. kind: "school" | "thesis" | "cert" | "goal" */
  journey: [
    { date: "AY 2024–2025", title: "Engineering drafting coursework", text: "Learned parametric modeling, assemblies, and GD&T in Siemens Solid Edge.", kind: "school" },
    { date: "April 2026", title: "Safety Officer 2 (BOSH SO2)", text: "Completed DOLE's 40-hour basic occupational safety and health training.", kind: "cert" },
    { date: "June 2026", title: "Started the capstone", text: "Began Capstone Design with our currency exchanger as hardware-software lead.", kind: "thesis" },
    { date: "September 2026", title: "Introduction to Cybersecurity", text: "Earned the Cisco Networking Academy student credential.", kind: "cert" },
    { date: "✎ Month Year", title: "Solid Edge Certified Associate", text: "Siemens Digital Industries Software credential in 3D CAD modeling and drafting.", kind: "cert" },
    { date: "2027", title: "Graduation (expected)", text: "Bachelor of Science in Computer Engineering, STI College Calamba.", kind: "goal" }
  ]
};
