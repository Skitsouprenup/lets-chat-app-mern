import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/credentials/Login';
import Register from './components/credentials/Register';
import Hub from './components/main/Hub';
import './css/app.css';
import 'normalize.css';

const container = document.getElementById('app-root');
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/hub' element={<Hub />} />
                <Route path='/*' element={<h1>404 Not Found</h1>} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);