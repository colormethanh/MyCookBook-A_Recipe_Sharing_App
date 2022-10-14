import React from 'react';
import axios from "axios";
import burger from './images/burger.jpg';
import './recipeContainer.css';
import NavBar from './navbar';
import {Row, Col} from 'reactstrap'
import { useLoaderData } from 'react-router-dom';


export const recipeLoader = async( {params} ) => {
    const results = await axios.get(`/api/${params.id}`)
    .catch(function(error){
        console.log('Error', error.message);
    });
    const recipe = results.data
    return recipe;
} 


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
                    return <IngredientRow ingredient={ingredient} key={ingredient.name} />
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
                    return <DirectionRow direction={direction} index={index} key={index + 1} />
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
                        <img src={props.image} alt="Recipe" id="header-img" />
                    </Col>
                </Row>
            </div>
        </div>
        </>
        
    )
}



export default function RecipeContainer(props){

    const recipe = useLoaderData()

    return (
    <>
    <div className='recipe-background'>
        <RecipeHeader 
            name={recipe['name']} 
            owner={recipe['owner']}
            created_at={recipe['created_at']}
            image={recipe['image']}
            />
        <div className="container" name="RecipeContainer">
            <RecipeBody 
                description={recipe['description']}
                ingredients={recipe['ingredients']}
                directions={recipe['directions']} 
                />
        </div>
    </div>
    </>
    );
}

