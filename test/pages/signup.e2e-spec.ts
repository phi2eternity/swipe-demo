import puppeteer, { ElementHandle,Page, Browser } from 'puppeteer';
import { APP_URL, DELAY, EMAIL, FIRST_NAME, LAST_NAME, PASSWORD, TIMEOUT } from '../utils/constants';
import { RouteNames } from '../../src/route-names';

jest.setTimeout(TIMEOUT);

describe('User Signup', () => {
  let browser: Browser;
  let page: Page;
  const appUrl = APP_URL;
  const email = EMAIL;
  const firstName = FIRST_NAME;
  const lastName = LAST_NAME;
  const password = PASSWORD;

  beforeEach(async () => {
    browser = await puppeteer.launch({
      headless: "new",
      });
    page = await browser.newPage();
    await page.setRequestInterception(true);
  });

  afterEach(async () => {
    await page.goto(appUrl + RouteNames.LOGOUT);
    await browser.close();
  });

  it('should signup a user', async () => {
    page.on('request', (request) => {
      if (request.method() === 'OPTIONS') {
        // Respond with a valid CORS response mimicking a Django server
        request.respond({
          status: 200,
          headers: {
            'Access-Control-Allow-Origin': '*', // Replace '*' with your allowed origin
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Access-Control-Max-Age': '86400', // Cache the preflight request for 1 day
            'Content-Length': '0',
          },
        });
      }else if (request.method() === 'POST' ) {
        request.respond({
          status: 200,
          headers:{
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          },
          contentType: 'application/json',
          body: JSON.stringify({
            user: {
              id: 153,
              username: 'b@b.com',
            },
            token:
              'f4a727bdc2216d3acb8a4e88e5ed5d1f87bba6a2f57262a2a27a0675fbb25acb',
            profile: {
              id: 102,
              name: 'a b',
              uid: '',
              email: '',
              phone: '',
              address: '',
              user: 153,
              role: 1,
              validated: true,
            },
          }),
        });
        request.responseForRequest();

      } else {
        request.continue();
      }
    });

    await page.goto(`${appUrl}/signup`);
    const inputs = await page.$$('[data-testid="text-input-form-field"]');
    const firstNameInput = inputs[0];
    const lastNameInput = inputs[1];
    const emailInput = inputs[2];
    const passwordInput = inputs[3];
    const confirmPasswordInput = inputs[4];

    await firstNameInput.click();
    await page.keyboard.type(firstName, { delay: DELAY });
    await lastNameInput.click();
    await page.keyboard.type(lastName, { delay: DELAY });
    await emailInput.click();
    await page.keyboard.type(email, { delay: DELAY });
    await passwordInput.click();
    await page.keyboard.type(password, { delay: DELAY });
    await confirmPasswordInput.click();
    await page.keyboard.type(password, { delay: DELAY });

    const button = await page.$('[data-testid="cta-primary"]') as ElementHandle
    await button.click();
    await page.waitForNavigation({
      timeout:15000
    });
    expect(page.url()).toBe(appUrl + "/");

  });

  describe('fails',() => {
    beforeEach(async () => {
      page.on('request', (request) => {

        if (request.url().endsWith('/api/auth/customer/signup')) {
          request.respond({
            status: 400,
            contentType: 'application/json',
            body: JSON.stringify({
              error: 'Invalid credentials',
            }),
          });
        } else {
          request.continue();
        }
      });
      await page.goto(`${appUrl}/signup`);

    });

    it('when invalid password is provided.', async () => {
      const inputs = await page.$$('[data-testid="text-input-form-field"]');
      const emailInput = inputs[0];
      const passwordInput = inputs[1];
      await emailInput.click();
      await page.keyboard.type(email, { delay: DELAY });
      await passwordInput.click();
      await page.keyboard.type("invalid", { delay: DELAY });

      const button = await page.$('[data-testid="cta-primary"]') as ElementHandle
      await button.click();
      try{
        await page.waitForNavigation({
          timeout:1000
        });
        expect(page.url()).toBe(`${appUrl}/signup`);

      }catch(e){
        expect(page.url()).toBe(`${appUrl}/signup`);
      }

    });

    it('when invalid email is provided.', async () => {
      const inputs = await page.$$('[data-testid="text-input-form-field"]');
      const emailInput = inputs[0];
      const passwordInput = inputs[1];
      await emailInput.click();
      await page.keyboard.type(email, { delay: DELAY });
      await passwordInput.click();
      await page.keyboard.type("invalid", { delay: DELAY });

      const button = await page.$('[data-testid="cta-primary"]') as ElementHandle
      await button.click();
      try{
        await page.waitForNavigation({
          timeout:1000
        });
        expect(page.url()).toBe(`${appUrl}/signup`);

      }catch(e){
        expect(page.url()).toBe(`${appUrl}/signup`);
      }

    });


    it.skip('when 400 is returned.', async () => {

      const inputs = await page.$$('[data-testid="text-input-form-field"]');
      const emailInput = inputs[0];
      const passwordInput = inputs[1];
      await emailInput.click();
      await page.keyboard.type(email, { delay: DELAY });
      await passwordInput.click();
      await page.keyboard.type(password, { delay: DELAY });

      const button = await page.$('[data-testid="cta-primary"]') as ElementHandle
      await button.click();
      try{
        await page.waitForNavigation({
          timeout:1000
        });
        expect(page.url()).toBe(`${appUrl}/signup`);

      }catch(e){
        expect(page.url()).toBe(`${appUrl}/signup`);
      }

    });
  });
});
