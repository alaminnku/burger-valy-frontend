import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";
import { convertName } from "helpers";
import styles from "@styles/account/mobileMenu.module.css";

const mobileMenu = ({ showMenu, handleShowDetails }) => {
  // Sates
  const [showItems, setShowItems] = useState({
    activeOrders: false,
    pendingOrders: false,
    allOrders: false,
  });

  // Handle show sub items
  const handleShowItems = (e) => {
    const convertedText = convertName(e.target.textContent);

    // Update the state
    setShowItems({
      [convertedText]: !showItems[convertedText],
    });
  };

  return (
    <>
      {showMenu && (
        <div className={styles.Items}>
          <h5 className={styles.Item} onClick={(e) => handleShowDetails(e)}>
            Profile
          </h5>

          <h5 className={styles.Item} onClick={(e) => handleShowItems(e)}>
            Active Orders{" "}
            <IoIosArrowDown
              className={`${styles.Arrow} ${
                showItems.activeOrders && styles.RotateArrow
              }`}
            />
          </h5>

          {showItems.activeOrders && (
            <div className={styles.SubItems}>
              <h5 onClick={(e) => handleShowDetails(e)}>Burger</h5>
              <h5 onClick={(e) => handleShowDetails(e)}>Generic</h5>
            </div>
          )}

          <h5 className={styles.Item} onClick={(e) => handleShowItems(e)}>
            Pending Orders{" "}
            <IoIosArrowDown
              className={`${styles.Arrow} ${
                showItems.pendingOrders && styles.RotateArrow
              }`}
            />
          </h5>

          {showItems.pendingOrders && (
            <div className={styles.SubItems}>
              <h5 onClick={(e) => handleShowDetails(e)}>Burger</h5>
              <h5 onClick={(e) => handleShowDetails(e)}>Generic</h5>
            </div>
          )}

          <h5 className={styles.Item} onClick={(e) => handleShowItems(e)}>
            All Orders{" "}
            <IoIosArrowDown
              className={`${styles.Arrow} ${
                showItems.allOrders && styles.RotateArrow
              }`}
            />
          </h5>

          {showItems.allOrders && (
            <div className={styles.SubItems}>
              <h5 onClick={(e) => handleShowDetails(e)}>Burger</h5>
              <h5 onClick={(e) => handleShowDetails(e)}>Generic</h5>
            </div>
          )}

          <h5 className={styles.Item} onClick={(e) => handleShowDetails(e)}>
            Table Reservation
          </h5>
        </div>
      )}
    </>
  );
};

export default mobileMenu;
