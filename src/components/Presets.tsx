import React, { useState } from 'react';
import styled from 'styled-components/macro';
import theme from 'styled-theming';

import { IconCard } from 'components/bits/Card';

import presetsDefaultState, { Preset, PresetsState } from 'utils/presets';

const StyledDiv = styled.div`
  display: flex;
`;

export type PresetCardProps = {
  name: string,
  color: string,
  background: string,
  icon: string,
  isActive: boolean,
};

const PresetCard = ({ name, color, background, icon, isActive }: PresetCardProps) => (
  <IconCard iconSrc={icon} iconAlt={name} />
);

interface PresetsProps {
  // activePreset: string | undefined,
}

const Presets = () => {
  const [presetsState, setPresets] = useState<PresetsState>(presetsDefaultState);
  const { activePreset, presets } = presetsState;

  return (
    <>
      <h1>Presets</h1>
      <StyledDiv>
        {presets.map((preset) => (
          <PresetCard isActive={activePreset === preset.name} {...preset} />
        ))}
      </StyledDiv>
    </>
  );
};

export default Presets;
