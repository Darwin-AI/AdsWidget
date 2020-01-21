import React from 'react'

const Header = ({ title, buttonText, onCreate, disabled }) => {
  return (
    <div className="w-100 d-flex justify-content-between">
      <h3 className="title font-weight-bold">{title}</h3>
      <button disabled={disabled} className="btn btn-primary" onClick={onCreate}>
        {buttonText}
      </button>
    </div>
  )
}

export default Header
