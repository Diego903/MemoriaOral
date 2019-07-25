import React, { Component, PropTypes } from 'react';

import { Container, Button, Segment, Confirm, Dimmer, Header, Icon, Loader } from 'semantic-ui-react';
import { Btn } from '../Helpers/Helpers';
import axios from 'axios';
import { connect } from 'react-redux';
import { actAddNotification } from '../../redux/notifications/actions';
import { actUpdateTableJL1805 } from '../../redux/tableJL1805/actions';

import { TableJL1805 } from '../Helpers/Helpers';
import params from '../../config/params';

class User extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showModalTogglelock:false,
            userToggleLock:null,
            showDimmer:false,
            messageModalToggleLock:""
        }

        this.handleToggleLock = this.handleToggleLock.bind(this);
        this.handleConfirmToggleLock = this.handleConfirmToggleLock.bind(this);
        this.handleClickBtnUpdate = this.handleClickBtnUpdate.bind(this);
    }

    handleClickBtnUpdate(e, {user, action}){
        this.props.history.push("user/update/"+user);
        
            
    }

    handleToggleLock(e,{user, action}){
        this.setState({
            showModalTogglelock:true,
            userToggleLock:user,
            messageModalToggleLock:<Segment basic><p>¿Está seguro de <strong>{action}</strong> el usuario seleccionado?</p></Segment>
        })
    }

    handleConfirmToggleLock(){
        this.setState({
            showModalTogglelock:false,
            showDimmer:true
        });

        axios.post(params.URL_API+"user/toggle-lock", {
            user:this.state.userToggleLock
        })
        .then(
            (response) => {
                this.setState({
                    showDimmer:false
                });

                this.props.messageUserState();
                this.props.updateTable();
            },
            (error) => {
                console.log(error);
            }
        );
    }

    render() {
        const {showModalTogglelock, showDimmer, messageModalToggleLock} = this.state;
    	let headers = [
            {name:'numero_identificacion',label:'Número de identificación'/*,textAlign:'center',textAlignContent:'center'*/},
            {name:'nombre',label:'Nombre', name_column:['nombres','apellidos']},
            {name:'genero',label:'Genero'},
            {name:'nivel_estudio',label:'Nivel de estudio'},
            {name:'municipio',label:'Municipio', name_column:['municipios.nombre','departamentos.nombre']},
            {name:'email',label:'Correo electrónico'},
            {name:'telefono',label:'Teléfono'},
            {name:'opciones',label:'Opciones',no_sortable:true, no_server:true, textAlignContent:'center', textAlign:'center'}
        ];

    	const config_table = {
                    rows_current:10,
                    rows:[10,20,50,100],
                    headers:headers,
                    data_source:'server',
                    data_source_url:params.URL_API+'user/list',
                    data:[],
                    assignValueCell:(header, row, value) => {
                    	if(header.name == 'opciones'){
                    		const btnUpdate = <Btn.UpdateOnlyIcon size="mini" user={row.id} onClick={this.handleClickBtnUpdate}/>
                    		let btnToggleLock = <Btn.LockOnlyIcon size="mini" action="bloquear" user={row.id} onClick={this.handleToggleLock}/>
                    		if(row.estado == "Inactivo"){
                    			btnToggleLock = <Btn.UnlockOnlyIcon size="mini" action="desbloquear" user={row.id} onClick={this.handleToggleLock}/>
                    		}

                    		return <Segment basic className="no-padding">
                    			{btnUpdate}
                    			{btnToggleLock}
                    		</Segment>
                    	}
                    	return value;
                    },
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
            <Container>
	            <TableJL1805 
	                id='table_1'
	                config={config_table}
	            />
                <Confirm 
                    open={showModalTogglelock}
                    onCancel={() => {this.setState({showModalTogglelock:false})}} 
                    onConfirm={this.handleConfirmToggleLock} 
                    cancelButton="No"
                    confirmButton="Si"
                    content={messageModalToggleLock}
                    size="tiny"
                    />

                <Dimmer active={showDimmer} page>
                        <Loader size="large">
                            Cambiando estado del usuario ...
                        </Loader>
                </Dimmer>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {

    };
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        messageUserState:() => {
            dispatch(actAddNotification({message:"El cambio de estado del usuario se realizó con éxito", closeIn:6, showButtonClose:true}));
        },
        updateTable:() => {
            dispatch(actUpdateTableJL1805("table_1"));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(User);
