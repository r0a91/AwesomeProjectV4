import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import MapView from 'react-native-maps';
import Geocoder from 'react-native-geocoder';

import querystring from 'querystring';

Geocoder.fallbackToGoogle("AIzaSyAbYxSUQuNsFCqk_k9jBktm9D3zofXSs20");


export default class App extends React.Component {



  constructor(props){
    super(props)

    this.state={
      MyAddress: '',
      latitude: 0,
      longitude: 0,

    }

    this.handleClick = this.handleClick.bind(this);
    this.handleClick2 = this.handleClick2.bind(this);

  }

  watchID: ?number = null


  handleClick(){
    console.log("HOLA MUNDO PRUEBA");
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      let lati = parseFloat(position.coords.latitude)
      let lngi = parseFloat(position.coords.longitude)

      this.setState({latitude: lati, longitude: lngi})

    }, (error) =>{
      console.log("There is an error");
      console.log(error);
    },{
      enableHighAccuracy:true, timeout:20000, maximumAge: 1000
    })

  }

  handleClick2(){
    var myAddress = ''

    var NY = {
      lat: this.state.latitude,
      lng: this.state.longitude
    };

    let params = {
      key: 'AIzaSyAbYxSUQuNsFCqk_k9jBktm9D3zofXSs20',
      latlng: `${NY.lat},${NY.lng}`,
    };

    let qs = querystring.stringify(params);

    return fetch(`https://maps.googleapis.com/maps/api/geocode/json?${qs}`)
          .then((res) => res.json())
          .then((json) => {
            console.log(json);
            console.log(json.results[0].formatted_address);
            this.setState({MyAddress: json.results[0].formatted_address})
          })
  }

  render() {
    return (

      <View style={styles.container}>
      <Text>Hola Busca tu locacion en el mapa</Text>
      <Button
        onPress={this.handleClick}
        title="Buscar"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
      <View>
        <Text>My latitude is: {this.state.latitude}</Text>
        <Text>My Longitude is: {this.state.longitude}</Text>
      </View>
      <Button
        onPress={this.handleClick2}
        title="MostrarDir"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
      <View>
        <Text>My Address is: {this.state.MyAddress}</Text>
      </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    height: 200
  },
});
