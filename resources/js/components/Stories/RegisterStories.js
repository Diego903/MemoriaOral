import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { Container } from 'semantic-ui-react';
import GeneralMessage from '../Helpers/components/GeneralMessage';
import FormStories from './FormStories';

class RegisterStories extends Component {

    constructor(props) {
        super(props);  

        this.state = {
            success:[]
        }
        this.onActionSuccess = this.onActionSuccess.bind(this);
    }

    onActionSuccess(){
        this.setState({
            success:["Se ha registrado una nueva historia del conflicto armado exitosamente."],
        })
    }

    render() {      
        const {success} = this.state;

        return (
            <Container>
                <GeneralMessage success messages={success} onDismiss={()=>this.setState({success:[]})}/>
                <FormStories action="register" onActionSuccess={this.onActionSuccess}/>
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

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterStories);