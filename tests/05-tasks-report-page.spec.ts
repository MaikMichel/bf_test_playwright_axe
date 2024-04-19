import test, { expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright'
import { login, writeHtmlReport } from '../util/test-util';
import { pathToFileURL } from 'url';

const testTitle = '05-tasks-report-page';
const expectedURLafterClickOnCard = /tasks\-report/;

test.describe(testTitle, () => {

  // run the test
  test('should pass axe-core accessibility tests', async ({ page }) => {
    // steps to login
    await login(page);

    // click the card
    await page.locator(':nth-child(3) > .t-Card > .t-Card-wrap > .t-Card-titleWrap').click();
    await expect(page).toHaveURL(expectedURLafterClickOnCard);

    // make a shot
    await page.screenshot({ path: 'screenshots/' + testTitle + '-screenshot.png', fullPage: true });

    // run Accessibility Test
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    // write HtmlReport
    const fileWritten = await writeHtmlReport(accessibilityScanResults, testTitle);

    // add File to annotations
    test.info().annotations.push({
      type: "local-report",
      description: pathToFileURL(fileWritten).toString(),
    });

    // add Array as JSON attachment
    await test.info().attach('accessibility-scan-results', {
      body: JSON.stringify(accessibilityScanResults, null, 2),
      contentType: 'application/json'
    });

    // fail when defects exists in array
    expect(accessibilityScanResults.violations).toEqual([]);
  });


  // run the test
  test(testTitle + " - with IFrame", async ({ page }) => {
    // steps to login
    await login(page);

    // click the card
    await page.locator(':nth-child(3) > .t-Card > .t-Card-wrap > .t-Card-titleWrap').click();
    await expect(page).toHaveURL(expectedURLafterClickOnCard);

    // click edit
    await page.locator(':nth-child(2) > .a-IRR-linkCol > a > .fa').click();

    // wait
    await page.waitForSelector("#apex_dialog_1 > iframe");

    /* // check frames
    const mainURL = page.url();
    const frames =  page.frames(); */

    // make a shot
    await page.screenshot({ path: 'screenshots/' + testTitle + '-screenshot-with-iframe.png', fullPage: true });



    // run Accessibility Test
    const accessibilityScanResults = await new AxeBuilder({ page }).options({ iframes: true}).analyze();

    // write HtmlReport
    const fileWritten = await writeHtmlReport(accessibilityScanResults, testTitle + "-with-iframe");

    // add File to annotations
    test.info().annotations.push({
      type: "local-report",
      description: pathToFileURL(fileWritten).toString(),
    });

    // add Array as JSON attachment
    await test.info().attach('accessibility-scan-results', {
      body: JSON.stringify(accessibilityScanResults, null, 2),
      contentType: 'application/json'
    });

    // fail when defects exists in array
    expect(accessibilityScanResults.violations).toEqual([]);

    // inspect frames
    /* for (const frame of frames) {
      // run promise to have an url
      const frameContent = await frame.content();

      // if not on main frame
      if (frame.url() != mainURL) {

        // goto to frame as page
        await page.goto(frame.url());

        // make a shot
        await page.screenshot({ path: 'screenshots/' + testTitle + '-screenshot-iframe.png', fullPage: true });

        // run Accessibility Test
        const accessibilityScanResults = await new AxeBuilder({ page }).options({iframes:true}).analyze();

        // add File to annotations
        const fileWritten = await writeHtmlReport(accessibilityScanResults, testTitle + "-iframe");

        // add File to annotations
        test.info().annotations.push({
          type: "local-report",
          description: pathToFileURL(fileWritten).toString(),
        });

        // add Array as JSON attachment
        await test.info().attach('accessibility-scan-results', {
          body: JSON.stringify(accessibilityScanResults, null, 2),
          contentType: 'application/json'
        });

        // fail when defects exists in array
        expect(accessibilityScanResults.violations).toEqual([]);
      }
    } */


  });
});

