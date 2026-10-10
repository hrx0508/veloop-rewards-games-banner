import { Gift, Home } from "lucide-react";
import { NavLink } from "react-router-dom";
import styles from "./GameNavigation.module.css";

export default function GameNavigation({ slug }) {
  const cls = ({ isActive }) => `${styles.item} ${isActive ? styles.active : ""}`;
  return (
    <nav className={styles.nav} aria-label="Game navigation">
      <div className={styles.inner}>
        <NavLink to={`/games/${slug}`} end className={cls}><Home size={20} /><span>Home</span></NavLink>
        <NavLink to="/redeem" className={cls}><Gift size={20} /><span>Redeem</span></NavLink>
      </div>
    </nav>
  );
}
