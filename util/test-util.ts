import { expect, Page} from '@playwright/test';
import { createHtmlReport } from 'axe-html-reporter';
import { existsSync, mkdirSync, writeFileSync } from 'fs';

export async function login(page: Page) {
  const expectedLoginPageTitle = /Tasks - Log In/;
  const expectedURLpathAfterLogin = /\/home/;

  // go to baseURL
  await page.goto('./');

  // check the title
  await expect(page).toHaveTitle(expectedLoginPageTitle);

  await page.locator('#P9999_USERNAME').fill(process.env.PLWR_USERNAME!);
  await page.locator('#P9999_PASSWORD').fill(process.env.PLWR_PASSWORD!);
  await page.keyboard.press('Enter');

  // check the url path
  await expect(page).toHaveURL(expectedURLpathAfterLogin);
}

export async function writeHtmlReport(accessibilityScanResults: any, testTitle: string) {
  const reportHTML = createHtmlReport({
    results: accessibilityScanResults,
    options: {
      projectKey: testTitle
    },
  });

  const fileName = `test-results/${testTitle}-report.html`;

  // store Report
  if (!existsSync(fileName)) {
    mkdirSync("test-results", {
      recursive: true,
    });
  }
  writeFileSync(fileName, reportHTML);

  return fileName;
}