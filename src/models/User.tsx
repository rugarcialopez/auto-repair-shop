class User {
  id?: string;
  password: string;
  email: string;
  fullName: string;
  role: string;

  constructor(id: string, fullName: string, email: string, role: string, password: string) {
    this.id = id;
    this.fullName = fullName;
    this.email = email;
    this.password = password;
    this.role = role;
  }
}

export default User;