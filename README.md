# MyCookBook- A recipe creation/sharing app

## Inspiration
I first started programming because I wanted to create something..anything that would be useful to someone. So when I was tasked with this project, I wanted to do just that, attempt to create something that would be useful to someone. To make something useful is not just creating a "feature" on a website, it's how the features is directed toward a specific goal. The goal of MyCookBook is a site where one can easily create a recipe for later use or browse through the many recipes others may upload.
The main feature of MyCookBook is in the ease of creation. In the case of other recipe sharing site, it's very easy to view recipes, however creating one is either difficult or just impossible. MyCookBook easily allows for photo uploads, descriptions, and real time form manipulation to make the recipe creation process smooth.
Furthermore, recipes may change as time progresses. Ingredients added, measurements changed, etc. Therefore, after creating a recipe, the user will be able to change their own recipes right on the page.

## Distinctiveness and Complexity

## Description
MyCookBook is a recipe creation site. It is built with **Django + DjangoRestFramework on the backend and React on the frontend**. The main focus of this site is for recipe creation. 

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
There is a page that contains a list off all created recipes. There is a search bar at the top of the page to look up specific recipes. On load the page send a request to the backend to collect a list of recipes which is then rendered to the page as cards. Each recipe card contains a picture of the name, owner, creation date, picture, and description of the recipe. If clicked the recipe card will route the user to that recipe's detail page. 

### Recipe Detail
On load a request is sent to the backend to get the recipe details.
The recipe details page is seperated into two sections The RecipeHeader, and the RecipeBody. 
The RecipeHeader contains the Name of the recipe, the owner, and creation date. 
The RecipeBody contains the recipe description, ingredients, and directions. If the user is the owner of the recipe, there will be edit buttons along each row of ingredients and directions. If the user clicks the button they'll be given the option to edit or delete the ingredient/direction. Once submitted a request is made to the backend and the model is updated without refreshing the page. There is also an option to add New ingredients or directions to the recipe. 

<!-- 
Need to add user recipe page
 -->


## Files Created

## How To Run




