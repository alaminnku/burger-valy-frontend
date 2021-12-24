import ReservationForm from "@/components/reservation/ReservationForm";
import { GiRoundTable } from "react-icons/gi";
import styles from "@styles/reservation/reservationPage.module.css";
import HeadSection from "@/components/layout/HeadSection";

const ReservationPage = () => {
  return (
    <>
      <HeadSection
        title='Burger Valy | Reserve a Table'
        content='Reserve a table for party and family get together.'
        pageURL='https://www.burgervaly.com/reservation'
      />
      <main className={styles.ReservationPage}>
        <ReservationForm
          style={{ borderTop: "2px solid var(--kindaRed)" }}
          title={
            <h3>
              <GiRoundTable style={{ marginRight: ".5rem" }} />
              Table Reservation
            </h3>
          }
        />
      </main>
    </>
  );
};

export default ReservationPage;
