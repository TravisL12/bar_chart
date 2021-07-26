import { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 10px;
  background: #f3f3f3;
`;

const Graph = ({ componentProp, getData }) => {
  const [data, setData] = useState(getData());
  const GraphComponent = componentProp;

  return (
    <Wrapper>
      <div>
        <GraphComponent data={data} />
      </div>
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
    </Wrapper>
  );
};

export default Graph;
