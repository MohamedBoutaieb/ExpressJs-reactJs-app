import React from 'react';
import Dashboard from './users/Dashboard';

interface HomeProps {
    
}

const Home: React.FC<HomeProps> = () => {
    return (
        <div className='w-screen h-screen flex items-start justify-center'>
         <div className='w-full pt-10 xl:px-[15vw] '> <Dashboard /></div>  
        </div>
    );
};

export default Home;