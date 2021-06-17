class RequestData {
  token: string;
  id?: string;

  constructor(id: string, token: string) {
    this.id = id;
    this.token = token;
  }
}

export default RequestData;