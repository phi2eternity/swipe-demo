import { ElementHandle, Page } from 'puppeteer';
import { APP_URL, DELAY, EMAIL,PASSWORD } from '../utils/constants';
import { ResponsePool } from '../utils/response-pool';
import { AuthenticationResponseMockGenerator } from '../../src/domain/types/__mock__/authentication-response';
import { RouteNames } from '../../src/route-names';


const authGenerator = new AuthenticationResponseMockGenerator();
const authResponse = authGenerator.generateOne();



export const login = async (page: Page, responsePool:ResponsePool) => {

  await page.goto(APP_URL + RouteNames.LOGIN);
  responsePool.addConstantResponse({
    endpoint: '.*',
    method: 'OPTIONS',
    payload: {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // Replace '*' with your allowed origin
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Max-Age': '86400', // Cache the preflight request for 1 day
        'Content-Length': '0',
      }
    }
  });

  responsePool.addConstantResponse({
    endpoint: 'login',
    method: 'POST',
    payload:{
      contentType: 'application/json',
      status:200,
      headers:{
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",

      },
      body:JSON.stringify(authResponse)
    }
  });

  responsePool.addConstantResponse({
    endpoint: 'verify',
    method: 'GET',
    payload:{
      contentType: 'application/json',
      status:200,
      headers:{
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      },
      body:JSON.stringify(authResponse)
    }
  });

  await page.goto(APP_URL + RouteNames.LOGIN);
  await page.waitForSelector('[data-testid="text-input-form-field"]',{
    timeout:500
  });

  const inputs = await page.$$('[data-testid="text-input-form-field"]');
  const emailInput = inputs[0];
  const passwordInput = inputs[1];
  await emailInput.click();
  await page.keyboard.type(EMAIL, );
  await passwordInput.click();
  await page.keyboard.type(PASSWORD, );

  const button = await page.$('[data-testid="cta-primary"]') as ElementHandle
  await button.click();
  await page.waitForNavigation({
    timeout:1000
  });

}
