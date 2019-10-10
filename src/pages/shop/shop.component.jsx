import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CollectionOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';
import { updateCollections } from '../../redux/shop/shop.actions';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

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

// const ShopPage = ({ match }) => {

//     console.log(match);//match.path = '/shop'

//     return (<div className='shop-page'>
//         {
//             //in the App.js page the ShopPage is nested in a Route and that automatically passes
//             //match, history, path to the ShopPage component props, I think we use withRouter when 
//             //a Route component does not pass match, history and path into it 
//             //in App.js - <Route path='/shop' component={ShopPage}/> will always lead us to the ShopPage component
//         }
//         <Route exact path={`${match.path}`} component={ CollectionOverview } />
//         <Route path={`${match.path}/:collectionId`} component={ CollectionPage }/>
//     </div>)
// }

class ShopPage extends React.Component {
    // constructor(props){
    //     super(props);
    // }

    //when ever subscribing (getting) firebase data we also need to unsubscribe
    unsuscribeFromSnapshot = null;

    componentDidMount(){

        const { updateCollections } = this.props;

        //this is slightly diffenent to user authentication because we are only getting data
        const collectionRef = firestore.collection('collections');//('collections'); - name of obj. holding the items data
        //whenever the collectionRef updates or whenever this code runs for the first time
        //this code will send us the collections json data
        collectionRef.onSnapshot(async snapshot => {
            //console.log(snapshot);
            //now though the routing and ids were removed from the db data we need to get them back into our App
            //so
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
            // console.log(collectionsMap);
            updateCollections(collectionsMap);            
        });
    }

    render(){

        const { match } = this.props;

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

}
//we are gettign the shop items data from the DB may be thats why we use mapDispatchToProps
const mapDispatchToProps = dispatch => ({
    updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
})

export default connect(null, mapDispatchToProps)(ShopPage);
