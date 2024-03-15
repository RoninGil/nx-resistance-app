import React from 'react';

import classNames from 'classnames/bind';

import styles from './Resistance.module.scss';

const cx = classNames.bind(styles);

const Resistance = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('resistance')}>{children}</div>
    </div>
  );
};

export default Resistance;
