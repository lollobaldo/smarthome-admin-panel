import React from 'react';
import styled from 'styled-components/macro';

import { groupBy } from 'brains/utils';
import { useLogs, LogLevel } from 'brains/influxdb/influxdb';

const logLevel2Color = (ll: LogLevel): string => {
  if (ll === 'LOG') return '';
  if (ll === 'WRN') return '#f80';
  return '#f00';
};

const StyledContainer = styled.div`
  display: flex;
  gap: 10px 20px;
  flex-wrap: wrap;
  overflow: scroll;
`;

const StyledRow = styled.div`
  grid-area: content;
  width: 100%;
`;

const Monitoring = () => {
  const logs = useLogs();
  const logsByDay = groupBy(logs, ({ time }) => time.toDateString());
  console.log(logsByDay);
  return (
    <StyledContainer>
      <StyledRow></StyledRow>
      {Object.entries(logsByDay).map(([day, logLines], i) => (
        <>
          <p key={i}>{day}</p>,
          {logLines.map(({ time, device, level, module, message }, ii) => (
            <StyledRow key={ii} data-module={module} style={{ color: logLevel2Color(level) }}>
              <span>{device}</span>
              <span>{message}</span>
            </StyledRow>
          ))}
        </>
      ))};
    </StyledContainer>
  );
};

export default Monitoring;
