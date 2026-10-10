import tokenIcon from "../../assets/ui/token.avif";
import styles from "./TokenCost.module.css";

export default function TokenCost({ cost, currency = "Tokens", balance, insufficient = false, size = 20 }) {
  return (
    <div className={`${styles.cost} ${insufficient ? styles.low : ""}`}>
      <img src={tokenIcon} alt="" width={size} height={size} className={styles.icon} style={{ width: size, height: size }} />
      <div className={styles.text}>
        <strong>{insufficient ? `${balance} ${currency}` : `${cost} ${currency}`}</strong>
        <span>{insufficient ? `Requires ${cost}` : "Entry fee"}</span>
      </div>
    </div>
  );
}
