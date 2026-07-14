'use strict';

const RATING_PROFILES = {
  clean: [
    ['閃閃發亮', '幾乎找不到髒污，氣味與觸感都很舒服'],
    ['乾淨完成', '明顯髒污已清除，可以直接正常使用'],
    ['基本完成', '主要區域有處理，但角落仍有少量遺漏'],
    ['需要重做', '仍看得出髒亂或異味，需要再處理一次']
  ],
  organize: [
    ['完美歸位', '物品分類清楚、拿取順手，視覺也很整齊'],
    ['整齊完成', '主要物品已歸位，空間可以舒服使用'],
    ['大致完成', '多數物品有整理，但仍有少量雜物'],
    ['仍然凌亂', '物品仍難以找到，空間需要重新整理']
  ],
  kitchen: [
    ['餐廚五星', '乾淨、安全、好使用，下一餐能直接開始'],
    ['準備完成', '主要工作都完成，餐廚區域可以正常使用'],
    ['基本完成', '已處理大部分，但仍有一點油污或物品未歸位'],
    ['需要處理', '仍有明顯髒污、餐具或食物需要處理']
  ],
  service: [
    ['貼心到位', '位置、份量、溫度與使用時機都照顧得很好'],
    ['準備完成', '需要的東西已放在正確位置，可以直接使用'],
    ['基本完成', '有完成準備，但份量、位置或細節可以更好'],
    ['尚未就緒', '準備不足、位置不對，或還不能直接使用']
  ],
  pet: [
    ['毛孩五星', '乾淨、安全、份量適中，毛孩可以舒服使用'],
    ['照護完成', '主要需求已處理，沒有明顯問題'],
    ['基本完成', '有完成照護，但細節或周圍環境仍可改善'],
    ['需要重做', '仍有髒污、不足或安全問題，需要再次處理']
  ],
  custom: [
    ['超額完成', '成果比原本預期更完整，細節也處理得很好'],
    ['順利完成', '目標已完成，可以直接進入下一件事'],
    ['基本完成', '主要部分完成，但還有少量細節'],
    ['需要重做', '目前成果仍未達到可接受的程度']
  ]
};

