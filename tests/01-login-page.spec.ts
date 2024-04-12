import test, { expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright'
import { writeHtmlReport } from '../util/test-util';
import {pathToFileURL} from 'url';

const testTitle = '01-login-page';
const expectedPageTitle = /Tasks - Log In/;

test.describe(testTitle, () => {
  // run the test
  test('should pass axe-core accessibility tests', async ({ page }) => {

    // go to baseURL
    await page.goto('./');

    // check the title
    await expect(page).toHaveTitle(expectedPageTitle);

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



