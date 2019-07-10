<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/login','ApiController@login');
Route::post('/logout','ApiController@logout');
Route::post('/forgot-password','ApiController@forgotPassword');
Route::post('/reset-password','ApiController@resetPassword');

Route::middleware('auth:api')->group(function(){
	Route::post('/change-password','ApiController@changePassword');
});

Route::prefix('v1')->group(function(){
	Route::prefix('user')->group(function(){
		Route::middleware('auth:api')->group(function(){
			Route::post('list', 'API\v1\UserController@list')->middleware('role_is:Administrador');
			Route::post('toggle-lock', 'API\v1\UserController@toggleLock')->middleware('role_is:Administrador');
		});

		Route::post('account-activation', 'API\v1\UserController@accountActivation');
	});

	Route::prefix('query')->group(function(){
		Route::post('municipios','API\v1\QueryController@municipios');
	});
});
