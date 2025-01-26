/* Activate/Deactive the new list popup */
function newList()
{
  // The following code activates and disactivates the new list popup box depending on when the function is called
  document.getElementById("newListPopupMessageBox").classList.toggle("active");
  document.getElementById("newListName").value = null;
}

/* Activate/Deactive the change board color popup */
function newBoardColor()
{
  // The following code activates and disactivates the new list popup box depending on when the function is called
  document.getElementById("changeColorPopupMessageBox").classList.toggle("active");
  document.getElementById("newBoardColor").value = userBoard.boardColor; //default value
}

/* Activate/Deactivate the new item popup */
function newItem(listIndex)
{
  // The following code activates and disactivates the new list popup box depending on when the function is called
  document.getElementById("newItemPopupMessageBox").classList.toggle("active");
  document.getElementById("newItemName").value = null;
  document.getElementById("newItemContent").value = null;
  document.getElementById("newItemDueDate").value = null;
  document.getElementById("itemLink").value = null;
  document.getElementById("newItemDuration").value = "hh:mm";
  document.getElementById("repeatingItem").checked = true;
  document.getElementById("notRepeatingItem").checked = false;

  // Check if the Duration button has been focused on
  document.getElementById("newItemDuration").onfocus = function(){
    // If it has been focused on and the value is the default one, it changes it to 00:00
    if (document.getElementById("newItemDuration").value == "hh:mm")
    {
      document.getElementById("newItemDuration").value = "00:00";
    }
  }

  // Check if the button has been clicked 
  document.getElementById('createItemBtn').onclick = function(){
    createNewItem(listIndex);
  }
 
}

/* Change the Board Color*/
function changeColor()
{
  //Extract the border colour selected
  let newBoardColorRef = document.getElementById("newBoardColor").value;
  // Check that the board color is not white
  if (newBoardColorRef == "FFFFFF" || newBoardColorRef == "000000")
  {
    alert("NOO... don't be so bland. Choose a BETTER color than that.")
  }
  else
  {
    /* The following determine if whether the text color should be white or black, depending on the brightness of the background color */
    // Need to convert the board color (background color) from hexadecimal to rgb then calculates 

    let rgb = [0,0,0]; // Initalising and declaring an [red,green,blue] matrix
    let k = 0; // Initalising and creating a counter that is necessary to split the hexadecimal into three pairs

    for(let i=0; i < rgb.length; i++)
    {
        let pair =  newBoardColorRef.slice(k,k + 2); // Determines the red, green and blue pair of numbers in the hexadecimal each iteration respectively
        rgb[i] = parseInt(pair, 16); // Converts the red, green and blue pair in hexadecimal into it's respective in rgb and stores them in different parts in the array in the format of [red, green, blue]
        k+= 2 // Since a hexadecimal is has a length of 6 and we perform a total of six iterations, this k counter needs to increase by 2 each loop
    }

    // Calculates the HSP (Hue, Saturation, Perceived Brightness) value/brightness using the formula
    let brightness  = Math.sqrt(0.299*Math.pow(rgb[0],2) + 0.587*Math.pow(rgb[1],2) + 0.114*Math.pow(rgb[2],2));
    let textColor = ""; // Declare and initalise the text color

    // Checks if the board is dark
    if (brightness < 128) // Note, 128 is used since the max brightness is 255 and and the min brightness is 0 and so ~128 is halfway 
    {
      textColor = "FFFFFF"; // the text color is white
    }
    else
    {
      textColor = "000000"; // the text color is black
    }

    //Update text color
    userBoard.textColor = textColor;
    //Change the board color in userBoard
    userBoard.boardColor = newBoardColorRef;
    // Get rid of the popup
    newBoardColor()
    // Update local storage
    updateLocalStorage(userBoard);
    displayList(userBoard);
  }
}

