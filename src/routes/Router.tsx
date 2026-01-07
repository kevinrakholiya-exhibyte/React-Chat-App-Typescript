import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Chat from '../components/Chat'
import AddUser from '../components/AddUser'
import Home from '../components/Home'

const Router = () => {
    return (
        <Suspense>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/chats' element={<Chat />} />
                <Route path='/user' element={<AddUser />} />
            </Routes>
        </Suspense>
    )
}

export default Router