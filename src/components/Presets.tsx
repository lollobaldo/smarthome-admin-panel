import React from 'react';
import styled from 'styled-components/macro';

import { useOneOf } from 'brains/hooks';

import { Card } from 'components/bits/Card';

import presets from 'utils/presets';

const StyledContainer = styled.div`
  padding: 16px;
`;

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledCard = styled(Card)`
  margin: 0;

  & svg {
    margin: auto;
    width: 100%;
    heigth: 100%;
  }
`;

export type PresetCardProps = {
  name: string,
  color: string,
  background: string,
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement> & {
    title?: string | undefined;
  }>,
  isActive: boolean,
  onSelect: () => {},
};

const PresetCard = ({ name, Icon, onSelect, isActive, color, background }: PresetCardProps) => (
  // <IconCard iconSrc={icon} iconAlt={name} onClick={onSelect} />
  <StyledCard
    onClick={onSelect}
    color={isActive ? '#fff' : color}
    background={isActive ? background : undefined}>
    <Icon title={name} />
  </StyledCard>
);

const Presets = () => {
  const [activePreset, changePreset] = useOneOf();

  return (
    <StyledContainer>
      <h1>Presets</h1>
      <StyledDiv>
        {presets.map((preset) => (
          <PresetCard
            {...preset}
            key={preset.name}
            isActive={activePreset === preset.name}
            onSelect={() => changePreset(preset.name)} />
        ))}
      </StyledDiv>
    </StyledContainer>
  );
};

export default Presets;