const TASK_CATEGORIES = [
  {
    id: 'cleaning', name: '清潔類', symbol: '🫧', color: '#69c7b0', scene: '浴室・地板・窗戶', description: '把灰塵、污漬與異味清掉',
    tasks: [
      { id: 'sweep', name: '打掃地板', icon: '🧹', room: '全屋', effort: 2, profile: 'clean', short: '清除頭髮、灰塵與碎屑', prompt: '從角落往出口清掃，把看得見的頭髮、灰塵與碎屑集中處理', ratings: [['超級乾淨', '能夠感覺地板發光，甚至還香香的'], ['乾淨', '沒有任何直徑大於一公分的雜物'], ['普通', '有一點點頭髮或碎屑，但是可以接受'], ['差', '看起來就很髒，需要重新做']] },
      { id: 'trash', name: '倒垃圾', icon: '🗑️', room: '全屋', effort: 1, profile: 'clean', short: '分類垃圾並換上新袋', prompt: '收好一般垃圾與回收物，帶走後替垃圾桶換上乾淨垃圾袋' },
      { id: 'mop', name: '拖地', icon: '🪣', room: '全屋', effort: 3, profile: 'clean', short: '清除黏膩與腳印', prompt: '先處理明顯污漬，再由內向外拖地並保持通風' },
      { id: 'vacuum', name: '吸塵', icon: '🌀', room: '全屋', effort: 2, profile: 'clean', short: '吸除縫隙與布面灰塵', prompt: '依序吸地板、牆角與家具下方，別漏掉容易積塵的位置' },
      { id: 'dust', name: '擦灰塵', icon: '🪶', room: '客廳', effort: 1, profile: 'clean', short: '處理桌面與櫃體落塵', prompt: '由高到低擦拭桌面、層架與電器表面，避免灰塵再次落下' },
      { id: 'windows', name: '擦窗戶', icon: '🪟', room: '窗邊', effort: 2, profile: 'clean', short: '去除水痕與指紋', prompt: '擦拭玻璃、窗框與把手，讓採光恢復清晰' },
      { id: 'bathroom', name: '清潔浴室', icon: '🚿', room: '浴室', effort: 3, profile: 'clean', short: '刷洗地面與衛浴', prompt: '刷洗地面、排水口與常碰觸區域，最後沖淨並保持乾燥' }
    ]
  },
  {
    id: 'organizing', name: '整理類', symbol: '🧩', color: '#9da7ff', scene: '衣物・桌面・收納', description: '讓物品回到好拿、好找的位置',
    tasks: [
      { id: 'laundry', name: '洗衣服', icon: '🧺', room: '洗衣區', effort: 2, profile: 'clean', short: '分類衣物並開始清洗', prompt: '確認口袋、依顏色與材質分類，加入適量清潔劑後開始清洗' },
      { id: 'hang-clothes', name: '曬衣服', icon: '👕', room: '陽台', effort: 2, profile: 'organize', short: '拉平並保持通風', prompt: '抖開衣物、拉平皺摺，依材質保持適當間距' },
      { id: 'fold-clothes', name: '收摺衣服', icon: '🧺', room: '臥室', effort: 2, profile: 'organize', short: '分類、摺疊並歸位', prompt: '依使用者與類型分類，摺好後放回固定位置' },
      { id: 'table', name: '整理餐桌', icon: '🍽️', room: '餐廳', effort: 1, profile: 'organize', short: '清空並恢復用餐空間', prompt: '收走不屬於餐桌的物品，擦拭桌面並留下足夠用餐空間' },
      { id: 'desk', name: '整理書桌', icon: '🖥️', room: '書房', effort: 2, profile: 'organize', short: '清出工作與學習區', prompt: '丟掉廢紙、收好線材，讓桌面只保留現在需要的東西' },
      { id: 'backpack', name: '整理背包', icon: '🎒', room: '玄關', effort: 1, profile: 'organize', short: '清掉雜物並補齊用品', prompt: '清掉過期票據與雜物，確認鑰匙、錢包與必需品都在' },
      { id: 'bed', name: '整理床鋪', icon: '🛏️', room: '臥室', effort: 1, profile: 'organize', short: '拉平床單與棉被', prompt: '整理枕頭、拉平床單，讓睡眠區域恢復清爽' },
      { id: 'shoe-cabinet', name: '整理鞋櫃', icon: '👟', room: '玄關', effort: 2, profile: 'organize', short: '配對鞋子並保持通風', prompt: '把鞋子配對歸位，清掉不穿的鞋並保持櫃內通風' },
      { id: 'wardrobe', name: '整理衣櫃', icon: '🚪', room: '臥室', effort: 3, profile: 'organize', short: '分類衣物與換季收納', prompt: '依季節與用途分類，讓常穿衣物放在最好拿的位置' }
    ]
  },
  {
    id: 'kitchen', name: '廚房類', symbol: '🍳', color: '#ffad66', scene: '餐具・流理台・冰箱', description: '讓下一餐可以安全、舒服地開始',
    tasks: [
      { id: 'dishes', name: '洗碗', icon: '🫧', room: '廚房', effort: 2, profile: 'kitchen', short: '洗淨餐具並瀝乾', prompt: '先分類餐具，再依油污程度清洗、沖淨並放到瀝水區' },
      { id: 'counter', name: '擦流理台', icon: '🧽', room: '廚房', effort: 1, profile: 'kitchen', short: '去除油污與食物殘渣', prompt: '移開雜物，清掉食物殘渣與油污，最後擦乾檯面' },
      { id: 'sink', name: '清潔水槽', icon: '🚰', room: '廚房', effort: 2, profile: 'kitchen', short: '刷洗水槽與排水口', prompt: '清掉濾網殘渣，刷洗水槽、龍頭與排水口周圍' },
      { id: 'fridge', name: '整理冰箱', icon: '🧊', room: '廚房', effort: 3, profile: 'kitchen', short: '檢查期限並分類食材', prompt: '丟棄過期食材，依類型與期限排列，讓先到期的放在前面' },
      { id: 'meal-prep', name: '準備晚餐', icon: '🍲', room: '廚房', effort: 3, profile: 'kitchen', short: '完成餐點與餐具準備', prompt: '確認份量與用餐時間，完成餐點並準備好餐具' },
      { id: 'restock-kitchen', name: '補充廚房用品', icon: '🧴', room: '廚房', effort: 1, profile: 'kitchen', short: '補足清潔與耗材', prompt: '檢查洗碗精、廚房紙巾與垃圾袋，把不足的用品補齊' }
    ]
  },
  {
    id: 'service', name: '管家類', symbol: '🛎️', color: '#f3cf73', scene: '飲水・晚餐・舒適準備', description: '預先把需要的東西放到剛好的位置',
    tasks: [
      { id: 'clean-water', name: '放置乾淨的水', icon: '💧', room: '指定區域', effort: 1, profile: 'service', short: '在指定位置備好飲水', prompt: '確認容器乾淨、水量足夠，再放到安全又好拿的位置' },
      { id: 'cold-drink', name: '準備冰涼飲品', icon: '🥤', room: '客廳', effort: 1, profile: 'service', short: '準備適合飲用的冷飲', prompt: '準備冰涼飲品，確認杯子、溫度與放置位置都合適' },
      { id: 'bin-position', name: '準備垃圾桶位置', icon: '🗑️', room: '指定區域', effort: 1, profile: 'service', short: '放好乾淨垃圾桶', prompt: '套好垃圾袋，把垃圾桶放在方便使用又不妨礙走動的位置' },
      { id: 'charge-devices', name: '替設備充電', icon: '🔋', room: '充電區', effort: 1, profile: 'service', short: '補足手機與平板電量', prompt: '把常用設備接上正確充電器，整理線材並確認開始充電' },
      { id: 'bedtime-kit', name: '準備睡前用品', icon: '🌙', room: '臥室', effort: 1, profile: 'service', short: '備好睡衣、毛巾與水', prompt: '把睡衣、毛巾與飲水放到睡前容易拿取的位置' },
      { id: 'cool-room', name: '調整舒適環境', icon: '🌡️', room: '全屋', effort: 1, profile: 'service', short: '調整溫度、燈光與通風', prompt: '依現在狀況調整冷氣、風扇、燈光或窗戶，讓空間更舒適' }
    ]
  },
  {
    id: 'pet', name: '寵物類', symbol: '🐾', color: '#ff91a8', scene: '飲水・飲食・貓砂', description: '處理毛孩每天需要的基本照護',
    tasks: [
      { id: 'cat-litter', name: '清理貓砂', icon: '🐈', room: '貓砂區', effort: 2, profile: 'pet', short: '鏟除結塊並補足砂量', prompt: '鏟除結塊與排泄物，整理周圍落砂並補到適當高度' },
      { id: 'pet-water', name: '補充寵物飲水', icon: '💦', room: '飲水區', effort: 1, profile: 'pet', short: '換上乾淨飲水', prompt: '清洗容器、換上新鮮飲水，確認飲水位置安全穩固' },
      { id: 'pet-food', name: '準備寵物餐點', icon: '🥣', room: '餵食區', effort: 1, profile: 'pet', short: '依份量準備飼料或鮮食', prompt: '依平常份量準備餐點，確認食物新鮮並放在固定位置' },
      { id: 'pet-bowl', name: '清洗寵物碗', icon: '🧼', room: '餵食區', effort: 1, profile: 'pet', short: '清除油脂與殘渣', prompt: '把食碗與水碗洗淨、沖乾淨並擦乾或晾乾' },
      { id: 'pet-area', name: '整理寵物區域', icon: '🏠', room: '寵物區', effort: 2, profile: 'pet', short: '整理玩具、毛髮與睡墊', prompt: '收好玩具、清除毛髮，整理睡墊與常活動區域' },
      { id: 'pet-groom', name: '梳理毛髮', icon: '🪮', room: '寵物區', effort: 2, profile: 'pet', short: '梳掉浮毛並檢查皮膚', prompt: '順著毛向溫柔梳理，留意打結、皮膚或耳朵是否有異常' }
    ]
  }
];

