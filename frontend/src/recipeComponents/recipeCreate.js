import React, { useEffect, useState } from 'react';
import { Col, FormGroup, Input, Label, Row, Button } from 'reactstrap';


function createKey () {
    const key = Math.random() * 1000
    return key
}

function ImageSection(props){
    const [images, setImages] = useState([]);
    const [imageURLs, setImageURLs] = useState([]);


    useEffect(() =>{
        if (images.length < 1) return;
        const newImageURLs = [];
        images.forEach(image => newImageURLs.push(URL.createObjectURL(image)));
        setImageURLs(newImageURLs)
    }, [images]);
    
    function onImageChange(e) {
        setImages([...e.target.files])
    } 


    return(
        <FormGroup>
            {imageURLs.map(imageSrc => <img alt="recipeImage" src={imageSrc}/>)}
            <Input id="recipeImage" type="file" onChange={onImageChange} />
        </FormGroup>
    )
}


function DirectionRow(props){
    return(
        <FormGroup>
            <Row>
                <Col md={1}> 
                    <Label for='Direction2'>
                        {props.order}.
                    </Label>
                </Col>
                <Col md={11}>
                    <Input
                    id="Direction2"
                    type='textarea'
                    /> 
                </Col>
            </Row>
        </FormGroup>
    )
}

function DirectionSection(props){
    
    const directionsAmnt = 3
    const directions = []

    for (let i = 1; i < directionsAmnt + 1; i++){
        let dir = <DirectionRow order={i}/>;
        directions.push(dir);
    }

    return (
        <div>
            <h3> Directions </h3>
            {directions}
        </div>
    )   
}


function IngredientRow(props){
    return (
        <FormGroup>
            <Row>
                <Col className='mt-1' md={8}>
                    <Input placeholder='Ingredient' />
                </Col>
                <Col className='mt-1' md={3}>
                    <Input placeholder='Amount' />
                </Col>
                <Col className='mt-1' md={1}>
                    <Button color="danger" onClick={props.onClick}> Delete </Button>
                </Col>
            </Row>
        </FormGroup>
    )
}

function IngredientSection(prop){
    
    const [ingredients, setIngredients] = useState([])
    const [ingredientAmnt, setIngredientAmnt] = useState(3)


    useEffect(() => {
        console.log(ingredients);
    }, [ingredients])

    useEffect(() => {
        let lst = []
        let len = ingredients.length
        
        ingredients.forEach(ingredient => { // Push all the current ingredients first
            lst.push(ingredient)
        });
        for (let i = 0; i < ingredientAmnt - len; i++){ // push the new row into lst
            lst.push(createIngredient());
        };
        setIngredients(lst);
    }, [ingredientAmnt])


    function createIngredient () {
        return(
            {
                'key':createKey(),
                'name':"",
                'amount':"",
            }
        )
    }

    const handleRemove = (e, key) => {
        console.log (`Key is ${key}`);

        setIngredients(ingredients.filter(ingredient => {return ingredient.key !== key}));
        setIngredientAmnt(ingredientAmnt - 1)
    }


    function handleNewIngredient(e){
        let amnt = ingredientAmnt + 1;
        setIngredientAmnt(amnt);
    }

    return(
        <div>
            <h3> Ingredients </h3>
            {ingredients.map((ingredient) => {
                return <IngredientRow onClick={(e) => handleRemove(e, ingredient.key)} key={ingredient.key}/>
            })}
            <Button name="1" onClick={handleNewIngredient}> Add Ingredient </Button>
        </div> 
    )
}


export default function RecipeCreateContainer(prop){

    return (
        <div className='container'>
            <h1> Recipe Form </h1>

            <form>
                
                <ImageSection />
                <FormGroup>
                    <Input 
                    id="recipeName" 
                    placeholder='Recipe Name'/>
                </FormGroup>
                <IngredientSection />
                <DirectionSection />
            </form>
        </div>
        
    )
}