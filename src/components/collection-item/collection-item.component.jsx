import React from 'react';
import './collection-item.styles.scss';
import CustomButton from '../../components/custom-button/custom-button.component';
import { connect } from 'react-redux';//connect - Higher Order Component, that modifies our component to have access to things related to Redux
import { addItem } from '../../redux/cart/cart.actions';


const CollectionItem = ({item, addItem}) => {
    
    const { name, price, imageUrl } = item;
    return (
        <div className='collection-item'>
        <div
            className='image'
            style={{
                backgroundImage: `url(${imageUrl})`
            }}
        >

        </div>
        <div className='collection-footer'>
            <span className='name'>{name}</span>
            <span className='price'>{price}</span>
        </div>
        <CustomButton inverted onClick={() => {addItem(item)} }>ADD TO CART</CustomButton>
    </div>
    )
};

//***********LEC 101 kind of confusing */
const mapDispatchToProps = dispatch => ({
    //dispatch - a way for redux to know that whatever you are passing into me is a action obj. that I am going to pass into every reducer
    addItem: (item) => dispatch(addItem(item))//addItem: (item) => dispatch(addItem(item)) makes it possible for the item parameter in addItem(item) to recieve all the item prop of CollectionItem()
});

export default connect(null, mapDispatchToProps)(CollectionItem);