import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import styles from "@styles/account/userDetails.module.css";
import Summary from "../side/Summary";
import LinkButton from "../layout/LinkButton";
import { API_URL } from "config";
import axios from "axios";

const userDetails = () => {
  const [orderDone, setOrderDone] = useState(false);

  // Router and state
  const router = useRouter();
  const { user } = useSelector((state) => state.auth);

  // Push to login page if there isn't a user
  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  });

  // Get the burger from cookie
  const finalBurger = Cookies.getJSON("finalBurger");

  // Create a new object
  const pendingOrder = { ...finalBurger };
  const { ingredients, side, type } = pendingOrder;

  const handleConfirmOrder = async () => {
    try {
      // Fetch the price
      const res = await axios.get(`${API_URL}/burger-price`);
      const data = res.data;

      // Get the price only
      const { patty, cheese, salad, bacon, small, medium, large } = data;

      // Get the ingredients and side
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

      // Remove the burgers from cookie
      Cookies.remove("finalBurger");
      Cookies.remove("burger");

      // Set order done true
      setOrderDone(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {user && (
        <div className={styles.UserDetails}>
          <h4>Welcome {user.name}</h4>
          {/* Only show summary if orderDone is false and there is a burger in cookie */}
          {!orderDone && finalBurger && (
            <div>
              <Summary />
              <LinkButton
                href='#'
                text='Confirm Order'
                clicked={handleConfirmOrder}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default userDetails;
