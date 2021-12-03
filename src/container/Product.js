import React, { useState, useEffect } from 'react';
import products from '../json/zjHK4Ua9.json';
import { useSelector, useDispatch } from 'react-redux';
import {
    delList,
    loadList,
    selectList
} from './productSlice';
import ProductList from '../component/ProductList';

/** True = 65%, False = 35% */
const rejectByChance = () => {
    return Math.random() <= 0.35;
};

/** Emulate get request */
export const getProducts = () => new Promise((resolve, reject) => {
    if (rejectByChance()) {
        return reject({
            error: 'Server error. Error add'
        });
    }
    const delay = parseInt(Math.random() * 1000);
    setTimeout(() => {
        resolve(products);
    }, delay);
})

/** Emulate delete request */
export const deleteProducts = () => new Promise((resolve, reject) => {
    if (rejectByChance()) {
        return reject({
            error: 'Server error'
        });
    }
    const delay = parseInt(Math.random() * 1000);
    setTimeout(() => {
        resolve({ message: 'deleted' });
    }, delay);
});

export default function Product() {
    const [ids, setIds] = useState({
        'id': '',
        'product': '',
        'calories': '',
        'fat': '',
        'carbs': '',
        'protein': '',
        'iron': ''
    });
    const [sel, setSel] = useState('');
    const [startIter, setStartIter] = useState(0);
    const [endIter, setEndIter] = useState(11);
    const [iter, setIter] = useState(11);
    const list = useSelector(selectList);
    const idsOrigin = [
        'id',
        'product',
        'calories',
        'fat',
        'carbs',
        'protein',
        'iron'
    ];

    const dispatch = useDispatch();

    let listSorted = [];


    /////////////////////////////////////////////////////////////////////////useEffect(() => BEGIN
    useEffect(() => {
        let add = getProducts();
        add.then((data) => {
            dispatch(loadList(data));
        })

        add.catch((e) => {
            alert('Server error. Error add');
            console.log(e);
        });
    }, [dispatch]);
    ////////////////////////////////////////////////////////////////////////////////////////////////////////

    const clickProduct = (event) => {
        event.preventDefault();
        let t = event.target;
        console.log(t);
        if (t.classList.contains('delete-item')) {
            let k = deleteProducts();
            let confi = false;
            k.then(d => {
                console.log(d);

                confi = window.confirm(`Вы точно хотите удалить id=${t.getAttribute('ind')}`);
                if (confi) dispatch(delList(t.getAttribute('idkey')));


            });
            k.catch((e) => {
                alert('Server error. Error delete');
                console.log(e);
            });
        }
    }

    const tipChange = (event) => {
        let display = '';
        let tempObj = {};

        event.target.checked ? display = '' : display = 'hide';

        tempObj = { ...ids };
        tempObj[event.target.getAttribute('id')] = display;
        setIds(tempObj);

    }

    const selectChange = (event) => {
        let idNew = {};
        let tempId = { ...ids };


        setSel(event.target.value);
        idNew[event.target.value] = tempId[event.target.value];

        delete tempId[event.target.value];

        for (let item of idsOrigin) {
            if (item === event.target.value) continue;

            idNew[item] = tempId[item];

        }

        setIds(idNew);

        const compArrObj = (a, b) => {
            if (isNaN(parseInt(a[event.target.value]))) {
                let first = a[event.target.value].toLowerCase();
                let second = b[event.target.value].toLowerCase();
                if (first < second) return -1;
                if (first > second) return 1;
                return 0;
            };

            return a[event.target.value] - b[event.target.value];
        }
        listSorted = [...list];
        listSorted.sort(compArrObj);

        dispatch(loadList(listSorted));
    }
    //////////////////////////////////////////////////////////////////////////////
    const range = (min, max) => {
        let arr = [];
        for (let i = min; i <= max; i++) {
            arr.push(i);
        }
        return arr;
    }
    const sizeOfTable = range(11, 25);
    const selectRange = (event) => {
        setStartIter(0);
        setIter(+event.target.value);
        //let tempIter = iter;
        setEndIter(+event.target.value);
    }
    const nextPage = () => {
        if (endIter !== list.length) {
            let tempData = startIter;


            tempData = startIter + iter;
            //tempData + tempIter;
            setStartIter(tempData);
            tempData += iter;
            tempData <= 1000 ? setEndIter(tempData) : setEndIter(list.length);


        }
    }

    const prevPage = () => {
        if (startIter !== 0) {
            let tempData = startIter;


            tempData = startIter - iter;
            //tempData + tempIter;
            tempData >= 0 ? setStartIter(tempData) : setStartIter(0);
            tempData += iter;
            setEndIter(tempData)


        }
    }
    /////////////////////////////////////////////////////////////////////
    return (
        <div>
            <div className='tips'>
                <input type='checkbox' id='id' onChange={tipChange} defaultChecked='true' /> <label htmlFor='id'>ID</label>
                <input type='checkbox' id='product' onChange={tipChange} defaultChecked='true' /><label htmlFor='product'>Product</label>
                <input type='checkbox' id='calories' onChange={tipChange} defaultChecked='true' /><label htmlFor='calories'>Palories</label>
                <input type='checkbox' id='fat' onChange={tipChange} defaultChecked='true' /><label htmlFor='fat'>Fat</label>
                <input type='checkbox' id='carbs' onChange={tipChange} defaultChecked='true' /><label htmlFor='carbs'>Carbs</label>
                <input type='checkbox' id='protein' onChange={tipChange} defaultChecked='true' /><label htmlFor='protein'>Protein</label>
                <input type='checkbox' id='iron' onChange={tipChange} defaultChecked='true' /><label htmlFor='iron'>Iron</label>

                <select value={sel} onChange={selectChange}>
                    {Object.keys(ids).map((option) => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>

            </div>

            <div className="products" onClick={clickProduct}>
                <ProductList ids={ids} startIter={startIter} nIter={endIter} />
            </div>

            <span onClick={prevPage}>Предыдущий</span>
            <select value={iter} onChange={selectRange}>
                {sizeOfTable.map((option) => (
                    <option key={option} value={option}>{option}</option>
                ))}

            </select>
            <span onClick={nextPage}>Следующий</span>
        </div>

    );
}