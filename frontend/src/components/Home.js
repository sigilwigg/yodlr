import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChangeUserData } from '../actions/profileActionCreators';
import UserInfo from './UserInfo';
import UsersList from './UsersList';

function Home() {
    const profile = useSelector(store => store.profile);
    const dispatch = useDispatch();

    async function changeStatus(id, user) {
        user.state = user.state === 'active' ? 'pending' : 'active';
        await dispatch(ChangeUserData(id, user, profile.id));
    }

    async function changeIsAdmin(id, user) {
        user.isAdmin = user.isAdmin === false ? true : false;
        await dispatch(ChangeUserData(id, user, profile.id));
    }

    return (
        <div className="Home-Component">
            <UserInfo user={profile} />
            {
                profile.isAdmin === true ?
                    <UsersList
                        list={profile.usersList}
                        changeStatus={changeStatus}
                        changeIsAdmin={changeIsAdmin}
                    /> :
                    <></>
            }

        </div>
    )
}

export default Home;