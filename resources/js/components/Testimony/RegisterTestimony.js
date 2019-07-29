import React, { Component, PropTypes } from 'react';

import { Container, Header } from 'semantic-ui-react';
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

        return (
        	<Container>
                <Header as="h2" dividing>Registro de testimonio</Header>
        		<GeneralMessage success messages={success} onDismiss={()=>this.setState({success:[]})}/>
        		<FormTestimony/>
            </Container>
        );
    }
}

export default RegisterTestimony;
