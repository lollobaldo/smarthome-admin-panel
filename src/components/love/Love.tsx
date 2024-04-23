import React from 'react';
import { Routes, Route, useParams } from 'react-router-dom';

import useLove, { LoveLog } from 'brains/devices/useLove';
import DeviceCard from 'components/bits/DeviceCard';

import loveIcon from 'res/icons/heart.svg';

export const LoveCard = () => {
  return (
    <DeviceCard name="Love" path="love" iconSrc={loveIcon} value={null} />
  );
};

const Log = ({ log }: { log: LoveLog }) => {
  console.log(log);
  return (
    <div>
      <p>{log.time.toLocaleString('en-UK',  {
        weekday: 'short', // long, short, narrow
        day: 'numeric', // numeric, 2-digit
        hour: 'numeric', // numeric, 2-digit
        minute: 'numeric', // numeric, 2-digit
      })} on {log.platform} {log.trace ? `(${log.trace.city})` : ''}</p>
      <p>{log.page === 'index.html' ? 'Home' : 'Yes'} from {log.ip} {log.trace ? `(${log.trace.isp})` : ''}</p>
      <hr/>
    </div>
  );
};

const Love = () => {
  const { logs } = useLove();
  return (
    <div style={{ height: '100%', overflow: 'scroll' }}>
      {logs.map(log => <Log log={log} />)}
    </div>
  );
};

export default Love;
