import styles from "@styles/dashboard/currentGenericOrder.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "config";
import Loader from "../layout/Loader";
import { useSelector } from "react-redux";

const CurrentGenericOrder = ({ orderDone, reOrdered }) => {
  // States
  const [genericOrders, setGenericOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);

  // Fetch the orders on render
  useEffect(async () => {
    // Start the loader
    setLoading(true);

    // Fetch generic orders
    const genericRes = await axios.get(`${API_URL}/genericorders/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Sort generic orders
    const genericOrders = genericRes.data.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    // Update the state and remove the loader
    setGenericOrders(genericOrders);
    setLoading(false);
  }, [orderDone, reOrdered]);

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
  let allLatestGenericOrders;

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
      <span>Please collect your orders at - </span> 68/5 Dorga Road, Opposite of
      Lions School Khulna, Bangladesh
    </small>
  );

  return (
    <div className={styles.CurrentGenericOrders}>
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
  );
};

export default CurrentGenericOrder;