const PRESETS = [
  { id: 'quick', name: '15 分快速重置', icon: '⚡', ids: ['sweep', 'table', 'dishes', 'counter', 'trash'] },
  { id: 'deep', name: '深度清潔', icon: '✨', ids: ['sweep', 'mop', 'vacuum', 'dust', 'windows', 'bathroom'] },
  { id: 'laundry-day', name: '洗衣日', icon: '👚', ids: ['laundry', 'hang-clothes', 'fold-clothes', 'wardrobe'] },
  { id: 'cat-care', name: '貓咪照護', icon: '🐈', ids: ['cat-litter', 'pet-water', 'pet-food', 'pet-bowl', 'pet-area'] },
  { id: 'butler', name: '貼心管家', icon: '🛎️', ids: ['clean-water', 'cold-drink', 'charge-devices', 'bedtime-kit', 'cool-room'] }
];

const $ = selector => document.querySelector(selector);
const elements = {
  screens: [...document.querySelectorAll('.screen')], taskCategories: $('#taskCategories'), durationSelect: $('#durationSelect'), selectedCount: $('#selectedCount'), selectedDuration: $('#selectedDuration'), startButton: $('#startButton'), selectAllButton: $('#selectAllButton'), clearAllButton: $('#clearAllButton'), homeButton: $('#homeButton'), historyButton: $('#historyButton'), searchInput: $('#taskSearch'), presetList: $('#presetList'), customTaskButton: $('#customTaskButton'), customTaskDialog: $('#customTaskDialog'), customTaskForm: $('#customTaskForm'), closeCustomTaskButton: $('#closeCustomTaskButton'), queuePreview: $('#queuePreview'), taskPosition: $('#taskPosition'), miniProgressFill: $('#miniProgressFill'), timerStage: $('#timerStage'), timerRingProgress: $('#timerRingProgress'), currentTaskIcon: $('#currentTaskIcon'), currentCategory: $('#currentCategory'), currentTaskRoom: $('#currentTaskRoom'), currentTaskName: $('#currentTaskName'), currentTaskPrompt: $('#currentTaskPrompt'), timeRemaining: $('#timeRemaining'), doubleTapHint: $('#doubleTapHint'), pauseButton: $('#pauseButton'), backButton: $('#backButton'), restartTaskButton: $('#restartTaskButton'), finishTaskButton: $('#finishTaskButton'), reviewList: $('#reviewList'), reviewForm: $('#reviewForm'), summaryMessage: $('#summaryMessage'), summaryMedal: $('#summaryMedal'), scoreGrid: $('#scoreGrid'), newRoundButton: $('#newRoundButton'), reviewAgainButton: $('#reviewAgainButton'), historyDialog: $('#historyDialog'), historyList: $('#historyList'), closeHistoryButton: $('#closeHistoryButton'), clearHistoryButton: $('#clearHistoryButton'), toast: $('#toast')
};

