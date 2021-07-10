import StackedBarChart from "./StackedBarChart";
import SingleBarChart from "./SingleBarChart";
import ScatterChart from "./ScatterChart";
import LineChart from "./LineChart";
import { getSingleData, getData, getScatterData, getLineData } from "./data";
import Graph from "./Graph";

// https://www.d3-graph-gallery.com/graph/barplot_stacked_basicWide.html

const App = () => {
  return (
    <div className="App">
      <Graph componentProp={LineChart} getData={getLineData} />
      <Graph componentProp={ScatterChart} getData={getScatterData} />
      <Graph componentProp={StackedBarChart} getData={getData} />
      <Graph componentProp={SingleBarChart} getData={getSingleData} />
    </div>
  );
};

export default App;
