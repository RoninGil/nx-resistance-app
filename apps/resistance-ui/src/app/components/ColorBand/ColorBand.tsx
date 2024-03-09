import React from 'react';
// import { ColorValues } from '../../types/Resistor';

type ColorBandProps = {
  bandColor: string;
  bandKey: string;
  onClick: (value: string) => void;
};

const ColorBand = ({ bandColor, bandKey, onClick }: ColorBandProps) => {
  const noBand = bandColor === 'none';
  const backgroundColor = noBand ? 'transparent' : bandColor;

  return (
    <div
      style={{
        backgroundColor: backgroundColor,
        width: '10px',
        height: '100px',
        border: noBand ? 'none' : '1px solid black',
      }}
      onClick={() => onClick(bandKey)}
    />
  );
};

export default ColorBand;
