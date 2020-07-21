// Contains logic to render a single label and text input
import React from 'react';

// we extract the input from the props provided by the Field component, sinces we will be using this component
// from inside the Field component
export default ({ input, label, meta: { error, touched } }) => {
  // We extract all the input props and map them to our own input field, in order to receive all the event handlers
  // provided in the input prop
  return (
    <div>
      <label>{label}</label>
      <input {...input} style={{marginBottom: '5px'}}/>
      <div className="red-text" style={{marginBottom: '20px'}}>
        {touched && error}
      </div>
    </div>
  )
}

