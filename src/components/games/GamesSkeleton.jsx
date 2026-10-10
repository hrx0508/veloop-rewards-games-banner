import tokenIcon from "../../assets/ui/token.avif";
import styles from "./GamesSkeleton.module.css";

export default function GamesSkeleton() {
  return (
    <div className={styles.wrap} role="status" aria-live="polite">
      <div className={styles.row} aria-hidden="true">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className={styles.card}><div className={styles.art} /><div className={styles.foot}><i /><b /></div></div>
        ))}
      </div>
      <div className={styles.msg}>
        <img src={tokenIcon} alt="" width="28" height="28" className={styles.token} />
        <strong>Loading Games…</strong>
        <span>Preparing your next reward challenge…</span>
      </div>
    </div>
  );
}
