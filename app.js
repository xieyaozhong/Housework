'use strict';

const TASK_CATEGORIES = [
  {
    id: 'cleaning', name: '清潔類', symbol: '🫧', description: '清掉髒污、灰塵與需要丟棄的東西',
    tasks: [
      { id: 'sweep', name: '打掃', icon: '🧹', short: '清除地板灰塵與碎屑', prompt: '把看得見的灰塵、頭髮與碎屑清乾淨', ratings: [['超級乾淨', '能感覺地板發光，甚至還香香的'], ['乾淨', '沒有任何直徑大於一公分的雜物'], ['普通', '有一點頭髮或碎屑，但仍可接受'], ['差', '看起來仍然很髒，需要重新做']] },
      { id: 'laundry', name: '洗衣服', icon: '🧺', short: '分類、清洗並確認衣物', prompt: '把待洗衣物分類，確認口袋後開始清洗', ratings: [['非常完整', '衣物分類正確、沒有漏洗，也沒有洗壞'], ['完整', '該洗的衣物都已清洗，流程沒有明顯問題'], ['普通', '完成清洗，但分類或細節有些遺漏'], ['差', '仍有大量待洗衣物，或需要重新處理']] },
      { id: 'trash', name: '倒垃圾', icon: '🗑️', short: '清空垃圾並換上新袋', prompt: '收好垃圾、分類回收，並替垃圾桶換新袋', ratings: [['俐落清空', '垃圾與回收都處理完，垃圾桶也乾淨無味'], ['已清空', '垃圾都帶走，並已換上新的垃圾袋'], ['普通', '主要垃圾已處理，但還有零星遺漏'], ['差', '垃圾仍堆積，或垃圾桶沒有恢復可用狀態']] },
      { id: 'cat-litter', name: '倒貓砂', icon: '🐈', short: '清除結塊並整理砂盆', prompt: '鏟除結塊、補足貓砂，讓砂盆保持舒適', ratings: [['貓咪五星', '結塊完全清除、砂量適中，周圍也很乾淨'], ['乾淨', '砂盆已清理並補足，沒有明顯異味'], ['普通', '主要結塊已清除，但邊角仍可再整理'], ['差', '仍有明顯髒污或異味，需要重新清理']] }
    ]
  },
  {
    id: 'organizing', name: '整理類', symbol: '🧩', description: '讓物品回到好拿、好用、好找到的位置',
    tasks: [
      { id: 'hang-clothes', name: '曬衣服', icon: '👕', short: '拉平、分類並保持間距', prompt: '把衣物拉平、分類晾好，保留足夠通風間距', ratings: [['晾得漂亮', '衣物平整、間距均勻，乾後幾乎不用重整'], ['整齊', '衣物都已晾好，沒有擠成一團'], ['普通', '完成晾曬，但部分衣物皺摺或間距太近'], ['差', '衣物容易掉落、發臭，或需要重新晾曬']] },
      { id: 'table', name: '整理餐桌', icon: '🍽️', short: '清空桌面並擦拭', prompt: '收走不屬於餐桌的物品，擦乾淨桌面', ratings: [['像新的一樣', '桌面乾淨、清爽，能立刻舒服地用餐'], ['整齊', '桌面已清空並擦拭，沒有明顯髒污'], ['普通', '可正常使用，但仍有少量物品或水痕'], ['差', '桌面仍凌亂或黏膩，需要重新整理']] },
      { id: 'backpack', name: '整理背包', icon: '🎒', short: '清掉雜物並補齊必需品', prompt: '清掉過期雜物，讓常用物品放在順手的位置', ratings: [['完全就緒', '內容精簡、分類清楚，明天拿了就能出門'], ['整齊', '不需要的物品已清掉，必需品都在'], ['普通', '大致整理完成，但仍有一些雜物'], ['差', '東西仍找不到，或重要物品沒有補齊']] },
      { id: 'fill-water', name: '盛水', icon: '🚰', short: '補足日常飲用水', prompt: '把飲用水補足，容器放回容易取用的位置', ratings: [['準備充足', '水量足夠、容器乾淨，位置也非常順手'], ['已補足', '飲用水已準備好，隨時可以取用'], ['普通', '有補水，但水量或擺放位置不夠理想'], ['差', '水仍不足、容器不乾淨，或沒有放回定位']] }
    ]
  },
  {
    id: 'service', name: '僕人類', symbol: '🛎️', description: '預先替家人或同住者準備舒服的生活條件',
    tasks: [
      { id: 'clean-water', name: '放置乾淨的水', icon: '💧', short: '在指定區域備好飲水', prompt: '在指定區域放好乾淨飲水，確認容器與位置安全', ratings: [['貼心到位', '水質、溫度、容器與位置都照顧得非常好'], ['準備完成', '乾淨的水已放在指定位置'], ['普通', '已放水，但份量、容器或位置可以更好'], ['差', '水不乾淨、不足，或沒有放在指定位置']] },
      { id: 'dinner', name: '準備好晚餐', icon: '🍲', short: '讓晚餐能準時享用', prompt: '準備好晚餐，確認餐具、份量與食用時間', ratings: [['像被招待', '餐點、餐具與時間都恰到好處，吃起來很幸福'], ['準備完成', '晚餐已能直接享用，份量與餐具都齊全'], ['普通', '有晚餐可吃，但細節或時間不夠理想'], ['差', '餐點仍未完成，或需要重新準備']] },
      { id: 'bin-position', name: '準備垃圾桶位置', icon: '📍', short: '讓垃圾桶出現在需要處', prompt: '把乾淨垃圾桶放到指定位置，確認垃圾袋已套好', ratings: [['位置完美', '垃圾桶乾淨、好用，放在一伸手就剛好的地方'], ['準備完成', '垃圾桶與垃圾袋都已在指定位置'], ['普通', '已放置，但位置或清潔度可以更理想'], ['差', '垃圾桶不可用，或沒有放在需要的位置']] },
      { id: 'cold-drink', name: '準備冰涼飲品', icon: '🧊', short: '備好適合飲用的冷飲', prompt: '準備一杯冰涼飲品，放在方便拿取又不易打翻的位置', ratings: [['完美解渴', '溫度、口味、杯子與擺放位置都很剛好'], ['準備完成', '冰涼飲品已可直接飲用'], ['普通', '飲品有準備，但溫度或細節不夠理想'], ['差', '飲品不適合飲用，或根本沒有準備完成']] }
    ]
  }
];

