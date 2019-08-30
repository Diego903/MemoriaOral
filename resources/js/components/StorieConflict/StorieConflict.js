import React, { PropTypes } from 'react';
import { Accordion, Segment, Header, Container, Divider, Card, Icon, Grid, Message, Button, Form,TextArea, Image} from 'semantic-ui-react';
import config_routes from '../../config/routes';
import {Btn, Valid,SearchServer} from '../Helpers/Helpers';
import GeneralMessage from '../Helpers/components/GeneralMessage';
import params from '../../config/params';
import { actList } from '../../redux/StorieConflict/actions';
import { connect } from 'react-redux';

const opcionesTipoBusqueda = [
  { key: 'departamentos', text: 'Departamentos', value: 'departamentos' },
  { key: 'municipios', text: 'Municipios', value: 'municipios' },
]

class StorieConflict extends React.Component {
	constructor(props) {
	  super(props);
	  this.state={	  	   
			buscar:"",
			municipio_id:"",
			departamento:3,
			tipoBusqueda:"",
			message:"",
			storiesDisplayed:[],
			currentStories:[],
			isLoading:false,
			info:[],
			activeIndex: null,

			formValidations:{
				buscar:false,
				tipoBusqueda:false

			}
        };

        this.handleSearchServerSelect = this.handleSearchServerSelect.bind(this);        
        this.handleSearchChange = this.handleSearchChange.bind(this); 
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.reloadList = this.reloadList.bind(this);
        this.getIcon = this.getIcon.bind(this);        
        
        this.props.loadList(this.state, true);
	}

    handleInputChange(e, {name, value}){

    	this.setState({
    		[name]:value
    	});
    	this.reloadList();
    }

	handleSearchServerSelect(e, {input, result}){
		this.setState({[input.name]:result.key});
		this.reloadList();
	}
	
	handleSearchChange(e, {input, result}){
		this.setState({[input.name]:null});
		this.reloadList();
	} 	

    handleSelectChange(e, {name, value}){;	
        this.setState({ [name]:  value});
        this.reloadList();
    }

    reloadList(){
    	setTimeout(() => {
    		this.props.loadList(this.state, true);
    	}, 10);
    } 


    handleClick = (e, titleProps) => {
	    const { index } = titleProps
	    const { activeIndex } = this.state
	    const newIndex = activeIndex === index ? -1 : index

	    this.setState({ activeIndex: newIndex })
	  }	   

	getIcon(name){
		let arr = name.split(".");
		let ext = arr[arr.length-1];
		if(ext==="doc" || ext==="docx"){
			return <Icon size="huge" name="file word" />
		}else if(ext === "xls" || ext === "xlsx"){
			return <Icon size="huge" name="file excel" className="green-text"/>
		}else if(ext==="gif" || ext==="png" || ext==="jpeg" || ext==="jpg" || ext==="tiff" || ext==="tif"){
			return <Icon size="huge" name="file image outline" />
		}else if(ext === "pptx" || ext === "pptm" || ext ==="ppt"){
			return <Icon size="huge" name="file powerpoint outline" className="red-text text-darken-1"/>
		}else if(ext === "pdf"){
			return <Icon size="huge" name="file pdf outline" className="red-text text-darken-1"/>

		}else{
			return <Icon size="huge" name="file" />
		}
	}

