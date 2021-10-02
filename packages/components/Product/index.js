import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from '../../redux/actions/products';
import { addItem } from '../../redux/actions/bag';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as emptyStar } from '@fortawesome/free-regular-svg-icons';

const Index = props => {
    const dispatch = useDispatch();

    useEffect(
        () => {
            dispatch(getProducts());
        },[]
    );

    const _shop = useSelector(state => state.shop);

    
    let productValue = null;

    if (_shop?.products) {
        for(let obj of _shop?.products) { 
            if(obj.id == props.match.params.id) {
                productValue = obj;
            }
        }
    }

    return (
        <React.Fragment>
            {
                productValue===null?
                null:
                <div className="product-layer">
                    <div className="product-flexbox">
                            <img src={productValue.image} className="preview" alt='product' />

                        <div className="product-content">
                            <div className="product-title">{productValue.title}</div>

                            <div className="product-price">
                            {
                                    productValue.promo>0?
                                        <div className="price">
                                            <strike>{productValue.price} RON</strike> <span className="promo"> - {productValue.promo}%</span><br /> 
                                            {productValue.price - productValue.price*productValue.promo/100} RON
                                        </div>
                                        :
                                        <div className="price">
                                            {productValue.price} RON
                                        </div>
                                    }
                            </div>
                            
                            <div className="product-desc-list2">
                                <div className="product-desc-row">
                                {productValue.stock>10?"Stoc disponibil":"Stoc limitat"}
                                </div>

                                <div className="product-desc-row">
                                    {productValue.description}
                                </div>
                                
                                <div className="product-desc-row">
                                    Conform clientiilor nostri acest produs este cotat la: 
                                    <div className="reviews">
                                        {
                                            productValue.reviews_cnt > 0?
                                            [...Array(5)].map(
                                                (_,i)=> 
                                                <span key={i}>
                                                    <FontAwesomeIcon icon={i >= Math.ceil(productValue.reviews_sum/productValue.reviews_cnt)?emptyStar:faStar} />
                                                </span>
                                                )
                                            :
                                            [...Array(5)].map(
                                                (_,i)=> 
                                                <span key={i}>
                                                    <FontAwesomeIcon icon={emptyStar} />
                                                </span>
                                                )
                                        }
                                    </div>
                                </div>
                            </div>
                            
                            <div className="button" onClick={() => {
                                dispatch(addItem(productValue.id))
                            }}>
                                Adauga in cos
                            </div>
                        </div>
                    </div>
                </div>
            }
        </React.Fragment>
    );
};

export default Index;