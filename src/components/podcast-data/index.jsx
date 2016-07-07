import React from 'react'
import PodcastItem from '../podcast-item';

class PodcastData extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="row podcast-container">
				{this.props.items.map(function(item, index){
					return <PodcastItem title={item.title}
															created={item.created}
															creator={item.author}
															image={item.image}
															enclosures={item.enclosures}
															keyIndex={index}
					 										key={index} />
      	})}
			</div>
		)
	}
}

export default PodcastData
