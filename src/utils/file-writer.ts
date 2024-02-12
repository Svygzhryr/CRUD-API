import { writeFile } from "fs";
import { join } from "path";

import { IUser } from "../types/types";

export const fileWriter = async (data: IUser[]) => {
  new Promise((resolve, reject) => {
    try {
      writeFile(
        join(__dirname, "..", "users.json"),
        JSON.stringify(data),
        "utf-8",
        () => {
          resolve(data);
        }
      );
    } catch (err) {
      reject(err);
    }
  });
};
