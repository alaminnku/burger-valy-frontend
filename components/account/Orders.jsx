import styles from "@styles/account/orders.module.css";

const Orders = ({ orders }) => {
  return (
    <div>
      {orders.map((order) => {
        // Get the items to remove from order
        const { mayo, ketchup, lettuce, mustard, onions, pickles, tomato } =
          order;

        // Create an object
        const items = {
          mayo,
          ketchup,
          lettuce,
          mustard,
          onions,
          pickles,
          tomato,
        };

        // Return an array with the key when it's value is true
        const itemsToRemove = Object.entries(items).filter((item) => {
          if (item[1] === true) {
            return item[0];
          }
        });

        // Format the date
        const date = new Date(order.createdAt);

        return (
          <div key={order.id} className={styles.Order}>
            <div className={styles.Main}>
              <div className={styles.TypeDate}>
                <p className={styles.Title}>{order.Type} Burger</p>
                <small>{date.toDateString()}</small>
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

            <div className={styles.ItemsToRemove}>
              <p className={styles.Title}>Items To Remove</p>
              <div className={styles.Items}>
                {itemsToRemove.map((item) => (
                  <p key={Math.random(10)}>{item},</p>
                ))}
              </div>
            </div>

            <div className={styles.PriceReorder}>
              <p className={styles.Title}>Total amount: ${order.TotalPrice}</p>
              <button>REORDER</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Orders;
