import React from 'react';
import '../../App.css';

function Header({ title, children }) {
    return (
        <div className="App">
            <header>
                <h1>{title}</h1>                
            </header>
        </div>
    );
}

export default Header;