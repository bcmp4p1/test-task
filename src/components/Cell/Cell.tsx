import React, { useContext } from 'react';
import classNames from 'classnames';
import { AppContext } from 'src/context/AppContext';

type Props = {
  rowIndex: number;
  cellIndex: number;
  value: number;
  onClick: (row: number, column: number) => void;
  onMouseEnter: (value: number) => void;
  onMouseLeave: () => void;
  isNear: boolean;
  percent: number;
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
  const { handleCellClick, handleMouseLeave, handleMouseEnter } =
    useContext(AppContext);

  return (
    <td>
      <button
        onClick={() => {
          handleCellClick(rowIndex, cellIndex);
        }}
        className={classNames('cell', {
          'cell--near': isNear,
          'cell--gradient': isGradient,
        })}
        onMouseEnter={() => handleMouseEnter(value)}
        onMouseLeave={handleMouseLeave}
      >
        {isGradient && (
          <div
            className="cell__background"
            style={{ height: `${percent * 1.5}%` }}
          />
        )}
        <p className="cell__text">{isGradient ? `${percent}%` : value}</p>
      </button>
    </td>
  );
};