const RATING_META = [
  { points: 4, label: '卓越' },
  { points: 3, label: '良好' },
  { points: 2, label: '普通' },
  { points: 1, label: '待加強' }
];

const allTasks = TASK_CATEGORIES.flatMap(category => category.tasks.map(task => ({ ...task, categoryName: category.name })));
const taskMap = new Map(allTasks.map(task => [task.id, task]));
const $ = selector => document.querySelector(selector);
const elements = {
  screens: [...document.querySelectorAll('.screen')], taskCategories: $('#taskCategories'), durationSelect: $('#durationSelect'), selectedCount: $('#selectedCount'), selectedDuration: $('#selectedDuration'), startButton: $('#startButton'), selectAllButton: $('#selectAllButton'), clearAllButton: $('#clearAllButton'), homeButton: $('#homeButton'), historyButton: $('#historyButton'), taskPosition: $('#taskPosition'), miniProgressFill: $('#miniProgressFill'), timerStage: $('#timerStage'), timerRingProgress: $('#timerRingProgress'), currentTaskIcon: $('#currentTaskIcon'), currentCategory: $('#currentCategory'), currentTaskName: $('#currentTaskName'), currentTaskPrompt: $('#currentTaskPrompt'), timeRemaining: $('#timeRemaining'), doubleTapHint: $('#doubleTapHint'), pauseButton: $('#pauseButton'), backButton: $('#backButton'), restartTaskButton: $('#restartTaskButton'), finishTaskButton: $('#finishTaskButton'), reviewList: $('#reviewList'), reviewForm: $('#reviewForm'), summaryMessage: $('#summaryMessage'), summaryMedal: $('#summaryMedal'), scoreGrid: $('#scoreGrid'), newRoundButton: $('#newRoundButton'), reviewAgainButton: $('#reviewAgainButton'), historyDialog: $('#historyDialog'), historyList: $('#historyList'), closeHistoryButton: $('#closeHistoryButton'), clearHistoryButton: $('#clearHistoryButton'), toast: $('#toast')
};

const state = {
  selectedIds: new Set(), queue: [], completed: [], currentIndex: 0, durationSeconds: 300, remainingSeconds: 300, deadline: 0, timerId: null, paused: false, startedAt: null, ratings: {}, lastTapAt: 0, lastTapPoint: null, toastTimer: null
};

const ringRadius = 132;
const ringCircumference = 2 * Math.PI * ringRadius;
elements.timerRingProgress.style.strokeDasharray = `${ringCircumference}`;
elements.timerRingProgress.style.strokeDashoffset = '0';

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character]));
}

