import { APP_URL, TIMEOUT } from '../utils/constants';
import puppeteer, { Browser, ElementHandle, HTTPRequest, Page } from 'puppeteer';
import { ResponsePool } from '../utils/response-pool';
import { login } from '../actions/login';
import { interfaces } from 'inversify';
import Container = interfaces.Container;
import { getTestContainer } from '../../src/utils/inversion-container-test';
import { CreateAppointmentRequest } from '../../src/domain/types/requests/create-appointment';
import { injectResponses } from './responses';
import { RouteNames } from '../../src/route-names';


// Grooming should work without selecting pet.
// Grooming should work with selecting pet.
// Grooming should work with selecting pet and product.
// Grooming should work with selecting pet and product and employee.
// Grooming should work with disregarding product selection.

jest.setTimeout(TIMEOUT);
describe('Book', () => {

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

  it.skip('grooming appointment.', async () => {


    const {pets , branches, employees, products, dailySlots, appointments} = injectResponses(responsePool);


    const expectedObj : Partial<CreateAppointmentRequest> = {
      pet:pets[0].id,
      service: "Grooming"

    }
    await login(page, responsePool);


    await page.goto(APP_URL + '/');
    // .card-green corresponds to Grooming button.
    await page.waitForSelector('.card-green');
    const groomingButton = await page.$('.card-green') as ElementHandle<Element>;
    await groomingButton.click();

    await page.waitForSelector('[data-testid="dropdown-bottom-drawer"]');
    await page.evaluate(() => {
      const dropdowns = document.querySelectorAll('[data-testid="dropdown-bottom-drawer"]');
      const firstDropdown = dropdowns[0] as HTMLElement;
      firstDropdown.click();
    });
    // Select branch
    await page.waitForSelector('[data-testid="checkable-card"]');
    await page.evaluate(() => {
      const checkableCards = document.querySelectorAll('[data-testid="checkable-card"]');
      const firstCheckableCard = checkableCards[0] as HTMLElement;
      firstCheckableCard.click();
    });

    await page.waitForSelector('[data-testid="cta-primary"]');
    // document.querySelector   '[data-testid="cta-primary"]'
    await page.evaluate(() => {
      const ctaPrimary = document.querySelector('[data-testid="cta-primary"]') as HTMLElement;
      ctaPrimary.click();
    });


    await page.waitForSelector('[data-testid="dropdown-bottom-drawer"]');
    await page.evaluate(() => {
      const dropdowns = document.querySelectorAll('[data-testid="dropdown-bottom-drawer"]') as NodeListOf<HTMLElement>;
      const secondDropdown = dropdowns[1];
      secondDropdown.click();
    });

    await page.waitForSelector('[data-testid="checkable-card"]');
    await page.evaluate(() => {
      const checkableCards = document.querySelectorAll('[data-testid="checkable-card"]');
      const firstCheckableCard = checkableCards[15] as HTMLElement;
      firstCheckableCard.click();
    });

    await page.waitForSelector('[data-testid="cta-primary"]');
    await page.evaluate(() => {
      const ctaPrimary = document.querySelectorAll('[data-testid="cta-primary"]');
      const groomerButton = ctaPrimary[1] as HTMLElement;

      groomerButton.click();
    });
    await page.waitForSelector('.slot-card');
    await page.evaluate(() => {
      const slotCards = document.querySelectorAll('.slot-card');
      const firstSlotCard = slotCards[0] as HTMLElement;
      firstSlotCard.click();
    });



    // data-testid = book-cards
    await page.waitForSelector('[data-testid="book-cards"]');
    const { employeeName, branchName,appointmentTime } = await page.evaluate(() => {
      const bookCard = document.querySelector('[data-testid="book-cards"]') as HTMLElement;
      const employeeName = (bookCard.firstChild as HTMLElement).textContent;
      const branchHeader  = document.querySelectorAll("h3")[2] as HTMLElement;
      const branchName = branchHeader.textContent;
      const bookNowButton = document.querySelector('[data-testid="book-btn"]') as HTMLElement;
      const hourInput = document.querySelector('[data-testid="text-inputs-controlled"]') as HTMLElement;
      const appointmentTime = (hourInput.children[1] as HTMLElement).innerText;

      bookNowButton.click();
      return {
        employeeName,
        branchName,
        appointmentTime
      };
    });
    expectedObj['branch'] = branches.find(branch => branch.name === branchName)?.id;
    expectedObj['employee'] = employees.find(employee => employee.name === employeeName)?.id;
    expectedObj['start'] = appointmentTime;


    // data-testid = struck-card
    await page.waitForSelector('[data-testid="struck-card"]');
    await page.evaluate(() => {
        const struckCards = document.querySelectorAll('[data-testid="struck-card"]');
        const firstStruckCard = struckCards[1] as HTMLElement;
        firstStruckCard.click();



      });
    await page.evaluate(() => {
      const struckCards = document.querySelectorAll('[data-testid="struck-card"]');
      const tenthStruckCard = struckCards[9] as HTMLElement;
      tenthStruckCard.click();

      const ctaPrimary = document.querySelector('[data-testid="cta-primary"]') as HTMLElement;
      ctaPrimary.click();
    });

    expectedObj['products'] = [products[0].id, products[9].id];

    await page.waitForSelector('[data-testid="weak-btn"]');
    const predicate = (request: HTTPRequest) => {
      return request.url().includes('api/customer/appointment/create') && request.method() === 'POST';

    };

    const [request,_] = await Promise.all([page.waitForRequest(predicate),
    page.evaluate(() => {
      const ctaPrimary = document.querySelector('[data-testid="cta-primary"]') as HTMLElement;
      ctaPrimary.click();
    })]);

    const requestBody = JSON.parse(request.postData() as string) as CreateAppointmentRequest;
    expect(requestBody).toBeDefined();
    expect(requestBody.branch).toBe(expectedObj.branch);
    expect(requestBody.employee).toBe(expectedObj.employee);
    expect(requestBody.pet).toBe(expectedObj.pet);
    expect(requestBody.service).toBe(expectedObj.service);
    expect(requestBody.products.length).toEqual(expectedObj.products.length);
    requestBody.products.forEach((product, index) => {
      expect(typeof product).toBe(typeof 1);

    });
    // Check if body includes start inside the expected time
    expect(requestBody.start).toContain(expectedObj.start);

  });


});
