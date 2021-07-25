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

const userDetails = ({ token, orders }) => {
  console.log(orders);
  // Router and state
  const router = useRouter();
  const dispatch = useDispatch();
  const [orderDone, setOrderDone] = useState(false);
  const { user } = useSelector((state) => state.auth);

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
          <h4>Welcome {user.name}</h4>
          {/* Only show summary if orderDone is false and there is a burger in cookie */}
          {!orderDone && burger && (
            <div>
              <Summary />
              <LinkButton
                href='#'
                text='Confirm Order'
                clicked={handleSubmitOrder}
              />
            </div>
          )}

          <p>Your orders</p>
          {orders.map((order) => {
            // Get the items to remove from order
            const { mayo, ketchup, lettuce, mustard, onions, pickles, tomato } =
              order;

            // Create an object
            const items = {
              mayo,
              ketchup,
              lettuce,
              mustard,
              onions,
              pickles,
              tomato,
            };

            // Return an array with the key when it's value is true
            const itemsToRemove = Object.entries(items).filter((item) => {
              if (item[1] === true) {
                return item[0];
              }
            });

            return (
              <div key={order.id}>
                <p>{order.Type} Burger</p>
                <ul>
                  <li>{order.Salad}x Salad</li>
                  <li>{order.Cheese}x Cheese</li>
                  <li>{order.Bacon}x Bacon</li>
                  <li>
                    {order.Patty}x {order.Type} patty
                  </li>
                  <li>1 {order.Side} fries and drink</li>
                  <li>Items To Remove</li>
                  {itemsToRemove.map((item) => (
                    <li key={Math.random(10)}>{item}</li>
                  ))}
                </ul>
                <p>Total ${order.TotalPrice}</p>
                <hr />
              </div>
            );
          })}

          <LinkButton text='LOGOUT' href='#' clicked={handleLogout} />
        </div>
      )}
    </>
  );
};

export default userDetails;
