import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import { setBag, addItem, removeItem } from '../../redux/actions/bag';
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from '../../redux/actions/products';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';

import './sass/index.css';

const Bag = () => {
    const [showCart, toggleCart] = useState(false);
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem("bag")));
    const dispatch = useDispatch();
    
    localStorage.setItem('bag', localStorage.getItem('bag')?localStorage.getItem('bag'):'[]');

    useEffect(
        () => {
            dispatch(getProducts());
            dispatch(setBag(JSON.parse(localStorage.getItem('bag'))));
        },[]
    );

    const _shop = useSelector(state => state.shop);
    window.addEventListener('storage', () => setCart(JSON.parse(localStorage.getItem("bag"))));

    const getProductDetails = (id) => {
        for (let product of _shop?.products) {
            if (product.id === id) {
                return product;
            }
        }

        return -1;
    }

    return (
        <React.Fragment>
            <FontAwesomeIcon icon={faShoppingBag} onClick={() => toggleCart(!showCart)} />
            {
                showCart?
                cart?.length > 0?
                    <div className="bag">
                        {
                            cart?.map((value, idx) => {
                                const product = getProductDetails(value.id);
                                
                                if (product !== null) return (
                                    <div key={idx} className="product">
                                        <Link to={`/product/${product.id}`}>
                                            <img src={product.image} className="image" alt="product" />
                                        </Link>
                                        <div className="details">
                                                <div className="title">
                                                    {product.title}
                                                </div>
                                            <div className="stock">
                                                {
                                                product.promo>0?
                                                    null
                                                    :
                                                    product.stock>10?"Stoc disponibil":"Stoc limitat"
                                                }
                                            </div>
                                            <div className="price">
                                                {
                                                product.promo>0?
                                                    <div className="price">
                                                        <strike>{product.price} RON</strike> <span className="promo"> - {product.promo}%</span><br /> 
                                                        {product.price - product.price*product.promo/100} RON
                                                    </div>
                                                    :
                                                    <div className="price">
                                                        {product.price} RON
                                                    </div>
                                                }
                                            </div>
                                            <div className="quantity">
                                                {value?.amount + " bucati"}
                                            </div>
                                            <div className="menu">
                                                <div className="add" onClick={() => {dispatch(addItem(product.id))}}>Adauga</div>
                                                <div className="remove" onClick={() => {dispatch(removeItem(product.id))}}>Sterge</div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            )
                        }
                        <div className="buy" onClick={() => {window.location = '/checkout'}}>Cumpara</div>
                    </div>:
                    <div className="bag">
                        <div className="buy" onClick={() => {window.location = '/products/all'}}>Vezi produsele noastre!</div>
                    </div>
                :
                null
            }
        </React.Fragment>
    )
};

export default Bag;