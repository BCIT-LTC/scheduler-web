import React from 'react';

export default function AdminList({ email, name, isAdmin, onCheck }) {
    function handleChange() {
        onCheck(email)
    }
    return (
        <div>
            <label>
                <input type="checkbox" checked={isAdmin} onChange={handleChange} />
                {name} ({email})
            </label>
        </div>
    );
}