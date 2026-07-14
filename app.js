'use strict';

const TASK_CATEGORIES = [
  {
    id: 'cleaning',
    name: '清潔類',
    symbol: '🫧',
    description: '把髒污、灰塵與需要丟棄的東西處理掉',
    tasks: [
      {
        id: 'sweep', name: '打掃', icon: '🧹', short: '清除地板灰塵與碎屑',
        prompt: '把看得見的灰塵、頭髮與碎屑清乾淨',
        ratings: [
          ['超級乾淨', '能夠感覺地板發光，甚至還香香的'],
          ['乾淨', '沒有任何直徑大於一公分的雜物'],
          ['普通', '有一點頭髮或碎屑，但仍可接受'],
          ['差', '看起來仍然很髒，需要重新做']
        ]
      },
      {
        id: 'laundry', name: '洗衣服', icon: '🧺', short: '分類、清洗並確認衣物',
        prompt: '把待洗衣物分類，確認口袋後開始清洗',
        ratings: [
          ['非常完整', '衣物分類正確、沒有漏洗，也沒有洗壞'],
          ['完整', '該洗的衣物都已清洗，流程沒有明顯問題'],
          ['普通', '完成清洗，但分類或細節有些遺漏'],
          ['差', '仍有大量待洗衣物，或需要重新處理']
        ]
      },
      {
        id: 'trash', name: '倒垃圾', icon: '🗑️', short: '清空垃圾並換上新袋',
        prompt: '收好垃圾、分類回收，並替垃圾桶換新袋',
        ratings: [
          ['俐落清空', '垃圾與回收都處理完，垃圾桶也乾淨無味'],
          ['已清空', '垃圾都帶走，並已換上新的垃圾袋'],
          ['普通', '主要垃圾已處理，但還有零星遺漏'],
          ['差', '垃圾仍堆積，或垃圾桶沒有恢復可用狀態']
        ]
      },
      {
        id: 'cat-litter', name: '倒貓砂', icon: '🐈', short: '清除結塊並整理砂盆',
        prompt: '鏟除結塊、補足貓砂，讓砂盆保持舒適',
        ratings: [
          ['貓咪五星', '結塊完全清除、砂量適中，周圍也很乾淨'],
          ['乾淨', '砂盆已清理並補足，沒有明顯異味'],
          ['普通', '主要結塊已清除，但邊角仍可再整理'],
          ['差', '仍有明顯髒污或異味，需要重新清理']
        ]
      }
    ]
  },
  {
    id: 'organizing',
    name: '整理類',
    symbol: '🧩',
    description: '讓物品回到好拿、好用、好找到的位置',
    tasks: [
      {
        id: 'hang-clothes', name: '曬衣服', icon: '👕', short: '拉平、分類並保持間距',
        prompt: '把衣物拉平、分類晾好，保留足夠通風間距',
        ratings: [
          ['晾得漂亮', '衣物平整、間距均勻，乾後幾乎不用重整'],
          ['整齊', '衣物都已晾好，沒有擠成一團'],
          ['普通', '完成晾曬，但部分衣物皺摺或間距太近'],
          ['差', '衣物容易掉落、發臭，或需要重新晾曬']
        ]
      },
      {
        id: 'table', name: '整理餐桌', icon: '🍽️', short: '清空桌面並擦拭',
        prompt: '收走不屬於餐桌的物品，擦乾淨桌面',
        ratings: [
          ['像新的一樣', '桌面乾淨、清爽，能立刻舒服地用餐'],
          ['整齊', '桌面已清空並擦拭，沒有明顯髒污'],
          ['普通', '可正常使用，但仍有少量物品或水痕'],
          ['差', '桌面仍凌亂或黏膩，需要重新整理']
        ]
      },
      {
        id: 'backpack', name: '整理背包', icon: '🎒', short: '清掉雜物並補齊必需品',
        prompt: '清掉過期雜物，讓常用物品放在順手的位置',
        ratings: [
          ['完全就緒', '內容精簡、分類清楚，明天拿了就能出門'],
          ['整齊', '不需要的物品已清掉，必需品都在'],
          ['普通', '大致整理完成，但仍有一些雜物'],
          ['差', '東西仍找不到，或重要物品沒有補齊']
        ]
      },
      {
        id: 'fill-water', name: '盛水', icon: '🚰', short: '補足日常飲用水',
        prompt: '把飲用水補足，容器放回容易取用的位置',
        ratings: [
          ['準備充足', '水量足夠、容器乾淨，位置也非常順手'],
          ['已補足', '飲用水已準備好，隨時可以取用'],
          ['普通', '有補水，但水量或擺放位置不夠理想'],
          ['差', '水仍不足、容器不乾淨，或沒有放回定位']
        ]
      }
    ]
  },
  {
    id: 'service',
    name: '僕人類',
    symbol: '🛎️',
    description: '預先替家人或同住者準備舒服的生活條件',
    tasks: [
      {
        id: 'clean-water', name: '放置乾淨的水', icon: '💧', short: '在指定區域備好飲水',
        prompt: '在指定區域放好乾淨飲水，確認容器與位置安全',
        ratings: [
          ['貼心到位', '水質、溫度、容器與位置都照顧得非常好'],
          ['準備完成', '乾淨的水已放在指定位置'],
          ['普通', '已放水，但份量、容器或位置可以更好'],
          ['差', '水不乾淨、不足，或沒有放在指定位置']
        ]
      },
      {
        id: 'dinner', name: '準備好晚餐', icon: '🍲', short: '讓晚餐能準時享用',
        prompt: '準備好晚餐，確認餐具、份量與食用時間',
        ratings: [
          ['像被招待', '餐點、餐具與時間都恰到好處，吃起來很幸福'],
          ['準備完成', '晚餐已能直接享用，份量與餐具都齊全'],
          ['普通', '有晚餐可吃，但細節或時間不夠理想'],
          ['差', '餐點仍未完成，或需要重新準備']
        ]
      },
      {
        id: 'bin-position', name: '準備垃圾桶位置', icon: '📍', short: '讓垃圾桶出現在需要處',
        prompt: '把乾淨垃圾桶放到指定位置，確認垃圾袋已套好',
        ratings: [
          ['位置完美', '垃圾桶乾淨、好用，放在一伸手就剛好的地方'],
          ['準備完成', '垃圾桶與垃圾袋都已在指定位置'],
          ['普通', '已放置，但位置或清潔度可以更理想'],
          ['差', '垃圾桶不可用，或沒有放在需要的位置']
        ]
      },
      {
        id: 'cold-drink', name: '準備冰涼飲品', icon: '🧊', short: '備好適合飲用的冷飲',
        prompt: '準備一杯冰涼飲品，放在方便拿取又不易打翻的位置',
        ratings: [
          ['完美解渴', '溫度、口味、杯子與擺放位置都很剛好'],
          ['準備完成', '冰涼飲品已可直接飲用'],
          ['普通', '飲品有準備，但溫度或細節不夠理想'],
          ['差', '飲品不適合飲用，或根本沒有準備完成']
        ]
      }
    ]
  }
];

