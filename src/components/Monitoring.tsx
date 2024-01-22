import React from 'react';
import styled from 'styled-components/macro';

import { groupBy } from 'brains/utils';
import { useLogs, LogLevel } from 'brains/influxdb/influxdb';
import { useMultiTogglesNoneIsAll } from 'brains/hooks';
import { Card } from 'components/bits/Card';
import { NoData } from './bits/Errors';

const log2Colors: { [ll in LogLevel]: string } = {
  LOG: '#555',
  WRN: '#f80',
  ERR: '#f00',
};
const logLevel2Color = (ll: LogLevel): string => log2Colors[ll] || log2Colors.ERR;

const StyledFilter = styled(Card)<{ filterColor: string, active: boolean }>`
  border: 1px solid ${props => props.filterColor};

  background: ${props => props.active ? props.filterColor : ''};
  color: ${props => props.active ? 'white' : props.filterColor};
  ${props => !props.active ? 'box-shadow: none' : ''}
`;

const StyledFilters = styled.div`
  width: 100%;
  padding: 16px;
  display: flex;
  gap: 16px;
  align-items: center;
`;

const Filters = ({ activeFilters, toggleFilter }: any) => {
  return (
    <StyledFilters>
      <b>Log Levels:</b>
      {Object.entries(log2Colors).map(([ll, filterColor]) => (
        <StyledFilter
          key={ll}
          filterColor={filterColor}
          active={activeFilters.has(ll)}
          onClick={() => toggleFilter(ll)}>
            {ll}
        </StyledFilter>
      ))}
    </StyledFilters>
  );
};

const StyledContainer = styled.div`
  height: 100%;
  display: flex;
  gap: 10px 20px;
  flex-wrap: wrap;
  overflow: scroll;
  align-content: flex-start;

  & p {
    margin: 0;
  }
`;

const StyledRow = styled.div`
  flex: 1 1 100%;
`;

const Monitoring = () => {
  const logs = useLogs();
  const [activeFilters, toggleFilter] = useMultiTogglesNoneIsAll(new Set(Object.keys(log2Colors)));
  const filteredLogs = logs.filter(log => activeFilters.has(log.level));
  const logsByDay = groupBy(filteredLogs, ({ time }) => time.toDateString());
  console.log(logsByDay);
  return (
    <StyledContainer>
      <Filters activeFilters={activeFilters} toggleFilter={toggleFilter} />
      {!Object.keys(logsByDay).length ?
        <NoData msg="No logs found matching the query." /> :
        Object.entries(logsByDay).map(([day, logLines], i) => (
          <>
            <b key={i}>{day}</b>
            {logLines.map(({ device, level, module, message }, ii) => (
              <StyledRow key={ii} data-module={module} style={{ color: logLevel2Color(level) }}>
                <span>{device}</span> <span>{message}</span>
              </StyledRow>
            ))}
          </>
        ))}
    </StyledContainer>
  );
};

export default Monitoring;
