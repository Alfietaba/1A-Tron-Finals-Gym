/* ================= PAST EXAMS =================
   Links to the past and sample exams each course has posted on LEARN. The exams themselves stay on
   LEARN (they open after signing in with WatIAM); the gym only links to them, so nothing is copied here.
   PAST(courseId, ou, groups): ou is the course's LEARN org unit id; each group is
   { title, note?, items: [[label, LEARN topic id], ...] }. */
function PAST(courseId, ou, groups) {
  var c = COURSES.filter(function (x) { return x.id === courseId; })[0];
  if (!c) return;
  c.past = groups.map(function (g) {
    return { title: g.title, note: g.note, items: g.items.map(function (it) {
      return { label: it[0], url: 'https://learn.uwaterloo.ca/d2l/le/content/' + ou + '/viewContent/' + it[1] + '/View' };
    }) };
  });
}

PAST('math115', 1288843, [
  { title: 'Final exam', note: 'Write the sample finals under exam conditions first. Their solutions are posted on Thu Dec 3.', items: [
    ['Sample Final 1', 6789930], ['Sample Final 2', 6789933], ['Multiple choice practice', 6789939], ['Final formula sheet', 6789928]] },
  { title: 'Midterm', items: [
    ['Fall 2026 midterm solutions', 6760827], ['Sample Midterm 1', 6736774], ['Sample Midterm 1 solutions', 6736775],
    ['Sample Midterm 2', 6736776], ['Sample Midterm 2 solutions', 6736781]] }
]);

PAST('math116', 1288801, [
  { title: 'Final exam', note: 'Try one in 2 h 30 min without the solutions, then mark it. Solutions are posted on Mon Dec 7.', items: [
    ['Practice Final 1', 6611784], ['Practice Final 2', 6611786], ['Practice Final 3', 6778119],
    ['Extra multiple choice practice', 6611783], ['Final exam information', 6611649], ['Final formula sheet', 6611648]] },
  { title: 'Midterm', items: [
    ['Fall 2026 midterm', 6753591], ['Fall 2026 midterm solutions', 6753592],
    ['Practice Midterm 1', 6611761], ['Practice Midterm 1 solutions', 6611762],
    ['Practice Midterm 2', 6611763], ['Practice Midterm 2 solutions', 6611764],
    ['Practice Midterm 3', 6611765], ['Practice Midterm 3 solutions', 6611766],
    ['Extra multiple choice practice', 6611733]] }
]);

PAST('che102', 1293016, [
  { title: 'Old midterms', note: 'No final exams are posted yet. These cover Units 1 and 2.', items: [
    ['Fall 2025 midterm', 6733023], ['Fall 2024 midterm', 6733022], ['Fall 2023 midterm', 6733021], ['Fall 2022 midterm', 6733020]] },
  { title: 'Section 008 (Li): extra past midterms', items: [
    ['Fall 2019 midterm with solutions', 6740026], ['2018 midterm solutions', 6740027],
    ['Fall 2017 midterm with solutions', 6740028], ['Fall 2016 midterm with solutions', 6740030], ['Midterm review (Li)', 6744130]] }
]);

PAST('mte100', 1293925, [
  { title: 'Term Test #2', note: 'The final test is Thu Dec 3 at 10 AM.', items: [
    ['Fall 2025 Term Test 2 (EGAD)', 6788641], ['EGAD quiz questions, weeks 6 to 9', 6788636], ['EGAD quiz questions, weeks 6 to 9: solutions', 6788637]] },
  { title: 'Term Test #1', items: [
    ['Fall 2025 Quiz 1', 6740257], ['EGAD quiz questions, weeks 2 to 4', 6744465], ['EGAD quiz questions, weeks 2 to 4: solutions', 6744464],
    ['Fall 2026 midterm solutions', 6756188]] }
]);

PAST('mte121', 1303186, [
  { title: 'Old finals', note: 'You may bring your own 8.5 × 11 double-sided reference sheet; the VEX reference is provided.', items: [
    ['2024 final', 6768820], ['2019 final', 6764277], ['Fall 2018 final', 6764280], ['Fall 2017 final', 6764281], ['VEX functions (final reference)', 6782687]] },
  { title: 'Old midterm', items: [
    ['Fall 2024 midterm', 6719179], ['Solution: question 2', 6748508], ['Solution: question 3', 6748509], ['Solution: question 4', 6748510]] }
]);
