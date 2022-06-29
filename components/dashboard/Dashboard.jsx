import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import styles from "@styles/dashboard/dashboard.module.css";
import Alert from "../layout/Alert";
import PendingOrders from "./PendingOrders";
import CurrentOrders from "./CurrentOrders";
import AllOrders from "./AllOrders";

const dashboard = () => {
  // Hooks
  const router = useRouter();

  // States
  const [orderDone, setOrderDone] = useState({
    burger: false,
    generic: false,
  });
  const { token, user } = useSelector((state) => state.auth);
  const [reOrdered, setReOrdered] = useState([]);
  const alerts = useSelector((state) => state.alerts);
  const [showDetails, setShowDetails] = useState({
    allOrders: true,
    activeOrders: false,
    pendingOrders: false,
  });

  // Push to login page if there isn't a user
  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, []);

  // // Get the burger from cookie
  const burger = Cookies.getJSON("burger");
  const item = Cookies.getJSON("item");

  // Handle show the details
  const handleShowDetails = (e) => {
    const navName = e.target.textContent;

    {
      navName === "All orders" &&
        setShowDetails({
          ...showDetails,
          profile: false,
          activeOrders: false,
          pendingOrders: false,
          allOrders: true,
        });
    }

    {
      navName === "Active orders" &&
        setShowDetails({
          ...showDetails,
          profile: false,
          activeOrders: true,
          pendingOrders: false,
          allOrders: false,
        });
    }

    {
      navName === "Pending orders" &&
        setShowDetails({
          ...showDetails,
          profile: false,
          activeOrders: false,
          pendingOrders: true,
          allOrders: false,
        });
    }
  };

  return (
    <div className={styles.Dashboard}>
      {token && (
        <>
          <div className={styles.Nav}>
            <ul>
              <li
                onClick={handleShowDetails}
                className={showDetails.allOrders ? styles.Active : null}
              >
                All orders
              </li>

              <li
                onClick={handleShowDetails}
                className={showDetails.activeOrders ? styles.Active : null}
              >
                Active orders
              </li>

              <li
                onClick={handleShowDetails}
                className={showDetails.pendingOrders ? styles.Active : null}
              >
                Pending orders
              </li>
            </ul>

            <div className={styles.Profile}>
              <h4 className={styles.Item}>Welcome back {user.name}!</h4>
              <div className={styles.Item}>
                <p>Name:</p>
                <small>{user.name}</small>
              </div>

              <div className={styles.Item}>
                <p>Email:</p>
                <small>{user.email}</small>
              </div>
            </div>
          </div>

          <div className={styles.Details}>
            {/* All orders */}

            {showDetails.allOrders && (
              <AllOrders
                orderDone={orderDone}
                reOrdered={reOrdered}
                setReOrdered={setReOrdered}
              />
            )}

            {/* Current orders */}
            {showDetails.activeOrders && (
              <CurrentOrders reOrdered={reOrdered} orderDone={orderDone} />
            )}

            {/* Show pending orders */}
            {showDetails.pendingOrders && (
              <>
                {(!orderDone.burger && burger) ||
                (!orderDone.generic && item) ? (
                  <PendingOrders
                    orderDone={orderDone}
                    setOrderDone={setOrderDone}
                  />
                ) : (
                  <small className={styles.NoPendingOrder}>
                    No pending orders!
                  </small>
                )}
              </>
            )}
          </div>
        </>
      )}
      <Alert alerts={alerts} />
    </div>
  );
};

export default dashboard;