function renderTaskSelection() {
  elements.taskCategories.innerHTML = TASK_CATEGORIES.map(category => `
    <section class="category-card">
      <div class="category-header"><span class="category-symbol" aria-hidden="true">${category.symbol}</span><div><h2>${category.name}</h2><p>${category.description}</p></div></div>
      <div class="task-grid">
        ${category.tasks.map(task => `
          <label class="task-option">
            <input type="checkbox" value="${task.id}" ${state.selectedIds.has(task.id) ? 'checked' : ''}>
            <span class="task-tile"><span class="emoji" aria-hidden="true">${task.icon}</span><span class="task-copy"><strong>${task.name}</strong><small>${task.short}</small></span><span class="check-dot" aria-hidden="true">✓</span></span>
          </label>`).join('')}
      </div>
    </section>`).join('');

  elements.taskCategories.querySelectorAll('input[type="checkbox"]').forEach(input => {
    input.addEventListener('change', () => {
      input.checked ? state.selectedIds.add(input.value) : state.selectedIds.delete(input.value);
      updateSelectionSummary();
    });
  });
}

function updateSelectionSummary() {
  state.durationSeconds = Number(elements.durationSelect.value);
  const count = state.selectedIds.size;
  const minutes = Math.ceil(count * state.durationSeconds / 60);
  elements.selectedCount.textContent = count;
  elements.selectedDuration.textContent = `約 ${minutes} 分鐘`;
  elements.startButton.disabled = count === 0;
  localStorage.setItem('housework-selection-v1', JSON.stringify({ ids: [...state.selectedIds], duration: state.durationSeconds }));
}

function restoreSelection() {
  try {
    const saved = JSON.parse(localStorage.getItem('housework-selection-v1') || 'null');
    if (!saved) return;
    state.selectedIds = new Set((saved.ids || []).filter(id => taskMap.has(id)));
    if ([60, 180, 300, 600, 900, 1200].includes(Number(saved.duration))) elements.durationSelect.value = String(saved.duration);
  } catch { localStorage.removeItem('housework-selection-v1'); }
}

function setAllTasks(selected) {
  state.selectedIds = selected ? new Set(allTasks.map(task => task.id)) : new Set();
  renderTaskSelection();
  updateSelectionSummary();
}

