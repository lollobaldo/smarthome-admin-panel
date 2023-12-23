import useMultiDeviceRO from 'brains/devices/useMultiDevice';

type PlantApi = {
  plantsState: PlantsState,
  setName: (name: string) => void,
};

export type Id = { id: string };
export type Name = { name: string };
export type PlantInfo = {
  species: string,
  description: string,
  dob: Date,
  driveId: string,
  group?: string,
};

type Telemetry = {
  last_watering?: Date,
  temperature?: number,
  humidity?: number,
};

type GroupState = Id & Name & Telemetry & {
  plants: string[],
};

export type PlantState = Id & Name & PlantInfo & Telemetry;

export type PlantsState = {
  groups: {
    [id: string]: GroupState,
  },
  plants: {
    [id: string]: PlantState,
  }
};

const defaultState = { groups: {}, plants: {} };

const handleGroupUpdate = (topic: string, message: string, oldState: PlantsState): PlantsState => {
  const paths = topic.split('/');
  if (paths.length !== 3) { // expected path: plants/groups/:id
    console.log(`Unexpected topic structure: ${topic}`);
    return oldState;
  }
  const groupId = paths[2];
  const group: Name = JSON.parse(message);
  oldState.groups[groupId] = {
    ...{ plants: [] }, // hack to avoid typescript bug
    ...oldState.groups[groupId],
    ...{ id: groupId, ...group },
  };
  if (oldState.groups[groupId].plants) {
    for (const [plantId, plant] of Object.entries(oldState.plants)) {
      if (plant.group === groupId) {
        console.log(`Adding plant ${plantId} to group ${groupId}`);
        oldState.groups[groupId].plants.push(plantId);  
      }
    }
  }
  return oldState;
};

const handlePlantUpdate = (topic: string, message: string, oldState: PlantsState): PlantsState => {
  const paths = topic.split('/');
  if (paths.length !== 3) { // expected path: plants/plants/:id
    console.log(`Unexpected topic structure: ${topic}`);
    return oldState;
  }
  const plantId = paths[2];
  const plant: Name & PlantInfo = JSON.parse(message);
  const groupId = plant.group;
  oldState.plants[plantId] = {
    ...oldState.plants[plantId],
    ...{ ...plant, id: plantId, dob: new Date(plant.dob) },
  };
  if (groupId !== undefined) {
    const group = oldState.groups[groupId];
    oldState.groups[groupId] = {
      ...group,
      plants: [...group.plants, plantId],
    };
  }
  return oldState;
};

const message2state = (topic: string, message: string, oldState: PlantsState = defaultState ): PlantsState => {
  console.log('message2state');
  if (!topic || !message) {
    return oldState;
  }
  if (topic.startsWith('plants/groups')) {
    return handleGroupUpdate(topic, message, oldState);
  }
  if (topic.startsWith('plants/plants')) {
    return handlePlantUpdate(topic, message, oldState);
  }
  return oldState;
};

// const state2message = ({ state, color }: LedsState): string => (`${state ? 'N' : 'F'}${color}`);

const usePlants = (topic: string = 'plants/#'): PlantApi => {
  const plantsState = useMultiDeviceRO<PlantsState>({ topic, defaultState, message2state });
  const setName = (name: string) => console.log(name);

  return { plantsState, setName };
};

export default usePlants;
