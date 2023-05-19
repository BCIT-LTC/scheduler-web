// @ts-check
const { test, expect } = require('@playwright/test');
// const Page = require('@playwright/test');

test('has title', async ({ page }) => {
  console.log(page.url());
  //TODO: the url prefix after http is dependent on the name of the container for the frotend
  await page.goto(process.env.URL_FRONTEND + '/');
  // check which port is tested on
  console.log(page.url());

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle("BSN Open Lab");
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  // eslint-disable-next-line testing-library/prefer-screen-queries
  await page.getByRole('link', {
    name: 'Get started'
  }).click();

  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*intro/);
});
