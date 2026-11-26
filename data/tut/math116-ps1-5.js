/* MATH 116 Practice Sets 1 to 5 (Fall 2026), added with the instructor's permission. */
(function () {
var EVEN = ['Even', 'Odd', 'Neither', 'Both even and odd'];
var GI = plot([{ pts: [[-1, 1], [0, 0]] }, { pts: [[0, 0], [1, 1]] }, { pts: [[1, 1], [2, 1]] }, { pts: [[2, 1], [4, -1]] }],
  { xr: [-2, 5], yr: [-2, 2], dots: [[0, 0, 1], [1, 1, 1], [2, 1, 1]], label: 'Graph: the line y = −x for x < 0, the line y = x from (0, 0) to (1, 1), the level segment y = 1 from x = 1 to x = 2, then the line y = 3 − x for x > 2. Open circles at (0, 0), (1, 1) and (2, 1).' });
var GII = plot([{ pts: [[-2, 0], [0, 0]] }, { a: 0, b: 1, f: function (x) { return x * x; } }, { a: 1, b: 2, f: function (x) { return (x - 1) * (x - 1); } }, { pts: [[2, 1], [5, 1]] }],
  { xr: [-2, 5], yr: [-2, 2], dots: [[0, 0, 1], [1, 1, 1], [1, 0, 1], [2, 1, 1]], label: 'Graph: y = 0 for x < 0, y = x² for 0 < x < 1, y = (x − 1)² for 1 < x < 2, and y = 1 for x > 2. Open circles at (0, 0), (1, 1), (1, 0) and (2, 1).' });
var EX = 'Type an expression in x, e.g. 2sqrt(x+3)-1.';

TUT('math116', null, [
/* ================= Practice Set 1 ================= */
multi('ps1-1a', 'k2', 'Let f(x) = 2x − 1 and g(x) = #sqrt{x + 3}. Evaluate each composition.', [
  { ask: 'f(g(1))', ans: '3', hint: 'Work from the inside out: find g(1) first.', why: 'g(1) = √4 = 2, so f(2) = 2(2) − 1 = 3.' },
  { ask: 'g(f(7))', ans: '4', hint: 'Find f(7) first.', why: 'f(7) = 13, so g(13) = √16 = 4.' },
  { ask: 'f(f(−2))', ans: '-11', hint: 'Apply f twice.', why: 'f(−2) = −5, then f(−5) = −11.' },
  { ask: 'g(g(6))', ans: 'sqrt(6)', hint: 'g(6) is a whole number.', why: 'g(6) = √9 = 3, then g(3) = √6.' }
]),
multi('ps1-1c', 'k2', 'Let f(x) = 2x − 1 and g(x) = #sqrt{x + 3}. Find a formula for each composition.', [
  { ask: 'f(g(x))', ans: '2sqrt(x+3)-1', kind: 'expr', pts: [-3, 0, 1, 6, 13], hint: 'Put g(x) in place of x in f.', why: 'f(g(x)) = 2g(x) − 1 = 2√(x + 3) − 1.' },
  { ask: 'g(f(x))', ans: 'sqrt(2x+2)', kind: 'expr', pts: [-1, 0, 1, 7, 3.5], hint: 'Put 2x − 1 inside the root of g.', why: 'g(f(x)) = √((2x − 1) + 3) = √(2x + 2).' },
  { ask: 'f(f(x))', ans: '4x-3', kind: 'expr', pts: [0, 1, 2, -3, 5], hint: 'Double, subtract 1, and do it again.', why: 'f(f(x)) = 2(2x − 1) − 1 = 4x − 3.' },
  { ask: 'g(g(x))', ans: 'sqrt(sqrt(x+3)+3)', kind: 'expr', pts: [-3, 0, 1, 6, 13], hint: 'The inner g(x) goes under another root.', why: 'g(g(x)) = √(g(x) + 3) = √(√(x + 3) + 3).' }
]),
multi('ps1-2a', 'k2', 'Let f(x) = #sqrt{x − 2} and g(x) = #frac{1}{x − 1}. Find formulas for f∘g and g∘f.', [
  { ask: '(f∘g)(x)', ans: 'sqrt(1/(x-1)-2)', kind: 'expr', pts: [1.1, 1.2, 1.25, 1.4, 1.5], hint: 'Put g(x) in place of x inside the square root.', why: 'f(g(x)) = √(g(x) − 2) = √(1/(x − 1) − 2), which simplifies to √((3 − 2x)/(x − 1)).' },
  { ask: '(g∘f)(x)', ans: '1/(sqrt(x-2)-1)', kind: 'expr', pts: [2, 2.5, 4, 6, 11], hint: 'Put f(x) in place of x in 1/(x − 1).', why: 'g(f(x)) = 1/(f(x) − 1) = 1/(√(x − 2) − 1).' }
]),
mc('ps1-2b', 'k1', 'Let f(x) = #sqrt{x − 2} and g(x) = #frac{1}{x − 1}. What is the domain of f∘g(x) = #sqrt{#frac{1}{x − 1} − 2}?',
  ['(1, ∞)', '(1, 3/2]', '[3/2, ∞)', '(−∞, 1) ∪ [3/2, ∞)'], 1,
  'x ≠ 1 for g. The root needs 1/(x − 1) − 2 = (3 − 2x)/(x − 1) ≥ 0. A sign chart on 3 − 2x (zero at 3/2) and x − 1 (zero at 1) shows the quotient is ≥ 0 only for 1 &lt; x ≤ 3/2. Domain: (1, 3/2].'),
mc('ps1-2c', 'k1', 'Let f(x) = #sqrt{x − 2} and g(x) = #frac{1}{x − 1}. What is the domain of g∘f(x) = #frac{1}{#sqrt{x − 2} − 1}?',
  ['[2, 3) ∪ (3, ∞)', '[2, ∞)', '(2, ∞)', '(−∞, 1) ∪ (1, ∞)'], 0,
  'f needs x ≥ 2. The denominator √(x − 2) − 1 cannot be 0, so √(x − 2) ≠ 1, meaning x ≠ 3. Domain: [2, 3) ∪ (3, ∞).'),
num('ps1-3a', 'k2', 'Let f(x) = #frac{2x − 3}{x − 1}. Find a simplified expression for f(f(x)).', '(x-3)/(x-2)',
  'Substitute (2x − 3)/(x − 1) for x, then multiply top and bottom by x − 1.',
  'f(f(x)) = (2·(2x − 3)/(x − 1) − 3) / ((2x − 3)/(x − 1) − 1). Multiply top and bottom by x − 1: (4x − 6 − 3x + 3)/(2x − 3 − x + 1) = (x − 3)/(x − 2), with x ≠ 1, 2.', null, null, { kind: 'expr', pts: [0, 3, 4, -1, 5] }),
mc('ps1-3b', 'k2', 'Let f(x) = #frac{2x − 3}{x − 1}. What is f(f(f(x))), simplified, and its domain?',
  ['x, for all real x', 'x, for all x ≠ 1, 2', '(x − 3)/(x − 2), for x ≠ 1, 2', 'x, for all x ≠ 1'], 1,
  'First f(f(x)) = (x − 3)/(x − 2) with x ≠ 1, 2. Then f applied to that is (2(x − 3)/(x − 2) − 3)/((x − 3)/(x − 2) − 1) = (−x/(x − 2))/(−1/(x − 2)) = x. The simplified form hides no restriction, but the inner functions still exclude x = 1 and x = 2.'),
num('ps1-4a', 'k2', 'Find the inverse of f(x) = #frac{4x − 1}{2x + 3}.', '(3x+1)/(4-2x)',
  'Write y = f(x), clear the denominator, collect the x terms, then swap x and y.',
  'y(2x + 3) = 4x − 1 gives x(2y − 4) = −1 − 3y, so x = (3y + 1)/(4 − 2y). Swapping: f<sup>−1</sup>(x) = (3x + 1)/(4 − 2x).', null, null, { kind: 'expr', pts: [0, 1, 3, -1, 5] }),
num('ps1-4b', 'k2', 'Find the inverse of g(x) = 2x³ + 3. (Write a cube root as ^(1/3).)', '((x-3)/2)^(1/3)',
  'Isolate x³, then take the cube root.',
  'y = 2x³ + 3 gives x³ = (y − 3)/2, so x = ((y − 3)/2)<sup>1/3</sup>. Swapping: g<sup>−1</sup>(x) = ((x − 3)/2)<sup>1/3</sup>.', null, null, { kind: 'expr', pts: [3, 5, 11, 19, 7] }),
multi('ps1-5', 'k2', 'Let f(x) = #frac{2x}{5 − x}.', [
  { ask: 'Find f<sup>−1</sup>(x).', ans: '5x/(x+2)', kind: 'expr', pts: [0, 1, 2, -1, 3], hint: 'Solve y(5 − x) = 2x for x.', why: 'y(5 − x) = 2x gives 5y = x(y + 2), so x = 5y/(y + 2). Swapping: f<sup>−1</sup>(x) = 5x/(x + 2).' },
  { ask: 'The domain of f is all real x except x = ?', ans: '5', hint: 'Where is the denominator 0?', why: '5 − x = 0 at x = 5.' },
  { ask: 'The domain of f<sup>−1</sup> is all real x except x = ?', ans: '-2', hint: 'Look at the denominator of f<sup>−1</sup>.', why: 'x + 2 = 0 at x = −2.' },
  { ask: 'The range of f is all real numbers except ?', ans: '-2', hint: 'The range of f is the domain of f<sup>−1</sup>.', why: 'Range of f = domain of f<sup>−1</sup> = all reals except −2.' },
  { ask: 'The range of f<sup>−1</sup> is all real numbers except ?', ans: '5', hint: 'The range of f<sup>−1</sup> is the domain of f.', why: 'Range of f<sup>−1</sup> = domain of f = all reals except 5.' }
]),
multi('ps1-6', 'k2', 'Let f(x) = #frac{x}{x + 1} and h(x) = #frac{1}{x² − 1}.', [
  { ask: 'Compute f<sup>−1</sup>(x).', ans: 'x/(1-x)', kind: 'expr', pts: [0, 2, 3, -1, 0.5], hint: 'Solve y(x + 1) = x for x.', why: 'xy + y = x gives x(y − 1) = −y, so x = −y/(y − 1). Swapping: f<sup>−1</sup>(x) = −x/(x − 1) = x/(1 − x).' },
  { ask: 'Find a function g with g(f(x)) = h(x).', ans: '(x-1)^2/(2x-1)', kind: 'expr', pts: [0, 2, 3, -1, 4], hint: 'f<sup>−1</sup>(f(x)) = x, so apply h to both sides.', why: 'h(f<sup>−1</sup>(f(x))) = h(x), so g = h∘f<sup>−1</sup>: g(x) = 1/((−x/(x − 1))² − 1) = (x − 1)²/(x² − (x − 1)²) = (x − 1)²/(2x − 1).' }
]),

/* ================= Practice Set 2 ================= */
mc('ps2-1a', 'k3', 'Which steps turn the graph of y = x³ into the graph of y = #frac{1}{2}(x − 4)³?',
  ['Shift left 4, then compress vertically by a factor of 2', 'Shift right 4, then compress vertically by a factor of 2', 'Shift right 4, then stretch vertically by a factor of 2', 'Compress horizontally by a factor of 2, then shift right 4'], 1,
  'Replacing x with x − 4 gives y = (x − 4)³, a shift 4 units to the right (the point of inflection moves from (0, 0) to (4, 0)). Multiplying by 1/2 compresses vertically by a factor of 2.'),
mc('ps2-1b', 'k3', 'Which steps turn the graph of y = #sqrt{x} into the graph of y = #sqrt{3x + 3}?',
  ['Compress horizontally by a factor of 3, then shift left 3', 'Shift left 3, then stretch vertically by a factor of 3', 'Shift left 3, then compress horizontally by a factor of 3', 'Shift right 3, then compress horizontally by a factor of 3'], 2,
  'Shift left 3: y = √(x + 3). Then replace x with 3x: y = √(3x + 3), a horizontal compression by 3. Compressing first and then shifting left 3 would give √(3(x + 3)) = √(3x + 9). Other correct routes: compress by 3 then shift left 1, or shift left 1 then stretch vertically by √3.'),
mc('ps2-1c', 'k3', 'Which steps turn the graph of y = #frac{1}{x} into the graph of y = #frac{1}{1 − x}?',
  ['Shift left 1, then reflect in the x-axis', 'Reflect in the y-axis, then shift left 1', 'Shift right 1, then reflect in the y-axis', 'Shift left 1, then reflect in the y-axis'], 3,
  'Shift left 1: y = 1/(x + 1). Replace x with −x (reflect in the y-axis): y = 1/(−x + 1) = 1/(1 − x). The vertical asymptote ends up at x = 1 and the horizontal one stays y = 0.'),
mc('ps2-2a', 'k3', 'Is f(x) = x⁶ − #frac{3x²}{x² + 1} + 1 even, odd, or neither?', EVEN, 0,
  'f(−x) = (−x)⁶ − 3(−x)²/((−x)² + 1) + 1 = x⁶ − 3x²/(x² + 1) + 1 = f(x), so f is even.'),
mc('ps2-2b', 'k3', 'Is g(x) = 3x⁵ + x³ − x + 1 even, odd, or neither?', EVEN, 2,
  'g(−x) = −3x⁵ − x³ + x + 1. That is neither g(x) nor −g(x) (the constant 1 does not flip sign), so g is neither.'),
mc('ps2-3a', 'k3', 'f is even and g is odd. What is p(x) = f(x)g(x)?', ['Even', 'Odd', 'Neither, in general', 'It depends on f and g'], 1,
  'p(−x) = f(−x)g(−x) = f(x)·(−g(x)) = −p(x), so p is odd.'),
proof('ps2-3b', 'k3', 'g is odd. Prove that p(x) = g(g(x)) is odd. Build the steps in order. Some tiles are wrong.',
  ['p(−x) = g(g(−x))', '= g(−g(x))   (g is odd)', '= −g(g(x))   (g is odd again)', '= −p(x), so p is odd'],
  ['= g(g(x))   (g is odd)', '= p(x), so p is even'],
  'Use g(−u) = −g(u) twice: once on the inside (g(−x) = −g(x)) and once on the outside with u = g(x).'),
mc('ps2-3c', 'k3', 'f is even and g is odd. What is p(x) = #frac{2f(x)}{1 + [g(x)]²}?', ['Odd', 'Neither, in general', 'Even', 'Both even and odd'], 2,
  'p(−x) = 2f(−x)/(1 + [g(−x)]²) = 2f(x)/(1 + [−g(x)]²) = 2f(x)/(1 + [g(x)]²) = p(x), so p is even.'),
multi('ps2-4', 'k3', 'Find the even part f<sub>e</sub>(x) and the odd part f<sub>o</sub>(x) of f(x) = 1 + x³ − 3|x|. (Type |x| as abs(x).)', [
  { ask: 'f<sub>e</sub>(x)', ans: '1-3abs(x)', kind: 'expr', pts: [-2, -1, 0.5, 1, 3], hint: 'f<sub>e</sub>(x) = (f(x) + f(−x))/2.', why: 'f(−x) = 1 − x³ − 3|x|. (f(x) + f(−x))/2 = (2 − 6|x|)/2 = 1 − 3|x|.' },
  { ask: 'f<sub>o</sub>(x)', ans: 'x^3', kind: 'expr', pts: [-2, -1, 0.5, 1, 3], hint: 'f<sub>o</sub>(x) = (f(x) − f(−x))/2, or f − f<sub>e</sub>.', why: '(f(x) − f(−x))/2 = 2x³/2 = x³. Check: f<sub>e</sub> + f<sub>o</sub> = f.' }
]),
proof('ps2-5', 'k3', 'g is odd. Prove that g<sub>o</sub>(x) = g(x) and g<sub>e</sub>(x) = 0. Build the steps in order. Some tiles are wrong.',
  ['Since g is odd, g(−x) = −g(x).', 'g<sub>o</sub>(x) = #frac{g(x) − g(−x)}{2} = #frac{g(x) + g(x)}{2} = g(x)', 'g<sub>e</sub>(x) = #frac{g(x) + g(−x)}{2} = #frac{g(x) − g(x)}{2} = 0'],
  ['Since g is odd, g(−x) = g(x).', 'g<sub>o</sub>(x) = #frac{g(x) + g(−x)}{2} = 0'],
  'Substitute g(−x) = −g(x) into the definitions g<sub>o</sub> = (g(x) − g(−x))/2 and g<sub>e</sub> = (g(x) + g(−x))/2.'),
num('ps2-6a', 'k4', 'Solve |x − 5| = 2. Enter both solutions, smaller first.', '(3,7)',
  '|x − 5| is the distance from x to 5.',
  'The points exactly 2 units from 5 are x = 3 and x = 7.', ['smaller x', 'larger x']),
mc('ps2-6b', 'k4', 'Solve |x − 1| &gt; 3.', ['−2 &lt; x &lt; 4', 'x &lt; −2 or x &gt; 4', '−3 &lt; x − 1 &lt; 3, so −2 &lt; x &lt; 4', 'x &lt; −4 or x &gt; 2'], 1,
  'We want x more than 3 units from 1: x &lt; 1 − 3 = −2 or x &gt; 1 + 3 = 4. So (−∞, −2) ∪ (4, ∞).'),
mc('ps2-6c', 'k4', 'Solve |3x − 2| &lt; 1.', ['1/3 &lt; x &lt; 1', '−1/3 &lt; x &lt; 1', '1 &lt; x &lt; 3', 'x &lt; 1/3 or x &gt; 1'], 0,
  '3x is less than 1 unit from 2, so 1 &lt; 3x &lt; 3. Divide by 3: 1/3 &lt; x &lt; 1.'),
num('ps2-6d', 'k4', 'Solve |x| = |x − 4|.', '2',
  'Which point is the same distance from 0 as from 4?',
  '|x| is the distance to 0 and |x − 4| the distance to 4. Equal distances means the midpoint, x = 2.'),
mc('ps2-6e', 'k4', 'Solve |x − 2| ≤ |x − 5|.', ['x ≥ 7/2', 'x ≤ 3', 'x ≤ 7/2', '2 ≤ x ≤ 5'], 2,
  'We want x at least as close to 2 as to 5. The midpoint is 7/2, so every x ≤ 7/2 works: (−∞, 7/2].'),
num('ps2-7', 'k4', 'Suppose |a| = 6, |b| = 3, |a − c| = 9, and #frac{a²c − ac²}{b} = 54. What is |c|?', '3',
  'Factor the numerator and use |xy| = |x||y|.',
  '54 = |a²c − ac²|/|b| = |a||c||a − c|/|b| = 6·|c|·9/3 = 18|c|, so |c| = 3.'),
mc('ps2-8a', 'k4', 'Which is the piecewise form of y = |1 − x|?',
  ['#cases{1 − x | x ≤ 1;; x − 1 | x &gt; 1}', '#cases{1 − x | x ≥ 1;; x − 1 | x &lt; 1}', '#cases{1 + x | x ≤ −1;; −1 − x | x &gt; −1}', '#cases{x − 1 | x ≤ 1;; 1 − x | x &gt; 1}'], 0,
  '|1 − x| = 1 − x when 1 − x ≥ 0 (x ≤ 1) and −(1 − x) = x − 1 when x &gt; 1. The graph is y = |x| shifted right 1, a V with vertex (1, 0).'),
mc('ps2-8b', 'k4', 'Which is the piecewise form of y = |x² − 4| − x²?',
  ['#cases{−4 − 2x² | x ≤ −2 or x ≥ 2;; 4 − 2x² | −2 &lt; x &lt; 2}', '#cases{2x² − 4 | x ≤ −2 or x ≥ 2;; 4 | −2 &lt; x &lt; 2}', '#cases{−4 | x ≤ −2 or x ≥ 2;; 4 − 2x² | −2 &lt; x &lt; 2}', '#cases{4 | x ≤ −2 or x ≥ 2;; −4 | −2 &lt; x &lt; 2}'], 2,
  'When x² − 4 ≥ 0 (x ≤ −2 or x ≥ 2): (x² − 4) − x² = −4. When x² − 4 &lt; 0 (−2 &lt; x &lt; 2): −(x² − 4) − x² = 4 − 2x². The graph is a downward parabola with top (0, 4) between −2 and 2, and the flat line y = −4 outside.'),

/* ================= Practice Set 3 ================= */
mc('ps3-1a', 'k7', 'h is the Heaviside function (0 for x &lt; 0, 1 for x &gt; 0). Which is the piecewise form of f(x) = x + (1 − x)h(x − 1) + (4x − x² − 4)h(x − 2)?',
  ['#cases{x | x &lt; 1;; 1 − x | 1 &lt; x &lt; 2;; 4x − x² − 4 | x &gt; 2}', '#cases{x | x &lt; 1;; 1 | 1 &lt; x &lt; 2;; 4x − x² − 3 | x &gt; 2}', '#cases{x | x &lt; 1;; 1 | 1 &lt; x &lt; 2;; 5x − x² − 4 | x &gt; 2}', '#cases{0 | x &lt; 1;; 1 | 1 &lt; x &lt; 2;; 4x − x² − 3 | x &gt; 2}'], 1,
  'For x &lt; 1 both steps are off: f = x. For 1 &lt; x &lt; 2: x + (1 − x) = 1. For x &gt; 2: 1 + 4x − x² − 4 = 4x − x² − 3 = −(x − 2)² + 1, a downward parabola with vertex (2, 1).'),
mc('ps3-1bi', 'k7', 'Express the function in the graph using the Heaviside function h.' + GI,
  ['−x(1 − h(x)) + xh(x) + (1 − x)h(x − 1) + (3 − x)h(x − 2)', '−x + 2xh(x) + (1 − x)h(x − 1) + (2 − x)h(x − 2)', 'x + 2xh(x) + (1 − x)h(x − 1) + (2 − x)h(x − 2)', '−x + 2xh(x) + h(x − 1) + (3 − x)h(x − 2)'], 1,
  'Piecewise: −x for x &lt; 0, x on (0, 1), 1 on (1, 2), 3 − x for x &gt; 2. At each break, add (new piece − old piece)·h(x − a): −x + (x − (−x))h(x) + (1 − x)h(x − 1) + ((3 − x) − 1)h(x − 2) = −x + 2xh(x) + (1 − x)h(x − 1) + (2 − x)h(x − 2).'),
mc('ps3-1bii', 'k7', 'Express the function in the graph using the Heaviside function h.' + GII,
  ['x²h(x) + ((x − 1)² + x²)h(x − 1) + (1 − (x − 1)²)h(x − 2)', 'x²h(x) + (1 − 2x)h(x − 1) + (1 − x²)h(x − 2)', 'x²h(x) + (1 − 2x)h(x − 1) + (2x − x²)h(x − 2)', 'x²h(x) − x²h(x − 1) + (2x − x²)h(x − 2)'], 2,
  'Piecewise: 0, then x² on (0, 1), (x − 1)² on (1, 2), 1 for x &gt; 2. Add the jumps: x²h(x) + ((x − 1)² − x²)h(x − 1) + (1 − (x − 1)²)h(x − 2) = x²h(x) + (1 − 2x)h(x − 1) + (2x − x²)h(x − 2).'),
num('ps3-2a', 'k6', 'Find all x in [0, 2π] with 2cos(x) + sin(2x) = 0. Enter them in increasing order.', '(pi/2,3pi/2)',
  'Use sin(2x) = 2 sin x cos x and factor.',
  '2cos x + 2 sin x cos x = 2cos x(1 + sin x) = 0. So cos x = 0 (x = π/2, 3π/2) or sin x = −1 (x = 3π/2). Solutions: π/2 and 3π/2.', ['x₁', 'x₂']),
num('ps3-2b', 'k6', 'Find all x in [0, 2π] with 2 + cos(2x) = 3cos(x). Enter them in increasing order.', '(0,pi/3,5pi/3,2pi)',
  'Write cos(2x) = 2cos²x − 1 and solve a quadratic in cos x.',
  '2 + 2cos²x − 1 = 3cos x gives 2cos²x − 3cos x + 1 = 0, so cos x = 1 or 1/2. cos x = 1 at x = 0, 2π; cos x = 1/2 at x = π/3, 5π/3.', ['x₁', 'x₂', 'x₃', 'x₄']),
num('ps3-2c', 'k6', 'Find all x in [0, 2π] with 3cot²(x) = 1. Enter them in increasing order.', '(pi/3,2pi/3,4pi/3,5pi/3)',
  'Turn it into an equation for tan² x.',
  'cot²x = 1/3, so tan²x = 3 and tan x = ±√3. In [0, 2π]: x = π/3, 2π/3, 4π/3, 5π/3.', ['x₁', 'x₂', 'x₃', 'x₄']),
proof('ps3-3a', 'k6', 'Prove 1 + tan²θ = sec²θ. Build the steps in order. Some tiles are wrong.',
  ['Start from cos²θ + sin²θ = 1.', 'Divide both sides by cos²θ: #frac{cos²θ}{cos²θ} + #frac{sin²θ}{cos²θ} = #frac{1}{cos²θ}', 'So 1 + tan²θ = sec²θ.'],
  ['Divide both sides by sin²θ: 1 + cot²θ = csc²θ', 'So 1 + tan²θ = csc²θ.'],
  'Dividing the Pythagorean identity by cos²θ turns each term into 1, tan²θ and sec²θ.'),
proof('ps3-3b', 'k6', 'Prove #frac{cos θ tan θ + sin θ}{tan θ} = 2cos θ. Build the steps in order. Some tiles are wrong.',
  ['LHS = #frac{cos θ · #frac{sin θ}{cos θ} + sin θ}{#frac{sin θ}{cos θ}}', '= #frac{2 sin θ}{#frac{sin θ}{cos θ}}', '= 2 sin θ · #frac{cos θ}{sin θ}', '= 2cos θ = RHS'],
  ['= #frac{sin θ + sin θ}{sin θ}', '= #frac{2 sin θ}{cos θ}'],
  'Write tan θ = sin θ / cos θ. The numerator becomes sin θ + sin θ = 2 sin θ, and dividing by sin θ / cos θ leaves 2cos θ.'),
proof('ps3-3c', 'k6', 'Prove 2csc(2θ) = sec θ csc θ. Build the steps in order. Some tiles are wrong.',
  ['LHS = #frac{2}{sin(2θ)}', '= #frac{2}{2 sin θ cos θ}', '= #frac{1}{sin θ} · #frac{1}{cos θ}', '= csc θ sec θ = RHS'],
  ['= #frac{2}{2 sin θ}', '= #frac{2}{sin θ + cos θ}'],
  'Use sin(2θ) = 2 sin θ cos θ, cancel the 2, and split the fraction.'),
multi('ps3-4', 'k6', 'Find the exact value of each expression.', [
  { ask: 'tan<sup>−1</sup>(1/√3)', ans: 'pi/6', hint: 'Which angle in (−π/2, π/2) has tangent 1/√3?', why: 'tan(π/6) = 1/√3 and π/6 is in (−π/2, π/2).' },
  { ask: 'sec<sup>−1</sup>(2)', ans: 'pi/3', hint: 'sec θ = 2 means cos θ = 1/2.', why: 'cos θ = 1/2 with θ in [0, π] gives θ = π/3.' },
  { ask: 'tan(sec<sup>−1</sup> 4)', ans: 'sqrt(15)', hint: 'Draw a right triangle with hypotenuse 4 and adjacent side 1.', why: 'Opposite side = √(16 − 1) = √15, so tan θ = √15/1 = √15.' },
  { ask: 'sin(2 sin<sup>−1</sup>(3/5))', ans: '24/25', hint: 'Let θ = sin<sup>−1</sup>(3/5) and use the double-angle formula.', why: 'sin θ = 3/5, cos θ = 4/5 (3-4-5 triangle). sin 2θ = 2(3/5)(4/5) = 24/25.' }
]),
multi('ps3-5a', 'k6', 'Write 2 sin θ + 2√3 cos θ as A sin(θ + φ) with A &gt; 0 and −π &lt; φ ≤ π.', [
  { ask: 'A', ans: '4', hint: 'A = √(B² + C²) where B and C are the sine and cosine coefficients.', why: 'A = √(4 + 12) = 4.' },
  { ask: 'φ', ans: 'pi/3', hint: 'cos φ = B/A and sin φ = C/A.', why: 'cos φ = 2/4 = 1/2 and sin φ = 2√3/4 = √3/2, so φ = π/3. Result: 4 sin(θ + π/3).' }
], 'trig'),
multi('ps3-5b', 'k6', 'Write 4cos(2θ) − 4sin(2θ) as A sin(ωθ + φ) with A &gt; 0, ω &gt; 0 and −π &lt; φ ≤ π.', [
  { ask: 'A', ans: '4sqrt(2)', hint: 'The sine coefficient is B = −4 and the cosine coefficient is C = 4.', why: 'A = √(16 + 16) = 4√2.' },
  { ask: 'ω', ans: '2', hint: 'Look at the argument.', why: 'Both terms have 2θ, so ω = 2.' },
  { ask: 'φ', ans: '3pi/4', hint: 'cos φ = B/A, sin φ = C/A. Which quadrant?', why: 'cos φ = −4/(4√2) = −1/√2 and sin φ = 4/(4√2) = 1/√2, quadrant II, so φ = 3π/4. Result: 4√2 sin(2θ + 3π/4).' }
], 'trig'),
num('ps3-6', 'k6', 'Find all θ in [0, 2π] with √3 sin θ − cos θ = 2.', '2pi/3',
  'Rewrite √3 sin θ − cos θ as A sin(θ + φ) first.',
  'A = √(3 + 1) = 2, cos φ = √3/2, sin φ = −1/2, so φ = −π/6 and the equation is 2 sin(θ − π/6) = 2, i.e. sin(θ − π/6) = 1. Then θ − π/6 = π/2 + 2kπ, so θ = 2π/3 + 2kπ. The only one in [0, 2π] is 2π/3.'),

/* ================= Practice Set 4 ================= */
multi('ps4-1a', 'k5', 'Solve each equation.', [
  { ask: 'log<sub>5</sub>(x + 4) + log<sub>5</sub>(x) = 1', ans: '1', hint: 'Combine the logs, then check the solutions in the original.', why: 'log<sub>5</sub>(x(x + 4)) = 1 gives x² + 4x − 5 = 0, so x = 1 or −5. log<sub>5</sub>(x) is undefined at −5, so x = 1.' },
  { ask: 'ln(ln(2x)) = 1', ans: 'e^e/2', hint: 'Exponentiate twice.', why: 'ln(2x) = e, so 2x = e<sup>e</sup> and x = e<sup>e</sup>/2.' },
  { ask: '5 = ln(3 + 2 ln x)', ans: 'e^((e^5-3)/2)', hint: 'Exponentiate, then isolate ln x.', why: 'e⁵ = 3 + 2 ln x, so ln x = (e⁵ − 3)/2 and x = e<sup>(e⁵ − 3)/2</sup>.' }
]),
num('ps4-1d', 'k5', 'Solve log<sub>2</sub>(x + 3) &gt; 0. The solution is x &gt; a. What is a?', '-2',
  'log<sub>2</sub>(u) &gt; 0 exactly when u &gt; 1.',
  'log<sub>2</sub>(x + 3) &gt; 0 means x + 3 &gt; 1, so x &gt; −2.'),
mc('ps4-1e', 'k5', 'Solve e<sup>ax</sup> = Ce<sup>bx</sup>, where C &gt; 0 and a ≠ b.',
  ['x = #frac{ln C}{ln a − ln b}', 'x = #frac{ln C}{a − b}', 'x = #frac{ln C}{b − a}', 'x = ln#frac{C}{a − b}'], 1,
  'Take ln of both sides: ax = ln C + bx. So x(a − b) = ln C and x = ln C/(a − b).'),
num('ps4-1f', 'k5', 'Solve 4<sup>x</sup> + 2<sup>x+1</sup> = 18. (Write log<sub>2</sub>(u) as ln(u)/ln(2).)', 'ln(sqrt(19)-1)/ln(2)',
  'Let q = 2<sup>x</sup>. Then 4<sup>x</sup> = q² and 2<sup>x+1</sup> = 2q.',
  'q² + 2q − 18 = 0 gives q = −1 ± √19. Since 2<sup>x</sup> &gt; 0, only q = √19 − 1 works, so x = log<sub>2</sub>(√19 − 1) ≈ 1.75.'),
mc('ps4-2', 'k7', 'Are sinh(x), cosh(x) and tanh(x) even or odd, in that order?',
  ['Even, odd, even', 'Odd, odd, even', 'Odd, even, even', 'Odd, even, odd'], 3,
  'sinh(−x) = (e<sup>−x</sup> − e<sup>x</sup>)/2 = −sinh x (odd). cosh(−x) = (e<sup>−x</sup> + e<sup>x</sup>)/2 = cosh x (even). tanh(−x) = sinh(−x)/cosh(−x) = −tanh x (odd).'),
proof('ps4-3', 'k7', 'Prove cosh²(x) − sinh²(x) = 1 from the definitions. Build the steps in order. Some tiles are wrong.',
  ['cosh²x − sinh²x = (#frac{e<sup>x</sup> + e<sup>−x</sup>}{2})² − (#frac{e<sup>x</sup> − e<sup>−x</sup>}{2})²', '= #frac{e<sup>2x</sup> + 2 + e<sup>−2x</sup>}{4} − #frac{e<sup>2x</sup> − 2 + e<sup>−2x</sup>}{4}', '= #frac{2 − (−2)}{4}', '= 1'],
  ['= #frac{e<sup>2x</sup> + e<sup>−2x</sup>}{4} − #frac{e<sup>2x</sup> + e<sup>−2x</sup>}{4}', '= #frac{4}{2}'],
  'Expand each square using e<sup>x</sup>e<sup>−x</sup> = 1, so the cross terms are ±2. Everything cancels except 2 − (−2) = 4 over 4.'),
multi('ps4-4a', 'k8', 'Evaluate each limit. Use inf, -inf or DNE when needed.', [
  { ask: '#lim{x→3} #frac{x² + 5x + 6}{x² + x − 6}', ans: '5', hint: 'Try plugging in first.', why: 'Direct substitution works: 30/6 = 5.' },
  { ask: '#lim{z→5} #frac{z − 5}{#sqrt{z} − #sqrt{5}}', ans: '2sqrt(5)', hint: 'Multiply by the conjugate of the denominator.', why: '(z − 5)(√z + √5)/(z − 5) = √z + √5 → 2√5.' },
  { ask: '#lim{x→4⁺} #frac{|4 − x|}{2x − 8}', ans: '1/2', hint: 'For x &gt; 4, what is |4 − x|?', why: 'For x &gt; 4, |4 − x| = x − 4, so the fraction is (x − 4)/(2(x − 4)) = 1/2.' }
]),
multi('ps4-4d', 'k8', 'Evaluate each limit. Use inf, -inf or DNE when needed.', [
  { ask: '#lim{θ→0} #frac{sin(θ + π)}{sin(2θ)}', ans: '-1/2', hint: 'Expand sin(θ + π) and sin(2θ).', why: 'sin(θ + π) = −sin θ and sin 2θ = 2 sin θ cos θ, so the fraction is −1/(2cos θ) → −1/2.' },
  { ask: '#lim{x→0⁺} #sqrt{x} cos(3/x)', ans: '0', hint: 'cos is between −1 and 1. Squeeze.', why: '−√x ≤ √x cos(3/x) ≤ √x, and both bounds go to 0, so the limit is 0 by the Squeeze Theorem.' },
  { ask: '#lim{t→4} #frac{#sqrt{t² + t − 4} − 4}{t − 4}', ans: '9/8', hint: 'Multiply by the conjugate of the numerator.', why: '(t² + t − 4 − 16)/((t − 4)(√(t² + t − 4) + 4)) = (t + 5)(t − 4)/((t − 4)(√(t² + t − 4) + 4)) → 9/(4 + 4) = 9/8.' }
]),
multi('ps4-4g', 'k8', 'Evaluate each limit. Use inf, -inf or DNE when needed.', [
  { ask: '#lim{x→0⁺} #frac{ln(4x) − ln(2)}{2 ln(#sqrt{x}) + ln(2)}', ans: '1', hint: 'Simplify the top and bottom with log laws.', why: 'Top: ln(4x/2) = ln(2x). Bottom: ln x + ln 2 = ln(2x). The ratio is 1.' },
  { ask: '#lim{x→1} #frac{|x² + x − 2|}{x² − 1}', ans: 'DNE', hint: 'Factor and check each side of 1.', why: '|(x + 2)(x − 1)|/((x + 1)(x − 1)). From the left it tends to −3/2, from the right to 3/2. They differ, so the limit does not exist.' },
  { ask: '#lim{x→3⁻} #frac{x² − 3x}{x² − 6x + 9}', ans: '-inf', hint: 'Factor; what sign is the denominator just left of 3?', why: 'x(x − 3)/(x − 3)² = x/(x − 3). The top → 3 and the bottom → 0 through negative values, so −∞.' },
  { ask: '#lim{x→1⁺} #sqrt{x² − 1} arctan(#frac{1}{#sqrt{x² − 1}})', ans: '0', hint: 'arctan is between −π/2 and π/2. Squeeze.', why: '−(π/2)√(x² − 1) &lt; expression &lt; (π/2)√(x² − 1), and both bounds → 0, so the limit is 0.' }
]),
multi('ps4-5', 'k8', 'Find each limit.', [
  { ask: '#lim{t→∞} #frac{2 − 3t²}{5t² + 4t}', ans: '-3/5', hint: 'Divide top and bottom by t².', why: '(2/t² − 3)/(5 + 4/t) → −3/5.' },
  { ask: '#lim{x→∞} (ln(2x + 1) − ln x)', ans: 'ln(2)', hint: 'Combine into one log.', why: 'ln((2x + 1)/x) = ln(2 + 1/x) → ln 2, since ln is continuous.' },
  { ask: '#lim{x→−∞} (x + #sqrt{x² − 2x})', ans: '1', hint: 'Multiply by the conjugate, and remember √(x²) = −x when x &lt; 0.', why: '(x² − (x² − 2x))/(x − √(x² − 2x)) = 2x/(x + x√(1 − 2/x)) = 2/(1 + √(1 − 2/x)) → 2/2 = 1.' }
]),
mc('ps4-6a', 'k9', 'Where is f discontinuous?<br>f(x) = #cases{0 | x = −3 or x = 2;; #frac{x² − 4}{x² + x − 6} cos(πx) | otherwise}',
  ['Only at x = −3, where the limit is infinite', 'Only at x = 2', 'At x = −3 and x = 2', 'Nowhere: the value 0 fills both gaps'], 2,
  'Away from −3 and 2 the formula is continuous. At x = −3 the top → 5, the bottom → 0 and cos(−3π) = −1, so the limit does not exist: discontinuous. At x = 2, (x + 2)/(x + 3)·cos(πx) → 4/5 ≠ f(2) = 0: discontinuous (a removable hole).'),
num('ps4-6b', 'k8', 'Compute #lim{x→2} #frac{x² − 4}{x² + x − 6} cos(πx).', '4/5',
  'Factor and cancel x − 2.',
  '(x − 2)(x + 2)/((x + 3)(x − 2)) = (x + 2)/(x + 3), so the limit is (4/5)cos(2π) = 4/5.'),
multi('ps4-7', 'k9', 'Find a and b so that f is continuous for all real x.<br>f(x) = #cases{x² sin(#frac{1}{2x}) | x &lt; 0;; ax − 2b | 0 ≤ x &lt; 1;; x² − bx − a | x ≥ 1}', [
  { ask: 'a', ans: '1/2', hint: 'Match the two sides at x = 1, using the b you get at x = 0.', why: 'At x = 1: a − 2b = 1 − b − a. With b = 0 this is a = 1 − a, so a = 1/2.' },
  { ask: 'b', ans: '0', hint: 'At x = 0, squeeze x² sin(1/(2x)).', why: '−x² ≤ x² sin(1/(2x)) ≤ x², so the left limit at 0 is 0. The right limit and f(0) are −2b. So −2b = 0 and b = 0.' }
], 'cont'),

/* ================= Practice Set 5 ================= */
mc('ps5-1', 'k10', 'A function g has g(0) = g′(0) = 0, g′(−1) = −1, g′(1) = 3 and g′(2) = 1. Which must be true of its graph?',
  ['The tangent line at x = 1 is y = 3x, through the origin', 'g(−1) = −1, since g′(−1) = −1', 'g passes through (0, 0) with a horizontal tangent', 'g has a local minimum at x = 2, since g′(2) &gt; 0'], 2,
  'g(0) = 0 puts the graph through the origin and g′(0) = 0 makes the tangent there horizontal. g′(−1) = −1 means it falls near x = −1, g′(1) = 3 means it rises steeply near x = 1, and g′(2) = 1 means it still rises, more gently, at x = 2. The derivative values give slopes, not function values or tangent-line intercepts.'),
mc('ps5-2', 'k10', 'Sketch y = ln x and the graph of its slope. The slope is large near x = 0⁺ and shrinks toward 0 as x grows, always positive. Which formula fits f′(x)?',
  ['ln x', '1/x', 'e<sup>x</sup>', '−1/x²'], 1,
  'The slopes of ln x are positive, blow up as x → 0⁺, and decay to 0 as x → ∞, with slope 1 at x = 1. That is 1/x, which matches the derivative found in class.'),
num('ps5-3a', 'k10', 'Using the definition of the derivative, find g′(x) for g(x) = 2 + x − x².', '1-2x',
  'Expand (x + h)², cancel, and divide by h before letting h → 0.',
  '[2 + (x + h) − (x + h)² − (2 + x − x²)]/h = (h − 2xh − h²)/h = 1 − 2x − h → 1 − 2x. The domain of g and of g′ is all of ℝ.', null, null, { kind: 'expr', pts: [0, 1, 2, -1, 3] }),
proof('ps5-3b', 'k10', 'Find f′(x) for f(x) = x + #sqrt{x} using the definition. Build the steps in order. Some tiles are wrong.',
  ['f′(x) = #lim{h→0} #frac{(x + h) + #sqrt{x + h} − x − #sqrt{x}}{h}', '= 1 + #lim{h→0} #frac{#sqrt{x + h} − #sqrt{x}}{h} · #frac{#sqrt{x + h} + #sqrt{x}}{#sqrt{x + h} + #sqrt{x}}', '= 1 + #lim{h→0} #frac{1}{#sqrt{x + h} + #sqrt{x}}', '= 1 + #frac{1}{2#sqrt{x}}'],
  ['= 1 + #lim{h→0} #frac{#sqrt{h}}{h}', '= 1 + #frac{1}{#sqrt{x}}'],
  'Split off h/h = 1, then rationalize the root difference: (x + h) − x = h cancels the h. Let h → 0 to get 1 + 1/(2√x).'),
mc('ps5-3bdom', 'k10', 'For f(x) = x + #sqrt{x}, what are the domains of f and of f′(x) = 1 + #frac{1}{2#sqrt{x}}?',
  ['Both are [0, ∞), the domain of √x', 'f: [0, ∞); f′: (0, ∞)', 'f: (0, ∞); f′: [0, ∞)', 'Both (0, ∞)'], 1,
  '√x needs x ≥ 0, so f has domain [0, ∞). f′ has √x in a denominator, so x = 0 is excluded: (0, ∞).'),
mc('ps5-3c', 'k10', 'Using the definition of the derivative, what is f′(x) for f(x) = mx + b (m and b constants)?',
  ['m', 'mx', 'm + b', 'b'], 0,
  '[(m(x + h) + b) − (mx + b)]/h = mh/h = m → m. The domain of f and f′ is ℝ.'),
num('ps5-3d', 'k10', 'Using the definition of the derivative, find f′(x) for f(x) = #frac{3 + x}{1 − 3x}.', '10/(1-3x)^2',
  'Combine f(x + h) − f(x) over the common denominator (1 − 3(x + h))(1 − 3x).',
  'The numerator (3 + x + h)(1 − 3x) − (3 + x)(1 − 3x − 3h) simplifies to 10h. Dividing by h and letting h → 0 gives 10/(1 − 3x)². The domain of f and f′ is all x ≠ 1/3.', null, null, { kind: 'expr', pts: [0, 1, 2, -1, 3] }),
multi('ps5-4a', 'k10', 'Differentiate each function (written in x so you can type the answer).', [
  { ask: 'h(x) = x + 3x²', ans: '1+6x', kind: 'expr', pts: [0, 1, 2, -1, 3], hint: 'Power rule term by term.', why: 'h′ = 1 + 6x.' },
  { ask: 'R(x) = #frac{x}{x² + x} − #frac{1}{x}', ans: '-1/(x+1)^2+1/x^2', kind: 'expr', pts: [1, 2, 3, -2, 0.5], hint: 'Simplify x/(x² + x) first.', why: 'R(x) = (x + 1)<sup>−1</sup> − x<sup>−1</sup>, so R′ = −1/(x + 1)² + 1/x².' },
  { ask: 'y = #sqrt{x}(x − 1)', ans: '3sqrt(x)/2-1/(2sqrt(x))', kind: 'expr', pts: [1, 2, 4, 0.5, 9], hint: 'Expand to x<sup>3/2</sup> − x<sup>1/2</sup>.', why: 'y′ = (3/2)x<sup>1/2</sup> − (1/2)x<sup>−1/2</sup> = 3√x/2 − 1/(2√x).' },
  { ask: 'h(x) = (x + 3x²)(2x − 5)', ans: '18x^2-26x-5', kind: 'expr', pts: [0, 1, 2, -1, 3], hint: 'Product rule, then expand.', why: '(1 + 6x)(2x − 5) + 2(x + 3x²) = 18x² − 26x − 5.' }
]),
multi('ps5-4e', 'k10', 'Differentiate each function (written in x so you can type the answer).', [
  { ask: 'y = #frac{x + 3}{x² + 2x}', ans: '(-x^2-6x-6)/(x^2+2x)^2', kind: 'expr', pts: [1, 2, 3, -1, 0.5], hint: 'Quotient rule.', why: '[(x² + 2x) − (x + 3)(2x + 2)]/(x² + 2x)² = (−x² − 6x − 6)/(x² + 2x)².' },
  { ask: 'y = #frac{2x}{(1 + x)²}', ans: '2(1-x)/(1+x)^3', kind: 'expr', pts: [0, 1, 2, -2, 3], hint: 'Quotient rule; the bottom derivative needs the chain rule.', why: '[2(1 + x)² − 2x·2(1 + x)]/(1 + x)⁴ = (2 − 2x²)/(1 + x)⁴ = 2(1 − x)/(1 + x)³.' },
  { ask: 'F(x) = (x² + 300x)<sup>1000</sup>', ans: '1000(x^2+300x)^999(2x+300)', kind: 'expr', pts: [0.00333, 0.003335, 0.00334, -0.00333, -0.00334], hint: 'Chain rule.', why: 'F′ = 1000(x² + 300x)<sup>999</sup>(2x + 300).' },
  { ask: 'y = e<sup>x</sup> − 17x + 18', ans: 'e^x-17', kind: 'expr', pts: [0, 1, 2, -1, 3], hint: 'e<sup>x</sup> is its own derivative.', why: 'y′ = e<sup>x</sup> − 17.' }
]),
multi('ps5-4i', 'k10', 'Differentiate each function.', [
  { ask: 'y = #frac{e<sup>x</sup>}{x + 2}', ans: 'e^x(x+1)/(x+2)^2', kind: 'expr', pts: [0, 1, 2, -1, 3], hint: 'Quotient rule, then factor out e<sup>x</sup>.', why: '[e<sup>x</sup>(x + 2) − e<sup>x</sup>]/(x + 2)² = e<sup>x</sup>(x + 1)/(x + 2)².' },
  { ask: 'f(x) = #sqrt{x} cos(x)', ans: 'cos(x)/(2sqrt(x))-sqrt(x)sin(x)', kind: 'expr', pts: [1, 2, 3, 0.5, 4], hint: 'Product rule.', why: 'f′ = cos x/(2√x) − √x sin x.' },
  { ask: 'y = sec(x) + 2 sin(x)', ans: 'sec(x)tan(x)+2cos(x)', kind: 'expr', pts: [0, 1, 2, -1, 0.5], hint: 'd/dx sec x = sec x tan x.', why: 'y′ = sec x tan x + 2cos x.' },
  { ask: 'y = tan(x) sin(x)', ans: 'sec(x)^2sin(x)+tan(x)cos(x)', kind: 'expr', pts: [0, 1, 2, -1, 0.5], hint: 'Product rule; d/dx tan x = sec² x.', why: 'y′ = sec²x sin x + tan x cos x (which also equals sin x + sin x sec²x).' }
]),
multi('ps5-4m', 'k10', 'Differentiate each function. (Write log<sub>9</sub> as ln(…)/ln(9) if needed.)', [
  { ask: 'g(x) = x⁵ + 2<sup>x</sup> + log<sub>9</sub>(x² + 1)', ans: '5x^4+2^x*ln(2)+2x/((x^2+1)ln(9))', kind: 'expr', pts: [0, 1, 2, -1, 3], hint: 'd/dx a<sup>x</sup> = a<sup>x</sup> ln a, and d/dx log<sub>a</sub>(u) = u′/(u ln a).', why: 'g′ = 5x⁴ + 2<sup>x</sup> ln 2 + 2x/((x² + 1) ln 9).' },
  { ask: 'f(x) = #sqrt{arctan(#frac{x²}{x + 2})}', ans: '(x^2+4x)/(2sqrt(arctan(x^2/(x+2)))(1+(x^2/(x+2))^2)(x+2)^2)', kind: 'expr', pts: [1, 2, 3, 0.5, 4], hint: 'Chain rule three layers deep: root, arctan, then a quotient.', why: 'f′ = 1/(2√(arctan u)) · 1/(1 + u²) · u′ with u = x²/(x + 2) and u′ = ((x + 2)(2x) − x²)/(x + 2)² = (x² + 4x)/(x + 2)².' }
]),
proof('ps5-5', 'k10', 'Use the product rule and chain rule to prove the quotient rule (f/g)′ = (f′g − fg′)/g². Build the steps in order. Some tiles are wrong.',
  ['(#frac{f(x)}{g(x)})′ = (f(x)g(x)<sup>−1</sup>)′', '= f′(x)g(x)<sup>−1</sup> + f(x)(g(x)<sup>−1</sup>)′   (product rule)', '= f′(x)g(x)<sup>−1</sup> − f(x)g(x)<sup>−2</sup>g′(x)   (chain rule)', '= #frac{f′(x)g(x)}{g(x)²} − #frac{f(x)g′(x)}{g(x)²}', '= #frac{f′(x)g(x) − f(x)g′(x)}{g(x)²}'],
  ['= f′(x)g(x)<sup>−1</sup> − f(x)g(x)<sup>−2</sup>   (chain rule)', '= f′(x)(g′(x))<sup>−1</sup>'],
  'Write the quotient as a product with g<sup>−1</sup>. The chain rule gives (g<sup>−1</sup>)′ = −g<sup>−2</sup>g′ (don\'t forget the inner g′). Then use the common denominator g².'),
mc('ps5-6a', 'k10', 'Find dy/dx by implicit differentiation: x² + xy + y² = 7.',
  ['#frac{−2x − y}{x + 2y}', '#frac{2x + y}{x + 2y}', '#frac{7 − 2x − y}{x + 2y}', '#frac{−2x − y}{2y}'], 0,
  'Differentiate: 2x + (y + xy′) + 2yy′ = 0. Collect y′: y′(x + 2y) = −2x − y, so y′ = (−2x − y)/(x + 2y). The xy term needs the product rule.'),
mc('ps5-6b', 'k10', 'Find dy/dx by implicit differentiation: sin(x) + cos(y) = sin(x)cos(y).',
  ['#frac{cos x(cos y − 1)}{sin y(1 − sin x)}', '#frac{cos x(1 − cos y)}{sin y(sin x − 1)}', '#frac{cos x cos y + cos x}{sin y − sin x sin y}', '#frac{cos x(cos y − 1)}{sin y(sin x − 1)}'], 3,
  'cos x − sin y·y′ = cos x cos y − sin x sin y·y′. Move the y′ terms together: y′ sin y(sin x − 1) = cos x(cos y − 1), so y′ = cos x(cos y − 1)/(sin y(sin x − 1)).'),
mc('ps5-7', 'k10', 'Given y² − xy = 3, use implicit differentiation to find y″.',
  ['#frac{y}{2y − x}', '#frac{2y(y − x)}{(2y − x)³}', '#frac{2y(y − x)}{(2y − x)²}', '#frac{y(2y − x) − 2y}{(2y − x)²}'], 1,
  'First 2yy′ − y − xy′ = 0, so y′ = y/(2y − x). Then y″ = [y′(2y − x) − y(2y′ − 1)]/(2y − x)². Substitute y′ and multiply through by (2y − x): y″ = (2y² − 2xy)/(2y − x)³ = 2y(y − x)/(2y − x)³. (Since y² − xy = 3, this also equals 6/(2y − x)³.)'),
proof('ps5-8', 'k10', 'Use implicit differentiation to prove #frac{d}{dx} arccos(x) = #frac{−1}{#sqrt{1 − x²}}. Build the steps in order. Some tiles are wrong.',
  ['Let y = arccos x, so cos y = x with y in [0, π].', 'Differentiate: −sin y · y′ = 1, so y′ = #frac{−1}{sin y}.', 'From a right triangle with adjacent side x and hypotenuse 1, the opposite side is #sqrt{1 − x²}, so sin y = #sqrt{1 − x²}.', 'Therefore y′ = #frac{−1}{#sqrt{1 − x²}}.'],
  ['Differentiate: sin y · y′ = 1, so y′ = #frac{1}{sin y}.', 'From the triangle, sin y = #sqrt{1 + x²}.'],
  'd/dx cos y = −sin y·y′. Since y is in [0, π], sin y ≥ 0, so sin y = √(1 − cos²y) = √(1 − x²).'),
proof('ps5-9a', 'k10', 'f is invertible. Prove (f<sup>−1</sup>)′(x) = #frac{1}{f′(f<sup>−1</sup>(x))}. Build the steps in order. Some tiles are wrong.',
  ['Start with f(f<sup>−1</sup>(x)) = x.', 'Differentiate both sides with the chain rule: f′(f<sup>−1</sup>(x)) · (f<sup>−1</sup>)′(x) = 1.', 'Divide by f′(f<sup>−1</sup>(x)): (f<sup>−1</sup>)′(x) = #frac{1}{f′(f<sup>−1</sup>(x))}.'],
  ['Differentiate both sides: f′(f<sup>−1</sup>(x)) = 1.', 'Start with f(x) · f<sup>−1</sup>(x) = 1.'],
  'The composition f∘f<sup>−1</sup> is the identity. Its derivative by the chain rule is the outer derivative at the inner function times the inner derivative.'),
proof('ps5-9b', 'k10', 'Use (f<sup>−1</sup>)′(x) = #frac{1}{f′(f<sup>−1</sup>(x))} to prove (ln x)′ = #frac{1}{x}. Build the steps in order. Some tiles are wrong.',
  ['ln x is the inverse of f(x) = e<sup>x</sup>.', 'f′(x) = e<sup>x</sup>.', '(ln x)′ = #frac{1}{f′(ln x)} = #frac{1}{e<sup>ln x</sup>}', '= #frac{1}{x}'],
  ['(ln x)′ = #frac{1}{f′(x)} = #frac{1}{e<sup>x</sup>}', 'f′(x) = xe<sup>x−1</sup>.'],
  'With f = e<sup>x</sup> and f<sup>−1</sup> = ln, the formula gives 1/e<sup>ln x</sup>, and e<sup>ln x</sup> = x.'),
proof('ps5-9c', 'k10', 'Use (f<sup>−1</sup>)′(x) = #frac{1}{f′(f<sup>−1</sup>(x))} to prove (arctan x)′ = #frac{1}{1 + x²}. Build the steps in order. Some tiles are wrong.',
  ['arctan x is the inverse of f(x) = tan x on (−π/2, π/2), and f′(x) = sec²x.', '(arctan x)′ = #frac{1}{sec²(arctan x)}', 'Let θ = arctan x. A right triangle with opposite x and adjacent 1 has hypotenuse #sqrt{1 + x²}, so sec θ = #sqrt{1 + x²}.', 'So sec²(arctan x) = 1 + x² and (arctan x)′ = #frac{1}{1 + x²}.'],
  ['(arctan x)′ = #frac{1}{sec²x}', 'The hypotenuse is #sqrt{1 − x²}, so sec θ = #sqrt{1 − x²}.'],
  'Apply the inverse-derivative formula with f = tan, then simplify sec²(arctan x) with a triangle (or with 1 + tan²θ = sec²θ).')
]);
})();
