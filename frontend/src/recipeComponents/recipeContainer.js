import React from 'react';
import burger from './images/burger.jpg';
import './recipeContainer.css';
import NavBar from './navbar';
import {Row, Col} from 'reactstrap'

const { DateTime } = require('luxon');

function RecipeBody(props) {

    function IngredientRow(props) {
        return (
            <div className='col-12'>
                <p> Name: {props.ingredient['name']} </p>
            </div>
        )
    };
    
    function IngredientsContainer(props) {
        return(
            <div className='row m-1'>
                <h3> Ingredients </h3>
                {props.ingredients.map((ingredient) => {
                    return <IngredientRow ingredient={ingredient} />
                })}
            </div>
        )
    };

    function DirectionRow(props) {
        return (
            <div className='col-12'>
                <p> {props.index + 1}.  {props.direction['content']} </p>
            </div>
        )
    }
    
    function DirectionContainer (props) {

        return (
          <div className='row m-1'>
                <h3> Direction </h3>
                {props.directions.map((direction, index) =>{
                    return <DirectionRow direction={direction} index={index} />
                })}
          </div>
        )
    }

    return (
        <div className='container mt-3'>
            <h1> Recipe Body </h1>
            <p> Description: {props.description} </p>
            <IngredientsContainer ingredients={props.ingredients} />
            <DirectionContainer directions={props.directions} />
        </div>
    )
}


function RecipeHeader(props) {
    const created_at = DateTime.fromISO(props.created_at).toLocaleString(DateTime.DATETIME_MED);
    return (
        <div className='recipe-header container mt-3'>
            <Row className='flex'>
                <Col id="recipeMeta">
                    <div className='recipe-meta'>
                        <div className='recipe-name'> {props.name} </div>
                        <div className='recipe-owner'> {props.owner} </div>
                        <div className='recipe-timestamp'> {created_at} </div>
                    </div>
                    
                </Col>
                <Col align='center'>
                    <img src={burger} alt="Recipe" id="header-img" />
                </Col>
            </Row>
        </div>
        
    )
}



export default function RecipeContainer(props){
    
    const RECIPE = {
        "id": 36,
        "name": "Classic Burger",
        "owner": 'colormethanh',
        "image": "../src/images/burger.jpg",
        "created_at": "2022-09-19T04:00:02.823709Z",
        "description": "Don't Fix it if it ain't broke. This simple burger recipe will taste awesome no matter what.",
        "ingredients": [
            {"name": "meat patty"},
            {"name": "buns"},
            {"name": "cheese"},
            {"name": "pickles"}
        ],
        "directions": [
            {"content": "Cook burger patty"},
            {"content": "toast buns"},
            {"content": "assemble burger"}
        ]
    }

    return (
    <>
    <NavBar />
    <div className="container" name="RecipeContainer">
        <RecipeHeader 
        name={RECIPE['name']} 
        owner={RECIPE['owner']}
        created_at={RECIPE['created_at']}
        image={RECIPE['image']}
        />

        <RecipeBody 
        description={RECIPE['description']}
        ingredients={RECIPE['ingredients']}
        directions={RECIPE['directions']} 
        />
    </div>
    </>
    );
}

