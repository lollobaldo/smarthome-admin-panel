import { Handler } from '@netlify/functions'

type AuthStatus = 'none' | 'guest' | 'normal' | 'admin';

type UserType = {
  permissions: AuthStatus,
  username?: string,
};

type Users = {
  [hash: string]: UserType
};

const users: Users = {
  [process.env.REACT_APP_ACCESS_CODE_Guest!]: {
    permissions: 'guest',
    username: 'guest',
  },
  [process.env.REACT_APP_ACCESS_CODE_Me!]: {
    permissions: 'admin',
    username: 'Lorenzo',
  },
  [process.env.REACT_APP_ACCESS_CODE_Massi!]: {
    permissions: 'guest',
    username: 'Massi',
  },
  [process.env.REACT_APP_ACCESS_CODE_Brombolina!]: {
    permissions: 'normal',
    username: 'Brombolina',
  },
  [process.env.REACT_APP_ACCESS_CODE_Zori!]: {
    permissions: 'normal',
    username: 'Zori',
  },
  [process.env.REACT_APP_ACCESS_CODE_Ramzy!]: {
    permissions: 'normal',
    username: 'Ramzy',
  },
  [process.env.REACT_APP_ACCESS_CODE_Apurv!]: {
    permissions: 'normal',
    username: 'Apurv',
  },
};

const readTokens = {
  mqtt: process.env.REACT_APP_MQTT_TOKEN_RW,
  influxDb: process.env.REACT_APP_INFLUXDB_TOKEN_RW,
};

const writeTokens = {
  mqtt: process.env.REACT_APP_MQTT_TOKEN_RW,
  influxDb: process.env.REACT_APP_INFLUXDB_TOKEN_RW,
};

export const handler: Handler = async (event, context) => {
  const authCode = event.queryStringParameters?.authCode || '';
  const user = users[authCode];

  if (!user || user.permissions === 'none') {
    return {
      statusCode: 401,
      body: JSON.stringify({
        message: 'Invalid auth code',
      }),
    }
  }

  if(user.permissions === 'guest') {
    return {
      statusCode: 200,
      body: JSON.stringify({
        user,
        tokens: readTokens,
      }),
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      user,
      tokens: writeTokens,
    }),
  }
}