/* Generates the HTML code required for all the lists */
function displayList(data)
{  
  let listDisplayRef = document.getElementById("listDisplay");
  let boardColor = data.boardColor;
  let boardName = data.boardTitle;
  let textColor = data.textColor;
  let output = "";
  const NUM_OF_LISTS = data.listLength;
  document.getElementById("boardName").innerHTML = `${boardName}`;

  /*Change the board Header and Menu*/
  //Header and Header Title
  document.getElementById("boardHeader").style.backgroundColor = "#" + boardColor;
  document.getElementById("boardName").style.color = "#" + textColor;
  //Create New List Popup
  document.getElementById("newListLabel").style.color = "#" + boardColor;
  document.getElementById("createListBtn").style.backgroundColor = "#" + boardColor;
  document.getElementById("createListBtn").style.color = "#" + textColor;
  document.getElementById("cancelNewList").style.color = "#" + boardColor;
  //Create New Item Popup
  document.getElementById("newItemLabel").style.color = "#" + boardColor;
  document.getElementById("newItemContentLabel").style.color = "#" + boardColor;
  document.getElementById("newItemDueDateLabel").style.color = "#" + boardColor;
  document.getElementById("itemLinkLabel").style.color = "#" + boardColor;
  document.getElementById("newItemDurationLabel").style.color = "#" + boardColor;
  document.getElementById("repeatingItemHeader").style.color = "#" + boardColor;
  document.getElementById("createItemBtn").style.backgroundColor = "#" + boardColor;
  document.getElementById("createItemBtn").style.color = "#" + textColor;
  document.getElementById("cancelNewItem").style.color = "#" + boardColor;
  // Change Color Popup
  document.getElementById("newBoardColorLabel").style.color = "#" + boardColor;
  document.getElementById("changeColorBtn").style.backgroundColor = "#" + boardColor;
  document.getElementById("changeColorBtn").style.color = "#" + textColor;
  document.getElementById("cancelNewBoardColor").style.color = "#" + boardColor;
  //Menu and Dropdown Options
  document.getElementById("menuButton").style.backgroundColor = "#" + boardColor;
  document.getElementById("menuButton").style.color = "#" + textColor;
  document.getElementById("menuDropdown").style.backgroundColor = "#" + boardColor;
  document.getElementById("addList").style.color = "#" + textColor;
  document.getElementById("changeBoardColor").style.color = "#" + textColor;
  document.getElementById("overdueWork").style.color = "#" + textColor;
  document.getElementById("todaysWork").style.color = "#" + textColor;
  document.getElementById("reset").style.color = "#" + textColor;
  document.getElementById("overdueWork").style.color = "#" + textColor;
  document.getElementById("weeklyPlanner").style.color = "#" + textColor;

  /* The following loop will create the HTML code necessary to generate all the lists in the main page */
  for (let i = 0; i < NUM_OF_LISTS; i++)
  {
    // Get the list name and index
    let listName = data.lists[i].listName; 
    let index = data.lists[i].index;

    /* The following code concatenates the HTML necessary to create the lists */
    output += `
    <div class="mdl-cell mdl-cell--4-col">
    <div class = "w3-panel mdl-shadow--2dp mdl-grid mdl-cell--12-col" style = "border-radius: 8px; margin-top: 50px; width: 330px;" ondblclick = "viewList(${i})">
        <div class="mdl-cell mdl-cell--12-col">
            <div class = "list-buttons">
                <button class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-js-ripple-effect" id = "addToList${i}" style = "background-color:transparent; color:#${boardColor}; box-shadow: none;" onclick = "newItem(${index})"><i class="material-icons">add</i></button>
                <button class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-js-ripple-effect" id = "editList${i}" style = "background-color:transparent; color:#${boardColor}; box-shadow: none;"><i class="material-icons">edit</i></button>
                <button class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-js-ripple-effect" id = "deleteList${i}" style = "background-color:transparent; color:#${boardColor}; box-shadow: none;" onclick = "deleteList(${index})"><i class="material-icons">clear</i></button>
            </div><br>
            <div class = "list-title">
                <p onclick="this.contentEditable=true;this.className='inEdit';" onblur="this.contentEditable=false;this.className='toDoList';" contenteditable="false" class="toDoList" id = "listName${i}" style = "font-size: 25px; font-weight:bold; text-align: center;" onKeyPress="listNameEntered(event, this)">${listName}</p>
            </div>
        </div>
        <div class="mdl-grid" id="listBody" style ="margin-left: 0px;">
            <div class="mdl-cell mdl-cell--12-col">`;

    determineSection(data, index) //Orangise the three different sections
    /*Check if there are any overdue items*/
    if (data.lists[i].overdueItemsLength > 0) 
    {
      //Add the header of the section
      output += `<div class = "list-body-to-do"><h6 style = "margin-top: 0px;">Overdue:</h6><div id = "overdueList${i}">`; 
      // Go through every item in the overdue and add them to output
      for(let k = 0; k < data.lists[i].overdueItemsLength; k++)
      {
        let itemName = data.lists[i].overdueItems[k].itemName;
        let overdueDateAndTime = new Date(data.lists[i].overdueItems[k].itemDueDateAndTime);

          output += `
          <input type="checkbox" id="overDueList${i}Item${k}" onclick = "changeCheckedStatus(overDueList${i}Item${k}, ${i}, ${k}, "board")" disabled>
           <label for="overDueList${i}Item${k}">${itemName}</label>
          <span class="mdl-chip mdl-chip--contact" style = "background: #CE0000;color: white; border-radius: 10px;">
          <span class="mdl-chip__contact mdl-color--teal mdl-color-text--white" style = "border-radius: 10px;">&#128197;</span>
          <span class="mdl-chip__text" style = "font-size: 11px;">${overdueDateAndTime.toDateString()}</span>
          </span><br>`;
      }
      output += `</div></div><br>`; // Closer divs
    }

    /* Check if there are any items due today */
    if (data.lists[i].dueTodayItemsLength > 0) 
    {
      //Add the header of the section
      output += `<div class = "list-body-to-do"><h6>Today:</h6><div id = "todayList">`; 
      // Go through every item in the overdue and add them to output
      for(let k = 0; k < data.lists[i].dueTodayItemsLength; k++)
      {
        let itemName = data.lists[i].dueTodayItems[k].itemName;
        let itemComplete = data.lists[i].dueTodayItems[k].itemComplete;

        // Check if the item is complete or not
        if(itemComplete == true)
        {
          output += `<input type="checkbox" id="dueTodayList${i}Item${k}" onclick = "changeCheckedStatus(dueTodayList${i}Item${k}, ${i}, ${k}, 'board')" checked disabled>`;
        }
        else
        {
          output += `<input type="checkbox" id="dueTodayList${i}Item${k}" onclick = "changeCheckedStatus(dueTodayList${i}Item${k}, ${i}, ${k}, 'board')" disabled>`; 
        }
         
          output += `<label for="dueTodayList${i}Item${k}"> ${itemName}</label><br>`
      }
      output += `</div></div><br>`; // Closer divs
    }

    /* Check if there are any items */
    if (data.lists[i].itemsLength > 0) 
    {
      //Add the header of the section
      output += `<div class = "list-body-to-do"><h6>All Items:</h6><div id = "allItemsList${i}">`; 
      // Go through every item in the overdue and add them to output
      for(let k = 0; k < data.lists[i].itemsLength; k++)
      {
          let itemName = data.lists[i].items[k].itemName;
          let itemComplete = data.lists[i].items[k].itemComplete;

          // Check if the item is complete or not
          if(itemComplete == true)
          {
            output += `<input type="checkbox" id="allList${i}Item${k}" onclick = "changeCheckedStatus(allList${i}Item${k}, ${i}, ${k}, 'board')" checked>`;
          }
          else
          {
            output += `<input type="checkbox" id="allList${i}Item${k}" onclick = "changeCheckedStatus(allList${i}Item${k}, ${i}, ${k}, 'board')">`; 
          }

          output += `<label for="allList${i}Item${k}"> ${itemName}</label><br>`;
      }
      output += `</div></div><br>`; // Closer divs
    }

    // Close all the final divs 
    output +=`</div></div></div></div>`;
  }

  listDisplayRef.innerHTML = output; // Adds the HTML to the actual HTML file
  //Add the items in the list
}

