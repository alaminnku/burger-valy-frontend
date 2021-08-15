import styles from "@styles/layout/alert.module.css";

const Alert = ({ alerts }) => {
  return (
    <div className={styles.Alerts}>
      {alerts.map((alert) => (
        <p className={`${styles.Alert} ${styles[alert.type]}`}>
          {alert.message.includes("Identifier")
            ? alert.message.replace("Identifier", "Email").replace(".", "!")
            : alert.message.replace(".", "!")}
        </p>
      ))}
    </div>
  );
};

export default Alert;
