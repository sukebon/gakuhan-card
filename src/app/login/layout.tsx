import React, { ReactNode } from 'react';

export default function LoginLayout({ children }: { children: ReactNode; }) {
  return (
    <div className='w-full min-h-screen flex justify-center items-center'>{children}</div>
  );
};
