class Repair {
  id?: string;
  description: string;
  date: string;
  time: number;
  userId: string;

  constructor(id: string, description: string, date: string, time: number, userId: string) {
    this.id = id;
    this.description = description;
    this.date = date;
    this.time = time;
    this.userId = userId;
  }
}

export default Repair;