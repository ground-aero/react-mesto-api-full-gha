import React from 'react';

function EntryForm({ name, title, textButton, handleSubmit }) {//props из Login, & Register

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleChangeEmail = (e) => {
        // console.log(email)
        setEmail(e.target.value);
    }
    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    }

    /** универсальный обработчик: 1.регистрации, 2.авторизации */
    const onSubmit = (e) => {
        e.preventDefault();
        handleSubmit(password, email)
    }

    React.useEffect(() => {
        setPassword('')
        setEmail('')
    }, [])

    /** Обработчик сабмита навешиватся только на тег form с событием submit, а не на кнопку сабмита */
    return (
        <form className="entry_form" name={ name } onSubmit={onSubmit}>
            <div className="entry__wrap-form">
                <h2 className="entry__title">{ title }</h2>
                <input className="entry__input" onChange={handleChangeEmail} value={email} type="email"
                       placeholder="Email" minLength="2"/>
                <input className="entry__input" onChange={handleChangePassword} value={password} type="password"
                       placeholder="password" minLength="2"/>
            </div>
            <button className="entry__btn-submit" type="submit">{ textButton }</button>
        </form>
    )
}

export default EntryForm