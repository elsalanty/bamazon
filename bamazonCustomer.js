var mysql = require("mysql");
require("console.table");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  readProducts();
});

function readProducts() {
    console.log("Selecting all products...\n");
    connection.query("SELECT * FROM products", function (err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.table(res);
      console.log("###############################################");
      console.log("");
      console.log("Please Choose a Product");
      console.log("");
      console.log("###############################################"); 
      chooseProducts(res);
    });
}
    
    
                     
                                
                                
function chooseProducts(inventory) {
    inquirer.prompt([
      {
        name: "userChoice",
        message: "Item Id: ",
      },
      { 
        name: "userQuantity",
        message: "Quantity: ",
      },
    ]).then(answers => {
        console.info("Answers: ", answers);
        // If the userQuantity is more than itemQuantity, display a message of insufficient inventory
        // else display "order fulfilled", update the database, and display the total cost
        //identify the index corresponding to user choice (id-1 because it is an array)
        var chosenItem = inventory[answers.userChoice - 1];
        if (parseInt(answers.userQuantity) > chosenItem.stock_quantity) {
          console.log("Not Enough Stock!");
          chooseProducts();
        }
        else {
        console.log("Order Fulfilled!");
        console.log("You Purchased " + answers.userQuantity + " of " + chosenItem.product_name);
        console.log("Your Total is: $" + answers.userQuantity * chosenItem.price);
        updateStock(answers.userChoice, chosenItem.stock_quantity - answers.userQuantity);

        }
            
       
  })
  }
function updateStock(itemId, qty) {
  connection.query("UPDATE products SET ? WHERE ?", [
    {
      stock_quantity: qty
    },
    {
      id: itemId
    }

  ], function(err, res){
    if (err) throw err;
    readProducts();
  })
}