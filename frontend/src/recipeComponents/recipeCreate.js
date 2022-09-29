import React, { useEffect, useState } from 'react';
import { Col, FormGroup, Input, Label, Row, Button } from 'reactstrap';


function createKey () {
    const key = Math.random() * 1000
    return key
}

function ImageImage(props){
    let image = ""

    if (props.imageURL) {
        image = <img alt="recipeImage" accept='image/*' src={props.imageURL}/>
    }

    return (
        <div className='m-3'>
            {image}
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

    function handleChange(e){
        setRecipeName({
            'name':e.target.value
        });
    }

    return (
        <FormGroup>
            <Input 
            id="recipeName" 
            placeholder='Recipe Name'
            onChange={handleChange}
            />
        </FormGroup>
    )
}

function IngredientRow(props){
    return (
        <FormGroup>
            <Row>
                <Col className='mt-1' md={8}>
                    <Input name="name" placeholder='Ingredient Name' onChange={props.onChange} />
                </Col>
                <Col className='mt-1' md={3}>
                    <Input name="amount" placeholder='Amount' onChange={props.onChange} />
                </Col>
                <Col className='mt-1' md={1}>
                    <Button color="danger" onClick={props.onClick}> Delete </Button>
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
            }
        )
    }

    function handleRemove (e, key) {
        setIngredients(ingredients.filter(ingredient => {return ingredient.key !== key}));
        setIngredientAmnt(ingredientAmnt - 1);
    }

    function handleNewIngredient(){
        setIngredientAmnt(ingredientAmnt + 1);
    }

    function handleChange(e, key){
        setIngredients(ingredients.map((ingredient) => {
            if (ingredient.key === key){
                ingredient[e.target.name] = e.target.value
                return ingredient
            } else {
                return ingredient
            }
        }))
    }

    return(
        <div>
            <h3> Ingredients </h3>
            {ingredients.map((ingredient) => {
                return <IngredientRow 
                        onChange={(e) => handleChange(e, ingredient.key)} 
                        onClick={(e) => handleRemove(e, ingredient.key)} 
                        key={ingredient.key} 
                        />
            })}
            <Button name="1" onClick={handleNewIngredient}> Add Ingredient </Button>
        </div> 
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
                <Col md={10}>
                    <Input
                    name="content"
                    id="Direction2"
                    type='textarea'
                    onChange={props.onChange}
                    /> 
                </Col>
                <Col className='mt-1' md={1}>
                    <Button color="danger" onClick={props.onClick}> Delete </Button>
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
        setDirections(directions.map((direction) => {
            if (direction.key === key){
                direction[e.target.name] = e.target.value;
                return direction;
            } else {
                return direction;
            }
        }))
    }

    return (
        <div>
            <h3> Directions </h3>
            {directions.map((direction, index) => {
                return <DirectionRow 
                        key={direction.key} 
                        order={index + 1} 
                        onClick={(e) => handleDirectionDelete(e, direction.key)}
                        onChange={(e) => handleChange(e, direction.key)} 
                        />
            })}
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
    
    function handleSubmit(e){
        e.preventDefault();
        console.log("Form Submitted");
        console.log(recipeName.name);
        console.log("ingredients...");
        ingredients.forEach((ingredient) => console.log(`${ingredient.name}...${ingredient.amount} `))
        console.log("directions...")
        directions.forEach((direction, index) => console.log(`${index + 1} ${direction.content}`))

    }

    return (
        <div className='container'>
            <h1> Recipe Form </h1>

            <form onSubmit={handleSubmit}>
                
                <ImageSection
                image={image}
                setImage={setImage}
                imageURL={imageURL}
                setImageURL={setImageURL}
                />
                <RecipeName
                setRecipeName={setRecipeName}
                />
                <IngredientSection 
                ingredients={ingredients} 
                setIngredients={setIngredients}
                ingredientAmnt={ingredientAmnt}
                setIngredientAmnt={setIngredientAmnt}
                />
                <DirectionSection
                 directions={directions}
                 setDirections={setDirections}
                 directionsAmnt={directionsAmnt}
                 setDirectionAmnt={setDirectionAmnt}
                 />
                 <hr></hr>
                 <Button color="primary" type="submit" value="Submit"> Submit</Button>
            </form>
        </div>
        
    )
}