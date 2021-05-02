import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { LogIn } from '../actions/profileActionCreators';
import useFormFields from '../hooks/useFormFields';

function Signin() {
    const profile = useSelector(store => store.profile);
    const history = useHistory();
    const dispatch = useDispatch();
    const [formData, handleChange] = useFormFields({
        id: '',
        password: ''
    })

    if (profile.isLoggedIn) history.push('/home');

    async function handleSubmit(evt) {
        evt.preventDefault();
        try {
            let res = await dispatch(LogIn(formData));
            if (res == 'login failure') throw new Error(res);
            if (res == 'login success') history.push('/home');
        } catch (err) {
            alert(err);
            console.log(err.stack);
        }
    }

    return (
        <div className="Signin-Component">
            <form onSubmit={handleSubmit}>
                <li>
                    <label htmlFor='id'>Id:</label>
                    <input
                        id='id'
                        type='text'
                        name='id'
                        value={formData.id}
                        onChange={handleChange}
                    />
                </li>
                <li>
                    <label htmlFor='password'>Password:</label>
                    <input
                        id='password'
                        type='text'
                        name='password'
                        value={formData.password}
                        onChange={handleChange}
                    />
                </li>
                <button>Sign In</button>
            </form>
        </div>
    )
}

export default Signin;