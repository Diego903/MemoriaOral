import React from 'react';
import { connect } from 'react-redux';

import { Grid, Icon, Header, Divider, Button, Image } from 'semantic-ui-react';

const E404 = ({history}) => {
    return (
        <Image src="/images/404.jpg"/>
    );
}

const mapStateToProps = (state, props) => {
	return {
        history:props.history
	};
}

const mapDispatchToProps = (dispatch, props) => {
	return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(E404);
