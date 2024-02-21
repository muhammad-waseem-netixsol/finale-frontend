import React, { useState } from 'react';

interface TruncatedTextProps {
  text: string;
  linesToShow: number;
}

const TruncatedText: React.FC<TruncatedTextProps> = ({ text, linesToShow }) => {
  
  

  return ( <div>
      <p className={`${linesToShow === 1 ? "" : "truncate-text"} `}>{text} </p>
      <span className='text-indigo-600 font-bold cursor-pointer'>Read More?</span>
     
    </div>
  );
};

export default TruncatedText;
