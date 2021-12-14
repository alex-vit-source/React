import React, { useState, useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';

function Tree() {

    const arr = [
        {
            id: 1,
            parent: 3,
            text: 'ID1 PAR3',
            checked: true
        },
        {
            id: 2,
            parent: 0,
            text: 'ID2 PAR0',
            checked: true
        },
        {
            id: 3,
            parent: 5,
            text: 'ID3 PAR5',
            checked: true
        },
        {
            id: 4,
            parent: 5,
            text: 'ID4 PAR5',
            checked: true
        },
        {
            id: 5,
            parent: 2,
            text: 'ID5 PAR2',
            checked: true
        },
        {
            id: 6,
            parent: 2,
            text: 'ID6 PAR2',
            checked: true
        }
    ];
    const [arrWithoutSub, setArrWithoutSub] = useState([]);
    const [arrWithSub, setArrWithSub] = useState([]);



    useEffect(() => {

        let tempArr = arr;
        // console.log(arr);
        tempArr.forEach(el => {
            el.indeterminated = false;
            el.hide = 'hide';
        });
        setArrWithoutSub(tempArr);

        tempArr.forEach(e => {
            e.subcats = tempArr.filter(elem => +elem.parent == +e.id);

        });
        // Выбираем Root
        tempArr = tempArr.filter(e => e.parent == 0);

        setArrWithSub(tempArr);

    }, []);







    function writeArr(cat) {


        return (
            <li key={cat.id} className='leaf'>
                <svg catid={cat.id.toString()} parentid={cat.parent} className='svgView' onClick={clickCatalog}>
                    {cat.hide == '' ? <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path> : <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>}
                </svg>
                <Checkbox
                    checked={cat.checked}
                    indeterminate={cat.indeterminated}
                    id={cat.id.toString()}
                    inputProps={{ "parentid": cat.parent }}
                    onClick={clickTip}
                />

                {cat.text}
                {(cat.subcats && cat.subcats.length) ? <ul className={`${cat.hide} tree`}>{cat.subcats.map(writeArr)}</ul> : ''}
            </li>
        );
    }

    /////////////////////////////////////////////////
    const clickCatalog = (e) => {
        let tempArr = arrWithoutSub;
        console.log(e.target.getAttribute('catid'))
        tempArr.forEach((item) => {
            if (+e.target.getAttribute('catid') == item.id) {
                if (item.hide == 'hide') item.hide = '';
                else item.hide = 'hide';
            }
        })
        setArrWithoutSub(tempArr);
        // Prepare data
        tempArr.forEach(e => {
            e.subcats = tempArr.filter(elem => +elem.parent == +e.id);
        });
        // Choose Root
        tempArr = tempArr.filter(e => e.parent == 0);
        setArrWithSub(tempArr);

    }



    //////////////////////////////////////////////////click on checkbox
    const clickTip = (e) => {

        let tempArr = arrWithoutSub;
        let countSub = 0;
        let countChecked = 0;
        ///Текущий элемент
        tempArr.forEach((subElem) => {
            if (e.target.id == subElem.id) {
                subElem.checked = e.target.checked;
                subElem.indeterminated = e.target.indeterminate;
            }
        });


        tempArr.forEach((subElem) => {
            if (subElem.parent == e.target.getAttribute('parentid')) {
                countSub++;

                if (subElem.checked) {
                    countChecked++;
                }
            }
        });


        tempArr.forEach((subElem) => {
            if (subElem.id == e.target.getAttribute('parentid')) {
                if (countSub !== countChecked) {
                    if (countChecked == 0) {
                        console.log('countChecked == 0');
                        subElem.indeterminated = false;
                        subElem.checked = false;
                    }
                    else {
                        console.log('countChecked != 0');
                        subElem.indeterminated = true;
                        subElem.checked = true;
                    }
                }
                else {
                    console.log('countChecked == 1');
                    subElem.indeterminated = false;
                    subElem.checked = true;
                }
            }

        });

        /// Check children
        function recurs(discoveringElem, arr) {
            let subcat = arr.filter(elem => +elem.parent == discoveringElem);
            for (let item of subcat) {

                item.indeterminated = false;
                item.checked = e.target.checked;
                if (subcat.length) {

                    recurs(item.id, tempArr);
                }
            }
        }
        recurs(+e.target.id, tempArr);




        setArrWithoutSub(tempArr);
        // Prepare data
        tempArr.forEach(e => {
            e.subcats = tempArr.filter(elem => +elem.parent == +e.id);
        });
        // Choose Root
        tempArr = tempArr.filter(e => e.parent == 0);

        setArrWithSub(tempArr);

    }
    return (
        <div>
            <ul className='list'>

                {arrWithSub.map(writeArr)}
            </ul>
        </div>
    );
}

export default Tree;

