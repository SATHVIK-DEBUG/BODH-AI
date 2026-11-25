import { Conversation } from '../types';

export const INITIAL_MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-quantum',
    title: 'Quantum Mechanics',
    subject: 'Physics',
    updatedAt: 'Today',
    messages: [
      {
        id: 'msg-q-1',
        role: 'user',
        content: 'Why do electrons create an interference pattern in the double-slit experiment if they are particles?',
        timestamp: '10:14 AM',
      },
      {
        id: 'msg-q-2',
        role: 'assistant',
        isSimulated: true,
        conceptFocus: 'Wave-Particle Duality & Probability Amplitudes',
        timestamp: '10:14 AM',
        content: `Great question—this is one of the cleanest places where everyday intuition meets quantum mechanics.

**1. The Common Misconception**
We tend to picture an electron as either a tiny solid marble (particle) or a spread-out water ripple (wave). Quantum objects are neither classical marbles nor classical water waves—they are described by a **wavefunction** (ψ) that evolves like a wave, while measurements register discrete, localized events like a particle.

**2. What Actually Happens at the Slits**
When an electron is emitted without any detector measuring which slit it passes through, its probability amplitude propagates through *both* slits simultaneously. Those amplitudes add together (constructive interference) in some regions of the screen and cancel out (destructive interference) in others.

**3. One Detection at a Time**
Each individual electron still hits the detector screen as a single localized dot. However, the probability of *where* that dot lands is given by |ψ|². After thousands of single electrons arrive, the cumulative dots form bright and dark interference fringes.

**Check Your Understanding**
If we place a detector at one slit to observe which path each electron takes, the two paths can no longer interfere coherently—so the interference bands disappear and you get two classical clumps instead.`,
        followUpSuggestions: [
          'What does the wavefunction physically represent?',
          'Why does measurement collapse the interference pattern?',
        ],
      },
    ],
  },
  {
    id: 'conv-newtons-laws',
    title: "Newton's Laws",
    subject: 'Physics',
    updatedAt: 'Today',
    messages: [
      {
        id: 'msg-n-1',
        role: 'user',
        content: "If an object is moving at constant velocity, doesn't there have to be a forward force keeping it moving?",
        timestamp: '9:40 AM',
      },
      {
        id: 'msg-n-2',
        role: 'assistant',
        isSimulated: true,
        conceptFocus: "Newton's First & Second Laws (Inertia vs. Net Force)",
        timestamp: '9:40 AM',
        content: `This is one of the most universal misconceptions in introductory physics—and it comes straight from everyday experience on Earth.

**1. Why the Intuition Feels Right**
When you slide a book across a table and stop pushing, it slows down and stops. It looks like motion naturally dies out unless a force sustains it.

**2. What Is Actually Happening**
The book stops not because motion requires a force, but because **friction** exerts an unbalanced backward force that changes the book's velocity. When you push a puck at constant speed across a rough floor, your forward push is simply canceling friction so that the **net force is zero**:

F_net = F_push − F_friction = 0  ⇒  a = 0

**3. The Core Principle (Newton's First Law)**
Force does not cause velocity; **net force causes acceleration** (a change in velocity). An object with zero net force maintains constant velocity—whether that velocity is 0 m/s or 100 m/s in deep space.

**Quick Thought Experiment**
Imagine sliding the same puck on progressively smoother ice. As friction approaches zero, the force needed to maintain constant velocity also approaches zero.`,
        followUpSuggestions: [
          'Explain Newton’s Third Law action-reaction pairs',
          'Walk through a free-body diagram on an incline',
        ],
      },
    ],
  },
  {
    id: 'conv-chemical-bonding',
    title: 'Chemical Bonding',
    subject: 'Chemistry',
    updatedAt: 'Yesterday',
    messages: [
      {
        id: 'msg-c-1',
        role: 'user',
        content: 'How can I tell conceptually whether two atoms will form an ionic bond or a covalent bond?',
        timestamp: '4:22 PM',
      },
      {
        id: 'msg-c-2',
        role: 'assistant',
        isSimulated: true,
        conceptFocus: 'Electronegativity Continuum & Electrostatic Stability',
        timestamp: '4:22 PM',
        content: `Instead of memorizing a rigid binary list, think of chemical bonding as a **continuous tug-of-war for valence electrons** governed by electronegativity.

**1. Why Atoms Bond in the First Place**
Atoms form bonds because the bonded arrangement has **lower potential energy** than separated atoms—electrostatic attractions between nuclei and electrons outweigh repulsions.

**2. The Electronegativity Continuum**
- **Nonpolar Covalent (very small ΔEN):** Both atoms pull on the shared electron pair nearly equally (e.g., H₂, O₂).
- **Polar Covalent (moderate ΔEN):** Both atoms share electrons, but the more electronegative atom pulls electron density closer, creating partial charges δ⁻ and δ⁺ (e.g., H₂O, HCl).
- **Ionic (large ΔEN):** One atom attracts the valence electron so strongly that electron transfer occurs, producing oppositely charged ions held in an electrostatic crystal lattice (e.g., Na⁺ and Cl⁻ in NaCl).

**3. Key Concept Check**
Even in "ionic" solids there is a tiny degree of electron cloud distortion, and most bonds between different elements sit somewhere along the polar covalent spectrum.`,
        followUpSuggestions: [
          'Why does water have a bent molecular shape?',
          'Compare lattice energy with covalent bond energy',
        ],
      },
    ],
  },
  {
    id: 'conv-math',
    title: 'Mathematics',
    subject: 'Calculus',
    updatedAt: 'Yesterday',
    messages: [
      {
        id: 'msg-m-1',
        role: 'user',
        content: 'What is the intuitive meaning of a derivative without just memorizing power rules?',
        timestamp: '2:05 PM',
      },
      {
        id: 'msg-m-2',
        role: 'assistant',
        isSimulated: true,
        conceptFocus: 'Instantaneous Rate of Change & Local Linearity',
        timestamp: '2:05 PM',
        content: `The heart of a derivative is **local linearity**: if you zoom in far enough on any smooth curve, it looks indistinguishable from a straight line.

**1. Average vs. Instantaneous Rate**
If you drive 120 km in 2 hours, your average speed is 60 km/h. That tells you nothing about what your speedometer reads at one exact second. To capture the exact rate at time t, we shrink the time interval Δt closer and closer to zero:

f'(x) = lim (h → 0) [ f(x + h) − f(x) ] / h

**2. Geometric Meaning**
For any non-zero h, the ratio gives the slope of a **secant line** connecting two points on the curve. As h → 0, that secant pivots into the **tangent line**—the best straight-line approximation to the function right at x.

**3. Why It Matters**
Power rules and chain rules are just shortcuts for computing this limit. Once you see f'(x) as "how sensitive the output is to a tiny nudge in the input," derivatives immediately make sense across physics, economics, and biology.`,
        followUpSuggestions: [
          'How does the chain rule work intuitively?',
          'Connect derivatives to integrals via the Fundamental Theorem',
        ],
      },
    ],
  },
  {
    id: 'conv-thermo',
    title: 'Thermodynamics',
    subject: 'Physics & Chemistry',
    updatedAt: '2 days ago',
    messages: [
      {
        id: 'msg-t-1',
        role: 'user',
        content: 'Does the Second Law of Thermodynamics mean entropy can never decrease anywhere?',
        timestamp: '11:30 AM',
      },
      {
        id: 'msg-t-2',
        role: 'assistant',
        isSimulated: true,
        conceptFocus: 'System vs. Surroundings in the Second Law',
        timestamp: '11:30 AM',
        content: `No—entropy decreases locally all the time! A freezer turning liquid water into an ordered ice crystal reduces the water's entropy.

**1. Where the Misconception Comes From**
People often forget the words **"in an isolated system."** The Second Law states that the **total** entropy of a system *plus* its surroundings never decreases for any spontaneous process:

ΔS_universe = ΔS_system + ΔS_surroundings ≥ 0

**2. How Local Order Happens**
Your refrigerator removes thermal energy from inside the freezer (decreasing internal entropy), but its compressor does electrical work and exhausts an even larger amount of heat into your kitchen. The entropy increase of the room air exceeds the entropy drop inside the freezer.

**3. Statistical Intuition**
Entropy measures the number of microscopic arrangements (microstates) corresponding to a macroscopic state. Energy naturally spreads out simply because dispersed configurations overwhelmingly outnumber concentrated ones.`,
        followUpSuggestions: [
          'Explain the difference between heat and temperature',
          'How does Gibbs free energy combine enthalpy and entropy?',
        ],
      },
    ],
  },
];
