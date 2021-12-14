import React, { useState, useEffect } from 'react';
//import Checkbox from '@mui/material/Checkbox';

function Tree() {
    const [arrWithSub, setArrWithSub] = useState([]);
    let arr = [
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
            text: 'ID3 PAR1',
            checked: true
        },
        {
            id: 4,
            parent: 5,
            text: 'ID4 PAR1',
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
    ///////////////////////////////////////////////////////Потомков по родителям

    arr.forEach(e => {
        e.subcats = arr.filter(elem => +elem.parent == +e.id)

    });
    // Выбираем Root
    arr = arr.filter(e => e.parent == 0);






    function recursive(cat) {
        return (
            <li key={cat.id} className='leaf'>

                <input type='checkbox' defaultChecked={cat.checked} onClick={clickTip} />
                {cat.text}
                {(cat.subcats && cat.subcats.length) ? <ul className='tree'>{cat.subcats.map(recursive)}</ul> : ''}
            </li>
        );
    }





    //////////////////////////////////////////////////click on checkbox
    const clickTip = (e) => {
        console.log(e);
        const checked = e.target.checked;
        const indeterminate = e.target.indeterminate;
        let nIter = 0; //Счёт checkboxов вверх от выбранного

        console.log(indeterminate);

        /////////////Child control Parent

        walkUp(e.target.parentNode, function (par) {
            console.log(par);
            if (par && par.classList.contains('leaf')) {
                if (par.children[0].type === 'checkbox') {
                    if (+nIter == 1 && par.children[1] && par.children[1].classList.contains('tree')) {
                        discoverSub(par.children[1], function (status) {
                            console.log(status);
                            if (status == 0) par.children[0].indeterminate = true;
                            if (status == -1) {
                                par.children[0].indeterminate = false;
                                par.children[0].checked = false;
                            }
                            if (status == 1) {
                                par.children[0].indeterminate = false;
                                par.children[0].checked = true;
                            }

                        });
                        function discoverSub(node, callback) {
                            let countChecked = 0;
                            let equalSub = false;

                            Array.from(node.children).forEach((subElem) => {
                                console.log(subElem.children[0].checked);
                                console.log(node.children.length);
                                if (subElem.children[0].checked)
                                    countChecked++;
                            })
                            if (countChecked == 0) callback(-1);
                            if (countChecked > 0 && countChecked < node.children.length) callback(0);
                            if (countChecked == node.children.length) callback(1);

                        }

                    }
                    nIter++;
                }
            }
        });
        // };

        walkDown(e.target, function (child) {

            child.checked = checked;
            if (checked) child.indeterminate = !checked;

        });

        ///////////////////////////////////////////////////////////////////////////
        ///Callback
        /// Пробегаем по потомкам вниз
        function walkDown(root, callback) {
            if (root.type === 'checkbox') {
                callback(root);
                console.log(root.parentNode);
                const subUl = root.parentNode.children[1]; ///Следующий элемент за нажатым
                console.log(root.parentNode.children[0]);

                if (subUl && subUl.classList.contains('tree')) {
                    walkDown(subUl, callback);
                }
            }
            else {      /////////////////////////////Если следующий элемент = <ul> , <li>
                console.log(Array.from(root.children));
                Array.from(root.children).forEach((subElem) => {
                    walkDown(subElem, callback);
                })
            }
        }
        // Пробегаем по родителям вверх
        function walkUp(root, callback) {

            callback(root);
            console.log(root.parentNode);
            const parLi = root.parentNode; ///Следующий элемент за нажатым

            if (parLi && parLi.classList.contains('leaf')) {
                walkUp(parLi, callback);
            }
            if (parLi && parLi.classList.contains('tree')) {
                walkUp(parLi, callback);
            }
        }
    }


    return (
        <div>
            <ul>
                {arr.map(recursive)}
            </ul>
        </div>
    );
}

export default Tree;