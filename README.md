# MyCookBook- A recipe creation/sharing app

## Video url: https://youtu.be/s_-wS80Eh9A

## How To Run 
- run "python -m venv venv"
- run "venv/scripts/activate" on Windows or "source venv/bin/activate" on Mac/Linux to start the virtual environment
- cd into "backend"
- run "pip install -r requirements.txt" to install any requirments
- run "python manage.py runserver" to start the server
- open a new terminal
- cd into "frontend"
- run npm install
- run npm start

The website should start after that, Please register for an account after the site has started.

NOTE: If using codespace, the app may load with a "503: temporarily unavailable error". In that case, just refresh the page and the site should load. 

## Inspiration
I first started programming because I wanted to create something..anything that would be useful to someone. So when I was tasked with this project, I wanted to do just that, attempt to create something that would be useful to someone. To make something useful is not just creating a "feature" on a website, it's how the features is directed toward a specific goal. The goal of MyCookBook is a site where one can easily create a recipe for later use or browse through the many recipes others may upload.
The main feature of MyCookBook is in the ease of creation. In the case of other recipe sharing site, it's very easy to view recipes, however creating one is either difficult or just impossible. MyCookBook easily allows for photo uploads, descriptions, and real time form manipulation to make the recipe creation process smooth.
Furthermore, recipes may change as time progresses. Ingredients added, measurements changed, etc. Therefore, after creating a recipe, the user will be able to change their own recipes right on the page.

## Distinctiveness and Complexity
In terms of complexity, I feel my project satisfy this category because of it's utilization of all of the topics that was introduced in the class. It utilizes in a meaningful way Python, Django, Javascript, React, HTML, CSS, SQL, MODELS, Security, and more. The project also implements all the C.R.U.D operations expected from a website as well as being mobile responsive.
In terms of Distinctivness, although it utilizes all the features practiced in this course, it's nature is not at all similiar to the other projects. It's goal is to create a dynamic recipe sharing/editing site to be used as either a record book, or place of inspiration, for recipes. Furthermore, the project is presented as a whole website as opposed to the "feature testing" style of the past projects. 


## Description
MyCookBook is a recipe creation site. It is built with **Django + DjangoRestFramework on the backend and React on the frontend**. 
The main focus of this site is for recipe creation. There is a login/logout feature as well as recipe creation and edits. The user has the option to view a list of all recipes or just view the ones they've created.  

### Login system
If users are not logged in they'll only be able to view ingredients. So a login system has been implemented. 

### Recipe creation
On the creation page There is a single form to create the recipe.
The fields are...
- Recipe Photo Upload
- Recipe Name
- Recipe Description
- Ingredients 
- Directions

the formData is created and validated on the fronend and is send to the backend once it's submitted. On the backend a django model is created for the recipe itself as well as each direction and recipe is may contain. 

### Recipe List
There is a page that contains a list off all created recipes. There is a search bar at the top of the page to look up specific recipes. Below the search bar is a radio slider, if activated the page will display only the recipes the user has created. On load the page send a request to the backend to collect a list of recipes which is then rendered to the page as cards. Each recipe card contains a picture of the name, owner, creation date, picture, and description of the recipe. If clicked the recipe card will route the user to that recipe's detail page. 

### Recipe Detail
On load a request is sent to the backend to get the recipe details.
The recipe details page is seperated into two sections The RecipeHeader, and the RecipeBody. 
The RecipeHeader contains the Name of the recipe, the owner, and creation date. 
The RecipeBody contains the recipe description, ingredients, and directions. If the user is the owner of the recipe, there will be edit buttons along each row of ingredients and directions. If the user clicks the button they'll be given the option to edit or delete the ingredient/direction. Once submitted a request is made to the backend and the model is updated without refreshing the page. There is also an option to add New ingredients or directions to the recipe. 


## Files Created

### backend 

- Views.py: Contains all the views I've created for the backend. That includes the login/token retrieval as well as any get/post/put requests. 
- urls.py: Contains all the routes for the backend api. 
- settings.py: Contains any settings that i've added to the project. This includes any apps, the restframework settings, and the JWT settings. 
- models.py : Contains all the models created for this project. (ex. User, Recipe, Ingredients, Direction)
- serializer.py: Contains a help function used to strip quotes off recieved data, Registration serializers, and all models serializations. 

### frontend
- src/context/AuthContext: A context file to be used by other compoenents for registration routing and authentification purposes.   
- src/recipeComponenets: Contains all the components for the frontend portion of the project. Each components has an accompanying CSS stylesheet. Each component generally is a single page of the webpage with the exception of navbar being used in all components.
- src/recipeComponents/images: Used as a store for all server side images. 
- src/recipeComponenets/utils: Contains a componet that checks if a user is logged in else reroute them to login page.
- src/index: contains the root of the frontend as well as the routers.

### myenv
contains the files for the virtual env






