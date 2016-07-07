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
			podcastInfo: null,
      items: []
    };
  }

	render() {
		let podcastAuthor = this.state.podcastInfo ? `Autor: ${this.state.podcastInfo.author}` : null
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
						        <button type="submit" id="search-button" className="btn btn-success" data-loading-text="Buscando...">
											<span className="glyphicon glyphicon-search" aria-hidden="true"></span> Buscar
										</button>
						      </span>
								</div>
							</form>
						</div>
					</div>
					<div className="row">
						<div className="col-md-12">
							{this.state.podcastInfo ? <h1>{this.state.podcastInfo.title}</h1> : null}
							{this.state.podcastInfo ? <p>{this.state.podcastInfo.description}</p> : null}
							{this.state.podcastInfo ? <span className="label black">{podcastAuthor}</span> : null}
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
				podcastInfo: null,
				items: []
			})
    } else {
    	this.setState({
    		inputClass: 'input-group',
    		showNotification: false,
    		status: '',
				title: '',
				message: '',
				podcastInfo: null,
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

		let btn = $('#search-button').button('loading');

    this._getPodcast(input.value, function(err, data) {
	    btn.button('reset');

    	if (err) {
    		me.setState({
    			inputClass: 'input-group',
    			showNotification: true,
    			status: 'danger',
					title: 'Upps!',
					message: 'No se encontro información con respecto al podcast consultado',
					podcastInfo: null,
					items: []
    		});
    		return;
    	}

    	me.setState({
				showNotification: false,
				podcastInfo: data.meta,
    		items: data.entries
    	});

    	input.value = '';
    })
	}

	_getPodcast(podcastUrl, callback) {
	  feednami.load(podcastUrl,function(result){
	    if(result.error){
	      return callback(true)
	    }
	    else{
				return callback(null, result.feed)
	    }
	  })
	}

}

export default RequestPodcast;
