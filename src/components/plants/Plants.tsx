import React from 'react';
import { Routes, Route, useParams } from 'react-router-dom';

import usePlants, { PlantState } from 'brains/devices/usePlants';
import PlantsList from './PlantsList';
import PlantDetails from './PlantDetails';
import { DeviceCard } from 'components/bits/Card';

import plantIcon from 'res/icons/plant-potted.svg';

export const PlantsCard = () => {
  const plantSwitch = <span>22%</span>;

  return (
    <DeviceCard name="Plants" path="plants" iconSrc={plantIcon} value={plantSwitch} />
  );
};

const PlantDetailsWrapper = ({ plants }: { plants: { [id: string]: PlantState } }) => {
  const { plantId } = useParams();
  const plant = plantId && plants[plantId];
  return (
    plant ? <PlantDetails {...plant} /> : <p>Unknown Plant</p>
  );
};

const Plants = () => {
  const { plantsState } = usePlants();
  return (
    <Routes>
      <Route path="/" element={<PlantsList plantsState={plantsState} />} />
      <Route path="/plant/:plantId" element={<PlantDetailsWrapper plants={plantsState.plants} />} />
    </Routes>
  );
};

export default Plants;
