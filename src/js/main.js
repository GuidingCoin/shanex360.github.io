function updateTabMaxHeight() {
  const navbarHeight = document.querySelector('.navbar').offsetHeight;
  const activeTab = document.querySelector('.tab-content.active');

  if (!activeTab) return;

  // Set max height to fit viewport minus navbar
  activeTab.style.maxHeight = `calc(100vh - ${navbarHeight}px)`;

  // Check if scrollbar is needed
  if (activeTab.scrollHeight > activeTab.clientHeight) {
    activeTab.style.overflowY = 'auto';
  } else {
    activeTab.style.overflowY = 'hidden';
  }
}
