class Response<T> {
  data?: T;
  statusCode: number;
  constructor(
    statusCode: number,
    data?: T,
  ) {
    this.data = data;
    this.statusCode = statusCode;
  }

  static fromException<U>(error: any): Response<U> {
    console.log("ERROR")
    if (error.response) {
      const data = error?.response.data;
      return new Response<U>(
        error.response.status.valueOf(),
        data.data,
      );
    }
    return new Response<U>(500, undefined);
  }
}

export default Response;
