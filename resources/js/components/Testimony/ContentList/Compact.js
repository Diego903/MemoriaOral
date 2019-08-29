import React, { Component, PropTypes } from 'react';
import { Card, Header, Icon, Grid, Segment, Label } from 'semantic-ui-react';
import { Btn } from '../../Helpers/Helpers';

class Compact extends Component {

    constructor(props) {
        super(props);

        this.handleMore = this.handleMore.bind(this);
    }

    handleMore(idTestimony){
    	if('onClickMore' in this.props){
    		this.props.onClickMore(idTestimony);
    	}
    }

    render() {
    	const { testimony } = this.props;

    	const color = testimony.estado == "Aprobado"?"green":(testimony.estado == "Registrado"?"blue":"grey");
        return (
        	<Grid.Column>
	            <Card fluid>	
					<Card.Content>
						<Card.Header>{testimony.titulo}</Card.Header>
						<Card.Meta>
							<span className='date'>{testimony.fecha_evento}</span>
						</Card.Meta>
						<Card.Meta>
							<span className='date'>{testimony.nombreMunicipio}</span>
						</Card.Meta>
						<Card.Meta>
							<span className='date'>{testimony.tipo}</span>
						</Card.Meta>
						<Card.Description>
							{testimony.descripcion_corta}
						</Card.Description>				
					</Card.Content>
					
					<Card.Content extra>
						<Label>
							<Icon name='comments' />
							22
						</Label>
						<Btn.More floated="right" onClick={() => this.handleMore(testimony.id)}/>
					</Card.Content>
					<Segment className={"no-padding "+color}>
					</Segment>
				</Card>
			</Grid.Column>
        );
    }
}

export default Compact;
