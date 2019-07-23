import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { actRegisterUser, actUpdateUser } from '../../redux/RegisterUser/actions';
import axios from 'axios';
import params from '../../config/params';

import { Grid, Form, Checkbox, Button, Icon, Segment, Container,Select,Message } from 'semantic-ui-react';
import GeneralMessage from '../Helpers/components/GeneralMessage';
import { Btn, Valid, SearchServer } from '../Helpers/Helpers';

const options = [
  { key: 'm', text: 'Masculino', value: 'Masculino' },
  { key: 'f', text: 'Femenino', value: 'Femenino' },
]

const options_nivel_estudios = [
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
        	id:"userId" in this.props?this.props.userId:false,
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
			terminos_condiciones:("userId" in this.props)?true:false,
			loading:false,
			formValidations:{
	        	numero_identificacion:("userId" in this.props)?true:false,
	        	nombres:("userId" in this.props)?true:false,
	        	apellidos:("userId" in this.props)?true:false,
	        	email:("userId" in this.props)?true:false,
	        	genero:("userId" in this.props)?true:false,
	        	password:("userId" in this.props)?true:false,
	        	password_confirmation:("userId" in this.props)?true:false,
	        	telefono:true,
				nivel_estudio:("userId" in this.props)?true:false,
				fecha_nacimiento:("userId" in this.props)?true:false,
				direccion:("userId" in this.props)?true:false,
				municipio_id:("userId" in this.props)?true:false,					
				terminos_condiciones:("userId" in this.props)?true:false					
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
			formIsValid:false
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleSubmitFormRegister = this.handleSubmitFormRegister.bind(this);
        this.onTrueValid = this.onTrueValid.bind(this);
        this.handleFocus = this.handleFocus.bind(this);        
        this.onFalseValid = this.onFalseValid.bind(this);
        this.setFormIsValid = this.setFormIsValid.bind(this);        
        this.handleSearchServerSelect = this.handleSearchServerSelect.bind(this);        
        this.handleSearchChange = this.handleSearchChange.bind(this);        

    }

    componentDidMount() {
    	//indica que es una actualización
        if("userId" in this.props){
        	this.setState({
        		loading:true
        	});

        	axios.post(params.URL_API+"user/show/"+this.props.userId)
        	.then(
        		(response) => {        			
        			this.setState({
		        		formIsValid:true,
		        		loading:false,
		        		numero_identificacion:response.data.numero_identificacion?response.data.numero_identificacion:"",
		        		nombres:response.data.nombres?response.data.nombres:"",
		        		apellidos:response.data.apellidos?response.data.apellidos:"",
		        		fecha_nacimiento:response.data.fecha_nacimiento?response.data.fecha_nacimiento:"",
		        		genero:response.data.genero?response.data.genero:"",
		        		email:response.data.email?response.data.email:"",
		        		telefono:response.data.telefono?response.data.telefono:"",
		        		nivel_estudio:response.data.nivel_estudio?response.data.nivel_estudio:"",
		        		municipio_id:response.data.municipio_id?response.data.municipio_id:"",
		        		direccion:response.data.direccion?response.data.direccion:""
		        	});
        		}, 
        		(error) => {        			
        			console.log(error);
        			this.setState({
		        		loading:false
		        	});
        		}
    		)
        }
    }

    handleInputChange(e, props_){
        let value = (props_.type == 'checkbox')?(props_.checked?true:false):props_.value;
        this.setState({ [props_.name]:  value});

        //acepta terminos y condiciones
        if(props_.type == 'checkbox'){
        	if(value)
        		this.onTrueValid({name:props_.name});
    		else
    			this.onFalseValid({name:props_.name});
        }
    }

    handleSelectChange(e, {name, value}){
        this.setState({ [name]:  value});
        this.onTrueValid({name});
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

	handleSearchServerSelect(e, {input, result}){
		this.setState({[input.name]:result.key})
		this.onTrueValid(input);
	}
	

	handleSearchChange(e, {input, result}){
		this.setState({[input.name]:null})
		this.onFalseValid(input);
	}
	
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
    		this.props.sendUpdateUser(this.state, this.props.userId)
	    	.then((response) => {
	    		if(response.status == 200){                  			
					this.setState({			
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

    	let fieldPassword = <Valid.Input	      		                    
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
	                />;

	    let fieldpassword_confirmation = <Valid.Input	      		                    
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
	                />;
	    let fielterminos_condiciones = <Grid.Column width={16} textAlign="center">			               					   
						  					<Form.Checkbox name="terminos_condiciones" inline label='Estoy de acuerdo con los Términos y Condiciones' required onChange={this.handleInputChange}/>							
		            					</Grid.Column>;


	    if("userId" in this.props){
	    	fieldPassword = "";
	    	fieldpassword_confirmation="";
	    	fielterminos_condiciones="";
	    }
    	
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
		                    min_length={6}
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
		                    alphabeticalSpace
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
	                    min_length={7}
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

	                <Grid.Column>
	                	<Segment basic style={{padding:'0px', marginTop:'-10px', marginBottom:'30px'}}>
	                		<SearchServer required name="municipio_id" label="Municipio" predetermined={municipio_id} url={params.URL_API+"query/municipios"} handleResultSelect={this.handleSearchServerSelect} handleSearchChange={this.handleSearchChange}/>
	                	</Segment>	                	
	                </Grid.Column>

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

	                {fieldPassword}
	                {fieldpassword_confirmation}
	                {fielterminos_condiciones}
	             

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
		},
		sendUpdateUser:(data, userId)=>{
			return dispatch(actUpdateUser(data, userId));
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(FormUser);
