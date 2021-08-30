import Button from "@/components/layout/Button";
import styles from "@styles/menu/confirmOrderPage.module.css";
import Cookies from "js-cookie";
import { parseCookies } from "../../../helpers/index";
import { useEffect, useState } from "react";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { setItem } from "@store/actions/itemActions";

const ConfirmOrderPage = ({ parsedToken }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  // Get the item from cookie on reload
  useEffect(() => {
    // Dispatch an action to get the item from cookie
    dispatch(setItem());
  }, []);

  // States
  const item = useSelector((state) => state.item);

  const [quantity, setQuantity] = useState(1);
  const { user } = useSelector((state) => state.auth);

  const finalItem = {
    name: item.name,
    quantity: quantity,
    price: item.price * quantity,
  };

  const handleConfirmOrder = () => {
    if (!user) {
      return;
    }

    console.log(finalItem);
  };

  return (
    <div className={styles.ConfirmOrderPage}>
      <h3>Your order with</h3>
      <p>{item.name}</p>

      <div>
        <p>{quantity}</p>
        <AiOutlinePlusCircle onClick={() => setQuantity(quantity + 1)} />
        <AiOutlineMinusCircle
          onClick={() => setQuantity(quantity > 1 ? quantity - 1 : quantity)}
        />
      </div>

      <p>{item.price * quantity}</p>
      <Button text="Confirm Order" clicked={handleConfirmOrder} />
    </div>
  );
};

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);

  let parsedToken;

  // If there is a token, parse it else set final token to null
  {
    token ? (parsedToken = JSON.parse(token)) : (parsedToken = null);
  }

  console.log(token);
  return {
    props: { parsedToken },
  };
}

export default ConfirmOrderPage;
