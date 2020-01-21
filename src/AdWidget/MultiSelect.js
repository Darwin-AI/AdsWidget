import React from 'react'
import Select from 'react-select'

const MultiSelect = ({ label, data, onSelect }) => {
  let formattedOptions = [{ value: null, label: 'No adsets' }]

  if (data && data.length > 0) {
    formattedOptions = data.map(option => {
      return {
        value: option.adset_id,
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
  }

  return (
    <>
      <label>{label}</label>
      <Select isMulti options={formattedOptions} onChange={selectedOption => onSelect(selectedOption)} />
    </>
  )
}

export default MultiSelect
