const tabsContainer = document.querySelector('.tabs');
const tabLinks = Array.from(document.querySelectorAll('.tab-link'));
const sections = Array.from(document.querySelectorAll('.tab-section'));

if (tabsContainer && tabLinks.length) {
  const indicator = document.createElement('span');
  indicator.className = 'tab-indicator';
  tabsContainer.appendChild(indicator);

  const setActiveTab = (sectionId) => {
    tabLinks.forEach((tab) => {
      const isActive = tab.dataset.section === sectionId;
      tab.classList.toggle('active', isActive);
      tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    sections.forEach((section) => {
      section.classList.toggle('is-hidden', section.id !== `${sectionId}-section`);
    });

    const activeTab = tabLinks.find((tab) => tab.dataset.section === sectionId);
    if (!activeTab) return;

    const left = activeTab.offsetLeft;
    const width = activeTab.offsetWidth;
    indicator.style.width = `${width}px`;
    indicator.style.transform = `translateX(${left}px)`;
  };

  tabLinks.forEach((tab) => {
    tab.setAttribute('type', 'button');
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-controls', `${tab.dataset.section}-section`);
    tab.addEventListener('click', () => setActiveTab(tab.dataset.section));
  });

  window.addEventListener('resize', () => {
    const activeSection = tabLinks.find((tab) => tab.classList.contains('active'))?.dataset.section;
    if (activeSection) setActiveTab(activeSection);
  });

  setActiveTab('projects');
}
