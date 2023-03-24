import React, { useContext } from 'react';
import { validateNumber } from 'src/helpers/validateNumber';
import { Cell } from '../Cell';
import { AppContext } from 'src/context/AppContext';

interface Cell {
  id: number;
  value: number;
}

export const Main: React.FC = () => {
  const {
    rowsCount,
    setRowsCount,
    columnsCount,
    setColumnsCount,
    nearestCount,
    setNearestCount,
    matrix,
    handleSubmit,
    nearestCells,
    hoveredSum,
    handleDeleteRow,
    handleMouseLeaveSum,
    handleMouseEnterSum,
    handleAddRow,
  } = useContext(AppContext);

  return (
    <main>
      <h1>Test task Oleksii Ivanov</h1>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        className="form"
      >
        <label htmlFor="rows">Enter rows count</label>
        <input
          id="rows"
          type="text"
          onChange={(e) => {
            const value = e.target.value;
            if (Number(value) >= 0 && Number(value) <= 100) {
              setRowsCount(Number(validateNumber(value)));
            }
          }}
          value={rowsCount}
          placeholder="enter rows count"
        />
        <label htmlFor="columns">Enter columns count</label>
        <input
          id="columns"
          type="text"
          onChange={(e) => {
            const value = e.target.value;
            if (Number(value) >= 0 && Number(value) <= 100) {
              setColumnsCount(Number(validateNumber(value)));
            }
          }}
          value={columnsCount}
          placeholder="enter column count"
        />
        <label htmlFor="columns">Enter nearest numbers count</label>
        <input
          id="columns"
          type="text"
          onChange={(e) => {
            const value = e.target.value;
            if (
              Number(value) >= 0 &&
              Number(value) <= rowsCount * columnsCount - 1
            ) {
              setNearestCount(Number(validateNumber(value)));
            }
          }}
          value={nearestCount}
          placeholder="enter column count"
        />
        <button type="submit" className="submit">
          Submit
        </button>
      </form>
      <table className="table">
        <tbody>
          <tr>
            <th />
            {matrix[0]?.map((item, index) => (
              <th key={item.value}>{index + 1}</th>
            ))}
            <th className="name">Sum value</th>
          </tr>
          {matrix.length > 0 &&
            matrix[0].length > 0 &&
            matrix.map((row, rowIndex) => (
              <tr key={row[0].id} className="row">
                <th>{rowIndex + 1}</th>
                {row.map((cell, cellIndex) => (
                  <Cell
                    cellIndex={cellIndex}
                    rowIndex={rowIndex}
                    value={cell.value}
                    key={cell.id}
                    isNear={nearestCells.some((item) => item.id === cell.id)}
                    percent={
                      Math.round(
                        (cell.value /
                          row.reduce((sum, item) => sum + item.value, 0)) *
                          1000
                      ) / 10
                    }
                    isGradient={rowIndex === hoveredSum}
                  />
                ))}
                <td
                  onMouseLeave={handleMouseLeaveSum}
                  onMouseEnter={() => handleMouseEnterSum(rowIndex)}
                >
                  {row.reduce((sum, item) => sum + item.value, 0)}
                </td>
                <button
                  className="cross"
                  onClick={() => {
                    handleDeleteRow(rowIndex);
                  }}
                >
                  x
                </button>
              </tr>
            ))}
          <tr>
            <th className="name">Average value</th>
            {matrix[0]?.map((item, index) => (
              <td key={item.id + index}>
                {Math.round(
                  (matrix.reduce((sum, item) => sum + item[index].value, 0) /
                    matrix.length) *
                    1000
                ) / 1000}
              </td>
            ))}
            <td className="button">
              <button className="cell add-button" onClick={handleAddRow}>
                Add row
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </main>
  );
};
