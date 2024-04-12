import test, { expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright'
import { login, writeHtmlReport } from '../util/test-util';
import { pathToFileURL } from 'url';


const testTitle = '02-home-page';
const expectedPageTitle = /Tasks/;

test.describe(testTitle, () => {
  // run the test
  test('should pass axe-core accessibility tests', async ({ page }) => {
    // steps to login
    await login(page);

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

