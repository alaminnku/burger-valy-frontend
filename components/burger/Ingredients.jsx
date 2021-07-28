import styles from "@styles/burger/ingredients.module.css";

const Ingredients = ({ ingredients, pattyType }) => {
  // Items to render
  let items = [];

  // Convert the object to array and create an item for each amount
  Object.entries(ingredients).map((ingredient) => {
    // Amount of ingredients
    const name = ingredient[0];
    const amount = ingredient[1];

    // Loop through the amount and push an item for each in the items array
    for (let i = 0; i < amount; i++) {
      items.push(
        <div
          key={items.length}
          className={`${styles[name]} ${styles[pattyType]}`}
        ></div>
      );
    }
  });

  return (
    <div className={styles.Ingredients}>
      {/* Top bread */}
      <div className={styles.BreadTop}>
        {/* Sesame seeds */}
        <div className={styles.Seeds1}></div>
        <div className={styles.Seeds2}></div>
      </div>

      {/* Items */}
      {items.length > 0 ? items : <p>Please add ingredients</p>}

      {/* Bottom bread */}
      <div className={styles.BreadBottom}></div>
    </div>
  );
};

export default Ingredients;
