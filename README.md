# ShoppingListTask

## Task
1. Do not make use of the image, all parts must be restored in CSS.
2. The application must work on the following browsers at least Chrome and Firefox.
3. Will not be returned from the HTML server except for the initial page. (All rendering will be performed on the client side)
4. Simulate communication with the server that is executed in JSON.
5. Possibility to add new products to the list.
6. Option to delete a task.
7. Option to edit product - Edit text and mark a product added to the basket
8. Clicking on a product will display the Product Details form with an editable option

gradient start: rgba(0,229,145,1) 
gradient end: rgba(47,239,188,1) 
header padding: 15px 

app container width: 800px 

shopping list width: 300px 
app header font size: 2em 

titles color: #ffffff; 
light border color: #d3d3d3 
light text color: #999999 
text color: #000000 
item padding left/right: 10px 
item padding top/bottom: 5px 

## Usage version with json-server
`git clone https://github.com/lironka/shopping-list-task.git shopping-list-task`

`cd shopping-list-task`

`npm install`

Run `npm run json-server &` for a fake api server.

Run `ng serve` for an application.

## Usage version with angular-in-memory-web-api
`git clone https://github.com/lironka/shopping-list-task.git shopping-list-task`

`cd shopping-list-task`

Change brunch `git checkout in-memory-web-api`

`npm install`

Run `ng serve` for an application.

## Tests
`ng test`

## Technical details
Angular 5
