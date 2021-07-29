import Card from "./Card";
import Button from "../layout/Button";
import { useSelector } from "react-redux";
import styles from "@styles/side/cards.module.css";
import Cookies from "js-cookie";
import axios from "axios";
import { API_URL } from "config";
import router from "next/router";
import ToRemove from "./ToRemove";

const Cards = ({ token }) => {
  // States
  const { burger } = useSelector((state) => state.burger);
  const { user } = useSelector((state) => state.auth);

  // Set the final burger to cookie
  const handleSubmitOrder = async () => {
    // Save the burger to cookie, push to register and return if the user isn't logged in
    if (!user) {
      Cookies.set("burger", burger);
      router.push("/register");
      return;
    }

    // If there is a user
    try {
      // Fetch the price
      const res = await axios.get(`${API_URL}/burger-price`);
      const data = res.data;

      // Get the price only
      const { patty, cheese, salad, bacon } = data;

      // Get the ingredients and side
      const { ingredients, side, type } = burger;

      // Destructure ingredients
      const { Patty, Cheese, Salad, Bacon } = ingredients;

      // Get the items from cookies
      const itemsToRemove = Cookies.getJSON("itemsToRemove");

      // Calculate total price
      const totalPrice =
        4 + Patty * patty + Cheese * cheese + Salad * salad + Bacon * bacon;

      // Build the final order
      const order = {
        ...ingredients,
        Side: side,
        TotalPrice: side ? totalPrice + data[side] : totalPrice,
        Type: type,
        ...itemsToRemove,
      };

      // Post the order to db
      await axios.post(`${API_URL}/orders`, order, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Remove the burger from cookie
      Cookies.remove("burger");
      Cookies.remove("itemsToRemove");

      // Push to account after submit
      router.push("/account");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.Cards}>
      <div>
        <Card
          title={
            <>
              Add <span>small</span> drink and fries +$6
            </>
          }
          items='1x small fries and 250ml drink'
          side='small'
          added={burger.side === "small" && true}
        />
        <Card
          title={
            <>
              Add <span>medium</span> drink and fries +$8
            </>
          }
          items='1x medium fries and 350ml drink'
          side='medium'
          added={burger.side === "medium" && true}
        />
        <Card
          title={
            <>
              Add <span>large</span> drink and fries +$10
            </>
          }
          items='1x large fries and 450ml drink'
          side='large'
          added={burger.side === "large" && true}
        />
      </div>
      <ToRemove />

      <Button text='ORDER NOW' clicked={handleSubmitOrder} />
    </div>
  );
};

export default Cards;