const state = {
  selectedIds: new Set(), customTasks: [], queue: [], completed: [], currentIndex: 0, durationSeconds: 300, remainingSeconds: 300, deadline: 0, timerId: null, paused: false, startedAt: null, ratings: {}, lastTapAt: 0, lastTapPoint: null, toastTimer: null, searchTerm: ''
};

const ringRadius = 132;
const ringCircumference = 2 * Math.PI * ringRadius;
elements.timerRingProgress.style.strokeDasharray = `${ringCircumference}`;

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character]));
}

function getAllCategories() {
  if (!state.customTasks.length) return TASK_CATEGORIES;
  return [...TASK_CATEGORIES, { id: 'custom', name: '我的自訂', symbol: '✦', color: '#d6b1ff', scene: '自行建立的任務', description: '依照自己的生活方式建立', tasks: state.customTasks }];
}

function getAllTasks() {
  return getAllCategories().flatMap(category => category.tasks.map(task => ({ ...task, categoryName: category.name, categoryColor: category.color })));
}

function getTaskMap() {
  return new Map(getAllTasks().map(task => [task.id, task]));
}

function getTaskRatings(task) {
  return task.ratings || RATING_PROFILES[task.profile] || RATING_PROFILES.custom;
}

function renderPresets() {
  elements.presetList.innerHTML = PRESETS.map(preset => `<button class="preset-chip" type="button" data-preset="${preset.id}"><span>${preset.icon}</span>${preset.name}</button>`).join('');
}

