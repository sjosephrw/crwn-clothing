import React from 'react';
import './collection-preview.styles.scss';
import CollectionItem from '../collection-item/collection-item.component'

const CollectionPreview = ({title, items}) => (
    <div className='collection-preview'>
        <h1 className='title'>{title.toUpperCase()}</h1>
        <div className='preview'>
            {//to print out the 1st 4 items in each category .filter((item, idx) => idx < 4)
                items.filter((item, idx) => idx < 4).map(({id, ...otherItemProps}) => (
                    // <div key={item.id}>
                    //     {item.name}
                    // </div>
                    <CollectionItem key={id} {...otherItemProps}/>
                    
                ))
            }
        </div>
    </div>
)

export default CollectionPreview;