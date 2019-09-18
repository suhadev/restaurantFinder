import React from 'react'
import ReactDom from 'react-dom'
import GoogleMapReact from 'google-map-react'

import axios from 'axios'
import markerImage from './marker.png'
import './map.css'
// const Marker = () => <img src={markerImage} style={markerStyle}></img>;
// const markerStyle = {
//   height:"25px",
//   width:"25px"
// }
let marker
class Map extends React.Component{

    constructor(props){
        super(props)
    }
    // onChildClicka = (key)=>{
    //     console.log(key)
    //     alert(key)
    // }
    
    markerStyle = {
        height:"25px",
        width:"25px"
      }
    render(){
        return(
            <div style={{ height: '100vh', width: '100%' }}>
            {console.log(this.props.center)}
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
                                // onClick={()=>{this.onChildClicka(el.id)}} 
                            />
                    )
                })}
                    
                    
                </GoogleMapReact>
                

               
            </div> 
            
        )
    }
}
export default Map