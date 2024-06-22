import React, { useState } from 'react';

const CopyToClipboard = ({ text }) => {
  const [copySuccess, setCopySuccess] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(true);
    } catch (err) {
      setCopySuccess();
    }
  };

  return (
    <>
      {copySuccess ?
      <><i className="fa-regular fa-circle-check mx-2 cursor-pointer"></i>
      <span className='small'>Copied!</span>
      </>:
      <>
      <i onClick={copyToClipboard} className="fa-solid fa-copy mx-3 cursor-pointer"></i>
      <span className='extra-small-text'>Copy</span>
      </>}
    </>
  );
};

export default CopyToClipboard;
