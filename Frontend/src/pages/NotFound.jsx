import React from "react";
import './NotFound.css';
function NotFound() {
    return (
        <div className="app">
            <div className="notFound">
                <div className="notFoundImageContent">
                    <img src="NotFound.gif" alt="forgetpassword" className="notFoundImage" />
                </div>
                <div className="notFoundTextContent">
                    <h2 className="notFoundHead">404</h2>
                    <p className="notFoundText">Whoops... the page you were looking for does not exist.</p>
                </div>
            </div>
        </div>
    );
}
export default NotFound;