import React from 'react';

class podcastItem extends React.Component {
	constructor(props) {
    super(props);

		this.state = {
			itemId: null
		}
  }

	render() {
		let itemClass = ""
		if (!(this.props.image && this.props.image.url)) {
			itemClass = "no-image"
		}

		let enclosure = null;
		let idAudioItem = `item-${this.props.keyIndex}`

		this.props.enclosures.map(function(item, index){
			if (item.type == "audio/mpeg") {
				enclosure = item;
			}
		})

		return (
			<div className="podcast-item col-lg-4 col-md-4 col-sm-6">
				<div className="podcast-content">
					<div className="podcast-image">
						<img src={this.props.image && this.props.image.url ? this.props.image.url : '../img/play-image.png'} className={itemClass} />
						<div className="sticker text-center"
									onMouseOver={this._handleOver.bind(this)}
									onMouseOut={this._handleOut.bind(this)}>
							<img src="./img/play.png"
							 className={this.state.showPlay && !this.state.showPause ? "show" : null}
							 onClick={this._handleClick.bind(this)} />
							<img src="./img/pause.png"
 							 className={this.state.showPause ? "show" : null}
 							 onClick={this._handleClick.bind(this)} />
						</div>
					</div>
					<div className="podcast-description">
						<p>
							{this.props.title}
							<br/>
							<span className="label label-success">Autor: {this.props.creator}</span>
						</p>
					</div>
				</div>
				<div className="text-center podcast-audio-container">
					<audio id={idAudioItem} className="item-song" controls>
					  <source src={enclosure ? enclosure.url : null} type={enclosure ? enclosure.type : null} />
					</audio>
				</div>
			</div>
		);
	}

	_handleClick(event) {
		event.preventDefault();

		let currentSong = document.getElementById(`item-${this.props.keyIndex}`)
		let allSongs = document.getElementsByClassName('item-song')

		if (currentSong.paused) {
			currentSong.play();
			this.setState({
				showPause: true,
				showPlay: false
			});
	  } else {
	    currentSong.pause();
			this.setState({
				showPause: false,
				showPlay: false
			});
	  }
	}

	_handleOver(event) {
		event.preventDefault();

		this.setState({
			showPlay: true
		});
	}

	_handleOut(event) {
		event.preventDefault();

		this.setState({
			showPlay: false
		});
	}

}

export default podcastItem;
