export default {
	home:{
		name:'Inicio',
		item:'home',
		path:'/'
	},
	testimony:{
		name:'Testimonios',
		item:'testimony',
		path:'/testimony'
	},
    registerUser:{
        name:'Registrarse',
        item:'registerUser',
        path:'/user/register'
    },
    updateUser:{
        name:'Actualizar usuario',
        item:'updateUser',
        path:'/user/update/:id'
    },
    storie_conflict:{
		name:'Historias del conflicto',
		item:'storie_conflict',
		path:'/stories/storie_conflict'
	},
	investigation_request:{
		name:'Solicitudes de investigación',
		item:'investigation_request',
		path:'/investigation_request'
	},
	user:{
		name:'Usuarios',
		item:'user',
		path:'/user'
	},
	account_activation:{
		name:'Activación de cuenta',
		item:'account_activation',
		path:'/account_activation/:id/:token'
	},
	login:{
		name:'Ingresar',
		item:'',
		path:'/login'	
	},
	password_reset_request:{
		name:'Recuperar contraseña',
		item:'',
		path:'/password-reset-request'	
	},
	reset_password:{
		name:'Restablecer contraseña',
		item:'',
		path:'/password/reset/:token'
	},
	open_data:{
		name:'Datos Abiertos',
		item:'open_data',
		path:'/open_data'
	},

}