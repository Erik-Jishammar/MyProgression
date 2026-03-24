import {Collection} from "mongodb";
import {client} from "../config/db.js";
import type {User} from "../../shared/types.js";


let collection: Collection<User>;

export async function getCollection(): Promise<Collection<User>> {
    if (!collection) {
        collection = client.db("workout").collection("users");
    }
    return collection;
}
// helper functions
// check if email already exists
export async function findUserByEmail(email: string): Promise<User | null> {
    const collection = await getCollection();
    return collection.findOne({ email });
}
// create user
export async function createUser(user: User): Promise<void> {
  const collection = await getCollection();
  await collection.insertOne(user);
}