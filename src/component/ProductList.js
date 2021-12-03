import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import {
    selectList
} from '../container/productSlice';

export default function ProductList(props) {

    const catalog = useSelector(selectList);

    const [ids, setIds] = useState([]);

    const [iter, setIter] = useState(0);
    const [startIter, setStartIter] = useState(0);

    useEffect(() => {


        setIds(props.ids);
        setIter(+props.nIter);
        setStartIter(+props.startIter);
    }, [props]);

    return (
        <div >
            <table className='tab'>
                <tbody>
                    <tr className='header'>
                        {Object.keys(ids).map((i) =>
                            <th key={i} className={ids[i]}>{i}</th>
                        )}
                    </tr>
                    {catalog.reduce((acc, item, index) => {

                        if (index >= startIter && index < iter) {
                            acc.push(<tr key={item.id}>
                                {Object.keys(ids).map((i) =>
                                    <td key={i} className={ids[i]} id={i}>{item[i]}</td>
                                )}
                                <td><button className="delete-item" idkey={index} ind={item.id}>Delete</button></td>
                            </tr>);
                        }
                        return acc;
                    }, [])}




                    {/* {catalog.map((item, index) => {
                        return (
                            <tr key={item.id}>
                                {Object.keys(ids).map((i) =>
                                    <td key={i} className={ids[i]} id={i}>{item[i]}</td>
                                )}
                                <td><button className="delete-item" idkey={index} ind={item.id}>Delete</button></td>
                            </tr>
                        )
                    })} */}
                </tbody>
            </table>
        </div>
    );
}