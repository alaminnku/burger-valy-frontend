import styles from "@styles/account/currentOrder.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "config";
import Loader from "../layout/Loader";
import { useSelector } from "react-redux";

const CurrentOrder = ({ orderDone, reOrdered }) => {
  // States
  const [burgerOrders, setBurgerOrders] = useState([]);
  const [genericOrders, setGenericOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);

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

    // Update the state and remove the loader
    setBurgerOrders(burgerOrders);
    setGenericOrders(genericOrders);
    setLoading(false);
  }, [orderDone, reOrdered]);

  // Get the burger orders which is placed in last hour
  const latestBurgerOrders = burgerOrders.filter((order) => {
    if (
      new Date().getTime() / 1000 -
        new Date(order.createdAt).getTime() / 1000 <=
      3600
    ) {
      return order;
    }
  });

  // Get the generic orders which is placed in last hour
  const latestGenericOrders = genericOrders.filter((order) => {
    if (
      new Date().getTime() / 1000 -
        new Date(order.createdAt).getTime() / 1000 <=
      3600
    ) {
      return order;
    }
  });

  // Dynamic variables
  let allLatestBurgerOrders;
  let allLatestGenericOrders;

  // Render the order if there are current burger orders
  if (latestBurgerOrders.length > 0) {
    allLatestBurgerOrders = latestBurgerOrders.map((order) => (
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
  }

  // Render the order if there are current generic orders
  if (latestGenericOrders.length > 0) {
    allLatestGenericOrders = latestGenericOrders.map((order) => (
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

        <div>
          <p className={styles.Title}>Total amount: ${order.totalPrice}</p>
        </div>
      </div>
    ));
  }

  const address = (
    <small className={styles.Address}>
      <span>Please collect your orders at - </span> Thompson Street 75, New York
      City, NY 10012. USA
    </small>
  );

  return (
    <div className={styles.Orders}>
      <div className={styles.CurrentBurgerOrders}>
        <h4 className={styles.MainTitle}>Active orders (burger)</h4>
        {loading ? (
          <Loader />
        ) : (
          <>
            {allLatestBurgerOrders}
            {latestBurgerOrders.length > 0 ? (
              address
            ) : (
              <small className={styles.NoOrder}>
                You don't have any burgers in order!
              </small>
            )}
          </>
        )}
      </div>

      <div className={styles.CurrentGenericOrders}>
        <h4 className={styles.MainTitle}>Active orders (generic)</h4>
        {loading ? (
          <Loader />
        ) : (
          <>
            {allLatestGenericOrders}
            {latestGenericOrders.length > 0 ? (
              address
            ) : (
              <small className={styles.NoOrder}>
                You don't have any items in order!
              </small>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CurrentOrder;
