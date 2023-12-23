import React, { useState, useEffect } from 'react';

const REFRESH_RATE = 1000 * 60; // 1 minute
const BUS_STOP = '490000004E';

type TflApiResponse = {
  lineId: string,
  lineName: string,
  timeToStation: number,
  expectedArrival: Date,
}[];

type TflStatus = {
  [line: string]: Date[];
};

export const useTflData = () => {
  const [lines, setLines] = useState<TflStatus>({});

  useEffect(() => {
    const fetchData = () => {
      console.log('Fetching tfl data...');
      fetch(`https://api.tfl.gov.uk/StopPoint/${BUS_STOP}/arrivals`)
        .then(response => {
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          return response.json() as Promise<TflApiResponse>;
        })
        .then(data => {
          setLines(data.reduce((map: TflStatus, obj) => {
            if (!map[obj.lineId]) map[obj.lineId] = [];
            map[obj.lineId].push(obj.expectedArrival);
            map[obj.lineId].sort();
            return map;
          }, {}));
        });
    };
    fetchData();
    const loop = setInterval(fetchData, REFRESH_RATE);
  
    return () => clearInterval(loop);
  }, []);

  return lines;
};
