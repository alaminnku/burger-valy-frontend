import Button from "../layout/Button";
import { useState } from "react";

import styles from "@styles/reservation/reservationForm.module.css";

const ReservationForm = ({ style, title }) => {
  const [values, setValues] = useState({
    name: "",
    numberOfGuests: "",
    date: "",
    time: "",
    phone: "",
    message: "",
  });

  const { name, numberOfGuests, date, time, phone, message } = values;

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
  };

  return (
    <div className={styles.ReservationForm} style={style}>
      {title}
      <form>
        <div className={styles.Item}>
          <label htmlFor='name'>Name</label>
          <input type='text' id='name' value={name} onChange={handleChange} />
        </div>

        <div className={styles.Item}>
          <label htmlFor='numberOfGuests'>Number of Guests</label>
          <input
            type='number'
            id='numberOfGuests'
            value={numberOfGuests}
            onChange={handleChange}
          />
        </div>

        <div className={styles.Item}>
          <label htmlFor='date'>Date</label>
          <input type='date' id='date' value={date} onChange={handleChange} />
        </div>

        <div className={styles.Item}>
          <label>Time</label>
          <select id='time' onChange={handleChange} value={time}>
            <option hidden value='When would you like to book?'>
              When would you like to book?
            </option>
            <option value='Lunch'>Lunch</option>
            <option value='Dinner'>Dinner</option>
          </select>
        </div>

        <div className={styles.Item}>
          <label htmlFor='phone'>Phone No.</label>
          <input
            type='number'
            id='phone'
            value={phone}
            onChange={handleChange}
          />
        </div>

        <div className={styles.Item}>
          <label htmlFor='message'>Message</label>
          <textarea id='message' value={message} onChange={handleChange} />
        </div>

        <Button text='Book' clicked={handleSubmit} />
      </form>
    </div>
  );
};

export default ReservationForm;