/* Determines the appropriate item sections*/
function determineSection(data, listIndex)
{
  const NUM_OF_ITEMS = data.lists[listIndex].itemsLength;
  let dueTodaySection = [], overdueSection = [];

  /*The following loops through all the items in one list and classifies them as past due date or due today */
  for(let i = 0; i < NUM_OF_ITEMS; i++)
  { 
    // Obtain the date and time
    let itemData = data.lists[listIndex].items[i].itemDueDateAndTime;
    //Extract the date  FORMAT: 2020-10-15T22:39"
    let itemDueDate = Date.parse(itemData);
    let today = new Date();
    let todayDateAndTimeInMili = Date.parse(today);
    let dateAsString = `${today.getFullYear()}-${("0" + (1 + today.getMonth())).slice(-2)}-${("0" + today.getDate()).slice(-2)}T00:00:00`;
    let todayDateInMili = Date.parse(dateAsString)
    let tomorrowDateInMili = todayDateInMili + 86400000;
    let itemComplete = data.lists[listIndex].items[i].itemComplete;

    // Check if the item was already due and has not been complete
    if(todayDateAndTimeInMili > itemDueDate && itemComplete == false)
    {
      overdueSection.push(data.lists[listIndex].items[i]);
    }
    // Check if the item is due today
    else if( itemDueDate >= todayDateInMili && itemDueDate <= tomorrowDateInMili)
    {
      dueTodaySection.push(data.lists[listIndex].items[i]);
    }
  }

  // update the due today and overdue lists
  data.lists[listIndex].dueTodayItems = dueTodaySection; 
  data.lists[listIndex].overdueItems = overdueSection;

}

