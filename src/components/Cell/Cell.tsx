import React from 'react';
import classNames from 'classnames';

type Props = {
  rowIndex: number;
  cellIndex: number;
  value: number;
  onClick: (row: number, column: number) => void;
  onMouseEnter: (value: number) => void;
  onMouseLeave: () => void;
  isNear: boolean;
  percent: () => number;
  isGradient: boolean;
};

export const Cell: React.FC<Props> = ({
  rowIndex,
  cellIndex,
  value,
  onClick,
  onMouseEnter,
  onMouseLeave,
  isNear,
  percent,
  isGradient,
}) => {
  return (
    <td>
      <button
        onClick={() => {
          onClick(rowIndex, cellIndex);
        }}
        className={classNames('cell', {
          'cell--near': isNear,
          'cell--gradient': isGradient,
        })}
        onMouseEnter={() => onMouseEnter(value)}
        onMouseLeave={onMouseLeave}
      >
        {isGradient ? `${percent()}%` : value}
      </button>
    </td>
  );
};
