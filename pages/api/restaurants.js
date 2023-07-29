// import clientPromise from "../../lib/mongodb";

// export default async (req, res) => {
//   try {
//     const client = await clientPromise;
//     const db = client.db("sample_restaurants");

//     const restaurants = await db
//       .collection("restaurants")
//       .find({})
//       .limit(20)
//       .toArray();

//     res.json(restaurants);
//   } catch (e) {
//     console.error(e);
//     throw new Error(e).message;
//   }
// };

import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("sample_restaurants");

    const { page } = req.query; // Extract the 'page' parameter from the query

    // Determine the number of items to skip based on the page number
    const itemsPerPage = 10;
    const skip = (parseInt(page) - 1) * itemsPerPage;

    const restaurants = await db
      .collection("restaurants")
      .find({})
      .skip(skip) // Skip the appropriate number of items based on the page
      .limit(itemsPerPage)
      .toArray();

    res.json(restaurants);
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};
