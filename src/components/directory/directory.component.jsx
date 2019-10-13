import React from 'react';
import { connect } from 'react-redux';
import { selectDirectorySections } from '../../redux/directory/directory.selectors';
import { createStructuredSelector } from 'reselect';


import MenuItem from '../menu-item/menu-item.component'
import './directory.styles.scss'


//********* */now we don't need a class component becasue the this.state was moved to the directory.reducer.js 
// class Directory extends Component {
//     constructor(){
//         super()
//         this.state = {//moved into the directory reducer
           
//         }
//     }

//     render(){
//         return (
//             <div className='directory-menu'>
//                 {
//                     //using destructuring on the section object below
//                     // this.state.sections.map(section => {
//                     //     <MenuItem key={section.id} title={section.title}/> 
//                     // })

//                     // this.state.sections.map(({id, title, imageUrl, size}) => 
//                     //     <MenuItem key={id} title={title} imageUrl={imageUrl} size={size}/> 
//                     // )
                  
//                     ////spread operator
//                     //this was modified from above lec. 66
//                     this.state.sections.map(({id, ...otherSectionProps}) => 
//                         <MenuItem key={id} {...otherSectionProps}/> //spread operator
//                     )                
                
//                 }
//             </div>
//         )
//     }

// }

const Directory = ({ sections }) => (
  <div className='directory-menu'>
      {
        sections.map(({id, ...otherSectionProps}) => 
            <MenuItem key={id} {...otherSectionProps}/> //spread operator
        )                
      }
  </div>  
)

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections
  //because of this we can do - const Header = ({ , itemCount}) => ( 
});

export default connect(mapStateToProps)(Directory);