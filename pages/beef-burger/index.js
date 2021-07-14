import axios from "axios";
import { API_URL } from "config";
import { useDispatch } from "react-redux";
import { updatePrice } from "@store/actions/burgerActions";
import Burger from "components/burger/Burger";

const BeefBurger = ({ price }) => {
  // Dispatch
  const dispatch = useDispatch();
  dispatch(updatePrice(price));

  return (
    <div>
      <Burger meatType='Beef' />
    </div>
  );
};

export async function getStaticProps() {
  const res = await axios.get(`${API_URL}/burger-price`);
  const data = res.data;

  // Get the price only
  const { meat, cheese, salad, bacon, small, medium, large } = data;

  // Price object
  const price = {
    meat,
    cheese,
    salad,
    bacon,
    small,
    medium,
    large,
  };

  return {
    props: { price },
    revalidate: 1,
  };
}

export default BeefBurger;
