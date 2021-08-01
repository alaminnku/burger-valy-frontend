import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import styles from "@styles/account/userDetails.module.css";
import Summary from "../side/Summary";
import LinkButton from "../layout/LinkButton";
import { API_URL } from "config";
import { logout } from "@store/actions/authActions";
import axios from "axios";
import Orders from "./Orders";
import CurrentOrder from "./CurrentOrder";
import { RiArrowDropDownLine } from "react-icons/ri";
import Button from "../layout/Button";

const userDetails = ({ token }) => {
  // Router and state
  const router = useRouter();
  const dispatch = useDispatch();
  const [orderDone, setOrderDone] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const [showOrders, setShowOrders] = useState(false);
  const [reOrdered, setReOrdered] = useState([]);

  // Push to login page if there isn't a user
  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, []);

  // Get the burger from cookie
  const burger = Cookies.getJSON("burger");

  // Create a new object
  const pendingOrder = { ...burger };
  const { ingredients, side, type } = pendingOrder;

  // Submit the order
  const handleSubmitOrder = async () => {
    try {
      // Fetch the price
      const res = await axios.get(`${API_URL}/burger-price`);
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
      await axios.post(`${API_URL}/orders`, order, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Remove the burgers from cookie
      Cookies.remove("burger");
      Cookies.remove("itemsToRemove");

      // Set order done true
      setOrderDone(true);
    } catch (err) {
      console.log(err);
    }
  };

  // Logout the user
  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  return (
    <>
      {user && (
        <div className={styles.UserDetails}>
          <h3 className={styles.Title}>Welcome {user.name}!</h3>

          {/* Only show summary if orderDone is false and there is a burger in cookie */}
          {!orderDone && burger && (
            <div className={styles.PendingOrder}>
              <Summary />
              <Button text='Confirm Order' clicked={handleSubmitOrder} />
            </div>
          )}

          <div className={styles.CurrentOrder}>
            <h3 className={styles.Order}>Current orders</h3>
            <CurrentOrder
              token={token}
              reOrdered={reOrdered}
              orderDone={orderDone}
            />
          </div>

          <div className={styles.AllOrders}>
            <h3
              className={styles.Order}
              onClick={() => setShowOrders(!showOrders)}
            >
              All orders{" "}
              <RiArrowDropDownLine
                className={`${styles.Icon} ${showOrders && styles.RotateIcon}`}
              />
            </h3>
            {showOrders && (
              <Orders
                token={token}
                setReOrdered={setReOrdered}
                reOrdered={reOrdered}
                orderDone={orderDone}
              />
            )}
          </div>

          <Button
            text='LOGOUT'
            clicked={handleLogout}
            style={{
              backgroundColor: "var(--grey)",
              alignSelf: "center",
              padding: ".6rem 1.5rem",
            }}
          />
        </div>
      )}
    </>
  );
};

export default userDetails;