function showScreen(id) {
  elements.screens.forEach(screen => screen.classList.toggle('active', screen.id === id));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function startRound() {
  const ordered = allTasks.filter(task => state.selectedIds.has(task.id));
  if (!ordered.length) return;
  stopTimer();
  state.queue = ordered;
  state.completed = [];
  state.currentIndex = 0;
  state.ratings = {};
  state.startedAt = new Date().toISOString();
  showScreen('timerScreen');
  startCurrentTask();
}

function startCurrentTask() {
  stopTimer();
  const task = state.queue[state.currentIndex];
  if (!task) return beginReview();
  state.remainingSeconds = state.durationSeconds;
  state.paused = false;
  elements.pauseButton.textContent = 'Ⅱ';
  elements.pauseButton.setAttribute('aria-label', '暫停計時');
  elements.currentTaskIcon.textContent = task.icon;
  elements.currentCategory.textContent = task.categoryName;
  elements.currentTaskName.textContent = task.name;
  elements.currentTaskPrompt.textContent = task.prompt;
  elements.taskPosition.textContent = `第 ${state.currentIndex + 1} 項，共 ${state.queue.length} 項`;
  elements.miniProgressFill.style.width = `${state.currentIndex / state.queue.length * 100}%`;
  elements.doubleTapHint.textContent = '輕按兩下，提早完成';
  document.title = `${task.name} · 家事模擬器`;
  renderTimer();
  resumeTimer();
}

function resumeTimer() {
  state.paused = false;
  state.deadline = Date.now() + state.remainingSeconds * 1000;
  stopIntervalOnly();
  state.timerId = window.setInterval(tick, 250);
  elements.pauseButton.textContent = 'Ⅱ';
  elements.pauseButton.setAttribute('aria-label', '暫停計時');
  tick();
}

function pauseTimer() {
  if (!state.timerId) return;
  state.remainingSeconds = Math.max(0, Math.ceil((state.deadline - Date.now()) / 1000));
  stopIntervalOnly();
  state.paused = true;
  elements.pauseButton.textContent = '▶';
  elements.pauseButton.setAttribute('aria-label', '繼續計時');
  renderTimer();
}

function togglePause() {
  if (state.paused) resumeTimer(); else pauseTimer();
}

function tick() {
  if (state.paused) return;
  state.remainingSeconds = Math.max(0, Math.ceil((state.deadline - Date.now()) / 1000));
  renderTimer();
  if (state.remainingSeconds <= 0) finishCurrentTask('timer');
}

function renderTimer() {
  const minutes = Math.floor(state.remainingSeconds / 60);
  const seconds = state.remainingSeconds % 60;
  elements.timeRemaining.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  const ratio = state.durationSeconds ? state.remainingSeconds / state.durationSeconds : 0;
  elements.timerRingProgress.style.strokeDashoffset = `${ringCircumference * (1 - Math.max(0, Math.min(1, ratio)))}`;
}

function restartCurrentTask() {
  state.remainingSeconds = state.durationSeconds;
  state.paused = false;
  renderTimer();
  resumeTimer();
  showToast('已重新計時');
}

function finishCurrentTask(source) {
  const task = state.queue[state.currentIndex];
  if (!task) return;
  stopTimer();
  state.completed.push({ ...task, finishSource: source, finishedAt: new Date().toISOString() });
  vibrate(source === 'timer' ? [80, 60, 120] : 55);
  state.currentIndex += 1;
  if (state.currentIndex >= state.queue.length) beginReview(); else {
    showToast(`完成「${task.name}」`);
    window.setTimeout(startCurrentTask, 320);
  }
}

function beginReview() {
  stopTimer();
  document.title = '家事檢核表 · 家事模擬器';
  renderReview();
  showScreen('reviewScreen');
}

function renderReview() {
  const tasks = state.completed.length ? state.completed : state.queue;
  elements.reviewList.innerHTML = tasks.map(task => `
    <section class="review-card">
      <div class="review-title"><span aria-hidden="true">${task.icon}</span><h2>${task.name}</h2></div>
      <div class="rating-options">
        ${task.ratings.map(([title, description], index) => {
          const points = 4 - index;
          return `<label class="rating-option"><input type="radio" name="rating-${task.id}" value="${points}" ${Number(state.ratings[task.id]) === points ? 'checked' : ''} required><span class="rating-copy"><span class="rating-number">${points}</span><span><strong>${escapeHtml(title)}</strong><small>${escapeHtml(description)}</small></span></span></label>`;
        }).join('')}
      </div>
    </section>`).join('');
}

function submitReview(event) {
  event.preventDefault();
  const formData = new FormData(elements.reviewForm);
  for (const task of state.completed) state.ratings[task.id] = Number(formData.get(`rating-${task.id}`));
  if (Object.keys(state.ratings).length !== state.completed.length) return showToast('每一項都要選擇完成等級');
  const record = createRecord();
  saveRecord(record);
  renderSummary(record);
  showScreen('summaryScreen');
  document.title = '回合完成 · 家事模擬器';
  vibrate([70, 50, 70, 50, 150]);
}

function createRecord() {
  const total = state.completed.reduce((sum, task) => sum + Number(state.ratings[task.id] || 0), 0);
  const max = state.completed.length * 4;
  return { id: Date.now(), startedAt: state.startedAt, finishedAt: new Date().toISOString(), durationSeconds: state.durationSeconds, total, max, average: max ? total / state.completed.length : 0, tasks: state.completed.map(task => ({ id: task.id, name: task.name, icon: task.icon, rating: state.ratings[task.id] })) };
}

function renderSummary(record) {
  const percent = record.max ? Math.round(record.total / record.max * 100) : 0;
  const level = percent >= 90 ? ['✦', '家事大師', '成果非常完整，空間與準備都已經照顧到細節。'] : percent >= 72 ? ['✓', '舒服完成', '主要目標都完成了，家裡已經明顯更舒服。'] : percent >= 52 ? ['◌', '今日有進度', '已經完成重要部分，下次再把幾個細節補齊。'] : ['↻', '需要再巡一輪', '有些項目仍需要處理，但你已經知道下一步在哪裡。'];
  elements.summaryMedal.textContent = level[0];
  $('#summaryTitle').textContent = level[1];
  elements.summaryMessage.textContent = level[2];
  elements.scoreGrid.innerHTML = `<div class="score-box"><strong>${record.tasks.length}</strong><span>完成項目</span></div><div class="score-box"><strong>${record.total}/${record.max}</strong><span>檢核分數</span></div><div class="score-box"><strong>${percent}%</strong><span>完成效果</span></div>`;
}

function getHistory() {
  try { return JSON.parse(localStorage.getItem('housework-history-v1') || '[]'); } catch { return []; }
}

function saveRecord(record) {
  localStorage.setItem('housework-history-v1', JSON.stringify([record, ...getHistory()].slice(0, 20)));
}

function openHistory() {
  renderHistory();
  if (typeof elements.historyDialog.showModal === 'function') elements.historyDialog.showModal();
}

function renderHistory() {
  const history = getHistory();
  if (!history.length) {
    elements.historyList.innerHTML = '<div class="empty-state">還沒有紀錄。完成第一個家事回合後，成果會保存在這裡。</div>';
    return;
  }
  elements.historyList.innerHTML = history.map(record => {
    const percent = record.max ? Math.round(record.total / record.max * 100) : 0;
    const date = new Intl.DateTimeFormat('zh-TW', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(record.finishedAt));
    return `<article class="history-item"><div class="history-item-top"><strong>${escapeHtml(date)}</strong><strong>${percent}%</strong></div><p>${record.tasks.map(task => `${task.icon}${escapeHtml(task.name)} ${task.rating}/4`).join('　')}</p></article>`;
  }).join('');
}

function clearHistory() {
  if (!getHistory().length) return;
  if (!window.confirm('確定清除所有家事紀錄嗎？')) return;
  localStorage.removeItem('housework-history-v1');
  renderHistory();
  showToast('紀錄已清除');
}

function resetRound(force = false) {
  const isRunning = state.queue.length > 0 && state.currentIndex < state.queue.length;
  if (!force && isRunning && !window.confirm('返回後，本次計時進度會清除。確定返回嗎？')) return;
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
  const now = Date.now();
  const point = { x: event.clientX || 0, y: event.clientY || 0 };
  const near = !state.lastTapPoint || Math.hypot(point.x - state.lastTapPoint.x, point.y - state.lastTapPoint.y) < 70;
  elements.timerStage.classList.remove('tap-feedback');
  void elements.timerStage.offsetWidth;
  elements.timerStage.classList.add('tap-feedback');
  if (now - state.lastTapAt <= 420 && near) {
    state.lastTapAt = 0;
    state.lastTapPoint = null;
    finishCurrentTask('double-tap');
  } else {
    state.lastTapAt = now;
    state.lastTapPoint = point;
    elements.doubleTapHint.textContent = '再按一下即可完成';
    window.setTimeout(() => { if (Date.now() - state.lastTapAt >= 650) elements.doubleTapHint.textContent = '輕按兩下，提早完成'; }, 700);
  }
}

function stopIntervalOnly() {
  if (state.timerId) window.clearInterval(state.timerId);
  state.timerId = null;
}
function stopTimer() { stopIntervalOnly(); state.paused = false; }
function vibrate(pattern) { if ('vibrate' in navigator) navigator.vibrate(pattern); }
function showToast(message) {
  window.clearTimeout(state.toastTimer);
  elements.toast.textContent = message;
  elements.toast.classList.add('visible');
  state.toastTimer = window.setTimeout(() => elements.toast.classList.remove('visible'), 1800);
}

function bindEvents() {
  elements.durationSelect.addEventListener('change', updateSelectionSummary);
  elements.selectAllButton.addEventListener('click', () => setAllTasks(true));
  elements.clearAllButton.addEventListener('click', () => setAllTasks(false));
  elements.startButton.addEventListener('click', startRound);
  elements.pauseButton.addEventListener('click', togglePause);
  elements.restartTaskButton.addEventListener('click', restartCurrentTask);
  elements.finishTaskButton.addEventListener('click', () => finishCurrentTask('button'));
  elements.timerStage.addEventListener('pointerup', handleTimerTap);
  elements.backButton.addEventListener('click', () => resetRound());
  elements.homeButton.addEventListener('click', () => resetRound());
  elements.reviewForm.addEventListener('submit', submitReview);
  elements.newRoundButton.addEventListener('click', () => resetRound(true));
  elements.reviewAgainButton.addEventListener('click', () => { renderReview(); showScreen('reviewScreen'); });
  elements.historyButton.addEventListener('click', openHistory);
  elements.closeHistoryButton.addEventListener('click', () => elements.historyDialog.close());
  elements.clearHistoryButton.addEventListener('click', clearHistory);
  elements.historyDialog.addEventListener('click', event => { if (event.target === elements.historyDialog) elements.historyDialog.close(); });
  document.addEventListener('visibilitychange', () => { if (!document.hidden && state.timerId && !state.paused) tick(); });
}

function registerServiceWorker() {
  if ('serviceWorker' in navigator && location.protocol.startsWith('http')) window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
}

restoreSelection();
renderTaskSelection();
bindEvents();
updateSelectionSummary();
registerServiceWorker();
