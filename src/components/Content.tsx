import React from 'react';
import styled from 'styled-components/macro';
import theme from 'styled-theming';

import Presets from './Presets';
import Devices from './Devices';

const Content = () => (
  <>
    <Presets />
    <Devices />
  </>
);

export default Content;
