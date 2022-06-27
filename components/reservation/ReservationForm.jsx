import Button from "../layout/Button";
import { useState } from "react";
import axios from "axios";
import { API_URL } from "config";
import Alert from "../layout/Alert";
import { useSelector, useDispatch } from "react-redux";
import styles from "@styles/reservation/reservationForm.module.css";
import { setAlert } from "@store/actions/alertActions";
import { useRouter } from "next/router";
import Loader from "../layout/Loader";

const ReservationForm = ({ style, title }) => {
  // Hooks
  const dispatch = useDispatch();
  const router = useRouter();

  // Sates
  const [values, setValues] = useState({
    name: "",
    numberOfGuests: "",
    date: "",
    time: "",
    phone: "",
    message: "",
  });
  const [disabled, setDisabled] = useState(true);
  const alerts = useSelector((state) => state.alerts);
  const [loading, setLoading] = useState(false);

  // Destructure the values
  const { name, numberOfGuests, date, time, phone, message } = values;

  const handleChange = (e) => {
    // Update the values state
    setValues({
      ...values,
      [e.target.id]: e.target.value,
    });

    // Check if there are any empty fields
    const hasEmptyField = Object.values(values).some((value) => value === "");

    // If there aren't then update the disabled state
    if (!hasEmptyField) {
      setDisabled(false);
    }
  };

  // Submit the data
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if there are any empty fields
    const hasEmptyField = Object.values(values).some((value) => value === "");

    // Show alert if there are empty fields and return
    if (hasEmptyField) {
      setDisabled(true);
      dispatch(setAlert("Please fill all the fields!", "Danger"));
      return;
    }

    // Post the date to db
    try {
      // Set the load
      setLoading(true);

      // Make the request
      await axios.post(`${API_URL}/reservations`, values);

      // Show successful message
      dispatch(setAlert("Table reservation successful!", "Success"));

      setValues({
        ...values,
        name: "",
        numberOfGuests: "",
        date: "",
        time: "",
        phone: "",
        message: "",
      });

      // Remove the loader
      setLoading(false);

      if (router.pathname !== "/") {
        router.push("/");
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  return (
    <div className={styles.ReservationForm} style={style}>
      {title}
      <form>
        <div className={styles.Item}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            placeholder="Enter your name"
            onChange={handleChange}
          />
        </div>

        <div className={styles.Item}>
          <label htmlFor="numberOfGuests">Guests</label>
          <input
            type="number"
            id="numberOfGuests"
            placeholder="Number of guests"
            value={numberOfGuests}
            onChange={handleChange}
          />
        </div>

        <div className={styles.Item}>
          <label htmlFor="date">Date</label>
          <input type="date" id="date" value={date} onChange={handleChange} />
        </div>

        <div className={styles.Item}>
          <label>Time</label>
          <input type="time" id="time" value={time} onChange={handleChange} />
        </div>

        <div className={styles.Item}>
          <label htmlFor="phone">Phone</label>
          <input
            type="number"
            id="phone"
            value={phone}
            placeholder="Enter your phone number"
            onChange={handleChange}
          />
        </div>

        <div className={styles.Item}>
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            value={message}
            placeholder="Enter your message"
            onChange={handleChange}
          />
        </div>

        <Button
          text={loading ? <Loader /> : "Reserve now"}
          clicked={handleSubmit}
          disabled={disabled}
        />
      </form>
      <Alert alerts={alerts} />
    </div>
  );
};

export default ReservationForm;
