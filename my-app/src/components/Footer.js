import React from 'react';

function Footer() {
  const emailAddress = 'ongoinglivinglearning@gmail.com';

  // handle button click
  const handleMailMeClick = () => {
    const mailtoUrl = `mailto:${emailAddress}`;
    window.location.href = mailtoUrl;
  };

  return (
    <footer className="bg-white shadow dark:bg-gray-800 w-full bottom-0">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a href="https://CHEER.com/" className="hover:underline">CHEER</a>. All Rights Reserved.</span>
        <p className='text-sm text-gray-500 sm:text-center dark:text-gray-400'>Address: 8685 Rockglen Rd. Arkona ON, N0M 1B0</p>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <a href="#" className="hover:underline" onClick={handleMailMeClick}>Contact</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
