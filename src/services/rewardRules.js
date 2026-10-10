import { getGame } from "../data/gamesData";

export function calculateReward(slug, score) {
  const rule = getGame(slug)?.reward;
  if (!rule || score <= 0) return 0;
  return Math.max(rule.min, Math.min(rule.cap, Math.floor(score / rule.perPoints)));
}
