import React from 'react';

import classNames from 'classnames/bind';

import { ColorPickerProps } from '../../types/ColorPicker';

import styles from './ColorPicker.module.scss';

const cx = classNames.bind(styles);
//[{name: 'red', colorHexCode: '#12ab...'},]

const ColorPicker = ({ colorValues }: ColorPickerProps) => {
  console.log(styles);
  return (
    <div className={cx('color-wrapper')}>
      {colorValues.map(({ colorHexCode, name }) => {
        return (
          <div
            key={name ?? colorHexCode}
            className={cx('color-selector')}
            style={{
              backgroundColor: colorHexCode ?? name,
            }}
          ></div>
        );
      })}
    </div>
  );
};

export default ColorPicker;
