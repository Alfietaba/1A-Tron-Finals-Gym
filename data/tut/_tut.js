/* ================= TUTORIAL AND PRACTICE-SET PROBLEMS =================
   Problems from the Fall 2026 tutorials and practice sets, added with the instructors' permission
   for this class. Each course's sets switch themselves off when that course's final ends
   (exam start + 3 hours). Delete data/tut/ after the last final.

   TUT(courseId, topics, questions) adds the topics just before the pre-exam warm-up
   and appends the questions. Question ids must be unique within the course. */
var TUT_GRACE = 3 * 3600 * 1000;
function tutOpen(c, now) { return (now || Date.now()) < Date.parse(c.exam.at) + TUT_GRACE; }
function TUT(courseId, topics, questions) {
  var c = COURSES.filter(function (x) { return x.id === courseId; })[0];
  if (!c || !tutOpen(c)) return;
  var at = c.topics.map(function (t) { return t.id; }).indexOf('tw');
  if (at < 0) at = c.topics.length;
  [].splice.apply(c.topics, [at, 0].concat(topics.map(function (t) { t.tut = true; return t; })));
  questions.forEach(function (q) { q.tut = true; c.Q.push(q); });
}
