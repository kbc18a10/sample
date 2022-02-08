import React,{useState, useEffect, useCallback} from 'react';
import Tile from './Tile';
import {useEffectDebugger} from 'use-debugger-hooks';

const TileTalbe = React.memo(({onTileClick, table}) => {
    const [tables, setTables] = useState(()=>{
        var array = new Array(table);
        array.push(table);
        return array;
    });
    const [componentTable, setComponentTable] = useState(()=>{
        return table.map((row,i) => {
            return row.map((col,j)=>{
              return <td><Tile id={"tile"+i+"-"+j} type={col} onTileClick={(id) => handleTileClick(id)}/></td>
            })
        })
    })

    useEffectDebugger(() => {
        var array = tables;
        array.shift();
        array.push(table);
        console.log(array);
        setComponentTable(componentTable.map((row,i)=>{
            return row.map((t,j)=>{
                if(array[0][i][j]!=array[1][i][j]){
                    return <td><Tile id={"tile"+i+"-"+j} type={array[1][i][j]} onTileClick={(id) => handleTileClick(id)}/></td>
                }else{
                    return t;
                }
            })
        }))
        setTables(array);
    },[table]);

    const handleTileClick = useCallback((id) => {
        onTileClick(id)
    })

    return (
        <div>
            <table id="tileTable">
                {componentTable.map((row) => {
                    return (
                        <tr>{row}</tr>
                    )
                })}
            </table>
       </div>
    );
})

export default TileTalbe;