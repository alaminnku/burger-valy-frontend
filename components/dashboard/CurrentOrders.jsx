import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "config";
import Loader from "../layout/Loader";
import { useSelector } from "react-redux";
import styles from "@styles/dashboard/currentOrders.module.css";

const CurrentOrders = ({ orderDone, reOrdered }) => {
  // States
  const [allOrders, setAllOrders] = useState([]);
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

    // Burger orders
    const burgerOrders = burgerRes.data;

    // Fetch generic orders
    const genericRes = await axios.get(`${API_URL}/genericorders/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Generic orders
    const genericOrders = genericRes.data;

    // Update the state and remove the loader
    setAllOrders([...burgerOrders, ...genericOrders]);
    setLoading(false);
  }, [orderDone, reOrdered]);

  // Get the orders which is placed in last hour
  const latestOrders = allOrders.filter((order) => {
    if (
      new Date().getTime() / 1000 -
        new Date(order.createdAt).getTime() / 1000 <=
      3600
    ) {
      return order;
    }
  });

  // Current orders markup
  let latestOrdersMarkup;

  // Render the current orders
  if (latestOrders.length > 0) {
    latestOrdersMarkup = latestOrders
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .map((order) => {
        return (
          <div className={styles.Order} key={order.id}>
            {order.Type === "Beef" ||
            order.Type == "Chicken" ||
            order.Type === "Cheddar" ||
            order.Type === "Vegetable" ? (
              <>
                {/* Burger order */}
                <div>
                  <div className={styles.Item}>
                    <p>{order.Type} burger</p>
                    <small>{new Date(order.createdAt).toDateString()}</small>
                  </div>

                  <div className={styles.Item}>
                    <ul>
                      <li>Salad: {order.Salad},</li>
                      <li>Cheese: {order.Cheese},</li>
                      <li>Bacon: {order.Bacon},</li>
                      <li>
                        {order.Type} patty: {order.Patty},
                      </li>
                      <li>
                        {order.Side === ""
                          ? "No fries and drink"
                          : `One ${order.Side} fries and drink`}
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Show items to remove only when there is something to remove */}
                {Object.entries(order).filter((item) => item[1] === true)
                  .length > 0 ? (
                  <div className={styles.Item}>
                    <p>Removed items</p>
                    {Object.entries(order)
                      .filter((item) => item[1] === true)
                      .map((el, i) => (
                        <small key={el[0]}>{`${el[0]}${
                          i <
                          Object.entries(order).filter(
                            (item) => item[1] === true
                          ).length -
                            1
                            ? ","
                            : ""
                        }`}</small>
                      ))}
                  </div>
                ) : (
                  ""
                )}

                <div className={styles.TotalPrice}>
                  <p>
                    Total amount: <span>${order.TotalPrice}</span>
                  </p>
                </div>
              </>
            ) : (
              <>
                {/* Generic order */}
                <div>
                  <div className={styles.Item}>
                    <p>{order.name}</p>
                    <small>{new Date(order.createdAt).toDateString()}</small>
                  </div>

                  <div className={styles.Item}>
                    <small>Quantity: {order.quantity}</small>
                  </div>
                </div>

                <div className={styles.TotalPrice}>
                  <p>
                    Total amount: <span>${order.totalPrice}</span>
                  </p>
                </div>
              </>
            )}
          </div>
        );
      });
  }

  const address = (
    <p className={styles.Address}>
      Please collect your orders from: 135/7a, Opposite of Khulna University
      Khulna, Bangladesh
    </p>
  );

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {latestOrdersMarkup}
          {latestOrders.length > 0 ? (
            address
          ) : (
            <p className={styles.NoOrder}>You don't have any active orders!</p>
          )}
        </>
      )}
    </>
  );
};

export default CurrentOrders;
