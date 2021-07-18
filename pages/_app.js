import store from "../store/store";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Provider } from "react-redux";
import { updatePrice } from "@store/actions/burgerActions";
import { checkUser } from "@store/actions/authActions";

import "../styles/globals.css";

store.dispatch(updatePrice());
store.dispatch(checkUser());

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </Provider>
  );
}

export default MyApp;
