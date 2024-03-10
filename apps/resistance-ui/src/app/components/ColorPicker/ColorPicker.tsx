import React from 'react';

import classNames from 'classnames/bind';

import { ColorPickerProps } from '../../types/ColorPicker';

import styles from './ColorPicker.module.scss';

const cx = classNames.bind(styles);

const ColorPicker = ({
  colorValues, //array of colors
  bandType, //resitor, digit or multiplier
  colorData, //object with colors as keys, and the color data as values
  onChange,
}: ColorPickerProps) => {
  const colorsToDisplay = () => {
    return colorValues.filter((color) => {
      if (bandType === 'none') {
        return true;
      }
      if (bandType === 'tolerance') {
        return colorData[color].tolerancePercentage;
      }
      if (bandType === 'multiplier') {
        return colorData[color].multiplier;
      }
      return colorData[color].digitValue;
    });
  };
  return (
    <div className={cx('color-wrapper')}>
      {colorsToDisplay().map((color) => {
        const noBand = color === 'none';
        const backgroundColor = noBand ? 'transparent' : color;
        return (
          <div
            key={color}
            className={cx('color-selector')}
            style={{
              backgroundColor,
              border: '1px solid black',
            }}
            onClick={() => onChange([color, colorData[color]])}
          ></div>
        );
      })}
    </div>
  );
};

export default ColorPicker;
