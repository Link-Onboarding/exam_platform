import React, { useEffect, useState } from 'react';

import "./sass/index.css";
import { Link } from "react-router-dom";

import Layout from '../Layout';

import { setBag, addItem, removeItem } from '../../redux/actions/bag';
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from '../../redux/actions/products';
import { checkout } from '../../redux/actions/checkout';

const Checkout = () => {
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem("bag")));
    const [errorMessage, setError] = useState(null);
    const [phone, setPhoneNumber] = useState(null);
    const [address, setAddress] = useState(null);
    const [obs, setObs] = useState(null);
    const dispatch = useDispatch();
    

    useEffect(
        () => {
            dispatch(getProducts());
            dispatch(setBag(JSON.parse(localStorage.getItem('bag'))));
        },[]
    );

    const _shop = useSelector(state => state.shop);
    window.addEventListener('storage', () => setCart(JSON.parse(localStorage.getItem("bag"))));

    const getProductDetails = (id) => {
        if ( _shop?.products ) {
            for (let product of _shop?.products) {
                if (product?.id === id) {
                    return product;
                }
            }
        }

        return -1;
    }

    const getTotalPrice = () => {
        let total = 0;

        for (let _p of cart) {
            const product = getProductDetails(_p.id);

            total += _p.amount * product.price;
        }

        return total;
    }

    return (
        <Layout title="Zona de cumparare!">
            <br />
            <center>
                <p className="error">{errorMessage}</p>
            </center>
            <div className="checkout">
                <div className="products">
                    {
                        cart.map((value, idx) => {
                            const product = getProductDetails(value.id);
                            
                            if (product !== null) return (
                                <div key={idx} className="product">
                                    <Link to={`/product/${product.id}`}>
                                        <img src={product.image} className="image" alt="product" />
                                    </Link>
                                        <div className="title">
                                            {product.title}
                                        </div>
                                        <div className="stock">
                                            {product.stock>10?"Stoc disponibil":"Stoc limitat"}
                                        </div>
                                        <div className="price">
                                            {
                                            product.promo>0?
                                                <div className="price">
                                                    <strike>{product.price} RON</strike> <span className="promo"> -{product.promo}%</span><br /> 
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

                                            <div className="menu">
                                                <div className="add" onClick={() => {dispatch(addItem(product.id))}}>Adauga</div>
                                                <div className="remove" onClick={() => {dispatch(removeItem(product.id))}}>Sterge</div>
                                            </div>
                                        </div>
                                        <br />  
                                </div>
                            )
                        })
                    }
                </div>
                <br></br>
                <h2>Total: {getTotalPrice()} RON</h2>
                <br></br>
                <h2>Pentru a livra comanda ta, ofera-ne o adresa si un numar de telefon!</h2>

                <input type="text" placeholder="Adresa" onChange={text => setAddress(text.target.value)}/>
                <input type="text" placeholder="Numar telefon" onChange={text => setPhoneNumber(text.target.value)}/><br />
                <input type="text" placeholder="Observatii livrare" onChange={text => setObs(text.target.value)}/>

                <br></br>
                <div className="button" onClick={() => {
                    if (phone && address || obs) 
                        dispatch(checkout(address, phone, obs));
                    else
                        setError("Trebuiesc completate toate campurile!");
                }}>Cumpara</div>
            </div>
        </Layout>
    );
};

export default Checkout;