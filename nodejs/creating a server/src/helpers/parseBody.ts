import { IncomingMessage } from "http";

const parseBody = async (req: IncomingMessage): Promise<any> => {
  return new Promise((resolve, reject) => {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString(); //buffer to string
    });

    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error: any) {
        reject(error);
      }
    });
  });
};


export default parseBody;