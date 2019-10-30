import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { Container, Header, Button, Segment, Modal, Form,Grid, Icon } from 'semantic-ui-react';
import GeneralMessage from '../Helpers/components/GeneralMessage';
import FormUser from './FormUser';
import { Btn } from '../Helpers/Helpers';

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
                                    
        const triggerModal=
                <Button color="blue" >¿Quiere seber como se hace?<Icon className="margin-left-10" name="video"/></Button>
                        
        return (
        	<Container>
                <Btn.Return onClick={() => this.props.history.goBack()}/>             
                <Segment basic style={this.state.styles} floated='right'>
                    <Modal trigger={triggerModal} size="small" closeIcon>                    
                        <Modal.Content>
                            <Form>
                                <div className="demo-content">                                                                                                                
                                    <video width="680" height="480" autoPlay controls controlsList="nodownload">
                                        <source src="../videos/RegistroUsuario.mp4" type="video/mp4"/>
                                    </video>                                                                          
                                </div>                                                                                              
                            </Form>
                        </Modal.Content>
                    </Modal>
                </Segment>
                <Header as="h2" dividing>Registro de usuarios</Header>
        		<GeneralMessage success messages={success} onDismiss={()=>this.setState({success:[]})}/>
	        	<FormUser action="register" onActionSuccess={this.onActionSuccess}/>                
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
