import React, { useCallback, useEffect, useState, useContext } from "react";

// Routing and Request
import axios from "axios";
import { useLoaderData, useNavigate } from 'react-router-dom'

// Styling
import { Card, CardBody, CardTitle, CardText, CardSubtitle, Button, Input, Label, FormGroup } from 'reactstrap'
import searchIcon from './images/searchIcon.png'
import './recipeList.css'

// Components
import NavBar from './navbar';

// Auth
import AuthContext from "../context/AuthContext";



const { DateTime } = require('luxon');


export const listLoader = async () => {
    console.log("starting list loader");
    const results = await axios.get('http://colormethanh.pythonanywhere.com/api/')
    .catch((error) =>{
        console.log('Error', error.message);
    }); 
    const recipes = results.data;
    return recipes;
}


function SearchBarContainer (props) {

    return (
        <>
        
        <form>
            <div className="search-wrapper mb-3 mt-3">
                <div className="search">
                    <input className="searchTerm" placeholder="Search" type="text" onChange={(e) => props.onChange(e)}/>
                    <Button type="submit" className="searchButton">
                        <img className="searchIcon" src={searchIcon}  alt="Icon"/>
                    </Button>
                </div>
            </div>
        </form>
        {
         props.user && 
            <div className="checkbox-wrapper d-flex justify-content-center">
            <FormGroup switch>
                <Input 
                    type="switch" 
                    role="switch"
                    checked={props.isChecked}
                    onChange={()=>{props.setIsChecked(!props.isChecked)}}
                />
                <Label check>View only My Recipes</Label>
            </FormGroup>
            </div>  
        }
        
        </>
    )
}

function RecipeCard(props){

    const created_at = DateTime.fromISO(props.recipe.created_at).toLocaleString(DateTime.DATETIME_MED);
    const navigate = useNavigate();
    const handleOnClick = useCallback(() => navigate(`/Recipe/${props.recipe.id}`, {replace:true}),[navigate]);

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
            <CardBody>
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
            <CardBody >
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
    const [isChecked, setIsChecked] = useState(false)

    const {user} = useContext(AuthContext);

    function handleSearchValueChange (e) {
        setSearchValue(e.target.value);
    };

    const recipeList = useLoaderData();

    useEffect(() => {
        setRecipes(recipeList);
    }, []);
    
    useEffect(() => {
        if (isChecked){
            axios.get(`http://colormethanh.pythonanywhere.com/api/userList/${user.username}`)
            .then((results) => {
                console.log(results.data);
                const userList = results.data
                setRecipes(userList)
            })
            .catch((error) => {
            console.log('Error', error.message);
            });
        } else {
            setRecipes(recipeList);
        }
    }, [isChecked])

    return (
        <div className="list-background">
            <NavBar />
            <div className="container">
                <SearchBarContainer onChange={handleSearchValueChange} isChecked={isChecked} setIsChecked={setIsChecked} user={user} />
                <CardsContainer searchValue={searchValue} recipes={recipes}/>
            </div>
        </div>
    )
}