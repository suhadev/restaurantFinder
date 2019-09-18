import React from 'react'
import styled from 'styled-components'
import RestaurantCard from './RestaurantCard'

//**Styled Components */
const DivContainer = styled.div`
height:100%;
overflow:auto;`

function RestaurantList(props){
    return(
        <DivContainer>
            {props.restaurantsObject.map((el)=>(
            <RestaurantCard cardInfo={el} key={el.id}/>
        ))}
        </DivContainer>
    )
}
export default RestaurantList