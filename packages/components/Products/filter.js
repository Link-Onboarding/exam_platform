import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProductsFilter, setProductsCategory } from '../../redux/actions/products';

const Filter = () => {
    const dispatch = useDispatch();

    const _shop = useSelector(state => state.shop);
    const _categories = useSelector(state => state.categories);

    const options = [
        { value: 'none', label: 'Niciuna' },
        { value: 'promo', label: 'Promotii' },
        { value: 'new', label: 'Produse noi' },
        { value: 'upprice', label: 'Pret crescator' },
        { value: 'downprice', label: 'Pret descrescator' },
        { value: 'stock', label: 'Stoc disponibil' }
    ]

    return (
        <React.Fragment>
            <div className="filter">
                <div className="orderby">
                    <label>Ordoneaza dupa:</label>

                    <select 
                        value={_shop?.filter}
                        onChange={(e) => {dispatch(setProductsFilter(e.target.value))}} 
                    >
                        {
                            options.map((value, idx) => (
                                <option key={idx} value={value.value}>{value.label}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="orderby">
                    <label>Categorie:</label>

                    <select 
                        value={_shop?.category} 
                        onChange={(e) => {dispatch(setProductsCategory(e.target.value))}} 
                    >
                        {
                            _categories?.map((value, idx) => (
                                <option key={idx} value={value.id}>{value.NAME}</option>
                            ))
                        }
                    </select>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Filter;