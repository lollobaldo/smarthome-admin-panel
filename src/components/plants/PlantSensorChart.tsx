import React from 'react';
import styled from 'styled-components/macro';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, XAxisProps } from 'recharts';
import { scaleTime } from 'd3-scale';

import { useSensor } from 'brains/influxdb/influxdb';
import { Widget } from 'components/bits/Card';
import { MissingData } from 'components/bits/Errors';

const Container = styled(Widget)`
  height: auto;
  flex-grow: 1;
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PlantSensorChart = ({ id }: { id: string }) => {
  const humidityData = useSensor('humidity');
  const temperatureData = useSensor('temperature');
  console.log(`Found ${humidityData.length} humidity datapoints. Sample:`, humidityData[0]);
  console.log(`Found ${humidityData.length} temperature datapoints. Sample:`, temperatureData[0]);
  const numericValues = humidityData.map(row => row.time).map(time => time.valueOf());
  const timeScale = scaleTime().domain([Math.min(...numericValues), Math.max(...numericValues)]).nice();

  const xAxisArgs: XAxisProps = {
    domain: timeScale.domain().map(date => date.valueOf()),
    scale: 'time',
    type: 'number',
    ticks: timeScale.ticks(3).map(date => date.valueOf()),
    tickFormatter: timeScale.tickFormat(),
  };
  console.log(xAxisArgs);
  return (
    <Container>
      {!humidityData
        ? <MissingData />
        : (
          <ResponsiveContainer width="99%">
            <LineChart>
              <Line type="monotone" data={humidityData} dataKey="value" stroke="#8884d8" dot={false} />
              <Line type="monotone" data={temperatureData} dataKey="value" stroke="#8884d8" dot={false} />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <XAxis dataKey="time" {...xAxisArgs} />
              <YAxis domain={[0, 100]} />
            </LineChart>
          </ResponsiveContainer>
        )
      }
    </Container>
  );
};

export default PlantSensorChart;
