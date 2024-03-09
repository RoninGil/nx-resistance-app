import React from 'react';

import classNames from 'classnames/bind';

import { ColorPickerProps } from '../../types/ColorPicker';

import styles from './ColorPicker.module.scss';

const cx = classNames.bind(styles);
//[{name: 'red', colorHexCode: '#12ab...'},]

const ColorPicker = ({ colorValues, onChange }: ColorPickerProps) => {
  return (
    <div className={cx('color-wrapper')}>
      {colorValues.map(({ name }) => {
        return (
          <div
            key={name}
            className={cx('color-selector')}
            style={{
              backgroundColor: name,
            }}
            onClick={() => onChange(name ?? '')}
          ></div>
        );
      })}
    </div>
  );
};

export default ColorPicker;
