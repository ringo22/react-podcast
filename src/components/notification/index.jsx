import React from 'react';

class Notification extends React.Component {

	constructor(props) {
    super(props);

  	let notificationClass = 'alert';
  	let notificationTitle = 'Atención';
  	let notificationMessage = '';

  	switch (this.props.status) {
  		case 'info':
  			notificationClass += ' alert-info';
  		break;
  		case 'warning':
  			notificationClass += ' alert-warning';
  		break;
  		case 'danger':
  			notificationClass += ' alert-danger';
  		break;
  		default:
  			notificationClass += ' alert-success';
  	}

  	this.state = {
    	title: this.props.title ? this.props.title : notificationTitle,
      message: this.props.message ? this.props.message : notificationMessage,
      notificationClass: notificationClass
    }
  }

  render() {
  	return (
  		<div className={this.state.notificationClass} role="alert">
  			<span className="bold">{this.state.title}</span>
        <br />
        {this.state.message}
  		</div>
		);
  }

}

export default Notification;
