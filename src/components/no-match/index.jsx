import React from 'react';

class NoMatch extends React.Component {
	render() {
		return (
      <div className="alert alert-danger alert-dismissible fade in" role="alert">
    		<h4 className="bold">Upps!</h4>
    		<p>
    			Esta pagia no existe
  			</p>
			</div>
		);
	}
}

export default NoMatch;
