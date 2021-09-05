import axios from "axios";
import { API_URL } from "config";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RiArrowDropDownLine } from "react-icons/ri";
import styles from "@styles/account/orders.module.css";
import Button from "../layout/Button";
import Loader from "../layout/Loader";
import { setAlert } from "@store/actions/alertActions";
import Alert from "../layout/Alert";

const Orders = ({ orderDone, reOrdered, setReOrdered }) => {
  // Hooks
  const dispatch = useDispatch();

  // States
  const [burgerOrders, setBurgerOrders] = useState([]);
  const [genericOrders, setGenericOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showBurgerOrders, setShowBurgerOrders] = useState(false);
  const [showGenericOrders, setShowGenericOrders] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const alerts = useSelector((state) => state.alerts);

  // Fetch the orders on render
  useEffect(async () => {
    // Start the loader
    setLoading(true);

    // Fetch burger orders
    const burgerRes = await axios.get(`${API_URL}/burgerorders/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Fetch generic orders
    const genericRes = await axios.get(`${API_URL}/genericorders/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Sort burger orders
    const burgerOrders = burgerRes.data.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    // Sort generic orders
    const genericOrders = genericRes.data.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    // Update the state and stop the loader
    setBurgerOrders(burgerOrders);
    setGenericOrders(genericOrders);
    setLoading(false);
  }, [orderDone, reOrdered]);

  // Handle burger reorder
  const handleBurgerReorder = async (order) => {
    // Delete unnecessary properties from order object
    [
      "__v",
      "_id",
      "createdAt",
      "id",
      "published_at",
      "updatedAt",
      "user",
    ].forEach((prop) => delete order[prop]);

    try {
      // Post the order to DB with token
      const res = await axios.post(`${API_URL}/burgerorders`, order, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Update reordered array with new order
      setReOrdered([...reOrdered, res.data]);
      dispatch(setAlert("Order placed successfully!", "Success"));
    } catch (err) {
      dispatch(setAlert(err.response.data.message, "Danger"));
    }
  };

  const handleGenericReorder = async (order) => {
    // Delete unnecessary fields
    [
      "__v",
      "_id",
      "createdAt",
      "id",
      "published_at",
      "updatedAt",
      "user",
    ].forEach((prop) => delete order[prop]);

    try {
      // Post the order to db
      const res = await axios.post(`${API_URL}/genericorders`, order, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Update reordered array with new order
      setReOrdered([...reOrdered, res.data]);

      // Show the alert
      dispatch(setAlert("Order placed successfully!", "Success"));
    } catch (err) {
      dispatch(setAlert(err.response.data.message, "Danger"));
    }
  };

  // Dynamic variables
  let allBurgerOrders;
  let allGenericOrders;
  let noOrders;

  // Render all the burger orders
  if (burgerOrders.length > 0) {
    allBurgerOrders = burgerOrders.map((order) => (
      <div key={order.id} className={styles.Order}>
        <div className={styles.Main}>
          <div className={styles.TypeDate}>
            <p className={styles.Title}>{order.Type} Burger</p>
            <small className={styles.Date}>
              {new Date(order.createdAt).toDateString()}
            </small>
          </div>
          <ul>
            <li>{order.Salad}x salad,</li>
            <li>{order.Cheese}x cheese,</li>
            <li>{order.Bacon}x bacon,</li>
            <li>
              {order.Patty}x {order.Type.toLowerCase()} patty,
            </li>
            <li>
              {order.Side === ""
                ? "No fries and drink"
                : `1x ${order.Side} fries and drink`}
            </li>
          </ul>
        </div>

        {/* Show items to remove only when there is something to remove */}
        {Object.entries(order).filter((item) => item[1] === true).length > 0 ? (
          <div className={styles.ItemsToRemove}>
            <p className={styles.Title}>Removed Items</p>
            <div className={styles.Items}>
              {Object.entries(order)
                .filter((item) => item[1] === true)
                .map((el, i) => (
                  <small key={el[0]}>{`${el[0]}${
                    i <
                    Object.entries(order).filter((item) => item[1] === true)
                      .length -
                      1
                      ? ","
                      : ""
                  }`}</small>
                ))}
            </div>
          </div>
        ) : (
          ""
        )}

        <div className={styles.PriceReorder}>
          <p className={styles.Title}>Total amount: ${order.TotalPrice}</p>

          <Button text='REORDER' clicked={() => handleBurgerReorder(order)} />
        </div>
      </div>
    ));
  }

  // Render all generic orders
  if (genericOrders.length > 0) {
    allGenericOrders = genericOrders.map((order) => (
      <div className={styles.Order} key={order.id}>
        <div className={styles.Main}>
          <div className={styles.TypeDate}>
            <p className={styles.Title}>{order.name}</p>
            <small className={styles.Date}>
              {new Date(order.createdAt).toDateString()}
            </small>
          </div>
          <ul>
            <li>Quantity: {order.quantity}</li>
          </ul>
        </div>

        <div className={styles.PriceReorder}>
          <p className={styles.Title}>Total amount: ${order.totalPrice}</p>
          <Button text='REORDER' clicked={() => handleGenericReorder(order)} />
        </div>
      </div>
    ));
  }

  // If there are no orders
  if (burgerOrders.length === 0 && genericOrders.length === 0) {
    noOrders = (
      <small className={styles.NoOrder}>Haven't placed any order yet?</small>
    );
  }

  return (
    <div className={styles.Orders}>
      <div className={styles.AllBurgerOrders}>
        <h4
          className={`${styles.Title} ${styles.OrdersTitle}`}
          onClick={() => setShowBurgerOrders(!showBurgerOrders)}
        >
          All burger orders{" "}
          <RiArrowDropDownLine
            className={`${styles.Icon} ${
              showBurgerOrders && styles.RotateIcon
            }`}
          />
        </h4>

        {loading ? (
          <Loader />
        ) : (
          showBurgerOrders && (
            <>
              {allBurgerOrders}
              {noOrders}
            </>
          )
        )}
      </div>

      <div>
        <h4
          className={`${styles.Title} ${styles.OrdersTitle}`}
          onClick={() => setShowGenericOrders(!showGenericOrders)}
        >
          All generic orders{" "}
          <RiArrowDropDownLine
            className={`${styles.Icon} ${
              showGenericOrders && styles.RotateIcon
            }`}
          />
        </h4>

        {loading ? (
          <Loader />
        ) : (
          showGenericOrders && (
            <>
              {allGenericOrders}
              {noOrders}
            </>
          )
        )}
      </div>
      <Alert alerts={alerts} />
    </div>
  );
};

export default Orders;
