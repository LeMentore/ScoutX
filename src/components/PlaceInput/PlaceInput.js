import React from 'react'
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput'

const placeInput = props => (
    <DefaultInput placeholder="Название места"
                  value={props.placeName}
                  onChangeText={props.onChangeText}/>
)

export default placeInput
