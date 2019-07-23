@component('mail::message')

The body of your message.

@component('mail::button', ['url' => url('/account_activation/'.$user->id.'/'.$user->token_),'color'=>'success'])
Activación de cuenta
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent
