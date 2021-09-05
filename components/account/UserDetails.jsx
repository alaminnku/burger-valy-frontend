import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import styles from "@styles/account/userDetails.module.css";
import Summary from "../side/Summary";
import { API_URL } from "config";
import { logout } from "@store/actions/authActions";
import axios from "axios";
import Orders from "./Orders";
import CurrentOrder from "./CurrentOrder";
import Button from "../layout/Button";
import Loader from "../layout/Loader";
import Image from "next/image";
import Alert from "../layout/Alert";
import { setAlert } from "@store/actions/alertActions";

const userDetails = () => {
  // Router
  const router = useRouter();
  const dispatch = useDispatch();

  // Statues
  const [orderDone, setOrderDone] = useState(false);
  const { token, user } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.loader);
  const [loader, setLoader] = useState(false);
  const [reOrdered, setReOrdered] = useState([]);
  const alerts = useSelector((state) => state.alerts);

  // Push to login page if there isn't a user
  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, []);

  // Get the burger from cookie
  const burger = Cookies.getJSON("burger");
  const item = Cookies.getJSON("item");

  // Create a new object
  const pendingOrder = { ...burger };
  const { ingredients, side, type } = pendingOrder;

  // Submit the order
  const handleSubmitBurgerOrder = async () => {
    try {
      // Set the loader
      setLoader(true);

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
      setLoader(false);
      dispatch(setAlert("Order placed successfully!", "Success"));
    } catch (err) {
      setLoader(false);
      dispatch(setAlert(err.response.data.message, "Danger"));
    }
  };

  // Submit pending generic order
  const handleSubmitGenericOrder = async () => {
    try {
      setLoader(true);

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
      setLoader(false);
      dispatch(setAlert("Order placed successfully!", "Success"));
    } catch (err) {
      setLoader(false);
      dispatch(setAlert(err.response.data.message, "Danger"));
    }
  };

  // Logout the user
  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  return (
    <>
      {token && (
        <div className={styles.UserDetails}>
          <h3 className={`${styles.Title} ${styles.MainTitle}`}>
            Welcome {user.name}!
          </h3>

          {/* Only show summary if orderDone is false and there is a burger in cookie */}
          {!orderDone && burger && (
            <div className={styles.PendingOrder}>
              <Summary />
              <Button
                text={loader ? <Loader /> : "Confirm Order"}
                clicked={handleSubmitBurgerOrder}
              />
            </div>
          )}

          {!orderDone && item && (
            <div className={styles.PendingOrder}>
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
                text={loader ? <Loader /> : "Confirm Order"}
                clicked={handleSubmitGenericOrder}
              />
            </div>
          )}

          <div className={styles.CurrentOrder}>
            <CurrentOrder reOrdered={reOrdered} orderDone={orderDone} />
          </div>

          <div className={styles.AllOrders}>
            <Orders
              setReOrdered={setReOrdered}
              reOrdered={reOrdered}
              orderDone={orderDone}
            />
          </div>

          <Button
            text={loading ? <Loader /> : "Log Out"}
            clicked={handleLogout}
            style={{
              backgroundColor: "var(--grey)",
              alignSelf: "center",
              padding: ".6rem 1.5rem",
            }}
          />
        </div>
      )}
      <Alert alerts={alerts} />
    </>
  );
};

export default userDetails;
