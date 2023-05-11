import React, { useState, useEffect, useRef } from 'react';
import Cookies from 'js-cookie';
import Admin from './Admin';
import './AdminList.css';

export default function AdminList() {
    const [adminList, setAdminList] = useState([]);
    const [warning, setWarning] = useState([]);
    const adminEmailRef = useRef();


    useEffect(() => {
        fetch(`${process.env.PUBLIC_URL}/admin`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${Cookies.get('jwt')}`,
                'content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => setAdminList(data));
    }, []);


    async function editAdmin(email, isAdmin) {
        let errors = "";
        await fetch(`${process.env.PUBLIC_URL}/admin`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${Cookies.get('jwt')}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: email, isAdmin: isAdmin }),
        }).then(async (response) => {
            if (response.status === 400) {
                setWarning((await response.json()).error);
                errors = null;
                return;
            }
            return await response.json();
        }).then((response) => {
            if (response) {
                errors = response.error;
            }
        });
        return errors;
    }

    async function addItem(e) {
        const email = adminEmailRef.current.value;
        if (email === '') return;
        let error = await editAdmin(email, true);
        if (error == null) {
            return;
        }
        setWarning(error);
        setAdminList(prevItems => {
            return [...prevItems, { id: email, email: email, isAdmin: true }];
        });
        adminEmailRef.current.value = null;
    }

    async function removeItem(email) {
        setAdminList(adminList.filter(item => item.email !== email));
        editAdmin(email, false);
    }

    return (
        <>
            <div className='admin-list'>
                <h1 className='center'>Choose admins</h1>
                <label className='center'>
                    <input ref={adminEmailRef} type="text" />
                    <button className='button-admin' onClick={() => addItem()}>Add Admin</button>
                </label>
                <span className='warning center'>{warning}</span>
                <table>
                    {adminList.map(admin => (
                        <Admin
                            key={admin.email}
                            name={`${admin.firstName} ${admin.lastName}`}
                            email={admin.email}
                            onRemove={() => removeItem(admin.email)}
                            warning={admin.warning}
                        />
                    ))}
                </table>
            </div>
        </>
    );
}
