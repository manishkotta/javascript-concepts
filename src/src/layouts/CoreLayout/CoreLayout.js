import React from 'react'
var PropTypes = require('prop-types'); 

export const CoreLayout = (props) => {
 return (
 <div  className="wrapper" >
        <div className="content-wrapper">
          <div id="content_frame" className="content-frame">
            {props.children}
          </div>
        </div>
      </div>
 )
}
export default CoreLayout

CoreLayout.contextTypes = {
  isRtl: PropTypes.func
};