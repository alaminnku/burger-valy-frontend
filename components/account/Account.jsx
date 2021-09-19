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
import { BiMenu } from "react-icons/bi";
import { RiCloseFill } from "react-icons/ri";
import { convertName } from "helpers";
import Menu from "./Menu";

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
    profile: true,
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
          <Menu showMenu={showMenu} handleShowDetails={handleShowDetails} />

          <div className={styles.Details}>
            <div className={styles.MenuTop}>
              {/* Welcome title */}
              <h4 className={styles.Title}>
                Welcome back <span>{user.name}</span>!
              </h4>

              {/* Menu icon */}
              {!showMenu ? (
                <BiMenu
                  onClick={() => setShowMenu(!showMenu)}
                  className={styles.MenuIcon}
                />
              ) : (
                <RiCloseFill
                  className={styles.MenuIcon}
                  onClick={() => setShowMenu(!showMenu)}
                />
              )}
            </div>

            {/* Show profile conditionally */}
            {showDetails.profile && (
              <div className={styles.Profile}>
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

            {/* Show active burger orders */}
            {showDetails.activeOrdersBurger && (
              <CurrentBurgerOrder reOrdered={reOrdered} orderDone={orderDone} />
            )}

            {/* Show active generic orders */}

            {showDetails.activeOrdersGeneric && (
              <CurrentGenericOrder
                reOrdered={reOrdered}
                orderDone={orderDone}
              />
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
          </div>
        </>
      )}
      <Alert alerts={alerts} />
    </div>
  );
};

export default account;
