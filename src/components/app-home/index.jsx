import React from 'react'
import { Link } from 'react-router'

class AppHome extends React.Component {
	render() {
    let isHome = this.props.location.pathname == '/' ? 'active' : ''
    let isSearch = this.props.location.pathname == '/search' ? 'active' : ''

		return (
      <div>
  			<header>
          <div className="row">
            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12 text-center logo-container">
              <img src="../img/logo.png" className="logo" />
            </div>
            <div className="col-lg-9 col-md-9 col-sm-9 col-xs-12 m-t-10">
              <h2>Visualizador de PodCast</h2>
              <h6>Creador: Rodrigo Raya</h6>
            </div>
          </div>
        </header>

        {this.props.children}
      </div>
		)
	}
}

export default AppHome