const RATING_META = [
  { label: '卓越', points: 4 },
  { label: '良好', points: 3 },
  { label: '普通', points: 2 },
  { label: '待加強', points: 1 }
];

const elements = {
  screens: [...document.querySelectorAll('.screen')],
  taskCategories: document.querySelector('#taskCategories'),
  durationSelect: document.querySelector('#durationSelect'),
  selectedCount: document.querySelector('#selectedCount'),
  selectedDuration: document.querySelector('#selectedDuration'),
  startButton: document.querySelector('#startButton'),
  selectAllButton: document.querySelector('#selectAllButton'),
  clearAllButton: document.querySelector('#clearAllButton'),
  taskPosition: document.querySelector('#taskPosition'),
  miniProgressFill: document.querySelector('#miniProgressFill'),
  timerStage: document.querySelector('#timerStage'),
  timerRingProgress: document.querySelector('#timerRingProgress'),
  currentTaskIcon: document.querySelector('#currentTaskIcon'),
  currentCategory: document.querySelector('#currentCategory'),
  currentTaskName: document.querySelector('#currentTaskName'),
  currentTaskPrompt: document.querySelector('#currentTaskPrompt'),
  timeRemaining: document.querySelector('#timeRemaining'),
  doubleTapHint: document.querySelector('#doubleTapHint'),
  pauseButton: document.querySelector('#pauseButton'),
  backButton: document.querySelector('#backButton'),
  restartTaskButton: document.querySelector('#restartTaskButton'),
  finishTaskButton: document.querySelector('#finishTaskButton'),
  reviewList: document.querySelector('#reviewList'),
  reviewForm: document.querySelector('#reviewForm'),
  summaryMessage: document.querySelector('#summaryMessage'),
  summaryMedal: document.querySelector('#summaryMedal'),
  scoreGrid: document.querySelector('#scoreGrid'),
  newRoundButton: document.querySelector('#newRoundButton'),
  reviewAgainButton: document.querySelector('#reviewAgainButton'),
  historyButton: document.querySelector('#historyButton'),
  historyDialog: document.querySelector('#historyDialog'),
  historyList: document.querySelector('#historyList'),
  closeHistoryButton: document.querySelector('#closeHistoryButton'),
  clearHistoryButton: document.querySelector('#clearHistoryButton'),
  toast: document.querySelector('#toast')
};

