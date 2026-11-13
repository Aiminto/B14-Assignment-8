import React from 'react';
import Sidebar from './_components/Sidebar';

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='flex'>
            <Sidebar />
            <div className='flex-1 p-6'>{children}</div>
        </div>
    );
};

export default layout;
