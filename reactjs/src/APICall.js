import React, { Suspense } from 'react';

const DisplayUsers = () => {

    const [getUsers, setUsers] = React.useState([])
    const [loadOnce, setLoadOnce] = React.useState(false)


    const fetchUsers = () => {
        console.log(`Load once is ${loadOnce}`)
        if (!loadOnce) {
            fetch('https://jsonplaceholder.typicode.com/users')
                .then(response => response.json())
                .then(json => setUsers(json))
        }
    }

    fetchUsers();

    return (
        <div>
            <ul>
                {getUsers.map(u => <li>{u.name}</li>)}
            </ul>
        </div>
    )
}


export default function UsersList() {
    return (
        <div>
            <h3>List of Users</h3>
            <DisplayUsers />
        </div>
    )
}