function renderTaskSelection() {
  const term = state.searchTerm.trim().toLowerCase();
  const categories = getAllCategories().map(category => ({
    ...category,
    tasks: category.tasks.filter(task => !term || `${task.name} ${task.short} ${task.room}`.toLowerCase().includes(term))
  })).filter(category => category.tasks.length);

  elements.taskCategories.innerHTML = categories.length ? categories.map(category => `
    <section class="category-card" style="--category-color:${category.color}">
      <div class="category-header">
        <span class="category-symbol" aria-hidden="true">${category.symbol}</span>
        <div class="category-copy"><div class="category-title-row"><h2>${category.name}</h2><span>${category.tasks.length} 項</span></div><p>${category.description}</p><small>${category.scene}</small></div>
      </div>
      <div class="task-grid">
        ${category.tasks.map(task => `
          <label class="task-option">
            <input type="checkbox" value="${task.id}" ${state.selectedIds.has(task.id) ? 'checked' : ''}>
            <span class="task-tile">
              <span class="task-visual"><span class="emoji" aria-hidden="true">${task.icon}</span><span class="task-shadow"></span></span>
              <span class="task-copy"><strong>${escapeHtml(task.name)}</strong><small>${escapeHtml(task.short)}</small><span class="task-meta"><i>${escapeHtml(task.room)}</i><i>${'●'.repeat(task.effort || 1)}</i></span></span>
              <span class="check-dot" aria-hidden="true">✓</span>
            </span>
          </label>`).join('')}
      </div>
    </section>`).join('') : '<div class="empty-search">找不到符合的家事，試試其他關鍵字或建立自訂家事。</div>';

  elements.taskCategories.querySelectorAll('input[type="checkbox"]').forEach(input => {
    input.addEventListener('change', () => {
      input.checked ? state.selectedIds.add(input.value) : state.selectedIds.delete(input.value);
      updateSelectionSummary();
      renderQueuePreview();
    });
  });
}

function renderQueuePreview() {
  const taskMap = getTaskMap();
  const selected = [...state.selectedIds].map(id => taskMap.get(id)).filter(Boolean);
  elements.queuePreview.innerHTML = selected.length
    ? `<div class="queue-head"><strong>本次任務列</strong><span>${selected.length} 項</span></div><div class="queue-icons">${selected.map((task, index) => `<span title="${escapeHtml(task.name)}"><i>${index + 1}</i>${task.icon}</span>`).join('')}</div>`
    : '<div class="queue-empty"><strong>尚未選擇任務</strong><span>從下方卡片或快速模式加入</span></div>';
}

function updateSelectionSummary() {
  state.durationSeconds = Number(elements.durationSelect.value);
  const count = state.selectedIds.size;
  const minutes = Math.ceil(count * state.durationSeconds / 60);
  elements.selectedCount.textContent = count;
  elements.selectedDuration.textContent = `約 ${minutes} 分鐘`;
  elements.startButton.disabled = count === 0;
  localStorage.setItem('housework-selection-v2', JSON.stringify({ ids: [...state.selectedIds], duration: state.durationSeconds }));
}

function restoreData() {
  try {
    state.customTasks = JSON.parse(localStorage.getItem('housework-custom-tasks-v1') || '[]');
    const saved = JSON.parse(localStorage.getItem('housework-selection-v2') || localStorage.getItem('housework-selection-v1') || 'null');
    const taskMap = getTaskMap();
    if (saved) {
      state.selectedIds = new Set((saved.ids || []).filter(id => taskMap.has(id)));
      if ([60, 120, 180, 300, 600, 900, 1200, 1800].includes(Number(saved.duration))) elements.durationSelect.value = String(saved.duration);
    }
  } catch {
    state.customTasks = [];
    state.selectedIds = new Set();
  }
}

function setAllTasks(selected) {
  state.selectedIds = selected ? new Set(getAllTasks().map(task => task.id)) : new Set();
  renderTaskSelection();
  renderQueuePreview();
  updateSelectionSummary();
}

function applyPreset(id) {
  const preset = PRESETS.find(item => item.id === id);
  if (!preset) return;
  state.selectedIds = new Set(preset.ids.filter(taskId => getTaskMap().has(taskId)));
  if (id === 'quick') elements.durationSelect.value = '180';
  renderTaskSelection();
  renderQueuePreview();
  updateSelectionSummary();
  showToast(`已套用「${preset.name}」`);
}

function saveCustomTask(event) {
  event.preventDefault();
  const formData = new FormData(elements.customTaskForm);
  const name = String(formData.get('name') || '').trim();
  if (!name) return;
  const task = {
    id: `custom-${Date.now()}`,
    name,
    icon: String(formData.get('icon') || '✦').trim().slice(0, 4) || '✦',
    room: String(formData.get('room') || '自訂區域').trim() || '自訂區域',
    effort: Number(formData.get('effort') || 1),
    profile: 'custom',
    short: String(formData.get('short') || '我的自訂家事').trim() || '我的自訂家事',
    prompt: String(formData.get('prompt') || `完成「${name}」並確認成果`).trim()
  };
  state.customTasks.push(task);
  state.selectedIds.add(task.id);
  localStorage.setItem('housework-custom-tasks-v1', JSON.stringify(state.customTasks));
  elements.customTaskForm.reset();
  elements.customTaskDialog.close();
  renderTaskSelection();
  renderQueuePreview();
  updateSelectionSummary();
  showToast('已新增自訂家事');
}

