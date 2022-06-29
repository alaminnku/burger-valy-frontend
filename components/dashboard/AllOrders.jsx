import axios from "axios";
import { API_URL } from "config";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../layout/Button";
import Loader from "../layout/Loader";
import { setAlert } from "@store/actions/alertActions";
import Alert from "../layout/Alert";
import Link from "next/link";
import styles from "@styles/dashboard/allOrders.module.css";

const AllOrders = ({ orderDone, reOrdered, setReOrdered }) => {
  // Hooks
  const dispatch = useDispatch();

  // States
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(false);
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

    // Update the state and stop the loader
    setAllOrders([...burgerOrders, ...genericOrders]);
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

  // Handle generic item reorder
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
      dispatch(setAlert("Order placed successfully!", "Success"));
    } catch (err) {
      dispatch(setAlert(err.response.data.message, "Danger"));
    }
  };

  // All orders markup
  let allOrdersMarkup;

  // Render all the orders
  if (allOrders.length > 0) {
    allOrdersMarkup = allOrders
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .map((order) => {
        return (
          <div key={order.id} className={styles.Order}>
            {order.Type === "Beef" ||
            order.Type == "Chicken" ||
            order.Type === "Cheddar" ||
            order.Type === "Vegetable" ? (
              <>
                {/* Burger order markup */}
                <div className={styles.Main}>
                  <div className={styles.TypeDate}>
                    <p className={styles.Title}>{order.Type} burger</p>
                    <small className={styles.Date}>
                      {new Date(order.createdAt).toDateString()}
                    </small>
                  </div>
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

                {/* Show items to remove only when there is something to remove */}
                {Object.entries(order).filter((item) => item[1] === true)
                  .length > 0 ? (
                  <div className={styles.ItemsToRemove}>
                    <p className={styles.Title}>Removed items</p>
                    <div className={styles.Items}>
                      {Object.entries(order)
                        .filter((item) => item[1] === true)
                        .map((el, i) => (
                          <p key={el[0]}>{`${el[0]}${
                            i <
                            Object.entries(order).filter(
                              (item) => item[1] === true
                            ).length -
                              1
                              ? ","
                              : ""
                          }`}</p>
                        ))}
                    </div>
                  </div>
                ) : (
                  ""
                )}

                <div className={styles.PriceReorder}>
                  <p className={styles.Title}>
                    Total amount: <span>${order.TotalPrice}</span>
                  </p>

                  <Button
                    text="Reorder"
                    clicked={() => handleBurgerReorder(order)}
                  />
                </div>
              </>
            ) : (
              <>
                {/* Generic order markup */}
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
                  <p className={styles.Title}>
                    Total amount: <span>${order.totalPrice}</span>
                  </p>

                  <Button
                    text="Reorder"
                    clicked={() => handleGenericReorder(order)}
                  />
                </div>
              </>
            )}
          </div>
        );
      });
  }

  return (
    <>
      <div className={styles.AllOrders}>
        {loading ? (
          <Loader />
        ) : (
          <>
            {allOrders.length > 0 ? (
              allOrdersMarkup
            ) : (
              <small className={styles.NoOrder}>
                Haven't ordered any foods yet? Order <Link href="/">here</Link>
              </small>
            )}
          </>
        )}
      </div>
      <Alert alerts={alerts} />
    </>
  );
};

export default AllOrders;
