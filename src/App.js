import StackedBarChart from "./StackedBarChart";
import SingleBarChart from "./SingleBarChart";
import { getSingleData, getData } from "./data";
import Graph from "./Graph";

const App = () => {
  return (
    <div className="App">
      <Graph componentProp={StackedBarChart} getData={getData} />
      <Graph componentProp={SingleBarChart} getData={getSingleData} />
    </div>
  );
};

export default App;