function showScreen(id) {
  elements.screens.forEach(screen => screen.classList.toggle('active', screen.id === id));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function startRound() {
  const taskMap = getTaskMap();
  state.queue = [...state.selectedIds].map(id => taskMap.get(id)).filter(Boolean);
  if (!state.queue.length) return;
  stopTimer();
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
  elements.currentTaskIcon.textContent = task.icon;
  elements.currentCategory.textContent = task.categoryName;
  elements.currentCategory.style.setProperty('--active-color', task.categoryColor || '#f3cf73');
  elements.currentTaskRoom.textContent = `${task.room} · 強度 ${'●'.repeat(task.effort || 1)}`;
  elements.currentTaskName.textContent = task.name;
  elements.currentTaskPrompt.textContent = task.prompt;
  elements.taskPosition.textContent = `第 ${state.currentIndex + 1} 項，共 ${state.queue.length} 項`;
  elements.miniProgressFill.style.width = `${state.currentIndex / state.queue.length * 100}%`;
  elements.timerStage.style.setProperty('--active-color', task.categoryColor || '#f3cf73');
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

function togglePause() { state.paused ? resumeTimer() : pauseTimer(); }

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
  if (state.currentIndex >= state.queue.length) beginReview();
  else {
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
    <section class="review-card" style="--category-color:${task.categoryColor || '#f3cf73'}">
      <div class="review-title"><span aria-hidden="true">${task.icon}</span><div><h2>${escapeHtml(task.name)}</h2><small>${escapeHtml(task.room)} · ${escapeHtml(task.categoryName)}</small></div></div>
      <div class="rating-options">
        ${getTaskRatings(task).map(([title, description], index) => {
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
  return { id: Date.now(), startedAt: state.startedAt, finishedAt: new Date().toISOString(), durationSeconds: state.durationSeconds, total, max, average: max ? total / state.completed.length : 0, tasks: state.completed.map(task => ({ id: task.id, name: task.name, icon: task.icon, categoryName: task.categoryName, rating: state.ratings[task.id] })) };
}

function renderSummary(record) {
  const percent = record.max ? Math.round(record.total / record.max * 100) : 0;
  const level = percent >= 90 ? ['✦', '家事大師', '成果非常完整，空間與準備都照顧到了細節。'] : percent >= 72 ? ['✓', '舒服完成', '主要目標都完成了，家裡已經明顯更舒服。'] : percent >= 52 ? ['◌', '今日有進度', '重要部分已經完成，下次再把幾個細節補齊。'] : ['↻', '需要再巡一輪', '有些項目仍需要處理，但你已經知道下一步在哪裡。'];
  elements.summaryMedal.textContent = level[0];
  $('#summaryTitle').textContent = level[1];
  elements.summaryMessage.textContent = level[2];
  const categories = new Set(record.tasks.map(task => task.categoryName)).size;
  elements.scoreGrid.innerHTML = `<div class="score-box"><strong>${record.tasks.length}</strong><span>完成項目</span></div><div class="score-box"><strong>${categories}</strong><span>涵蓋區域</span></div><div class="score-box"><strong>${percent}%</strong><span>完成效果</span></div>`;
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
  elements.searchInput.addEventListener('input', event => { state.searchTerm = event.target.value; renderTaskSelection(); });
  elements.presetList.addEventListener('click', event => { const button = event.target.closest('[data-preset]'); if (button) applyPreset(button.dataset.preset); });
  elements.customTaskButton.addEventListener('click', () => elements.customTaskDialog.showModal());
  elements.closeCustomTaskButton.addEventListener('click', () => elements.customTaskDialog.close());
  elements.customTaskForm.addEventListener('submit', saveCustomTask);
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
  elements.customTaskDialog.addEventListener('click', event => { if (event.target === elements.customTaskDialog) elements.customTaskDialog.close(); });
  document.addEventListener('visibilitychange', () => { if (!document.hidden && state.timerId && !state.paused) tick(); });
}

function registerServiceWorker() {
  if ('serviceWorker' in navigator && location.protocol.startsWith('http')) window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
}

restoreData();
renderPresets();
renderTaskSelection();
renderQueuePreview();
bindEvents();
updateSelectionSummary();
registerServiceWorker();
