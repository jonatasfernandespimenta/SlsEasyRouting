interface TRoutes {
  headers: Object;
  body: Object;
  resource: string;
  httpMethod: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS';
}
