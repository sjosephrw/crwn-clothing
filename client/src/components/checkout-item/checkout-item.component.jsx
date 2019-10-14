import React from 'react';
import { connect } from 'react-redux';
import './checkout-item.styles.scss';
import { clearItemFromCart, addItem, removeItem } from '../../redux/cart/cart.actions';

// const CheckoutItem = ({ cartItem: { name, imageUrl, price, quantity }}) => (
//     //************** */we have no access to the cartItem here so we have to return 
//     <div className='checkout-item'>
//         <div className='image-container'>
//             <img src={imageUrl} alt='item'/>
//         </div>
//         <span className='name'>{name}</span>
//         <span className='quantity'>{quantity}</span>
//         <span className='price'>{price}</span>
//         <span className='remove-button'>&#10005;</span>
//     </div>
// )

const CheckoutItem = ({ cartItem, clearItem, addItem, removeItem }) => {
    //************** */we have no access to the cartItem here so we have to return 
    const { imageUrl, name, quantity, price } = cartItem;

    return (    <div className='checkout-item'>
        <div className='image-container'>
            <img src={imageUrl} alt='item'/>
        </div>
        <span className='name'>{name}</span>
        <span className='quantity'>
            <div className='arrow' onClick={() => {removeItem(cartItem)}}>&#10094;</div>
                <span className='value'>{quantity}</span>
            <div className='arrow' onClick={() => {addItem(cartItem)}}>&#10095;</div>    
        </span>
        <span className='price'>{price}</span>
        <span className='remove-button' onClick={()=>{clearItem(cartItem)}}>&#10005;</span>
    </div>
    )
}

const mapDispatchToProps = dispatch => ({
    clearItem: (item) => dispatch(clearItemFromCart(item)),
    addItem: (item) => dispatch(addItem(item)),
    removeItem: (item) => dispatch(removeItem(item))
});

export default connect(null, mapDispatchToProps)(CheckoutItem);