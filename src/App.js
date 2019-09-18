import React from 'react';
import './App.css';
import Map from './components/mapComponent/Map'
import Autocomplete from 'react-google-autocomplete'
import RestaurantList from './components/restaurantComponent/RestaurantList'
import axios from 'axios'
import styled from 'styled-components'

/******Styled Components */

const Container = styled.div`
  height : 100vh;
  width : 100vw;
  display : flex;
  flex-direction : column;
  align-items : stretch;`

const TopBar = styled.div`
  flex :  none;
  height : 4rem;
  display : flex;
  justify-content : space-around;
  flex-wrap : wrap;
  align-items : center;
  background-color : #311b92;
  @media(max-width : 700px){
    height : 12rem;
  }`

const ToggleButton = styled.a`
  padding : 1rem 2rem;
  cursor :  pointer;
  @media(min-width : 700px){
    display : none;
  }`

const AppBody = styled.div`
  flex : 1;
  display : flex;`

const ListContainer = styled.div`
  height : 100%;
  width : 50rem;
  background-color : whitesmoke;
  flex : none;
  @media(max-width : 700px){
    flex : 1;
  }`
  
const MapContainer = styled.div`
  height : 100%;
  flex : 1;
  border: 1px solid black;
  padding:1 rem;`

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lat :  12.9716,
      long :  77.5946,
      restaurants :  [],
      isMobileView :  (document.documentElement.clientWidth < 700) ? true  :  false,
      toggle :  true
    }
  }
  //**********function to make an API call to yelp through proxy server */
  makeApiRequest = () => {
    axios.post('http://localhost:3001/',{
      latitude : this.state.lat,
      longitude : this.state.long
    })
    .then((res) => {
          this.setState({
            restaurants :  res.data.businesses
          })
        })
  }

  //function to get the current location and set the map to current position by default
  getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          lat :  position.coords.latitude,
          long :  position.coords.longitude
        })
      })
    this.makeApiRequest()
  }
  componentDidMount() {
    window.addEventListener('resize', () => {
      (document.documentElement.clientWidth < 700)
        ? this.setState({ isMobileView :  true })
         :  this.setState({ isMobileView :  false })
    })

  }
  toggle = () => {
    this.setState({ toggle :  !(this.state.toggle) })
  }

  render() {
    const { toggle, isMobileView } = this.state;
    return (
      <Container>
        <TopBar>
          {/* Autocomplete serach bar */}
          <Autocomplete
              style={{ width :  '50rem' }}
              onPlaceSelected={(place) => {
                  this.setState({
                    lat :  place.geometry.location.lat(),
                    long :  place.geometry.location.lng()
                  })
                  this.makeApiRequest()
              }}
              types={['(regions)']}
          />
          <button className="btn btn-primary" onClick={this.getCurrentLocation}>Use my current location</button>
          {/* Toggle Button */}
          <ToggleButton onClick={this.toggle} className="btn btn-primary">Toggle</ToggleButton>
        </TopBar>
        <AppBody>
          {/* checking if the window is resized */}
          {(toggle || !isMobileView) &&
            <ListContainer>
              <RestaurantList restaurantsObject={this.state.restaurants} />
            </ListContainer>
          }
          {(!toggle || !isMobileView) &&
            <MapContainer>
              <Map
                center={{ lat :  this.state.lat, lng :  this.state.long }}
                height='300px'
                zoom={14}
                list={this.state.restaurants}
                boundsChange={this.getCurrentLocation}
              />
            </MapContainer>
          }
        </AppBody>
      </Container>
    );
  }
}
export default App;
