import Button from "../layout/Button";
import Image from "next/image";
import Cookies from "js-cookie";
import Loader from "../layout/Loader";
import axios from "axios";
import { API_URL } from "config";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { convertName } from "helpers";
import { setAlert } from "@store/actions/alertActions";

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

      const convertedText = convertName(item.name);

      // Final order
      const order = {
        name: item.name,
        quantity: item.quantity,
        totalPrice: item.quantity * price[convertedText],
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
        <Image src={item.img} width="192" height="108" />

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
