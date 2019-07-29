import React, { PropTypes } from 'react';
import { Segment, Header, Container, Divider, Card, Icon, Grid, Message, Button, Form } from 'semantic-ui-react';
import config_routes from '../../config/routes';

class Testimony extends React.Component {
	constructor(props) {
	  super(props);
	}

	render(){
		let items = [];

		for (let i = 0; i < 10; i++) {
			items.push(
				<Grid.Column key={i}>
					<Card fluid>
						<Card.Content>
							<Card.Header content='Toma gerrillera' />
							<Card.Meta content='Toribio (Cauca)' />
						</Card.Content>
						<Card.Content description="Esta es la descripción corta del testimonio, un texto corto que resume lo que pasó." />
						<Card.Content extra>
	                        <Icon name='comments' />
	                        40

		                	<Button type="button" primary floated="right">
		                		Ver más
		                	</Button>
						</Card.Content>
					</Card>
				</Grid.Column>
			)
		}

	    return (
	    	<Container>
	    		<Message
	    			info
				    icon='microphone'
				    header='¿Quiere contarle al mundo su testimonio?'
				    content={
				    	<Segment basic className="no-padding">
					    	Si usted ha sido víctima del comflicto armado en Colombia y desea que las personas que visitan
					    	nuestro sistema de información conozcan su historia, puede registrarla desde el siguiente botòn 
					    	y esperar que sea autorizada para ser pública en el sistema.
					    	<Button onClick={() => this.props.history.push(config_routes.register_testimony.path)} positive type="button" className="margin-left-10">Registrar testimonio</Button>
					    	Su testimonio hace parte de la memoria viva del conflicto armado, por lo tanto, mientras más perdure en el tiempo, más
					    	personas conoceremos la verdadera historia.
				    	</Segment>
				    }
				  />

	    		<Grid columns={3} doubling stackable>	
	    			<Grid.Column floated="right">
	    				<Form.Input type='search' fluid icon='search' label="Buscar" placeholder="Buscar ..."/>
	    			</Grid.Column>
	    		</Grid>

	    		<Grid columns={3} doubling stackable>
	    			{items}
	    		</Grid>
	        </Container>
	    );
	}
}

export default Testimony;
