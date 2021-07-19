import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import styles from "@styles/burger/controller.module.css";
import { useDispatch } from "react-redux";
import { addIngredient } from "@store/actions/burgerActions";
import { removeIngredient } from "@store/actions/burgerActions";

const Controller = ({ ingredients, price, meatType }) => {
  // Dispatch action
  const dispatch = useDispatch();

  // Ingredients from UI
  const { Patty, Cheese, Salad, Bacon } = ingredients;

  // Individual price
  const { patty, cheese, salad, bacon } = price;

  return (
    <div className={styles.Controller}>
      <div className={styles.Item}>
        <p>{meatType}</p>
        <div>
          <AiOutlinePlusCircle
            className={styles.AddIcon}
            onClick={() => dispatch(addIngredient("Patty", patty))}
          />
          <AiOutlineMinusCircle
            className={`${styles.RemoveIcon} ${Patty === 0 && styles.Disabled}`}
            onClick={() => dispatch(removeIngredient("Patty", patty))}
          />
        </div>
      </div>
      <div className={styles.Item}>
        <p>Cheese</p>
        <div>
          <AiOutlinePlusCircle
            className={styles.AddIcon}
            onClick={() => dispatch(addIngredient("Cheese", cheese))}
          />
          <AiOutlineMinusCircle
            className={`${styles.RemoveIcon} ${
              Cheese === 0 && styles.Disabled
            }`}
            onClick={() => dispatch(removeIngredient("Cheese", cheese))}
          />
        </div>
      </div>
      <div className={styles.Item}>
        <p>Salad</p>
        <div>
          <AiOutlinePlusCircle
            className={styles.AddIcon}
            onClick={() => dispatch(addIngredient("Salad", salad))}
          />
          <AiOutlineMinusCircle
            className={`${styles.RemoveIcon} ${Salad === 0 && styles.Disabled}`}
            onClick={() => dispatch(removeIngredient("Salad", salad))}
          />
        </div>
      </div>
      <div className={styles.Item}>
        <p>Bacon</p>
        <AiOutlinePlusCircle
          className={styles.AddIcon}
          onClick={() => dispatch(addIngredient("Bacon", bacon))}
        />
        <AiOutlineMinusCircle
          className={`${styles.RemoveIcon} ${Bacon === 0 && styles.Disabled}`}
          onClick={() => dispatch(removeIngredient("Bacon", bacon))}
        />
      </div>
    </div>
  );
};

export default Controller;
