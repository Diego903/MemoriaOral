import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { actRegisterUser } from '../../redux/RegisterUser/actions';

import { Grid, Form, Checkbox, Button, Icon, Segment, Container,Select,Message } from 'semantic-ui-react';
import GeneralMessage from '../Helpers/components/GeneralMessage';
import { Btn, Valid } from '../Helpers/Helpers';

const options = [
  { key: 'm', text: 'Masculino', value: 'Masculino' },
  { key: 'f', text: 'Femenino', value: 'Femenino' },
]

const options_nivel_estudios = [
  { key: 'ninguno', text: 'Ninguno', value: 'Ninguno'},
  { key: 'primaria', text: 'Básica primaria', value: 'Básica primaria'},
  { key: 'secundaria', text: 'Básica secundaria', value: 'Básica secundaria'},
  { key: 'tecnico', text: 'Técnico profesional', value: 'Técnico profesional'},
  { key: 'tecnologia', text: 'Tecnológico', value: 'Tecnológico'}, 
  { key: 'profesional', text: 'Profesional', value: 'Profesional'}, 
  { key: 'especializacion', text: 'Especialización', value: 'Especialización'}, 
  { key: 'maestria', text: 'Maestría', value: 'Maestría'},
  { key: 'doctorado', text: 'Doctorado', value: 'Doctorado'},           
]


class FormUser extends Component {

