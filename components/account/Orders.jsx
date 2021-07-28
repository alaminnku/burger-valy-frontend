import axios from "axios";
import { API_URL } from "config";
import styles from "@styles/account/orders.module.css";

const Orders = ({ orders, token }) => {
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
    await axios.post(`${API_URL}/orders`, order, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
  return (
    <div>
      {orders.length > 0 ? (
        orders.map((order) => {
          return (
            <div key={order.id} className={styles.Order}>
              <div className={styles.Main}>
                <div className={styles.TypeDate}>
                  <p className={styles.Title}>{order.Type} Burger</p>
                  <small>{new Date(order.createdAt).toDateString()}</small>
                </div>
                <ul>
                  <li>{order.Salad}x salad,</li>
                  <li>{order.Cheese}x cheese,</li>
                  <li>{order.Bacon}x bacon,</li>
                  <li>
                    {order.Patty}x {order.Type.toLowerCase()} patty,
                  </li>
                  <li>1x {order.Side} fries and drink</li>
                </ul>
              </div>

              {/* Show items to remove only when there is something to remove */}
              {Object.entries(order).filter((item) => item[1] === true).length >
              0 ? (
                <div className={styles.ItemsToRemove}>
                  <p className={styles.Title}>Removed Items</p>
                  <div className={styles.Items}>
                    {Object.entries(order)
                      .filter((item) => item[1] === true)
                      .map((el) => (
                        <p key={el[0]}>{el[0]},</p>
                      ))}
                  </div>
                </div>
              ) : (
                ""
              )}

              <div className={styles.PriceReorder}>
                <p className={styles.Title}>
                  Total amount: ${order.TotalPrice}
                </p>
                <button onClick={() => handleReorder(order)}>REORDER</button>
              </div>
            </div>
          );
        })
      ) : (
        <p>You haven't placed any order yet?</p>
      )}
    </div>
  );
};

export default Orders;
