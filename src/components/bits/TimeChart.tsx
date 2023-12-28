import React from 'react';
import styled from 'styled-components/macro';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, XAxisProps } from 'recharts';
import { scaleTime } from 'd3-scale';

import { SensorPoint } from 'brains/influxdb/influxdb';

export interface LineProps {
  data: SensorPoint[],
  stroke?: string,
}

const Container = styled.div`
  width: 100%;
  flex: 1 1 auto;
`;

const TimeChart = ({ lines }: { lines: LineProps[] }) => {
  const times = lines.map(line => line.data.map(point => point.time.valueOf())).flat();
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
          {lines.map(line => <Line type="monotone" data={line.data} dataKey="value" stroke={line.stroke} dot={false} />)}
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="time" {...xAxisArgs} />
          <YAxis domain={[0, 100]} width={30} />
        </LineChart>
      </ResponsiveContainer>
    </Container>
  );
};

export default TimeChart;
