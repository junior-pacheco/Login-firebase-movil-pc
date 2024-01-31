import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './components/login/index';


const App = () => {
  return (
      <div className='h-[100vh]'>
        <main>
        <Routes>
            <Route path="/" element={<Login/>} />
            <Route path='/*' element={<Navigate to={'/'}/>} />
        </Routes>
        </main>
      </div>
  );
};

export default App;
