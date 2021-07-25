import {
  getSingleData,
  getData,
  getScatterData,
  getLineData,
  getPieData,
} from "./data";
import Graph from "./Graph";
import StackedBarChart from "./graphs/StackedBarChart";
import SingleBarChart from "./graphs/SingleBarChart";
import ScatterChart from "./graphs/ScatterChart";
import LineChart from "./graphs/LineChart";
import PieChart from "./graphs/PieChart";

// https://www.d3-graph-gallery.com/graph/barplot_stacked_basicWide.html

const App = () => {
  return (
    <div className="App">
      <Graph componentProp={PieChart} getData={getPieData} />
      <Graph componentProp={LineChart} getData={getLineData} />
      <Graph componentProp={ScatterChart} getData={getScatterData} />
      <Graph componentProp={StackedBarChart} getData={getData} />
      <Graph componentProp={SingleBarChart} getData={getSingleData} />
    </div>
  );
};

export default App;
