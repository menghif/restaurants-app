import clientPromise from "../lib/mongodb";
import DashboardLayout from "./layout";

// add bootstrap css
import "bootstrap/dist/css/bootstrap.css";

export default function Restaurants({ restaurants }) {
  return (
    <div>
      <DashboardLayout />
      <h1>List of Restaurants</h1>
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

export async function getServerSideProps() {
  try {
    const client = await clientPromise;
    const db = client.db("sample_restaurants");

    const restaurants = await db
      .collection("restaurants")
      .find({})
      .limit(20)
      .toArray();

    return {
      props: { restaurants: JSON.parse(JSON.stringify(restaurants)) },
    };
  } catch (e) {
    console.error(e);
  }
}
