import  { useEffect, useState, useRef } from 'react';
import '../styles/Grid.css';
const Grid = () => {
  const rows = 15
  const cols = 20
  const [grid, setGrid] = useState(
    Array(15)
      .fill(null)
      .map(() => Array(20).fill(null).map(() => ({ color: 'black' })))
  );
  const dropsRef = useRef([]);

 

  useEffect(() => {
    const dropRain = () => {
      setGrid(prevGrid => {
        let newGrid = prevGrid.map(row => row.map(cell => ({ ...cell, color: 'black' })));

        for (let i = dropsRef.current.length - 1; i >= 0; i--) {
          const drop = dropsRef.current[i];
          if (drop.row < rows - 1) {
            drop.row++;
            newGrid[drop.row][drop.col].color = drop.color;
          } else {
            dropsRef.current.splice(i, 1);
          }
        }

        if (dropsRef.current.every(drop => drop.row > 0) || dropsRef.current.length === 0) {
          const randomCol = Math.floor(Math.random() * cols);
          for (let i = 0; i < 5; i++) {
            const colorDensity = (i / 5);
            const dropColor = `rgba(${Math.floor(colorDensity * 255)}, ${Math.floor(colorDensity * 255)}, ${Math.floor(colorDensity * 255)}, ${colorDensity})`;
            newGrid[i][randomCol].color = dropColor;
            dropsRef.current.push({ row: i, col: randomCol, color: dropColor });
          }
        }

        return newGrid;
      });
    };
    
     
    
     const intervalId = setInterval(dropRain, 100)

     return () => clearInterval(intervalId);
    }, [grid]);

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
