import React, {useEffect, useState} from "react";
import {Card, CardLink, CardBody, CardTitle, CardText, CardSubtitle, Button} from 'reactstrap'
import searchIcon from './images/searchIcon.png'
import './recipeList.css'





function SearchBarContainer () {

    return (
        <div className="container d-flex justify-content-center">
            <div className="wrapper">
                <div className="search">
                    <input className="searchTerm" placeholder="Search" type="text" />
                    <Button type="submit" className="searchButton">
                        <img className="searchIcon" src={searchIcon}  alt="Icon"/>
                    </Button>
                </div>
            </div>
        </div>
    )
}

function RecipeCard(){
    const card = <Card
    style={{
      width: '18rem'
    }}
    onClick={()=>console.log("card Clicked")}
    className='m-3'
  >
    <CardBody>
      <CardTitle tag="h5">
        Card title
      </CardTitle>
      <CardSubtitle
        className="mb-2 text-muted"
        tag="h6"
      >
        Card subtitle
      </CardSubtitle>
    </CardBody>
    <img
      alt="Card cap"
      src="https://picsum.photos/318/180"
      width="100%"
    />
    <CardBody>
      <CardText>
        Some quick example text to build on the card title and make up the bulk of the card‘s content.
      </CardText>
    </CardBody>
  </Card>

    return(
        <>
            {card}
        </>
    )
}


function CardContainer (){

    function CreateCards(){
        let cards = []
    
        for(let i=0; i < 8; i++){
            cards.push(<RecipeCard />)
        }
        return cards
    }


    return (
        <>
        <div className="d-flex flex-wrap justify-content-center mb-3">
            <CreateCards />
        </div>
        </>
    )
}






export default function RecipeListContainer () {
    
    
    
    return (
        <div className="container">
            <SearchBarContainer />

            <CardContainer />
        </div>
    )
}