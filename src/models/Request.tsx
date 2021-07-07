class RequestData<T> {
  token?: string;
  id?: string;
  role?: string;
  time?: string;
  date?: string;
  body?: T;

  constructor(id: string, token: string, role: string, time: string, date: string, body: T) {
    this.id = id;
    this.token = token;
    this.role = role;
    this.time = time;
    this.date = date;
    this.body = body;
  }
}

export default RequestData;