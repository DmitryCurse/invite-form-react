import React, {useEffect, useState} from 'react';
import './index.scss';
import {Success} from "./Success";
import {Users} from "./Users";

function App() {
    const [users, setUsers] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [searchValue, setSearchValue] = useState('')
    const [invites, setIsInvites] = useState([])
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        fetch('https://reqres.in/api/users')
            .then(res => res.json())
            .then(json => setUsers(json.data))
            .catch(err => {
                console.warn(err)
                alert('Не удалось получить пользователей')
            })
            .finally(() => setLoading(false))
    }, [])

    const onChangeSearchValue = (event) => {
        setSearchValue(event.target.value)
    }

    const onClickInvite = (id) => {
        if (invites.includes(id)) {
            setIsInvites(prev => prev.filter(_id => _id !== id))
        } else {
            setIsInvites(prev => [...prev, id])
        }
    }

    const onClickSuccess = () => {
        setSuccess(true)
    }

    return (
        <div className="App">
            {success
                ? <Success count={invites.length}/>
                : <Users
                    onChangeSearchValue={onChangeSearchValue}
                    searchValue={searchValue}
                    items={users}
                    isLoading={isLoading}
                    invites={invites}
                    onClickInvite={onClickInvite}
                    onClickSuccess={onClickSuccess}
                />}
        </div>
    );
}

export default App;
