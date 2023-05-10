import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Admin from './Admin';
import './AdminList.css';

export default function AdminList() {
    const [adminList, setAdminList] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/api/admin', {
            method: 'GET',
            headers: {
                'content-Type': 'application/json',
                'Authorization': Cookies.get('jwt')
            },
        })
            .then(response => response.json())
            .then(data => setAdminList(data));
    }, []);

    function toggleItem(id) {
        console.log(id);
        const newItems = [...adminList];
        const item = newItems.find(c => c.email === id);
        item.isAdmin = !item.isAdmin;
        console.log(item);
        setAdminList(newItems);
    }

    async function saveChanges() {
        await fetch("http://localhost:8000/api/admin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': Cookies.get('jwt')
            },
            body: JSON.stringify({ admins: adminList }),
        }).then(() => {
            window.location.href = "/";
        });
    }

    return (
        <>
            <div className='admin-list'>
                <h1 className='center'>Choose admins</h1>
                {adminList.map(admin => (
                    <Admin
                        key={admin.email}
                        name={`${admin.firstName} ${admin.lastName}`}
                        isAdmin={admin.isAdmin}
                        email={admin.email}
                        onCheck={toggleItem}
                    />
                ))}
                <div className="submit-button center">
                    <button onClick={saveChanges}>Save changes</button>
                </div>
            </div>
        </>
    );
}
