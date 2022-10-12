import React from 'react';
import burger from './images/burger.jpg';
import './recipeContainer.css';
import NavBar from './navbar';
import {Row, Col} from 'reactstrap'

const { DateTime } = require('luxon');

function RecipeBody(props) {

    function IngredientRow(props) {
        return (
            <div className='ingredient-name-row col-12'>
                <hr className='hr-contents' />
                <div className='content-row'>{props.ingredient['name']}</div>
            </div>
        )
    };
    
    function IngredientsContainer(props) {
        return(
            <div className='ingredients-container row'>
                <div className='body-titles' id="ingredients-title">Ingredients:</div>
                {props.ingredients.map((ingredient) => {
                    return <IngredientRow ingredient={ingredient} />
                })}
            </div>
        )
    };

    function DirectionRow(props) {
        return (
            <div className='direction-row col-12'>
                <hr className='hr-contents' />
                <div className='content-row'>{props.index + 1}.  {props.direction['content']}</div>
            </div>
        )
    }
    
    function DirectionContainer (props) {

        return (
          <div className='directions-container row'>
                <div className='body-titles' id='directions-title'> Directions: </div>
                {props.directions.map((direction, index) =>{
                    return <DirectionRow direction={direction} index={index} />
                })}
          </div>
        )
    }

    return (
        <div className='recipe-body-wrapper p-3 m-3'>
            <div id='recipe-description'>
                {props.description}
                <hr className='hr-description' />
            </div>

            <Row className='mt-3'>
                <Col>
                    <IngredientsContainer ingredients={props.ingredients} />
                </Col>

                <Col>
                    <DirectionContainer directions={props.directions} />
                </Col>
            </Row>
            
            
        </div>
    )
}


function RecipeHeader(props) {
    const created_at = DateTime.fromISO(props.created_at).toLocaleString(DateTime.DATETIME_MED);
    return (
        <>
        
        <div className='recipe-header-wrapper p-3'>
        <NavBar />
            <div className='recipe-header container'>
                <Row className='d-flex flex-md-row flex-column-reverse'>
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
        </div>
        </>
        
    )
}



export default function RecipeContainer(props){
    
    const RECIPE = {
        "id": 36,
        "name": "Classic Burger",
        "owner": 'colormethanh',
        "image": "../src/images/burger.jpg",
        "created_at": "2022-09-19T04:00:02.823709Z",
        "description": "If it ain't broke, don't fix it. This simple burger recipe will taste awesome no matter what.",
        "ingredients": [
            {"name": "oil"},
            {"name": "salt and pepper"},
            {"name": "meat patty"},
            {"name": "buns"},
            {"name": "cheese"},
            {"name": "pickles"}
        ],
        "directions": [
            {"content": "Season burger patty well w/ salt and pepper"},
            {"content": "Cook patties to desired dones"},
            {"content": "While the burger patties are cooking, butter and toast your buns"},
            {"content": "Seconds before the burger is finished, place a few slices of cheese ontop of the burger patties"},
            {"content": "When the burger is finished, set them aside to rest"},
            {"content": "Assemble your burger"}
        ]
    }

    return (
    <>
    <div className='recipe-background'>
        <RecipeHeader 
            name={RECIPE['name']} 
            owner={RECIPE['owner']}
            created_at={RECIPE['created_at']}
            image={RECIPE['image']}
            />
        <div className="container" name="RecipeContainer">
            <RecipeBody 
                description={RECIPE['description']}
                ingredients={RECIPE['ingredients']}
                directions={RECIPE['directions']} 
                />
        </div>
    </div>
    </>
    );
}

