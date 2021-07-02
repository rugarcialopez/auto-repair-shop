class RequestData<T> {
  token?: string;
  id?: string;
  role?: string;
  body?: T;

  constructor(id: string, token: string, role: string, body: T) {
    this.id = id;
    this.token = token;
    this.role = role;
    this.body = body;
  }
}

export default RequestData;