	render(){	
		const {municipio_id, departamento, buscar, load_search, search_value, tipoBusqueda, info, activeIndex} = this.state;

		let content = "";

		let items = _.map(this.props.storiesConflict, (el, i) => {
				let annexedRender = "";

				if(
					"annexes" in this.props 
					&& this.props.annexes.length
					&& el.id in this.props.annexes
					&& this.props.annexes[el.id].length
				){				
					annexedRender = _.map(this.props.annexes[el.id], (el_, i_) => {						

							return <a href={params.URL_API+"storie_conflict/get-annexed/"+el_.id_hc+"/"+el_.id} target="_blank" key={i_}>
											
										<Segment>
											{this.getIcon(el_.nombre_archivo)}
											{el_.nombre_archivo}
										</Segment>
									</a>
					});

					annexedRender = <Accordion>
						        <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
						          <Icon name='dropdown' />
						          Anexos
						        </Accordion.Title>
						        <Accordion.Content active={activeIndex === 0}>
						        	<Segment basic>
						         		{annexedRender}
						        	</Segment>
						        </Accordion.Content>
					        </Accordion>				
				}

				let opcionActualizar = "";

				if(this.props.userType == "Administrador"){
					opcionActualizar = <Card fluid>
						<Card.Content>
							<Card.Header content={el.titulo} />
							<Card.Meta content={el.ubicacion} />
							<Card.Meta content={el.texto} />
							{annexedRender}
						</Card.Content>
						<Card.Content extra>	                      	                     		               
							<Button onClick={() => this.props.history.push("/storie-conflict/update/"+el.id)} primary type="button" className="margin-left-10" floated="right">Actualizar</Button>		                	
						</Card.Content>
					</Card>

				}else if(this.props.userType == "Usuario"){
					opcionActualizar = <Card fluid>
						<Card.Content>
							<Card.Header content={el.titulo} />
							<Card.Meta content={el.ubicacion} />
							<Card.Meta content={el.texto} />
							{annexedRender}
						</Card.Content>
					</Card>

				}				

				return <Grid.Column key={i}>				
						{opcionActualizar}
					</Grid.Column>
		})

		let message = "";

		if(this.props.userType == "Administrador"){
			message = <Message
	    			info
				    icon='microphone'
				    header='¿Desea registrar una historia del conflicto armado?'
				    content={
				    	<Segment basic className="no-padding">
				    		Recuerde que para registrar una historia del conflicto armado en el sistema.
					    	Haga clic en el siguiente botón y tendrá disponible el registro de historias del conflicto armado
					    	<Button onClick={() => this.props.history.push(config_routes.storie_conflict_register.path)} positive type="button" className="margin-left-10">Registrar historias</Button>
					    	Las historias del conflicto armado registradas por usted quedarán públicas automáticamente.
				    	</Segment>
				    }
				  />

		}else if(this.props.userType == "Usuario"){
			message = <Message
	    			info
				    icon='microphone'
				    header='Historias del conflicto armado'
				    content={
				    	<Segment basic className="no-padding">
					    	Aqui podra vizualizar todas las historias del conflicto armado registradas en el sistema.

				    	</Segment>
				    }
				  />

		}		

	    return (
	    	<Container>
	    		{message}
				<GeneralMessage info messages={info} onDismiss={()=>this.setState({info:[]})}/>  

	    		<Grid columns={3} doubling stackable>

	    			<Grid.Column floated="right">
	    				<Segment basic style={{padding:'0px', marginTop:'-10px', marginBottom:'30px'}}>
	    					<Form.Input type='search' fluid icon='search' name="buscar" label="Buscar" placeholder="Busqueda por texto..." onChange={this.handleInputChange}/>
	    				</Segment>
	    			</Grid.Column>

	                <Grid.Column>	                         	           
     	            	<Form>
                			<SearchServer name="municipio_id" label="Municipio" predetermined={municipio_id} url={params.URL_API+"query/municipios"} handleResultSelect={this.handleSearchServerSelect} handleSearchChange={this.handleSearchChange} otherParams={[{name:"departamento", value:departamento}]}/>
                		</Form>                	               	
	                </Grid.Column>

        			<Grid.Column>
		        		<Segment basic className="no-padding margin-bottom-30" style={{marginTop:'-10px'}}>
		        			<Form.Select name="tipoBusqueda" fluid label="Tipo de busqueda" options={opcionesTipoBusqueda} placeholder="Seleccione" value={tipoBusqueda} onChange={this.handleSelectChange} />		        			
	        		 	</Segment>
		        	</Grid.Column>  
	    		</Grid>

	    		<Grid>
	    			<Grid.Column computer={6} tablet={8} mobile={16}>
		    			<Image src="http://mapamudo.net/wp-content/uploads/mapa-mudo-de-colombia-2.png"/>
		    		</Grid.Column>

		    		<Grid.Column computer={10} tablet={8} mobile={16}>
			    		<Grid columns={1} doubling stackable>
			    			{items}
			    		</Grid>						
		    		</Grid.Column>			    				    		
	    		</Grid>
	        </Container>
	    );
	}
}

const mapStateToProps = (state, props) => {
	return {
		userType:state.app.user?state.app.user.rol:false,
		storiesConflict:state.StorieConflict.storiesDisplayed,
		annexes:state.StorieConflict.annexes
	}
}

const mapDispatchToProps = (dispatch, props) => {
	return {
		loadList: (data, reload) => {
			dispatch(actList(data, reload));
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(StorieConflict);