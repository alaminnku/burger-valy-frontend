import Card from "./Card";
import LinkButton from "../layout/LinkButton";
import { useSelector } from "react-redux";
import styles from "@styles/side/cards.module.css";
import Cookies from "js-cookie";
import axios from "axios";
import { API_URL } from "config";
import router from "next/router";

const Cards = () => {
  const { burger } = useSelector((state) => state.burger);
  const { user } = useSelector((state) => state.auth);

  // Set the final burger to cookie
  const handleCreateFinalBurger = async () => {
    if (!user) {
      Cookies.set("finalBurger", burger);
      router.push("/register");
      return;
    }

    // If there is a user
    try {
      // Fetch the price
      const res = await axios.get(`${API_URL}/burger-price`);
      const data = res.data;

      // Get the price only
      const { patty, cheese, salad, bacon, small, medium, large } = data;

      // Get the ingredients and side
      const { ingredients, side, type } = burger;

      // Destructure ingredients
      const { Patty, Cheese, Salad, Bacon } = ingredients;

      // Calculate total price
      const totalPrice =
        4 +
        Patty * patty +
        Cheese * cheese +
        Salad * salad +
        Bacon * bacon +
        data[side];

      // Build the final order
      const order = {
        ...ingredients,
        Side: side,
        TotalPrice: totalPrice,
        Type: type,
      };

      // Post the order to db
      await axios.post(`${API_URL}/orders`, order);

      Cookies.remove("burger");

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
        />
        <Card
          title={
            <>
              Add <span>medium</span> drink and fries +$8
            </>
          }
          items='1x medium fries and 350ml drink'
          side='medium'
        />
        <Card
          title={
            <>
              Add <span>large</span> drink and fries +$10
            </>
          }
          items='1x large fries and 450ml drink'
          side='large'
        />
      </div>
      <LinkButton text='ORDER NOW' href='#' clicked={handleCreateFinalBurger} />
    </div>
  );
};

export default Cards;
