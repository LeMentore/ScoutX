import React, { Component } from 'react'
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput'

class PlaceInput extends Component {
    state = {
        placeName: ''
    }

    placeNameChangedHandler = value => {
        this.setState({
            placeName: value
        })
    }

    render() {
        return (
            <DefaultInput placeholder="Place Name"
                          value={this.state.placeName}
                          onChangeText={this.placeNameChangedHandler}/>
        )
    }
}

export default PlaceInput
