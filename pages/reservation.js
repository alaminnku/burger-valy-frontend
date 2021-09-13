import ReservationForm from "@/components/reservation/ReservationForm";
import { GiRoundTable } from "react-icons/gi";
import styles from "@styles/reservation/reservationPage.module.css";

const ReservationPage = () => {
  return (
    <div className={styles.ReservationPage}>
      <ReservationForm
        style={{ borderTop: "2px solid var(--kindaRed)" }}
        title={
          <h3>
            <GiRoundTable style={{ marginRight: ".5rem" }} />
            Table Reservation
          </h3>
        }
      />
    </div>
  );
};

export default ReservationPage;
