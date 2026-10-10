import { useState } from "react";
import { ArrowRight, Loader2, Play } from "lucide-react";
import styles from "./PlayNowButton.module.css";

export default function PlayNowButton({ state = "idle", onClick, label, ariaLabel, size = "md", delay = 0, icon = false, block = false }) {
  const [ripple, setRipple] = useState(null);
  const cls = [styles.btn, styles[size], state === "insufficient" && styles.earn, state === "loading" && styles.loading, block && styles.block].filter(Boolean).join(" ");
  const text = label || (state === "loading" ? "Starting…" : state === "insufficient" ? "Earn More Tokens" : "Play Now");

  const down = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    setRipple({ x: e.clientX - r.left, y: e.clientY - r.top, k: Date.now() });
  };

  return (
    <button type="button" className={cls} onClick={onClick} onPointerDown={down} aria-label={ariaLabel} aria-busy={state === "loading"} disabled={state === "loading"} style={{ "--delay": `${delay}s` }}>
      <span className={styles.shine} aria-hidden="true" />
      {ripple && <span key={ripple.k} className={styles.ripple} style={{ left: ripple.x, top: ripple.y }} aria-hidden="true" />}
      <span className={styles.content}>
        {state === "loading" ? <Loader2 size={16} className={styles.spin} /> : icon && state === "idle" ? <Play size={14} fill="currentColor" /> : null}
        <span>{text}</span>
        {state !== "loading" && <ArrowRight size={16} className={styles.arrow} />}
      </span>
    </button>
  );
}
