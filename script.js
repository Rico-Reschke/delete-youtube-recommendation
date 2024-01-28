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


const autoScroll = () => {
  window.scrollBy(0, 1000);
  console.log("Erstes Scrollen");

  setInterval(() => {
    window.scrollBy(0, 1000);
    console.log("Gescrollt");
  }, 2000);
};

autoScroll();

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

      for (let i = 5; i > 0; i--) {
        console.log(`Warte noch ${i} Sekunden...`);
        await sleep(200);
      }
    }
  }
};

const bypass = async () => {
  await function1();
};

bypass();
