import Button from "../layout/Button";
import Summary from "../side/Summary";
import axios from "axios";
import { API_URL } from "config";
import { useState } from "react";
import Loader from "../layout/Loader";
import { setAlert } from "@store/actions/alertActions";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie";
import styles from "@styles/dashboard/pendingOrders.module.css";

const PendingOrders = ({ orderDone, setOrderDone }) => {
  // Hooks
  const dispatch = useDispatch();

  // States
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const { burger } = useSelector((state) => state.burger);

  // Create a new object
  const pendingOrder = { ...burger };
  const { ingredients, side, type } = pendingOrder;

  // Submit the order
  const handleSubmitBurgerOrder = async () => {
    try {
      // Set the loader
      setLoading(true);

      // Fetch the price
      const res = await axios.get(`${API_URL}/price`);
      const data = res.data;

      // Get the price only
      const { patty, cheese, salad, bacon, small, medium, large } = data;

      // Get the ingredients and side
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

      // Remove the burgers from cookie
      Cookies.remove("burger");
      Cookies.remove("itemsToRemove");

      // Set order done true
      setOrderDone({ ...orderDone, burger: true });
      setLoading(false);
      dispatch(setAlert("Order placed successfully!", "Success"));
    } catch (err) {
      console.log(err);
      setLoading(false);
      dispatch(setAlert(err.response.data.message, "Danger"));
    }
  };

  // Get the item from cookie
  const item = Cookies.getJSON("item");

  // Submit pending generic order
  const handleSubmitGenericOrder = async () => {
    try {
      setLoading(true);

      // Post the order to db
      await axios.post(`${API_URL}/genericorders`, item, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Remove the item from cookies
      Cookies.remove("item");

      // Update states
      setOrderDone({ ...orderDone, generic: true });
      setLoading(false);
      dispatch(setAlert("Order placed successfully!", "Success"));
    } catch (err) {
      setLoading(false);
      dispatch(setAlert(err.response.data.message, "Danger"));
    }
  };

  console.log(orderDone);

  return (
    <div className={styles.PendingOrders}>
      {!orderDone.burger && (
        <div className={styles.Burger}>
          <Summary />
          <Button
            text={loading ? <Loader /> : "Confirm order"}
            clicked={handleSubmitBurgerOrder}
          />
        </div>
      )}

      {!orderDone.generic && (
        <div className={styles.Generic}>
          <div className={styles.Item}>
            <Image
              src={item.img}
              width="192"
              height="108"
              layout="responsive"
            />

            <div className={styles.Content}>
              <p>Your order with:</p>

              <ul>
                <li>Name: {item.name}</li>
                <li>Quantity: {item.quantity}</li>
              </ul>

              <p>
                Total price: <span>${item.totalPrice}</span>
              </p>
            </div>
          </div>
          <Button
            text={loading ? <Loader /> : "Confirm order"}
            clicked={handleSubmitGenericOrder}
          />
        </div>
      )}
    </div>
  );
};

export default PendingOrders;
