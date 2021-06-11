class Repair {
  id: string;
  description: string;
  date: string;
  time: number;

  constructor(id: string, description: string, date: string, time: number) {
    this.id = id;
    this.description = description;
    this.date = date;
    this.time = time;
  }
}

export default Repair;