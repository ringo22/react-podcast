import React from 'react';

class podcastItem extends React.Component {
	constructor(props) {
    super(props);
  }

	render() {
		let itemClass = ""
		if (!(this.props.image && this.props.image.url)) {
			itemClass = "no-image"
		}

		let enclosure = null;

		this.props.enclosures.map(function(item, index){
			if (item.type == "audio/mpeg") {
				enclosure = item;
			}
		})

		return (
			<div className="podcast-item col-lg-4 col-md-4 col-sm-6">
				<div className="podcast-image-container">
					<img src={this.props.image && this.props.image.url ? this.props.image.url : '../img/play-image.png'} className={itemClass} />
					<p>
						{this.props.title}
						<br/>
						<span className="label label-success">Autor: {this.props.creator}</span>
					</p>
					<div className="sticker"></div>
				</div>
				<div className="text-center podcast-audio-container">
					<audio controls>
					  <source src={enclosure ? enclosure.url : null} type={enclosure ? enclosure.type : null} />
					</audio>
				</div>
			</div>
		);
	}

}

export default podcastItem;
