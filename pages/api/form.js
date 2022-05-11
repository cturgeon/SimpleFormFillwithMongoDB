import { ObjectId } from "mongodb";
import {
  connectToDatabase,
  deleteFormData,
  getAllFormData,
  insertForm,
} from "../../lib/db";

export default async function handler(req, res) {
  let client;

  try {
    client = await connectToDatabase();
  } catch (error) {
    res.status(500).json({ message: "could not connect to DB!" });
    return;
  }

  if (req.method === "POST") {
    const { name, title, description, value } = req.body;

    if (!name || !title || !description) {
      res.status(422).json({ message: "Invalid inputs" });
      return;
    }
    const newData = {
      name,
      title,
      description,
      value,
    };

    let result;

    try {
      result = await insertForm(client, "form-data", newData);
      newData._id = result.insertedId;
      res.status(201).json({ message: "stored new data", message: newData });
    } catch (error) {
      client.close();
      res.status(500).json({ message: "storing new data failed" });
      return;
    }
  }

  if (req.method === "GET") {
    try {
      const formData = await getAllFormData(client, "form-data", { _id: -1 });
      res
        .status(201)
        .json({ message: "got all form data", formData: formData });
    } catch (error) {
      res.status(500).json({ message: "getting form data failed" });
    }
  }

  if (req.method === "DELETE") {
    try {
      await deleteFormData(client, "form-data", { _id: ObjectId(req.body.id) });
      res.status(201).json({ message: "deleted form from database" });
    } catch (error) {
      res.status(500).json({ message: "could not delete form" });
    }
  }

  client.close();
}
