class Data {
  id: string;
  role?: string;
  fullName?: string;
  date?: string;
  time?: number;
  description?: string;
  repairState?: string;

  constructor(id: string, role: string, fullName: string, date: string, time: number, description: string, repairState: string) {
    this.id =  id;
    this.role = role;
    this.fullName = fullName;
    this.date = date;
    this.time = time;
    this.description = description;
    this.repairState = repairState
  }
}

export default Data;