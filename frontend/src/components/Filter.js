import React from 'react';

const Filter = ({filter, handleFilter}) => {
  return (
    <>
      filter shown with <input value={filter} onChange={handleFilter}/>
    </>
  )
}

export default Filter;
