import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { IoMdCheckboxOutline, IoMdTrash } from "react-icons/io";

const AccountCentre = () => {
    const [privateAccounts, setPrivateAccounts] = useState([]);
    const [parentAccounts, setParentAccounts] = useState([]);
    const [info, setInfo] = useState('');

    const getPendingParentAccounts = async () => {

        const response = await fetch(`/api/users/pending/parents`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        for (const d of data) {
            console.log('parent: ' + d.email);
        }
        setParentAccounts(data);

    };

    const getPendingPrivateAccounts = async () => {

        const response = await fetch(`/api/users/pending/private`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        for (const d of data) {
            console.log('priv: ' + d.email);
        }

        setPrivateAccounts(data);

    };

    useEffect(() => {
        getPendingParentAccounts();
        getPendingPrivateAccounts();
    }, []);
    const approveAccount = async (email) => {
        console.log('here');
        const response = await fetch(`/api/users/approve`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email })
        });
        const data = await response.json();
        if (data === "Updated") {
            setInfo(`Successfully updated status of account ${email}`);
            getPendingParentAccounts();
            getPendingPrivateAccounts();
        }else{
            console.log(data);
        }
    };

    const declineAccount = async (email) => {
        console.log('here');
        const response = await fetch(`/api/users/decline`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email })
        });
        const data = await response.json();
        if (data === "Updated") {
            setInfo(`Successfully updated status of account ${email}`);
            getPendingParentAccounts();
            getPendingPrivateAccounts();
        }else{
            console.log(data);
        }
    };


    return (
        <div>
            <div className="bg-white rounded-lg p-10 m-10 drop-shadow-lg">
                {info && (
                    <div>
                        {info}
                    </div>
                )}

                <div className='parentSection'>
                    <h1 className='font-semibold text-xl'>Pending Parent Accounts:</h1>
                    {parentAccounts && (
                        parentAccounts.map((parent, index) => {
                            return (
                                <p key={index} className='flex text-center items-center'>
                                    Email: {parent.email}, Full Name: {parent.username}
                                    <button className='p-1 m-1 hover:text-[#3fa538]' onClick={() => approveAccount(parent.email)}><IoMdCheckboxOutline size={30}/></button>
                                    <button className='hover:text-[#841e1e] p-1 m-1' onClick={() => declineAccount(parent.email)}><IoMdTrash size={30}/></button>
                                </p>
                            );
                        })
                    )}
                </div>

                <div className='privateSection'>
                    <br></br>
                    <h1 className='font-semibold text-xl'>Pending Private Accounts:</h1>
                    {privateAccounts && (
                        privateAccounts.map((priv, index) => {
                            if (priv.email) {
                                return (
                                    <p key={index} className='flex text-center items-center'>
                                        Parent Email: {priv.parent}, Full Name: {priv.username}
                                        <button className='p-1 m-1 items-center text-center hover:text-[#3fa538]' onClick={() => approveAccount(priv.email)}><IoMdCheckboxOutline size={30}/></button>
                                        <button className='hover:text-[#841e1e] p-1 m-1' onClick={() => declineAccount(priv.email)}><IoMdTrash size={30}/></button>
                                    </p>
                                );
                            } else {
                                return <p>No Private Emails Pending Approval</p>;
                            }
                        })
                    )}
                </div>
            </div>
        </div>
    );
};

export default AccountCentre;
