import { SMTPServer } from "smtp-server";
import { simpleParser } from "mailparser";
import WebSocket from "ws";

const USERNAME = "smtp-user";
const PASSWORD = "123456";

const server = new SMTPServer({
  authOptional: true,
  onData(stream, session, callback) {
    simpleParser(stream)
      .then((parsed) => {
        broadcastMessage(JSON.stringify(parsed));
        callback(null);
      })
      .catch((err) => {
        callback(err);
      });
  },
  onAuth(auth, session, callback) {
    console.log("Authentication Received", auth, "Session Details", session)
    if (auth.username !== USERNAME || auth.password !== PASSWORD) {
      return callback(new Error("Invalid username or password"));
    }
    callback(null, { user: auth.username });
  },
});

server.listen(2525, "0.0.0.0", () => {
  console.log("SMTP server listening on port 2525");
});

const clients: WebSocket[] = [];
const wss = new WebSocket.Server({ port: 8586 });

wss.on("connection", (ws) => {
  clients.push(ws);
  ws.on("close", () => {
    const index = clients.indexOf(ws);
    if (index !== -1) {
      clients.splice(index, 1);
    }
  });
});

function broadcastMessage(message: string) {
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

export { wss }; // Export WebSocket server instance
