import React, { useContext } from 'react';
import { Authcontext } from '../../../Context/Authcontext';

const AuthHook = () => {

    const hook = useContext(Authcontext)

    return hook;
};

export default AuthHook;