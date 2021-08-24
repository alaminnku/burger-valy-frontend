import styles from "@styles/account/currentOrder.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { API_URL } from "config";
import { removeLoader, setLoader } from "@store/actions/loaderActions";
import Loader from "../layout/Loader";

const CurrentOrder = ({ token, orderDone, reOrdered }) => {
  // States
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

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

    // Sor the orders
    const orders = res.data.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    // Update the state and remove the loader
    setOrders(orders);
    setLoading(false);
  }, [orderDone, reOrdered]);

  // Get the order which is placed in last hour
  const latestOrders = orders.filter((order) => {
    if (
      new Date().getTime() / 1000 -
        new Date(order.createdAt).getTime() / 1000 <=
      3600
    ) {
      return order;
    }
  });

  let allLatestOrders;

  // Check if there is a current order and update the state
  if (latestOrders.length > 0) {
    allLatestOrders = latestOrders.map((order) => (
      <div className={styles.Order} key={order.id}>
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
        </div>
      </div>
    ));
  } else {
    allLatestOrders = (
      <small className={styles.NoOrder}>No active orders!</small>
    );
  }

  return (
    <div className={styles.Orders}>
      <h4 className={styles.Title}>Current orders</h4>
      {loading ? (
        <Loader />
      ) : (
        <div>
          {allLatestOrders}
          <small className={styles.Address}>
            <span>Please collect your orders at - </span> Thompson Street 75,
            New York City, NY 10012. USA
          </small>
        </div>
      )}
    </div>
  );
};

export default CurrentOrder;
