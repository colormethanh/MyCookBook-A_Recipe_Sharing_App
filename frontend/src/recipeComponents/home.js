import React, {useEffect, useState} from "react";
import NavBar from "./navbar";
import {Button, Input, Card, CardImg, CardImgOverlay, CardTitle, CardText, Row, Col } from 'reactstrap'
import './home.css'


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


function GalleryCard() {

    return (
        <Col className="card-column"  md="12" xl="4">
            <Card className="gallery-card">
                <CardImg
                    alt="card image"
                    src="https://picsum.photos/500/418"
                    className="card-img"
                />
                <CardImgOverlay>
                    <CardTitle>
                        Card Title
                    </CardTitle>
                    <CardText>
                        <small>
                            Last updated 3 mins ago
                        </small>
                    </CardText>
                </CardImgOverlay>
            </Card>
        </Col>

    )
}


function GalleryContainer() {

    let cards = []

    for(let i = 0; i < 3; i++){
        cards.push(<GalleryCard />);
    }   
    
    return (
            <Row className="gallery-row d-flex flex-xl-nowrap justify-content-around">
                {cards}
            </Row> 
    )
}


function GallerySection() {
    
    return(
        <div className="gallery-container p-3 mt-3 ms-3 me-4">
            <GalleryContainer />   
        </div>
    )

}


export default function HomePage() {
    return ( 
        <div className='home-background'>
            <div className="home-page">
                <NavBar />
                <HeaderSection />
                <GallerySection />
            </div>
        </div> 
    )
}