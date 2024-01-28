const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const zoomEffect = async () => {
  document.body.style.transition = "zoom 0.5s";
  document.body.style.zoom = "500%";
  await sleep(1000);

  document.body.style.zoom = "25%";
  await sleep(1000);

  document.body.style.zoom = "100%";
  await sleep(1000);
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
    await sleep(500);
  } else {
    console.log("Weniger als fünf Elemente gefunden.");
    const button = document.querySelector(
      'tp-yt-paper-item[class="style-scope ytd-menu-service-item-renderer"][style-target="host"]'
    );
    button.click();
    await sleep(500);
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
      await sleep(1000);
    }
  }
};

const bypass = async () => {
  await autoScroll();
  await dropdownSubmitClick();
  await zoomEffect();
  await sleep(1000);
  await bypass();
};

bypass();
