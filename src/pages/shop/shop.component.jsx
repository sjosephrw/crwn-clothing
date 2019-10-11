import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CollectionOverviewContainer from '../../components/collections-overview/collections-overview.container';
import CollectionPageContainer from '../collection/collection.component';
import { fetchCollectionsStart } from '../../redux/shop/shop.actions';


// import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions';
// import { selectIsCollectionFetching, selectIsCollectionsLoaded } from '../../redux/shop/shop.selectors';

// import WithSpinner from '../../components/with-spinner/with-spinner.component';

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


//const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview);//collectionOverview and collectionPage below need to be aware whether the data is loading
// const CollectionPagewWithSpinner = WithSpinner(CollectionPage);//collectionOverview and collectionPage below need to be aware whether the data is loading


class ShopPage extends React.Component {
    //*********MOST OF THE CODE WAS MOVED SHOP.ACTIONS.JS */
    // constructor(){
    //     super();
    //because the data coming in from firebase is asynchronous (we changed it to async by switching to promises) we might get errors to prevent this
    //we create a loading state that displays a loading icon until we receive the data.
    //     this.state ={ loading: true }
    // }

    //if we write the state obj. outside the constructor react will automatically write a constructor and invoke super for us. 
    //like the constructor commented out above
    // state ={ loading: true }

    //when ever subscribing (getting) firebase data we also need to unsubscribe
    // unsuscribeFromSnapshot = null;

    componentDidMount(){

        // const { updateCollections } = this.props;

        // const { fetchCollectionsStartAsync } = this.props;
        // fetchCollectionsStartAsync();
        
        const { fetchCollectionsStart } = this.props;
        fetchCollectionsStart();
        
        //this is slightly diffenent to user authentication because we are only getting data
        //WE DONT NEED THIS WE CAN ALSO USE THE FETCH API LIKE SHOWN BELOW lec. 166
        // const collectionRef = firestore.collection('collections');//('collections'); - name of obj. holding the items data
        // // fetch('https://<FIRBASE API END POINT>/collections').then(res => res.json()).then(collections => console.log(collections));
        
        // //whenever the collectionRef updates or whenever this code runs for the first time
        // //this code will send us the collections json data

        // //******IMPORTANT */If we are using PROMISES and not Observable Observer Pattern then
        // collectionRef.get().then(snapshot => {
        //     //console.log(snapshot);
        //     //now though the routing and ids were removed from the db data we need to get them back into our App
        //     //so
        //     const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        //     // console.log(collectionsMap);
        //     updateCollections(collectionsMap); 
        //     //we can move the state below into a redux state 
        //     //or we can move the entire collectionRef.get().then(snapshot => { into a REDUX state  
        //     //for this we'll be using REDUX THUNK for asynchronous REDUX
        //     this.setState({ loading: false });//data has finished loading stop rendering the loading icon          
        // })

        //OBERVABLE OBSERVER PATTERN
        // collectionRef.onSnapshot(async snapshot => {
        //     //console.log(snapshot);
        //     //now though the routing and ids were removed from the db data we need to get them back into our App
        //     //so
        //     const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        //     // console.log(collectionsMap);
        //     updateCollections(collectionsMap);  
        //     this.setState({ loading: false });//data has finished loading stop rendering the loading icon          
        // });
    }

    render(){

        // const { match, isCollectionFetching, isCollectionsLoaded } = this.props;
        const { match } = this.props;

        // const { loading } = this.state;
        return (<div className='shop-page'>
            {
                //in the App.js page the ShopPage is nested in a Route and that automatically passes
                //match, history, path to the ShopPage component props, I think we use withRouter when 
                //a Route component does not pass match, history and path into it 
                //in App.js - <Route path='/shop' component={ShopPage}/> will always lead us to the ShopPage component
            }
            {/* <Route exact path={`${match.path}`} component={ CollectionOverview } /> */}
            {
                //render is a function where the params of the function are the props that the component receive
                //below props are match location and history that the <Route/> passes into the component
            }   
                {/* <Route exact path={`${match.path}`} render={(props) => <CollectionOverviewWithSpinner isLoading={loading} {...props}/>} /> */}
                {/* <Route path={`${match.path}/:collectionId`} component={ CollectionPage }/> */}
                {/* <Route path={`${match.path}/:collectionId`} render={(props) => <CollectionPagewWithSpinner isLoading={loading} {...props}/>} /> */}

                {
                    //Now we are moving isCollectionFetching and isCollectionsLoaded into CollectionOverviewWithSpinner, CollectionPagewWithSpinner
                    //because we need them to be in their own isolated environment (THE CONTAINER PATTERN) lec. 170
                }
                {/* <Route exact path={`${match.path}`} render={(props) => <CollectionOverviewWithSpinner isLoading={isCollectionFetching} {...props}/>} />
                <Route path={`${match.path}/:collectionId`} render={(props) => <CollectionPagewWithSpinner isLoading={!isCollectionsLoaded} {...props}/>} /> */}
            
                <Route exact path={`${match.path}`} component={CollectionOverviewContainer} />
                <Route path={`${match.path}/:collectionId`} component={CollectionPageContainer} />

            </div>)
        }        

}

//may be functions from .selectors.js go into mapStateTOProps
//and from .actions.js go to mapDIspatchToProps

// const mapStateToProps = createStructuredSelector({
//     //Now we are moving isCollectionFetching and isCollectionsLoaded into CollectionOverviewWithSpinner, CollectionPagewWithSpinner
//     //because we need them to be in their own isolated environment (THE CONTAINER PATTERN) lec. 170
//     // isCollectionFetching: selectIsCollectionFetching,
//     // isCollectionsLoaded: selectIsCollectionsLoaded
// })

//we are gettign the shop items data from the DB may be thats why we use mapDispatchToProps
const mapDispatchToProps = dispatch => ({
    // updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
    // fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
    fetchCollectionsStart: () => dispatch(fetchCollectionsStart())

})

export default connect(null, mapDispatchToProps)(ShopPage);
