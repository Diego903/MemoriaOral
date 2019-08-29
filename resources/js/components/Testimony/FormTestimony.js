import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { actRegisterStories, actUpdateStories } from '../../redux/Stories/actions';
import axios from 'axios';
import params from '../../config/params';

import { Step, Grid, Form, Confirm, Button,TextArea, Segment, Container,Select,Message, Input, Header, Menu, Tab, Label, Icon } from 'semantic-ui-react';
import GeneralMessage from '../Helpers/components/GeneralMessage';
import { Btn, Valid, SearchServer, ImageCheck, RecordAudio } from '../Helpers/Helpers';

import Testimony from './DataForm/Testimony';
import User from '../User/DataForm/User';

import Template1 from './Templates/Template1';
import Template2 from './Templates/Template2';
import Template3 from './Templates/Template3';
import Template4 from './Templates/Template4';

import {animateScroll} from 'react-scroll';

class FormTestimony extends Component {
    
    constructor(props) {
        super(props);

        this.state={
			loading:false,
			confirmModalState:false,
			
			dataTestimony:null,
			stateFormTestimony:false,
			formTestimonyErrors:{				
	        	titulo:[],
	        	descripcionCorta:[],
	        	fechaEvento:[],
				municipioTestimonio:[],
	        	descripcionLugar:[],
	        	ubicacion:[],
	        	tipoTestimonio:[]
			},
			
			dataUser:props.userType == "Administrador"?{}:props.user,
			stateFormUser:props.userType == "Administrador"?false:true,
			formUserErrors:[],
			
			activeStep:props.userType == "Administrador"?"user":"testimony",
			template:1,
			resetForms:false,
			errors:[]
        }

        this.setActiveStep = this.setActiveStep.bind(this);
        this.send = this.send.bind(this);
    }	

    setActiveStep(e, {step}){
    	this.setState({
    		activeStep:step
    	});
		animateScroll.scrollToTop();
    }

