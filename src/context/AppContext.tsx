import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';

interface Cell {
  id: number;
  value: number;
}

interface AppContextInterface {
  rowsCount: number;
  setRowsCount: Dispatch<SetStateAction<number>>;
  columnsCount: number;
  setColumnsCount: Dispatch<SetStateAction<number>>;
  matrix: Cell[][];
  setMatrix: Dispatch<SetStateAction<Cell[][]>>;
  hoveredCell: Cell | null;
  setHoveredCell: Dispatch<SetStateAction<Cell | null>>;
  nearestCells: Cell[];
  setNearestCells: Dispatch<SetStateAction<Cell[]>>;
  hoveredSum: number | null;
  setHoveredSum: Dispatch<SetStateAction<number | null>>;
  handleCellClick: (row: number, column: number) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleMouseEnter: (value: number) => void;
  handleMouseLeave: () => void;
  handleMouseEnterSum: (index: number) => void;
  handleMouseLeaveSum: () => void;
  handleDeleteRow: (rowIndex: number) => void;
  handleAddRow: () => void;
}

const initialState = {
  rowsCount: 0,
  setRowsCount: () => {},
  columnsCount: 0,
  setColumnsCount: () => {},
  matrix: [],
  setMatrix: () => {},
  hoveredCell: null,
  setHoveredCell: () => {},
  nearestCells: [],
  setNearestCells: () => {},
  hoveredSum: null,
  setHoveredSum: () => {},
  handleCellClick: () => {},
  handleSubmit: () => {},
  handleMouseEnter: () => {},
  handleMouseLeave: () => {},
  handleMouseEnterSum: () => {},
  handleMouseLeaveSum: () => {},
  handleDeleteRow: () => {},
  handleAddRow: () => {},
} as AppContextInterface;

export const AppContext = createContext(initialState);

type ProvideProps = {
  children: ReactNode;
};

export const AppContextProvider: React.FC<ProvideProps> = ({ children }) => {
  const [rowsCount, setRowsCount] = useState(5);
  const [columnsCount, setColumnsCount] = useState(5);
  const [matrix, setMatrix] = useState<Cell[][]>([]);
  const [hoveredCell, setHoveredCell] = useState<Cell | null>(null);
  const [nearestCells, setNearestCells] = useState<Cell[]>([]);
  const [hoveredSum, setHoveredSum] = useState<number | null>(null);

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

  const handleCellClick = useCallback((row: number, column: number) => {
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
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMatrix(
      Array.from({ length: rowsCount }, () =>
        Array.from({ length: columnsCount }, () => ({
          id: Math.random(),
          value: Number(String(Math.random() * 100000000).slice(0, 3)),
        }))
      )
    );
  }, []);

  const handleMouseEnter = useCallback((value: number) => {
    const sordetMatrix = matrix
      .reduce((arr, item) => arr.concat(item), [])
      .sort((a, b) => Math.abs(a.value - value) - Math.abs(b.value - value));
    setNearestCells(sordetMatrix.slice(0, 6));
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredCell(null);
    setNearestCells([]);
  }, []);

  const handleMouseEnterSum = useCallback((index: number) => {
    setHoveredSum(index);
  }, []);

  const handleMouseLeaveSum = useCallback(() => {
    setHoveredSum(null);
  }, []);

  const handleDeleteRow = useCallback((rowIndex: number) => {
    setMatrix(matrix.filter((item, index) => index !== rowIndex));
    setRowsCount(rowsCount - 1);
  }, []);

  const handleAddRow = useCallback(() => {
    setMatrix([
      ...matrix,
      Array.from({ length: columnsCount }, () => ({
        id: Math.random(),
        value: Number(String(Math.random() * 100000000).slice(0, 3)),
      })),
    ]);
    setRowsCount(rowsCount + 1);
  }, []);

  return (
    <AppContext.Provider
      value={{
        rowsCount,
        setRowsCount,
        columnsCount,
        setColumnsCount,
        matrix,
        setMatrix,
        hoveredCell,
        setHoveredCell,
        nearestCells,
        setNearestCells,
        hoveredSum,
        setHoveredSum,
        handleCellClick,
        handleSubmit,
        handleMouseEnter,
        handleMouseLeave,
        handleMouseEnterSum,
        handleMouseLeaveSum,
        handleDeleteRow,
        handleAddRow,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
