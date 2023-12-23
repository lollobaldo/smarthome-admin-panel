import React, { useState, useRef, useEffect, useContext, createContext } from 'react';
import { connect, MqttClient, IClientPublishOptions } from 'mqtt/dist/mqtt';

import { useAuth } from 'brains/auth';
import { isTopicMatch } from 'brains/utils';

const mqttServer = 'mqtts://mqtt.flespi.io';
const mqttOptions = {
  username: process.env.REACT_APP_MQTT_USER, // TODO: fetch from auth endpoint
  port: 443,
};

const generateClientId = () => `SAP2--${Date.now().toString(36)}`;

type MqttStatus = 'connected' | 'reconnecting' | 'closed' | 'offline' | 'disconnected' | 'error';

type Messages = {
  [topic: string]: string,
};

type MqttCallbackFn = (topic: string, message: string) => void;

type MqttContextType = {
  mqtt: MqttClient | undefined,
  status: MqttStatus,
  messages: Messages,
  addCallback: (topic: string, callback: MqttCallbackFn) => void,
};

const MqttContext = createContext<MqttContextType>({
  mqtt: undefined, status: 'disconnected', messages: {}, addCallback: () => {},
});

type MqttProviderProps = { children: React.ReactNode };

export const MqttProvider = ({ children }: MqttProviderProps) => {
  const [status, setStatus] = useState<MqttStatus>('disconnected');
  const callbacks = useRef<{ [id: string]: MqttCallbackFn[] }>({});
  const [messages, setMessages] = useState<Messages>({});
  const { permissions } = useAuth().auth.user;

  const client = useRef<MqttClient>();

  const addCallback = (subscription: string, callback: MqttCallbackFn) => {
    const cbs = callbacks.current[subscription] ?? [];
    cbs.push(callback);
    callbacks.current[subscription] = [...new Set(cbs)];
    Object.entries(messages).forEach(([topic, message]) => {
      if (isTopicMatch(subscription, topic)) {
        callback(topic, message);
      }
    });
  };

  useEffect(() => {
    console.log(permissions);
    if (permissions === 'none' || permissions === 'guest') {
      return () => {};
    }
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

    mqttInstance.on('message', (topic, messageBuffer) => {
      const message = messageBuffer.toString();
      console.log(`Message in topic[${topic}]: ${message}`);
      setMessages((m) => ({ ...m, [topic]: message.toString() }));
      Object.entries(callbacks.current).forEach(([subscription, callbackFn]) => {
        if (isTopicMatch(subscription, topic)) {
          callbackFn.forEach(fn => fn(topic, message));
        }
      });
    });

    return () => {
      mqttInstance.end();
    };
  }, [permissions]);

  return (
    <MqttContext.Provider value={{ mqtt: client.current, status, messages, addCallback }}>
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

export const useMqttFull = (topic: string): { mqtt: MqttClient | undefined, state: string } => {
  const { mqtt, messages } = useContext(MqttContext);
  useEffect(() => {
    mqtt?.subscribe(topic);
  }, [mqtt, topic]);
  return { mqtt, state: messages[topic] };
};

export const useMqttCallback = (topicRegex: string, callbackFn: MqttCallbackFn) => {
  const { mqtt, addCallback } = useContext(MqttContext);
  useEffect(() => {
    addCallback(topicRegex, callbackFn);
    mqtt?.subscribe(topicRegex);
  }, [mqtt, topicRegex]);
};
