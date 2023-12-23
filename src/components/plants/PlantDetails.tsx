import React from 'react';
import styled from 'styled-components/macro';

import { PlantState, PlantInfo } from 'brains/devices/usePlants';

import PlantSensorChart from './PlantSensorChart';

import DriveImg from 'components/bits/DriveImg';
import { Widget } from 'components/bits/Card';

const StyledDetailCard = styled(Widget)`
  flex-grow: 0;
  height: auto;
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  gap: 16px;
  align-items: stretch;

  & h1, p {
    margin: auto 0;
  }
`;

const DetailsText = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: space-evenly;
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

const StyledPlantDetails = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  flex-shrink: 0;
  align-items: stretch;
  & img {
    max-width: 128px;
    max-height: 128px;
    flex-shrink: 0;
  }
  & h4 {
    text-align: center;
    flex: 0 0 100%;
  }
`;

const PlantDetails = ({ id, ...plantDetails }: PlantState) => (
  <StyledPlantDetails>
    <Details {...plantDetails} />
    <PlantSensorChart id={id} />
  </StyledPlantDetails>
);

export default PlantDetails;
