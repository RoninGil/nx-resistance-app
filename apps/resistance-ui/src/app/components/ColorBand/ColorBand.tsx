import React from 'react';
import classNames from 'classnames/bind';

import { ColorBandProps } from '../../types/ColorBand';

import styles from './ColorBand.module.scss';

const cx = classNames.bind(styles);

const ColorBand = ({ bandColor, bandKey, onClick }: ColorBandProps) => {
  const noBand = bandColor === 'none';
  const backgroundColor = noBand ? 'transparent' : bandColor;

  return (
    <div
      className={cx('color-band-selector')}
      style={{
        backgroundColor: backgroundColor,
        border: noBand ? 'none' : '1px solid black',
      }}
      onClick={() => onClick(bandKey)}
      data-testid={bandKey}
    />
  );
};

export default ColorBand;
