import serverBuild from "../frontend/dist/server/server.js";
import { NodeRequest, sendNodeResponse } from "../frontend/node_modules/srvx/dist/adapters/node.mjs";

export default async function handler(req, res) {
  try {
    const webReq = new NodeRequest({ req, res });
    const webRes = await serverBuild.fetch(webReq);
    
    if (webRes.headers.get("content-type")?.startsWith("text/html")) {
      res.setHeader("content-encoding", "identity");
    }
    
    // Set headers
    for (const [key, value] of webRes.headers.entries()) {
      res.setHeader(key, value);
    }
    
    res.writeHead(webRes.status, webRes.statusText);
    await sendNodeResponse(res, webRes);
  } catch (error) {
    console.error("Error in serverless handler:", error);
    if (!res.headersSent) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Internal Server Error");
    }
  }
}
