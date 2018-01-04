//use camel case for writing in react attibutes 


import React from 'react'
//import '../../styles/headerStyles.css'


export const Home = (props) => {
	return (
		<div className="row" style={{ paddingTop: '50px' }}>
			<div className="col-md-12">
				<h1 className='cursiveFont' 
					style={{ 'textAlign': 'center' }}>
						Want to set dashboard slide show?<br/> 
						<a href="javascript:void(0)" onClick={() => props.clickHere() }>  Click here </a>
				</h1>
			</div>

		</div>
	)
}

export default Home
