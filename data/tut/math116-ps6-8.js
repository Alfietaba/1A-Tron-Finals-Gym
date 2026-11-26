/* ================= MATH 116: Practice Sets 6 to 8 (Fall 2026) ================= */
(function () {
TUT('math116', [
  { id: 'ps6', name: 'Practice Set 6: log differentiation, Newton, IVT', sec: 'Practice Set 6' },
  { id: 'ps7', name: 'Practice Set 7: MVT, extrema, curve sketching', sec: 'Practice Set 7' },
  { id: 'ps8', name: 'Practice Set 8: optimization, related rates, L\'Hôpital', sec: 'Practice Set 8' }
], [
/* ---------- Practice Set 6 ---------- */
num('ps6-1a', 'ps6', 'Use logarithmic differentiation to find y′ for y = (e<sup>x</sup> + 1)<sup>x</sup>. Enter y′ as an expression in x.',
  '(e^x+1)^x*(ln(e^x+1)+x*e^x/(e^x+1))',
  'Take ln of both sides: ln y = x ln(e<sup>x</sup> + 1). Then differentiate implicitly with the product rule.',
  'ln y = x ln(e<sup>x</sup> + 1). Differentiating: y′/y = ln(e<sup>x</sup> + 1) + x · #frac{e<sup>x</sup>}{e<sup>x</sup> + 1}. So y′ = (e<sup>x</sup> + 1)<sup>x</sup> (ln(e<sup>x</sup> + 1) + #frac{xe<sup>x</sup>}{e<sup>x</sup> + 1}).',
  null, null, { kind: 'expr', pts: [0.5, 1, 2, -1, 0.3] }),
num('ps6-1b', 'ps6', 'Use logarithmic differentiation to find y′ for y = (2<sup>x</sup> + 1)(3<sup>x</sup> + 1)(4<sup>x</sup> + 1). Enter y′ as an expression in x.',
  '(2^x+1)*(3^x+1)*(4^x+1)*(2^x*ln(2)/(2^x+1)+3^x*ln(3)/(3^x+1)+4^x*ln(4)/(4^x+1))',
  'ln turns the product into a sum of three logs. Remember (a<sup>x</sup>)′ = a<sup>x</sup> ln a.',
  'ln y = ln(2<sup>x</sup> + 1) + ln(3<sup>x</sup> + 1) + ln(4<sup>x</sup> + 1). Differentiating: y′/y = #frac{2<sup>x</sup> ln 2}{2<sup>x</sup> + 1} + #frac{3<sup>x</sup> ln 3}{3<sup>x</sup> + 1} + #frac{4<sup>x</sup> ln 4}{4<sup>x</sup> + 1}. Multiply both sides by y = (2<sup>x</sup> + 1)(3<sup>x</sup> + 1)(4<sup>x</sup> + 1).',
  null, null, { kind: 'expr', pts: [0, 1, 0.5, -1, 2] }),
num('ps6-1c', 'ps6', 'Use logarithmic differentiation to find y′ for y = ∛(#frac{x² + 2}{x² + 1}). Enter y′ as an expression in x; ((x^2+2)/(x^2+1))^(1/3) is fine for y.',
  '((x^2+2)/(x^2+1))^(1/3)*(-2x)/(3(x^2+2)(x^2+1))',
  'ln y = (1/3)[ln(x² + 2) − ln(x² + 1)]. Differentiate each log with the chain rule.',
  'ln y = #frac{1}{3}(ln(x² + 2) − ln(x² + 1)), so y′/y = #frac{2x}{3}(#frac{1}{x² + 2} − #frac{1}{x² + 1}) = #frac{2x}{3} · #frac{(x² + 1) − (x² + 2)}{(x² + 2)(x² + 1)} = #frac{−2x}{3(x² + 2)(x² + 1)}. Then y′ = ((x² + 2)/(x² + 1))<sup>1/3</sup> · #frac{−2x}{3(x² + 2)(x² + 1)}.',
  null, null, { kind: 'expr', pts: [0.5, 1, 2, -1, 3] }),
multi('ps6-2', 'ps6', 'Find the tangent line to y = (x² + x + 1)<sup>e<sup>x</sup></sup> at (0, 1), in the form y = mx + b.', [
  { ask: 'Find m.', ans: '1', hint: 'ln y = e<sup>x</sup> ln(x² + x + 1). Differentiate with the product rule, then put x = 0.',
    why: 'y′/y = e<sup>x</sup> ln(x² + x + 1) + e<sup>x</sup> · #frac{2x + 1}{x² + x + 1}. At x = 0: y = 1, ln 1 = 0 and the second term is 1 · 1/1 = 1, so y′(0) = 1 · (0 + 1) = 1.' },
  { ask: 'Find b.', ans: '1', hint: 'The line passes through (0, 1).',
    why: 'y = 1 + 1(x − 0) = x + 1, so b = 1.' }
]),
proof('ps6-3', 'ps6', 'Assume n ∈ ℝ and x &gt; 0. Use logarithmic differentiation on y = x<sup>n</sup> to prove the power rule #frac{d}{dx} x<sup>n</sup> = nx<sup>n−1</sup>. Build the steps in order. Some tiles are wrong.',
  ['ln y = ln(x<sup>n</sup>) = n ln x',
   'Differentiate both sides: #frac{1}{y} · y′ = #frac{n}{x}',
   'y′ = y · #frac{n}{x}',
   'y′ = x<sup>n</sup> · #frac{n}{x}',
   'y′ = nx<sup>n−1</sup>'],
  ['ln y = (ln x)<sup>n</sup>', 'Differentiate both sides: y′ = #frac{n}{x}'],
  'Taking ln brings the exponent down: ln y = n ln x. Implicit differentiation gives y′/y = n/x. Multiply by y = x<sup>n</sup>: y′ = n x<sup>n</sup>/x = nx<sup>n−1</sup>. The left side differentiates to y′/y, not y′.'),
proof('ps6-4', 'ps6', 'Use logarithmic differentiation to prove the product rule: if y = f(x)g(x), then y′ = f′(x)g(x) + f(x)g′(x). Assume f(x) and g(x) are positive. Build the steps in order. Some tiles are wrong.',
  ['ln y = ln(f(x)g(x)) = ln f(x) + ln g(x)',
   '#frac{y′}{y} = #frac{f′(x)}{f(x)} + #frac{g′(x)}{g(x)}',
   'y′ = y (#frac{f′(x)}{f(x)} + #frac{g′(x)}{g(x)})',
   'y′ = f(x)g(x) (#frac{f′(x)}{f(x)} + #frac{g′(x)}{g(x)})',
   'y′ = f′(x)g(x) + f(x)g′(x)'],
  ['ln y = ln f(x) · ln g(x)', '#frac{y′}{y} = #frac{f′(x)g′(x)}{f(x)g(x)}'],
  'The log of a product is a sum of logs. Differentiate each log with the chain rule, multiply both sides by y = f(x)g(x) and distribute: the f(x) cancels in the first term and the g(x) in the second.'),
multi('ps6-5', 'ps6', 'Consider the equation x³ − 3x² + x − 1 = 0, and let f(x) = x³ − 3x² + x − 1.<br>(a) Use the Intermediate Value Theorem to show it has a solution in [0, 3].<br>(b) Use Newton\'s method with x<sub>0</sub> = 2 to find that solution to four decimal places.', [
  { ask: 'Find f(0).', ans: '-1', hint: 'Plug in x = 0.', why: 'f(0) = −1 &lt; 0.' },
  { ask: 'Find f(3).', ans: '2', hint: 'Plug in x = 3.', why: 'f(3) = 27 − 27 + 3 − 1 = 2 &gt; 0. f is a polynomial, so continuous, and changes sign on [0, 3]: by the IVT there is a root in [0, 3].' },
  { ask: 'Find x<sub>1</sub>.', ans: '5', hint: 'f′(x) = 3x² − 6x + 1. Use x<sub>1</sub> = x<sub>0</sub> − f(x<sub>0</sub>)/f′(x<sub>0</sub>).', why: 'f(2) = 8 − 12 + 2 − 1 = −3 and f′(2) = 12 − 12 + 1 = 1, so x<sub>1</sub> = 2 − (−3)/1 = 5.' },
  { ask: 'Keep iterating until the first four decimals stop changing. What is the root, to four decimal places?', ans: '2.7693', tol: 2e-5, hint: 'Iterate until two successive values agree to four decimals.', why: 'x<sub>2</sub> ≈ 3.8261, x<sub>3</sub> ≈ 3.1467, x<sub>4</sub> ≈ 2.8423, x<sub>5</sub> ≈ 2.7728, x<sub>6</sub> ≈ 2.7693, x<sub>7</sub> ≈ 2.7693. So the root is about 2.7693.' }
]),
multi('ps6-6', 'ps6', 'Use Newton\'s method to approximate √15 correct to 5 decimal places, using f(x) = x² − 15 and the initial guess x<sub>0</sub> = 4.', [
  { ask: 'Find x<sub>1</sub>.', ans: '3.875', hint: 'f′(x) = 2x.', why: 'x<sub>1</sub> = 4 − (16 − 15)/(2 · 4) = 4 − 1/8 = 3.875.' },
  { ask: 'What is √15 to 5 decimal places?', ans: '3.87298', tol: 2e-6, hint: 'Iterate until the first five decimals repeat.', why: 'x<sub>2</sub> = 3.875 − (3.875² − 15)/(2 · 3.875) ≈ 3.87298, and x<sub>3</sub> ≈ 3.87298 again. So √15 ≈ 3.87298.' }
]),
multi('ps6-7', 'ps6', 'Consider the equation sin(x) = 1 − x², and let f(x) = sin(x) + x² − 1.<br>(a) Use the Intermediate Value Theorem to show it has a solution in [0, π].<br>(b) Use Newton\'s method with x<sub>0</sub> = 0 to find that solution to two decimal places.', [
  { ask: 'Find f(0).', ans: '-1', hint: 'sin 0 = 0.', why: 'f(0) = 0 + 0 − 1 = −1 &lt; 0.' },
  { ask: 'Find f(π).', ans: 'pi^2-1', hint: 'sin π = 0.', why: 'f(π) = 0 + π² − 1 &gt; 0. f is continuous, so by the IVT f(x) = 0, that is sin x = 1 − x², has a solution in [0, π].' },
  { ask: 'Find x<sub>1</sub>.', ans: '1', hint: 'f′(x) = cos x + 2x.', why: 'x<sub>1</sub> = 0 − (sin 0 + 0 − 1)/(cos 0 + 0) = 0 − (−1)/1 = 1.' },
  { ask: 'What is the solution to two decimal places?', ans: '0.64', tol: 0.006, hint: 'Iterate until two successive values agree to two decimals.', why: 'x<sub>2</sub> ≈ 0.67, x<sub>3</sub> ≈ 0.64, x<sub>4</sub> ≈ 0.64. So x ≈ 0.64.' }
]),
multi('ps6-8', 'ps6', 'Prove that f(x) = x³ − 12x + 10 has at least two roots in (0, 3) by evaluating f at a few points and using the Intermediate Value Theorem.', [
  { ask: 'Find f(0).', ans: '10', hint: 'Plug in.', why: 'f(0) = 10 &gt; 0.' },
  { ask: 'Find f(1).', ans: '-1', hint: 'Plug in.', why: 'f(1) = 1 − 12 + 10 = −1 &lt; 0, so by the IVT there is a root in (0, 1).' },
  { ask: 'Find f(3).', ans: '1', hint: 'Plug in.', why: 'f(3) = 27 − 36 + 10 = 1 &gt; 0, so by the IVT there is a root in (1, 3).' },
  { ask: 'So f has at least how many roots in (0, 3)?', ans: '2', hint: 'Count the sign changes on non-overlapping intervals.', why: 'f is a polynomial, so continuous. The intervals (0, 1) and (1, 3) do not overlap, so the two roots are distinct: at least 2.' }
]),
proof('ps6-9', 'ps6', 'Suppose f is continuous with f(0) = 3 and f(2) = 1. Prove that there is some c ∈ [0, 2] with f(c) = c. Build the steps in order. Some tiles are wrong.',
  ['Let g(x) = f(x) − x. g is continuous since f and x are',
   'g(0) = f(0) − 0 = 3 &gt; 0 and g(2) = f(2) − 2 = −1 &lt; 0',
   'By the Intermediate Value Theorem, g(c) = 0 for some c ∈ [0, 2]',
   'g(c) = 0 means f(c) − c = 0, so f(c) = c'],
  ['g(0) = f(0) = 3 and g(2) = f(2) = 1, both positive', 'By the Mean Value Theorem, g′(c) = 0 for some c ∈ (0, 2)'],
  'Turn f(x) = x into a root problem: g(x) = f(x) − x. g changes sign from 3 to −1 on [0, 2] and is continuous, so the IVT gives a root c, and g(c) = 0 is exactly f(c) = c.'),

/* ---------- Practice Set 7 ---------- */
proof('ps7-1', 'ps7', 'Suppose f is continuous on [a, b] and f′(x) ≤ 1 for all x ∈ (a, b). Prove that f(b) − b ≤ f(a) − a. Build the steps in order. Some tiles are wrong.',
  ['f is continuous on [a, b] and differentiable on (a, b), so the MVT applies',
   'There is c ∈ (a, b) with f′(c) = #frac{f(b) − f(a)}{b − a}',
   'Since f′(c) ≤ 1: #frac{f(b) − f(a)}{b − a} ≤ 1',
   'Multiply by b − a &gt; 0: f(b) − f(a) ≤ b − a',
   'Rearrange: f(b) − b ≤ f(a) − a'],
  ['Multiply by b − a and flip the sign: f(b) − f(a) ≥ b − a', 'There is c ∈ (a, b) with f(c) = #frac{f(a) + f(b)}{2}'],
  'f′ exists on (a, b), so f is differentiable there and the MVT gives f′(c) = (f(b) − f(a))/(b − a) ≤ 1. Since b − a &gt; 0 the inequality keeps its direction: f(b) − f(a) ≤ b − a, which rearranges to f(b) − b ≤ f(a) − a.'),
num('ps7-2', 'ps7', 'f is continuous on [3, 7] and differentiable on (3, 7), with f(3) = −6 and f′(x) ≤ 4 for all x. According to the Mean Value Theorem, what is the largest possible value of f(7)?', '10',
  'The MVT gives some c with f′(c) = (f(7) − f(3))/(7 − 3). Use f′(c) ≤ 4.',
  'f′(c) = (f(7) + 6)/4 ≤ 4, so f(7) + 6 ≤ 16 and f(7) ≤ 10.'),
multi('ps7-3a', 'ps7', 'Let f(x) = sin(x) + 3x − 1. Use the Intermediate Value Theorem on [0, π] to show f has at least one root.', [
  { ask: 'Find f(0).', ans: '-1', hint: 'sin 0 = 0.', why: 'f(0) = 0 + 0 − 1 = −1 &lt; 0.' },
  { ask: 'Find f(π).', ans: '3pi-1', hint: 'sin π = 0.', why: 'f(π) = 0 + 3π − 1 &gt; 0. f is continuous, so by the IVT there is c ∈ (0, π) with f(c) = 0.' }
]),
proof('ps7-3b', 'ps7', 'Let f(x) = sin(x) + 3x − 1. Use the Mean Value Theorem to show f has at most one root. Build the steps in order. Some tiles are wrong.',
  ['Suppose f has two roots a &lt; b, so f(a) = f(b) = 0',
   'f is continuous and differentiable everywhere, so the MVT applies on [a, b]',
   'There is c ∈ (a, b) with f′(c) = #frac{0 − 0}{b − a} = 0',
   'But f′(x) = cos x + 3 ≥ 2 for every x, so f′(c) = 0 is impossible',
   'This contradiction shows f has at most one root'],
  ['By the IVT there is c ∈ (a, b) with f(c) = 0', 'f′(x) = cos x + 3 is 0 at x = π, so that is c'],
  'Assume two roots and get a contradiction. The MVT forces f′(c) = 0 between them, but f′(x) = cos x + 3 = 0 would need cos x = −3, impossible since −1 ≤ cos x ≤ 1.'),
proof('ps7-4', 'ps7', 'Suppose f is continuous on [a, b] and f′(x) = 0 for all x ∈ (a, b). Use the Mean Value Theorem to prove that f is constant on (a, b). Build the steps in order. Some tiles are wrong.',
  ['Let x<sub>1</sub> &lt; x<sub>2</sub> be any two points in (a, b)',
   'f is continuous on [x<sub>1</sub>, x<sub>2</sub>] and differentiable on (x<sub>1</sub>, x<sub>2</sub>), so the MVT applies',
   'There is c ∈ (x<sub>1</sub>, x<sub>2</sub>) with f′(c) = #frac{f(x<sub>2</sub>) − f(x<sub>1</sub>)}{x<sub>2</sub> − x<sub>1</sub>}',
   'f′(c) = 0, so f(x<sub>2</sub>) − f(x<sub>1</sub>) = 0',
   'f(x<sub>1</sub>) = f(x<sub>2</sub>) for every such pair, so f is constant on (a, b)'],
  ['Take x<sub>1</sub> = a and x<sub>2</sub> = b only', 'f′(c) = 0, so x<sub>2</sub> = x<sub>1</sub>'],
  'The points must be arbitrary, not just the endpoints: showing f(a) = f(b) does not make f constant. The MVT on [x<sub>1</sub>, x<sub>2</sub>] gives a slope f′(c) = 0, so the difference f(x<sub>2</sub>) − f(x<sub>1</sub>) is 0.'),
multi('ps7-5', 'ps7', 'Find the critical points of f(x) = #frac{1}{3}x³ − #frac{3}{2}x² + 2x + 1 and classify them with (a) the First Derivative Test and (b) the Second Derivative Test.', [
  { ask: 'At what x does f have a local maximum?', ans: '1', hint: 'f′(x) = x² − 3x + 2 = (x − 1)(x − 2). Check the sign of f′ on each side.', why: 'f′ is + for x &lt; 1, − on (1, 2) and + for x &gt; 2, so f has a local max at x = 1 and a local min at x = 2.' },
  { ask: 'At what x does f have a local minimum?', ans: '2', hint: 'The other critical point.', why: 'f′ changes from − to + at x = 2.' },
  { ask: 'Find f″(1).', ans: '-1', hint: 'f″(x) = 2x − 3.', why: 'f″(1) = −1 &lt; 0: concave down, so a local max, which agrees with the First Derivative Test.' },
  { ask: 'Find f″(2).', ans: '1', hint: 'f″(x) = 2x − 3.', why: 'f″(2) = 1 &gt; 0: concave up, so a local min.' }
]),
multi('ps7-6', 'ps7', 'Find and classify the critical points of f(x) = 3x⁵ − 20x³ + 15.', [
  { ask: 'At what x does f have a local maximum?', ans: '-2', hint: 'f′(x) = 15x⁴ − 60x² = 15x²(x − 2)(x + 2). Make a sign chart.', why: 'f′ is + for x &lt; −2, − on (−2, 0), − on (0, 2) and + for x &gt; 2. So a local max at x = −2.' },
  { ask: 'At what x does f have a local minimum?', ans: '2', hint: 'Look where f′ changes from − to +.', why: 'f′ changes from − to + at x = 2. At x = 0, f′ is negative on both sides, so x = 0 is neither.' },
  { ask: 'Find f″(0).', ans: '0', hint: 'f″(x) = 60x³ − 120x.', why: 'f″(0) = 0, so the Second Derivative Test says nothing at x = 0. It does work at ±2: f″(−2) = −240 &lt; 0 (max) and f″(2) = 240 &gt; 0 (min).' }
]),
mc('ps7-6b', 'ps7', 'f(x) = 3x⁵ − 20x³ + 15 has critical points x = 0 and x = ±2. Would the Second Derivative Test classify all of them?',
  ['Yes: f″(0) = 0, so x = 0 is a local minimum',
   'No: f″(0) = 0 makes it inconclusive at x = 0, which is neither a max nor a min',
   'No: f″ does not exist at x = 0, so x = 0 is not a critical point',
   'Yes: f″(0) = 0 means x = 0 is an inflection point and also a local maximum'], 1,
  'f″(x) = 60x³ − 120x. f″(±2) = ±240 classifies ±2, but f″(0) = 0 tells you nothing. The First Derivative Test shows f′ &lt; 0 on both sides of 0, so x = 0 is neither a max nor a min.'),
multi('ps7-7', 'ps7', 'Find and classify the critical points of g(x) = x · ∛(4 − x).', [
  { ask: 'At what x is g′(x) = 0?', ans: '3', hint: 'Product and chain rules, then a common denominator of 3(4 − x)<sup>2/3</sup>.', why: 'g′(x) = (4 − x)<sup>1/3</sup> − #frac{x}{3(4 − x)<sup>2/3</sup>} = #frac{3(4 − x) − x}{3(4 − x)<sup>2/3</sup>} = #frac{4(3 − x)}{3(4 − x)<sup>2/3</sup>}, which is 0 at x = 3.' },
  { ask: 'At what x does g′(x) not exist (with g defined there)?', ans: '4', hint: 'Where is the denominator of g′ zero?', why: 'The denominator 3(4 − x)<sup>2/3</sup> is 0 at x = 4, and g(4) = 0 is defined, so x = 4 is a critical point too.' },
  { ask: 'What is the local maximum value of g?', ans: '3', hint: 'g′ is + for x &lt; 3 and − just after 3.', why: 'Sign chart: g′ + on (−∞, 3), − on (3, 4), − on (4, ∞). Local max at x = 3 with g(3) = 3 · ∛1 = 3. x = 4 is neither a max nor a min.' }
]),
mc('ps7-7b', 'ps7', 'g(x) = x · ∛(4 − x) has a critical point at x = 4, where g′ does not exist. What is it?',
  ['A local maximum, since g′ is undefined there', 'Neither a local max nor a local min', 'A local minimum, since g(4) = 0', 'Not a critical point, because g′ does not exist'], 1,
  'g′(x) = 4(3 − x)/(3(4 − x)<sup>2/3</sup>). The bottom is positive on both sides of 4 and the top is negative for x &gt; 3, so g′ &lt; 0 on (3, 4) and on (4, ∞). g keeps decreasing through x = 4: no extremum there.'),
multi('ps7-8i', 'ps7', 'Sketch p(x) = 2 + 3x − x³: find its asymptotic behaviour, local extrema and inflection point. Enter points as (x, y).', [
  { ask: 'Find #lim{x → ∞} p(x).', ans: '-inf', hint: 'Polynomials have no horizontal asymptotes. Factor out x³.', why: 'p(x) = x³(2/x³ + 3/x² − 1) → ∞ · (−1) = −∞. There are no vertical or horizontal asymptotes.' },
  { ask: 'Local minimum point (x, y).', ans: '(-1,0)', hint: 'p′(x) = 3 − 3x² = 3(1 − x)(1 + x).', why: 'p′ is − for x &lt; −1 and + on (−1, 1), so a local min at x = −1, with p(−1) = 2 − 3 + 1 = 0.' },
  { ask: 'Local maximum point (x, y).', ans: '(1,4)', hint: 'Where does p′ change from + to −?', why: 'p′ changes from + to − at x = 1, and p(1) = 2 + 3 − 1 = 4.' },
  { ask: 'Inflection point (x, y).', ans: '(0,2)', hint: 'p″(x) = −6x.', why: 'p″ is + for x &lt; 0 and − for x &gt; 0, so concavity changes at (0, p(0)) = (0, 2).' }
]),
mc('ps7-8i-b', 'ps7', 'Which describes p(x) = 2 + 3x − x³?',
  ['Increasing on [−1, 1]; concave down on (−∞, 0] and concave up on [0, ∞)',
   'Decreasing on [−1, 1]; concave up on (−∞, 0] and concave down on [0, ∞)',
   'Increasing on [−1, 1]; concave up on (−∞, 0] and concave down on [0, ∞)',
   'Increasing on (−∞, −1] and [1, ∞); concave up on (−∞, 0] only'], 2,
  'p′(x) = 3(1 − x)(1 + x) is positive only on (−1, 1), so p increases on [−1, 1] and decreases on (−∞, −1] and [1, ∞). p″(x) = −6x is positive for x &lt; 0 (concave up) and negative for x &gt; 0 (concave down). (The posted solution writes "concave up on (−∞, 1]", a typo for (−∞, −1] ∪ [−1, 0] = (−∞, 0].)'),
multi('ps7-8ii', 'ps7', 'Sketch f(x) = #frac{e<sup>x</sup>}{1 + e<sup>x</sup>}: find its asymptotes, critical points and inflection point. Enter points as (x, y).', [
  { ask: 'Horizontal asymptote as x → ∞: y = ?', ans: '1', hint: 'Divide top and bottom by e<sup>x</sup>.', why: 'e<sup>x</sup>/(1 + e<sup>x</sup>) = 1/(e<sup>−x</sup> + 1) → 1/(0 + 1) = 1.' },
  { ask: 'Horizontal asymptote as x → −∞: y = ?', ans: '0', hint: 'e<sup>x</sup> → 0.', why: 'e<sup>x</sup>/(1 + e<sup>x</sup>) → 0/(1 + 0) = 0. There are no vertical asymptotes since 1 + e<sup>x</sup> is never 0.' },
  { ask: 'How many critical points does f have?', ans: '0', hint: 'Quotient rule.', why: 'f′(x) = e<sup>x</sup>/(1 + e<sup>x</sup>)² exists everywhere and is always positive, so there are no critical points and no local extrema; f is increasing on ℝ.' },
  { ask: 'Inflection point (x, y).', ans: '(0,1/2)', hint: 'f″(x) = e<sup>x</sup>(1 − e<sup>x</sup>)/(1 + e<sup>x</sup>)³.', why: 'f″ = 0 only when e<sup>x</sup> = 1, i.e. x = 0. f″ is + for x &lt; 0 and − for x &gt; 0, so (0, f(0)) = (0, 1/2) is an inflection point.' }
]),
mc('ps7-8ii-b', 'ps7', 'Which describes f(x) = #frac{e<sup>x</sup>}{1 + e<sup>x</sup>}?',
  ['Increasing on ℝ; concave down on (−∞, 0] and concave up on [0, ∞)',
   'Increasing on ℝ; concave up on (−∞, 0] and concave down on [0, ∞)',
   'Increasing on (−∞, 0] and decreasing on [0, ∞), with a local max at x = 0',
   'Decreasing on ℝ; concave up on (−∞, 0] and concave down on [0, ∞)'], 1,
  'f′ = e<sup>x</sup>/(1 + e<sup>x</sup>)² &gt; 0 everywhere. f″ = e<sup>x</sup>(1 − e<sup>x</sup>)/(1 + e<sup>x</sup>)³ is positive when e<sup>x</sup> &lt; 1 (x &lt; 0) and negative when x &gt; 0. The curve is an S rising from y = 0 to y = 1.'),
multi('ps7-8iii', 'ps7', 'Sketch g(x) = #frac{x}{x² − 4}: find its asymptotes, critical points and inflection point. Enter points as (x, y).', [
  { ask: 'The vertical asymptotes are x = ±a. Find a.', ans: '2', hint: 'Where is the denominator 0?', why: 'x² − 4 = 0 at x = ±2, and the top is ±2 ≠ 0 there, so g → ±∞.' },
  { ask: 'Horizontal asymptote: y = ?', ans: '0', hint: 'Divide top and bottom by x².', why: 'x/(x² − 4) = (1/x)/(1 − 4/x²) → 0 as x → ±∞.' },
  { ask: 'How many critical points does g have?', ans: '0', hint: 'Quotient rule; remember critical points must be in the domain.', why: 'g′(x) = −(x² + 4)/(x² − 4)² is never 0, and it is undefined only at ±2, which are not in the domain. So there are no critical points and no local extrema.' },
  { ask: 'Inflection point (x, y).', ans: '(0,0)', hint: 'g″(x) = 2x(x² + 12)/(x² − 4)³.', why: 'g″ = 0 only at x = 0 and changes sign there (− to + on (−2, 2)), so (0, 0) is an inflection point. x = ±2 are not inflection points because they are not in the domain.' }
]),
mc('ps7-8iii-b', 'ps7', 'Which describes g(x) = #frac{x}{x² − 4}?',
  ['Decreasing on each of (−∞, −2), (−2, 2), (2, ∞); concave down on (−∞, −2) and [0, 2), concave up on (−2, 0] and (2, ∞)',
   'Decreasing on each of (−∞, −2), (−2, 2), (2, ∞); concave up on (−∞, −2) and [0, 2), concave down on (−2, 0] and (2, ∞)',
   'Increasing on each of (−∞, −2), (−2, 2), (2, ∞); concave down on (−∞, −2) and [0, 2), concave up on (−2, 0] and (2, ∞)',
   'Decreasing on (−∞, 0] and increasing on [0, ∞), with a local min at the origin and concave up between the asymptotes'], 0,
  'g′ = −(x² + 4)/(x² − 4)² &lt; 0 wherever g is defined. The sign of g″ = 2x(x² + 12)/(x² − 4)³ comes from 2x and (x² − 4)³: − for x &lt; −2, + on (−2, 0), − on (0, 2), + for x &gt; 2. Use round brackets at ±2, which are not in the domain.'),

/* ---------- Practice Set 8 ---------- */
multi('ps8-1a', 'ps8', 'Find the absolute maximum and minimum values of f(x) = 2x³ − 15x² + 36x on [1, 5].', [
  { ask: 'Absolute maximum value.', ans: '55', hint: 'f′(x) = 6(x − 2)(x − 3). Compare f at the critical points and both endpoints.', why: 'f(1) = 23, f(2) = 28, f(3) = 27, f(5) = 250 − 375 + 180 = 55. The max is 55 at x = 5.' },
  { ask: 'Absolute minimum value.', ans: '23', hint: 'The same four values.', why: 'The smallest of 23, 28, 27, 55 is 23, at x = 1.' }
]),
multi('ps8-1b', 'ps8', 'Find the absolute maximum and minimum values of f(x) = 6x<sup>4/3</sup> − 3x<sup>1/3</sup> on [−1, 1].', [
  { ask: 'Absolute maximum value.', ans: '9', hint: 'f′(x) = 8x<sup>1/3</sup> − x<sup>−2/3</sup> = (8x − 1)/x<sup>2/3</sup>. Critical points: where it is 0 and where it does not exist.', why: 'Critical points x = 1/8 and x = 0. f(0) = 0, f(1/8) = 6/16 − 3/2 = −9/8, f(−1) = 6 + 3 = 9, f(1) = 3. The max is 9 at x = −1.' },
  { ask: 'Absolute minimum value.', ans: '-9/8', hint: 'The same four values.', why: 'The smallest is −9/8, at x = 1/8.' }
]),
multi('ps8-2', 'ps8', 'Carly has 3 tons of fish to sell to Marco and Noah. Selling x tons to Marco gives a profit of x³ − 4x dollars; the remaining y tons go to Noah for 8y dollars. How should she split the fish to maximize profit?', [
  { ask: 'How many tons should go to Marco?', ans: '0', hint: 'With y = 3 − x, maximize f(x) = x³ − 12x + 24 on [0, 3]. Check the endpoints too.', why: 'f′(x) = 3x² − 12 = 0 at x = 2 (−2 is outside [0, 3]). f(0) = 24, f(2) = 8, f(3) = 15. The max is at x = 0: all 3 tons go to Noah.' },
  { ask: 'What is the maximum profit, in dollars?', ans: '24', hint: 'Evaluate the profit at the best split.', why: 'f(0) = 24, from selling 3 tons to Noah at 8 dollars each.' }
]),
num('ps8-3', 'ps8', 'A rectangle has its lower vertices on the x-axis at (±a, 0) and its upper vertices on the parabola y = 4 − x². What is the largest possible area?', '32/(3sqrt(3))',
  'Area = (2a)(4 − a²) for 0 ≤ a ≤ 2.',
  'f(a) = 8a − 2a³, f′(a) = 8 − 6a² = 0 at a = 2/√3. f(0) = f(2) = 0 and f(2/√3) = 16/√3 − 16/(3√3) = 32/(3√3) = 32√3/9 ≈ 6.16.'),
multi('ps8-4', 'ps8', 'Two posts, 6 ft and 9 ft high, stand 20 ft apart. A stake goes in the ground between them, with wires from the top of each post to the stake. Where should the stake go to use the least wire?', [
  { ask: 'Distance from the base of the shorter post to the stake, in ft.', ans: '8', hint: 'Minimize w(x) = √(x² + 36) + √((20 − x)² + 81) on [0, 20].', why: 'w′(x) = x/√(x² + 36) − (20 − x)/√((20 − x)² + 81) = 0. Squaring gives 45x² + 1440x − 14400 = 0, i.e. 45(x − 8)(x + 40) = 0, so x = 8.' },
  { ask: 'Minimum total wire length, in ft.', ans: '25', hint: 'Evaluate w at the critical point and compare with the endpoints.', why: 'w(8) = √100 + √225 = 10 + 15 = 25, less than w(0) ≈ 27.9 and w(20) ≈ 29.9.' }
]),
multi('ps8-5', 'ps8', 'A swimmer is 1 km out in the ocean and wants to reach a town 3 km down the coast. She swims to shore at 3 km/h, then jogs along the beach at 5 km/h. Let x be the distance (km) down the shore from the point directly in front of her to where she lands, 0 ≤ x ≤ 3.', [
  { ask: 'Value of x that minimizes the total time.', ans: '3/4', hint: 'T(x) = √(x² + 1)/3 + (3 − x)/5. Solve T′(x) = 0.', why: 'T′(x) = x/(3√(x² + 1)) − 1/5 = 0 gives 5x = 3√(x² + 1), so 25x² = 9x² + 9 and x = 3/4.' },
  { ask: 'Minimum time, in hours.', ans: '13/15', hint: 'Evaluate T(3/4).', why: 'T(3/4) = (5/4)/3 + (9/4)/5 = 5/12 + 9/20 = 13/15 ≈ 0.867 h, less than T(0) ≈ 0.933 h.' },
  { ask: 'Value of x that maximizes the total time.', ans: '3', hint: 'Compare T at the endpoints.', why: 'T(3) = √10/3 ≈ 1.054 h is the largest value: swimming the whole way to town takes longest.' }
]),
num('ps8-6', 'ps8', 'A spherical snowball melts so that its radius decreases at 0.5 cm/hour. Find dV/dt (in cm³/hour) when the radius is 4 cm. (V = #frac{4}{3}πr³.)', '-32pi',
  'Differentiate V = (4/3)πr³ with respect to t, with dr/dt = −0.5.',
  'dV/dt = 4πr² dr/dt = 4π(16)(−0.5) = −32π ≈ −100.5 cm³/hour. The volume is decreasing at 32π cm³/hour.'),
num('ps8-7', 'ps8', 'A plane flying at a constant height of 3 km passes directly over a radar station at 500 km/h. How fast is the angle of elevation θ changing (in rad/h) when the horizontal distance is 4 km? Give dθ/dt with its sign.', '-60',
  'tan θ = 3/x. Differentiate with respect to t.',
  'sec²θ dθ/dt = −(3/x²) dx/dt, so dθ/dt = −(3/x²) cos²θ · dx/dt. At x = 4 the hypotenuse is 5, so cos θ = 4/5, and dθ/dt = −(3/16)(16/25)(500) = −60 rad/h.'),
num('ps8-8', 'ps8', 'A 17 m ladder leans against a wall. The bottom is pulled away from the wall at 5 m/s. Find dy/dt (m/s), the rate of change of the height of the top, when the top is 8 m above the ground.', '-75/8',
  'x² + y² = 17². Differentiate, then find x when y = 8.',
  '2x dx/dt + 2y dy/dt = 0, so dy/dt = −(x/y) dx/dt. With y = 8, x = √(289 − 64) = 15, so dy/dt = −(15/8)(5) = −75/8 m/s: the top slides down at 75/8 m/s.'),
num('ps8-9', 'ps8', 'A conical tank (tip down) is 12 m tall with top radius 6 m. Oil is pumped in at 3 m³/s. How fast (m/s) is the oil level rising when the oil is 2 m deep? (V = πr²h/3.)', '3/pi',
  'Use similar triangles to write r in terms of h before differentiating.',
  'r/h = 6/12, so r = h/2 and V = π(h/2)²h/3 = πh³/12. Then dV/dt = (πh²/4) dh/dt, so 3 = (π · 4/4) dh/dt and dh/dt = 3/π ≈ 0.955 m/s.'),
mc('ps8-10', 'ps8', 'What is wrong with this use of L\'Hôpital\'s rule? (The limit is actually −4.)<br>#lim{x → 1} #frac{x³ + x − 2}{x² − 3x + 2} = #lim{x → 1} #frac{3x² + 1}{2x − 3} = #lim{x → 1} #frac{6x}{2} = 3',
  ['The first step: the original quotient is 2/0 at x = 1, not an indeterminate form, so the rule cannot start',
   'The second step: (3x² + 1)/(2x − 3) is not 0/0 at x = 1',
   'The derivative of the numerator x³ + x − 2 is wrong; it should be 3x² + x',
   'Nothing is wrong: the limit is 3 and the stated value of −4 is a mistake'], 1,
  'The original limit is 0/0, so the first step is fine. But (3x² + 1)/(2x − 3) at x = 1 is 4/(−1), not indeterminate, so L\'Hôpital cannot be used again. Just substitute: 4/(−1) = −4.'),
num('ps8-11a', 'ps8', 'Evaluate #lim{x → 9} #frac{9 − x}{3 − √x}.', '6',
  'It is 0/0. Differentiate top and bottom.',
  'L\'H: #frac{−1}{−1/(2√x)} = 2√x → 2√9 = 6.', null, null),
num('ps8-11b', 'ps8', 'Evaluate #lim{x → ∞} #frac{x²}{3<sup>x</sup> + 1}.', '0',
  '∞/∞. You may need L\'Hôpital twice. (3<sup>x</sup>)′ = 3<sup>x</sup> ln 3.',
  'L\'H twice: #frac{2x}{3<sup>x</sup> ln 3} then #frac{2}{3<sup>x</sup>(ln 3)²} → 0.', null, null),
num('ps8-11c', 'ps8', 'Evaluate #lim{x → 0} #frac{e<sup>x</sup> − 1 − x − #frac{1}{2}x²}{x³}.', '1/6',
  'It is 0/0, and stays 0/0 for a few rounds.',
  'L\'H three times: #frac{e<sup>x</sup> − 1 − x}{3x²} (0/0) → #frac{e<sup>x</sup> − 1}{6x} (0/0) → #frac{e<sup>x</sup>}{6} → 1/6. (The posted solution labels the first step ∞/∞; it is 0/0.)', null, null),
num('ps8-11d', 'ps8', 'Evaluate #lim{x → 0⁺} √x ln(x).', '0',
  '0 · (−∞): rewrite as ln(x)/x<sup>−1/2</sup> first.',
  'ln x / x<sup>−1/2</sup> is −∞/∞. L\'H: #frac{1/x}{−(1/2)x<sup>−3/2</sup>} = −2x<sup>1/2</sup> → 0.', null, null),
num('ps8-11e', 'ps8', 'Evaluate #lim{x → 0⁺} (1 + #frac{1}{x})<sup>x</sup>.', '1',
  '∞<sup>0</sup>: let y be the expression and find the limit of ln y = x ln(1 + 1/x), written as a fraction.',
  'ln y = #frac{ln(1 + 1/x)}{1/x}, which is ∞/∞. L\'H: #frac{#frac{1}{1 + 1/x} · (−1/x²)}{−1/x²} = #frac{1}{1 + 1/x} = #frac{x}{x + 1} → 0. So y → e<sup>0</sup> = 1.', null, null),
num('ps8-11f', 'ps8', 'Evaluate #lim{x → ∞} x(e<sup>1/x</sup> − 1).', '1',
  '∞ · 0: rewrite as (e<sup>1/x</sup> − 1)/(1/x).',
  'That is 0/0. L\'H: #frac{e<sup>1/x</sup> · (−1/x²)}{−1/x²} = e<sup>1/x</sup> → e<sup>0</sup> = 1.', null, null),
num('ps8-11g', 'ps8', 'Evaluate #lim{x → π⁻} (1 + sin x)<sup>1/sin x</sup>.', 'e',
  '1<sup>∞</sup>: take ln first, ln y = ln(1 + sin x)/sin x.',
  'ln y = #frac{ln(1 + sin x)}{sin x} is 0/0 as x → π⁻. L\'H: #frac{cos x/(1 + sin x)}{cos x} = #frac{1}{1 + sin x} → 1. So y → e<sup>1</sup> = e.', null, null),
num('ps8-11h', 'ps8', 'Evaluate #lim{x → ∞} (x − ln x). (Hint: x = ln(e<sup>x</sup>).)', 'inf',
  '∞ − ∞: combine into one log, ln(e<sup>x</sup>/x).',
  'x − ln x = ln(e<sup>x</sup>) − ln x = ln(e<sup>x</sup>/x). By L\'H, e<sup>x</sup>/x → e<sup>x</sup>/1 → ∞, and ln is continuous and increasing, so the limit is ∞ (it does not exist as a finite number).', null, null)
]);
})();
