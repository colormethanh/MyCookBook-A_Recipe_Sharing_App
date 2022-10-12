import React, { useEffect, useState } from 'react';
import { Col, FormGroup, Input, Label, Row, Button } from 'reactstrap';
import NavBar from './navbar';

import './recipeCreate.css'

function createKey () {
    const key = Math.random() * 1000
    return key
}

function ImageImage(props){
    let image = ""

    if (props.imageURL) {
        image = <img id='recipe-image' alt="recipeImage" accept='image/*' src={props.imageURL}/>
    }

    return (
        <div className='d-flex justify-content-center'>
            <div className='image-container border m-3'>
                {image}
            </div>
        </div>
        
    )
}

function ImageSection(props){

    const image = props.image
    const setImage = props.setImage
    const imageURL = props.imageURL
    const setImageURL = props.setImageURL

    useEffect(() =>{
        if (image === "") return;
        console.log(image)
        console.log("creating image url")
        let newImageURL = URL.createObjectURL(image);
        console.log(newImageURL);
        setImageURL(newImageURL);
    }, [image]);
    
    function onImageChange(e) {

        if (e.target.files[0]){
           setImage(e.target.files[0]) 
        } else {
            setImage("")
        }
        
        console.log("image changed")
    } 

    return(
        <FormGroup>
            <ImageImage imageURL={imageURL} />
            <Input id="recipeImage" type="file" onChange={onImageChange} />
        </FormGroup>
    )
}


function RecipeName(props){
    const setRecipeName = props.setRecipeName
    const recipeName = props.recipeName

    function handleChange(e){

        const is_valid = props.validate(e);

        setRecipeName({
            'name':e.target.value,
            'is_valid': is_valid,
            'is_invalid': !is_valid, 
        });
    }

    return (
        <FormGroup>
            <Input 
            id="recipeName" 
            placeholder='Recipe Name'
            onChange={handleChange}
            valid={recipeName['is_valid']}
            invalid={recipeName['is_invalid']}
            />
        </FormGroup>
    )
}

function IngredientRow(props){
    
    // For all valid/invalid attributes of the Inputs, 
    // first check if input has been changed before
    // if the input has been changed once then assign the valid or invalid attribute

    return (
        <FormGroup>
            <Row>
                <Col className='mt-1' md={8}>
                    <Input 
                    name="name" 
                    placeholder='Ingredient Name' 
                    onChange={props.onChange}
                    valid={props['validation']['nameHasChanged'] ? props.validation['name'] : false} 
                    invalid={props['validation']['nameHasChanged'] ? !props.validation['name'] : false} 
                    />
                </Col>
                <Col className='mt-1' md={3}>
                    <Input 
                    name='amount'
                    placeholder='Amount' 
                    onChange={props.onChange} 
                    valid={props['validation']['amountHasChanged'] ? props.validation['amount'] : false}
                    invalid={props['validation']['amountHasChanged'] ? !props.validation['amount']: false} 
                    />
                </Col>
                <Col className='mt-1' md={1}>
                    <Button color="danger" onClick={props.onClick}> Remove </Button>
                </Col>
            </Row>
        </FormGroup>
    )
}

function IngredientSection(props){
    // lifted the states from RecipeCreateContainer
    const ingredients = props.ingredients 
    const ingredientAmnt = props.ingredientAmnt
    const setIngredients = props.setIngredients
    const setIngredientAmnt = props.setIngredientAmnt

    useEffect(() => {
        let lst = []
        
        for (let i = 0; i < ingredientAmnt; i++){

            if (ingredients[i]){
                lst.push(ingredients[i])
            } else {
                lst.push(createIngredient());
            };
        };
        setIngredients(lst);
    }, [ingredientAmnt])


    function createIngredient () {
        return(
            {
                'key':createKey(),
                'name':"",
                'amount':"",
                'validation': {
                    'name': false, //Is name Valid
                    'nameHasChanged':false, //Has the name been changed
                    'amount':false, //Is amount Valid
                    'amountHasChanged':false, //Has the amount been changed
                    }
            }
        )
    }

    function handleRemove (e, key) {
        setIngredients(ingredients.filter(ingredient => {return ingredient.key !== key})); // Returns all ingredients except for the one where the to be deleted key matches
        setIngredientAmnt(ingredientAmnt - 1);
    }

    function handleNewIngredient(){
        setIngredientAmnt(ingredientAmnt + 1);
    }


    function handleChange(e, key){
        const is_valid = props.validate(e); // Validates the input value and sends back true or false
        setIngredients(ingredients.map((ingredient) => {
            if (ingredient.key === key){
                ingredient[e.target.name] = e.target.value;
                ingredient['validation'][e.target.name] = is_valid;
                ingredient['validation'][e.target.name+'HasChanged'] = true; //On handleChange, the HasChanged state is set to true
                return ingredient
            } else {
                return ingredient
            }
        }))
    }

    return(
        <div className='mb-3'>
            <h3> Ingredients </h3>
            <hr className='hr-contents' />
            <div className='mt-3'>
                {ingredients.map((ingredient) => {
                return <IngredientRow 
                        onChange={(e) => handleChange(e, ingredient.key)} 
                        onClick={(e) => handleRemove(e, ingredient.key)} 
                        key={ingredient.key}
                        validation={ingredient['validation']}
                        />
                })}
            </div>
            <Button name="1" onClick={handleNewIngredient}> Add Ingredient </Button>
        </div> 
    )
}

