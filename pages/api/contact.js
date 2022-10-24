import { MongoClient } from "mongodb";

async function handler(request, response) {
  if (request.method === "POST") {
    const { email, name, message } = request.body;

    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !message ||
      message.trim() === ""
    ) {
      response.status(422).json({ message: "Invalid input" });
      return;
    }

    const newMessage = {
      email,
      name,
      message,
    };

    let client;

    const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_cluster}.lw6gvuk.mongodb.net/?retryWrites=true&w=majority`;

    try {
      client = await MongoClient.connect(connectionString);
    } catch (error) {
      response.status(500).json({ message: "Failed to connect" });
      return;
    }

    const db = client.db();

    try {
      const result = await db.collection("messages").insertOne(newMessage);
      newMessage.id = result.insertedId;
      response.status(201).json({ message: "Successfully stored message!" });
    } catch (error) {
      client.close();
      response.status(500).json({ message: "Failed to store message" });
      return;
    }

    client.close();
  }
}

export default handler;
