import React, { useState, createContext } from "react";

export const filterContext = createContext();

const SearchFilter = (props) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div>
      <filterContext.Provider value={[searchTerm, setSearchTerm]}>
        {props.children}
      </filterContext.Provider>
    </div>
  );
};

export default SearchFilter;
