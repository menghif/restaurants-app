import clientPromise from "../lib/mongodb";

export default function Top({ restaurants }) {
  return (
    <div>
      <h1>List of ALL Restaurants</h1>
      <ul>
        {restaurants.map((restaurant) => (
          <li key={restaurant._id}>
            <h2>{restaurant.name}</h2>
            <p>{restaurant.borough}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  try {
    const client = await clientPromise;
    const db = client.db("sample_restaurants");

    const restaurants = await db.collection("restaurants").find({}).toArray();

    return {
      props: { restaurants: JSON.parse(JSON.stringify(restaurants)) },
    };
  } catch (e) {
    console.error(e);
  }
}
