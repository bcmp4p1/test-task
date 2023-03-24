import React, { useContext } from 'react';
import classNames from 'classnames';
import { AppContext } from 'src/context/AppContext';

type Props = {
  rowIndex: number;
  cellIndex: number;
  value: number;
  isNear: boolean;
  percent: number;
  isGradient: boolean;
};

export const Cell: React.FC<Props> = ({
  rowIndex,
  cellIndex,
  value,
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