const state = {
  selectedTaskIds: new Set(),
  queue: [],
  completed: [],
  currentIndex: 0,
  durationSeconds: Number(elements.durationSelect.value),
  remainingSeconds: Number(elements.durationSelect.value),
  deadline: 0,
  timerId: null,
  isPaused: false,
  startedAt: null,
  ratings: {},
  lastTapAt: 0,
  lastTapPoint: null,
  toastTimer: null
};

const allTasks = TASK_CATEGORIES.flatMap(category =>
  category.tasks.map(task => ({ ...task, categoryId: category.id, categoryName: category.name }))
);

function renderTaskSelection() {
  elements.taskCategories.innerHTML = TASK_CATEGORIES.map(category => `
    <section class="category-card" aria-labelledby="category-${category.id}">
      <div class="category-heading">
        <span class="category-symbol" aria-hidden="true">${category.symbol}</span>
        <div>
          <h3 id="category-${category.id}">${category.name}</h3>
          <p>${category.description}</p>
        </div>
      </div>
      <div class="task-grid">
        ${category.tasks.map(task => `
          <div class="task-option">
            <input type="checkbox" id="task-${task.id}" value="${task.id}">
            <label for="task-${task.id}">
              <span class="task-icon" aria-hidden="true">${task.icon}</span>
              <span class="task-copy"><strong>${task.name}</strong><small>${task.short}</small></span>
              <span class="check-mark" aria-hidden="true">✓</span>
            </label>
          </div>
        `).join('')}
      </div>
    </section>
  `).join('');

  elements.taskCategories.querySelectorAll('input[type="checkbox"]').forEach(input => {
    input.addEventListener('change', () => {
      input.checked ? state.selectedTaskIds.add(input.value) : state.selectedTaskIds.delete(input.value);
      updateSelectionSummary();
    });
  });
}

function updateSelectionSummary() {
  const count = state.selectedTaskIds.size;
  const totalMinutes = Math.ceil(count * Number(elements.durationSelect.value) / 60);
  elements.selectedCount.textContent = String(count);
  elements.selectedDuration.textContent = `約 ${totalMinutes} 分鐘`;
  elements.startButton.disabled = count === 0;
}

function setAllTasks(checked) {
  state.selectedTaskIds.clear();
  elements.taskCategories.querySelectorAll('input[type="checkbox"]').forEach(input => {
    input.checked = checked;
    if (checked) state.selectedTaskIds.add(input.value);
  });
  updateSelectionSummary();
}

