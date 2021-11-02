import React,{useState, useEffect} from 'react';
import Tile from './Tile';
import {useEffectDebugger} from 'use-debugger-hooks';

const TileTalbe = ({onTileClick, table}) => {
    const [tableView,setTableView] = useState(changeTable)

    useEffectDebugger(() => {
        setTableView(changeTable)
    },[table]);

    const changeTable = () => {
        return [...Array(5)].map((_, i) => {
            return [...Array(16)].map((_, j) => {
              return <td><Tile id={"tile"+i+"-"+j} type={table[i][j]} onTileClick={(id) => handleTileClick(id)}/></td>
            })
        })
    }

    const handleTileClick = (id) => {
        onTileClick(id)
    }

    return (
        <div className="tileTable">
            <table>
            {tableView && tableView.map((row) => {
                return (
                    <tr>{row}</tr>
                )
            })}
            </table>
       </div>
    );
}

export default TileTalbe;