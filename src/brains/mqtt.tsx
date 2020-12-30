import React, { useState, useRef, useEffect, useContext, createContext } from 'react';
import { connect, MqttClient, IClientPublishOptions } from 'mqtt';

const mqttServer = 'mqtts://mqtt.flespi.io';
const mqttOptions = {
  username: process.env.REACT_APP_MQTT_USER,
  port: 443,
};

const generateClientId = () => `SAP2--${Date.now().toString(36)}`;

type MqttStatus = 'connected' | 'reconnecting' | 'closed' | 'offline' | 'disconnected' | 'error';

type MqttContextType = {
  mqtt: MqttClient | undefined,
  status: MqttStatus,
  messages: {
    [topic: string]: string,
  },
};

const MqttContext = createContext<MqttContextType>({
  mqtt: undefined, status: 'disconnected', messages: {},
});

type MqttProviderProps = { children: React.ReactNode };

export const MqttProvider = ({ children }: MqttProviderProps) => {
  const [status, setStatus] = useState<MqttStatus>('disconnected');
  const [messages, setMessages] = useState({});

  const client = useRef<MqttClient>();

  useEffect(() => {
    const credentials = { ...mqttOptions, clientId: generateClientId() };
    console.log(mqttServer, credentials);
    const mqttInstance = connect(mqttServer, credentials);
    client.current = mqttInstance;
    mqttInstance.on('connect', () => {
      console.log('connected');
      setStatus('connected');
    });
    mqttInstance.on('reconnect', () => setStatus('reconnecting'));
    mqttInstance.on('close', () => setStatus('closed'));
    mqttInstance.on('disconnect', () => setStatus('disconnected'));
    mqttInstance.on('offline', () => setStatus('offline'));
    mqttInstance.on('error', (e) => {
      console.log(e);
      setStatus('error');
    });

    mqttInstance.on('message', (topic, message) => {
      console.log(`Message in topic[${topic}: ${message}]`);
      setMessages((m) => ({ ...m, [topic]: message.toString() }));
    });

    return () => {
      mqttInstance.end();
    };
  }, []);

  return (
    <MqttContext.Provider value={{ mqtt: client.current, status, messages }}>
      {children}
    </MqttContext.Provider>
  );
};

export const useMqttStatus = (): MqttStatus => (useContext(MqttContext).status);

export const useMqttPublish = (topic: string, message: string, opt: IClientPublishOptions) => {
  const { mqtt } = useContext(MqttContext);
  useEffect(() => {
    mqtt?.publish(topic, message, { retain: true, ...opt });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return mqtt;
};

export const useMqttSubscribe = (topic: string): string => {
  const { mqtt, messages } = useContext(MqttContext);
  useEffect(() => {
    mqtt?.subscribe(topic);
  }, [mqtt, topic]);
  return messages[topic];
};

export const useMqttFull = (topic: string): { mqtt: MqttClient | undefined, state: string} => {
  const { mqtt, messages } = useContext(MqttContext);
  useEffect(() => {
    mqtt?.subscribe(topic);
  }, [mqtt, topic]);
  return { mqtt, state: messages[topic] };
};