    constructor(props) {
        super(props);

        this.state={
        	numero_identificacion:"",
        	nombres:"",
        	apellidos:"",
        	email:"",
        	genero:"",
        	password:"",
        	password_confirmation:"",
        	telefono:"",
			nivel_estudio:"",
			fecha_nacimiento:"",
			direccion:"",
			municipio_id:"",
			loading:false,
			formValidations:{
	        	numero_identificacion:false,
	        	nombres:false,
	        	apellidos:false,
	        	email:false,
	        	//genero:false,
	        	password:false,
	        	password_confirmation:false,
	        	telefono:false,
				//nivel_estudio:false,
				fecha_nacimiento:false,
				direccion:false,
				municipio_id:false					
			},
			formErrors:{
				numero_identificacion:[],
	        	nombres:[],
	        	apellidos:[],
	        	email:[],
	        	genero:[],
	        	password:[],
	        	password_confirmation:[],
	        	telefono:[],
				nivel_estudio:[],
				fecha_nacimiento:[],
				direccion:[],
				municipio_id:[]	
			},
			loading:false,
			fomsIsValid:false
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleSubmitFormRegister = this.handleSubmitFormRegister.bind(this);
        this.onTrueValid = this.onTrueValid.bind(this);
        this.handleFocus = this.handleFocus.bind(this);        
        this.onFalseValid = this.onFalseValid.bind(this);        

    }

    handleInputChange(e, {name}){
        let value = (e.target.type == 'checkbox')?e.target.checked:e.target.value;
        
        this.setState({ [name]:  value});
    }

    handleSelectChange(e, {name, value}){
        this.setState({ [name]:  value});
    }

    handleFocus(e, {name}){
        this.setState((oldState, props) => {
            return {formErrors: Object.assign({}, oldState.formErrors, {[name]:[]})}
        })
    }

    /*=========================================================
    =            Estado de validaciòn de formulario            =
    =========================================================*/    

    setFormIsValid(){
        setTimeout(() => {
            let isValid = true;
            _.map(this.state.formValidations, (value, key) => {
                if(!value)isValid = false;
            });

            this.setState({
                formIsValid:isValid
            })    
        }, 10)
    }

    onTrueValid({name}){
        this.setState((oldState, props) => {
            return {
                formValidations:Object.assign({},oldState.formValidations,{[name]:true})
            }
        });

        this.setFormIsValid();
    }

    onFalseValid({name}){
        this.setState((oldState, props) => {
            return {
                formValidations:Object.assign({},oldState.formValidations,{[name]:false})
            }
        });

        this.setFormIsValid();
    }   

	/*=====  Fin de Estado de validaciòn de formulario  ======*/

	
	/*==============================================
	=            Manejadores de eventos            =
	==============================================*/	

    handleSubmitFormRegister(){
    	this.setState({loading:true});

    	if(this.props.action == "register"){
    		this.props.sendRegisterUser(this.state)
	    	.then((response) => {
	    		if(response.status == 200){                  			
					this.setState({
						numero_identificacion:"",
				    	nombres:'',
				    	apellidos:'',
				    	email:'',
				    	genero:'',
				    	password:'',
				    	password_confirmation:'',
				    	telefono:'',
						nivel_estudio:'',
						fecha_nacimiento:'',
						direccion:'',
						municipio_id:'',    				
						loading:false,
						errors:[],
						formIsValid:false
					})

					if("onActionSuccess" in this.props){
						this.props.onActionSuccess();
					}
	    		}else{

	                let errors = {};
	                _.map(response.data.errors, (el, i) => {
	                    errors[i] = el;
	                });
	                this.setState((oldState, props) => {
	                    return {
	                    	formErrors: Object.assign({}, oldState.formErrors, errors),
			    			loading:false,
			    			success:[]
	                    };
	                })  

		    		this.setState({
		    		})
		    	}
	    	});
    	}else if(this.props.action == "update"){
    		///actualizar
    	}    	
    }


    render() {
    	const {numero_identificacion, nombres, apellidos, email,genero,password,password_confirmation,telefono,nivel_estudio,fecha_nacimiento,direccion,municipio_id,terminos_condiciones,loading, formIsValid,formErrors,success} = this.state;
    	let limiteFechaNacimiento = new Date();
    	limiteFechaNacimiento.setFullYear(limiteFechaNacimiento.getFullYear() - 18);

    	const yyyy = limiteFechaNacimiento.getFullYear();
    	const mm = (limiteFechaNacimiento.getMonth() + 1) < 10?"0"+(limiteFechaNacimiento.getMonth() + 1):(limiteFechaNacimiento.getMonth() + 1);
    	const dd = limiteFechaNacimiento.getDate() < 10?"0"+limiteFechaNacimiento.getDate():limiteFechaNacimiento.getDate();

    	limiteFechaNacimiento = yyyy+"-"+mm+"-"+dd;
    	
        return (
        	<Form loading={loading} style={{marginTop: "40px"}}>
	        	<Grid stackable doubling columns={3}>	
	          		<Valid.Input 		                    
		                    type="text" 
		                    name="numero_identificacion" 
		                    id="numero_identificacion" 
		                    value={numero_identificacion} 
		                    label='Número de identificación' 
		                    onTrueValid={this.onTrueValid} 
		                    onFalseValid={this.onFalseValid} 
							onChange={this.handleInputChange}
		                    onFocus={this.handleFocus} 				                    			                    
		                    required
		                    numeric
		                    min_length={7}
		                    max_length={10}
		                    wrapperColumn
		                    errors={formErrors.numero_identificacion}
		                />

	          		<Valid.Input 
		                    type="text" 
		                    name="nombres" 
		                    id="nombres" 
		                    value={nombres} 
		                    label='Nombres'
		                    onTrueValid={this.onTrueValid} 
		                    onFalseValid={this.onFalseValid} 			                     
		                    onChange={this.handleInputChange} 
		                    onFocus={this.handleFocus}
		                    required
		                    min_length={3}
		                	max_length={60}			                
		                    wrapperColumn
		                    errors={formErrors.nombres}
		                    alphabeticalSpace
		                />   
	                
	          		<Valid.Input 
		                    type="text" 
		                    name="apellidos" 
		                    id="apellidos" 
		                    value={apellidos} 
		                    label='Apellidos' 
		                    onTrueValid={this.onTrueValid} 
		                    onFalseValid={this.onFalseValid} 			                    
		                    onChange={this.handleInputChange}
		                    onFocus={this.handleFocus} 
		                    required
		                    min_length={3}
		                	max_length={60}			                
		                    wrapperColumn
		                    errors={formErrors.apellidos}
		                />

	                <Valid.Input  
	                    type="Date" 
	                    name="fecha_nacimiento" 
	                    id="fecha_nacimiento" 
	                    value={fecha_nacimiento} 
	                    label='Fecha de nacimiento'
	                    onTrueValid={this.onTrueValid} 
	                    onFalseValid={this.onFalseValid}		                    
	                    onChange={this.handleInputChange} 
	                    onFocus={this.handleFocus}
	                    required
	                    wrapperColumn
	                    errors={formErrors.fecha_nacimiento}
	                    max={limiteFechaNacimiento}
	                /> 			                

		        	<Grid.Column required>
		        		<Segment basic style={{padding:'0px', marginTop:'-10px', marginBottom:'30px'}}>
		        			<Form.Select required name="genero" fluid label="Genero" options={options} placeholder="Seleccione" value={genero} onChange={this.handleSelectChange} errors={formErrors.genero}/>
	        		 	</Segment>
		        	</Grid.Column>	

	                  <Valid.Input	
	                    id="email"
	                    name="email"
	                    value={email}
	                    label='Correo electrónico'		                   
	                    type="text" 		                     		                     		                     		                     
	                    onTrueValid={this.onTrueValid} 
	                    onFalseValid={this.onFalseValid} 		                    
	                    onChange={this.handleInputChange} 
	                    onFocus={this.handleFocus}
	                    required
	                    email
	                    wrapperColumn
	                    max_length={100}
                        errors={formErrors.email}
	                />	

	                <Valid.Input 
	                    type="text" 
	                    name="telefono" 
	                    id="telefono" 
	                    value={telefono} 
	                    label='Número de celular'
	                    onTrueValid={this.onTrueValid} 
	                    onFalseValid={this.onFalseValid} 			                	                    
	                    onChange={this.handleInputChange}
	                    onFocus={this.handleFocus}		                     
	                    numeric
		                min_length={10}
		                max_length={15}	 
	                    wrapperColumn
	                    errors={formErrors.telefono}
	                /> 	
	                
		                
        			<Grid.Column>
		        		<Segment basic style={{padding:'0px', marginTop:'-10px', marginBottom:'30px'}}>
		        			<Form.Select required name="nivel_estudio" fluid label="Nivel de estudios" options={options_nivel_estudios} placeholder="Seleccione" value={nivel_estudio} onChange={this.handleSelectChange} errors={formErrors.nivel_estudio}/>
	        		 	</Segment>
		        	</Grid.Column>

	                <Valid.Input 
	                    type="text" 
	                    name="municipio_id" 
	                    id="municipio_id" 
	                    value={municipio_id} 
	                    label='Municipio' 
	                    onTrueValid={this.onTrueValid} 
	                    onFalseValid={this.onFalseValid}		                    
	                    onChange={this.handleInputChange}
	                    onFocus={this.handleFocus} 
	                    required
	                    wrapperColumn
	                />	

	                <Valid.Input  
	                    type="text" 
	                    name="direccion" 
	                    id="direccion" 
	                    value={direccion} 
	                    label='Dirección' 
	                    onTrueValid={this.onTrueValid} 
	                    onFalseValid={this.onFalseValid}		                    
	                    onChange={this.handleInputChange}
	                    onFocus={this.handleFocus} 
	                    required
	                    min_length={3} 
	                    max_length={60}  
	                    errors={formErrors.direccion}		                    
	                    wrapperColumn
	                /> 			                	                		                	                                

	                <Valid.Input	      		                    
	                    id="password" 
	                    name="password" 
	                    value={password} 
	                    label="Contraseña" 
	                    type="password" 
	                    onChange={this.handleInputChange} 
	                    onTrueValid={this.onTrueValid} 
	                    onFalseValid={this.onFalseValid}
	                    onFocus={this.handleFocus}
	                    required
	                    min_length={8} 
	                    max_length={60}  
	                    errors={formErrors.password}
	                    wrapperColumn
	                />

	                <Valid.Input	      		                    
	                    id="password_confirmation" 
	                    name="password_confirmation" 
	                    value={password_confirmation} 
	                    label="Confirme su contraseña" 
	                    type="password" 
	                    onChange={this.handleInputChange} 
	                    onTrueValid={this.onTrueValid} 
	                    onFalseValid={this.onFalseValid}
	                    onFocus={this.handleFocus}
	                    required
	                    min_length={8} 
	                    max_length={60}  
	                    errors={formErrors.password_confirmation}
	                    wrapperColumn
	                />

	                <Grid.Column width={16} textAlign="center">			               
					   
						  <Form.Checkbox inline label='Estoy de acuerdo con los Términos y Condiciones' required />
							
		            </Grid.Column>

					<Grid.Column width={16} textAlign="center">	
						<Btn.Cancel onClick={this.close} href="{{url()->previous()}}"/>
						<Btn.Save disabled={(!formIsValid || loading)} onClick={this.handleSubmitFormRegister}/>		                   
		            </Grid.Column>
	            </Grid>  	            
            </Form>
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
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(FormUser);
