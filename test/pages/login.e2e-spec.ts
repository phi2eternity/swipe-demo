import puppeteer, { ElementHandle,Page, Browser } from 'puppeteer';
import { APP_URL, DELAY, EMAIL, PASSWORD, TIMEOUT } from '../utils/constants';
import { AuthenticationResponseMockGenerator } from '../../src/domain/types/__mock__/authentication-response';

jest.setTimeout(600000);

const authGenerator = new AuthenticationResponseMockGenerator();
const authResponse = authGenerator.generateOne();

describe('User Login', () => {
  let browser: Browser;
  let page: Page;
  const appUrl = APP_URL;
  const email = EMAIL;
  const password = PASSWORD;

  beforeEach(async () => {
    browser = await puppeteer.launch({ headless: "new" });
    page = await browser.newPage();
    await page.setRequestInterception(true);
  });

  afterEach(async () => {
    await browser.close();
  });

  it.skip('logs in and redirects to the home page', async () => {

    await page.on('request', (request) => {
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
      }else if (request.url().endsWith('login') && request.method() === 'POST' ) {
        request.respond({
          status: 200,
          headers:{
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          },
          contentType: 'application/json',
          body: JSON.stringify(authResponse),
        });
        request.responseForRequest();

      } else {
        request.continue();
      }
    });
    await page.goto(appUrl);

    const inputs = await page.$$('[data-testid="text-input-form-field"]');
    const emailInput = inputs[0];
    const passwordInput = inputs[1];
    await emailInput.click();
    await page.keyboard.type(email, { delay: DELAY });
    await passwordInput.click();
    await page.keyboard.type(password, { delay: DELAY });

    const button = await page.$('[data-testid="cta-primary"]') as ElementHandle
    await button.click();
    await page.waitForNavigation({
      timeout:1000
    });
    expect(page.url()).toBe(appUrl + "/");
  });
  describe('fails',() => {
    beforeEach(async () => {
      page.on('request', (request) => {

        if (request.url().endsWith('/api/auth/customer/login')) {
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
      await page.goto(appUrl);

    });

    it.skip('when invalid password is provided.', async () => {
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
        expect(page.url()).toBe(`${appUrl}/login`);

      }catch(e){
        expect(page.url()).toBe(`${appUrl}/login`);
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
        expect(page.url()).toBe(`${appUrl}/login`);

      }catch(e){
        expect(page.url()).toBe(`${appUrl}/login`);
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
        expect(page.url()).toBe(`${appUrl}/login`);

      }catch(e){
        expect(page.url()).toBe(`${appUrl}/login`);
      }

    });
  });


});
