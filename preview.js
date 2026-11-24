"use strict";

for (const tabList of document.querySelectorAll(".demo-tabs")) {
  const tabs = [...tabList.querySelectorAll('[role="tab"]')];
  const panels = tabs.map((tab) => document.getElementById(tab.getAttribute("aria-controls")));
  const initialTab = tabs.findIndex((tab) => tab.getAttribute("aria-selected") === "true");

  if (initialTab === -1 || panels.some((panel) => !panel)) continue;

  function selectTab(selected) {
    for (const [index, tab] of tabs.entries()) {
      const active = index === selected;
      tab.setAttribute("aria-selected", String(active));
      tab.tabIndex = active ? 0 : -1;
      panels[index].hidden = !active;
    }
  }

  for (const [index, tab] of tabs.entries()) {
    tab.addEventListener("click", () => selectTab(index));
    tab.addEventListener("keydown", (event) => {
      let selected;
      switch (event.key) {
        case "ArrowLeft":
          selected = (index - 1 + tabs.length) % tabs.length;
          break;
        case "ArrowRight":
          selected = (index + 1) % tabs.length;
          break;
        case "Home":
          selected = 0;
          break;
        case "End":
          selected = tabs.length - 1;
          break;
        default:
          return;
      }
      event.preventDefault();
      selectTab(selected);
      tabs[selected].focus();
    });
  }

  selectTab(initialTab);
  tabList.hidden = false;
}
