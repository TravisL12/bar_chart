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
import styled from "styled-components";

const StyledApp = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
  margin: 10px;
`;

const App = () => {
  return (
    <StyledApp>
      <Graph componentProp={PieChart} getData={getPieData} />
      <Graph componentProp={LineChart} getData={getLineData} />
      <Graph componentProp={ScatterChart} getData={getScatterData} />
      <Graph componentProp={StackedBarChart} getData={getData} />
      <Graph componentProp={SingleBarChart} getData={getSingleData} />
    </StyledApp>
  );
};

export default App;
