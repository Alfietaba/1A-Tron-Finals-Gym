/* ================= CHE 102 · Tutorial 8 (Fall 2026): colligative properties and equilibrium ================= */
TUT('che102', null, [

num('tu8-1', 'h17', 'An aqueous solution is 15.0% NaBr by mass. Assume it behaves ideally and NaBr dissociates completely. What is its boiling point at 1 atm, in °C? K<sub>b</sub> of water = 0.512 °C·kg/mol. Give 4 significant figures.', '101.8',
  'Take 100 g of solution: 15.0 g NaBr and 85.0 g water. NaBr gives Na⁺ and Br⁻, so i = 2.',
  'n(NaBr) = 15.0 g ÷ 102.89 g/mol = 0.1458 mol. Molality b = 0.1458 mol ÷ 0.0850 kg = 1.715 mol/kg. ΔT<sub>b</sub> = iK<sub>b</sub>b = 2 × 0.512 × 1.715 = 1.76 °C, so T<sub>b</sub> = 100 + 1.76 = 101.8 °C.', null, null, { sf: 4, unit: '°C' }),

num('tu8-2', 'h17', 'A salt AB<sub>2</sub> dissociates partly in water: AB<sub>2</sub> ⇌ A²⁺ + 2B⁻. A 0.10 mol/kg aqueous solution freezes at −0.250 °C. What fraction of the AB<sub>2</sub> dissociates? K<sub>f</sub> of water = 1.86 °C·kg/mol. Give 2 significant figures, as a decimal.', '0.17',
  'Find the van \'t Hoff factor i from ΔT<sub>f</sub> = iK<sub>f</sub>b, then relate i to the fraction x that dissociates.',
  'i = 0.250 ÷ (1.86 × 0.10) = 1.34. Start with 1 mol AB<sub>2</sub>: 1 − x remains and x mol A²⁺ plus 2x mol B⁻ form, so i = 1 − x + x + 2x = 1 + 2x. x = (1.34 − 1)/2 = 0.17, or 17%.', null, null, { sf: 2 }),

multi('tu8-3', 'h18', 'At 500. K, 3A(g) ⇌ 2B(g) has K<sub>p,1</sub> = 6.0932 and B(g) + C(g) ⇌ D(g) has K<sub>c,2</sub> = 10.0. The overall reaction is 3A(g) + 2C(g) ⇌ 2D(g). Use R = 0.08314 L·bar/(mol·K).', [
  { ask: 'What is K<sub>c,1</sub> for 3A ⇌ 2B? Give 3 significant figures.', ans: '253', sf: 3, hint: 'K<sub>c</sub> = K<sub>p</sub>(RT)<sup>−Δn</sup>, with Δn = moles of gas products − reactants.',
    why: 'Δn = 2 − 3 = −1, so K<sub>c,1</sub> = 6.0932 × (0.08314 × 500.)¹ = 253.' },
  { ask: 'What is K<sub>c</sub> for the overall reaction? Give 3 significant figures.', ans: '2.53E4', sf: 3, hint: 'The overall reaction is reaction 1 plus twice reaction 2. Doubling a reaction squares its K.',
    why: 'K<sub>c</sub> = K<sub>c,1</sub> × K<sub>c,2</sub>² = 253 × 10.0² = 2.53 × 10⁴.' },
  { ask: 'What is K<sub>p</sub> for the overall reaction? Give 3 significant figures.', ans: '0.353', sf: 3, hint: 'K<sub>p</sub> = K<sub>c</sub>(RT)<sup>Δn</sup> with the overall Δn.',
    why: 'Δn = 2 − (3 + 2) = −3, so K<sub>p</sub> = 2.53 × 10⁴ × (41.57)<sup>−3</sup> ≈ 0.353 (0.352 if you carry every digit; both round from the same work).' }
]),

num('tu8-4', 'h19', '4.00 mol of HI is placed in a 5.00 L vessel at 458 °C and decomposes: 2HI(g) ⇌ H<sub>2</sub>(g) + I<sub>2</sub>(g). At equilibrium there is 0.442 mol I<sub>2</sub>. What is K<sub>c</sub>? Give 3 significant figures.', '0.0201',
  'ICE table in moles: HI loses 2x while H<sub>2</sub> and I<sub>2</sub> each gain x, and x = 0.442.',
  'n(HI) = 4.00 − 2(0.442) = 3.116 mol, n(H<sub>2</sub>) = n(I<sub>2</sub>) = 0.442 mol. Moles of gas are equal on both sides, so the volumes cancel: K<sub>c</sub> = (0.442)(0.442)/(3.116)² = 0.0201.', null, null, { sf: 3 }),

num('tu8-5', 'h17', 'A 4.0 g mixture of sucrose (C<sub>12</sub>H<sub>22</sub>O<sub>11</sub>, 342.30 g/mol) and zinc nitrate (Zn(NO<sub>3</sub>)<sub>2</sub>, 189.40 g/mol) dissolves in 150.0 g of water, and the solution freezes at −0.768 °C. Zinc nitrate dissociates completely. What percentage of the mixture\'s mass is sucrose? K<sub>f</sub> of water = 1.86 °C·kg/mol. Give 2 significant figures.', '2.8',
  'The particle molality is the sum: b<sub>sucrose</sub> (i = 1) + 3 × b<sub>zinc nitrate</sub> (i = 3). Let x be the mass of sucrose, so 4.0 − x is zinc nitrate.',
  'Total particle molality = 0.768 ÷ 1.86 = 0.4129 mol/kg, so total particles = 0.4129 × 0.1500 kg = 0.06194 mol. x/342.30 + 3(4.0 − x)/189.40 = 0.06194. 3 × 4.0/189.40 = 0.06336, so x(1/342.30 − 3/189.40) = 0.06194 − 0.06336, giving x = 0.11 g. 0.11 ÷ 4.0 = 2.8% sucrose.', null, null, { sf: 2, unit: '%' })

]);
