// ==UserScript==
// @name         Auto-Click für YouTube
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Automatisches Scrollen und Klicken auf YouTube
// @author       Crackstein
// @match        https://www.youtube.com/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function () {
  "use strict";
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const refreshPage = async () => {
    console.log("Seite wird neu geladen...");
    location.reload();
  };

  const scrollToTop = async () => {
    window.scrollTo(0, 0);
    await sleep(300); // Kurze Pause, um sicherzustellen, dass die Seite bereit ist
  };

  const autoScroll = async () => {
    let lastHeight = document.documentElement.scrollHeight;
    let attempt = 0;
    let scrollAttempt = 0;

    while (true) {
      window.scrollBy(0, 1000);
      console.log("Gescrollt");
      scrollAttempt++;

      await new Promise((resolve) => setTimeout(resolve, 1000));

      const currentHeight = document.documentElement.scrollHeight;
      if (lastHeight === currentHeight) {
        if (attempt++ > 3) {
          break;
        }
        if (scrollAttempt === 2) {
          const navbar = document.querySelector(
            'div[id="container"][class="style-scope ytd-masthead"]'
          );
          if (navbar) {
            console.log("Klicke auf die Navbar");
            navbar.click();
          }
        }
      } else {
        lastHeight = currentHeight;
        attempt = 0;
      }
    }

    console.log(
      "Das Ende der Seite wurde erreicht oder keine neuen Inhalte mehr geladen"
    );
  };

  const deleteSubmitClick = async () => {
    const buttons = document.querySelectorAll(
      'ytd-menu-service-item-renderer[class="style-scope ytd-menu-popup-renderer"][role="menuitem"]'
    );

    if (buttons.length >= 5) {
      const fifthButton = buttons[4].querySelector(
        'yt-formatted-string[class="style-scope ytd-menu-service-item-renderer"]'
      );
      console.log("Fünftes Element:", fifthButton);
      fifthButton.click();
      await sleep(100);
    } else {
      console.log("Weniger als fünf Elemente gefunden.");
      const button = document.querySelector(
        'tp-yt-paper-item[class="style-scope ytd-menu-service-item-renderer"][style-target="host"]'
      );
      button.click();
    }
  };

  const dropdownSubmitClick = async () => {
    const videos = document.querySelectorAll(
      "yt-icon-button[id='button'][class='dropdown-trigger style-scope ytd-menu-renderer']"
    );
    console.log("Dropdown-Elemente:", videos);
    for (const video of videos) {
      const dropdown = video.querySelector(
        "button[id='button'][class='style-scope yt-icon-button'][aria-label]"
      );
      if (dropdown) {
        console.log("Klicke auf das Video-Element", dropdown);
        dropdown.click();
        await deleteSubmitClick();
        await sleep(100);
      }
    }
  };

  const initializeScript = async () => {
    await sleep(3000); // Warte zusätzliche 5 Sekunden
    dropdownSubmitClick();
  };

  const bypass = async () => {
    await scrollToTop();
    await autoScroll();
    await initializeScript();
    await dropdownSubmitClick();
    await refreshPage();
    await bypass();
  };

  bypass();
})();
