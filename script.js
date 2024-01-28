const wait_for = async (conditional, interval = 20) => {
  return new Promise((resolve) => {
    const _wait_for_interval = setInterval(() => {
      if (conditional() === true) {
        clearInterval(_wait_for_interval);
        resolve();
      }
    }, interval);
  });
};

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

const function2 = async () => {
  await wait_for(
    () =>
      document.querySelector(
        'ytd-menu-service-item-renderer[class="style-scope ytd-menu-popup-renderer"][role="menuitem"]'
      ) !== null
  );

  const buttons = document.querySelectorAll(
    'ytd-menu-service-item-renderer[class="style-scope ytd-menu-popup-renderer"][role="menuitem"]'
  );
  for (const button of buttons) {
    await wait_for(
      () =>
        document.querySelector(
          'yt-formatted-string[class="style-scope ytd-menu-service-item-renderer"]'
        ) !== null
    );
    const perfectButton = button.querySelector(
      'yt-formatted-string[class="style-scope ytd-menu-service-item-renderer"]'
    );
    if (
      perfectButton &&
      perfectButton.textContent === "Keine Videos von diesem Kanal empfehlen"
    ) {
      console.log("Klicke auf das Perfect-Button-Element", perfectButton);
      perfectButton.click();
      await sleep(50);
    } else {
      for (const perfectButtons of perfectButton2) {
        perfectButtons.click();
        await sleep(50); // Kurze Pause zwischen den Klicks
      }
    }
  }
};

const function1 = async () => {
  await wait_for(
    () =>
      document.querySelector(
        "yt-icon-button[id='button'][class='dropdown-trigger style-scope ytd-menu-renderer']"
      ) !== null
  );
  const videos = document.querySelectorAll(
    "yt-icon-button[id='button'][class='dropdown-trigger style-scope ytd-menu-renderer']"
  );

  for (const video of videos) {
    await wait_for(
      () =>
        document.querySelector(
          "button[id='button'][class='style-scope yt-icon-button'][aria-label]"
        ) !== null
    );
    const test = video.querySelector(
      "button[id='button'][class='style-scope yt-icon-button'][aria-label]"
    );
    if (test) {
      console.log("Klicke auf das Video-Element", test);
      test.click();

      await function2();
    }
  }
};

const bypass = async () => {
  await autoScroll();
  await function1();
};

bypass();