    send(){
    	this.setState({
    		loading:true,
    		confirmModalState:false
    	})

    	const formData = new FormData();

    	//datos del testimonio
    	formData.append("tipo", this.state.dataTestimony.tipoTestimonio);
		formData.append("titulo", this.state.dataTestimony.titulo);
		formData.append("descripcion_corta", this.state.dataTestimony.descripcionCorta);
		formData.append("fecha_evento", this.state.dataTestimony.fechaEvento);
		formData.append("descripcion_lugar", this.state.dataTestimony.descripcionLugar);
		formData.append("municipio", this.state.dataTestimony.municipioTestimonio);
		formData.append("descripcion_detallada", this.state.dataTestimony.descripcionDetallada);
		
		if(this.state.dataTestimony.annexes && this.state.dataTestimony.annexes.length){
			formData.append("anexos", JSON.stringify(this.state.dataTestimony.annexes));
			
			_.map(this.state.dataTestimony.annexes, (el, i) => {
	    		formData.append("anexos_datos_"+el.name, JSON.stringify(this.state.dataTestimony.annexesData["data_"+el.name]));
	    		formData.append("anexos_valores_"+el.name, this.state.dataTestimony.annexesValues["value_"+el.name]);
	    	});
		}

		if(this.state.dataTestimony.video)
			formData.append("video", this.state.dataTestimony.video);

		if(this.state.dataTestimony.audio || this.state.dataTestimony.audioRecord){
			if(this.state.dataTestimony.audio)
				formData.append("audio", this.state.dataTestimony.audio);
			else
				formData.append("audio", this.state.dataTestimony.audioRecord, this.state.dataTestimony.titulo+".webm");
		}

		formData.append("plantilla", this.state.dataTestimony.plantilla);

		//Datos del usuario
		if(this.props.userType == "Administrador"){
			formData.append("numero_identificacion", this.state.dataUser.numero_identificacion);
			formData.append("nombres", this.state.dataUser.nombres);
			formData.append("apellidos", this.state.dataUser.apellidos);
			formData.append("fecha_nacimiento", this.state.dataUser.fecha_nacimiento);
			formData.append("genero", this.state.dataUser.genero);
			formData.append("email", this.state.dataUser.email);
			formData.append("telefono", this.state.dataUser.telefono);
			formData.append("nivel_estudio", this.state.dataUser.nivel_estudio);
			formData.append("municipio_id", this.state.dataUser.municipio_id);
			formData.append("direccion", this.state.dataUser.direccion);
			formData.append("certificado_victima", this.state.dataUser.certificadoVictima);
			formData.append("consentimiento_informado", this.state.dataUser.consentimientoInformado);
			formData.append("victima_minas", this.state.dataUser.victima_minas);
		}

        axios.post(params.URL_API+'testimony/register',formData,
        {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        )
        .then((response) => {

	    	animateScroll.scrollToTop();
            //console.log(response);
            //se reinician los datos del estado
            this.setState({
	    		loading:false,
	    		resetForms:true,
	    		dataTestimony:null,
				stateFormTestimony:false,
				dataUser:this.props.userType == "Administrador"?{}:this.props.user,
				stateFormUser:this.props.userType == "Administrador"?false:true,
				activeStep:this.props.userType == "Administrador"?"user":"testimony",
				template:1,
				resetForms:true
	    	})

	    	setTimeout(() => {
	    		this.setState({
		    		resetForms:false
		    	})
	    	}, 10);

	    	if("onRegister" in this.props){
	    		return this.props.onRegister();
	    	}
        
        })
        .catch((error) => {
        	this.setState({
	    		loading:false,
	    		activeStep:this.props.userType == "Administrador"?"user":"testimony",
	    		errors:["El registro del testimonio no se pudo completar, revise y corrija cada uno de los errores que pueden aparecer en cada pestaña."]
	    	});


	    	const errorsUser = {
		    	numero_identificacion: error.response.data.errors.numero_identificacion, 
				nombres: error.response.data.errors.nombres, 
				apellidos: error.response.data.errors.apellidos, 
				fecha_nacimiento: error.response.data.errors.fecha_nacimiento, 
				genero: error.response.data.errors.genero, 
				email: error.response.data.errors.email, 
				telefono: error.response.data.errors.telefono, 
				nivel_estudio: error.response.data.errors.nivel_estudio, 
				municipio_id: error.response.data.errors.municipio_id, 
				direccion: error.response.data.errors.direccion, 
				certificadoVictima: error.response.data.errors.certificado_victima, 
				consentimientoInformado: error.response.data.errors.consentimiento_informado, 
				victima_minas: error.response.data.errors.victima_minas
			}

			let errorsAnnexes = [];

			if("audio" in error.response.data.errors){
				errorsAnnexes.push(error.response.data.errors.audio);
			}

			if("video" in error.response.data.errors){
				errorsAnnexes.push(error.response.data.errors.video);
			}

			if("anexos" in error.response.data.errors){
				errorsAnnexes.push(error.response.data.errors.anexos);
			}

			if("descripcion_detallada" in error.response.data.errors){
				errorsAnnexes.push(error.response.data.errors.descripcion_detallada);
			}

	    	const errorsTestimony = {
	    		titulo:error.response.data.errors.titulo,
	        	descripcionCorta:error.response.data.errors.descripcion_corta,
	        	fechaEvento:error.response.data.errors.fecha_evento,
				municipioTestimonio:error.response.data.errors.municipio,
	        	descripcionLugar:error.response.data.errors.descripcion_lugar,
	        	tipoTestimonio:error.response.data.errors.tipo,
	        	annexes:errorsAnnexes
			}

            this.setState({
            	formUserErrors:errorsUser,
            	formTestimonyErrors:errorsTestimony
            })

            animateScroll.scrollToTop();
        });
    }

    render() {
    	//console.log("FormTestimony", this.state);
    	const { loading, dataTestimony, stateFormTestimony, dataUser, stateFormUser, activeStep, template, resetForms, formUserErrors, formTestimonyErrors, errors } = this.state;

    	let templateRender = "";
    	//console.log(dataTestimony);
    	if(dataTestimony && dataUser && stateFormTestimony && stateFormUser){
	    	switch(template.toString()){
				case "1": templateRender = <Template1 testimony={dataTestimony} user={dataUser}/>
					break;
				case "2": templateRender = <Template2 testimony={dataTestimony} user={dataUser}/>
					break;
				case "3": templateRender = <Template3 testimony={dataTestimony} user={dataUser}/>
					break;
				case "4": templateRender = <Template4 testimony={dataTestimony} user={dataUser}/>
					break;
			}
		}

		let steps = [];
		let stepNumber = 1;

		if(this.props.userType == "Administrador"){
			steps.push(<Step key="1" completed={stateFormUser} active={(activeStep == "user")} link step="user" onClick={this.setActiveStep}>
						<Icon name='user circle' />
						<Step.Content>
							<Step.Title>Paso #{stepNumber}</Step.Title>
							<Step.Description>Datos del usuario</Step.Description>
						</Step.Content>
					</Step>);

			stepNumber++;
		}

		steps.push(<Step key="2" completed={stateFormTestimony} active={(activeStep == "testimony")} disabled={!stateFormUser} link step="testimony" onClick={this.setActiveStep}>
						<Icon name='book' />
						<Step.Content>
							<Step.Title>Paso #{stepNumber}</Step.Title>
							<Step.Description>Datos del testimonio</Step.Description>
						</Step.Content>
					</Step>)

		stepNumber++;

		steps.push(<Step key="3" active={(activeStep == "save")} disabled={!(stateFormTestimony && stateFormUser)} link step="save" onClick={this.setActiveStep}>
						<Icon name='save' />
						<Step.Content>
							<Step.Title>Paso #{stepNumber}</Step.Title>
							<Step.Description>Vista previa y guardar</Step.Description>
						</Step.Content>
					</Step>)

        return (
        	<Segment basic className="no-padding" loading={loading}>
        		<GeneralMessage error messages={errors} onDismiss={()=>this.setState({errors:[]})}/>
        		<Step.Group stackable='tablet' fluid>
					{steps}
				</Step.Group>

	        	<Form className="margin-top-20 no-padding">

        			<Segment className={activeStep != "user"?"d-none":""}>
		        		<User 
		        			noRenderPassword
		        			noRenderPasswordConfirmation
		        			noRenderTyC
		        			renderConsentimientoInformado
		    				onUpdate={(dataUser) => {
		        					this.setState({
		        						dataUser,
		        						formUserErrors:dataUser.formErrors
		        					});
		        				}
		        			}
		    				onFormStateChange={(state) => {
		    						this.setState((oldState) => {
		    							return {
		    								stateFormUser:state,
		    								//stateFormTestimony:!state?false:oldState.stateFormTestimony
		    							}
		    						})
		        				}
		        			}
		        			resetForm={resetForms}
		        			formErrors={formUserErrors}
						/>
						<Segment basic textAlign="right">
        					<Btn.Next type="button" step="testimony" disabled={(!stateFormUser)} onClick={this.setActiveStep} />
        				</Segment>
    				</Segment>

        			<Segment className={activeStep != "testimony"?"d-none":""}>
	        			<Testimony 
	        				onUpdate={(dataTestimony) => {
		        					this.setState({
		        						dataTestimony:dataTestimony,
		        						template:dataTestimony.plantilla,
		        						formTestimonyErrors:dataTestimony.formErrors,
		        					});
		        				}
		        			}
	        				onFormStateChange={(state) => {
	        						this.setState({stateFormTestimony:state})
		        				}
		        			}
		        			resetForm={resetForms}
		        			formErrors={formTestimonyErrors}
        				/>

        				<Segment basic textAlign="right">
        					{
        						this.props.userType == "Administrador"?
        						<Btn.Previous type="button" step="user" onClick={this.setActiveStep}/>
        						:""
        					}
        					<Btn.Next type="button" step="save" disabled={(!stateFormTestimony)} onClick={this.setActiveStep} />
        				</Segment>
    				</Segment>

        			<Segment className={activeStep != "save"?"d-none":""}>
        				{templateRender}
        				<Segment basic textAlign="right">
        					<Btn.Previous type="button" step="testimony" onClick={this.setActiveStep}/>
        					<Btn.Save type="button" onClick={() => this.setState({confirmModalState:true})} />
        					<Confirm
						          header='Confirmación'
						          content="¿Está seguro de guardar el testimonio diligenciado?"
						          open={this.state.confirmModalState}
						          onCancel={() => this.setState({confirmModalState:false})}
						          onConfirm={this.send}
						          size='tiny'
						          cancelButton="No"
						          confirmButton="Si"
					        />
        				</Segment>
    				</Segment>
	            </Form>
            </Segment>
        );
    }
}

const mapStateToProps = (state) => {
	return {
		userType:state.app.user.rol,
		user:state.app.user
	}
}

const mapDispatchToProps = (dispatch) => {
	return {

	}
}

export default connect(mapStateToProps, mapDispatchToProps)(FormTestimony);
