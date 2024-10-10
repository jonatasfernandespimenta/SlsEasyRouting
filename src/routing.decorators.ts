let eventValues: TRoutes;

export function Route<T extends { new (...args: any[]): {} }>(Base: T) {
  return class extends Base {
    constructor(...args: any[]) {
      super(...args);
      eventValues = args[0];
      
      const methods = Object.getOwnPropertyNames(
        Object.getPrototypeOf(new Base(args))
      ).filter((name) => name !== "constructor");

      return Promise.all(methods.map(async (method) => {
        if (typeof this[method] === 'function') {
          return await this[method](args[0]);
        }
      })).then((result) => {
        const filteredResults = result.filter((value) => value !== undefined && value !== null);
        return filteredResults[filteredResults.length - 1];
      });
    }
  };
}

export function Get(path: string) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const requestedPath = eventValues.path || eventValues.pathParameters?.proxy || '';

      if (eventValues.httpMethod === "GET" && requestedPath === path) {
        return originalMethod.apply(this, args);
      }
    };
  };
}

export function Post(path: string) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      const requestedPath = eventValues.path || eventValues.pathParameters?.proxy || '';

      if (eventValues.httpMethod === "POST" && requestedPath === path) {
        return originalMethod.apply(this, args);
      }
    };
  };
}

export function Delete(path: string) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      const requestedPath = eventValues.path || eventValues.pathParameters?.proxy || '';

      if (
        eventValues.httpMethod === "DELETE" &&
        requestedPath === path
      ) {
        return originalMethod.apply(this, args);
      }
    };
  };
}

export function Patch(path: string) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
    
    descriptor.value = async function (...args: any[]) {
      const requestedPath = eventValues.path || eventValues.pathParameters?.proxy || '';

      if (eventValues.httpMethod === "PATCH" && eventValues.resource === requestedPath) {
        return originalMethod.apply(this, args);
      }
    };
  };
}

export function Put(path: string) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      const requestedPath = eventValues.path || eventValues.pathParameters?.proxy || '';

      if (eventValues.httpMethod === "PUT" && eventValues.resource === requestedPath) {
        return originalMethod.apply(this, args);
      }
    };
  };
}