function showScreen(screenId) {
  elements.screens.forEach(screen => screen.classList.toggle('is-active', screen.id === screenId));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function startRound() {
  if (!state.selectedTaskIds.size) return;
  state.durationSeconds = Number(elements.durationSelect.value);
  state.queue = allTasks.filter(task => state.selectedTaskIds.has(task.id));
  state.completed = [];
  state.currentIndex = 0;
  state.startedAt = new Date().toISOString();
  state.ratings = {};
  showScreen('timerScreen');
  loadCurrentTask();
}

function loadCurrentTask() {
  stopTimer();
  const task = state.queue[state.currentIndex];
  if (!task) {
    openReview();
    return;
  }

  state.remainingSeconds = state.durationSeconds;
  state.isPaused = false;
  elements.pauseButton.textContent = 'Ⅱ';
  elements.pauseButton.setAttribute('aria-label', '暫停計時');
  elements.timerStage.classList.remove('is-paused');
  elements.currentTaskIcon.textContent = task.icon;
  elements.currentCategory.textContent = task.categoryName;
  elements.currentTaskName.textContent = task.name;
  elements.currentTaskPrompt.textContent = task.prompt;
  elements.taskPosition.textContent = `第 ${state.currentIndex + 1} 項，共 ${state.queue.length} 項`;
  elements.miniProgressFill.style.width = `${(state.currentIndex / state.queue.length) * 100}%`;
  updateTimerDisplay();
  beginTimer();
}

function beginTimer() {
  stopTimer();
  state.deadline = performance.now() + state.remainingSeconds * 1000;
  state.timerId = window.setInterval(tick, 200);
  tick();
}

function tick() {
  if (state.isPaused) return;
  const millisecondsLeft = Math.max(0, state.deadline - performance.now());
  state.remainingSeconds = millisecondsLeft / 1000;
  updateTimerDisplay();
  if (millisecondsLeft <= 0) finishCurrentTask('timer');
}

function stopTimer() {
  if (state.timerId) window.clearInterval(state.timerId);
  state.timerId = null;
}

function updateTimerDisplay() {
  const seconds = Math.ceil(state.remainingSeconds);
  const minutesPart = Math.floor(seconds / 60);
  const secondsPart = seconds % 60;
  elements.timeRemaining.textContent = `${String(minutesPart).padStart(2, '0')}:${String(secondsPart).padStart(2, '0')}`;
  elements.timeRemaining.setAttribute('datetime', `PT${seconds}S`);

  const circumference = 2 * Math.PI * 124;
  const progress = state.durationSeconds ? Math.max(0, Math.min(1, state.remainingSeconds / state.durationSeconds)) : 0;
  elements.timerRingProgress.style.strokeDasharray = String(circumference);
  elements.timerRingProgress.style.strokeDashoffset = String(circumference * (1 - progress));
  document.title = `${elements.timeRemaining.textContent}｜${elements.currentTaskName.textContent}｜家事模擬器`;
}

function togglePause() {
  if (state.isPaused) {
    state.isPaused = false;
    elements.pauseButton.textContent = 'Ⅱ';
    elements.pauseButton.setAttribute('aria-label', '暫停計時');
    elements.timerStage.classList.remove('is-paused');
    beginTimer();
    showToast('繼續計時');
  } else {
    state.remainingSeconds = Math.max(0, (state.deadline - performance.now()) / 1000);
    state.isPaused = true;
    stopTimer();
    elements.pauseButton.textContent = '▶';
    elements.pauseButton.setAttribute('aria-label', '繼續計時');
    elements.timerStage.classList.add('is-paused');
    showToast('已暫停');
  }
}

function restartCurrentTask() {
  state.remainingSeconds = state.durationSeconds;
  state.isPaused = false;
  elements.pauseButton.textContent = 'Ⅱ';
  elements.timerStage.classList.remove('is-paused');
  updateTimerDisplay();
  beginTimer();
  showToast('重新開始這項家事');
}

function finishCurrentTask(reason = 'manual') {
  if (!state.queue[state.currentIndex]) return;
  stopTimer();
  const task = state.queue[state.currentIndex];
  state.completed.push({
    taskId: task.id,
    completedAt: new Date().toISOString(),
    finishType: reason,
    usedSeconds: Math.max(0, Math.round(state.durationSeconds - state.remainingSeconds))
  });
  vibrate([35, 45, 35]);
  state.currentIndex += 1;

  if (state.currentIndex >= state.queue.length) {
    elements.miniProgressFill.style.width = '100%';
    openReview();
  } else {
    showToast(`${task.name}完成，下一項！`);
    loadCurrentTask();
  }
}

function openReview() {
  stopTimer();
  document.title = '家事檢核表｜家事模擬器';
  renderReviewForm();
  showScreen('reviewScreen');
}

function renderReviewForm() {
  elements.reviewList.innerHTML = state.queue.map((task, taskIndex) => `
    <article class="review-card">
      <div class="review-task-heading">
        <span aria-hidden="true">${task.icon}</span>
        <div>
          <h3>${task.name}</h3>
          <p>${task.categoryName} · 第 ${taskIndex + 1} 項</p>
        </div>
      </div>
      <div class="rating-options">
        ${task.ratings.map((rating, ratingIndex) => {
          const checked = state.ratings[task.id] === 4 - ratingIndex ? 'checked' : '';
          return `
            <div class="rating-option">
              <input ${checked} required type="radio" id="rating-${task.id}-${ratingIndex}" name="rating-${task.id}" value="${4 - ratingIndex}">
              <label for="rating-${task.id}-${ratingIndex}">
                <span class="rating-dot" aria-hidden="true"></span>
                <span class="rating-copy"><strong>${rating[0]}</strong><small>${rating[1]}</small></span>
              </label>
            </div>
          `;
        }).join('')}
      </div>
    </article>
  `).join('');
}

function submitReview(event) {
  event.preventDefault();
  const formData = new FormData(elements.reviewForm);
  state.queue.forEach(task => {
    state.ratings[task.id] = Number(formData.get(`rating-${task.id}`));
  });
  const result = buildResult();
  saveHistory(result);
  renderSummary(result);
  showScreen('summaryScreen');
  document.title = '回合完成｜家事模擬器';
  vibrate([60, 50, 80]);
}

function buildResult() {
  const counts = { 4: 0, 3: 0, 2: 0, 1: 0 };
  Object.values(state.ratings).forEach(value => { counts[value] += 1; });
  const score = Object.values(state.ratings).reduce((sum, value) => sum + value, 0);
  const maxScore = state.queue.length * 4;
  return {
    id: `round-${Date.now()}`,
    startedAt: state.startedAt,
    finishedAt: new Date().toISOString(),
    tasks: state.queue.map(task => ({ id: task.id, name: task.name, icon: task.icon, rating: state.ratings[task.id] })),
    counts,
    score,
    maxScore,
    percentage: Math.round(score / maxScore * 100)
  };
}

function renderSummary(result) {
  const messages = result.percentage >= 90
    ? ['像整個家都被照亮了。今天的完成度非常出色。', '✦']
    : result.percentage >= 75
      ? ['大部分家事都做得很扎實，空間已經舒服很多。', '✓']
      : result.percentage >= 55
        ? ['重要的事情已經完成了，剩下的可以留給下一個回合。', '◌']
        : ['你至少開始並完成了流程。挑一項待加強的，下次再把它做好。', '↗'];

  elements.summaryMessage.textContent = messages[0];
  elements.summaryMedal.textContent = messages[1];
  elements.scoreGrid.innerHTML = [4, 3, 2, 1].map(score => `
    <div class="score-item">
      <strong>${result.counts[score]}</strong>
      <span>${RATING_META[4 - score].label}</span>
    </div>
  `).join('');
}

function saveHistory(result) {
  const history = getHistory();
  history.unshift(result);
  localStorage.setItem('housework-history-v1', JSON.stringify(history.slice(0, 20)));
}

function getHistory() {
  try {
    const parsed = JSON.parse(localStorage.getItem('housework-history-v1') || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function renderHistory() {
  const history = getHistory();
  if (!history.length) {
    elements.historyList.innerHTML = '<div class="empty-state">還沒有完成紀錄。<br>做完第一個回合後，成果會出現在這裡。</div>';
    elements.clearHistoryButton.hidden = true;
    return;
  }
  elements.clearHistoryButton.hidden = false;
  elements.historyList.innerHTML = history.map(entry => {
    const date = new Intl.DateTimeFormat('zh-TW', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(entry.finishedAt));
    const taskNames = entry.tasks.map(task => `${task.icon}${task.name}`).join('、');
    return `
      <article class="history-entry">
        <div class="history-entry-top">
          <strong>${entry.tasks.length} 項家事 · ${entry.percentage} 分</strong>
          <time datetime="${entry.finishedAt}">${date}</time>
        </div>
        <p>${taskNames}</p>
      </article>
    `;
  }).join('');
}

function openHistory() {
  renderHistory();
  if (typeof elements.historyDialog.showModal === 'function') elements.historyDialog.showModal();
}

function clearHistory() {
  localStorage.removeItem('housework-history-v1');
  renderHistory();
  showToast('紀錄已清除');
}

function resetRound() {
  stopTimer();
  state.queue = [];
  state.completed = [];
  state.currentIndex = 0;
  state.ratings = {};
  state.startedAt = null;
  document.title = '家事模擬器';
  showScreen('setupScreen');
}

function handleTimerTap(event) {
  if (event.target.closest('button')) return;
  const now = Date.now();
  const point = { x: event.clientX ?? 0, y: event.clientY ?? 0 };
  const nearPrevious = state.lastTapPoint
    ? Math.hypot(point.x - state.lastTapPoint.x, point.y - state.lastTapPoint.y) < 60
    : true;

  elements.timerStage.classList.remove('is-tapped');
  void elements.timerStage.offsetWidth;
  elements.timerStage.classList.add('is-tapped');

  if (now - state.lastTapAt < 380 && nearPrevious) {
    state.lastTapAt = 0;
    state.lastTapPoint = null;
    finishCurrentTask('double-tap');
  } else {
    state.lastTapAt = now;
    state.lastTapPoint = point;
    elements.doubleTapHint.textContent = '再按一下即可完成';
    window.setTimeout(() => { elements.doubleTapHint.textContent = '輕按兩下，提早完成'; }, 700);
  }
}

function showToast(message) {
  window.clearTimeout(state.toastTimer);
  elements.toast.textContent = message;
  elements.toast.classList.add('is-visible');
  state.toastTimer = window.setTimeout(() => elements.toast.classList.remove('is-visible'), 1800);
}

function vibrate(pattern) {
  if ('vibrate' in navigator) navigator.vibrate(pattern);
}

function bindEvents() {
  elements.durationSelect.addEventListener('change', updateSelectionSummary);
  elements.selectAllButton.addEventListener('click', () => setAllTasks(true));
  elements.clearAllButton.addEventListener('click', () => setAllTasks(false));
  elements.startButton.addEventListener('click', startRound);
  elements.pauseButton.addEventListener('click', togglePause);
  elements.restartTaskButton.addEventListener('click', restartCurrentTask);
  elements.finishTaskButton.addEventListener('click', () => finishCurrentTask('button'));
  elements.backButton.addEventListener('click', () => {
    if (window.confirm('返回後，本次計時進度會清除。確定返回嗎？')) resetRound();
  });
  elements.timerStage.addEventListener('pointerup', handleTimerTap);
  elements.timerStage.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      finishCurrentTask('keyboard');
    }
  });
  elements.reviewForm.addEventListener('submit', submitReview);
  elements.newRoundButton.addEventListener('click', resetRound);
  elements.reviewAgainButton.addEventListener('click', () => {
    renderReviewForm();
    showScreen('reviewScreen');
  });
  elements.historyButton.addEventListener('click', openHistory);
  elements.closeHistoryButton.addEventListener('click', () => elements.historyDialog.close());
  elements.clearHistoryButton.addEventListener('click', clearHistory);
  elements.historyDialog.addEventListener('click', event => {
    if (event.target === elements.historyDialog) elements.historyDialog.close();
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden || state.isPaused || !state.timerId) return;
    tick();
  });
}

function registerServiceWorker() {
  if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
    window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
  }
}

renderTaskSelection();
bindEvents();
updateSelectionSummary();
registerServiceWorker();
