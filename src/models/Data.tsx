class Data {
  id: string;
  role?: string;
  fullName?: string;
  date?: string;
  time?: number;
  description?: string;

  constructor(id: string, role: string, fullName: string, date: string, time: number, description: string) {
    this.id =  id;
    this.role = role;
    this.fullName = fullName;
    this.date = date;
    this.time = time;
    this.description = description;
  }
}

export default Data;