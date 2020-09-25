import React, { useContext, useState, useEffect } from 'react';

import { LoginContext } from './context';

import { If } from 'react-if';

const Auth = (props) => {

  const context = useContext(LoginContext);
  const [okToRender, setOkToRender] = useState(false)

  const OK = () => {

    let ok =
      context.loggedIn &&
      (props.capability ? context.can(props.capability) : true);

    setOkToRender(ok)

    if (!ok) {
      console.log(context.can(props.capability));
      console.warn('Not Authorized In');
    }

    return ok;

  }

  useEffect(() => {
    OK();
  }, [OK]);


  return (
    <If condition={okToRender}>
      {props.children}
    </If>
  );

};

export default Auth;
