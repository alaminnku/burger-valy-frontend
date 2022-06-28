import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import styles from "@styles/dashboard/dashboard.module.css";
import Alert from "../layout/Alert";
import PendingGenericOrder from "./PendingGenericOrder";
import PendingBurgerOrder from "./PendingBurgerOrder";
import CurrentOrders from "./CurrentOrders";
import AllBurgerOrders from "./AllBurgerOrders";
import AllGenericOrders from "./AllGenericOrders";

const dashboard = () => {
  // Hooks
  const router = useRouter();

  // States
  const [orderDone, setOrderDone] = useState(false);
  const { token, user } = useSelector((state) => state.auth);
  const [reOrdered, setReOrdered] = useState([]);
  const alerts = useSelector((state) => state.alerts);
  const [showDetails, setShowDetails] = useState({
    profile: true,
    activeOrders: false,
    pendingOrders: false,
    allOrders: false,
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
      navName === "Profile" &&
        setShowDetails({
          ...showDetails,
          profile: true,
          activeOrders: false,
          pendingOrders: false,
          allOrders: false,
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
  };

  return (
    <div className={styles.Dashboard}>
      {token && (
        <>
          <ul className={styles.Nav}>
            <li
              onClick={handleShowDetails}
              className={showDetails.profile && styles.Active}
            >
              Profile
            </li>
            <li
              onClick={handleShowDetails}
              className={showDetails.activeOrders && styles.Active}
            >
              Active orders
            </li>
            <li
              onClick={handleShowDetails}
              className={showDetails.pendingOrders && styles.Active}
            >
              Pending orders
            </li>
            <li
              onClick={handleShowDetails}
              className={showDetails.allOrders && styles.Active}
            >
              All orders
            </li>
          </ul>

          {showDetails.profile && (
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
          )}

          <div className={styles.Details}>
            {/* Show current orders */}
            {showDetails.activeOrders && (
              <CurrentOrders reOrdered={reOrdered} orderDone={orderDone} />
            )}

            {/* Show pending burger orders */}
            {showDetails.pendingOrdersBurger && (
              <>
                {!orderDone && burger ? (
                  <PendingBurgerOrder setOrderDone={setOrderDone} />
                ) : (
                  <small>No pending burger orders</small>
                )}
              </>
            )}

            {/* Show pending generic orders */}

            {showDetails.pendingOrdersGeneric && (
              <>
                {!orderDone && item ? (
                  <PendingGenericOrder setOrderDone={setOrderDone} />
                ) : (
                  <small>No pending generic orders</small>
                )}
              </>
            )}

            {/* Show all burger orders */}

            {showDetails.allOrdersBurger && (
              <AllBurgerOrders
                setReOrdered={setReOrdered}
                reOrdered={reOrdered}
                orderDone={orderDone}
              />
            )}

            {/* Show all generic orders */}
            {showDetails.allOrdersGeneric && (
              <AllGenericOrders
                setReOrdered={setReOrdered}
                reOrdered={reOrdered}
                orderDone={orderDone}
              />
            )}
          </div>
        </>
      )}
      <Alert alerts={alerts} />
    </div>
  );
};

export default dashboard;
