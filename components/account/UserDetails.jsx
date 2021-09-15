import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import styles from "@styles/account/userDetails.module.css";
import { logout } from "@store/actions/authActions";
import Button from "../layout/Button";
import Loader from "../layout/Loader";
import Alert from "../layout/Alert";
import PendingGenericOrder from "./PendingGenericOrder";
import PendingBurgerOrder from "./PendingBurgerOrder";
import CurrentGenericOrder from "./CurrentGenericOrder";
import CurrentBurgerOrder from "./CurrentBurgerOrder";
import AllBurgerOrders from "./AllBurgerOrders";
import AllGenericOrders from "./AllGenericOrders";
import { IoIosArrowDown } from "react-icons/io";

const userDetails = () => {
  // Router
  const router = useRouter();
  const dispatch = useDispatch();

  // Statues
  const [orderDone, setOrderDone] = useState(false);
  const { token, user } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.loader);
  const [reOrdered, setReOrdered] = useState([]);
  const alerts = useSelector((state) => state.alerts);
  const [showDetails, setShowDetails] = useState({
    profile: false,
    pendingBurgerOrders: false,
    pendingGenericOrders: false,
    activeBurgerOrders: false,
    activeGenericOrders: false,
    allBurgerOrders: false,
    allGenericOrders: false,
    tableReservation: false,
  });

  // Push to login page if there isn't a user
  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, []);

  // Get the burger from cookie
  const burger = Cookies.getJSON("burger");
  const item = Cookies.getJSON("item");

  // Create a new object
  const pendingOrder = { ...burger };
  const { ingredients, side, type } = pendingOrder;

  // // Logout the user
  // const handleLogout = () => {
  //   dispatch(logout());
  //   router.push("/");
  // };

  return (
    <div className={styles.UserDetails}>
      <div className={styles.Menu}>
        <h4
          onClick={() =>
            setShowDetails({ ...showDetails, profile: !showDetails.profile })
          }
        >
          Profile{" "}
          <IoIosArrowDown
            className={`${styles.Icon} ${
              showDetails.profile && styles.RotateIcon
            }`}
          />
        </h4>

        {/* Show the profile on click */}
        {showDetails.profile && (
          <h3 className={`${styles.Title} ${styles.MainTitle}`}>
            Hi <span>{user.name}</span> 👋
          </h3>
        )}

        <h4>
          Active orders
          <p
            onClick={() =>
              setShowDetails({
                ...showDetails,
                activeBurgerOrders: !showDetails.activeBurgerOrders,
              })
            }
          >
            Burger{" "}
            <IoIosArrowDown
              className={`${styles.Icon} ${
                showDetails.activeBurgerOrders && styles.RotateIcon
              }`}
            />
          </p>
          {/* Show active burger orders */}
          {showDetails.activeBurgerOrders && (
            <div className={styles.CurrentOrder}>
              <CurrentBurgerOrder reOrdered={reOrdered} orderDone={orderDone} />
            </div>
          )}
          <p
            onClick={() =>
              setShowDetails({
                ...showDetails,
                activeGenericOrders: !showDetails.activeGenericOrders,
              })
            }
          >
            Generic{" "}
            <IoIosArrowDown
              className={`${styles.Icon} ${
                showDetails.activeBurgerOrders && styles.RotateIcon
              }`}
            />
          </p>
          {/* Show active generic orders */}
          {showDetails.activeGenericOrders && (
            <div className={styles.CurrentOrder}>
              <CurrentGenericOrder
                reOrdered={reOrdered}
                orderDone={orderDone}
              />
            </div>
          )}
        </h4>

        <h4>
          Pending orders
          <p
            onClick={() =>
              setShowDetails({
                ...showDetails,
                pendingBurgerOrders: !showDetails.pendingBurgerOrders,
              })
            }
          >
            Burger{" "}
            <IoIosArrowDown
              className={`${styles.Icon} ${
                showDetails.pendingBurgerOrders && styles.RotateIcon
              }`}
            />
          </p>
          {/* Show pending burger orders on click */}
          {showDetails.pendingBurgerOrders && (
            <>
              {!orderDone && burger ? (
                <PendingBurgerOrder setOrderDone={setOrderDone} />
              ) : (
                <small>No pending burger orders</small>
              )}
            </>
          )}
          <p
            onClick={() =>
              setShowDetails({
                ...showDetails,
                pendingGenericOrders: !showDetails.pendingGenericOrders,
              })
            }
          >
            Generic{" "}
            <IoIosArrowDown
              className={`${styles.Icon} ${
                showDetails.pendingGenericOrders && styles.RotateIcon
              }`}
            />
          </p>
          {/* Show pending generic orders on click */}
          {showDetails.pendingGenericOrders && (
            <>
              {!orderDone && item ? (
                <PendingGenericOrder setOrderDone={setOrderDone} />
              ) : (
                <small>No pending generic orders</small>
              )}
            </>
          )}
        </h4>

        <h4>
          All orders
          <p
            onClick={() =>
              setShowDetails({
                ...showDetails,
                allBurgerOrders: !showDetails.allBurgerOrders,
              })
            }
          >
            Burger{" "}
            <IoIosArrowDown
              className={`${styles.Icon} ${
                showDetails.allBurgerOrders && styles.RotateIcon
              }`}
            />
          </p>
          {/* Show all burger orders */}
          {showDetails.allBurgerOrders && (
            <div className={styles.AllOrders}>
              <AllBurgerOrders
                setReOrdered={setReOrdered}
                reOrdered={reOrdered}
                orderDone={orderDone}
              />
            </div>
          )}
          <p
            onClick={() =>
              setShowDetails({
                ...showDetails,
                allGenericOrders: !showDetails.allGenericOrders,
              })
            }
          >
            Generic{" "}
            <IoIosArrowDown
              className={`${styles.Icon} ${
                showDetails.allGenericOrders && styles.RotateIcon
              }`}
            />
          </p>
          {/* Show active generic orders */}
          {showDetails.allGenericOrders && (
            <div className={styles.AllOrders}>
              <AllGenericOrders
                setReOrdered={setReOrdered}
                reOrdered={reOrdered}
                orderDone={orderDone}
              />
            </div>
          )}
        </h4>

        <h4
          onClick={() =>
            setShowDetails({
              ...showDetails,
              tableReservation: !showDetails.tableReservation,
            })
          }
        >
          Table Reservation
        </h4>
      </div>

      {/* {token && (
        <div className={styles.UserDetails}>
          <Button
            text={loading ? <Loader /> : "Log Out"}
            clicked={handleLogout}
            style={{
              backgroundColor: "var(--grey)",
              alignSelf: "center",
              padding: ".6rem 1.5rem",
            }}
          />
        </div>
      )} */}
      <Alert alerts={alerts} />
    </div>
  );
};

export default userDetails;
