/* ================= TUTORIAL AND PRACTICE-SET PROBLEMS =================
   Problems from the Fall 2026 tutorials and practice sets, added with the instructors' permission
   for this class. Each one sits in the unit topic it practises, with no label saying where it came
   from. Each course's problems switch themselves off when that course's final ends
   (exam start + 3 hours). Delete data/tut/ after the last final.

   TUT(courseId, topics, questions) appends the questions (each already names its unit topic).
   topics is normally null; a non-empty list adds extra topics just before the pre-exam warm-up,
   for problems that fit no existing unit. Question ids must be unique within the course. */
var TUT_GRACE = 3 * 3600 * 1000;
function tutOpen(c, now) { return (now || Date.now()) < Date.parse(c.exam.at) + TUT_GRACE; }
function TUT(courseId, topics, questions) {
  var c = COURSES.filter(function (x) { return x.id === courseId; })[0];
  if (!c || !tutOpen(c)) return;
  if (topics && topics.length) {
    var at = c.topics.map(function (t) { return t.id; }).indexOf('tw');
    if (at < 0) at = c.topics.length;
    [].splice.apply(c.topics, [at, 0].concat(topics.map(function (t) { t.tut = true; return t; })));
  }
  questions.forEach(function (q) { q.tut = true; c.Q.push(q); });
}

/* TUT_NEXT(courseId, n, topicIds): the course page highlights the topics that the next tutorial
   (number n) covers. Move it on after each tutorial; it switches off with the rest after the final. */
function TUT_NEXT(courseId, n, topics) {
  var c = COURSES.filter(function (x) { return x.id === courseId; })[0];
  if (!c || !tutOpen(c)) return;
  c.nextTut = { n: n, topics: topics };
}
