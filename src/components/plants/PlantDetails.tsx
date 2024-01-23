import React from 'react';
import styled from 'styled-components/macro';

import { useOneOfToggle } from 'brains/hooks';
import { useSensor, useSensorInstant } from 'brains/influxdb/influxdb';
import { PlantState, PlantInfo, Id } from 'brains/devices/usePlants';
import TimeChart from 'components/bits/TimeChart';
import DriveImg from 'components/bits/DriveImg';
import { Card } from 'components/bits/Card';
import { PlainStats } from 'components/bits/StatsCard';
import { NoData } from 'components/bits/Errors';
import LookbackDays from 'components/bits/LookbackDays';
import Fab from 'components/bits/Fab';

import thermometerIcon from 'res/icons/thermometer.svg';
import humidityIcon from 'res/icons/hygrometer.svg';
import sunIcon from 'res/icons/sun.svg';
import wateringIcon from 'res/icons/watering-can.svg';

const StyledDetailCard = styled(Card)`
  height: max(10%, 140px);
  flex-wrap: nowrap;
  align-items: stretch;
  gap: 16px;

  & h1, p {
    margin: auto 0;
  }

  & img {
    max-width: 128px;
    max-height: 128px;
    flex-shrink: 0;
  }
`;

const DetailsText = styled.div`
  display: flex;
  flex-direction: column;
`;

const Details = ({ name, species, dob, driveId }: PlantInfo) => (
  <StyledDetailCard>
    <DriveImg driveId={driveId} alt={name} />
    <DetailsText>
      <div>
        <h1>{name}</h1>
        <p>{species}</p>
      </div>
      <p>DOB: {dob.toLocaleDateString()}</p>
    </DetailsText>
  </StyledDetailCard>
);

const SensorsDataContainer = styled(Card)`
  flex: 1 1 auto;
  flex-flow: column nowrap;
  align-items: stretch;
  gap: 16px;
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SensorsData = ({ id }: Id) => {
  const [lookbackDays, changeLookbackDays] = useOneOfToggle(5);
  const humidity = useSensor('humidity', lookbackDays);
  const temperature = useSensor('temperature', lookbackDays);
  const illuminance = useSensor('illuminance', lookbackDays);

  const humidityInstant = useSensorInstant('humidity');
  const temperatureInstant = useSensorInstant('temperature');
  const illuminanceInstant = useSensorInstant('illuminance');

  const hasData = humidity.data.length || temperature.data.length || illuminance.data.length;

  const stats = [
    { title: 'Temp', unit: temperatureInstant.unit, value: temperatureInstant.point?.value, icon: thermometerIcon },
    { title: 'RH', unit: humidityInstant.unit, value: humidityInstant.point?.value, icon: humidityIcon },
    { title: 'Light', unit: illuminanceInstant.unit, value: illuminanceInstant.point?.value, icon: sunIcon },
  ];

  const chartData = [
    { data: temperature.data, stroke: '#ff3d00' },
    { data: humidity.data, stroke: '#2196f3' },
    { data: illuminance.data, stroke: '#ffac33' },
  ];

  const lookbackDaysOptions = [1, 2, 5, 30];

  return (
    <SensorsDataContainer>
      <PlainStats stats={stats} />
      <LookbackDays selected={lookbackDays} options={lookbackDaysOptions} changeLookbackDays={changeLookbackDays} />
      {hasData
        ? <TimeChart lines={chartData} />
        : <NoData msg={`No data found for sensor ${id}`} />
      }
    </SensorsDataContainer>
  );
};

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  align-items: stretch;
  gap: 16px;
  padding: 16px;
`;

const PlantDetails = ({ id, ...plantDetails }: PlantState) => (
  <Container>
    <Details {...plantDetails} />
    <SensorsData id={id} />
    <Fab title="" iconSrc={wateringIcon} />
  </Container>
);

export default PlantDetails;
