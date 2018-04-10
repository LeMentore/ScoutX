import React from 'react'
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput'

const placeInput = props => (
    <DefaultInput placeholder="Place Name"
                  value={props.placeName}
                  onChangeText={props.onChangeText}/>
)

export default placeInput
