import React, { Component, PropTypes } from 'react';

import { Segment, Header, Button, Icon, Modal } from 'semantic-ui-react';
import { Btn } from '../Helpers/Helpers';

import { connect } from 'react-redux';

class Allies extends Component {

	constructor(props) {
		super(props);

		this.state = {
			styles:{
				position: 'fixed',
				bottom: '3%',
				right: '2%',
				zIndex: 1000,
				/*width:'100%',
				minWidth:'100%',*/
				padding:'0px',
				//margin:'1rem 0px',
			}
		};
	}

	render() {
		const triggerModal = <Button 
	    			animated='vertical'
	    			size="big"
	    			color="orange"
	    		>
					<Button.Content visible>¿Quieres ser un aliado? <Icon className="margin-left-10" name="handshake outline"/></Button.Content>
					<Button.Content hidden>Envianos tus datos <Icon className="margin-left-10" name="heart"/></Button.Content>
			    </Button>

	    return (
	    	<Segment basic style={this.state.styles}>
			    <Modal trigger={triggerModal} size="small" closeIcon>
					<Header>
						<Icon name="handshake outline" />
						<Header.Content>
							¿Quieres ser un aliado?
						</Header.Content>
					</Header>
					<Modal.Content>
						<Modal.Description>
							<p>
								Si deseas ser un aliado nuestro y apoyar de alguna forma a las víctimas del
								conflicto armado en Colombia, dejanos tus datos y los de la organización a la cual
								perteneces. Pronto nos pondremos en contácto contigo.
							</p>
						</Modal.Description>
					</Modal.Content>

					<Modal.Actions>
				      <Btn.Send/>
				    </Modal.Actions>
				</Modal>
			</Segment>       
	    )
	}
}

const mapStateToProps = (state) => {
	return {
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Allies);