/* Creates a new list*/
function createNewList()
{
  // Obtain the List Name
  let newListNameRef = document.getElementById("newListName");
  let listName = newListNameRef.value;

  //Check if the user left the list blank
  if (newListNameRef.value == "")
  { 
    alert('Please Fill out a List Name'); 
    return;
  }
  else
  {
    newList() // Get rid of the popup
    let index = userBoard.listLength;
    //Add the new list to array
    userBoard.addList(listName, index)
    // Update local storage
    updateLocalStorage(userBoard);
    displayList(userBoard);
    
  }
}

/*Deletes a list*/
function deleteList(listIndex)
{
  // Confirm that the user want's to delete the List
  let confirmDeletion = confirm("Are you sure you want to delete this List? If so, press 'Ok', otherwise, press 'Cancel'."); 

  if (confirmDeletion === true)
  {
      //Remove the list
      userBoard.removeList(listIndex)
      //Update Local storage
      updateLocalStorage(userBoard);

      // Inform the user of the successful deletion
      alert("The list was successfully deleted.")
      displayList(userBoard)
  }
  else
  {
      // Inform the user of the unsuccessful deletion
      alert("The list was not deleted.");
  }
}

/* Checks if the enter key is pressed in the new list popup */
document.getElementById("newListName").onkeypress = function(e){
  if (!e) e = window.event;
  let keyCode = e.keyCode || e.which;
  if (keyCode == '13'){
    // Enter pressed
    createNewList();
  }
}

/* Checks if the enter key is pressed in the main board */
function listNameEntered(e, textarea){
  let code = (e.keyCode ? e.keyCode : e.which);
  if(code == 13) { //Enter keycode
    textarea.contentEditable = "false";;
  }
}

/*Creates and Valdiates a new item in memory */
function createNewItem(listIndex)
{
  // Extract all the data
  let newItemNameRef = document.getElementById("newItemName");
  let newItemContentRef = document.getElementById("newItemContent");
  let newItemDueDateRef = document.getElementById("newItemDueDate");
  let itemLinkRef = document.getElementById("itemLink");
  let newItemDurationRef = document.getElementById("newItemDuration");
  let repeatingItemRef = document.getElementById("repeatingItem");
  let notRepeatingItemRef = document.getElementById("notRepeatingItem");

  // Get the item values
  let itemName = newItemNameRef.value;
  let itemContent = newItemContentRef.value; 
  let itemLink =  itemLinkRef.value;
  let itemDueDateAndTime = newItemDueDateRef.value;
  let itemDuration = newItemDurationRef.value;
  let repeatingItemChecked = repeatingItemRef.checked;
  let notRepeatingItemChecked = notRepeatingItemRef.checked;
  let itemComplete = false;

  //Check if the user left the list blank
  if (itemName == "" || (repeatingItemChecked == false && notRepeatingItemChecked == false))
  { 
    alert('Please Fill out the item details. In particular the name and if it is a repeating item that will be used in the future.'); 
    return;
  }
  else
  {
    newItem() // Get rid of the popup
    //Determine if it is a repeating item or not
    if (repeatingItemChecked == true)
    {
      //Add the new item to array
      userBoard.lists[listIndex].addItem(itemName, itemContent, itemLink, itemDueDateAndTime, itemDuration, repeatingItemChecked, itemComplete)
    }
    else
    {
      //Add the new item to array
      userBoard.lists[listIndex].addItem(itemName, itemContent, itemLink, itemDueDateAndTime, itemDuration, notRepeatingItemChecked, itemComplete)     
    }

    // Update local storage
    updateLocalStorage(userBoard);
    displayList(userBoard)
  }

}

/*The following runs when the page opens*/
displayList(userBoard)