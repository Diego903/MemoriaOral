import React, { Component, PropTypes } from 'react';

import { Link } from 'react-router-dom';

import { Segment, Grid, Header, Container, Image, Icon } from 'semantic-ui-react';

class Footer extends Component {

    constructor(props) {
        super(props);
    }

    render() {
    	let year = new Date();
    	year = year.getFullYear();
        return (
            <Segment inverted className="no-padding blue-grey darken-4 margin-top-50 no-border-radius">
            	<Container className="padding-top-30 padding-bottom-20">
	            	<Grid>
	            		<Grid.Column mobile={16} tablet={8} computer={6}>
	            			<Image src="/images/logo_sm.png" size="small"/>
	            			<p className="margin-top-10">
	            				Sistema para la recuperación de la memoria oral de las víctimas del conflicto armado en Colombia.
	            			</p>
	            		</Grid.Column>

	            		<Grid.Column mobile={16} tablet={8} computer={4}>
	            			<Header as="h3" inverted>Contácto</Header>
	            			<p><Icon name="mail"/>comerciocauca@misena.edu.co</p>
	            			<p><Icon name="mobile alternate"/>+57 (2) 8205108 – 8205903 - Ext. 22408 - 22029</p>
	            			<p><Icon name="map marker alternate"/>Calle 4 #2-80 - Popayán (Cauca)</p>
	            		</Grid.Column>

	            		<Grid.Column mobile={16} tablet={8} computer={3}>
	            			<Header as="h3" inverted>Navegación</Header>
	            			<div><Link to="/">Página principal</Link></div>
	            			<div><Link to="/">Testimonios</Link></div>
	            			<div><Link to="/">Historias del conflicto</Link></div>
	            			<div><Link to="/">Solicitudes de investigación</Link></div>
	            			<div><Link to="/">Datos abiertos</Link></div>
	            		</Grid.Column>

	            		<Grid.Column mobile={16} tablet={8} computer={3}>
	            			<Header as="h3" inverted>Apoya</Header>
	            			<div>
	            				<a href="http://www.sena.edu.co/es-co/Paginas/default.aspx" target="_blank">
	            					SENA
	            				</a>
            				</div>
	            			<div>
	            				<a href="http://40.70.207.114/" target="_blank">
	            					Sennova
	            				</a>
            				</div>
	            			<div>
	            				<a href="http://www.accioncontraminas.gov.co/accion/desminado/Paginas/Resena-Polus-Center.aspx" target="_blank">
	            					Polus Colombia
	            				</a>
            				</div>
	            		</Grid.Column>
	            	</Grid>
            	</Container>
            	<Segment inverted textAlign="center" className="no-border-radius light-blue darken-4">
            		&copy; Copyright {year}, Sena
            	</Segment>
            </Segment>
        );
    }
}

export default Footer;
