import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Header from './Header'
import SingleSelect from './SingleSelect'
import MultiSelect from './MultiSelect'
import AdList from './AdList'

const BASE_URL = 'https://by375e3tq2.execute-api.us-east-1.amazonaws.com/dev'
const API_KEY = 'AIyWXXATql3EagaSwgBIj6q4pSQaehQC7UK6GnFD'
const HEADERS = { headers: { 'X-Api-Key': API_KEY } }

const AdWidget = ({ match }) => {
  const [sourceData, setSourceData] = useState([])
  const [adsInSelectedAdset, setAdsInSelectedAdset] = useState([])
  const [destinationAdsets, setDestinationAdsets] = useState([])
  const [destinationAds, setDestinationAds] = useState([])
  const [sendToAllAdsets, setSendToAllAdsets] = useState(false)
  const [bulkDestinationMode, setBulkDestinationMode] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isRequesting, setIsRequesting] = useState(false)

  useEffect(() => {
    axios
      .get(`${BASE_URL}/bulk-update-data?viewId=${match.params.id}`, HEADERS)
      .then(response => {
        if (response.status === 200) {
          setSourceData(response.data)
        }
      })
      .catch(err => {
        console.error(err)
        alert('Could not load ads. Please check the console.')
      })
      .finally(() => setIsLoading(false))
  }, [match])

  const onSubmitDestinationAds = () => {
    if (destinationAds.length === 0) {
      alert('You must select ads to send.')
      return
    }

    if (destinationAdsets.length === 0 && !sendToAllAdsets) {
      alert('You must select a destination adset.')
      return
    }

    const adsToSend = destinationAds.map(ad => ad.id)

    const requestBody = {
      destination_adsets: destinationAdsets,
      ads: adsToSend,
      include_all_adsets: sendToAllAdsets
    }

    setIsRequesting(true)

    axios
      .post(`${BASE_URL}/bulk-update`, requestBody, HEADERS)
      .then(response => {
        if (response.status === 200) {
          setDestinationAds([])
          alert(response.data.message)
        }
      })
      .catch(err => {
        console.error(err)
        alert('Could not post ads to adset. Please check the console.')
      })
      .finally(() => setIsRequesting(false))
  }

  return (
    // Put widget in a fixed dimension container for development
    <div style={{ maxWidth: '900px', height: '500px', margin: '20px auto' }}>
      <div className="border p-3">
        <div className="container-fluid">
          <div className="row mb-3">
            <div className="col-12">
              <Header
                title="Bulk Creative"
                buttonText="Create"
                onCreate={onSubmitDestinationAds}
                disabled={isRequesting}
              />
            </div>
          </div>
          <div className="row ad-tables">
            {isLoading ? (
              <p className="mx-auto">Loading...</p>
            ) : (
              <>
                <div className="col-sm-12 col-lg-6 mb-4 d-flex flex-column justify-content-end">
                  <div className="mb-3">
                    <SingleSelect
                      label="Source Adset"
                      toolTip="ABC"
                      data={sourceData}
                      onSelect={selected => {
                        setAdsInSelectedAdset(sourceData[selected].ads)
                      }}
                    />
                  </div>
                  <div>
                    <AdList
                      label="Ads in Selected Adset"
                      ads={adsInSelectedAdset}
                      buttonType="add"
                      onIconClick={adIndex => {
                        const destination = [...destinationAds]
                        const adset = [...adsInSelectedAdset]
                        const newAd = adset.splice(adIndex, 1)

                        destination.push(newAd[0])
                        setAdsInSelectedAdset(adset)
                        setDestinationAds(destination)
                      }}
                    />
                  </div>
                </div>
                <div className="col-sm-12 col-lg-6 mb-4 d-flex flex-column justify-content-end">
                  <div className="mb-3">
                    <SingleSelect
                      label="Destination Adset(s)"
                      toolTip="ABC"
                      isDestination
                      data={sourceData}
                      onSelect={selected => {
                        if (selected === 'Specific Adsets') {
                          setBulkDestinationMode(true)
                          setDestinationAdsets([])
                          setSendToAllAdsets(false)
                        } else if (selected === 'All Adsets') {
                          setBulkDestinationMode(false)
                          setDestinationAdsets([])
                          setSendToAllAdsets(true)
                        } else {
                          setBulkDestinationMode(false)
                          setDestinationAdsets([sourceData[selected].adset_id])
                          setSendToAllAdsets(false)
                        }
                      }}
                    />
                  </div>
                  {bulkDestinationMode && (
                    <div className="mb-3">
                      <MultiSelect
                        label="Select Adset(s)"
                        data={sourceData}
                        onSelect={selected => {
                          if (!selected || selected.length === 0) {
                            setDestinationAdsets([])
                          } else {
                            setDestinationAdsets(selected.map(set => set.value))
                          }
                        }}
                      />
                    </div>
                  )}
                  <div>
                    <AdList
                      label="Ads to move into Selected Adset(s)"
                      toolTip="ABC"
                      ads={destinationAds}
                      buttonType="remove"
                      onIconClick={adIndex => {
                        const destination = [...destinationAds]
                        const adset = [...adsInSelectedAdset]
                        const removedAd = destination.splice(adIndex, 1)

                        adset.unshift(removedAd[0])
                        setAdsInSelectedAdset(adset)
                        setDestinationAds(destination)
                      }}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdWidget
