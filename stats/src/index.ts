import { MatchReader } from "./MatchReader";
import { CsvFileReader } from "./CsvFileReader";
import { WinsAnalysis } from "./analyzers/WinsAnalysis";
import { ConsoleReport } from "./reportTargets/ConsoleReport";
import { Summary } from "./Summary";
import { HtmlReport } from "./reportTargets/HtmlReport";

// first option
const matchCsvReader = new CsvFileReader("football.csv");
const matchReader = new MatchReader(matchCsvReader);
matchReader.load();

//second option, requires static method that returns a preconfigured Summary class
const matchReader2 = MatchReader.fromCsv("football.csv");
matchReader2.load();

// first option
const manUAnalyzer = new WinsAnalysis("Man United");
const manUConsoleReporter = new ConsoleReport();
const manUHtmlReporter = new HtmlReport();
const manUConsoleSummary = new Summary(manUAnalyzer, manUConsoleReporter);
const manUHtmlSummary = new Summary(manUAnalyzer, manUHtmlReporter);
manUConsoleSummary.buildAndPrintReport(matchReader.matches);
manUHtmlSummary.buildAndPrintReport(matchReader.matches);

//second option, requires static method that returns a preconfigured Summary class
const manCityHtmlSummary = Summary.winsAnalysisWithHtmlReport("Man City");
const manCityConsoleSummary = Summary.winsAnalysisWithConsoleReport("Man City");
manCityHtmlSummary.buildAndPrintReport(matchReader2.matches);
manCityConsoleSummary.buildAndPrintReport(matchReader2.matches);
