import React from 'react';

const Notification = ({ message, borderColor }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={borderColor} >
      {message}
    </div>
  )
}

export default Notification;
