import { useState } from "react";

// https://www.d3-graph-gallery.com/graph/barplot_stacked_basicWide.html

const Graph = ({ componentProp, getData }) => {
  const [data, setData] = useState(getData());
  const GraphComponent = componentProp;

  return (
    <div>
      <div>
        <button
          onClick={() => {
            const newData = getData();
            setData(newData);
          }}
        >
          Update Data
        </button>
      </div>

      <GraphComponent data={data} />
    </div>
  );
};

export default Graph;
