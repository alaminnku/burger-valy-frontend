import Button from "../layout/Button";
import Summary from "../side/Summary";
import axios from "axios";
import { API_URL } from "config";
import { useState } from "react";
import Loader from "../layout/Loader";
import { setAlert } from "@store/actions/alertActions";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie";
import styles from "@styles/account/pendingBurgerOrder.module.css";

const PendingBurgerOrder = ({ setOrderDone }) => {
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
      setOrderDone(true);
      setLoading(false);
      dispatch(setAlert("Order placed successfully!", "Success"));
    } catch (err) {
      console.log(err);
      setLoading(false);
      // dispatch(setAlert(err.response.data.message, "Danger"));
    }
  };

  return (
    <div className={styles.PendingBurgerOrder}>
      <Summary />
      <Button
        text={loading ? <Loader /> : "Confirm Order"}
        clicked={handleSubmitBurgerOrder}
      />
    </div>
  );
};

export default PendingBurgerOrder;
