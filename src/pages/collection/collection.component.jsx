import React from 'react';
import { connect } from 'react-redux';


import CollectionItem from '../../components/collection-item/collection-item.component';
import { selectCollection } from '../../redux/shop/shop.selectors';

import './collection.styles.scss';
// import { firestore } from 'firebase';

const CollectionPage = ({ match, collection }) => {
   //if using useEffect to return a function , then it will be have as a clean up function (so we can use it as componentWillUnmount())
   //lec. 193
//    useEffect(() => {
//         console.log('I am Subscribing.');
//         const unsubscribeFromCollections = firestore.collection('collections').onSnapshot(snapshot => console.log(snapshot));
//         return () => {
//             console.log('I am Unsubscribing.');
//             unsubscribeFromCollections();
//         };
//     }, []);

//    console.log(match);
//    console.log(match.params.collectionId);
 console.log(`D ${collection}`)
    const { title, items } = collection;
   
    return (
        <div className='collection-page'>
            <h2 className='title'>
                { title }
            </h2>   
            <div className='items'>
                {
                    items.map(item=> <CollectionItem key={item.id} item={item}/>)
                }
            </div>   
        </div>
    )
}    

//this time we use the 2nd optional param. in map state to props that is ownProps
//ownProps will return the match Obj. that give us access to ownProps.match.params.collectionId
//state is the overall reducer state from the top, the state is required by selectCollection also
const mapStateToProps = (state, ownProps) => ({
    //IMPORTANT **********selectCollection is a function that returns a function so we pass the state param into the 2nd returned function
        collection: selectCollection(ownProps.match.params.collectionId)(state)
});

export default connect(mapStateToProps)(CollectionPage);