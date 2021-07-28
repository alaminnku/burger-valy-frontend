import styles from "@styles/build/burgerType.module.css";

const BurgerType = ({ changed }) => {
  return (
    <div className={styles.BurgerType}>
      <h3>Please select the patty type</h3>

      <div className={styles.Types}>
        <div className={styles.Type}>
          <label htmlFor='Beef'>Beef</label>
          <input type='radio' id='Beef' name='pattyType' onChange={changed} />
        </div>

        <div className={styles.Type}>
          <label htmlFor='Chicken'>Chicken</label>
          <input
            type='radio'
            id='Chicken'
            name='pattyType'
            onChange={changed}
          />
        </div>

        <div className={styles.Type}>
          <label htmlFor='Cheddar'>Cheese</label>
          <input
            type='radio'
            id='Cheddar'
            name='pattyType'
            onChange={changed}
          />
        </div>

        <div className={styles.Type}>
          <label htmlFor='Vegetable'>Vegetable</label>
          <input
            type='radio'
            id='Vegetable'
            name='pattyType'
            onChange={changed}
          />
        </div>
      </div>
    </div>
  );
};

export default BurgerType;
