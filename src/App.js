import StackedBarChart from './Graph';
import SingleBarChart from './SingleBarChart';
import { getSingleData, getData } from './data';
import { useState } from 'react';

// https://www.d3-graph-gallery.com/graph/barplot_stacked_basicWide.html

const App = () => {
  const [data, setData] = useState(getSingleData());

  return (
    <div className="App">
      <div>
        <button onClick={() => setData(getSingleData())}>Update Data</button>
      </div>

      {/* <StackedBarChart data={data} /> */}
      <SingleBarChart data={data} />
    </div>
  );
};

export default App;
