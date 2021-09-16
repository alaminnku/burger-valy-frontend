import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import styles from "@styles/account/account.module.css";
import Alert from "../layout/Alert";
import PendingGenericOrder from "./PendingGenericOrder";
import PendingBurgerOrder from "./PendingBurgerOrder";
import CurrentGenericOrder from "./CurrentGenericOrder";
import CurrentBurgerOrder from "./CurrentBurgerOrder";
import AllBurgerOrders from "./AllBurgerOrders";
import AllGenericOrders from "./AllGenericOrders";
import MobileDashboard from "./MobileMenu";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { convertName } from "helpers";

const account = () => {
  // Hooks
  const router = useRouter();

  // States
  const [orderDone, setOrderDone] = useState(false);
  const { token, user } = useSelector((state) => state.auth);
  const [reOrdered, setReOrdered] = useState([]);
  const alerts = useSelector((state) => state.alerts);
  const [showMenu, setShowMenu] = useState(false);
  const [showDetails, setShowDetails] = useState({
    profile: false,
    activeOrdersBurger: false,
    activeOrdersGeneric: false,
    pendingOrdersBurger: false,
    pendingOrdersGeneric: false,
    allOrdersBurger: false,
    allOrdersGeneric: false,
    tableReservation: false,
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

  // // Create a new object
  // const pendingOrder = { ...burger };
  // const { ingredients, side, type } = pendingOrder;

  // Handle show the details
  const handleShowDetails = (e) => {
    // Child text
    const childText = e.target.textContent;

    // Update state
    if (childText === "Profile" || childText === "Table Reservation") {
      // Converted text
      const convertedText = convertName(childText);

      // Update the state
      setShowDetails({
        [convertedText]: !showDetails[convertedText],
      });

      // Remove the menu
      setShowMenu(!showMenu);
    } else {
      // Parent text
      const parentText =
        e.target.parentElement.previousElementSibling.textContent;

      // Converted text
      const convertedText = convertName(parentText);

      // Join parent and child text
      const finalText = `${convertedText}${childText}`;

      // Update the state
      setShowDetails({
        [finalText]: !showDetails[finalText],
      });

      // Remove the menu
      setShowMenu(!showMenu);
    }
  };

  return (
    <div className={styles.Account}>
      {token && (
        <>
          {/* Welcome title */}
          <p className={styles.Title}>
            Welcome back <span>{user.name}</span> 👋
          </p>

          {/* Show profile conditionally */}
          {showDetails.profile && (
            <div className={styles.Profile}>
              <h4>Profile</h4>
              <p className={`${styles.Title} ${styles.MainTitle}`}>
                Hi <span>{user.name}</span> 👋
              </p>
            </div>
          )}

          {/* Show active burger orders */}
          {showDetails.activeOrdersBurger && (
            <CurrentBurgerOrder reOrdered={reOrdered} orderDone={orderDone} />
          )}

          {/* Show active generic orders */}

          {showDetails.activeOrdersGeneric && (
            <CurrentGenericOrder reOrdered={reOrdered} orderDone={orderDone} />
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

          {/* Show table reservation */}
          {showDetails.tableReservation && <div>Table Reservation</div>}

          {/* Mobile dashboard */}
          <MobileDashboard
            showMenu={showMenu}
            handleShowDetails={handleShowDetails}
          />

          {/* Menu icon */}
          <AiOutlineMenuUnfold
            onClick={() => setShowMenu(!showMenu)}
            className={styles.MenuIcon}
          />
        </>
      )}
      <Alert alerts={alerts} />
    </div>
  );
};

export default account;
