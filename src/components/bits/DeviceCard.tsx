import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components/macro';
import theme from 'styled-theming';

import { icon } from 'styles/theme';
import { SmallWidgetCard } from './Card';

const StyledDeviceCard = styled(SmallWidgetCard)`
  margin: auto;
  flex-flow: column wrap;
`;

const StyledIcon = styled.img`
  ${theme('theme', icon)};
  width: 80px;
`;

interface DeviceCardProps {
  name: string,
  path?: string,
  iconSrc: string,
  value: React.ReactNode,
  className?: string,
}

const DeviceCard = ({ name, path, iconSrc, value, className }: DeviceCardProps) => {
  const navigate = useNavigate();
  return (
    <StyledDeviceCard onClick={() => path && navigate(path)} className={className}>
      <StyledIcon src={iconSrc} />
      <h4 style={{ margin: '4px auto' }}>{name}:</h4>
      <p style={{ margin: '4px auto' }}>{value}</p>
    </StyledDeviceCard>
  );
};

export default DeviceCard;
