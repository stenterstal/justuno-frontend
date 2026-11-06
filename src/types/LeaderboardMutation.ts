export default interface LeaderboardMutation {
  player: string;
  // null when this game is the player's first of the month
  old_position: number | null;
  new_position: number;
  delta: number | null;
}