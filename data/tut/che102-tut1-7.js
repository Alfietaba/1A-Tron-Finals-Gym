/* ================= CHE 102 · Tutorials 1 to 7 (Fall 2026) ================= */
(function () {
var T = null;

/* Tutorial 7, Problem 3: phase diagram of sulfur (not to scale) */
var SULFUR = '<svg class="dg" viewBox="0 0 340 215" role="img" aria-label="Phase diagram of sulfur, pressure against temperature, not to scale. Regions: rhombic solid at the left, a narrow monoclinic wedge, liquid at the upper right and gas at the bottom right. Three triple points: rhombic, monoclinic and gas at 95.3 °C and 5.1 times 10 to the minus 6 atm; monoclinic, liquid and gas at 115.2 °C and 3.2 times 10 to the minus 5 atm; rhombic, monoclinic and liquid at 153 °C and 1420 atm. On the dashed 1 atm line, rhombic changes to monoclinic at 95.4 °C, monoclinic melts at 115.21 °C and the liquid boils at 444.6 °C.">' +
  '<path class="dg-ax" d="M40 10 V180 H330"/>' +
  '<path class="dg-hid" d="M40 80 H330"/><text class="dg-s" x="36" y="84" text-anchor="end">1 atm</text>' +
  '<path class="dg-l" d="M44 176 Q90 166 120 150"/>' +
  '<path class="dg-l" d="M120 150 L150 22"/>' +
  '<path class="dg-l" d="M120 150 L160 135"/>' +
  '<path class="dg-l" d="M160 135 L150 22"/>' +
  '<path class="dg-l" d="M150 22 L158 10"/>' +
  '<path class="dg-l" d="M160 135 Q235 115 325 55"/>' +
  '<text class="dg-t" x="50" y="145">Rhombic</text>' +
  '<text class="dg-t" x="240" y="40">Liquid</text>' +
  '<text class="dg-t" x="285" y="135">Gas</text>' +
  '<text class="dg-s" x="48" y="108">Monoclinic</text><path class="dg-dim" d="M106 104 L144 104"/>' +
  '<text class="dg-s" x="128" y="74" text-anchor="end">95.4 °C</text>' +
  '<text class="dg-s" x="160" y="74">115.21 °C</text>' +
  '<text class="dg-s" x="300" y="96" text-anchor="middle">444.6 °C</text>' +
  '<text class="dg-s" x="166" y="22">153 °C, 1420 atm</text>' +
  '<text class="dg-s" x="170" y="152">115.2 °C, 3.2 × 10⁻⁵ atm</text>' +
  '<text class="dg-s" x="140" y="173">95.3 °C, 5.1 × 10⁻⁶ atm</text>' +
  '<text class="dg-s" x="185" y="200" text-anchor="middle">Temperature</text>' +
  '<text class="dg-s" x="16" y="130" text-anchor="middle" transform="rotate(-90 16 130)">Pressure</text></svg>';

/* Tutorial 7, Problem 4: a one-component phase diagram with regions A, B, C and points d, e, f, g */
var PDE = '<svg class="dg" viewBox="0 0 300 200" role="img" aria-label="Phase diagram, pressure against temperature. A curve rises from point d at the lower left to point e. From e a nearly vertical line rises to point g at the top, leaning slightly left. From e another curve rises to the right and ends at point f. Region A is on the left, region B is at the top between the lines eg and ef, and region C is at the bottom right below the curves de and ef.">' +
  '<path class="dg-ax" d="M40 10 V170 H290"/>' +
  '<path class="dg-l" d="M48 162 L110 118"/>' +
  '<path class="dg-l" d="M110 118 L100 14"/>' +
  '<path class="dg-l" d="M110 118 Q165 104 250 52"/>' +
  '<text class="dg-t" x="66" y="80">A</text><text class="dg-t" x="170" y="42">B</text><text class="dg-t" x="200" y="140">C</text>' +
  '<text class="dg-s" x="48" y="160" text-anchor="end">d</text><text class="dg-s" x="112" y="134">e</text>' +
  '<text class="dg-s" x="256" y="50">f</text><text class="dg-s" x="92" y="16">g</text>' +
  '<text class="dg-s" x="165" y="190" text-anchor="middle">Temperature</text>' +
  '<text class="dg-s" x="20" y="90" text-anchor="middle" transform="rotate(-90 20 90)">Pressure</text></svg>';

var Q = [
/* ---------- Tutorial 1 ---------- */
num('tu1-1', 'h2', 'At 100 K the thermal conductivity of gaseous helium is 0.730 mW·cm<sup>−1</sup>·K<sup>−1</sup> (mW is milliwatt). Express it in Btu·h<sup>−1</sup>·ft<sup>−1</sup>·°F<sup>−1</sup>. Give 3 significant figures.', '0.0422',
  'Chain the factors: mW → W → Btu/h (1 W = 3.4121 Btu/h), cm<sup>−1</sup> → ft<sup>−1</sup> (100 cm = 3.28084 ft), and K<sup>−1</sup> → °F<sup>−1</sup>. A temperature difference of 1 K is 1 °C, which is 1.8 °F.',
  '0.730 mW/(cm·K) × (1 W / 1000 mW) × (3.4121 Btu/h per W) × (100 cm / 3.28084 ft) × (1 K / 1 °C) × (1 °C / 1.8 °F) = 0.0422 Btu/(h·ft·°F). The K<sup>−1</sup> is per degree of difference, so only the 1.8 factor applies, never the +32 offset.', null, null, { sf: 3, unit: 'Btu/(h·ft·°F)' }),
multi('tu1-2', 'h1', 'Determine the number of protons, electrons and neutrons in each species.', [
  { ask: '<sup>108</sup>Pd: protons', ans: '46', hint: 'Look up the atomic number of Pd.', why: 'Pd is element 46, so 46 protons.' },
  { ask: '<sup>108</sup>Pd: electrons', ans: '46', hint: 'It is a neutral atom.', why: 'A neutral atom has as many electrons as protons: 46.' },
  { ask: '<sup>108</sup>Pd: neutrons', ans: '62', hint: 'Mass number = protons + neutrons.', why: '108 − 46 = 62 neutrons.' },
  { ask: '<sup>228</sup>Ra<sup>2+</sup>: protons', ans: '88', hint: 'Look up the atomic number of Ra.', why: 'Ra is element 88, so 88 protons.' },
  { ask: '<sup>228</sup>Ra<sup>2+</sup>: electrons', ans: '86', hint: 'A 2+ charge means 2 electrons were lost.', why: '88 − 2 = 86 electrons.' },
  { ask: '<sup>228</sup>Ra<sup>2+</sup>: neutrons', ans: '140', hint: 'The charge does not change the nucleus.', why: '228 − 88 = 140 neutrons.' }
], null),
multi('tu1-3', 'h2', 'A rural community in Kenya (UN SDG 7, affordable clean energy) plans a 20 kW solar panel system. The PV cells convert sunlight to electricity with an average efficiency of 15%, and the panels get an average of 6 hours of full sunlight per day. Panel efficiency is defined at the standard condition of 1 kW of sunlight per m²:<br>efficiency (%) = #frac{panel power (kW) / area (m²)}{1 kW/m²} × 100%<br>Assume the system always runs at its full capacity during sunlight with no losses.', [
  { ask: 'What is the area of the installed solar panel system, in m²? Give 2 significant figures.', ans: '130', sf: 2, unit: 'm²',
    hint: 'Rearrange the efficiency formula for the area.',
    why: '0.15 = (20 kW / area) / (1 kW/m²), so area = 20 / 0.15 = 133 m², which is 130 m² to 2 significant figures. That is about 15 V1 rooms (8.7 m² each).' },
  { ask: 'The average household uses 2501 kWh of electricity per year. How many whole households can the system power?', ans: '17', unit: 'households',
    hint: 'Energy per year = power × hours of sunlight per day × days per year.',
    why: '20 kW × 6 h/day × 365 day/year = 43 800 kWh per year. 43 800 / 2501 = 17.5, so 17 whole households can be powered.' }
], 'C'),
num('tu1-4', 'h1', 'Potassium has two stable naturally occurring isotopes, with 20 and 22 neutrons. Its relative atomic mass is 39.0983. Taking the isotope masses as their mass numbers, what is the percentage abundance of the isotope with 20 neutrons? Give 2 significant figures.', '95',
  'K has 19 protons, so the isotopes are <sup>39</sup>K and <sup>41</sup>K. Write the average mass as a weighted sum with fraction x.',
  '39.0983 = 39x + 41(1 − x), so 2x = 41 − 39.0983 = 1.9017 and x = 0.95. That is 95% <sup>39</sup>K and 5% <sup>41</sup>K.', null, null, { sf: 2, unit: '%' }),
mc('tu1-5a', 'h7', 'Sorbic acid, a mold and yeast inhibitor used as a food preservative, has the empirical formula $C3H4O$ and a molecular weight of 112.13 amu. What is its molecular formula?',
  ['$C3H4O$', '$C9H12O3$', '$C6H8O2$', '$C6H8O$', '$C4H8O2$'], 2,
  'One C₃H₄O unit has mass 3(12.011) + 4(1.00794) + 15.9994 = 56.064 amu. n = 112.13 / 56.064 = 2, so the molecular formula is 2 × C₃H₄O = C₆H₈O₂.', { k: 'n' }),
num('tu1-5b', 'h7', 'Sorbic acid has the empirical formula $C3H4O$ and a molecular weight of 112.13 amu. How many atoms are in one molecule of sorbic acid?', '16',
  'Find the molecular formula first: how many C₃H₄O units fit in 112.13 amu?',
  'One C₃H₄O unit is 56.064 amu, so the molecule is 2 units: C₆H₈O₂. 6 + 8 + 2 = 16 atoms.'),
mc('tu1-5c', 'h7', 'Sorbic acid has the empirical formula $C3H4O$. True or false: the mass ratio of C : H : O in sorbic acid is 3 : 4 : 1.',
  ['True, because the subscripts give the mass ratio', 'False, because the atom ratio is not the mass ratio', 'True, but only for the empirical formula unit', 'False, because the molecular formula is different from the empirical formula'], 1,
  'False. 3 : 4 : 1 is the ratio of atoms. Each element has a different molar mass, so the mass ratio is 36.03 : 4.03 : 16.00, not 3 : 4 : 1. Doubling to the molecular formula C₆H₈O₂ would not change either ratio.', { k: 'c' }),
mc('tu1-5d', 'h7', 'Sorbic acid has the empirical formula $C3H4O$. True or false: the drug aspidinol, $C12H16O4$, used to kill parasitic worms, has the same empirical formula.',
  ['False, because the molecular formulas differ', 'False, because aspidinol has more oxygen per carbon', 'True, because both reduce to $C3H4O$', 'True, because both contain only C, H and O'], 2,
  'True. Divide C₁₂H₁₆O₄ by 4 to get C₃H₄O, the same empirical formula as sorbic acid. Different molecular formulas can share one empirical formula.', { k: 'c' }),
multi('tu1-6', 'h2', 'You cash in a gold nugget weighing 12.2 grains to buy Timbits. Gold costs 3405 USD per troy ounce, 1 USD = 1.37 CAD, 31.1 g = 1 troy ounce and 1 g = 15.43 grains. Timbits come in a 10 pack for 3.72 CAD or a 20 pack for 5.98 CAD (tax included).', [
  { ask: 'What is the nugget worth in CAD? Give your answer to the nearest cent.', ans: '118.60', unit: 'CAD',
    hint: 'grains → g → troy oz → USD → CAD.',
    why: '12.2 grains × (1 g / 15.43 grains) × (1 troy oz / 31.1 g) × (3405 USD / troy oz) × (1.37 CAD / USD) = 118.60 CAD.' },
  { ask: 'What is the largest number of Timbits you can buy?', ans: '390', unit: 'Timbits',
    hint: 'The 20 pack is cheaper per Timbit, so buy as many of those as you can first, then see what the leftover money buys.',
    why: '118.60 / 5.98 = 19.8, so 19 twenty-packs = 380 Timbits, costing 113.62 CAD. 4.98 CAD is left, enough for one 10 pack (3.72 CAD). Total 390 Timbits with 1.26 CAD left over.' }
], 'C'),

/* ---------- Tutorial 2 ---------- */
num('tu2-1', 'h3', 'If 75.3 g of $PCl3$ is produced by 6 $Cl2$(g) + $P4$(s) → 4 $PCl3$(l), how many grams of chlorine gas are consumed? Give 3 significant figures.', '58.3',
  'g PCl₃ → mol PCl₃ → mol Cl₂ (6 : 4) → g Cl₂.',
  '75.3 g / 137.32 g/mol = 0.5484 mol PCl₃. × 6/4 = 0.8225 mol Cl₂. × 70.90 g/mol = 58.3 g.', null, null, { sf: 3, unit: 'g' }),
multi('tu2-2', 'h7', 'Cortisol (molecular weight 362.47 g/mol) is 69.6% C, 8.34% H and 22.1% O by mass. Find its molecular formula, C<sub>x</sub>H<sub>y</sub>O<sub>z</sub>.', [
  { ask: 'x (carbon atoms per molecule)', ans: '21', hint: 'Take a basis of 1 mol = 362.47 g of cortisol. Mass of C = 0.696 × 362.47 g.', why: '0.696 × 362.47 = 252.3 g C ÷ 12.011 = 21.0 mol C.' },
  { ask: 'y (hydrogen atoms per molecule)', ans: '30', hint: 'Same basis: mass of H = 0.0834 × 362.47 g.', why: '0.0834 × 362.47 = 30.23 g H ÷ 1.00794 = 30.0 mol H.' },
  { ask: 'z (oxygen atoms per molecule)', ans: '5', hint: 'Same basis: mass of O = 0.221 × 362.47 g.', why: '0.221 × 362.47 = 80.11 g O ÷ 15.9994 = 5.00 mol O. Because the basis is 1 mol of compound, the molecular formula is C₂₁H₃₀O₅ directly.' }
], 'C'),
num('tu2-3', 'h5', 'For the unbalanced reaction $NH3$(g) + $O2$(g) → NO(g) + $H2O$(l), 80.0 g of $NH3$ reacts with 200. g of $O2$ and 40.0 g of NO forms. What is the percent yield? Give 3 significant figures.', '28.4',
  'Balance first, then find the limiting reactant before computing the theoretical yield.',
  'Balanced: 4 NH₃ + 5 O₂ → 4 NO + 6 H₂O. n(NH₃) = 80.0 / 17.03 = 4.698 mol, n(O₂) = 200. / 32.00 = 6.250 mol. The NH₃ needs 4.698 × 5/4 = 5.873 mol O₂, which is less than 6.250, so NH₃ is limiting. Theoretical NO = 4.698 mol × 30.01 g/mol = 141.0 g. Yield = 40.0 / 141.0 = 28.4%.', null, null, { sf: 3, unit: '%' }),
num('tu2-4', 'h6', '50 mL of aqueous HCl was added to a 0.2000 g sample of $CaCO3$, and all the $CaCO3$ reacted:<br>(1) $CaCO3$(s) + 2 HCl(aq) → $CaCl2$(aq) + $H2O$(l) + $CO2$(g)<br>The excess HCl then reacted completely in<br>(2) 2 HCl(aq) + $Ba(OH)2$(aq) → $BaCl2$(aq) + 2 $H2O$(l)<br>producing 62 mL of 0.025 M $BaCl2$ solution. What was the original concentration of the HCl, in M? Give 2 significant figures.', '0.14',
  'Total HCl = HCl used by the CaCO₃ + HCl left over for reaction (2). Each needs its own mole ratio.',
  'Reaction (1): 0.2000 g / 100.087 g/mol = 0.001998 mol CaCO₃ × 2 = 0.003996 mol HCl. Reaction (2): 0.062 L × 0.025 M = 0.00155 mol BaCl₂ × 2 = 0.003100 mol HCl. Total 0.007096 mol / 0.050 L = 0.14 M.', null, null, { sf: 2, unit: 'M' }),
num('tu2-5', 'h6', 'You need 100.0 mL of 0.0750 M $AgNO3$, but only 60.0 mL of 0.0500 M $AgNO3$ is available. You pipette 50.0 mL of the available solution into a 100.0 mL flask, add solid $AgNO3$, and dilute to exactly 100.0 mL. What mass of $AgNO3$ must you add? Give 3 significant figures.', '0.849',
  'Moles needed in the final flask minus the moles already delivered by the 50.0 mL. M(AgNO₃) = 169.87 g/mol.',
  'Needed: 0.1000 L × 0.0750 M = 0.00750 mol. Already added: 0.0500 L × 0.0500 M = 0.00250 mol. Extra: 0.00500 mol × 169.87 g/mol = 0.849 g. (Rounding M to 169.9 gives 0.850 g; both are accepted.)', null, null, { sf: 3, unit: 'g' }),
mc('tu2-6', 'h7', 'When 25 g of a hydrocarbon (only C and H) burns completely, 75.7 g of $CO2$ is produced. What is the empirical formula of the hydrocarbon?',
  ['$CH2$', '$C2H5$', '$CH3$', '$C3H8$', '$CH4$'], 1,
  'All the C ends up in CO₂: 75.7 / 44.0098 = 1.720 mol C = 20.66 g C. The rest of the 25 g is H: 4.34 g / 1.00794 = 4.306 mol H. H : C = 4.306 / 1.720 = 2.5, so double to whole numbers: C₂H₅.', { k: 'n' }),

/* ---------- Tutorial 3 ---------- */
num('tu3-1', 'h8', 'Acetylene is made by $CaC2$(s) + 2 $H2O$(l) → $C2H2$(g) + $Ca(OH)2$(aq). The acetylene collected has a pressure of 750 mmHg and a volume of 750 cm³ at 23 °C. What mass of calcium carbide reacted? Give 2 significant figures.', '2.0',
  'Ideal gas law for mol C₂H₂ (convert to atm, L and K), then 1 : 1 to CaC₂ (64.10 g/mol).',
  'n = PV/RT = (750/760 atm)(0.750 L) / (0.082057 × 296.15 K) = 0.0305 mol C₂H₂ = mol CaC₂. × 64.10 g/mol = 1.95 g, which is 2.0 g to 2 significant figures.', null, null, { sf: 2, unit: 'g', tol: 0.03 }),
num('tu3-2a', 'h8', 'A volatile organic compound is 59.94% C, 13.44% H and 26.62% O by mass. A 5.00 g sample evaporates to 3.31 L of vapour at 200 °C and 98.93 kPa. What is its molar mass? Give 3 significant figures.', '60.1',
  'PV = nRT with n = m/M. Use R = 8.314 kPa·L/(mol·K) and T in K.',
  'M = mRT / PV = (5.00 g)(8.314)(473.15 K) / (98.93 kPa × 3.31 L) = 60.1 g/mol.', null, null, { sf: 3, unit: 'g/mol' }),
mc('tu3-2b', 'h7', 'A compound is 59.94% C, 13.44% H and 26.62% O by mass, and its molar mass is 60.1 g/mol. What are its molecular and empirical formulas?',
  ['Molecular $C3H8O$, empirical $C3H8O$', 'Molecular $C6H16O2$, empirical $C3H8O$', 'Molecular $C3H8O$, empirical $CH4O$', 'Molecular $C2H4O2$, empirical $CH2O$', 'Molecular $C3H6O$, empirical $C3H6O$'], 0,
  'Basis 1 mol = 60.1 g: C = 0.5994 × 60.1 = 36.0 g → 3 mol; H = 0.1344 × 60.1 = 8.08 g → 8 mol; O = 0.2662 × 60.1 = 16.0 g → 1 mol. Molecular formula C₃H₈O. 3 : 8 : 1 cannot be reduced, so the empirical formula is also C₃H₈O.', { k: 'n' }),
num('tu3-3', 'h5', 'Cellulose, a polymer ($C6H10O5$)<sub>n</sub>, is converted to ethanol in two steps:<br>Step 1: ($C6H10O5$)<sub>n</sub> + n $H2O$ → n $C6H12O6$<br>Step 2: $C6H12O6$ → 2 $C2H5OH$ + 2 $CO2$<br>What is the atom economy of the overall mechanism for making ethanol? Give 3 significant figures.', '51.1',
  'Combine the steps into one overall reaction (multiply step 2 by n), then atom economy = mass of desired product ÷ mass of all reactants.',
  'Overall: (C₆H₁₀O₅)ₙ + n H₂O → 2n C₂H₅OH + 2n CO₂. Basis 1 mol cellulose: reactants 162.16n + 18.02n = 180.18n g. Ethanol: 2n × 46.07 = 92.14n g. Atom economy = 92.14n / 180.18n = 51.1%. The n cancels.', null, null, { sf: 3, unit: '%' }),
num('tu3-4', 'h9', 'The recommended limit for vinyl chloride in workplace air is 5 ppm by volume. An average breath is 0.30 L. How many molecules of vinyl chloride are inhaled in one breath at this limit, if the total pressure is 743 mmHg and the temperature is 20 °C? Give 2 significant figures, like 1.2E16.', '3.7E16',
  'ppm by volume: 5 L of vinyl chloride per 10⁶ L of air. Then PV = nRT and Avogadro\'s number.',
  'V = 0.30 L × 5/10⁶ = 1.5 × 10⁻⁶ L. n = (743/760 atm)(1.5 × 10⁻⁶ L) / (0.082057 × 293.15 K) = 6.1 × 10⁻⁸ mol. × 6.022 × 10²³ = 3.7 × 10¹⁶ molecules.', null, null, { sf: 2, unit: 'molecules' }),
mc('tu3-5', 'h8', 'An evacuated rigid vessel is filled with gas at constant temperature, first with $O2$ and then, in a repeat, with an unknown gas X. Plotting the mass of gas against the total pressure gives a straight line through the origin for each gas, and the line for X is twice as steep as the line for $O2$. Which species could be X?',
  ['$CO2$', '$H2O$', '$SO2$', '$CH4$', '$SO3$'], 2,
  'PV = (m/M)RT rearranges to m = (VM/RT)P. V, R and T are fixed, so the slope is proportional to M. Twice the slope means M(X) = 2 × 32 = 64 g/mol, which matches SO₂ (64.07). CO₂ is 44, H₂O 18, CH₄ 16 and SO₃ 80.', { k: 'c' }),
num('tu3-6', 'h8', 'Two containers of volumes V<sub>1</sub> and V<sub>2</sub>, joined by a capillary tube of negligible volume, hold hydrogen. At first both are in ice-water baths at 0 °C and the pressure is 1 atm. Then V<sub>2</sub> is heated to 100 °C while V<sub>1</sub> stays at 0 °C. At equilibrium the pressure in both vessels is 1.2176 atm. What is the ratio V<sub>1</sub>/V<sub>2</sub>? Give 2 significant figures.', '0.50',
  'The total moles of H₂ do not change, and the pressure is the same in both vessels. Write n = PV/RT for each vessel before and after.',
  'P<sub>i</sub>(V₁ + V₂)/T<sub>i</sub> = P<sub>f</sub>V₁/T₁ + P<sub>f</sub>V₂/T₂. Collect terms: V₂(P<sub>i</sub>/T<sub>i</sub> − P<sub>f</sub>/T₂) = V₁(P<sub>f</sub>/T₁ − P<sub>i</sub>/T<sub>i</sub>). V₁/V₂ = (1/273.15 − 1.2176/373.15) / (1.2176/273.15 − 1/273.15) = 0.50.', null, null, { sf: 2 }),
num('tu3-7', 'h3', 'A 0.263 g Mg–Al alloy reacts with excess $O2$ and gives 0.483 g of oxides:<br>2 Mg(s) + $O2$(g) → 2 MgO(s)<br>4 Al(s) + 3 $O2$(g) → 2 $Al2O3$(s)<br>What is the mass fraction of Mg in the alloy? Give 2 significant figures.', '0.23',
  'Let x = mass of Mg and y = mass of Al. One equation from the alloy mass, one from the oxide mass (convert each metal mass to its oxide mass).',
  'x + y = 0.263. MgO from Mg: x × 40.305/24.305 = 1.658x. Al₂O₃ from Al: y × (2 × 101.96)/(4 × 26.98) = 1.890y. So 1.658x + 1.890(0.263 − x) = 0.483, giving 0.232x = 0.0140 and x = 0.0603 g. Mass fraction = 0.0603 / 0.263 = 0.23.', null, null, { sf: 2 }),

/* ---------- Tutorial 4 ---------- */
multi('tu4-1', 'h9', 'A rigid vessel holds a mixture of ethane and methane. The partial pressure of ethane is 0.80 atm and the partial pressure of methane is 2.3 atm.', [
  { ask: 'What is the total pressure, in atm? Give 2 significant figures.', ans: '3.1', sf: 2, unit: 'atm', hint: 'Dalton\'s law.', why: 'P = 0.80 + 2.3 = 3.1 atm.' },
  { ask: 'What is the mole fraction of ethane? Give 2 significant figures.', ans: '0.26', sf: 2, hint: 'P<sub>i</sub> = y<sub>i</sub>P.', why: 'y = 0.80 / 3.1 = 0.26.' },
  { ask: 'What is the volume fraction of ethane? Give 2 significant figures.', ans: '0.26', sf: 2, hint: 'For ideal gases at the same T and P, V<sub>i</sub> = n<sub>i</sub>RT/P.', why: 'V<sub>ethane</sub>/V = (n<sub>ethane</sub>RT/P) / (n<sub>total</sub>RT/P) = n<sub>ethane</sub>/n<sub>total</sub> = 0.26. For ideal gases the volume fraction equals the mole fraction.' }
], null),
multi('tu4-2', 'h9', 'A breathing mixture replaces $N2$ with He: it is 79% He and 21% $O2$ by volume. Air is 78.08% $N2$, 20.95% $O2$, 0.93% Ar and 0.036% $CO2$.', [
  { ask: 'What is the density of the He–$O2$ mixture at 25 °C and 1.00 atm, in g/L? Give 2 significant figures.', ans: '0.40', sf: 2, unit: 'g/L',
    hint: 'ρ = PM/RT, with M the mole-weighted average molar mass.',
    why: 'M = 0.79(4.00) + 0.21(32.00) = 9.88 g/mol. ρ = (1.00 atm)(9.88) / (0.082057 × 298.15 K) = 0.40 g/L.' },
  { ask: 'At what pressure would the He–$O2$ mixture have the same density as air at 25 °C and 1.00 atm? Give 2 significant figures.', ans: '2.9', sf: 2, unit: 'atm',
    hint: 'Find the average molar mass and density of air first, then solve ρ = PM/RT for P using the mixture\'s M.',
    why: 'M(air) = 0.7808(28.01) + 0.2095(32.00) + 0.0093(39.95) + 0.00036(44.01) = 28.96 g/mol, so ρ(air) = 28.96 / (0.082057 × 298.15) = 1.18 g/L. P = ρRT/M = 1.18 × 0.082057 × 298.15 / 9.88 = 2.9 atm. (Equivalently P = 28.96 / 9.88 × 1.00 atm.)' }
], 'C'),
num('tu4-3', 'h9', 'A 1.0 L flask holds argon and acetone ($CH3COCH3$) at 298 K and 15 kPa. The acetone decomposes completely: $CH3COCH3$(g) → $C2H4$(g) + CO(g) + $H2$(g). Argon is inert and all products are gases. The final pressure is 17.1 kPa at 298 K. What was the mole fraction of acetone in the original mixture? Give 2 significant figures.', '0.070',
  'At fixed V and T, partial pressure is proportional to moles. Each mole of acetone becomes 3 moles of gas.',
  'Each acetone gives one each of C₂H₄, CO and H₂, so each product\'s partial pressure equals the initial P(acetone). Final − initial: 3P<sub>acetone</sub> − P<sub>acetone</sub> = 17.1 − 15 = 2.1 kPa, so P<sub>acetone</sub> = 1.05 kPa. y = 1.05 / 15 = 0.070.', null, null, { sf: 2 }),
num('tu4-4', 'h9', 'A 0.50 L vessel holds only pure calcium oxalate ($CaC2O4$) after evacuation. At 1200 K it all decomposes to CaO:<br>$CaC2O4$(s) → $CaCO3$(s) + CO(g)<br>$CaCO3$(s) → CaO(s) + $CO2$(g)<br>The density of the gas mixture at 1200 K is 0.37501 g/L. What mass of calcium oxalate was placed in the vessel? Neglect the volume of the CaO. Give 2 significant figures.', '0.33',
  'Every mole of CaC₂O₄ gives 1 mol CO and 1 mol CO₂. The gas mass is ρV.',
  'm<sub>gas</sub> = ρV = 0.37501 × 0.50 = 0.1875 g = n(M<sub>CO</sub> + M<sub>CO₂</sub>), with n = mol CaC₂O₄. n = 0.1875 / (28.0104 + 44.0098) = 2.604 × 10⁻³ mol. × 128.0976 g/mol = 0.33 g.', null, null, { sf: 2, unit: 'g' }),
mc('tu4-5', 'h10', 'A sample of 1 mol of $CO2$ has van der Waals constants a = 3.59 atm·L²/mol² and b = 0.0427 L/mol. Which of these statements are true?<br>A) At 100. L and 273 K, the $CO2$ behaves as an ideal gas.<br>B) At 1.00 L and 273 K, repulsive forces dominate.<br>C) At 100. L, the $CO2$ is expected to behave ideally at all temperatures from 273 K up to 1000 K.',
  ['A only', 'A and C only', 'A and B only', 'B and C only', 'A, B and C'], 1,
  'A true: P<sub>ideal</sub> = 0.224 atm and P<sub>vdW</sub> = 0.224 atm. B false: P<sub>ideal</sub> = 22.4 atm but P<sub>vdW</sub> = 0.08206 × 273 / (1.00 − 0.0427) − 3.59 = 19.8 atm, lower than ideal, so attractive forces dominate. C true: the gas is already ideal at 273 K and 100. L, and higher temperatures make a gas behave even more ideally.', { k: 'c' }),
mc('tu4-6', 'h10', 'Pure samples of ideal gases X, Y and Z have these speed distributions: X peaks near 320 m/s and is tall and narrow; Y and Z have exactly the same curve, which peaks near 460 m/s and is lower and broader. Each sample has the same volume. T<sub>X</sub> = T<sub>Y</sub> ≠ T<sub>Z</sub>, P<sub>X</sub> = P<sub>Z</sub> ≠ P<sub>Y</sub>, and n<sub>Y</sub> = n<sub>Z</sub>. Which samples could contain the same chemical species?',
  ['X, Y and Z could all be the same', 'X and Y only', 'X and Z only', 'Y and Z only', 'None: X, Y and Z must all be different'], 2,
  'The speed distribution depends only on T and M. X and Y share T but have different distributions, so their M differ. Y and Z have the same distribution at different T, so their M must differ too. X and Z differ in both T and distribution, so they could have the same M and be the same gas, and P<sub>X</sub> = P<sub>Z</sub> is possible with suitable n.', { k: 'c' }),
num('tu4-7', 'h9', 'A steel cylinder holds 5.00 mol graphite and 5.00 mol $O2$. It is burned and all the graphite reacts, giving CO, $CO2$ and leftover $O2$. After cooling to the original temperature, the gas pressure has risen by 17%. What is the mole fraction of CO in the final gas? Give 2 significant figures.', '0.29',
  'C + ½O₂ → CO adds gas moles; C + O₂ → CO₂ does not. At constant V and T, pressure tracks moles.',
  'Final gas moles = 1.17 × 5.00 = 5.85 mol. Let a = mol CO and b = mol CO₂. Carbon: a + b = 5.00. Remaining O₂ = 5.85 − 5.00 = 0.85 mol, so O₂ used = 4.15 = ½a + b. Subtract: ½a = 0.85, a = 1.70 mol CO. y<sub>CO</sub> = 1.70 / 5.85 = 0.29.', null, null, { sf: 2 }),

/* ---------- Tutorial 5 ---------- */
num('tu5-1', 'h12', 'Iodine-131, used to diagnose thyroid disorders, has a half-life of 8.0 days regardless of its initial concentration. What fraction of the initial iodine-131 is left in a patient 24 days after it is given? Assume none is eliminated by the body. Give 3 significant figures.', '0.125',
  'A half-life independent of concentration means first order. How many half-lives is 24 days?',
  '24 days = 3 half-lives, so (½)³ = 0.125. Equivalently k = ln 2 / 8 days and [A]/[A]₀ = e<sup>−kt</sup> = e<sup>−3 ln 2</sup> = 0.125.', null, null, { sf: 3 }),
multi('tu5-2', 'h12', 'For 2 $ClO2$(aq) + 2 OH<sup>−</sup>(aq) → $ClO3$<sup>−</sup>(aq) + $ClO2$<sup>−</sup>(aq) + $H2O$(l), the initial rates are:<br>[$ClO2$]₀ = 0.0500 M, [OH<sup>−</sup>]₀ = 0.1000 M: rate = 5.75 × 10⁻² M/s<br>[$ClO2$]₀ = 0.1000 M, [OH<sup>−</sup>]₀ = 0.1000 M: rate = 2.30 × 10⁻¹ M/s<br>[$ClO2$]₀ = 0.1000 M, [OH<sup>−</sup>]₀ = 0.0500 M: rate = 1.15 × 10⁻¹ M/s', [
  { ask: 'What is the order with respect to $ClO2$?', ans: '2', hint: 'Compare two runs where only [ClO₂] changes.', why: 'Doubling [ClO₂] at fixed [OH⁻] multiplies the rate by 0.230 / 0.0575 = 4 = 2<sup>a</sup>, so a = 2.' },
  { ask: 'What is the order with respect to OH<sup>−</sup>?', ans: '1', hint: 'Compare two runs where only [OH⁻] changes.', why: 'Doubling [OH⁻] at fixed [ClO₂] doubles the rate (0.230 / 0.115 = 2 = 2<sup>b</sup>), so b = 1.' },
  { ask: 'What is the initial rate when [$ClO2$]₀ = 0.1750 M and [OH<sup>−</sup>]₀ = 0.0844 M, in mol·L<sup>−1</sup>·s<sup>−1</sup>? Give 3 significant figures.', ans: '0.594', sf: 3, unit: 'M/s',
    hint: 'Find k from any run, then plug into rate = k[ClO₂]<sup>a</sup>[OH⁻]<sup>b</sup>.',
    why: 'Rate = k[ClO₂]²[OH⁻]. k = 0.230 / (0.1000² × 0.1000) = 230 L²/(mol²·s). Rate = 230 × 0.1750² × 0.0844 = 0.594 mol/(L·s).' }
], 'C'),
num('tu5-3', 'h12', 'The decomposition 2 HI(g) → $H2$(g) + $I2$(g) is second order in HI. HI at 500 K is placed in a rigid container, and it takes 5.0 min for 5.0% of the HI to decompose. How many minutes are needed to reach 20% decomposition? Give 2 significant figures.', '24',
  'Second order: 1/[HI] − 1/[HI]₀ = akt with a = 2. Write [HI] as a fraction of [HI]₀ so [HI]₀ cancels when you take a ratio.',
  'At 5.0%: 1/(0.95[HI]₀) − 1/[HI]₀ = (1/19)/[HI]₀ = 2k(5.0 min), so 2k[HI]₀ = 1/95 min⁻¹. At 20%: 1/(0.80[HI]₀) − 1/[HI]₀ = (1/4)/[HI]₀ = 2kt, so t = 95/4 = 23.75 min, which is 24 min.', null, null, { sf: 2, unit: 'min' }),
num('tu5-4', 'h12', 'Starting with only $PCl5$(g), the reaction $PCl5$(g) → $PCl3$(g) + $Cl2$(g) gives these total pressures at constant temperature:<br>t = 0, 15, 30, 45, 60 min: P = 10.00, 12.00, 13.58, 14.84, 15.86 atm.<br>A plot of ln P<sub>PCl5</sub> against time is a straight line. What is the rate constant, in min<sup>−1</sup>? Give 3 significant figures.', '0.0148',
  'If x atm of PCl₅ has reacted, P<sub>total</sub> = P₀ + x. Find P<sub>PCl5</sub> at some time, then use the first-order law.',
  'P<sub>total</sub> = (P₀ − x) + x + x = P₀ + x, so P<sub>PCl5</sub> = P₀ − x = 2P₀ − P<sub>total</sub>: 10.00, 8.00, 6.42, 5.16, 4.14 atm. A straight ln P plot means first order: k = −(1/t) ln(P/P₀) = −(1/30) ln(6.42/10.00) = 0.0148 min⁻¹.', null, null, { sf: 3, unit: 'min⁻¹' }),
num('tu5-5', 'h12', '$N2H6$(g) decomposes by $N2H6$(g) → $N2$(g) + 3 $H2$(g) with rate constant 4.25 × 10⁻⁵ s<sup>−1</sup>·atm<sup>−1</sup>. A rigid vessel is filled with 4.00 atm of $N2H6$ at constant temperature. How long does it take for the total pressure to reach 5.20 atm, in minutes? Give 3 significant figures.', '10.9',
  'The units of k tell you the order. Use an ICE table in pressures to find P(N₂H₆) when the total is 5.20 atm.',
  'ICE: N₂H₆ 4.00 − x, N₂ x, H₂ 3x. Total 4.00 + 3x = 5.20, so x = 0.40 atm and P(N₂H₆) = 3.60 atm. k in atm⁻¹·s⁻¹ means second order: 1/3.60 = 1/4.00 + 4.25 × 10⁻⁵ t, so t = 653 s = 10.9 min.', null, null, { sf: 3, unit: 'min' }),

/* ---------- Tutorial 6 ---------- */
multi('tu6-1', 'h14', 'At sea level a soft-boiled egg takes 3 minutes. Guidelines say to add 30 s of cooking time per °C below the normal boiling point. In Denver (elevation 1609 m) the atmospheric pressure is about 630 mmHg. For water, ΔH<sub>vap</sub> = 44.0 kJ/mol.', [
  { ask: 'At what temperature does water boil in Denver, in °C? Give 3 significant figures.', ans: '95.1', sf: 3, unit: '°C',
    hint: 'Water boils when its vapour pressure equals the surrounding pressure. Use Clausius–Clapeyron from the normal boiling point (760 mmHg, 100 °C).',
    why: 'ln(630/760) = −(44 000 / 8.314)(1/T₂ − 1/373.15). 1/T₂ = 1/373.15 − (8.314/44 000) ln(630/760), so T₂ = 368.28 K = 95.1 °C.' },
  { ask: 'How long does it take to soft-boil an egg in Denver, in minutes? Give 2 significant figures.', ans: '5.4', sf: 2, unit: 'min', tol: 0.02,
    hint: 'Find how many °C below 100 °C the Denver boiling point is.',
    why: 'The boiling point is 100 − 95.1 = 4.9 °C lower, so add 4.9 × 0.5 min = 2.4 min: 3 + 2.4 = 5.4 min. Rounding the boiling point to 95 °C adds 2.5 min and gives 5.5 min; that is also accepted.' }
], 'C'),
num('tu6-2', 'h13', 'Benzoyl peroxide (BPO) decomposes by first-order kinetics. Its half-life is 10 hours at 70 °C, and its rate constant is 5.00 × 10⁻⁴ s<sup>−1</sup> at 100 °C. What is the activation energy, in kJ/mol? Give 3 significant figures.', '116',
  'Turn the half-life into k (first order: k = ln 2 / t½, in s⁻¹), then use the two-point Arrhenius equation.',
  'k₁ = ln 2 / (10 h × 3600 s/h) = 1.925 × 10⁻⁵ s⁻¹ at 343.15 K. ln(k₂/k₁) = −(E<sub>a</sub>/R)(1/T₂ − 1/T₁): E<sub>a</sub> = −8.314 × ln(5.00 × 10⁻⁴ / 1.925 × 10⁻⁵) / (1/373.15 − 1/343.15) = 1.16 × 10⁵ J/mol = 116 kJ/mol.', null, null, { sf: 3, unit: 'kJ/mol' }),
num('tu6-3', 'h14', 'The vapour pressure of benzene is 1.34 atm at 90. °C, and its boiling point at 1.00 atm is 80. °C. Assuming ΔH<sub>vap</sub> is constant, at what pressure will benzene boil at 0. °C? Give 3 significant figures.', '0.0445',
  'Write Clausius–Clapeyron twice from the 80 °C, 1.00 atm point. Dividing one equation by the other cancels ΔH<sub>vap</sub>/R.',
  'ln(P/1.00) / ln(1.34/1.00) = (1/273.15 − 1/353.15) / (1/363.15 − 1/353.15). The right side is −10.65, so ln P = −10.65 × ln 1.34 = −3.113 and P = 0.0445 atm.', null, null, { sf: 3, unit: 'atm' }),
num('tu6-4', 'h14', 'The vapour pressure of diethyl ether ($C2H5OC2H5$, 74.12 g/mol) at 25 °C is 545 mmHg. A closed 5 US gal drum (1 gal = 3.786 L) holds 50. g of diethyl ether. Approximately how many grams are in the liquid phase at 25 °C? Neglect the volume of the liquid.', '9',
  'The vapour is saturated, so its pressure is the vapour pressure. Find the mass in the vapour with PV = (m/M)RT.',
  'P = 545/760 = 0.7171 atm, V = 5 × 3.786 = 18.93 L. m<sub>vapour</sub> = PVM/RT = (0.7171)(18.93)(74.12) / (0.08206 × 298.15) = 41 g. Liquid = 50 − 41 = 9 g.', null, null, { unit: 'g', tol: 0.02 }),
num('tu6-5', 'h14', 'A rigid 1.00 m³ vessel is filled with air at 50. °C and 80.% relative humidity. It is cooled to 20. °C and is then saturated with water vapour. P<sup>vap</sup>(50 °C) = 12.35 kPa and P<sup>vap</sup>(20 °C) = 2.34 kPa, and %RH = P<sub>H2O</sub> / P<sup>vap</sup>(T) × 100%. What mass of water condenses? Give 2 significant figures.', '49',
  'Find the water vapour mass before and after with PV = (m/M)RT. Use R = 0.008314 m³·kPa/(mol·K).',
  'Before: P<sub>H2O</sub> = 0.80 × 12.35 = 9.88 kPa, m = (9.88)(1.00)(18.02) / (0.008314 × 323 K) = 66.3 g. After: m = (2.34)(1.00)(18.02) / (0.008314 × 293 K) = 17.3 g. Condensed: 66.3 − 17.3 = 49 g.', null, null, { sf: 2, unit: 'g' }),

/* ---------- Tutorial 7 ---------- */
mc('tu7-1', 'h16', 'Four aqueous acetone ($CH3COCH3$) solutions are made at 25 °C. Assume each has a density of 1.00 g/mL. Which has the highest partial pressure of water in the vapour above it?<br>(a) 0.100% acetone by mass<br>(b) 0.100 M acetone<br>(c) 0.100 mol acetone per kg of water<br>(d) mole fraction of acetone = 0.100',
  ['(b)', '(c)', '(d)', '(a)', 'They are all equal'], 3,
  'Raoult\'s law: P<sub>water</sub> = x<sub>water</sub>P°<sub>water</sub>, so the most dilute solution wins. In molarity: (a) 0.100 g per 100 g solution = 0.0172 M; (b) 0.100 M; (c) about 0.099 M; (d) 0.100 mol acetone in 22.02 g = 0.02202 L, so 4.5 M. (a) is the most dilute.', { k: 'c' }),
num('tu7-2', 'h16', 'Estimate the volume of pure methane gas, measured at STP (1 bar and 0 °C), that dissolves in 1.0 L of pure water (density 0.998 g/cm³) when the methane partial pressure is 1340 kPa. The Henry\'s law constant for methane in water is 3.46 × 10⁷ torr (P = kx). Give 2 significant figures.', '0.37',
  'Henry\'s law gives the mole fraction of methane. Since it is tiny, mol methane ≈ x × mol water. Then V = nRT/P at STP.',
  'x = (1340 kPa × 760/101.325 torr per kPa) / 3.46 × 10⁷ torr = 2.905 × 10⁻⁴. mol water = 998 g / 18.015 = 55.40 mol, so n = 0.01609 mol CH₄. V = nRT/P = 0.01609 × 0.08314 × 273.15 / 1.00 bar = 0.37 L. (0.36 L is also accepted.)', null, null, { sf: 2, unit: 'L', tol: 0.03 }),
mc('tu7-3', 'h15', 'Sulfur has two solid phases, rhombic and monoclinic. Use its phase diagram:<br>' + SULFUR + '<br>Which of these statements are true?<br>A) At STP the sulfur is rhombic solid.<br>B) There is only one triple point on the diagram.<br>C) There are two triple points where the gas is in equilibrium with two other phases.<br>D) Sulfur boils only at 444.6 °C.<br>E) Rhombic sulfur cannot be melted at pressures below 1420 atm.',
  ['A, C and E only', 'A and E only', 'A, B and D only', 'C, D and E only', 'A, C, D and E only'], 0,
  'A true: at 1 bar and 0 °C the point is in the rhombic region. B false: any point where three lines meet is a triple point, and there are three. C true: rhombic–monoclinic–gas (95.3 °C) and monoclinic–liquid–gas (115.2 °C). D false: 444.6 °C is the normal boiling point at 1 atm; at other pressures sulfur boils at other temperatures. E true: rhombic sulfur only borders the liquid above 1420 atm.', { k: 'c' }),
mc('tu7-4', 'h15', 'Use this phase diagram:<br>' + PDE + '<br>Which of these statements are true?<br>A) Region A is the solid phase.<br>B) Point e is the critical point.<br>C) Only a liquid phase exists to the right of point f.<br>D) Energy is absorbed by the system in the transition from region B to region C.<br>E) Solid and gas may exist together anywhere along the line de.',
  ['A and B only', 'A, C and D only', 'B, C and E only', 'A, D and E only', 'A and E only'], 3,
  'A true: A is solid, B liquid, C gas. B false: e, where three phases meet, is the triple point. C false: f is the critical point, and beyond it is a supercritical fluid, not just liquid. D true: liquid → vapour is vaporization, which absorbs energy. E true: de is the solid–gas boundary, where both phases coexist.', { k: 'c' }),
multi('tu7-5', 'h16', 'Styrene ($C8H8$) is made from ethylbenzene ($C8H10$). The product is 38% styrene and 62% ethylbenzene by mass, and it is separated by distillation at 90 °C, where P<sup>vap</sup>($C8H8$) = 134 mmHg and P<sup>vap</sup>($C8H10$) = 182 mmHg. Assume Raoult\'s law.', [
  { ask: 'What is the mole fraction of styrene in the liquid? Give 3 significant figures.', ans: '0.385', sf: 3,
    hint: 'Basis 100 g of liquid. M(C₈H₈) = 104.15, M(C₈H₁₀) = 106.17 g/mol.',
    why: '38 / 104.15 = 0.3649 mol styrene, 62 / 106.17 = 0.5840 mol ethylbenzene. x = 0.3649 / 0.9489 = 0.385.' },
  { ask: 'What is the mole fraction of styrene in the vapour? Give 2 significant figures.', ans: '0.32', sf: 2,
    hint: 'P<sub>i</sub> = x<sub>i</sub>P<sub>i</sub><sup>vap</sup>, then y<sub>i</sub> = P<sub>i</sub> / P<sub>total</sub>.',
    why: 'P(styrene) = 0.3845 × 134 = 51.5 mmHg. P(ethylbenzene) = 0.6155 × 182 = 112.0 mmHg. y = 51.5 / 163.5 = 0.315, so 0.32. (0.31 is also accepted.)' },
  { ask: 'What is the mole fraction of ethylbenzene in the vapour? Give 2 significant figures.', ans: '0.68', sf: 2,
    hint: 'The vapour has only two components.',
    why: 'y = 112.0 / 163.5 = 0.685, so 0.68 (1 − 0.315). 0.69 is also accepted.' }
], 'C'),
num('tu7-6', 'h16', 'A mixture of benzene and toluene at 25 °C has a total vapour pressure of 67.8 mmHg above the liquid. At 25 °C, P<sup>vap</sup>(toluene) = 28.4 mmHg and P<sup>vap</sup>(benzene) = 94.1 mmHg. What is the mole fraction of benzene in the liquid? Give 3 significant figures.', '0.600',
  'Raoult\'s law for each component, with x<sub>toluene</sub> = 1 − x<sub>benzene</sub>.',
  '67.8 = 94.1x + 28.4(1 − x), so x = (67.8 − 28.4) / (94.1 − 28.4) = 39.4 / 65.7 = 0.600.', null, null, { sf: 3 }),
num('tu7-7', 'h16', 'A new planet\'s atmosphere is 18 mol-% $O2$. A glass with 250 mL of water at 20 °C has 12 mg of $O2$ dissolved. Henry\'s constant for $O2$ at 20 °C is 1.3 × 10⁻³ mol·L<sup>−1</sup>·atm<sup>−1</sup>. What is the atmospheric pressure of the planet? Give 3 significant figures.', '6.41',
  'The units of the constant tell you the form: C = kP. Then Dalton\'s law, P<sub>O2</sub> = yP.',
  'C = (0.012 g / 32 g/mol) / 0.250 L = 0.0015 M. P<sub>O2</sub> = C/k = 0.0015 / 1.3 × 10⁻³ = 1.154 atm. P = 1.154 / 0.18 = 6.41 atm.', null, null, { sf: 3, unit: 'atm' })
];

/* $C6H12O6$ marks a chemical formula: digits after an element or bracket become subscripts */
function chem(s) { return typeof s === 'string' ? s.replace(/\$([^$]+)\$/g, function (m, f) { return f.replace(/([A-Za-z\)\]])(\d+)/g, '$1<sub>$2</sub>'); }) : s; }
Q.forEach(function (q) {
  q.q = chem(q.q); q.why = chem(q.why); q.hint = chem(q.hint);
  if (q.opts) q.opts = q.opts.map(chem);
  if (q.parts) q.parts.forEach(function (p) { p.ask = chem(p.ask); p.why = chem(p.why); p.hint = chem(p.hint); });
});

TUT('che102', T, Q);
})();
