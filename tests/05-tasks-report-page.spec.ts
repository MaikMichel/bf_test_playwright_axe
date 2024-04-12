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

    // run Accessibility Test
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    // create HtmlReport
    const fileWritten = await writeHtmlReport(accessibilityScanResults, testTitle);
    test.info().annotations.push({
      type: "local-report",
      description: pathToFileURL(fileWritten).toString(),
    });

    expect(accessibilityScanResults.violations).toEqual([]);
  });


  // run the test
  test('should pass axe-core accessibility tests with IFrame loaded', async ({ page }) => {
    // steps to login
    await login(page);

    // click the card
    await page.locator(':nth-child(3) > .t-Card > .t-Card-wrap > .t-Card-titleWrap').click();
    await expect(page).toHaveURL(expectedURLafterClickOnCard);

    // click edit
    await page.locator(':nth-child(2) > .a-IRR-linkCol > a > .fa').click();

    // check frames
    const mainURL = page.url();
    const frames = await page.frames();



    for (const frame of frames) {
      // run promise to have an url
      const frameContent = await frame.content();

      // if not on main frame
      if (frame.url() != mainURL) {
          // run Accessibility Test
        const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
        expect(accessibilityScanResults.violations).toEqual([]);

        // goto to frame as page
        await page.goto(frame.url());

        // run Accessibility Test
        const accessibilityScanResultsX = await new AxeBuilder({ page }).analyze();

        // create HtmlReport
        writeHtmlReport(accessibilityScanResults, testTitle + "-iframe");

        expect(accessibilityScanResultsX.violations).toEqual([]);
      }
    }


  });
});

