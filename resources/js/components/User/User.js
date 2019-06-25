import React, { Component, PropTypes } from 'react';
import { TableJL1805 } from '../Helpers/Helpers';
import params from '../../config/params';

class User extends Component {

    constructor(props) {
        super(props);
    }

    render() {
    	let headers = [
            {name:'nombres',label:'Nombres',textAlign:'center',textAlignContent:'center'},
            {name:'email',label:'Correo electrónico'},
            {name:'created_at',label:'Fecha de registro'},
            {name:'options',label:'Opciones',no_sortable:true, no_server:true, textAlignContent:'center'}
        ];

    	const config_table = {
                    rows_current:10,
                    rows:[10,20,50,100],
                    headers:headers,
                    data_source:'server',
                    data_source_url:params.URL_API+'user/list',
                    data:[],
                    //assignValueCell:customValueCell,
                    //assignRow:assignRow,
                    //assignCell:assignCell,
                    props:{
                        sortable:true,
                        selectable:true,
                        celled:true,
                        fixed:true,
                    }
                }
        return (
            <div>
	            <TableJL1805 
	                id='table_1'
	                config={config_table}
	            />
            </div>
        );
    }
}

export default User;
