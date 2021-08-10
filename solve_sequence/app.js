const startBtn = document.getElementById('start-btn');
const form = document.getElementById('form');
const taskIndexEl = document.getElementById('task-index');
const taskSequenceEl = document.getElementById('task-sequence');
const taskInput = document.getElementById('task-input');
const submitBtn = document.getElementById('submit-btn');
const resultsEl = document.getElementById('results');
const resultsListEl = document.getElementById('results-list');

const tests = [
  [[0, 1, 2, 3, 5, 7, 9, 12, 15, 18], [22]],
  [[3, 6, 12, 21, 33], [48]],
  [[1000, 975, 925, 850, 750], [625]],
];

const showTask = (task, len, index) => {
  const parts = [...task.seq, ...new Array(task.answer.length).fill('?')];
  taskSequenceEl.textContent = parts.join(', ');
  taskIndexEl.textContent = `Task ${index + 1} / ${len}`;
};

const resetTask = () => {
  taskInput.value = '';
  checkAswerValidity();
};

const initTest = () => (form.hidden = false);
const finishTest = () => (form.hidden = true);

const userAnswer = () =>
  new Promise((resolve) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const answer = taskInput.value.replace(',', '.').split(/\s+/gi).map(Number);
      resolve(answer);
    });
  });

const runTest = async (tasks) => {
  initTest();
  const userResults = [];
  const taskModels = tasks.map(([seq, answer]) => ({ seq, answer }));

  for (let i = 0; i < taskModels.length; i++) {
    showTask(taskModels[i], taskModels.length, i);
    const answer = await userAnswer();
    const actual = taskModels[i].answer;
    userResults.push({ answer, actual });
    resetTask();
  }

  finishTest();
  return userResults;
};

startBtn.addEventListener('click', async () => {
  resultsEl.hidden = true;
  const results = await runTest(tests);
  showResults(results);
});

const showResults = (results) => {
  const arrayEquals = ([arr1, arr2]) => {
    return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
  };

  const rightAnswerCount = results
    .map(({ answer, actual }) => [answer, actual])
    .filter(arrayEquals).length;

  const displayAnswers = results
    .map(({ answer, actual }) => {
      return `<li>Your answer:${answer.join(',')} - Actual answer:${actual.join(',')}</li>`;
    })
    .join('');

  resultsEl.hidden = false;
  resultsListEl.innerHTML = `
    <h1>You got ${rightAnswerCount} right anwwers from ${results.length} tasks</h1>
    ${displayAnswers}
  `;
};

const checkAswerValidity = () => (submitBtn.disabled = !form.checkValidity());
taskInput.addEventListener('input', checkAswerValidity);
checkAswerValidity();
