import React from 'react'
import GoogleMapReact from 'google-map-react'
import markerImage from './marker.png'
class Map extends React.Component{

    constructor(props){
        super(props)
    }
    markerStyle = {
        height:"25px",
        width:"25px"
      }
    render(){
        return(
            <div style={{ height: '100vh', width: '100%' }}>
                <GoogleMapReact
                bootstrapURLKeys={{ key:"AIzaSyAWHn_0bqGaGHMe6mZW_cW7AZmAb0DJ__U"}}
                center={this.props.center}
                defaultZoom={this.props.zoom}>

                {this.props.list.map((el)=>{
                    let onChildClicka = (url)=>{
                        window.open(url,'_blank')
                        
                    }
                    let Marker = () => <img src={markerImage} style={this.markerStyle} onClick={()=>{onChildClicka(el.url)}}></img>;
                    return(
                            <Marker
                                key={el.id}
                                style={this.markerStyle}
                                lat={el.coordinates.latitude}
                                lng={el.coordinates.longitude}
                            />
                    )
                })}  
                </GoogleMapReact>
            </div> 
        )
    }
}
export default Map