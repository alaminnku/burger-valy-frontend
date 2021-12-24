import store from "../store/store";
import Navbar from "@/components/layout/Navbar";
import { Provider } from "react-redux";
import { updatePrice } from "@store/actions/burgerActions";
import { checkUser } from "@store/actions/authActions";
import MobileNav from "@/components/layout/MobileNav";
import Footer from "@/components/layout/Footer";

import "../styles/globals.css";

// Update the price and check for user in app reload
store.dispatch(updatePrice());
store.dispatch(checkUser());

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
      <MobileNav />
    </Provider>
  );
}

export default MyApp;
