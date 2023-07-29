import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("sample_restaurants");

    const { id } = req.query;

    let query = {};
    if (id) {
      query = { restaurant_id: id };
    }

    const restaurants = await db.collection("restaurants").findOne(query);

    res.json(restaurants);
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};
