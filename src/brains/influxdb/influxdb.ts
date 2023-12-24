/* eslint-disable @typescript-eslint/quotes */
import { useState, useEffect } from 'react';
import { InfluxDB } from 'influx';
import Papa from 'papaparse';

import { useAuth } from 'brains/auth';

const INFLUXDB_HOST = 'https://eu-central-1-1.aws.cloud2.influxdata.com';

type Sensor = 'humidity' | 'temperature';
type RawSensorPoint = { _time: Date, _value: number };
type SensorPoint = { time: Date, value: number };

export type LogLevel = 'LOG' | 'WRN' | 'ERR';
type RawLogItem = { _time: Date, device: string, level: LogLevel, module: string, _value: string };
type LogItem = { time: Date, device: string, level: LogLevel, module: string, message: string };

const queryInfluxDb = async (token: string, query: string) => {
  let endpoint = `${INFLUXDB_HOST}/api/v2/query?orgID=0bdeaee947606b91`;

  try {
    const response = await fetch(endpoint, { 
      method: 'post',
      headers: new Headers({
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({ query }),
    });
    if (!response.ok) {
      return false;
    }
    const json = await response;
    return json;
  } catch (error) {
    console.error(error);
  }
};

const useInflux = <T>(query: string): T[] => {
  const [client, setClient] = useState<InfluxDB | undefined>(undefined);
  const [data, setData] = useState<T[]>([]);

  const { influxDb } = useAuth().auth.tokens;

  if (!client && influxDb) {
    console.log("'Connecting to InfluxDB'");
  }

  useEffect(() => {
    const fetchData = async () => {
      const rows = await queryInfluxDb(influxDb, query);
      const b = rows && rows.text() // eslint-disable-line
        .then((csv: string) => Papa.parse<T>(csv, { header: true, skipEmptyLines: true }))
        .then((json) => setData(json.data));
    };
    fetchData();  
    return setClient(undefined);
  }, [influxDb, query]);

  return data;
};

export const useLogs = (): LogItem[] => {
  const query = `\
  from(bucket: "smarthome")\
    |> range(start: 2000-08-01T00:00:00Z)\
    |> filter(fn: (r) => exists r.level)\
    |> keep(columns: ["_time", "device", "level", "module", "_value"])\
  `;
  const data = useInflux<RawLogItem>(query);
  return data && data.map(({ _time, _value, ...rest }) => ({ time: new Date(_time), message: _value, ...rest }));
};

export const useSensor = (sensorType: Sensor): SensorPoint[] => {
  const query = `\
  from(bucket: "smarthome")\
    |> range(start: -2d)\
    |> filter(fn: (r) => r._field == "${sensorType}")\
    |> timedMovingAverage(every: 30m, period: 30m)\
    |> keep(columns: ["_time", "_value"])\
  `;
  const data = useInflux<RawSensorPoint>(query);
  return data && data.map(({ _time, _value }) => ({ time: new Date(_time), value: _value }));
};
