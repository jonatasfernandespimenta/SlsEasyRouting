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
      const event = this.event || args[0];
      const requestedPath = event.path || event.pathParameters?.proxy || '';
      const pathPattern = new RegExp(`^${path.replace(/\{[^}]+\}/g, '([^/]+)')}$`);

      if (
        event.httpMethod === "GET" &&
        pathPattern.test(requestedPath)
      ) {
        const match = requestedPath.match(pathPattern);
        const dynamicParameter = match ? match[1] : null;
        const dynamicFieldName = path.match(/\{([^}]+)\}/)?.[1];

        if (dynamicFieldName && dynamicParameter) {
          event.pathParameters = {
            ...event.pathParameters,
            [dynamicFieldName]: dynamicParameter
          };
        }

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
      const event = this.event || args[0];
      const requestedPath = event.path || event.pathParameters?.proxy || '';
      const pathWithOptionalId = new RegExp(`^${path.replace(/\{[^}]+\}/g, '([^/]+)')}$`);

      if (
        event.httpMethod === "POST" &&
        pathWithOptionalId.test(requestedPath)
      ) {
        const match = requestedPath.match(pathWithOptionalId);
        const dynamicParameter = match ? match[1] : null;
        const dynamicFieldName = path.match(/\{([^}]+)\}/)?.[1];

        if (dynamicFieldName && dynamicParameter) {
          event.pathParameters = {
            ...event.pathParameters,
            [dynamicFieldName]: dynamicParameter
          };
        }

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
      const event = this.event || args[0];
      const requestedPath = event.path || event.pathParameters?.proxy || '';
      const pathPattern = new RegExp(`^${path.replace(/\{[^}]+\}/g, '([^/]+)')}$`);

      if (
        event.httpMethod === "DELETE" &&
        pathPattern.test(requestedPath)
      ) {
        const match = requestedPath.match(pathPattern);
        const dynamicParameter = match ? match[1] : null;
        const dynamicFieldName = path.match(/\{([^}]+)\}/)?.[1];

        if (dynamicFieldName && dynamicParameter) {
          event.pathParameters = {
            ...event.pathParameters,
            [dynamicFieldName]: dynamicParameter
          };
        }

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
      const event = this.event || args[0];
      const requestedPath = event.path || event.pathParameters?.proxy || '';

      const pathPattern = new RegExp(`^${path.replace(/\{[^}]+\}/g, '([^/]+)')}$`);
      if (event.httpMethod === "PATCH" && pathPattern.test(requestedPath)) {
        const match = requestedPath.match(pathPattern);
        const dynamicParameter = match ? match[1] : null;
        const dynamicFieldName = path.match(/\{([^}]+)\}/)?.[1];

        if(dynamicFieldName && dynamicParameter) {
          this.event.pathParameters = JSON.parse(`{"${dynamicFieldName}": "${dynamicParameter}"}`);
        }

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
      const pathPattern = new RegExp(`^${path.replace(/\{[^}]+\}/g, '[^/]+')}$`);

      if (eventValues.httpMethod === "PUT" && pathPattern.test(requestedPath)) {
        return originalMethod.apply(this, args);
      }
    };
  };
}
