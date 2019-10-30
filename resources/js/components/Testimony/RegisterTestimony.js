import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';

import { Container, Header, Button, Segment, Modal, Form,Grid, Icon } from 'semantic-ui-react';
import GeneralMessage from '../Helpers/components/GeneralMessage';
import FormTestimony from './FormTestimony';

class RegisterTestimony extends Component {
    constructor(props) {
        super(props);

        this.state = {
        	success:[]
        }
    }

    render() {
        const {success} = this.state;

        const messageSuccess = this.props.userType == "Administrador"?
        	"El testimonio ha sido registrado exitosamente en el sistema, a partir de este momento será público y cualquier persona puede visualizarlo. La cuenta de usuario creada podrá ser activada ingresando al correo electrónico registrado.":
        	"Su testimonio ha sido registrado con éxito en el sistema, actualmente sólo puede ser visualizado por usted y los administradores de la plataforma, quienes se encargarán de verificar la información suministrada y habilitar el testimonio para que sea visualizado públicamente. Gracias por contar su historia!!";

        const triggerModal=this.props.userType == "Usuario"?
                <Button color="blue" >¿Quiere seber como se hace?<Icon className="margin-left-10" name="video"/></Button>:"";
                  

        return (
        	<Container>
                <Segment basic floated='right'>
                    <Modal trigger={triggerModal} size="small" closeIcon>                    
                        <Modal.Content>                                                                                                                                           
                            <video controlsList="nodownload" width="680" height="480" autoPlay controls>
                                <source src="../videos/RegistroTestimonio.mp4" type="video/mp4"/>
                            </video>                                                                   
                        </Modal.Content>
                    </Modal>
                </Segment>   
                <br/>          
                <Header as="h2" dividing>Registro de testimonio</Header>
        		<GeneralMessage success messages={success} onDismiss={()=>this.setState({success:[]})}/>
                <br/>
        		<FormTestimony
        			onRegister={() => this.setState({
        				success:[messageSuccess]
        			})}
        		/>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
	return {
		userType:state.app.user.rol
	}
}

const mapDispatchToProps = (dispatch) => {
	return {

	}
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterTestimony);
