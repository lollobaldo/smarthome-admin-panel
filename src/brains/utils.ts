export async function gen2array<T>(gen: AsyncIterable<T>): Promise<T[]> {
  const out: T[] = [];
  for await (const x of gen) {
    out.push(x);
  }
  return out;
}

export const isTopicMatch = (subscription: string, topic: string) => {
  // Check if the subscription ends with # (multi-level wildcard)
  if (subscription.slice(-1) === '#') {
    const subWithoutHash = subscription.slice(0, -1);
    if (topic.startsWith(subWithoutHash)) {
      return true;
    }
  }

  const subscriptionLevels = subscription.split('/');
  const topicLevels = topic.split('/');

  // Check if the number of levels in both subscription and topic match
  if (subscriptionLevels.length !== topicLevels.length) {
    return false;
  }

  // Check each level to see if it matches
  for (let i = 0; i < subscriptionLevels.length; i++) {
    const subLevel = subscriptionLevels[i];
    const topicLevel = topicLevels[i];

    // Check for wildcard characters
    if (subLevel !== '+' && subLevel !== '#' && subLevel !== topicLevel) {
      return false;
    }

    // Handle single-level wildcard (+)
    if (subLevel === '+' && topicLevel === '') {
      return false;
    }
  }

  return true;
};

export const groupBy = <T>(array: T[], fn: (el: T) => string ): { [key: string]: T[] } => {
  return array.reduce((ret: { [key: string]: T[] }, el: T): { [key: string]: T[] } => {
    const key = fn(el);
    ret[key] = ret[key] || [];
    ret[key].push(el);
    return ret;
  }, {});
};

export const clipBetween = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export const scale = (number: number, inMin: number, inMax: number, outMin: number = 0, outMax: number = 100): number => {
  return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
};

export const interpolateColor = (color0: string, color1: string, f: number): string => {
  const channels0 = color0.substring(1).match(/.{1,2}/g)?.map((oct)=>parseInt(oct, 16) * (1 - f));
  const channels1 = color1.substring(1).match(/.{1,2}/g)?.map((oct)=>parseInt(oct, 16) * f);
  if (!channels0 || !channels1) throw new Error('Invalid color');
  let ci = [0, 1, 2].map(i => Math.min(Math.round(channels0[i] + channels1[i]), 255));
  return '#' + ci.reduce((a, v) => ((a << 8) + v), 0).toString(16).padStart(6, '0');
};

export const colorTemperature2rgb = (kelvin: number) => {
  const temperature = kelvin / 100.0;
  var red, green, blue;

  if (temperature < 66.0) {
    red = 255;
  } else {
    red = temperature - 55.0;
    red = 351.97690566805693 + 0.114206453784165 * red - 40.25366309332127 * Math.log(red);
    red = clipBetween(red, 0, 255);
  }

  if (temperature < 66.0) {
    green = temperature - 2;
    green = -155.25485562709179 - 0.44596950469579133 * green + 104.49216199393888 * Math.log(green);
  } else {
    green = temperature - 50.0;
    green = 325.4494125711974 + 0.07943456536662342 * green - 28.0852963507957 * Math.log(green);
  }
  green = clipBetween(green, 0, 255);

  if (temperature <= 20) {
    blue = 0;
  } else if (temperature >= 66) {
    blue = 255;
  } else {
    blue = temperature - 10;
    blue = -254.76935184120902 + 0.8274096064007395 * blue + 115.67994401066147 * Math.log(blue);
  }
  blue = clipBetween(blue, 0, 255);

  return { r: Math.round(red), g: Math.round(green), b: Math.round(blue) };
};

export const rgbToHex = ({ r, g, b }: { r: number, g: number, b: number }) => {
  // eslint-disable-next-line no-mixed-operators
  return '#' + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
};

export const colorTemperature2hex = (kelvin: number) => {
  return rgbToHex(colorTemperature2rgb(kelvin));
};
