import React, {useCallback} from "react";
import axios from "axios";
import NavBar from "./navbar";
import {Button, Input, Card, CardImg, CardImgOverlay, CardTitle, CardText, Row, Col } from 'reactstrap'
import './home.css'
import {useLoaderData, useNavigate} from 'react-router-dom'



export const homeLoader = async () => {
    const results = await axios.get('/api/recents')
    .catch(function (error){
        console.log('Error', error.message);
    }); 
    const recipes = results.data;
    console.log(recipes);
    return recipes;
}

function SearchBarContainer() {
    return (
        <div className="flex">
            <Row>
                <Col xl="6">
                    <Input className="home-input mt-3" />
                    <Button className="home-btn mt-3 mb-3" color="primary"> Create a Recipe now! </Button>
                </Col>
            </Row>
            
        </div>
    )
}

function HeaderTitleContainer() {
    
    return (
        <div className="headerTitle mt-3">
            <Row>
                <Col xl="6">
                    <div className="title-container">
                        YourCookBook
                    </div>

                    <div className="undertitle-container">
                        Recipes <span style={{color:"#ff6700"}}>Made</span> Easy
                    </div>

                    <div className="tradeline-container">
                        {"Specially made for the cook in you. YourCookBook is the best place to store and share your beloved recipes. You can keep them for yourself or share them with the world!"}
                    </div>
                </Col> 
            </Row>
            
        </div>
    )
}

function HeaderSection(){

    return(
        <div className="container">
            <div className="header-section d-flex flex-column justify-content-center">       
                <HeaderTitleContainer />
                <SearchBarContainer />
            </div> 
        </div>
        
    )
}


function GalleryCard(props) {
    const navigate = useNavigate();
    const handleOnClick = useCallback(() => navigate(`/${props.recipe.id}`, {replace:true}),[navigate]);
    return (
        <Col className="card-column"  md="12" xl="4">
            <Card className="gallery-card" onClick={handleOnClick}>
                <CardImg
                    alt="card image"
                    src={props.recipe.image}
                    className="card-img"
                />
                <CardImgOverlay>
                    <CardTitle>
                        {props.recipe.name}
                    </CardTitle>
                    <CardText>
                        <small>
                            by: {props.recipe.owner}
                        </small>
                    </CardText>
                </CardImgOverlay>
            </Card>
        </Col>

    )
}


function GalleryContainer(props) {

    let cards = []

    for(let i = 0; i < 3; i++){
        cards.push(<GalleryCard />);
    }   
    
    return (
            <Row className="gallery-row d-flex flex-xl-nowrap justify-content-around">
                {/* {cards} */}
                {props.recipes.map(recipe => {
                    return <GalleryCard  recipe={recipe} key={recipe.name} />
                })}
            </Row> 
    )
}


function GallerySection(props) {
    
    return(
        <div className="gallery-container p-3 mt-3 ms-3 me-4">
            <GalleryContainer recipes={props.recipes}/>   
        </div>
    )

}


export default function HomePage() {

    const recipes = useLoaderData();

    return ( 
        <div className='home-background'>
            <div className="home-page">
                <NavBar />
                <HeaderSection />
                <GallerySection recipes={recipes} />
            </div>
        </div> 
    )
}