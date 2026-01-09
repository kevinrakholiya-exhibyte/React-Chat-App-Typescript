import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Chat from '../components/Chat'
import AddUser from '../components/AddUser'
import Home from '../components/Home'
import Settings from '../components/Settings'

const Router = () => {
    return (
        <Suspense>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/chats' element={<Chat />} />
                <Route path='/user' element={<AddUser />} />
                <Route path='/setting' element={<Settings />} />
            </Routes>
        </Suspense>
    )
}

export default Router