const tabs = document.querySelectorAll('.tab');
const contents = document.querySelectorAll('.tab-content');
const buttons = document.querySelectorAll('button');
const soundLeft = document.getElementById('tab-left');
const soundRight = document.getElementById('tab-right');
const soundSelect = document.getElementById('select');

let currentTabIndex = Array.from(tabs).findIndex(tab =>
  tab.classList.contains('active')
);

function activateTab(tabName, direction) {
  const currentContent = document.querySelector('.tab-content.active');
  if (currentContent) {
    currentContent.classList.remove('active', 'slide-in-left', 'slide-in-right');
  }

  const newTab = document.querySelector(`.tab[data-tab="${tabName}"]`);
  const newContent = document.getElementById(tabName);

  tabs.forEach(t => t.classList.remove('active'));
  newTab.classList.add('active');

  newContent.classList.add(direction === 'right' ? 'slide-in-right' : 'slide-in-left');
  void newContent.offsetWidth;
  newContent.classList.add('active');

  newContent.addEventListener('transitionend', () => {
    newContent.classList.remove('slide-in-left', 'slide-in-right');
  }, { once: true });
}

// Tab click handler
tabs.forEach((tab, newIndex) => {
  tab.addEventListener('click', function (e) {
    e.preventDefault();
    if (currentTabIndex === newIndex) return;

    const selected = this.dataset.tab;
    const direction = newIndex > currentTabIndex ? 'right' : 'left';
    const oldContent = contents[currentTabIndex];
    const newContent = document.getElementById(selected);

    activateTab(selected);

    contents.forEach(c => c.classList.remove('enter-from-left', 'enter-from-right', 'leave-to-left', 'leave-to-right'));
    oldContent.classList.add(direction === 'right' ? 'leave-to-left' : 'leave-to-right');
    oldContent.classList.remove('active');

    newContent.classList.add(direction === 'right' ? 'enter-from-right' : 'enter-from-left');
    requestAnimationFrame(() => {
      newContent.classList.add('active');
      newContent.classList.remove('enter-from-right', 'enter-from-left');
    });

    if (direction === 'right') {
      soundRight.currentTime = 0;
      soundRight.play();
    } else {
      soundLeft.currentTime = 0;
      soundLeft.play();
    }

    currentTabIndex = newIndex;
    localStorage.setItem('activeTab', selected);
  });
});

// Button click sound
buttons.forEach(button => {
  button.addEventListener('click', () => {
    soundSelect.currentTime = 0;
    soundSelect.play();
  });
});

// Restore last active tab on load
document.addEventListener('DOMContentLoaded', () => {
  const savedTab = localStorage.getItem('activeTab');
  if (savedTab) {
    const savedIndex = Array.from(tabs).findIndex(tab => tab.dataset.tab === savedTab);
    const direction = savedIndex >= currentTabIndex ? 'right' : 'left';
    activateTab(savedTab, direction);
    currentTabIndex = savedIndex;
  }
});
