export function UnAuthorized(message?: string) {
  return {
    statusCode: 401,
    body: JSON.stringify({
      message: message || "Unauthorized",
    })
  };
}

export function NotFound(message?: string) {
  return {
    statusCode: 404,
    body: JSON.stringify({
      message: message || "Not Found",
    })
  };
}

export function Gone(message?: string) {
  return {
    statusCode: 410,
    body: JSON.stringify({
      message: message || "Gone",
    })
  };
}

export function BadRequest(message?: string) {
  return {
    statusCode: 400,
    body: JSON.stringify({
      message: message || "Bad Request",
    })
  };
}

export function ServiceUnavailable(message?: string) {
  return {
    statusCode: 503,
    body: JSON.stringify({
      message: message || "Service Unavailable",
    })
  };
}

export function Success(data: any) {
  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
}
