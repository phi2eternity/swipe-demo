import { injectResponses } from './responses';
import { CreateAppointmentRequest } from '../../src/domain/types/requests/create-appointment';
import { login } from '../actions/login';
import { APP_URL, EMAIL, PASSWORD } from '../utils/constants';
import puppeteer, { Browser, ElementHandle, HTTPRequest, Page } from 'puppeteer';
import { ResponsePool } from '../utils/response-pool';
import { getTestContainer } from '../../src/utils/inversion-container-test';
import { Container } from 'inversify';
import { CreatePetRequest } from '../../src/domain/types/requests/create-pet';
import { breeds } from '../../src/pages/add-pet/index.constants';
import { RouteNames } from '../../src/route-names';

jest.setTimeout(10000000);
describe('Create Dog', () => {

  let browser: Browser;
  let page: Page;
  let responsePool: ResponsePool;
  let container : Container;

  beforeAll(()=>{
    container = getTestContainer();
  });

  beforeEach(async () => {
    browser = await puppeteer.launch({
      headless: "new",
    });
    page = await browser.newPage();
    responsePool = new ResponsePool();

    await page.setRequestInterception(true);
    await page.on('request', (request) => {
      const response = responsePool.handle(request.url(), request.method());
      if (response) {
        request.respond(response);
        request.responseForRequest();
      } else {
        request.continue();
      }
    });
  });


  afterEach(async () => {
    await page.goto(APP_URL + RouteNames.LOGOUT);
    await browser.close();
  });

  describe('success',  () => {

    it.skip('should create dog', async () => {
      await login(page, responsePool);

      const PET_NAME = 'Johnny';

      await page.goto(APP_URL + RouteNames.ADD_PET);
      await page.waitForNavigation();
      await page.waitForSelector('[data-testid="text-input-form-field"]');
      const nameInput = await page.$('[data-testid="text-input-form-field"]') as ElementHandle;
      await nameInput.click();
      await page.keyboard.type(PET_NAME, );

      const breedOptions = await page.$('[data-testid="pet-gender-form-field"]') as ElementHandle;
      const inputFields = await page.$$('[data-testid="dropdown-select"]');
      const breedInput = inputFields[0];
      await breedInput.click();
      await page.evaluate(() => {
        const checkableCards = document.querySelectorAll('[data-testid="checkable-card"]');
        const firstCard = checkableCards[0] as HTMLElement;
        firstCard.click();

      });

      await page.evaluate(() => {
        const ctaPrimaryButtons = document.querySelectorAll('[data-testid="cta-primary"]');
        const ctaPrimary = ctaPrimaryButtons[1] as HTMLElement;
        ctaPrimary.click();
      });


      const ageInput = inputFields[1];
      await ageInput.click();

      await page.evaluate(() => {
        const checkableCards = document.querySelectorAll('[data-testid="checkable-card"]');
        // Get content==3
        const firstCard = Array.from(checkableCards).filter((card) => card.textContent === '3')[0] as HTMLElement;
        firstCard.click();
      });

      await page.evaluate(() => {
        const ctaPrimaryButtons = document.querySelectorAll('[data-testid="cta-primary"]');
        const ctaPrimary = ctaPrimaryButtons[2] as HTMLElement;
        ctaPrimary.click();
      });

      const weightInput = inputFields[2];

      await weightInput.click();
      await page.evaluate(() => {
        const checkableCards = document.querySelectorAll('[data-testid="checkable-card"]');
        const firstCard = Array.from(checkableCards).filter((card) => (card.textContent ?? "").includes("Extra Large"))[0] as HTMLElement;
        firstCard.click();
      });

      await page.evaluate(() => {
        const ctaPrimaryButtons = document.querySelectorAll('[data-testid="cta-primary"]');
        const ctaPrimary = ctaPrimaryButtons[3] as HTMLElement;
        ctaPrimary.click();
      });
      await page.waitForSelector('[data-testid="pet-gender-form-field"]',{visible:true,timeout:250});
      await page.evaluate(() => {
        const genderOptions = document.querySelector('[data-testid="pet-gender-form-field"]') as HTMLElement;
        genderOptions.click();
      });

      await page.waitForSelector('[data-testid="btn-secondary"]',{visible:true});

      await page.evaluate(() => {
        const genderButtons = document.querySelectorAll('[data-testid="btn-secondary"]');
        const femaleButton = genderButtons[1] as HTMLElement;
        femaleButton.click();
      });

      const requestPredicate = (request: HTTPRequest) => {
        return request.url().includes('api/customer/pet/create') && request.method() === 'POST';

      }
      const [request,_] = await Promise.all([
        page.waitForRequest(requestPredicate),
      page.evaluate(() => {
        const ctaPrimaryButtons = document.querySelectorAll('[data-testid="cta-primary"]');
        const ctaPrimary = ctaPrimaryButtons[0] as HTMLElement;
        ctaPrimary.click();
      })])
      const requestBody =  {
        name: PET_NAME,
        breed: breeds[0],
        gender:"Female",
        age:3,

      };
      const postData = JSON.parse(request.postData() as string) as CreatePetRequest;
      expect(postData.name).toBeTruthy();
      expect(postData.breed).toBeTruthy();
      expect(postData.gender).toBeTruthy();
      expect(postData.age).toBeTruthy();
      expect(postData.weight).toBeTruthy();
      expect(postData.name).toEqual(requestBody.name);
      expect(postData.breed).toEqual(requestBody.breed);
      expect(postData.gender).toEqual(requestBody.gender);
      expect(typeof postData.age).toBe(typeof 1);



    });

  });
});
