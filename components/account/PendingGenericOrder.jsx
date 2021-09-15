import Button from "../layout/Button";
import Image from "next/image";
import Cookies from "js-cookie";
import Loader from "../layout/Loader";
import axios from "axios";
import { API_URL } from "config";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAlert } from "@store/actions/alertActions";
import styles from "@styles/account/pendingGenericOrder.module.css";

const PendingGenericOrder = ({ setOrderDone }) => {
  // Hooks
  const dispatch = useDispatch();

  // States
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);

  // Get the item from cookie
  const item = Cookies.getJSON("item");

  // Submit pending generic order
  const handleSubmitGenericOrder = async () => {
    try {
      setLoading(true);

      // Fetch the price
      const res = await axios.get(`${API_URL}/price`);
      const price = res.data;

      // Get the first name and rest of the words separated
      const [firstWord, ...restWords] = item.name.split(" ");

      // Get the name that matches the price
      const name = `${firstWord.replace(
        firstWord[0],
        firstWord[0].toLowerCase()
      )}${restWords.join("")}`;

      // Final order
      const order = {
        name: item.name,
        quantity: item.quantity,
        totalPrice: item.quantity * price[name],
      };

      // Post the order to db
      await axios.post(`${API_URL}/genericorders`, order, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Remove the item from cookies
      Cookies.remove("item");

      // Update states
      setOrderDone(true);
      setLoading(false);
      dispatch(setAlert("Order placed successfully!", "Success"));
    } catch (err) {
      setLoading(false);
      dispatch(setAlert(err.response.data.message, "Danger"));
    }
  };

  return (
    <div className={styles.PendingGenericOrder}>
      <div className={styles.Item}>
        <Image src={item.img} width='192' height='108' />

        <div className={styles.Content}>
          <p>Your order with</p>
          <ul>
            <li>
              <span>Name</span>: {item.name}
            </li>
            <li>
              <span>Quantity</span>: {item.quantity}
            </li>
          </ul>

          <p>
            <span>Total price</span>: ${item.totalPrice}
          </p>
        </div>
      </div>

      <Button
        text={loading ? <Loader /> : "Confirm Order"}
        clicked={handleSubmitGenericOrder}
      />
    </div>
  );
};

export default PendingGenericOrder;
