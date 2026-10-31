# What I still need to add

Everything below shows on the site as a pink dashed **✎ note** until it's filled in (all in `assets/js/content.js` unless noted). Nothing on the site was invented: anything I couldn't confirm was left as a note for you.

## Photos

Put them in `assets/img/gallery/` or `assets/img/projects/`, then set the path in `content.js`. Keep each under ~400 KB.

- [ ] **Profile photo** → `profile.photo` (a friendly, well-lit photo; portrait shape works best)
- [ ] **Prototype, front view** → `thesis.gallery[0]`
- [ ] **Enclosure** → `thesis.gallery[1]`
- [ ] **Touchscreen interface** (screenshot is fine) → `thesis.gallery[2]`
- [ ] **Bill dispenser module, Solid Edge render or screenshot** → `thesis.gallery[3]`
- [ ] **Internal wiring/electronics** → `thesis.gallery[4]`
- [ ] **Testing day / team photo** (ask teammates before posting faces) → `thesis.gallery[5]`
- [ ] *(Optional)* Real UI screenshots for each walkthrough step → add `img:` to steps in `thesis.flows`
- [ ] *(Optional)* Project images → `projects[].image`

## Links

- [ ] **GitHub** profile URL → `contact.links`
- [ ] **LinkedIn** profile URL → `contact.links`
- [x] **CV PDF** without your home address and phone → already in `assets/Pabalan_CV.pdf` and linked. Replace it whenever your CV changes.
- [ ] *(Optional)* Certificate verification links → `certifications[].url`

## Thesis facts to confirm

**Hardware** (`thesis.hardware`)
- [ ] Which four bill denominations the 4-module dispenser holds
- [ ] Camera model used for bill recognition
- [ ] How bills are accepted (acceptor model or your own mechanism)
- [ ] Coin acceptor / coin sensor model
- [ ] Coin dispenser mechanism
- [ ] SMS: GSM module model or SMS service used

**Design log** (`thesis.process.log`)
- [ ] The motor driver you finally chose and why (TB6612FNG, L298N, or something else)

**Features** (`thesis.features`, `thesis.denominations`)
- [ ] Update every feature status (implemented / tested / in-development / planned)
- [ ] Foreign currency checking and conversion: which currencies, and how far it got
- [ ] Which bill and coin denominations the kiosk supports (`supported: true` or `false`)

**People** (`thesis.contributions`)
- [ ] Edit "My contributions" so it matches exactly what **you** did
- [ ] Teammates' names and roles (ask if they're okay being named)
- [ ] Adviser's name (optional)

## Results (`thesis.results`)

Only add numbers you actually measured.

- [ ] Bill recognition accuracy, and how you measured it
- [ ] Average transaction time
- [ ] Dispense success rate (single-bill dispenses ÷ attempts)
- [ ] Total test transactions
- [ ] Test log rows: test name, trials, result, notes
- [ ] *(Optional)* A real quote from a user test or your panel

## Your own words

- [ ] Lessons learned from the thesis → `thesis.process.lessons`
- [ ] What you learned in each project → `projects[].lessons`

## Other details

- [ ] Solid Edge certification date (Month Year) → `certifications` and `journey`
- [ ] More projects for the projects section (for example the MP3 player enclosure you designed in Solid Edge, lab projects, circuits, apps). Then delete the placeholder project.
- [ ] Double-check the About text sounds like you → `about`

## Before you share the link

- [ ] Set `settings.showPlaceholderHints` to `false` (hides any notes you haven't filled in yet)
- [ ] Fill in `og:url` and `og:image` in `index.html` with your real link (see README, step 5)
- [ ] Open the site on your phone and tap through every section
- [ ] Paste the link into Messenger or LinkedIn to check the preview picture
