export class User {
  id?: string;
  name: string;
  lastName: string;
  age?: number;
  email?: string;
  address?: string;

  constructor(
    name?: string,
    lastName?: string,
    age?: number,
    email?: string,
    address?: string,
    id?: string
  ) {
    this.name = name;
    this.lastName = lastName;
    this.age = age || null;
    this.email = email || null;
    this.address = address || null;
    this.id = id || null;
  }
}
