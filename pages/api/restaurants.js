import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("sample_restaurants");

    const { page, borough } = req.query; // Extract the 'page' parameter from the query

    // Determine the number of items to skip based on the page number
    const itemsPerPage = 10;
    const skip = (parseInt(page) - 1) * itemsPerPage;

    let query = {};
    if (borough) {
      query = { borough: borough };
    }

    const restaurants = await db
      .collection("restaurants")
      .find(query)
      .skip(skip) // Skip the appropriate number of items based on the page
      .limit(itemsPerPage)
      .toArray();

    res.json(restaurants);
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};
