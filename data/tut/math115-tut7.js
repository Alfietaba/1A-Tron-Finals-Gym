/* ================= MATH 115 TUTORIAL 7 (Fall 2026): linear transformations, 5.1 to 5.5 ================= */
TUT('math115', null, [

num('tu7-1a', 't15', 'T : ℝ³ → ℝ⁴ is defined by T(x<sub>1</sub>, x<sub>2</sub>, x<sub>3</sub>) = (x<sub>1</sub> + x<sub>2</sub>, −x<sub>3</sub>, 0, x<sub>1</sub> − 2x<sub>2</sub>). It is linear. Find its standard matrix.', '1,1,0;0,0,-1;0,0,0;1,-2,0',
  'The columns are T(~e~<sub>1</sub>), T(~e~<sub>2</sub>) and T(~e~<sub>3</sub>).',
  'T(~e~<sub>1</sub>) = {{1,0,0,1}}, T(~e~<sub>2</sub>) = {{1,0,0,-2}} and T(~e~<sub>3</sub>) = {{0,-1,0,0}}. Put them side by side: [[1,1,0;0,0,-1;0,0,0;1,-2,0]]. To prove linearity you would show T(c<sub>1</sub>~x~ + c<sub>2</sub>~y~) = c<sub>1</sub>T(~x~) + c<sub>2</sub>T(~y~): every entry is a linear combination of the x<sub>i</sub>, so it splits.'),

mc('tu7-1b', 't15', 'T : ℝ² → ℝ is defined by T(x<sub>1</sub>, x<sub>2</sub>) = x<sub>1</sub>² + x<sub>2</sub>². Which statement shows T is <b>not</b> linear?',
  ['T(1, 1) + T(1, 2) = 7, but T(2, 3) = 13', 'T(0, 0) = 0, so T fails the zero test', 'T(1, 0) = T(0, 1), so T is not one-to-one', 'T outputs a single number, not a vector'], 0,
  'One concrete counterexample is enough. (1, 1) + (1, 2) = (2, 3), and T(2, 3) = 4 + 9 = 13, while T(1, 1) + T(1, 2) = 2 + 5 = 7 ≠ 13, so T does not preserve addition. Scalars fail too: T(2(1, 1)) = 8 but 2T(1, 1) = 4. T(~0~) = 0 is consistent with linearity, so it proves nothing, and a map into ℝ can still be linear.'),

num('tu7-2a', 't15', 'Let ~d~ = {{-2,3}}. The reflection T(~x~) = 2 proj<sub>~d~</sub> ~x~ − ~x~ is linear. Find its standard matrix. Fractions are fine.', '-5/13,-12/13;-12/13,5/13',
  'Compute T(~e~<sub>1</sub>) = 2 proj<sub>~d~</sub> ~e~<sub>1</sub> − ~e~<sub>1</sub>, and the same for ~e~<sub>2</sub>. ‖~d~‖² = 13.',
  'proj<sub>~d~</sub> ~e~<sub>1</sub> = (−2/13)~d~ = {{4/13,-6/13}}, so T(~e~<sub>1</sub>) = {{8/13,-12/13}} − {{1,0}} = {{-5/13,-12/13}}. proj<sub>~d~</sub> ~e~<sub>2</sub> = (3/13)~d~ = {{-6/13,9/13}}, so T(~e~<sub>2</sub>) = {{-12/13,18/13}} − {{0,1}} = {{-12/13,5/13}}. Standard matrix [[-5/13,-12/13;-12/13,5/13]].'),

num('tu7-2b', 't15', 'The matrix A = [[3/5,4/5;4/5,-3/5]] represents a reflection in ℝ². The line it reflects across is ~x~ = t~d~. Find ~d~ with second entry 1.', '(2,1)',
  'A vector on the mirror line does not move: solve A~x~ = ~x~, that is (A − I)~x~ = ~0~.',
  'A − I = [[-2/5,4/5;4/5,-8/5]]. Row reduce: R₂ + 2R₁ zeroes row 2, and −(5/2)R₁ gives (1, −2). So x<sub>1</sub> = 2t and x<sub>2</sub> = t: the line is ~x~ = t{{2,1}}. Check: A{{2,1}} = {{10/5,5/5}} = {{2,1}}.'),

multi('tu7-3', 't15', 'In ℝ², T is a counterclockwise rotation by 2π/3, S is the projection onto the x<sub>1</sub>-axis and R is the reflection through the x<sub>2</sub>-axis.', [
  { ask: 'Find the standard matrix of S.', ans: '1,0;0,0', hint: 'Where do ~e~<sub>1</sub> and ~e~<sub>2</sub> land when you drop them onto the x<sub>1</sub>-axis?', why: '~e~<sub>1</sub> stays put and ~e~<sub>2</sub> goes to ~0~: [[1,0;0,0]].' },
  { ask: 'Find the standard matrix of R.', ans: '-1,0;0,1', hint: 'Reflecting through the x<sub>2</sub>-axis flips the sign of x<sub>1</sub>.', why: '~e~<sub>1</sub> ↦ −~e~<sub>1</sub> and ~e~<sub>2</sub> ↦ ~e~<sub>2</sub>: [[-1,0;0,1]].' },
  { ask: 'Compute (S ∘ R ∘ T)(1, 0).', ans: '(1/2,0)', hint: 'Apply T first, then R, then S. [T] = [[cos(2π/3), −sin(2π/3); sin(2π/3), cos(2π/3)]].',
    why: 'T(1, 0) = (cos 2π/3, sin 2π/3) = (−1/2, √3/2). R flips the first entry: (1/2, √3/2). S keeps only the first entry: (1/2, 0). Equivalently [S][R][T]~e~<sub>1</sub>.' }
]),

multi('tu7-4', 't16', 'T : ℝ³ → ℝ⁴ is T(x<sub>1</sub>, x<sub>2</sub>, x<sub>3</sub>) = (x<sub>1</sub> + 2x<sub>2</sub> + x<sub>3</sub>, 2x<sub>1</sub> + 5x<sub>2</sub> + 2x<sub>3</sub>, 3x<sub>1</sub> + 2x<sub>2</sub> + 3x<sub>3</sub>, x<sub>1</sub> + x<sub>2</sub> + x<sub>3</sub>).', [
  { ask: 'Ker(T) is spanned by one vector. Give it with third entry 1.', ans: '(-1,0,1)', hint: 'Row reduce the standard matrix [[1,2,1;2,5,2;3,2,3;1,1,1]] and solve [T]~x~ = ~0~.',
    why: 'R₂ − 2R₁, R₃ − 3R₁, R₄ − R₁ give rows (0,1,0), (0,−4,0), (0,−1,0); clearing column 2 leaves RREF [[1,0,1;0,1,0;0,0,0;0,0,0]]. So x<sub>2</sub> = 0 and x<sub>1</sub> = −x<sub>3</sub>: Ker(T) = Span{ {{-1,0,1}} }.' },
  { ask: 'What is dim Range(T)?', ans: '2', hint: 'The leading entries of the RREF tell you which columns of [T] to keep.',
    why: 'Leading entries sit in columns 1 and 2, so { {{1,2,3,1}}, {{2,5,2,1}} } is a basis for Range(T): dimension 2. Rank–nullity checks out: 2 + 1 = 3 = dim ℝ³.' }
])

]);
