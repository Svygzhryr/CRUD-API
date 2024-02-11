import { ICustomIncomingMessage } from "../types/types";

export const bodyParser = async (request: ICustomIncomingMessage) => {
  return new Promise((resolve, reject) => {
    try {
      let body = "";
      request.on("data", (chunk: string) => {
        body += chunk;
      });
      request.on("end", () => {
        resolve(JSON.parse(body));
      });
    } catch (err) {
      reject(err);
    }
  });
};
