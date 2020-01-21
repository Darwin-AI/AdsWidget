import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleRight, faInfoCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const AdList = ({ label, toolTip, ads, buttonType, onIconClick }) => {
  let adItems = null

  if (ads && ads.length > 0) {
    adItems = ads.map((ad, index) => (
      <AdListItem ad={ad} key={ad.id} buttonType={buttonType} onIconClick={() => onIconClick(index)} />
    ))
  }

  return (
    <>
      <label>{label}</label>
      {toolTip && <FontAwesomeIcon icon={faInfoCircle} className="ml-2 cursor-hover" data-tip={toolTip} />}
      <ul className="m-0 p-0 border overflow-auto">{adItems}</ul>
    </>
  )
}

const AdListItem = ({ ad, onIconClick, buttonType }) => {
  return (
    <li className="border-bottom px-3 py-2 draggable d-flex justify-content-between align-items-center">
      {ad.ad_name}
      {buttonType === 'add' && (
        <FontAwesomeIcon icon={faArrowAltCircleRight} className="move-ad-icon" onClick={onIconClick} />
      )}
      {buttonType === 'remove' && <FontAwesomeIcon icon={faTrashAlt} className="move-ad-icon" onClick={onIconClick} />}
    </li>
  )
}

export default AdList
