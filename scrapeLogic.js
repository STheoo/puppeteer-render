const puppeteer = require('puppeteer');

const scrapeLogic = async (res) => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({headless: true});

  try {
    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto('https://developer.chrome.com/');

    // Set screen size
    await page.setViewport({width: 1080, height: 1024});

    // Locate the full title with a unique string
    const textSelector = await page.waitForSelector(
        'div.devsite-landing-row-item-description-content');
    const fullTitle = await textSelector?.evaluate(el => el.textContent);

    // Print the full title
    console.log('The title of this blog post is "%s".', fullTitle);
    res.send(fullTitle);
  } catch (e) {
    console.error(e);
    res.send(`Something went wrong while running Puppeteer: ${e}`);
  } finally {
    await browser.close();
  }
};

module.exports = {scrapeLogic};