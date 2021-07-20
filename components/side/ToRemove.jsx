import styles from "@styles/side/toRemove.module.css";
import { useState } from "react";

const ToRemove = () => {
  const [values, setValues] = useState({
    mayo: false,
    ketchup: false,
    lettuce: false,
    mustard: false,
    onions: false,
    pickles: false,
    tomato: false,
  });

  const { mayo, ketchup, lettuce, mustard, onions, pickles, tomato } = values;

  // Handle change
  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.checked,
    });
  };

  // Convert the object to array and return a filtered array with the true items
  const trueItems = Object.entries(values).filter((item) => item[1] !== false);

  // Convert the array to object
  const itemsToRemove = Object.fromEntries(trueItems);

  console.log(itemsToRemove);

  return (
    <div className={styles.ToRemove}>
      <h4>Things to remove</h4>
      <div className={styles.Items}>
        <div className={styles.Item}>
          <label htmlFor='mayo'>Mayo</label>
          <input
            type='checkbox'
            id='mayo'
            name='mayo'
            checked={mayo}
            onChange={handleChange}
          />
        </div>
        <div className={styles.Item}>
          <label htmlFor='ketchup'>Ketchup</label>
          <input
            type='checkbox'
            id='ketchup'
            name='ketchup'
            checked={ketchup}
            onChange={handleChange}
          />
        </div>

        <div className={styles.Item}>
          <label htmlFor='lettuce'>Lettuce</label>
          <input
            type='checkbox'
            id='lettuce'
            name='lettuce'
            checked={lettuce}
            onChange={handleChange}
          />
        </div>

        <div className={styles.Item}>
          <label htmlFor='mustard'>Mustard</label>
          <input
            type='checkbox'
            id='mustard'
            name='mustard'
            checked={mustard}
            onChange={handleChange}
          />
        </div>

        <div className={styles.Item}>
          <label htmlFor='onions'>Onions</label>
          <input
            type='checkbox'
            id='onions'
            name='onions'
            checked={onions}
            onChange={handleChange}
          />
        </div>

        <div className={styles.Item}>
          <label htmlFor='pickles'>Pickles</label>
          <input
            type='checkbox'
            id='pickles'
            name='pickles'
            checked={pickles}
            onChange={handleChange}
          />
        </div>

        <div className={styles.Item}>
          <label htmlFor='tomato'>Tomato</label>
          <input
            type='checkbox'
            id='tomato'
            name='tomato'
            checked={tomato}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ToRemove;
