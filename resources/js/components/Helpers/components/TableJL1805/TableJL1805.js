import React from 'react';

import _ from 'lodash'

import { connect } from 'react-redux';
import { actInitTableJL1805 } from '../../../../redux/tableJL1805/actions';

import { Table, Segment, Dimmer, Loader } from 'semantic-ui-react'

import Body from './Body';
import Pagination from './Pagination';
import Helpers from './Helpers';
import Headers from './Headers';

import axios from 'axios';

const TableJL1805 = ({id_table, config, initTable}) => {
		if(typeof config == 'undefined'){
			initTable();
			return '';
		}else{
		    return (
				<Segment basic>

					<Dimmer active={config.load_table} inverted>
						<Loader>Cargando ...</Loader>
					</Dimmer>

					<Helpers {...config} id_table={id_table}/>

					<Segment basic style={ {padding:'0px'} }>
						<Table {...config.props}>
							<Headers {...config} id_table={id_table}/>

							<Table.Body>
								<Body {...config}/>
							</Table.Body>

							<Pagination {...config} id_table={id_table}/>
						</Table>
					</Segment>
				</Segment>
		    )
		}
}

const mapStateToProps = (state, props) => {
	return {
		config:state.tableJl1805.config_tables[props.id],
		id_table:props.id
	}
}

const mapDispatchToProps = (dispatch, props) => {
	return {
		initTable:() => {
			dispatch(actInitTableJL1805(props.id, props.config));
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TableJL1805);