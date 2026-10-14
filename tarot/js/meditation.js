/**
 * 星穹秘仪 — 冥想倒计时组件
 * 纯本地JS计时器，倒计时结束后自动触发回调
 */
(function () {
  const $ = (sel) => document.querySelector(sel);

  let timerId = null;
  let remainingSeconds = 0;
  let onComplete = null;

  /**
   * 启动冥想倒计时
   * @param {number} seconds - 倒计时秒数 (0 = 跳过)
   * @param {Function} callback - 倒计时结束后的回调
   */
  function startMeditation(seconds, callback) {
    if (seconds <= 0) {
      if (callback) callback();
      return;
    }

    onComplete = callback;
    remainingSeconds = seconds;

    // Show overlay
    const overlay = $('#meditation-overlay');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Update display
    updateDisplay();

    // Start countdown
    timerId = setInterval(tick, 1000);
  }

  function tick() {
    remainingSeconds--;
    updateDisplay();

    if (remainingSeconds <= 0) {
      stopMeditation(true);
    }
  }

  function updateDisplay() {
    const display = $('#meditation-timer-display');
    if (display) {
      display.textContent = remainingSeconds;
    }
  }

  function skipMeditation() {
    stopMeditation(true);
  }

  function stopMeditation(triggerCallback) {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    }

    const overlay = $('#meditation-overlay');
    overlay.classList.remove('active');
    document.body.style.overflow = '';

    if (triggerCallback && onComplete) {
      // Small delay for fade-out transition
      setTimeout(() => {
        if (onComplete) {
          const cb = onComplete;
          onComplete = null;
          cb();
        }
      }, 400);
    }
  }

  // Bind skip button
  function init() {
    const skipBtn = $('#meditation-skip-btn');
    if (skipBtn) {
      skipBtn.addEventListener('click', skipMeditation);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose globally
  window.MeditationTimer = {
    start: startMeditation,
    skip: skipMeditation
  };
})();
