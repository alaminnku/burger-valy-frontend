import axios from "axios";
import { API_URL } from "config";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "@styles/account/allGenericOrders.module.css";
import Button from "../layout/Button";
import Loader from "../layout/Loader";
import { setAlert } from "@store/actions/alertActions";
import Alert from "../layout/Alert";
import Link from "next/link";

const AllGenericOrders = ({ orderDone, reOrdered, setReOrdered }) => {
  // Hooks
  const dispatch = useDispatch();

  // States
  const [genericOrders, setGenericOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const alerts = useSelector((state) => state.alerts);

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

    // Update the state and stop the loader
    setGenericOrders(genericOrders);
    setLoading(false);
  }, [orderDone, reOrdered]);

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
  let allGenericOrders;

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

  return (
    <>
      <div className={styles.AllGenericOrders}>
        {loading ? (
          <Loader />
        ) : (
          <>
            {genericOrders.length > 0 ? (
              allGenericOrders
            ) : (
              <small className={styles.NoOrder}>
                Haven't ordered any item yet? Order{" "}
                <Link href='/menu'>here</Link>
              </small>
            )}
          </>
        )}
      </div>
      <Alert alerts={alerts} />
    </>
  );
};

export default AllGenericOrders;
