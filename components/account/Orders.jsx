import axios from "axios";
import { API_URL } from "config";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RiArrowDropDownLine } from "react-icons/ri";
import styles from "@styles/account/orders.module.css";
import Button from "../layout/Button";
import { removeLoader, setLoader } from "@store/actions/loaderActions";
import Loader from "../layout/Loader";

const Orders = ({ token, orderDone, reOrdered, setReOrdered }) => {
  const dispatch = useDispatch();

  // States
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showOrders, setShowOrders] = useState(false);

  // Fetch the orders on render
  useEffect(async () => {
    // Start the loader
    setLoading(true);

    // Fetch the orders
    const res = await axios.get(`${API_URL}/orders/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Sort the orders
    const orders = res.data.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    // Update the state and stop the loader
    setOrders(orders);
    setLoading(false);
  }, [orderDone, reOrdered]);

  // Handle reorder
  const handleReorder = async (order) => {
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
      const res = await axios.post(`${API_URL}/orders`, order, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Update reordered array with new order
      setReOrdered([...reOrdered, res.data]);
    } catch (err) {
      console.log(err);
    }
  };

  let allOrders;

  if (orders.length > 0) {
    allOrders = orders.map((order) => (
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

          <Button text="REORDER" clicked={() => handleReorder(order)} />
        </div>
      </div>
    ));
  } else {
    allOrders = (
      <small className={styles.NoOrder}>Haven't placed any order yet?</small>
    );
  }

  return (
    <div className={styles.Orders}>
      <h4
        className={`${styles.Title} ${styles.OrdersTitle}`}
        onClick={() => setShowOrders(!showOrders)}
      >
        All orders{" "}
        <RiArrowDropDownLine
          className={`${styles.Icon} ${showOrders && styles.RotateIcon}`}
        />
      </h4>

      {loading ? <Loader /> : showOrders && allOrders}
    </div>
  );
};

export default Orders;
