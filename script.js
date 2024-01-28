const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const zoomEffect = async () => {
  document.body.style.transition = "zoom 0.5s"; // Glatter Übergang für den Zoom
  document.body.style.zoom = "500%"; // Zoom auf 500%
  await sleep(1000); // Kurze Pause bei 500% Zoom

  document.body.style.zoom = "25%"; // Zoom auf 25%
  await sleep(1000); // Kurze Pause bei 25% Zoom

  document.body.style.zoom = "100%"; // Zurücksetzen auf normalen Zoom
};

const autoScroll = async () => {
  let lastHeight = document.documentElement.scrollHeight;
  let attempt = 0;

  while (true) {
    window.scrollBy(0, 1000); // Scroll um einen festgelegten Wert nach unten
    console.log("Gescrollt");

    // Warten Sie eine Weile, um das Nachladen von Inhalten zu ermöglichen
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const currentHeight = document.documentElement.scrollHeight;
    if (lastHeight === currentHeight) {
      // Wenn die Höhe gleich bleibt, versuchen wir es noch ein paar Mal, bevor wir aufhören
      if (attempt++ > 3) {
        // Versuchen Sie es z.B. 3 Mal
        break;
      }
    } else {
      lastHeight = currentHeight;
      attempt = 0; // Zurücksetzen des Versuchszählers, da neue Inhalte geladen wurden
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

  // Prüfen, ob mindestens fünf Elemente vorhanden sind
  if (buttons.length >= 5) {
    // Zugriff auf das fünfte Element (Index 4)
    const fifthButton = buttons[4].querySelector(
      'yt-formatted-string[class="style-scope ytd-menu-service-item-renderer"]'
    );
    console.log("Fünftes Element:", fifthButton);
    fifthButton.click();
    sleep(1000);
  } else {
    console.log("Weniger als fünf Elemente gefunden.");
  }
};

const dropdownSubmitClick = async () => {
  const videos = document.querySelectorAll(
    "yt-icon-button[id='button'][class='dropdown-trigger style-scope ytd-menu-renderer']"
  );

  for (const video of videos) {
    const dropdown = video.querySelector(
      "button[id='button'][class='style-scope yt-icon-button'][aria-label]"
    );
    if (dropdown) {
      console.log("Klicke auf das Video-Element", dropdown);
      dropdown.click();
      await deleteSubmitClick();
    }
  }
};

const bypass = async () => {
  await autoScroll();
  await dropdownSubmitClick();
  await zoomEffect();
};

bypass();
