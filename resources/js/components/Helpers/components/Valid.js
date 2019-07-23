import React, { Component, PropTypes } from 'react';

import { Segment, Form, Grid } from 'semantic-ui-react';

//Expresiones regulares que validan los campos
const regExps = {
	alphanumeric:/^[A-Za-z\dñáéíóúü]+$/i,
	alphanumericSpace:/^[A-Za-z\dñáéíóúü ]+$/i,

	alphabetical:/^[A-Za-zñáéíóúü]+$/i,
	alphabeticalSpace:/^[A-Za-zñáéíóúü ]+$/i,

	integer:/^-?\d+$/i,
	integer_negative:/^-\d+$/i,
	integer_positive:/^\d+$/i,

	numeric:/^-?\d+,?\d*?$/i,
	numericNegative:/^-\d+,?\d*?$/i,
	numericPositive:/^\d+,?\d*?$/i,

	decimal:/^-?\d+,\d*$/i,
	decimalNegative:/^-\d+,\d*$/i,
	decimalPositive:/^\d+,\d*$/i,

	email:/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i
}

//mensajes de error a mostrar en las validaciones
const messagesRegExps = {
	alphanumeric:"Este campo sólo admite caracteres alfanuméricos.",
	alphanumericSpace:"Este campo sólo admite caracteres alfanuméricos.",
	
	alphabetical:"Este campo sólo admite caracteres alfabéticos.",
	alphabeticalSpace:"Este campo sólo admite caracteres alfabéticos.",
	
	numeric:"Este campo sólo admite caracteres numéricos.",
	numericNegative:"Este campo sólo admite caracteres numéricos negativos.",
	numericPositive:"Este campo sólo admite caracteres numéricos positivos.",

	integer:"Este campo solo admite números enteros.",
	integer_negative:"Este campo solo admite números enteros negativos.",
	integer_positive:"Este campo solo admite números enteros positivos.",

	decimal:"Este campo solo admite números decimales.",
	decimalNegative:"Este campo solo admite números decimales negativos.",
	decimalPositive:"Este campo solo admite números decimales positivos.",
	
	email:"Esta no es una dirección de correo electrónico válida.",
}

