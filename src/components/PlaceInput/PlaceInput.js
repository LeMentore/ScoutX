import React from 'react'
import MaterialInput from '../../components/UI/MaterialInput/MaterialInput'

const placeInput = props => (
    <MaterialInput label="Название места"
                   value={props.placeName}
                   onChangeText={props.onChangeText}/>
)

export default placeInput
