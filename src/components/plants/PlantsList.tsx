import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components/macro';

import { PlantsState } from 'brains/devices/usePlants';
import { groupBy } from 'brains/utils';
import { SmallWidgetCard } from 'components/bits/Card';
import DriveImg from 'components/bits/DriveImg';


const StyledPlantPreview = styled(SmallWidgetCard)`
  display: flex;
  flex-wrap: wrap;
  width: 30%;
  height: auto;
  align-items: flex-end;
  flex-shrink: 0;
  & img {
    max-width: 128px;
    max-height: 128px;
    flex-shrink: 0;
    /* flex: 0 0 100%; */
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

const StyledPlantsContainer = styled.div`
  display: flex;
  overflow: scroll;
  justify-content: flex-start;
  max-width: 100vw;
`;

const Container = styled.div`
  & h2 {
    margin-bottom: 0;
  }
`;

const PlantsList = ({ plantsState }: { plantsState: PlantsState }) => {
  const navigate = useNavigate();
  const plantsByGroup = groupBy(Object.values(plantsState.plants), ({ group }) => group || 'Others');
  return (
    <Container>
      {Object.entries(plantsByGroup).sort(([a], [b]) => a.localeCompare(b)).map(([groupId, plants]) => (
        <div key={groupId}>
          <h2>{plantsState.groups[groupId]?.name || 'Others'}</h2>
          <StyledPlantsContainer>
            {plants.map(({ id, name, driveId }) => (
              <PlantPreview key={id} driveId={driveId} name={name} onClick={() => navigate(`plant/${id}`)} />
            ))}
          </StyledPlantsContainer>
        </div>
      ))}
    </Container>
  );
};

export default PlantsList;
