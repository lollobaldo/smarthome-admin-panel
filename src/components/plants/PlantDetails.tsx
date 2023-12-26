import React from 'react';
import styled from 'styled-components/macro';

import { useSensor } from 'brains/influxdb/influxdb';
import { PlantState, PlantInfo, Id } from 'brains/devices/usePlants';
import PlantSensorChart from './PlantSensorChart';
import DriveImg from 'components/bits/DriveImg';
import { Card } from 'components/bits/NewCard';
import { PlainStats } from 'components/bits/StatsCard';

import thermometerIcon from 'res/icons/thermometer.svg';
import humidityIcon from 'res/icons/hygrometer.svg';
import sunIcon from 'res/icons/sun.svg';
import { NoData } from 'components/bits/Errors';

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
  const data = [
    { title: 'Temp', value: '24°C', icon: thermometerIcon },
    { title: 'RH', value: '78%', icon: humidityIcon },
    { title: 'Light', value: '900lx', icon: sunIcon },
  ];
  const humidityData = useSensor('humidity');
  const temperatureData = useSensor('temperature');
  const illuminanceData = useSensor('illuminance');
  const hasData = humidityData.length || temperatureData.length || illuminanceData.length;
  console.log(humidityData, temperatureData, illuminanceData, hasData, !!hasData);
  return (
    <SensorsDataContainer>
      <PlainStats stats={data} />
      {hasData
        ? <PlantSensorChart data={[humidityData, temperatureData, illuminanceData]} />
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
  </Container>
);

export default PlantDetails;
