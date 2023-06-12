import React, { useState, useContext } from "react";
import styled from 'styled-components';

  
export default function Alert() {
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');


    const SuccessMessage = styled.p`
      background-color: lightgreen;
      padding: 10px;
    `;
const ErrorMessage = styled.p`
  color: white;
  background-color: #FFB6C1;
  padding: 10px;
`;
  return (
    <div>
        <SuccessMessage>
            

        </SuccessMessage>
        <ErrorMessage>

        </ErrorMessage>
      
    </div>
  )
}
