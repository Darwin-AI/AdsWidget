import React from 'react'
import ReactTooltip from 'react-tooltip'
import Select from 'react-select'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'

const SingleSelect = ({ label, toolTip, data, onSelect, isDestination, isMulti }) => {
  let formattedOptions = [{ value: null, label: 'No adsets' }]

  if (data && data.length > 0) {
    formattedOptions = data.map((option, index) => {
      return {
        value: index,
        label: option.adset_name
      }
    })

    // Move adset 'ASPID' to front since API does not handle that
    for (let i = 0; i < formattedOptions.length; i++) {
      if (formattedOptions[i].label === 'ASPID') {
        let a = formattedOptions.splice(i, 1)
        formattedOptions.unshift(a[0])
        break
      }
    }

    if (isDestination) {
      formattedOptions.unshift({ value: 'Specific Adsets', label: 'Specific Adsets' })
      formattedOptions.unshift({ value: 'All Adsets', label: 'All Adsets' })
    }
  }

  return (
    <>
      <ReactTooltip />
      <label>
        {label}
        <FontAwesomeIcon icon={faInfoCircle} className="ml-2 cursor-hover" data-tip={toolTip} />
      </label>
      <Select
        isMulti={isMulti}
        options={formattedOptions}
        onChange={selectedOption => onSelect(selectedOption.value)}
      />
    </>
  )
}

export default SingleSelect
