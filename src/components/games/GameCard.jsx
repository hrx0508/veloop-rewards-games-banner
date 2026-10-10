import { memo, useState } from "react";
import TokenCost from "./TokenCost";
import PlayNowButton from "./PlayNowButton";
import styles from "./GameCard.module.css";

function GameCard({ game, index, tokens, loading, onPlay, eager, fluid = false }) {
  const [ready, setReady] = useState(false);
  const insufficient = tokens < game.cost;
  const state = loading ? "loading" : insufficient ? "insufficient" : "idle";

  return (
    <article className={`${styles.card} ${fluid ? styles.fluid : ""}`} aria-label={game.name}>
      <div className={`${styles.art} ${ready ? styles.ready : ""}`}>
        <img
          src={game.image} alt={`${game.name} — game artwork`} width="640" height="781"
          loading={eager ? "eager" : "lazy"} decoding="async" fetchPriority={eager ? "high" : "auto"}
          draggable="false" onLoad={() => setReady(true)}
        />
        {game.playable && <span className={styles.live}>Playable</span>}
      </div>
      <div className={styles.footer}>
        <TokenCost cost={game.cost} currency={game.currency} balance={tokens} insufficient={insufficient} />
        <PlayNowButton
          state={state} delay={(index % 6) * 0.45} onClick={() => onPlay(game)}
          ariaLabel={insufficient ? `Earn more Tokens — ${game.name} needs ${game.cost} Tokens` : `Play ${game.name} for ${game.cost} Tokens`}
        />
      </div>
    </article>
  );
}

export default memo(GameCard);
