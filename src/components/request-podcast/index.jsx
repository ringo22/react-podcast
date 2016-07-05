import React from 'react';
import Notification from '../notification';
import PodcastData from '../podcast-data';

class RequestPodcast extends React.Component {

	constructor(props) {
    super(props);

    this.state = {
      inputClass: 'input-group',
      showNotification: false,
      status: '',
			title: '',
			message: '',
      items: []
    };
  }

	render() {
		return (
			<div className="row">
        <div className="col-lg-10 col-lg-offset-1">

					<div className="row">
						<div className="col-lg-offset-2 col-lg-8 col-md-offset-2 col-md-8 col-sm-offset-1 col-sm-10">
							{ this.state.showNotification ? 
								<Notification status={this.state.status} title={this.state.title} message={this.state.message} />
							: null }
							<form onSubmit={this._handleSubmit.bind(this)}>
								<div className={this.state.inputClass}>
									<input  type="text"
						      				id="urlPodcast"
						      				className="form-control"
						      				placeholder="Ingresa la URL del podcast"
						      				onChange={this._handleChange.bind(this)} />
						      <span className="input-group-btn">
						        <button type="submit" className="btn btn-success">
											<span className="glyphicon glyphicon-search" aria-hidden="true"></span> Buscar
										</button>
						      </span>
								</div>
							</form>
						</div>
					</div>
					<div className="row">
						<div className="col-md-12">
							<PodcastData items={this.state.items} />
						</div>
					</div>
					
				</div>
			</div>
		)
	}

	_handleChange(event) {
		event.preventDefault();

		let input = document.getElementById('urlPodcast')
		if (input.value.length > 0) {
			this.setState({
				inputClass: 'input-group has-success',
				showNotification: false,
				status: '',
				title: '',
				message: '',
				items: []
			})
    } else {
    	this.setState({
    		inputClass: 'input-group',
    		showNotification: false,
    		status: '',
				title: '',
				message: '',
				items: []
    	})
    }
	}

	_handleSubmit(event) {
    event.preventDefault()

    let me = this;
    let input = document.getElementById('urlPodcast');

    if (!input.value.length > 0) {
    	this.setState({
    		inputClass: 'input-group has-error',
    		showNotification: true,
    		status: 'warning',
				title: 'Atención',
				message: 'Debes agregar una URL para buscar un podcast'
    	});

    	return;
    }

    this._getPodcast(input.value, function(err, data) {
    	if (err) {
    		me.setState({
    			inputClass: 'input-group',
    			showNotification: true,
    			status: 'danger',
					title: 'Upps!',
					message: 'No se encontro información con respecto al podcast consultado',
					items: []
    		})
    		return;
    	}

    	me.setState({
    		items: data
    	});

    	input.value = '';
    })
	}

	_getPodcast(podcastUrl, callback) {
		let yql = `https://query.yahooapis.com/v1/public/yql?q=select%20title%2Clink%2Cenclosure%2Cdc:creator%2Cdcterms:created%2Citunes:image%2Cdescription%20from%20rss%20where%20url%3D%22${podcastUrl}%3Fformat%3Dxml%22&format=json&diagnostics=true&callback=`
	    
		$.getJSON(yql, function(data) {
			if (!data.query.results) {
				return callback(true)
			}

			return callback(null, data.query.results.item)
		}, "jsonp")
	}

}

export default RequestPodcast;