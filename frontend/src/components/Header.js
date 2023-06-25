import logo from "../images/logo.svg";
import {Link, Route} from 'react-router-dom';
import React from "react";

function Header(props) {
    const [currentUrl, setCurrentUrl] = React.useState('');

    function chgUrl() {
        setCurrentUrl(window.location.pathname);
    }

    return (
        <header className="header">

            <nav className="header__menu">

                {/** тут Требуется Link (вместо <a>), чтобы не перезагружалась страница */}
                <Link to='/' className="header__link" title="Place - Russia">
                    <img src={logo} className="header__logo" alt="лого Mesto"/>
                </Link>

                {!props.loggedIn &&
                    <Link to={window.location.pathname === '/sign-up' ? '/sign-in' : '/sign-up'}
                          className="header__menu-link" onClick={chgUrl}>
                        {window.location.pathname === '/sign-up' ? 'Войти' : 'Регистрация'}
                    </Link>
                }
                {props.loggedIn &&
                    (
                        <>
                            <span className="header__logout-wrap">
                                <p className="header__menu-text">{props.email}</p>
                                <button onClick={props.onLogout} className="header__menu-button">Выйти</button>
                            </span>
                        </>
                    )
                }

            </nav>

        </header>
    )
}

export default Header