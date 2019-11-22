const mysql = require("mysql");
const inquirer = require("inquirer")
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "greatbay_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}\n`);
  questions();
})

const stuff = function getStuff() {
  connection.query("SELECT * stuff", function(err, resDB) {
      if (err) throw err;
      console.log('response', resDB);
      console.log('item/service 2', resDB.id[2]);
    });
};

function questions() {
  inquirer.prompt(startQuestions).then(function(resIQ){
      if (resIQ.action === "post an item"){
          inquirer.prompt(postQuestions) 
          createItem(resDB);
      }
      else if(res.action === "bid on an item") {
          inquirer.prompt(bidQuestions)
          bid(resDB, resIQ);
      };
      
  });
  };

  function createItem() {
    console.log(`posting your item...\n`);
    let query = connection.query(
      "INSERT INTO stuff SET ?",
      {
        item_name: res.itemName,
        object_type: res.itemType,
        item_description: res.itemDescription,
        item_quantity: res.itemQuantity,
      }
    )
  }
  
  const postbid = function bid (resDB, resIQ) {
    if (resIQ.bidAmount > resDB.current_bid) {
        resDB.current_bid = resIQ.bidAmount
        resDB.current_bidder = resIQ.username
    }
    else {
        console.log(`Your bid is not high enough. You must bid at least  ${current_bid}`)
    };
};

const startQuestions = [
  {
    type: "input",
    name: "username",
    message: "What is your GreatBay username?"
  },
  {
    type: "list",
    name: "action",
    message: "What do you want to do",
    choices: ["post an item", "bid on an item"]
  }
];
const postQuestions = [
  {
      type: "list",
      name: "itemType",
      message: "What type of item or service do you want to post?",
      choices: ["item", "task", "job", "project"]
    },
    {
      type: "input",
      name: "itemName",
      message: "What is your item or service called?"
    },
    {
      type: "input",
      name: "itemDescription",
      message: "Please enter a breif item description"
    },
    {
      type: "input",
      name: "itemQuantity",
      message: "How many of these items/services are included?" 
      
    },
  
]
const bidQuestions = [
  {
      type: "list",
      name: "itemType",
      message: "What type of item or service do you want to post?",
      // choices: [res]
    },
    {
      type: "number",
      name: "bidAmount",
      message: "How much do you want to bid?"
    }      
]

