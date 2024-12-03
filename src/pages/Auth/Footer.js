import React, { Component } from 'react';


class Footer extends Component {

    // constructor(props) {
    //     super(props);
    // }

    render() {
        return (
            <div className="d-flex my-1 justify-content-center">
                <span>&copy; {new Date().getFullYear()} <a href="https://bloxtel.com/" target="_blank" rel="noopener noreferrer">Bloxtel Inc.</a></span>
            </div>
        );
    }

}

export default Footer;