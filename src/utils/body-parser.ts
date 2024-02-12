import { ICustomIncomingMessage } from "../types/types";

export const bodyParser = async (request: ICustomIncomingMessage) => {
  return new Promise((resolve, reject) => {
    try {
      let body = "";
      request.on("data", (chunk: string) => {
        body += chunk;
      });
      request.on("end", () => {
        const result = JSON.parse(body);
        resolve(result);
      });
    } catch (err) {
      console.log(err);
    }
  });
};
