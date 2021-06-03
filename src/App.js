import StackedBarChart from './Graph';
import { getData } from './data';
import { useState } from 'react';

// https://www.d3-graph-gallery.com/graph/barplot_stacked_basicWide.html

const App = () => {
  const [data, setData] = useState(getData());

  return (
    <div className="App">
      <div>
        <button onClick={() => setData(getData())}>Update Data</button>
      </div>

      <StackedBarChart data={data} />
    </div>
  );
};

export default App;
