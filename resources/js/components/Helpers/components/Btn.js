import React, { Component } from 'react';

import { Button, Icon } from 'semantic-ui-react';

const  Save = (props) => {                        
    return (
        <Button {...props} primary><Icon name="save"/> Guardar</Button>
    );
}

const  Close = (props) => {
    return (
        <Button {...props}><Icon name="remove"/> Cerrar</Button>
    );
}

const  Update = (props) => {
    return (
        <Button {...props} primary><Icon name="pencil alternate"/> Actualizar</Button>
    );
}

const  Delete = (props) => {
    return (
        <Button {...props} negative><Icon name="trash alternate"/> Eliminar</Button>
    );
}

const  Add = (props) => {
    return (
        <Button {...props} positive><Icon name="plus"/> Agregar</Button>
    );
}

const  Accept = (props) => {
    return (
        <Button {...props} positive><Icon name="check"/> Aceptar</Button>
    );
}

const  Cancel = (props) => {
    return (
        <Button {...props}><Icon name="remove"/> Cancelar</Button>
    );
}

const  Yes = (props) => {
    return (
        <Button {...props} positive><Icon name="check"/> Si</Button>
    );
}

const  No = (props) => {
    return (
        <Button {...props}><Icon name="remove"/> No</Button>
    );
}

class Btn extends Component {
    static Save = Save;
    static Close = Close;
    static Update = Update;
    static Delete = Delete;
    static Add = Add;
    static Accept = Accept;
    static Cancel = Cancel;
    static Yes = Yes;
    static No = No;

    render() {
        return (
          	<Button {...this.props}>
            	{
            		this.props.value?
            			this.props.value:
            			(
            				this.props.children?
            					this.props.children:
            					"Botón"
        				)	
        		}
            </Button>  
        );
    }
}

export default Btn;
