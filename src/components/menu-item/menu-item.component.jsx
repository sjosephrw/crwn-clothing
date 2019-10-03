import React from 'react';
import './menu-item.styles.scss';
import { withRouter } from "react-router-dom";
//withRouter is a higher order component that is a function that excepts a component as a arg. and
//returns a modified component, otherwise to get the history prop we will have to pass it from directory to directory-menu and then
//to the menu-item, this is a bad pattern called porp tunneling ot prop drilling

const MenuItem = ({title, imageUrl, size, history, linkUrl, match}) => (
    //important folder lec. 65
    <div className={`${size} menu-item`} onClick={()=> history.push(`${match.url}${linkUrl}`)}>
    <div className='background-image'
    style={{backgroundImage: `url(${imageUrl})`}} 
    />
        <div className='content'>
            <h1 className='title'>
                {title.toUpperCase()}
            </h1>
            <span className='subtitle'>
                SHOP NOW
            </span>
        </div>
    </div>    
)

export default withRouter(MenuItem);