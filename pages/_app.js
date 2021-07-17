import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Provider } from "react-redux";
import store from "../store/store";
import { updatePrice } from "@store/actions/burgerActions";

import "../styles/globals.css";

store.dispatch(updatePrice());

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
