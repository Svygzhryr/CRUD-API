import { IncomingMessage } from "http";

export interface IUser {
  id?: string;
  username: string;
  age: number;
  hobbies: string[];
}

export interface ICustomIncomingMessage extends IncomingMessage {
  users: IUser[];
}
