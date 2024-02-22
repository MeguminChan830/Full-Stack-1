import React from 'react';
import { Button } from 'react-bootstrap';

const GGSignIn = (props) => {
  return (
    <section style={{justifyContent: 'center', display: 'flex'}}>
      <a style={{margin: 'auto', width: '20em', height: '3.5em'}} href="/api/auth/google">
        <Button
          bsStyle="primary"
          style={{margin: 'auto', width: '20em', height: '3.5em'}}
          >
            <p style={{margin: '0', padding: '0', fontSize: '1.5em'}}>
            <i className="fa fa-google" style={{marginRight: '1em'}}></i>
            Sign In With Google</p>
        </Button>
      </a>
    </section>
  );
}

export default GGSignIn;
