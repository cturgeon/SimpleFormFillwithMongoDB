import { MongoClient } from "mongodb";

export async function connectToDatabase() {
  const client = await MongoClient.connect();
  return client;
}

export async function insertForm(client, collection, formData) {
  const db = client.db();
  const result = await db.collection(collection).insertOne(formData);
  return result;
}

export async function getAllFormData(client, collection, sort) {
  const db = client.db();
  const formData = await db.collection(collection).find().sort(sort).toArray();
  return formData;
}

export async function deleteFormData(client, collection, id) {
  const db = client.db();
  await db.collection(collection).deleteOne(id);
  return;
}
