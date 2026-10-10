import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Gift, RotateCcw } from "lucide-react";
import GamesCarousel from "../components/games/GamesCarousel";
import GamesSkeleton from "../components/games/GamesSkeleton";
import ErrorState from "../components/games/ErrorState";
import { usePlayGame } from "../hooks/usePlayGame";
import { useGameCoins } from "../context/GameCoinContext";
import { fetchGames } from "../services/gameService";
import tokenIcon from "../assets/ui/token.avif";
import coinIcon from "../assets/ui/coin.avif";
import styles from "./Games.module.css";

export default function Games() {
  const [games, setGames] = useState(null);
  const [failed, setFailed] = useState(false);
  const { tokens, gameCoins, setTokens, resetDemo } = useGameCoins();
  const navigate = useNavigate();
  const { onPlay, loadingId } = usePlayGame();

  const load = useCallback(() => { setFailed(false); setGames(null); fetchGames().then(setGames).catch(() => setFailed(true)); }, []);
  useEffect(load, [load]);

  return (
    <div className={styles.page}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.container}>
        <header className={styles.top}>
          <span className={styles.brand}>VELOOP<b> Rewards</b></span>
          <div className={styles.chips}>
            <span className={styles.chip} aria-label={`${tokens} Tokens`}><img src={tokenIcon} alt="" width="20" height="20" />{tokens}<small>Tokens</small></span>
            <span className={styles.chip} aria-label={`${gameCoins} Game Coins`}><img src={coinIcon} alt="" width="20" height="20" />{gameCoins}<small>Coins</small></span>
          </div>
        </header>

        <section className={styles.hero} aria-labelledby="games-title">
          <span className={styles.eyebrow}>GAMES</span>
          <h1 id="games-title">Explore Games <span>&amp; Earn Rewards</span></h1>
          <p>Play with 20 Tokens, win Game Coins, redeem them for VEs, Gems and more.</p>
        </section>

        <div className={styles.rowHead}>
          <h2>Popular Games <small>{games ? `${games.length} games` : ""}</small></h2>
          <Link to="/all-games" className={styles.viewAll}>View All <ArrowRight size={16} /></Link>
        </div>

        {failed ? <ErrorState message="We couldn't load the games." onRetry={load} onBack={load} /> : !games ? <GamesSkeleton /> : (
          <GamesCarousel games={games} tokens={tokens} loadingId={loadingId} onPlay={onPlay} />
        )}

        <details className={styles.demo}>
          <summary>Demo controls</summary>
          <div className={styles.demoRow}>
            <span>Tokens:</span>
            <button type="button" onClick={() => setTokens(150)}>150</button>
            <button type="button" onClick={() => setTokens(12)}>12 (insufficient)</button>
            <button type="button" onClick={() => navigate("/redeem")}><Gift size={14} /> Redeem</button>
            <button type="button" onClick={resetDemo}><RotateCcw size={14} /> Reset data</button>
          </div>
        </details>
      </div>
    </div>
  );
}
