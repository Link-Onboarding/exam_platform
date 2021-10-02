import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Filter from "./filter";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, setProductsFilter } from '../../redux/actions/products';
import { getCategories } from '../../redux/actions/category';

import "./sass/index.css";

const Products = props => {
    const dispatch = useDispatch();

    useEffect(
        () => {
            dispatch(getCategories());
            dispatch(getProducts());
        },[]
    );

    const _shop = useSelector(state => state.shop);

    useEffect(
        () => {
            setTimeout(() => {
                dispatch(setProductsFilter(props.match.params.filter === 'new-arrivals'?
                'new'
                :
                props.match.params.filter === 'all'?
                'stock'
                :
                props.match.params.filter === 'promotions'?
                'promo'
                :
                'none'));
            },500);
        },[]
    );

    return (
        <div className="products">
            <Filter />
            {
                _shop?.products?.map(
                    (value, idx) => (
                        <Link  key={idx} to={`/product/${value.id}`}>
                            <div className="product">
                                <img src={value.image} className="image" alt="product" />
                                <div className="title">
                                    {value.title}
                                </div>
                                <div className="stock">
                                    {value.stock>10?"Stoc disponibil":"Stoc limitat"}
                                </div>
                                    {
                                    value.promo>0?
                                        <div className="price">
                                            <strike>{value.price} RON</strike> <span className="promo"> - {value.promo}%</span> {value.price - value.price*value.promo/100} RON
                                        </div>
                                        :
                                        <div className="price">
                                            {value.price} RON
                                        </div>
                                    }
                                <div className="info">( Apasa pentru mai multe detalii! )</div>
                            </div>
                        </Link>
                    )
                )
            }
        </div>
    ); 
};

export default Products;