class Input extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			errors:{},//almacena los errores del campo
			otherErrors:props.errors//errores enviados por el componente que instancia
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
		this.handleFocus = this.handleFocus.bind(this);

		//Determina si toda la validación del campo es correcta o falsa
		this.validState = false;

		//Determina si el evento producido en un input debe ejecutarse o no con la funcion
		//del componente que instancia a este
		this.stopEvent = false;

		//Almacena los datos de los eventos producidos
		this.inputEvent = null;
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

	/**
	 * Elimina espacios en blanco inecesarios al inicio y al final del texto
	 * @param  {String} value Texto a evaluar
	 * @return {String}       Texto sin espacios
	 */
	trimEmptySpaces(value){
		var stop = false;

        while (!stop){
            if(value.charAt(0) == ' '){
                value = value.trim();
            }else{
                stop = true;
            }
        }

        stop = false;
        //si tiene mas de un espacio al final
        while (!stop){
            if(value.charAt(value.length-1) == ' ' && value.charAt(value.length-2) == ' '){
                value = value.trim();
            }else{
                stop = true;
            }
        }

        return value;
	}


	/**
	 * Validación de la cantidad de caracteres permitidas para una entrada
	 * @param  {String} value Valor actual, el cual se evalua
	 * @param  {Int} min 	  Cantidad mínima de caracteres
	 * @param  {Int} max  	  Cantidad máxima de caracteres
	 * @return {Boolean}      Indica si el evento de la entrada debe continuar (mostrar la actualización)
	 */
	validateLength(value, min = null, max = null){

		if(min && value.length < min){
			this.setError("valid_min_length", "Este campo debe contener "+min+" caracteres como mínimo.")
			this.setValidState(false);
		}else{
			if(min)this.clearError('valid_min_length');
		}

		if(max && value.length > max){
			this.setError("valid_max_length", "Este campo puede contener "+max+" caracteres como máximo.")	
			this.setValidState(false);
			return false;
		}else{
			if(max)this.clearError('valid_max_length');
		}

		return true;
	}

	/**
	 * Realiza la validación de las expresiones regulares
	 * @param  {String} value           Texto a evaluar
	 * @param  {String} nameRegExp      Nombre de la expresión regular (key de regExps y messagesRegExps)
	 * @param  {String} updateStateWith Nombre del mensaje de expresion regular a mostrar (por defecto null para que imprima el correspondiente a la validación)
	 * @return {Boolean}                Si se cumple o no la expresión regular
	 */
	validateRegExp(value, nameRegExp, updateStateWith = null){
		//si la cadena esta vacia y no es un campo obligatorio
		//o si es el signo (-) y la regExp es de un tipo numèrico que admite el simbolo
		//se toma como valido el texto
		if ((value.length == 0 && !("required" in this.props))
			|| 
			(value == "-" && (nameRegExp == 'numeric' || nameRegExp == 'integer' || nameRegExp == 'decimal' || nameRegExp == 'numericNegative' || nameRegExp == 'integer_negative'|| nameRegExp == 'decimalNegative'))
		) return true;

		var regex = new RegExp(regExps[nameRegExp]);
        if(regex.test(value)){
        	//si se desea ver un mensaje diferente es enviado con updateStateWith
        	//sino imprime el correspondiente a nameRegExp
        	this.clearError(updateStateWith?updateStateWith:nameRegExp);
        	return true;
        }else{
        	this.setError(updateStateWith?updateStateWith:nameRegExp, messagesRegExps[updateStateWith?updateStateWith:nameRegExp]);
        	this.setValidState(false);
        	return false;
        }

        return false;
	}

	/**
	 * Asigna el estado general de validacion del campo
	 * @param {Boolean}  state 	Nuevo estado de la validación general del campo
	 * @param {Boolean}  force 	Obliga a realizar el cambio sin importar condiciones
	 */
	setValidState(state, force = false){
		//El estado solo se puede cambiar libremente si está en true
		if(this.validState || force){
			this.validState = state;
		}
	}

	/**
	 * Valida las expresiones regulares de acuerdo a las propiedades del input
	 * y determina si el evento desencadenado debe continuar
	 */
	validationInputExpReg(){
		if("alphanumeric" in this.props){
			if(!this.validateRegExp(this.inputEvent.target.value, 'alphanumeric'))this.stopEvent = true;
		}

		if("alphanumericSpace" in this.props){
			if(!this.validateRegExp(this.inputEvent.target.value, 'alphanumericSpace'))this.stopEvent = true;
		}

		if("alphabetical" in this.props){
			if(!this.validateRegExp(this.inputEvent.target.value, 'alphabetical'))this.stopEvent = true;
		}

		if("alphabeticalSpace" in this.props){
			if(!this.validateRegExp(this.inputEvent.target.value, 'alphabeticalSpace'))this.stopEvent = true;
		}

		if("numeric" in this.props){
			if(!this.validateRegExp(this.inputEvent.target.value, 'numeric'))this.stopEvent = true;
		}

		if("numericNegative" in this.props){
			if(!this.validateRegExp(this.inputEvent.target.value, 'numericNegative'))this.stopEvent = true;
		}

		if("numericPositive" in this.props){
			if(!this.validateRegExp(this.inputEvent.target.value, 'numericPositive'))this.stopEvent = true;
		}

		if("integer" in this.props){
			if(!this.validateRegExp(this.inputEvent.target.value, 'integer'))this.stopEvent = true;
		}

		if("integer_negative" in this.props){
			if(!this.validateRegExp(this.inputEvent.target.value, 'integer_negative'))this.stopEvent = true;
		}

		if("integer_positive" in this.props){
			if(!this.validateRegExp(this.inputEvent.target.value, 'integer_positive'))this.stopEvent = true;
		}

		if("decimal" in this.props){
			if(!this.validateRegExp(this.inputEvent.target.value, 'numeric', 'decimal'))this.stopEvent = true;
			this.validateRegExp(this.inputEvent.target.value, 'decimal')
		}

		if("decimalNegative" in this.props){
			if(!this.validateRegExp(this.inputEvent.target.value, 'numericNegative', 'decimalNegative'))this.stopEvent = true;
			this.validateRegExp(this.inputEvent.target.value, 'decimalNegative')
		}

		if("decimalPositive" in this.props){
			if(!this.validateRegExp(this.inputEvent.target.value, 'numericPositive', 'decimalPositive'))this.stopEvent = true;
			this.validateRegExp(this.inputEvent.target.value, 'decimal_positiN')
		}

		if("email" in this.props){	
			this.inputEvent.target.value = this.inputEvent.target.value.trim();		
			this.validateRegExp(this.inputEvent.target.value, 'email');
		}
	}

	/**
	 * Determina si disparar o no un evento cuando el input queda vacio o se agrega un dato
	 */
	eventForInputEmptyNoEmpty(){
		//si el input esta vacio, pero es requerido se lanza evento 
		//que indica que la validación no fue correcta
		if (
				(this.inputEvent.target.value.length == 0 && ("required" in this.props))
				&& ("onFalseValid" in this.props)
			){
			this.props.onFalseValid(this.inputEvent.target);
			return	
		}

		//si el input no esta vacio y la validaciòn ha sido correcta
		//se lanza el evento que indica que la validaciòn fue correcta
		if (
				(this.inputEvent.target.value.length > 0 && ("required" in this.props))
				&& ("onTrueValid" in this.props) && this.validState
			){
			this.props.onTrueValid(this.inputEvent.target);
			return	
		}

		//si el input esta vacio y no es requerido
		if (
				(this.inputEvent.target.value.length == 0 && !("required" in this.props))
				&& ("onTrueValid" in this.props)
			){
			this.props.onTrueValid(this.inputEvent.target);
			return	
		}

	}

	/**
	 * Lanza un evento de acuerdo al estado anterior y actual de la validación general del input
	 * @param  {boolean} oldValidState Estado enterior de la validación general
	 */
	eventForValidationState(oldValidState){
		//Lanza el evento 'onTrueValid' cuando el estado actual es true y el anterior es false 
		if(this.validState && this.validState != oldValidState && this.props.onTrueValid){
			this.props.onTrueValid(this.inputEvent.target);
			return
		}

		//Lanza el evento 'onFalseValid' cuando el estado actual es false y el anterior es true
		if(!this.validState && this.validState != oldValidState && this.props.onFalseValid){
			this.props.onFalseValid(this.inputEvent.target);
			return
		}

		this.eventForInputEmptyNoEmpty();
	}

	/**
	 * Funcion encargada de lanzar las validaciones del input
	 */
	validationInput(){

		if("min_length" in this.props){
			this.validateLength(this.inputEvent.target.value, this.props.min_length);
		}

		if("max_length" in this.props){
			if(!this.validateLength(this.inputEvent.target.value, null, this.props.max_length))this.stopEvent = true;
		}

		//Validaciones contenidas en la lista de expresiones regulares
		this.validationInputExpReg();
	}

	/**
	 * Manejador del evento change del input
	 * @param  {Event}  e  Informaciòn del evento
	 */
	handleInputChange(e){
		this.inputEvent = e;
		let oldValidState = this.validState;
		//Se inicia en true el estado general de validación
		this.setValidState(true, true);
		this.stopEvent = false;

		//se borran espacios en blanco del valor del input
		this.inputEvent.target.value = this.trimEmptySpaces(this.inputEvent.target.value);

		if(this.inputEvent.target.value.length > 0){
			this.validationInput();		
		}else{
			this.clearAllErrors();
			if("required" in this.props){
				this.setValidState(false, true);
			}else{
				this.setValidState(true, true);
			}
		}

		if(this.stopEvent)return

		//se lanza la función asignada al evento onChange en el 
		//componente que instancia a este
		if(this.props.onChange)
			this.props.onChange(this.inputEvent, this.inputEvent.target);	

		//dispara eventos de estado general de validación
		this.eventForValidationState(oldValidState);
	}

	handleBlur(e){
		//valida si el campo es requerido
		if("required" in e.target && e.target.required){
			if(e.target.value.length == 0){
				this.setError("required","Este campo es obligatorio");
			}else{
				this.clearError("required");
			}
		}

		//valida si los numeros decimales terminan en coma, antes de salir agrega un 0
		if(
			(
				"numeric" in this.props ||
				"numericNegative" in this.props ||
				"numericPositive" in this.props ||
				"decimal" in this.props ||
				"decimalNegative" in this.props ||
				"decimalPositive" in this.props
			) && e.target.value.charAt(e.target.value.length-1) == ","
		) e.target.value = e.target.value + "0";

		//llamado a la función onBlur establecida al instanciar componente
		if(this.props.onBlur)
			this.props.onBlur(e);	
	}

	handleFocus(e){
		if("required" in e.target && e.target.required)
			this.clearError("required");

		if(this.props.onFocus)
			this.props.onFocus(e, e.target);	
	}

	componentWillReceiveProps(nextProps) {
	    this.setState({otherErrors:nextProps.errors});
	}

	render(){
		//se sacan las propiedades admitidas para Form.Input
		const {id, name, type, value, label, required, placeholder, max} = this.props;
		const propsInput = {id, name, type, value, label, required, placeholder, max};

		let errors = "";
		if(!("noRenderFails" in this.props)){
			errors = _.map(this.state.errors, (el, i) => {
						if(typeof el === "string")
		                	return <p key={i} style={{color:"#9f3a38", marginBottom:"0px"}}>{el}</p>
	                });

			//une los mensajes enviados desde el componente que instancia
			_.map(this.state.otherErrors, (el, i) => {
				if(typeof el === "string")
                	errors.push(<p key={i} style={{color:"#9f3a38", marginBottom:"0px"}}>{el}</p>)
            });
		}

		let input_render = <Segment basic style={{padding:'0px', marginTop:'-10px', marginBottom:'30px'}}>
							<Form.Input {...propsInput}  onChange={this.handleInputChange} onBlur={this.handleBlur} onFocus={this.handleFocus}/>
							<Segment basic style={{padding:'0px', marginTop:'-10px'}}>
								{ errors }
							</Segment>
						</Segment>

        if('wrapperColumn' in this.props){
        	input_render = <Grid.Column>
						<Segment basic style={{padding:'0px', marginTop:'-10px', marginBottom:'30px'}}>
							<Form.Input {...propsInput}  onChange={this.handleInputChange} onBlur={this.handleBlur} onFocus={this.handleFocus}/>
							<Segment basic style={{padding:'0px', marginTop:'-10px'}}>
								{ errors }
							</Segment>
						</Segment>
					</Grid.Column>
        }

		return input_render;
	} 
}

class Valid extends Component {
	static Input = Input;

    render() {
        return <Segment/>
    }
}

export default Valid;
