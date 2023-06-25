import React from 'react';
import EntryForm from "./EntryForm";

function Login({handleLogin}) {//@props из App.js - аутентификация пользователя
    return (
        <section className="entry">
            <EntryForm name={'login'} title={'Вход'}
                       textButton={'Войти'} handleSubmit={handleLogin}/>
        </section>
    )
}

export default Login