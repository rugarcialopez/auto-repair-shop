class RequestData<T> {
  token?: string;
  id?: string;
  body?: T;

  constructor(id: string, token: string, body: T) {
    this.id = id;
    this.token = token;
    this.body = body;
  }
}

export default RequestData;