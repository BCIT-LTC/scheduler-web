import React from 'react';
import './AdminList.css';

/**
 * single item in the list of admins
 */
export default function AdminList({ email, onRemove }) {
    /**
     * onChange handler
     */
    function handleChange() {
        onRemove(email)
    }
    return (
        <>
            <tr>
                <td>
                    {email}
                </td>
                <td className='cell'>
                    <input type="image" src="./xmark.svg" alt='remove' className='icon' onClick={() => handleChange()} />
                </td>
            </tr>
        </>
    );
}
