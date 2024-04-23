import useMultiDeviceRO from 'brains/devices/useMultiDevice';

type LoveApi = {
  logs: LoveLog[],
};

export type LoveLog =  {
  time: Date,
  page: string,
  userAgent: string,
  platform: string,
  ip: string,
  trace: {
    isp : string,
    city : string,
    connection_type : string,
  }
};

const defaultState: LoveLog[] = [];

const message2state = (topic: string, message: string, oldState: LoveLog[] = defaultState ): LoveLog[] => {
  if (!topic || !message) {
    return oldState;
  }
  const data = JSON.parse(message);
  data.time = new Date(data.time);
  oldState.push(data);
  const unique = [...new Set(oldState)];
  unique.sort((a, b) => b.time.getTime() - a.time.getTime());
  return unique;
};

const useLove = (topic: string = 'love/#'): LoveApi => {
  const logs = useMultiDeviceRO<LoveLog[]>({ topic, defaultState, message2state });

  return { logs };
};

export default useLove;
