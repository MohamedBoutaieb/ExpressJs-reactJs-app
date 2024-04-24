import React from 'react';
import Dashboard from './users/Dashboard';

interface HomeProps {
    
}

const Home: React.FC<HomeProps> = () => {
    return (
        <div className='w-screen h-screen flex'>
            <Dashboard />
        </div>
    );
};

export default Home;