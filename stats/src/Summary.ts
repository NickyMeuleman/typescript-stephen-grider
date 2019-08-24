import { MatchData } from "./MatchData";
import { WinsAnalysis } from "./analyzers/WinsAnalysis";
import { HtmlReport } from "./reportTargets/HtmlReport";
import { ConsoleReport } from "./reportTargets/ConsoleReport";

export interface Analyzer {
  run(matches: MatchData[]): string;
}

export interface OutputTarget {
  print(report: string): void;
}

export class Summary {
  // this is the longer version as alternative to the 'public' in constructor syntax.
  analyzer: Analyzer;
  outputTarget: OutputTarget;
  constructor(analyzer: Analyzer, outputTarget: OutputTarget) {
    this.analyzer = analyzer;
    this.outputTarget = outputTarget;
  }
  static winsAnalysisWithHtmlReport(teamName: string): Summary {
    return new Summary(new WinsAnalysis(teamName), new HtmlReport());
  }
  static winsAnalysisWithConsoleReport(teamName: string): Summary {
    return new Summary(new WinsAnalysis(teamName), new ConsoleReport());
  }
  buildAndPrintReport(matches: MatchData[]): void {
    const analysis = this.analyzer.run(matches);
    this.outputTarget.print(analysis);
  }
}
