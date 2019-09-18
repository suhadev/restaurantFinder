import React from 'react'
import styled from 'styled-components'

/********Styled Components*/
const Card = styled.div`
    display : flex;
    justify-content : space-between;
    text-decoration : none;
    border : 1px solid gray;`

const CardDetail = styled.div`
    display : flex;
    flex-direction : column;
    padding : 0rem 0.1rem;`

const NameBox = styled.div`
    display : flex; 
    flex-direction : row;`

const Name = styled.h4`
    color : blue;
    padding : 0rem;`

const Cuisine = styled.p`
    padding : 1rem;
    padding-right:3rem;
    font-size:1.5rem;
    color:gray;`

const Address = styled.div`
    display : flex; 
    flex-direction : row;`

const Address1 = styled.p`
    padding : 0.1rem 0.5rem;`

const Location = styled.p`
    padding : 0.1rem 0.5rem;`

const ZipCode = styled.p`
    padding : 0.1rem 0.5rem;`

const Image = styled.img`
    height : 15rem;
    width : 15rem;
    padding : 1rem;`

const Rating = styled.div`
    display : flex;
    flex-direction : row;`

const RatingValue = styled.p`
    color:#E87624;
    padding : 0.1rem 0.5rem;`

const RatingCount = styled.p`
    color:gray;
    padding : 0.1rem 0.5rem;`

const Closed = styled.p`
    color : gray;`

function RestaurantCard(props){
    const {name,image_url,url,location,rating,coordinates,categories,is_Closed,id,review_count} = props.cardInfo
    return(
            <a href={url} target="_blank">
                <Card>
                    <CardDetail>
                        <NameBox>
                            <Name>{name}</Name>
                            <Cuisine>$-{categories[0].title}-$</Cuisine>
                        </NameBox>
                        <Rating>
                            <RatingValue>{rating}/5</RatingValue>
                            <RatingCount>({review_count} reviews)</RatingCount>
                        </Rating>
                        
                        <Address>
                            <Address1>Address: {location.address1},</Address1>
                            <Location>{location.city},</Location>
                            <ZipCode>{location.zip_code}</ZipCode>
                        </Address>
                        <Closed>{(is_Closed)?"Closed" : "Open"}</Closed>
                    </CardDetail>
                    <Image src={image_url}/>
                </Card>
            </a>
    )
}
export default RestaurantCard