import React, { useEffect, useState } from 'react';
import { validateNumber } from 'src/helpers/validateNumber';
import { Cell } from '../Cell';

interface Cell {
  id: number;
  value: number;
}

export const Main: React.FC = () => {
  const [rowsCount, setRowsCount] = useState(5);
  const [columnsCount, setColumnsCount] = useState(5);
  const [matrix, setMatrix] = useState<Cell[][]>([]);
  const [hoveredCell, setHoveredCell] = useState<Cell | null>(null);
  const [nearestCells, setNearestCells] = useState<Cell[]>([]);
  const [hoveredSum, setHoveredSum] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMatrix(
      Array.from({ length: rowsCount }, () =>
        Array.from({ length: columnsCount }, () => ({
          id: Math.random(),
          value: Number(String(Math.random() * 100000000).slice(0, 3)),
        }))
      )
    );
  };

  useEffect(() => {
    setMatrix(
      Array.from({ length: rowsCount }, () =>
        Array.from({ length: columnsCount }, () => ({
          id: Math.random(),
          value: Number(String(Math.random() * 10000).slice(0, 3)),
        }))
      )
    );
  }, []);

  const handleCellClick = (row: number, column: number) => {
    if (matrix[row][column].value < 999) {
      setMatrix([
        ...matrix.slice(0, row),
        [
          ...matrix[row].slice(0, column),
          { ...matrix[row][column], value: matrix[row][column].value + 1 },
          ...matrix[row].slice(column + 1),
        ],
        ...matrix.slice(row + 1),
      ]);
    }
  };

  const handleMouseEnter = (value: number) => {
    const sordetMatrix = matrix
      .reduce((arr, item) => arr.concat(item), [])
      .sort((a, b) => Math.abs(a.value - value) - Math.abs(b.value - value));
    setNearestCells(sordetMatrix.slice(0, 6));
  };

  const handleMouseLeave = () => {
    setHoveredCell(null);
    setNearestCells([]);
  };

  const handleMouseEnterSum = (index: number) => {
    setHoveredSum(index);
  };

  const handleMouseLeaveSum = () => {
    setHoveredSum(null);
  };

  const handleDeleteRow = (rowIndex: number) => {
    setMatrix(matrix.filter((item, index) => index !== rowIndex));
    setRowsCount(rowsCount - 1);
  };

  const handleAddRow = () => {
    setMatrix([
      ...matrix,
      Array.from({ length: columnsCount }, () => ({
        id: Math.random(),
        value: Number(String(Math.random() * 100000000).slice(0, 3)),
      })),
    ]);
    setRowsCount(rowsCount + 1);
  };

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
          min={0}
          max={100}
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
          min={0}
          max={100}
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
                    onClick={handleCellClick}
                    onMouseLeave={handleMouseLeave}
                    onMouseEnter={handleMouseEnter}
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
