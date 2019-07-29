import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { actRegisterStories, actUpdateStories } from '../../redux/Stories/actions';
import axios from 'axios';
import params from '../../config/params';

import { Grid, Form, Button,TextArea, Segment, Container,Select,Message, Input, Header } from 'semantic-ui-react';
import GeneralMessage from '../Helpers/components/GeneralMessage';
import { Btn, Valid, SearchServer} from '../Helpers/Helpers';

class FormTestimony extends Component {
    
    constructor(props) {
        super(props);

        this.state={
        	titulo:"",
        	descripcionCorta:"",
        	descripcionDetallada:"",
        	fechaEvento:"",
			municipio_id:null,
        	descripcionLugar:"",
        	ubicacion:{latitud:0,longitud:0},
        	tipoTestimonio:"",
        	plantilla:1,
			loading:false,

			annexes:[],//almacena la información de los anexos existentes
			annexesValues:{},//almacena los valores de los anexos existentes
			
			formValidations:{
	        	titulo:false,
	        	texto:false,
	        	municipio_id:false					
			},
			formErrors:{
				titulo:[],
				texto:[],
				municipio_id:[]
			},
			loading:false,
			formIsValid:false
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleSubmitFormRegisterStories = this.handleSubmitFormRegisterStories.bind(this);
        this.onTrueValid = this.onTrueValid.bind(this);
        this.handleFocus = this.handleFocus.bind(this);        
        this.onFalseValid = this.onFalseValid.bind(this);
        this.setFormIsValid = this.setFormIsValid.bind(this);        
        this.handleSearchServerSelect = this.handleSearchServerSelect.bind(this);        
        this.handleSearchChange = this.handleSearchChange.bind(this);        
        this.addAnnexed = this.addAnnexed.bind(this);        
        this.removeAnnexed = this.removeAnnexed.bind(this);        
        this.handleChangeInputFile = this.handleChangeInputFile.bind(this);        

    }	

    componentWillMount() {
        this.addAnnexed();
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

    handleSubmitFormRegisterStories(){
					})
    	/*this.setState({loading:true});

    	if(this.props.action == "register"){
    		this.props.sendRegisterStories(this.state)
	    	.then((response) => {
	    		if(response.status == 200){                  			
					this.setState({
						titulo:'',
						texto:'',
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
    	}else if(this.props.action == "updateStories"){
    		
    		
    	}
    	*/
    }

    /**
     * Agrega un input file a la lista de anexos
     */
    addAnnexed(e){
    	if(e)
    		e.preventDefault();

    	if(this.state.annexes.length < 9){
    	let currentAnnexes = this.state.annexes;
    	let currentAnnexesValues = this.state.annexesValues;

    	let key = 0;//valor inicial

    	//si existen más files, el key es el valor de key, en el ultimo file, más uno
    	if(currentAnnexes.length)
    		key = parseInt(currentAnnexes[(currentAnnexes.length - 1)].key) + 1

    	//se agrega el valor del nuevo file
    	currentAnnexesValues = Object.assign({},currentAnnexesValues,{["value_"+key]:""});
    	currentAnnexes.push({
    		key,
    		name:key
    	});

		setTimeout(() => {
			this.setState({
				annexes:currentAnnexes,
				annexesValues:currentAnnexesValues
			})
		}, 10);
	  }
    }

    removeAnnexed(e, key){
    	if(e)
    		e.preventDefault();

    	if(this.state.annexes.length > 1){
	    	let currentAnnexes = this.state.annexes;
	    	//key para eliminar de la lista de valores
	    	let keyRemoveAnnexedValue = "value_"+currentAnnexes[key].key;

	    	currentAnnexes.splice(key,1);

	    	let currentAnnexesValues = this.state.annexesValues;

	    	delete currentAnnexesValues[keyRemoveAnnexedValue];

			setTimeout(() => {
				this.setState({
					annexes:currentAnnexes,
					annexesValues:currentAnnexesValues
				})
			}, 10);
		}
    }

    handleChangeInputFile(e, data){
    	let currentAnnexesValues = this.state.annexesValues;

    	currentAnnexesValues = Object.assign({},currentAnnexesValues,{["value_"+data.name]:e.target.files[0]});
    	
    	this.setState({
			annexesValues:currentAnnexesValues
		})
    }

    render() {
    	const {titulo,texto,municipio_id,loading, formIsValid,formErrors,success} = this.state;
        return (
        	<Form loading={loading} style={{marginTop: "40px"}}>
	        	<Grid stackable doubling columns={1}>	
	          		<Valid.Input 		                    
		                    type="text" 
		                    name="titulo" 
		                    id="titulo" 
		                    value={titulo} 
		                    label='Titulo' 
		                    onTrueValid={this.onTrueValid} 
		                    onFalseValid={this.onFalseValid} 
							onChange={this.handleInputChange}
		                    onFocus={this.handleFocus} 				                    			                    
		                    required
		                    alphabeticalSpace
		                    min_length={6}
		                    max_length={250}
		                    wrapperColumn
		                    errors={formErrors.titulo}
		                />  

	                <Grid.Column>
	                	<Segment basic style={{padding:'0px', marginTop:'-10px', marginBottom:'30px'}}>
	                		<SearchServer required name="municipio_id" label="Municipio" predetermined={municipio_id} url={params.URL_API+"query/municipios"} handleResultSelect={this.handleSearchServerSelect} handleSearchChange={this.handleSearchChange}/>
	                	</Segment>	                	
	                </Grid.Column>		                
	                
	                <Grid.Column>	                		          		  
						<Form.Field id='texto' name='texto' value={texto} control={TextArea} label='Texto' placeholder='Texto' required  min_length={6}
		                	 max_length={2000} errors={formErrors.texto} onChange={this.handleInputChange} />							  	              	                	
	                </Grid.Column>

	                <Grid.Column>
	                	<Segment>
	                		<Header as="h3">
	                			Anexos
	                		</Header>
		                	<Grid stackable doubling columns={3}>
		                		{
		                			_.map(this.state.annexes, (el, i) => {
		                				return <Grid.Column key={el.key}>
						            		<Input type="file">
						            			<Input type="file" name={el.key} onChange={this.handleChangeInputFile}/>
						            			<Button icon="close" onClick={(e) => {this.removeAnnexed(e, i)}}/>
						            		</Input>
						        		</Grid.Column>
		                			})
		                		}
		                		<Grid.Column width={16}>
		            				<Btn.Add onClick={this.addAnnexed}/>
		                		</Grid.Column>            		
		                	</Grid>
		            		
	                	</Segment>
	                </Grid.Column>	    	                		                	                                	             

					<Grid.Column width={16} textAlign="center">	
						<Btn.Cancel onClick={this.close} href="{{url()->previous()}}"/>
						<Btn.Save type="button" disabled={(!formIsValid && loading)} onClick={this.handleSubmitFormRegisterStories}/>		                   
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
		sendRegisterStories:(data) => {
			return dispatch(actRegisterStories(data));
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(FormTestimony);