function DirectionRow(props){
    return(
        <FormGroup>
            <Row>
                <Col md={1}> 
                    <Label for='Direction'>
                        {props.order}.
                    </Label>
                </Col>
                <Col md={10}>
                    <Input
                    name="content"
                    id="Direction"
                    type="textarea"
                    onChange={props.onChange}
                    valid={props.is_valid}
                    invalid={props.is_invalid}
                    /> 
                </Col>
                <Col className='mt-1' md={1}>
                    <Button color="danger" onClick={props.onClick}> Remove </Button>
                </Col>
            </Row>
        </FormGroup>
    )
}

function DirectionSection(props){

    const directions = props.directions
    const setDirections = props.setDirections
    const directionsAmnt = props.directionsAmnt
    const setDirectionAmnt = props.setDirectionAmnt

    useEffect(() => {
        let lst=[];
        for(let i = 0; i < directionsAmnt; i++){
            if (directions[i]){
                lst.push(directions[i]);
            } else {
                lst.push(createDirection());
            };   
        }
        setDirections(lst);
    }, [directionsAmnt])
    
    function createDirection(){
        return ({
            'key': createKey(),
            'content': "",
            'is_valid': false,
            'is_invalid': false,
        })
    }
    
    function handleNewDirection(){
        setDirectionAmnt( directionsAmnt + 1 );
    }

    function handleDirectionDelete(e, key){
        setDirections(directions.filter(direction => {return direction.key !== key}));
        setDirectionAmnt(directionsAmnt - 1);
    }

    function handleChange(e, key){
        const is_valid = props.validate(e)

        setDirections(directions.map((direction) => {
            if (direction.key === key){
                direction[e.target.name] = e.target.value;
                direction['is_valid'] = is_valid;
                direction['is_invalid'] = !is_valid;
                return direction;
            } else {
                return direction;
            }
        }))
    }

    return (
        <div>
            <h3> Directions </h3>
            <hr className='hr-contents' />

            <div className='mt-4'>
                {directions.map((direction, index) => {
                return <DirectionRow 
                        key={direction.key} 
                        order={index + 1} 
                        onClick={(e) => handleDirectionDelete(e, direction.key)}
                        onChange={(e) => handleChange(e, direction.key)}
                        is_valid = {direction['is_valid']}
                        is_invalid = {direction['is_invalid']} 
                        />
                })}
            </div>

            <Button onClick={handleNewDirection}> Add Direction </Button>
        </div>
    )   
}


export default function RecipeCreateContainer(prop){
    const [image, setImage] = useState("");
    const [imageURL, setImageURL] = useState();
    const [recipeName, setRecipeName] = useState({
        'name':""
    })
    const [ingredients, setIngredients] = useState([]);
    const [ingredientAmnt, setIngredientAmnt] = useState(3);
    const [directions, setDirections] = useState([]);
    const [directionsAmnt, setDirectionAmnt] = useState(3);
    
    function ValidateInput(e) {
        console.log(`validating ${e.target.name}`)
        if (e.target.value !== ""){
            return true
        } else { return false }
    }

    function validateForm(){
        let is_valid = true;

        if(recipeName['is_invalid']){ // Validating Name
            console.log(' recipe name is invalid');
            is_valid = false; 
        }

        ingredients.forEach((ingredient )=> { // Validating Ingredients
            if(!ingredient['validation']['name']){
                console.log(`ingredient${ingredient.key} has invalid name`);
                is_valid = false;
            } 
            
            if(!ingredient['validation']['amount']){
                console.log(`ingredient${ingredient.key} has invalid amount`);
                is_valid = false;
            }
        });

        directions.forEach((direction) => {
            if(direction['is_invalid']){
                console.log(`direction ${direction.order} is invalid`);
                is_valid = false;
             } 
        })

        console.log(is_valid ? "form is valid" : "form is not valid")

    }


    function handleSubmit(e){
        e.preventDefault();

        const form_valid = validateForm();

        // let formData = new FormData();
        // formData.append('image', image);
        // console.log(image);
        // formData.append('recipeName', recipeName);
        // console.log(recipeName);
        // formData.append('ingredients', ingredients);
        // console.log(ingredients);
        // formData.append('directions', directions);
        // console.log(directions);
        // for (var pair of formData.entries()){
        //     console.log(pair[0] + pair[1]);
        // }
    }

    return (
        <div className='create-background'>
            <NavBar />
            <div className='form-wrapper border container p-5'>
                <h1> Recipe Form </h1>
                <hr className='hr-contents' />

                <form onSubmit={handleSubmit}>
                    <ImageSection
                    image={image}
                    setImage={setImage}
                    imageURL={imageURL}
                    setImageURL={setImageURL}
                    validate={ValidateInput}
                    />
                    <RecipeName
                    setRecipeName={setRecipeName}
                    recipeName={recipeName}
                    validate={ValidateInput}
                    />
                    <IngredientSection 
                    ingredients={ingredients} 
                    setIngredients={setIngredients}
                    ingredientAmnt={ingredientAmnt}
                    setIngredientAmnt={setIngredientAmnt}
                    validate={ValidateInput}
                    />
                    <DirectionSection
                    directions={directions}
                    setDirections={setDirections}
                    directionsAmnt={directionsAmnt}
                    setDirectionAmnt={setDirectionAmnt}
                    validate={ValidateInput}
                    />
                    <hr></hr>
                    <Button color="primary" type="submit" value="Submit"> Submit</Button>
                </form>
            </div> 
        </div>
    )
}