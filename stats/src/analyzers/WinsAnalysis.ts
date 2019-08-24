import { Analyzer } from "../Summary";
import { MatchData } from "../MatchData";
import { MatchResult } from "../MatchResult";

export class WinsAnalysis implements Analyzer {
  constructor(public teamName: string) {}
  run(matches: MatchData[]): string {
    const wins = matches.reduce((acc, match) => {
      if (match[1] === this.teamName && match[5] === MatchResult.HOMEWIN) {
        return acc + 1;
      }
      if (match[2] === this.teamName && match[5] === MatchResult.AWAYWIN) {
        return acc + 1;
      }
      return acc;
    }, 0);
    return String(wins);
  }
}
