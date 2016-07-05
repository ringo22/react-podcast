import React from 'react';

class podcastItem extends React.Component {
	constructor(props) {
    super(props);
  }

	render() {
		let itemClass = ""
		if (!this.props.image) {
			itemClass = "no-image"
		}

		return (
			<div className="podcast-item col-lg-4 col-md-4 col-sm-6">
				<div className="podcast-image-container">
					<img src={this.props.image ? this.props.image.href : '../img/play-image.png'} className={itemClass} />
					<p>
						{this.props.title}
						<br/>
						<span className="label label-success">Autor: {this.props.creator}</span>
						<br />
						<span className="label black">{this.props.created}</span>
					</p>
					<div className="sticker"></div>
				</div>
				<div className="text-center podcast-audio-container">
					<audio controls>
					  <source src={this.props.enclosure.url} type={this.props.enclosure.type} />
					</audio>
				</div>
			</div>
		);
	}

}

export default podcastItem;