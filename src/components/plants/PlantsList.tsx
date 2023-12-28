import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components/macro';

import { PlantsState } from 'brains/devices/usePlants';
import { groupBy } from 'brains/utils';
import { Card } from 'components/bits/Card';
import DriveImg from 'components/bits/DriveImg';


const StyledPlantPreview = styled(Card)`
  width: 30%;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  flex-shrink: 0;
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

type PlantPreviewProps = {
  name: string,
  driveId: string,
  onClick: () => void,
};

const PlantPreview = ({ name, driveId, onClick }: PlantPreviewProps) => (
  <StyledPlantPreview onClick={onClick}>
    <DriveImg driveId={driveId} alt={name} />
    <h4>{name}</h4>
  </StyledPlantPreview>
);

const StyledPlantsList = styled.div`
  padding: 16px;
  max-width: 100vw;
  display: flex;
  overflow: scroll;
  justify-content: flex-start;
  gap: 16px;
`;

const PlantsGroup = styled.div`
  & h2 {
    margin: 0 16px;
  }
`;

const Container = styled.div`
  height: 100%;
  margin-top: 16px;
`;

const PlantsList = ({ plantsState }: { plantsState: PlantsState }) => {
  const navigate = useNavigate();
  const plantsByGroup = groupBy(Object.values(plantsState.plants), ({ group }) => group || 'Others');
  return (
    <Container>
      {Object.entries(plantsByGroup).sort(([a], [b]) => a.localeCompare(b)).map(([groupId, plants]) => (
        <PlantsGroup key={groupId}>
          <h2>{plantsState.groups[groupId]?.name || 'Others'}</h2>
          <StyledPlantsList>
            {plants.map(({ id, name, driveId }) => (
              <PlantPreview key={id} driveId={driveId} name={name} onClick={() => navigate(`plant/${id}`)} />
            ))}
          </StyledPlantsList>
        </PlantsGroup>
      ))}
    </Container>
  );
};

export default PlantsList;
