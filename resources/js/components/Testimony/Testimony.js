import React, { PropTypes } from 'react';
import { Segment, Header } from 'semantic-ui-react';
import { Btn } from '../Helpers/Helpers';

const Testimony = ({ }) => {
    return (
    	<Segment>
        <Header>Vista principal de testimonio</Header>
        <Btn.Save />
        <Btn.Close />
        <Btn.Update />
        <Btn.Delete />
        <Btn.Add />
        <Btn.Cancel />
        <Btn.Accept />
        <Btn.No />
        </Segment>
    );
};

export default Testimony;
