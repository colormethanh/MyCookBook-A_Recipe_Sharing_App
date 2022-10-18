import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Card, CardBody, CardTitle, CardText, CardSubtitle, Button } from 'reactstrap'
import searchIcon from './images/searchIcon.png'
import './recipeList.css'
import NavBar from './navbar';
import { useLoaderData, useNavigate } from 'react-router-dom'

const { DateTime } = require('luxon');


export const listLoader = async () => {
    const results = await axios.get('/api/')
    .catch(function (error){
        console.log('Error', error.message);
    }); 
    const recipes = results.data;
    return recipes;
} 


function SearchBarContainer (props) {

    return (
        <form>
        <div className="search-wrapper mb-3">
            <div className="search">
                <input className="searchTerm" placeholder="Search" type="text" onChange={(e) => props.onChange(e)}/>
                <Button type="submit" className="searchButton">
                    <img className="searchIcon" src={searchIcon}  alt="Icon"/>
                </Button>
            </div>
        </div>
        </form>
    )
}

function RecipeCard(props){

    const created_at = DateTime.fromISO(props.recipe.created_at).toLocaleString(DateTime.DATETIME_MED);
    const navigate = useNavigate();
    const handleOnClick = useCallback(() => navigate(`/${props.recipe.id}`, {replace:true}),[navigate]);

    return(
        <>
        <Card
        style={{
        width: '18rem'
        }}
        onClick={handleOnClick}
        className='recipe-card m-3'
        color="light"
        >
            <CardBody className="recipe-card">
                <CardTitle className="card-title" tag="h4">
                    {props.recipe.name}
                </CardTitle>
                <CardSubtitle className="mb-2" tag="h6">
                    By: {props.recipe.owner}
                    <br />
                    {created_at} 
                </CardSubtitle>
            </CardBody>
            <img className="card-image" alt="Card cap" src={props.recipe.image} width="100%"/>
            <CardBody className="recipe-card">
                <CardText>
                    {props.recipe.description ? props.recipe.description : " A quick and simple Recipe!"}
                </CardText>
            </CardBody>
        </Card>
        
        </>
    )
}


function CardsContainer (props){

    function CreateCards(){
        let searchValue = props.searchValue.toLowerCase()

        if (props.searchValue === "") {
            return(props.recipes.map((recipe) => {
                return <RecipeCard name={recipe.name} recipe={recipe} key={recipe.id}/>
            }))
        } else {
            return(props.recipes.map((recipe) => {
                let recipeName = recipe['name'].toLowerCase()
                if (recipeName.includes(searchValue)){
                    return <RecipeCard name={recipe.name} recipe={recipe} key={recipe.id}/>
                }
                return null
            }))
        }
        
    }


    return (
        <>
        <div className="cards-container d-flex flex-wrap justify-content-center mb-3">
            <CreateCards />
        </div>
        </>
    )
}


export default function RecipeListContainer () {
    const [searchValue, setSearchValue] = useState("")
    const [recipes, setRecipes] = useState([])

    function handleSearchValueChange (e) {
        setSearchValue(e.target.value);
    };

    const recipeList = useLoaderData();

    useEffect(() => {
        setRecipes(recipeList);
    }, []);
    

    return (
        <div className="list-background">
            <NavBar />
            <div className="container">
                <SearchBarContainer onChange={handleSearchValueChange}/>
                <CardsContainer searchValue={searchValue} recipes={recipes}/>
            </div>
        </div>
    )
}