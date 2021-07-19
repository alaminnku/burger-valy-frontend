import axios from "axios";
import { API_URL } from "config";
import Cookies from "js-cookie";
import Cards from "@/components/home/Cards";

export default function Home({ price }) {
  // Set the price in cookie
  Cookies.set("price", price, { sameSite: "strict" });

  return (
    <>
      <Cards />
    </>
  );
}

// Get the price on build
export async function getStaticProps() {
  const res = await axios.get(`${API_URL}/burger-price`);
  const data = res.data;

  // Get the price only
  const { patty, cheese, salad, bacon, small, medium, large } = data;

  // Price object
  const price = {
    patty,
    cheese,
    salad,
    bacon,
    small,
    medium,
    large,
  };

  return {
    props: { price },
  };
}
