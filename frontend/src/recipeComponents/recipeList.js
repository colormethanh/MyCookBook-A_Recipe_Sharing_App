import React, {useState} from "react";
import {Card, CardBody, CardTitle, CardText, CardSubtitle, Button} from 'reactstrap'
import searchIcon from './images/searchIcon.png'
import './recipeList.css'
import NavBar from './navbar';





function SearchBarContainer (props) {

    return (
        <form>
        <div className="wrapper">
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

    return(
        <>
        <Card
        style={{
        width: '18rem'
        }}
        onClick={()=>console.log("card Clicked")}
        className='recipe-card m-3'
        color="light"
        >
            <CardBody>
                <CardTitle tag="h5">
                    {props.name}
                </CardTitle>
                <CardSubtitle className="mb-2" tag="h6">
                    Card subtitle
                </CardSubtitle>
            </CardBody>
            <img alt="Card cap" src="https://picsum.photos/318/180" width="100%"/>
            <CardBody>
                <CardText>
                    Some quick example text to build on the card title and make up the bulk of the card's content.
                </CardText>
            </CardBody>
        </Card>
        </>
    )
}


function CardContainer (props){

    function CreateCards(){
        let searchValue = props.searchValue.toLowerCase()

        if (props.searchValue === "") {
            return(props.recipes.map((recipe) => {
                return <RecipeCard name={recipe.name} />
            }))
        } else {
            return(props.recipes.map((recipe) => {
                let recipeName = recipe['name'].toLowerCase()
                if (recipeName.includes(searchValue)){
                    return <RecipeCard name={recipe.name}/>
                }
            }))
        }
        
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
    const [searchValue, setSearchValue] = useState("")


    function handleSearchValueChange (e) {
        setSearchValue(e.target.value);
        console.log(`Setting search value to ${searchValue}`);
    }

    const RECIPES = [
        {'name':'Roast Chicken',},
        {'name':'Sushi'},
        {'name':'Hot Dog'},
        {'name':'Burger'},
        {'name':'Katsu'},
        {'name':'Kimchi Jigae'},
        {'name':'Pad Thai'},
        {'name':'Chicken Noodle Soup'}
    ]
    
    return (
        <>
        <NavBar />
        <div className="container">
            <SearchBarContainer onChange={handleSearchValueChange}/>
            <CardContainer searchValue={searchValue} recipes={RECIPES}/>
        </div>
        </>
    )
}