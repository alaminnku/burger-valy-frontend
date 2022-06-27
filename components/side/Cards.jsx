import Card from "./Card";
import Button from "../layout/Button";
import { useSelector } from "react-redux";
import styles from "@styles/side/cards.module.css";
import Cookies from "js-cookie";
import axios from "axios";
import { API_URL } from "config";
import router from "next/router";
import ToRemove from "./ToRemove";
import { useState } from "react";
import Loader from "../layout/Loader";
import Alert from "../layout/Alert";
import { useDispatch } from "react-redux";
import { setAlert } from "@store/actions/alertActions";

const Cards = () => {
  // Hooks
  const dispatch = useDispatch();

  // States
  const { burger } = useSelector((state) => state.burger);
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const alerts = useSelector((state) => state.alerts);

  // Set the final burger to cookie
  const handleSubmitOrder = async () => {
    // Save the burger to cookie, push to register and return if the user isn't logged in
    if (!token) {
      Cookies.set("burger", burger);
      router.push("/register");
      return;
    }

    // If there is a user
    try {
      // Start the laoder
      setLoading(true);

      // Fetch the price
      const res = await axios.get(`${API_URL}/price`);
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
      await axios.post(`${API_URL}/burgerorders`, order, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Remove the burger from cookie
      Cookies.remove("burger");
      Cookies.remove("itemsToRemove");

      // Remove the loader
      setLoading(false);

      // Show the message
      dispatch(setAlert("Order placed successfully!", "Success"));
      // Push to account after submit
      router.push("/dashboard");
    } catch (err) {
      console.log(err);

      // Remove the loader
      setLoading(false);
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
          items="1x small fries and 250ml drink"
          side="small"
          added={burger.side === "small" && true}
        />
        <Card
          title={
            <>
              Add <span>medium</span> drink and fries +$8
            </>
          }
          items="1x medium fries and 350ml drink"
          side="medium"
          added={burger.side === "medium" && true}
        />
        <Card
          title={
            <>
              Add <span>large</span> drink and fries +$10
            </>
          }
          items="1x large fries and 450ml drink"
          side="large"
          added={burger.side === "large" && true}
        />
      </div>

      <ToRemove />

      <Button
        text={loading ? <Loader /> : "Order now"}
        clicked={handleSubmitOrder}
      />

      <Alert alerts={alerts} />
    </div>
  );
};

export default Cards;
