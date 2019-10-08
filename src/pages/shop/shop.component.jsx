import React from 'react';
// import './shop.data'
// import SHOP_DATA from './shop.data';
import CollectionPreview from '../../components/preview-collection/collection-preview.component';
import { selectCollections } from '../../redux/shop/shop.selectors';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

// class ShopPage extends React.Component {

//     constructor(props){
//         super(props)

//         this.state = {
//             collections: SHOP_DATA      
//         }
//     }

//     render(){
//         const {collections} = this.state;
//         console.log(this.state);
//         return (
//             <div className='shop-page'>
//                 {
//                     collections.map(({id, ...otherCollectionProps}) => (
//                         <CollectionPreview key={id} {...otherCollectionProps}/>
//                     ))
//                 }
//             </div>
//         )
//     }

// }

const ShopPage = ({ collections }) => (
    <div className='shop-page'>
        {
            collections.map(({id, ...otherCollectionProps}) => (
                <CollectionPreview key={id} {...otherCollectionProps}/>
            ))
        }
    </div>
)


const mapStateToProps = createStructuredSelector({
    collections: selectCollections
    //because of this we can do - const Header = ({ , itemCount}) => ( 
  });

export default connect(mapStateToProps)(ShopPage);
