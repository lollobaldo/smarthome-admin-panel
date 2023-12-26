import React from 'react';
import styled from 'styled-components/macro';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, XAxisProps } from 'recharts';
import { scaleTime } from 'd3-scale';

import { SensorPoint } from 'brains/influxdb/influxdb';

const Container = styled.div`
  width: 100%;
  flex: 1 1 auto;
`;

const PlantSensorChart = ({ data }: { data: SensorPoint[][] }) => {
  const times = data.map(line => line.map(point => point.time.valueOf())).flat();
  const timeScale = scaleTime().domain([Math.min(...times), Math.max(...times)]).nice();

  const xAxisArgs: XAxisProps = {
    domain: timeScale.domain().map(date => date.valueOf()),
    scale: 'time',
    type: 'number',
    ticks: timeScale.ticks(3).map(date => date.valueOf()),
    tickFormatter: timeScale.tickFormat(),
  };

  return (
    <Container>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart>
          {data.map(line => <Line type="monotone" data={line} dataKey="value" stroke="#8884d8" dot={false} />)}
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="time" {...xAxisArgs} />
          <YAxis domain={[0, 100]} width={30} />
        </LineChart>
      </ResponsiveContainer>
    </Container>
  );
};

export default PlantSensorChart;
