import React, { useState } from 'react';

export const CompleteContext = React.createContext();

export default function CompleteProvider(props) {
  const [showComplete, /*setShowComplete*/] = useState(true);
  
  const state = {
    showComplete,
  }

  return (
    <CompleteContext.Provider value={state}>
      {props.children}
    </CompleteContext.Provider>

  )
}
