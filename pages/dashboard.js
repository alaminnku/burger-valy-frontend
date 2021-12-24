import Dashboard from "@/components/dashboard/Dashboard";
import styles from "@styles/dashboard/dashboardPage.module.css";
import Alert from "@/components/layout/Alert";
import { useSelector } from "react-redux";
import HeadSection from "@/components/layout/HeadSection";

const DashboardPage = () => {
  // States
  const alerts = useSelector((state) => state.alerts);

  return (
    <>
      <HeadSection
        title='Burger Valy | Dashboard'
        content='Check your current and all orders. Reorder foods you love in one click.'
        pageURL='https://www.burgervaly.com/dashboard'
      />

      <main className={styles.DashboardPage}>
        <Dashboard />
        <Alert alerts={alerts} />
      </main>
    </>
  );
};

export default DashboardPage;
