export interface SimulatedResponsePayload {
  content: string;
  conceptFocus: string;
  followUpSuggestions: string[];
}

export const SUGGESTED_PROMPTS = [
  "Explain Newton's Laws",
  'Solve this physics problem',
  'What is photosynthesis?',
  'Explain chemical bonding',
];

export function matchMockEducationalResponse(prompt: string): SimulatedResponsePayload {
  const normalized = prompt.toLowerCase();

  if (normalized.includes('newton') || normalized.includes('inertia') || normalized.includes('force')) {
    return {
      conceptFocus: "Newton's Three Laws of Motion",
      content: `Let’s build Newton’s Laws from physical intuition rather than memorizing three isolated sentences.

**1. First Law — Inertia (What Happens When Net Force Is Zero)**
An object keeps its current velocity (speed and direction) unless an unbalanced **net force** acts on it. Motion does not require a continuous push—*changing* motion does.

**2. Second Law — Quantitative Cause and Effect (F_net = m · a)**
When a net force acts on an object of mass m, its acceleration is directly proportional to the net force and inversely proportional to its mass:
a = F_net / m

Notice that mass measures resistance to acceleration (inertia). Doubling mass for the same net force halves acceleration.

**3. Third Law — Forces Come in Mutual Interactions**
Whenever Object A pushes or pulls Object B, Object B simultaneously exerts a force of equal magnitude and opposite direction back on Object A.
Crucial misconception check: these two forces act on **different objects**, which is why they do not cancel each other out when analyzing a single object’s motion.

**Concept Check**
If a horse pulls a cart forward and the cart pulls the horse backward with equal force, why does the cart accelerate? Because on the *cart alone*, the forward pull from the horse exceeds ground friction.`,
      followUpSuggestions: [
        'Walk through a free-body diagram example',
        'Why don’t action and reaction forces cancel out?',
        'Apply Newton’s Second Law to an elevator problem',
      ],
    };
  }

  if (
    normalized.includes('physics problem') ||
    normalized.includes('solve') ||
    normalized.includes('kinematics') ||
    normalized.includes('velocity') ||
    normalized.includes('acceleration')
  ) {
    return {
      conceptFocus: 'Structured Physics Problem-Solving Framework',
      content: `Instead of jumping straight to a formula, Bodh approaches every physics problem through four disciplined steps. Let’s walk through a classic example together:

**Sample Problem:** A 4.0 kg block starts from rest on a frictionless horizontal track and experiences a constant horizontal force of 12 N for 5.0 seconds. Find its final velocity and displacement.

**Step 1 — Identify the Physical Model & Assumptions**
- Track is frictionless ⇒ the 12 N pull is the entire horizontal net force.
- Force is constant ⇒ acceleration is constant, so constant-acceleration kinematics apply.

**Step 2 — Connect Force to Acceleration**
a = F_net / m = 12 N / 4.0 kg = 3.0 m/s²

**Step 3 — Determine Velocity & Displacement**
- Final velocity: v = v₀ + a·t = 0 + (3.0 m/s²)(5.0 s) = **15 m/s**
- Displacement: Δx = v₀·t + ½·a·t² = 0 + ½(3.0 m/s²)(5.0 s)² = **37.5 m**

**Step 4 — Dimensional & Energy Sanity Check**
Work done by the force: W = F · Δx = 12 N × 37.5 m = 450 J.
Final kinetic energy: KE = ½ m v² = ½(4.0)(15)² = 450 J. Both methods agree exactly.

If you have a specific problem with your own numbers, paste it here and share which step feels unclear.`,
      followUpSuggestions: [
        'What changes if friction is included?',
        'Explain when to use energy conservation instead of forces',
        'Check units and dimensional analysis rules',
      ],
    };
  }

  if (normalized.includes('photosynthesis') || normalized.includes('chlorophyll') || normalized.includes('plant')) {
    return {
      conceptFocus: 'Photosynthesis: Energy Conversion & Carbon Fixation',
      content: `Photosynthesis is best understood as a **two-stage energy conversion system** that stores solar energy inside chemical bonds.

**Overall Balanced Equation**
6 CO₂ + 6 H₂O + light energy → C₆H₁₂O₆ + 6 O₂

**Stage 1 — Light-Dependent Reactions (Thylakoid Membranes)**
- Chlorophyll absorbs photons, exciting electrons along an electron transport chain.
- Water molecules (H₂O) are split to replenish electrons, releasing **O₂ gas** as a byproduct.
- The energy captured drives the production of two energy carriers: **ATP** and **NADPH**.

**Stage 2 — Calvin Cycle / Light-Independent Reactions (Stroma)**
- Using ATP and NADPH from Stage 1, the enzyme RuBisCO fixes carbon dioxide (**CO₂**) from the air into three-carbon sugar precursors that form glucose and structural carbohydrates.

**Common Misconception Check**
Many learners assume plants build most of their solid mass from soil nutrients. In reality, soil provides water and trace minerals, while the overwhelming majority of a plant’s dry carbon mass comes directly from **CO₂ in the air**.`,
      followUpSuggestions: [
        'Compare photosynthesis with cellular respiration',
        'Why do leaves appear green to the human eye?',
        'What limits the rate of photosynthesis?',
      ],
    };
  }

  if (
    normalized.includes('chemical bond') ||
    normalized.includes('covalent') ||
    normalized.includes('ionic') ||
    normalized.includes('molecule')
  ) {
    return {
      conceptFocus: 'Chemical Bonding & Electronegativity',
      content: `Chemical bonds form because nuclei and electrons can arrange themselves into a **lower-energy, electrostatically more stable state** than isolated atoms.

**1. Covalent Bonding (Electron Sharing)**
Typically between nonmetals with similar electronegativities. Valence electron clouds overlap between nuclei, pulling both positively charged nuclei toward the shared negative density.
- *Nonpolar covalent:* Equal sharing (e.g., N₂, CH₄).
- *Polar covalent:* Unequal sharing creating a dipole (e.g., H₂O).

**2. Ionic Bonding (Electron Transfer & Lattice Attraction)**
When electronegativity difference is large (typically a metal and a nonmetal), electrons transfer to form cations (+) and anions (−). Notice that an ionic compound like NaCl does not form isolated "molecules"—it forms a repeating 3D **crystal lattice** where every ion attracts all oppositely charged neighbors.

**3. Metallic Bonding (Delocalized Electron Sea)**
Metal atoms contribute valence electrons to a shared mobile cloud, which explains why metals conduct electricity and bend without shattering.

**Check Your Intuition**
Breaking any chemical bond always *requires* energy input; forming a bond *releases* energy.`,
      followUpSuggestions: [
        'Why does breaking bonds require energy if ATP releases energy?',
        'Explain VSEPR molecular geometry',
        'Compare hydrogen bonds with covalent bonds',
      ],
    };
  }

  if (
    normalized.includes('quantum') ||
    normalized.includes('wavefunction') ||
    normalized.includes('slit') ||
    normalized.includes('uncertainty')
  ) {
    return {
      conceptFocus: 'Quantum Superposition & Measurement',
      content: `Quantum mechanics replaces deterministic trajectories with **probability amplitudes**.

**1. What the Wavefunction Tells Us**
The wavefunction ψ(x, t) encodes the state of a quantum system. While ψ itself can be complex-valued and interfere with itself, its squared magnitude |ψ(x, t)|² gives the probability density of detecting the particle at position x.

**2. Why Measurement Changes Interference**
Interference occurs only when multiple indistinguishable paths contribute to the same outcome. Gathering "which-path" information entangles the particle with the detector, destroying phase coherence between the paths.

**3. Heisenberg’s Uncertainty Principle**
Δx · Δp ≥ ħ / 2 is not merely a limitation of clumsy measuring instruments—it is a fundamental mathematical property of wave packets. A sharply localized wave packet requires a wide spread of wavelengths (and therefore momenta).`,
      followUpSuggestions: [
        'Explain the photoelectric effect conceptually',
        'How are atomic orbitals different from planetary orbits?',
      ],
    };
  }

  if (
    normalized.includes('calculus') ||
    normalized.includes('derivative') ||
    normalized.includes('integral') ||
    normalized.includes('chain rule') ||
    normalized.includes('math')
  ) {
    return {
      conceptFocus: 'Mathematical Reasoning & Intuition',
      content: `Let’s unpack the conceptual structure behind calculus rather than treating it as symbol manipulation.

**1. Derivatives Measure Local Sensitivity**
A derivative f'(x) answers: *"If I nudge the input x by a tiny amount dx, how many times larger is the resulting nudge in the output dy?"*

**2. Integrals Accumulate Infinitesimal Contributions**
An integral ∫ f(x) dx answers the inverse question: *"If I know the rate of change at every instant, what is the total accumulated change over an interval?"*

**3. The Fundamental Bridge**
Differentiation and integration are inverse operations because the rate at which an accumulated area grows at point x equals the height of the curve f(x) right at that boundary.

Try sharing a specific function or theorem, and we can break down both the geometric picture and formal steps.`,
      followUpSuggestions: [
        'Explain the intuition behind the Chain Rule',
        'Why do we add "+ C" to indefinite integrals?',
      ],
    };
  }

  if (
    normalized.includes('entropy') ||
    normalized.includes('thermodynamics') ||
    normalized.includes('heat') ||
    normalized.includes('temperature')
  ) {
    return {
      conceptFocus: 'Thermodynamics: Energy, Heat & Entropy',
      content: `Clear definitions prevent almost every confusion in thermodynamics:

**1. Temperature vs. Heat**
- **Temperature** measures the average translational kinetic energy per particle (an intensive property).
- **Heat (Q)** is *energy in transit* across a boundary solely because of a temperature difference. Objects do not "contain heat"—they contain **internal energy**.

**2. First Law (Conservation of Energy)**
ΔU = Q − W (depending on work sign convention). Energy changes form between thermal transfer and mechanical work, but total energy is conserved.

**3. Second Law (Direction of Spontaneous Change)**
Thermal energy flows spontaneously from warmer bodies to cooler bodies because spreading energy across more particles vastly increases the number of accessible microscopic arrangements (higher total entropy).`,
      followUpSuggestions: [
        'Explain isothermal vs. adiabatic expansion',
        'Why can no heat engine be 100% efficient?',
      ],
    };
  }

  return {
    conceptFocus: 'Structured Conceptual Exploration',
    content: `Here is how Bodh’s conceptual reasoning framework breaks down your question: **"${prompt.trim()}"**

**1. Identify the Governing Principle**
Before applying formulas or memorizing definitions, start by asking: *What underlying law, mechanism, or conserved quantity governs this system?* Isolating the core relationship makes edge cases predictable.

**2. Check Hidden Assumptions & Definitions**
Most confusion arises when two related terms are blended together (for instance, rate vs. total amount, or correlation vs. mechanism). Write down what each variable or concept strictly means and its boundary conditions.

**3. Test With a Limiting Case**
Ask what happens if a key quantity becomes very large or approaches zero. If your mental model predicts something physically or logically impossible, you have spotted a hidden misconception worth repairing.

*Note: This is a simulated frontend preview response. Try asking about Newton's Laws, Photosynthesis, Chemical Bonding, Quantum Mechanics, Calculus, or Thermodynamics to explore detailed topic-specific walkthroughs.*`,
    followUpSuggestions: [
      "Explain Newton's Laws",
      'What is photosynthesis?',
      'Explain chemical bonding',
    ],
  };
}
