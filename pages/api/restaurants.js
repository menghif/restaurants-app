import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("sample_restaurants");

    const { page, borough } = req.query;
    const itemsPerPage = 10;
    const skip = (parseInt(page) - 1) * itemsPerPage;

    let query = {};
    if (borough) {
      query = { borough: borough };
    }

    // Get total count for pagination
    const totalCount = await db.collection("restaurants").countDocuments(query);

    const restaurants = await db
      .collection("restaurants")
      .find(query)
      .skip(skip)
      .limit(itemsPerPage)
      .toArray();

    res.json({
      restaurants,
      totalCount,
      totalPages: Math.ceil(totalCount / itemsPerPage),
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
};
