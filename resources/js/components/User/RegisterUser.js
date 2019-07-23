import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { Container } from 'semantic-ui-react';
import GeneralMessage from '../Helpers/components/GeneralMessage';
import FormUser from './FormUser';

class RegisterUser extends Component {

    constructor(props) {
        super(props);  

        this.state = {
        	success:[]
        }
        this.onActionSuccess = this.onActionSuccess.bind(this);

    }
    

    onActionSuccess(){
    	this.setState({
    		success:["El usuario se ha creado con éxito, para activar la cuenta debe ingresar a su correo electrónico e ingresar al link enviado."],
    	})
    }

    render() {    	
    	const {success} = this.state;

        return (
        	<Container>
        		<GeneralMessage success messages={success} onDismiss={()=>this.setState({success:[]})}/>
	        	<FormUser action="register" onActionSuccess={this.onActionSuccess} onCancel={() => {this.props.history.goBack()}}/>
            </Container>
        );
    }
}

const mapStateToProps = (state, props) => {
	return {
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		sendRegisterUser:(data) => {
			return dispatch(actRegisterUser(data));
		},

		addNotificationChangePasswordSuccess:() => {
			const notification = {
	    		header:"Confirmación",
	    		message:"Se ha creado un nuevo usuario exitosamente.",
	    		closeIn:7,
	    		showButtonClose:true
	    	}

	    	dispatch(actAddNotification(notification));
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterUser);
