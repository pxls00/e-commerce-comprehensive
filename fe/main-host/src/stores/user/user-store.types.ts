export interface IUser {
  uuid: string;
  email: string;
  name: string | null;
  surname: string | null;
  age: number | null;
}

export interface IUserStore {
  user: IUser
}