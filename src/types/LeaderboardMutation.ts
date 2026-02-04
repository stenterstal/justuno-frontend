export default interface LeaderboardMutation {
  player: string;
  old_position: number;
  new_position: number;
  delta: number;
}