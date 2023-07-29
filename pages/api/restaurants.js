import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("sample_restaurants");

    const restaurants = await db
      .collection("restaurants")
      .find({})
      .limit(20)
      .toArray();

    res.json(restaurants);
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};
