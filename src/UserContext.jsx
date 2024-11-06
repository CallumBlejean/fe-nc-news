import React, { createContext, useContext } from 'react';

const UserContext = createContext();

function UserProvider({ children }){
  const hardcodedUser = { username: "grumpy19" }; 

  return (
    <UserContext.Provider value={hardcodedUser}>
      {children}
    </UserContext.Provider>
  );
};
function useUser() {
 return useContext(UserContext)
}

export {
  UserProvider,
  useUser,
}