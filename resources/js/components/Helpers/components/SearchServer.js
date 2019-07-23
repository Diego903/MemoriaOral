import React, { Component, PropTypes } from 'react';

import axios from 'axios';

import { Search, Button, Segment } from 'semantic-ui-react';

class SearchServer extends Component {
    constructor(props) {
        super(props);

        this.state = {
        	results:[],
        	isLoading:false,
        	value:"",
        	errors:[],
        	selected:false
        }

        this.selectPredeterminate = this.selectPredeterminate.bind(this);
        this.clearError = this.clearError.bind(this);
        this.clearAllErrors = this.clearAllErrors.bind(this);
        this.setError = this.setError.bind(this);
        this.handleBlur = this.handleBlur.bind(this);

        this.countSelectedPredeterminate = 0;
    }

    componentDidMount() {
        this.selectPredeterminate(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.selectPredeterminate(nextProps);
    }

    selectPredeterminate(props_){    	
        if("predetermined" in props_ && props_.predetermined && this.countSelectedPredeterminate < 1){
        	this.countSelectedPredeterminate++;
        	axios({
				method:props_.method?props_.method:"post",
				url:props_.url,
				data:{search:props_.predetermined}
			})
			.then((response) => {
				this.setState({
					value:response.data[0].title,
					results:response.data,
					selected:true
				});
			})

        }
    }

    handleResultSelect = (e, data) => {
    	this.setState({ value: data.result.title, selected:true })

    	if('handleResultSelect' in this.props){
    		this.props.handleResultSelect(e, data)
    	}
    }

	handleSearchChange = (e, data) => {
		this.setState({ isLoading: true, value:data.value, selected:false })

		if('handleSearchChange' in this.props){
    		this.props.handleSearchChange(e, data);
    	}
		if(this.props.url){
			var dataServer = {
				search:data.value
			};

			axios({
				method:this.props.method?this.props.method:"post",
				url:this.props.url,
				data:dataServer
			})
			.then((response) => {
				this.setState({
					isLoading:false,
					results:response.data
				})
			})
		}
	}

	/**
	 * Deja en null un error en la lista de errores del campo
	 * @param  {String} name Nombre identificador del error
	 */
	clearError(name){
		this.setError(name, null);
	}

	clearAllErrors(){
		this.setState({errors:{}});
	}

	/**
	 * Asigna el valor a un error
	 * @param {String} name    Nombre identificador del error
	 * @param {String} message Mensaje a mostrar en el error
	 */
	setError(name, message){
		this.setState((oldState, props) => {
			return {
				errors:Object.assign({},oldState.errors,{[name]:message})
			}
		})
	}

	handleBlur(e, data){
		if(!this.state.selected)
			this.setError("required","Este campo es obligatorio");
	}

    render() {
    	const {results, isLoading, value, errors} = this.state;

    	let errors_ = "";
		if(!("noRenderFails" in this.props)){
			errors_ = _.map(this.state.errors, (el, i) => {
						if(typeof el === "string")
		                	return <p key={i} style={{color:"#9f3a38", marginBottom:"0px"}}>{el}</p>
	                });

			//une los mensajes enviados desde el componente que instancia
			_.map(this.state.otherErrors, (el, i) => {
				if(typeof el === "string")
                	errors_.push(<p key={i} style={{color:"#9f3a38", marginBottom:"0px"}}>{el}</p>)
            });
		}

        return (
        	<Segment basic style={{padding:"0px"}}>
        		<div className={"field "+("required" in this.props?"required":"")}>
        			
	        		{
	        			"label" in this.props?
	        			<label>
		        			{this.props.label}
		        		</label>:""
	        		}
        		
		            <Search
		            	input={{ icon: 'search', fluid: true, name:('name' in this.props)?this.props.name:""}}
		            	fluid
			            loading={isLoading}
			            onResultSelect={this.handleResultSelect}
			            onSearchChange={this.handleSearchChange}
			            results={results}
			            value={value}
			            noResultsMessage="Sin resultados."
			            size={this.props.size}
			            onFocus={this.clearAllErrors}
			            onBlur={this.handleBlur}
			          />
			       	<Segment basic style={{padding:'0px', marginTop:'5px'}}>
						{ errors_ }
					</Segment>
	          	</div>
          	</Segment>
        );
    }
}

export default SearchServer;
