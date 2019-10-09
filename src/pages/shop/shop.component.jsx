import React from 'react';
import { Route } from 'react-router-dom';

import CollectionOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';

// import './shop.data'
// import SHOP_DATA from './shop.data';
// import CollectionPreview from '../../components/preview-collection/collection-preview.component';
// import { selectCollections } from '../../redux/shop/shop.selectors';
// import { connect } from 'react-redux';
// import { createStructuredSelector } from 'reselect';

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

const ShopPage = ({ match }) => {

    console.log(match);//match.path = '/shop'

    return (<div className='shop-page'>
        {
            //in the App.js page the ShopPage is nested in a Route and that automatically passes
            //match, history, path to the ShopPage component props, I think we use withRouter when 
            //a Route component does not pass match, history and path into it 
            //in App.js - <Route path='/shop' component={ShopPage}/> will always lead us to the ShopPage component
        }
        <Route exact path={`${match.path}`} component={ CollectionOverview } />
        <Route path={`${match.path}/:collectionId`} component={ CollectionPage }/>
    </div>)
}


export default ShopPage;
