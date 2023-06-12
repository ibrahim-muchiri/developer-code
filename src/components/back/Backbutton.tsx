import React from 'react';
import { useHistory } from 'react-router-dom';

const BackButton = () => {
  const history = useHistory();

  const handleClick = () => {
    history.goBack();
  };

  return (
    <button onClick={handleClick}>
      Back
    </button>
  );
};

export default BackButton;
