import axios from "axios";
import { API_URL } from "config";
import { useEffect, useState } from "react";
import styles from "@styles/account/orders.module.css";
import Button from "../layout/Button";

const Orders = ({ token, orderDone, reOrdered, setReOrdered }) => {
  const [orders, setOrders] = useState([]);

  // Fetch the orders on render
  useEffect(async () => {
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

    // Update the state
    setOrders(orders);
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

    // Post the order to DB with token
    const res = await axios.post(`${API_URL}/orders`, order, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Update reordered array with new order
    setReOrdered([...reOrdered, res.data]);
  };

  return (
    <div className={styles.Orders}>
      {orders.length > 0 ? (
        orders.map((order) => {
          return (
            <div key={order.id} className={styles.Order}>
              <div className={styles.Main}>
                <div className={styles.TypeDate}>
                  <h4 className={styles.Title}>{order.Type} Burger</h4>
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
              {Object.entries(order).filter((item) => item[1] === true).length >
              0 ? (
                <div className={styles.ItemsToRemove}>
                  <h4 className={styles.Title}>Removed Items</h4>
                  <div className={styles.Items}>
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
                </div>
              ) : (
                ""
              )}

              <div className={styles.PriceReorder}>
                <h4 className={styles.Title}>
                  Total amount: ${order.TotalPrice}
                </h4>

                <Button text='REORDER' clicked={() => handleReorder(order)} />
              </div>
            </div>
          );
        })
      ) : (
        <small className={styles.NoOrder}>Haven't placed any order yet?</small>
      )}
    </div>
  );
};

export default Orders;
