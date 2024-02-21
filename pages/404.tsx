// pages/404.js or pages/404.tsx

import Link from 'next/link';

const Custom404 = () => {
  return (
    <div className='h-screen flex justify-center items-center flex-col' style={{ textAlign: 'center', padding: '50px' }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for might have been removed or doesn't exist.</p>
      <Link href="/list/NewsList">
        <p>Go To News Section</p>
      </Link>
    </div>
  );
};

export default Custom404;
