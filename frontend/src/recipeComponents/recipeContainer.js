import React, { useContext, useState } from 'react';

//Style and Components
import './recipeContainer.css';
import NavBar from './navbar';
import {Row, Col, Button, Input, Alert,} from 'reactstrap'
import { useLoaderData, useRevalidator } from 'react-router-dom';

//Routing
import axios from "axios";

//Auth
import AuthContext from "../context/AuthContext"


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

    function ValidateInput(input) {
        if (input !== ""){
            return true
        } else { 
            return false 
        }
    }

    function IngredientRow(props) {

        const [isEdit, setIsEdit] = useState(false);
        const [ingName, setIngName] = useState(props.ingredient['name']);
        const [ingAmount, setIngAmount] = useState(props.ingredient['amount']);

        function handleOnClick() {
            setIsEdit(!isEdit);
        }

        function handleChange(e, setstate) {
            setstate(e.target.value);
        }

        function handleCancel(e) {
            setIngName(props.ingredient['name']);
            setIngAmount(props.ingredient['amount']);
            setIsEdit(false);
        }

        function handleSubmit(e) {
            e.preventDefault();
            let formData = new FormData();
            formData.append('name', JSON.stringify(ingName));
            formData.append('amount', JSON.stringify(ingAmount));
            formData.append('id',JSON.stringify(props.ingredient['id']));
            formData.append('recipe', JSON.stringify(props.ingredient['recipe']));
            console.log(...formData);
            console.log("submitting form")
            axios.put(`/api/ingredient/`, formData)
            .then(
                resp => {
                    console.log(resp);
                    setIngName(resp.data['name']);
                    setIngAmount(resp.data['amount']);
                    setIsEdit(false);
                }
            )
            .catch(error => {console.log("There was an Error!", error)})
        }

        return (
            <>
            <hr className='hr-contents' />
            <div className='ingredient-row'>                
                <Row>
                    {
                    !isEdit ?
                    <>
                    <Col className='content-row'> {ingName} </Col>
                    <Col className='content-row'> {ingAmount} </Col>
                    {props.user.username === props.owner && 
                    <Col xs='2' className='edit-btn'>
                        <Button size='sm' outline onClick={handleOnClick}> Edit </Button> 
                    </Col>
                    }
                    </>
                    :
                    <form onSubmit={handleSubmit}>
                        <Col className='content-row'>
                            <Input 
                                value={ingName}
                                onChange={(e) => handleChange(e, setIngName)}
                            />
                        </Col>
                        
                        <Col className='content-row mt-2'>
                            <Input
                                value={ingAmount}
                                onChange={(e) => handleChange(e, setIngAmount)}
                            />
                        </Col>

                        <Row>
                            <Col className='mt-2'>
                                <Button size='sm' outline color='danger' onClick={handleCancel} className="me-2" > Cancel </Button>
                                <Button size='sm' outline color='primary' type='submit'> Submit </Button> 
                            </Col>
                        </Row>
                        
                    </form>
                    }
                    
                </Row>
            </div>
            </>
        )
    };
    
    function IngredientsContainer(props) {
        const [isAddIng, setIsAddIng] = useState(false);
        const [newIngName, setNewIngName] = useState("");
        const [newIngAmount, setNewIngAmount] = useState("");
        const [alertVisable, setAlertVisable] = useState(false);

        const onDismiss = () => { setAlertVisable(false) }

        function handleClick(){
            setIsAddIng(true);
        }

        function handleChange(e, setstate) {
            setstate(e.target.value);
        }

        function handleCancel(){
            setNewIngName("");
            setNewIngAmount("");
            setIsAddIng(false);
        }

        function handleSubmit(e){
            e.preventDefault();
            let formIsValid = true
            console.log("new ingredient submitting");
            let nameIsValid = ValidateInput(newIngName)
            let amountIsValid = ValidateInput(newIngAmount)

            if (!nameIsValid){
                formIsValid = false;
            }

            if (!amountIsValid){
                formIsValid = false;
            }

            let formData = new FormData();
            formData.append('name', newIngName);
            formData.append('amount', newIngAmount);
            formData.append('recipe', JSON.stringify(props.recipe));

            if (formIsValid){
                console.log("New form validated!");
                axios.post('/api/ingredient/', formData)
                .then(
                    resp => {
                        console.log(resp);
                        props.revalidator.revalidate();
                    }
                )
                .catch(error => {console.log("There was an error!", error)})
                setIsAddIng(false);
            } else {
                console.log("New form invalid!");
                setAlertVisable(true);
            }
            return 
            
        }
        
        return(
            <Row className='ingredients-container me-2'>
                <Alert color="danger" isOpen={alertVisable} toggle={onDismiss}>
                    Looks like one or more of your fields are blank! Please check again.
                </Alert>
                <div className='body-titles' id="ingredients-title">Ingredients:</div>
                {props.ingredients.map((ingredient) => {
                    return <IngredientRow ingredient={ingredient} key={ingredient.id} user={props.user} owner={props.owner} />
                })}

                { 
                !isAddIng ?
                <Button outline onClick={handleClick}> Add New Ingredient </Button>
                :
                <>
                <hr className='hr-contents'/>
                <form className='mt-2' onSubmit={handleSubmit}>
                        <Col className='content-row'>
                            <Input 
                                placeholder='Ingredient Name'
                                onChange={(e) => handleChange(e, setNewIngName)}
                            />
                        </Col>
                        
                        <Col className='content-row mt-2'>
                            <Input
                                placeholder='Ingredient Amount'
                                onChange={(e) => handleChange(e, setNewIngAmount)}
                            />
                        </Col>

                        <Row>
                            <Col className='mt-2'>
                                <Button size='sm' outline color='danger' onClick={handleCancel} className="me-2"> Cancel </Button>
                                <Button size='sm' outline color='primary' type='submit'> Submit </Button> 
                            </Col>
                        </Row>
                </form>
                </>
                }

                
            </Row>
        )
    };

    function DirectionRow(props) {
        const [isEdit, setIsEdit ] = useState(false);
        const [ dirContent, setDirContent ] = useState(props.direction['content'])

        function handleClick(){
            setIsEdit(!isEdit);
        }

        function handleChange(e){
            setDirContent(e.target.value);
        }

        function handleCancel(){
            setDirContent(props.direction['content']);
            setIsEdit(false);
        }
        
        function handleSubmit(e){
            e.preventDefault();
            console.log("submitting form");
            let formData = new FormData();
            formData.append('content', JSON.stringify(dirContent));
            formData.append('id', JSON.stringify(props.direction['id']));
            formData.append('recipe', JSON.stringify(props.direction['recipe']))
            console.log(...formData);
            console.log("submitting form")
            axios.put(`/api/direction/${props.direction['id']}`, formData)
            .then(
                resp => {
                    console.log(resp);
                    setDirContent(resp.data['content']);
                    setIsEdit(false);
                }
            )
            .catch(error => {console.log("There was an Error!", error)})
        }


        return (
            <>
            <hr className='hr-contents' />
            <Row className='direction-row col-12'>
                {
                !isEdit ?
                <>
                <Col className='content-row'>{props.index + 1}.  {dirContent}</Col>
                {props.user.username === props.owner && 
                <Col xs='2' className='edit-btn'> 
                    <Button size='sm' outline onClick={handleClick}> Edit </Button> 
                </Col>
                }
                </>
                :
                <Col>
                    <form onSubmit={handleSubmit}>
                        <Col className='content-row'>
                            <Input 
                                value={dirContent}
                                onChange={(e) => handleChange(e)}
                            />
                        </Col>

                        <Row>
                            <Col className='mt-2'>
                                <Button size='sm' outline color='danger' onClick={handleCancel} className="me-2" > Cancel </Button>
                                <Button size='sm' outline color='primary' type='submit'> Submit </Button> 
                            </Col>
                        </Row>
                    </form>
                </Col>
                }
            </Row>
            </>
        )
    }
    
    function DirectionContainer (props) {
        const [newDir, setNewDir] = useState("");
        const [isAddIng, setIsAddIng] = useState(false);
        const [alertVisable, setAlertVisable] = useState(false);

        const onDismiss = () => { setAlertVisable(false) }

        function handleClick(){
            setIsAddIng(true);
        }

        function handleChange(e) {
            setNewDir(e.target.value);
        }

        function handleCancel(){
            setNewDir("");
            setIsAddIng(false);
        }

        function handleSubmit(e){
            e.preventDefault();
            let formIsValid = true
            let dirIsValid = ValidateInput(newDir)
            let formData = new FormData()
            formData.append('content', JSON.stringify(newDir));
            formData.append('recipe', JSON.stringify(props.recipe));

            if (!dirIsValid){
                formIsValid = false;
            }

            if (formIsValid){
                console.log("New form validated!");
                axios.post('/api/direction/', formData)
                .then(
                    resp => {
                        console.log(resp);
                        props.revalidator.revalidate();
                    }
                )
                .catch(error =>{console.log("There was an error!", error)})
                setIsAddIng(false);
            } else {
                console.log("New form invalid!");
                setAlertVisable(true);
            }
            return 
        }

        return (
          <Row className='directions-container me-2'>
                <Alert color="danger" isOpen={alertVisable} toggle={onDismiss}>
                    Looks like one or more of your fields are blank! Please check again.
                </Alert>
                <div className='body-titles' id='directions-title'> Directions: </div>
                {props.directions.map((direction, index) =>{
                    return <DirectionRow direction={direction} index={index} key={index + 1} user={props.user} owner={props.owner} />
                })}

                { 
                !isAddIng ?
                <Button outline onClick={handleClick}> Add New Direction </Button>
                :
                <>
                <hr className='hr-contents'/>
                <form className='mt-2' onSubmit={handleSubmit}>
                        <Col className='content-row'>
                            <Input 
                                placeholder='Direction'
                                onChange={(e) => handleChange(e, setNewDir)}
                            />
                        </Col>

                        <Row>
                            <Col className='mt-3'>
                                <Button size='sm' outline color='danger' onClick={handleCancel} className="me-2" > Cancel </Button>
                                <Button size='sm' outline color='primary' type='submit'> Submit </Button> 
                            </Col>
                        </Row>
                </form>
                </>
                }
          </Row>
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
                    <IngredientsContainer ingredients={props.ingredients} user={props.user} owner={props.owner} recipe={props.recipe} revalidator={props.revalidator} />
                </Col>

                <Col>
                    <DirectionContainer directions={props.directions} user={props.user} owner={props.owner} recipe={props.recipe} revalidator={props.revalidator} />
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

    const recipe = useLoaderData();
    const revalidator = useRevalidator();
    const { user } = useContext(AuthContext);

    return (
    <>
    <div className='recipe-background'>
    <NavBar />
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
                owner={recipe['owner']}
                recipe={recipe['id']}
                user={user}
                revalidator={revalidator} 
                />
        </div>
    </div>
    </>
    );
}

