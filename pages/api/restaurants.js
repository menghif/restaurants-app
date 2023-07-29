import { clientPromise } from "../../lib/mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("sample_restaurants");

    const restaurants = await db
      .collection("restaurants")
      .find({})
      .limit(20)
      .toArray();

    res.status(200).json(restaurants);
  } catch (e) {
    console.error(e); // Log the error to the console
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
}
