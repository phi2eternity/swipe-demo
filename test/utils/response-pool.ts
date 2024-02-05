const ALLOWED_METHODS = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS', 'TRACE', 'CONNECT', 'ANY'];

export interface AddResponseArguments {
  endpoint: string;
  method?: string;
  payload?: any;
}

export class ResponsePool {
  private defaultResponse: any = null;

  private responsesByEndpoint: { [key: string]: { [key: string]: any[] } } = {};

  addConstantResponse({
                        endpoint, method = 'ANY', payload = null,
                      }: AddResponseArguments) {
    if (!ALLOWED_METHODS.includes(method)) {
      throw new Error(`Invalid method: ${method}`);
    } else {
      if (this.responsesByEndpoint[endpoint] === undefined) {
        this.responsesByEndpoint[endpoint] = {};
      }
      this.responsesByEndpoint[endpoint][method] = payload;

    }
  }

  add({
        endpoint, method = 'ANY', payload = null,
      }: AddResponseArguments) {
    if (!ALLOWED_METHODS.includes(method)) {
      throw new Error(`Invalid method: ${method}`);
    } else {
      if (this.responsesByEndpoint[endpoint] === undefined) {
        this.responsesByEndpoint[endpoint] = {};
      }
      if (this.responsesByEndpoint[endpoint][method] === undefined) {
        this.responsesByEndpoint[endpoint][method] = [];
      }
      this.responsesByEndpoint[endpoint][method].push(payload);
    }
  }

  handle(endpoint: string, method: string) {
    let pathname:string;
    try{
      const url = new URL(endpoint);
      pathname = url.pathname;
    }catch(e){
      pathname = endpoint;
    }
    const sortedPatterns = Object.keys(this.responsesByEndpoint).sort((a, b) => {
      const nonWildcardCharactersA = a.replace(/[*+?^${}()|[\]\\]/g, '').length;
      const nonWildcardCharactersB = b.replace(/[*+?^${}()|[\]\\]/g, '').length;
      return nonWildcardCharactersB - nonWildcardCharactersA;
    });

    const matchingEndpoint = sortedPatterns.find((pattern) => {
      const regex = new RegExp(pattern);
      const result = regex.test(pathname);
      return result && this.responsesByEndpoint[pattern][method] || this.responsesByEndpoint[pattern]['ANY']
    });
    if (!matchingEndpoint) {
      return this.defaultResponse;
    }  else {
      if (this.responsesByEndpoint[matchingEndpoint]['ANY'] !== undefined) {
        method = 'ANY';
      }
      if (Array.isArray(this.responsesByEndpoint[matchingEndpoint][method])) {
        const response = this.responsesByEndpoint[matchingEndpoint][method].shift();
        if (this.responsesByEndpoint[matchingEndpoint][method].length === 0) {
          delete this.responsesByEndpoint[matchingEndpoint][method];
        }
        if(Object.keys(this.responsesByEndpoint[matchingEndpoint]).length === 0){
          delete this.responsesByEndpoint[matchingEndpoint];
        }
        return response;
      } else {
        return this.responsesByEndpoint[matchingEndpoint][method];
      }
    }
  }

  clear() {
    this.responsesByEndpoint = {};
  }


  set(responsesByEndpoint: { [key: string]: { [key: string]: any[] } }) {
    this.responsesByEndpoint = responsesByEndpoint;
  }

  get() {
    return this.responsesByEndpoint;
  }

  setDefaultResponse(defaultResponse: any){
    this.defaultResponse = defaultResponse;
  }

}
