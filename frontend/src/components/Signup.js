import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { SignUp } from '../actions/profileActionCreators';
import useFormFields from '../hooks/useFormFields';

function Signup() {
    const profile = useSelector(store => store.profile);
    const history = useHistory();
    const dispatch = useDispatch();
    const [formData, handleChange] = useFormFields({
        password: '',
        firstName: '',
        lastName: '',
        email: ''
    })

    if (profile.isLoggedIn) history.push('/home');

    async function handleSubmit(evt) {
        evt.preventDefault();
        try {
            let res = await dispatch(SignUp(formData));
            if (res === 'registration failure') throw new Error(res);
            if (res === 'registration success') history.push('/home');
        } catch (err) {
            alert(err);
            console.log(err.stack);
        }
    }

    return (
        <div className="Signup-Component">
            <form onSubmit={handleSubmit}>
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
                <li>
                    <label htmlFor='firstName'>First Name:</label>
                    <input
                        id='firstName'
                        type='text'
                        name='firstName'
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                </li>
                <li>
                    <label htmlFor='lastName'>Last Name:</label>
                    <input
                        id='lastName'
                        type='text'
                        name='lastName'
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                </li>
                <li>
                    <label htmlFor='email'>Email:</label>
                    <input
                        id='email'
                        type='text'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                    />
                </li>
                <button>Sign Up</button>
            </form>
        </div>
    )
}

export default Signup;