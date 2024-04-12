import test, { expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright'
import { login, writeHtmlReport } from '../util/test-util';
import { pathToFileURL } from 'url';

const testTitle = '04-tasks-search-page';
const expectedURLafterClickOnCard = /tasks\-search/;

test.describe(testTitle, () => {
  // run the test
  test('should pass axe-core accessibility tests', async ({ page }) => {
    // steps to login
    await login(page);

    // click the card
    await page.locator(':nth-child(2) > .t-Card > .t-Card-wrap > .t-Card-titleWrap').click();
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
});

