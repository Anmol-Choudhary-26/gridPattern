import { useEffect, useState, useRef, useMemo } from 'react';
import '../styles/Grid.css';

const Grid = () => {
  const rows = 15;
  const cols = 20;
  const [grid, setGrid] = useState(
    Array(rows).fill(null).map(
      () => Array(cols).fill(null).map(() => ({ color: 'black' }))
    )
  );
  const dropsRef = useRef([]);
  const colors = useMemo(() => [{r: 82, g: 212, b: 12},
     {r: 182, g: 22, b: 212},
      {r: 122, g: 132, b: 212} ,
      { r: 255, g: 0, b: 0 }, 
      { r: 0, g: 255, b: 0 },
      { r: 0, g: 0, b: 255 },], []);
  const [currentColor, setCurrentColor] = useState(colors[0]);

  useEffect(() => {
    const changeColor = () => {
      let changedColor = colors[Math.floor(Math.random() * colors.length)];
      setCurrentColor(c => {return({
        ...currentColor,
        r: changedColor.r,
        g: changedColor.g,
        b: changedColor.b,
      })});
    };
    setInterval(changeColor, 2000);

    return () => clearInterval(changeColor);
  }, []);

  useEffect(() => {
    const dropRain = () => {
      setGrid(prevGrid => {
        // Create a new grid with all cells set to black
        const updatedGrid = prevGrid.map(row => row.map(cell => ({ ...cell, color: 'black' })));

        // Move each drop down one row if possible, or remove it if it has reached the bottom
        dropsRef.current = dropsRef.current.filter(drop => {
          if (drop.row < rows - 1) {
            drop.row++;
            updatedGrid[drop.row][drop.col].color = drop.color;
            return true;
          }
          return false;
        });

        // If all drops are below the first row or no drops exist, add new drops
        if (dropsRef.current.length === 0 || dropsRef.current.every(drop => drop.row > 0)) {
          const randomCol = Math.floor(Math.random() * cols);
          for (let i = 0; i < 5; i++) {
            const opacity = (i + 1) / 5; // Ensure opacity is never zero
            const dropColor = `rgba(${currentColor.r}, ${currentColor.g}, ${currentColor.b}, ${opacity})`;
            updatedGrid[i][randomCol].color = dropColor;
            dropsRef.current.push({ row: i, col: randomCol, color: dropColor });
          }
        }

        return updatedGrid;
      });
    };

    const intervalId = setInterval(dropRain, 100);

    return () => clearInterval(intervalId);
  }, [grid, currentColor]);

  return (
    <div className="grid">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, colIndex) => (
            <div key={colIndex} className="cell" style={{ backgroundColor: cell.color }}></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Grid;
