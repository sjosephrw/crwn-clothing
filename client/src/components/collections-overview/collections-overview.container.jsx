// import { connect } from 'react-redux';
// import { createStructuredSelector } from 'reselect';
// import { compose } from 'redux';

// import { selectIsCollectionFetching } from '../../redux/shop/shop.selectors';
// import { WithSpinner } from '../../components/with-spinner/with-spinner.component';
// import CollectionOverview from '../../components/collections-overview/collections-overview.component';

// const mapStateToProps = createStructuredSelector({
//     isLoading: selectIsCollectionFetching
// })

// //we need to wrap CollectionOverview with WithSpinner we can do it as below because functions will evaluate from inside out
// //but its ver hard to read whats below so we import compose library from redux
// // const CollectionsOverviewContainer = connect(mapStateToProps)(WithSpinner(CollectionOverview));

// //compose evaluates from right to left.
// const CollectionsOverviewContainer = compose(
//     connect(mapStateToProps),
//     WithSpinner
// )(CollectionOverview);

// export default CollectionsOverviewContainer;

//explanation above
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { selectIsCollectionFetching } from '../../redux/shop/shop.selectors';
import WithSpinner from '../with-spinner/with-spinner.component';
import CollectionsOverview from './collections-overview.component';

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsCollectionFetching
});

const CollectionsOverviewContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(CollectionsOverview);

export default CollectionsOverviewContainer;