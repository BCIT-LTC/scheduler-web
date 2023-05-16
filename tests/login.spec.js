// @ts-check
const {
  test,
  expect
} = require('@playwright/test');
// const Page = require('@playwright/test');

test('login', async ({
  page
}) => {
  //TODO: the url prefix after http is dependent on the name of the container for the frotend
  await page.goto(process.env.URL_FRONTEND + '/');

  // click on "Login here"
  let a = await page.locator("a").click();

  // TODO: move hard coded password and username somewhere else
  // fill username
  await page.locator("input[type=text]").type("admin");

  // fill pw
  await page.locator("input[type=password]").type("password123");

  // press SIGN IN button
  await page.locator("button[type=submit]").click();

  // check if the nav bar is there
  await page.locator("nav.nav")

  // check if the login was successful by checking if there's buttons class element
  await expect(page.locator(".buttons")).toHaveCount(1);

  // open and close announcement dropdown
  await page.locator(".announcement-container").click();
  await expect(page.locator(".dropdown-announcement-container")).toHaveCount(1);
  await page.locator(".announcement-container").click();
  await expect(page.locator(".dropdown-announcement-container")).toHaveCount(0);

});