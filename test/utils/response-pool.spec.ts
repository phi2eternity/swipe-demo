import { ResponsePool } from './response-pool';
import { AuthenticationResponseMockGenerator } from '../../src/domain/types/__mock__/authentication-response';

const authGenerator = new AuthenticationResponseMockGenerator();
const authResponse = authGenerator.generateOne();

describe('ResponsePool', () => {
  let responsePool: ResponsePool;
  beforeEach(() => {
    responsePool = new ResponsePool();
  });
  afterEach(() => {
    responsePool.clear();
  });

  it('should be defined', () => {
    expect(ResponsePool).toBeDefined();
  });

  it('should add a response', () => {
    responsePool.add({
      endpoint: '/test', method: 'GET', payload: 'test',
    });
    expect(responsePool.get()['/test']['GET'][0]).toBe('test');
  });
  it('should add a constant response', () => {
    responsePool.addConstantResponse({
      endpoint: '/test', method: 'GET', payload: 'test',
    });
    expect(responsePool.get()['/test']['GET']).toBe('test');
  });
  it('should add a response with ANY method', () => {
    responsePool.add({
      endpoint: '/test', method: 'ANY', payload: 'test',
    });
    expect(responsePool.get()['/test']['ANY'][0]).toBe('test');
  });
  it('should add a constant response with ANY method', () => {
    responsePool.addConstantResponse({
      endpoint: '/test', method: 'ANY', payload: 'test',
    });
    expect(responsePool.get()['/test']['ANY']).toBe('test');
  });
  it('should add a response with ANY method and GET method', () => {
    responsePool.add({
      endpoint: '/test', method: 'ANY', payload: 'test',
    });
    responsePool.add({
      endpoint: '/test', method: 'GET', payload: 'test',
    });
    expect(responsePool.get()['/test']['ANY'][0]).toBe('test');
    expect(responsePool.get()['/test']['GET'][0]).toBe('test');
  });
  it('should add a constant response with ANY method and GET method', () => {
    responsePool.addConstantResponse({
      endpoint: '/test', method: 'ANY', payload: 'test',
    });
    responsePool.addConstantResponse({
      endpoint: '/test', method: 'GET', payload: 'test',
    });
    expect(responsePool.get()['/test']['ANY']).toBe('test');
    expect(responsePool.get()['/test']['GET']).toBe('test');
  });
  it('should add a response with ANY method and GET method and pop. When popped ANY response should be returned.', () => {
    responsePool.add({
      endpoint: '/test', method: 'ANY', payload: 'testAny',
    });
    responsePool.add({
      endpoint: '/test', method: 'GET', payload: 'testGet',
    });
    expect(responsePool.handle('/test', 'GET')).toBe('testAny');
    expect(responsePool.handle('/test', 'GET')).toBe('testGet');
    expect(responsePool.handle('/test', 'GET')).toBe(null);

  });
  it('should return default response when no response is found', () => {
    responsePool.setDefaultResponse('default');
    expect(responsePool.handle('/test', 'GET')).toBe('default');
    responsePool.add({
      endpoint: '/test', method: 'GET', payload: 'testGet',
    });
    expect(responsePool.handle('/test', 'GET')).toBe('testGet');
    expect(responsePool.handle('/test', 'GET')).toBe('default');
  });
  it('should match with regex. Startswith and endwith are checked.', () => {
    responsePool.add({
      endpoint: '^/test$', method: 'GET', payload: 'test',
    });
    responsePool.add({
      endpoint: '/test/1', method: 'GET', payload: 'test1',
    });
    expect(responsePool.handle('/test/1', 'GET')).toBe('test1');
  });
  it('should match with regex. Matches the most specific matching endpoint.', () => {
    responsePool.add({
      endpoint: '^/test$', method: 'GET', payload: 'test',
    });
    responsePool.add({
      endpoint: '/test/1', method: 'GET', payload: 'test1',
    });
    responsePool.add({
      endpoint: '/test/1/1', method: 'GET', payload: 'test11',
    });
    expect(responsePool.handle('/test/1/1', 'GET')).toBe('test11');
    expect(responsePool.handle('/test/1/1', 'GET')).toBe('test1');
  });

  it('check handle all requests', () => {
    responsePool.addConstantResponse({
      endpoint: '.*', method: 'ANY', payload: 'test',

    });
    expect(responsePool.handle('/test/1/1', 'GET')).toBe('test');
    expect(responsePool.handle('/test/1/1', 'POST')).toBe('test');
    expect(responsePool.handle('/test/mgfqwofqewf', 'PUT')).toBe('test');
    expect(responsePool.handle('/test/1/1', 'DELETE')).toBe('test');
    expect(responsePool.handle('/test/1/1', 'PATCH')).toBe('test');
    expect(responsePool.handle('/test/1/1', 'HEAD')).toBe('test');
    expect(responsePool.handle('/test/1/1', 'OPTIONS')).toBe('test');


  });
  it('handle CORS response.', () => {
    const url = 'http://localhost:8000/api/auth/customer/login';

    const payload = {
      status: 200, headers: {
        'Access-Control-Allow-Origin': '*', // Replace '*' with your allowed origin
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Max-Age': '86400', // Cache the preflight request for 1 day
        'Content-Length': '0',
      },
    };
    responsePool.addConstantResponse({
      endpoint: '.*', method: 'OPTIONS', payload
    });
    responsePool.addConstantResponse({
      endpoint: '.*', method: 'POST', payload: authResponse
    });

    expect(responsePool.handle(url, 'OPTIONS')).toEqual(payload);
    expect(responsePool.handle(url, 'POST')).toEqual(authResponse);
  })


  });
