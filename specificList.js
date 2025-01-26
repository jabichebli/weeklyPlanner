/*The following function lets the user if the repeating item property*/
function toggleRepeatingItem(listIndex, itemIndex)
{
    // Determine if the item is repeating or not
    let repeatingItemButtonRef = document.getElementById(`repeatingItemButtonList${listIndex}Item${itemIndex}`);
    let repeatingItem = repeatingItemButtonRef.outerText;

    //Check if the item is on or off (repeating or not)
    if (repeatingItem == "toggle_off") // Check if the item is not repeatable
    {
        //Change the userboard
        userBoard.lists[listIndex].items[itemIndex].repeatingItem = true;
        //Update Local Storage
        updateLocalStorage(userBoard);
        //re-do the display
        displayItems()
    }
    else // Check if the item is repeatable
    { 
        //Change the userboard
        userBoard.lists[listIndex].items[itemIndex].repeatingItem = false;
        //Update Local Storage
        updateLocalStorage(userBoard);
        //re-do the display
        displayItems()
    }
}

/*The following functions lets the user remove the due date */
function removeDueDate(listIndex, itemIndex)
{
    //Confirm if the user wants to remove the due date
    let confirmRemoval = confirm("Are you sure you want to remove the due date set?");

    // Check if the user wants to confirm the deletion of the due date
    if(confirmRemoval === true)
    {
        //Remove the due date
        userBoard.lists[listIndex].items[itemIndex].itemDueDateAndTime = "";
        //Update Local Storage
        updateLocalStorage(userBoard);
        //re-do the display
        displayItems()
        
    }
}

/*The following function lets the user remove the duration */
function removeDuration(listIndex, itemIndex)
{
    //Confirm if the user wants to remove the duration
    let confirmRemoval = confirm("Are you sure you want to remove the duration set?");

    // Check if the user wants to confirm the deletion of the duration set
    if(confirmRemoval === true)
    {
        //Remove the duration
        userBoard.lists[listIndex].items[itemIndex].itemDuration = "";
        //Update Local Storage
        updateLocalStorage(userBoard);
        //re-do the display
        displayItems()
        
    }
}

/*The following function displays the overdue items*/
function displayItems()
{
    let listIndex = localStorage.getItem(LIST_INDEX_KEY);
    let boardColor = userBoard.boardColor;
    let textColor = userBoard.textColor;

    /*Change the board Header and Menu*/
    //Header and Header Title
    document.getElementById("boardHeader").style.backgroundColor = "#" + boardColor;
    document.getElementById("boardName").style.color = "#" + textColor;
    //Edit Item Popup
    document.getElementById("newItemLabel").style.color = "#" + boardColor;
    document.getElementById("newItemContentLabel").style.color = "#" + boardColor;
    document.getElementById("newItemDueDateLabel").style.color = "#" + boardColor;
    document.getElementById("itemLinkLabel").style.color = "#" + boardColor;
    document.getElementById("newItemDurationLabel").style.color = "#" + boardColor;
    document.getElementById("repeatingItemHeader").style.color = "#" + boardColor;
    document.getElementById("editItemBtn").style.backgroundColor = "#" + boardColor;
    document.getElementById("editItemBtn").style.color = "#" + textColor;
    document.getElementById("cancelEditItem").style.color = "#" + boardColor;
    //Menu and Dropdown Options   
    document.getElementById("menuButton").style.backgroundColor = "#" + boardColor;
    document.getElementById("menuButton").style.color = "#" + textColor;
    document.getElementById("menuDropdown").style.backgroundColor = "#" + boardColor;
    document.getElementById("board").style.color = "#" + textColor;
    document.getElementById("overdueWork").style.color = "#" + textColor;
    document.getElementById("todaysWork").style.color = "#" + textColor;
    document.getElementById("reset").style.color = "#" + textColor;
    document.getElementById("weeklyPlanner").style.color = "#" + textColor;


    let sectionItemsRef = document.getElementById("sectionItems");
    let output = "";

    //Go through every item 
    for(let i = 0; i <userBoard.lists[listIndex].itemsLength; i++)
    {
        //Obtain the items due date
        let dueDateRef = userBoard.lists[listIndex].items[i].itemDueDateAndTime;
        //Convert the due date to miliseconds
        let dueDate = Date.parse(dueDateRef);
        let listName = userBoard.lists[listIndex].listName;
        let boardName = userBoard.boardTitle;
        let itemComplete = userBoard.lists[listIndex].items[i].itemComplete; // Get if the item is complete
        let link = userBoard.lists[listIndex].items[i].itemLink; // Get the link provided
        let itemDuration = userBoard.lists[listIndex].items[i].itemDuration; // Get the duration
        let repeatingItem = userBoard.lists[listIndex].items[i].repeatingItem; // Get the repeating item
        let content = userBoard.lists[listIndex].items[i].content;
        let itemName = userBoard.lists[listIndex].items[i].itemName;
        
        document.getElementById("boardName").innerHTML = `${boardName}`;
        document.getElementById("boardPage").innerHTML = `&nbsp;|&nbsp;${listName}`;
        //Display the item
        output += ` 
        <div class = "overdueItem mdl-cell mdl-cell--12-col" ondblclick = "editItem(${listIndex},${i})" id = "list${listIndex}item${i}">
            <!--Item buttons-->
            <div class = "item-buttons" >
                <button class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-js-ripple-effect" id = "editItem" style = "background-color:transparent; color:#${boardColor}; box-shadow: none;" onclick = "editItem(${listIndex},${i})"><i class="material-icons">edit</i></button>
                <button class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-js-ripple-effect" id = "deleteItem" style = "background-color:transparent; color:#${boardColor}; box-shadow: none;" onclick = "removeItem(${listIndex},${i})"><i class="material-icons">clear</i></button>
            </div><!--Overdue Item Name-->`;

        // Check if the item is complete or not
        if (itemComplete == true)
        {
            output += `<h5><input type="checkbox" id="overDueItem${i}List${listIndex}" style = "transform: scale(2); display: inline; float: left;" onclick = "changeCheckedStatus(overDueItem${i}List${listIndex}, ${listIndex}, ${i}, 'display')" checked>
            <label for="overDueItem${i}List${listIndex}">&nbsp;${itemName}</label></h5>`;
        }
        else 
        {
            output += `<h5><input type="checkbox" id="overDueItem${i}List${listIndex}" style = "transform: scale(2);" onclick = "changeCheckedStatus(overDueItem${i}List${listIndex}, ${listIndex}, ${i}, 'display')">
            <label for="overDueItem${i}List${listIndex}">&nbsp;${itemName}</label></h5>`;
        }

        
            //Check if content is defined 
        if(content !== "undefined" && content !== undefined && content != "")
        {
            output += `<!--Overdue Item Content-->
            <h6>${content}
            </h6>`;
        }
        
        //Check if there is a link
        if (link != "undefined" && link != "")
        {
            output += `<p><span style = "text-decoration: underline;">Link:</span><a href = "${link}" target="_blank">&nbsp;${link}</a><br></p>`;
        }

        //Display the due date
        output += ` <!--Due Date Icon-->
            <span class="mdl-chip mdl-chip--contact mdl-chip--deletable" style = "background: #CE0000;color: white; border-radius: 10px;">
                <span class="mdl-chip__contact mdl-color--teal mdl-color-text--white due-date" style = "border-radius: 10px; background-color: #A60303 !important;">&#128197;</span>
                <span class="mdl-chip__text" style = "font-size: 11px;">${new Date(dueDate).toLocaleString()}</span>
                <a href="#" class="mdl-chip__action"><i class="material-icons" style = "background-color:transparent; color:white;" onclick = "removeDueDate(${listIndex},${i})">cancel</i></a>
            </span>&nbsp;`;

        // Check if there is a duration 
        if(itemDuration != "00:00" && itemDuration != "" )
        {
            // if there is a due date and duration
            // Check for the 0's
            let duration = "";
            if (itemDuration[0] == "0" && itemDuration[1] == "0")
            {
                duration = `${itemDuration[3]}${itemDuration[4]} min`;
            }
            else if(itemDuration[3] == "0" && itemDuration[4] == "0")
            {
                duration = `${itemDuration[0]}${itemDuration[1]} hrs`;
            }
            else
            {
                duration = `${itemDuration[0]}${itemDuration[1]} hrs ${itemDuration[3]}${itemDuration[4]} min`;
            }

            output += `<!--Duration Icon-->
            <span class="mdl-chip mdl-chip--contact mdl-chip--deletable" style = "background: #EFAD00; border-radius: 10px;">
                <span class="mdl-chip__contact mdl-color--teal mdl-color-text--white duration-time" style = "border-radius: 10px; background-color: #CD9500 !important;">&#9202;</span>
                <span class="mdl-chip__text" style = "font-size: 11px;background-color: #EFAD00; color: white;">${duration}</span>
                <a href="#" class="mdl-chip__action"><i class="material-icons" style = "background-color:transparent; color:white;" onclick="removeDuration(${listIndex},${i})">cancel</i></a>
            </span>&nbsp;`;
        }

        
        //Check if the item is a repeating item
        let icon = "";
        let iconText = "";
        if (repeatingItem === true)
        {
            icon = "toggle_on";
            iconText = "Repeating Item";
        }
        else
        {
            icon = "toggle_off";
            iconText = "Not a Repeating Item";
        }

            output +=   `<!--Repeating Item Icon-->
            <span class="mdl-chip mdl-chip--contact mdl-chip--deletable" style = "background: #007713; border-radius: 10px;">
                <span class="mdl-chip__contact mdl-color--teal mdl-color-text--white duration-time" style = "border-radius: 10px; background-color: #006410 !important;">&#10227;</span>
                <span class="mdl-chip__text" style = "font-size: 11px;background-color: #007713; color: white;">${iconText}</span>
                <a href="#" class="mdl-chip__action"><i class="material-icons" style = "background-color:transparent; color:white;" id = "repeatingItemButtonList${listIndex}Item${i}" onclick = "toggleRepeatingItem(${listIndex},${i})">${icon}</i></a>
            </span>
        </div>`;
        
    }

    sectionItemsRef.innerHTML = output;
}

/*The following function will toggle the edit item*/
function editItem(listIndex, itemIndex) 
{
    // The following code activates and disactivates the new list popup box depending on when the function is called
    document.getElementById("editItemPopupMessageBox").classList.toggle("active");
    if (listIndex == "NaN" && itemIndex == "NaN")
    {
        return;
    }
    else
    {
        //Fill out the information
        document.getElementById("newItemName").value = userBoard.lists[listIndex].items[itemIndex].itemName;
        document.getElementById("newItemContent").value = userBoard.lists[listIndex].items[itemIndex].itemContent;
        document.getElementById("itemLink").value = userBoard.lists[listIndex].items[itemIndex].itemLink;
        document.getElementById("newItemDueDate").value = userBoard.lists[listIndex].items[itemIndex].itemDueDateAndTime;
        document.getElementById("newItemDuration").value = userBoard.lists[listIndex].items[itemIndex].itemDuration;

        if (userBoard.lists[listIndex].items[itemIndex].repeatingItem == true)
        {
            document.getElementById("repeatingItem").checked = true;
            document.getElementById("notRepeatingItem").checked = false;
        }
        else
        {
            document.getElementById("notRepeatingItem").checked = true;
            document.getElementById("repeatingItem").checked = false;
        }

    }

    // Check if the button has been clicked 
    document.getElementById('editItemBtn').onclick = function(){
    doEditItem(listIndex, itemIndex);
  }
 
    
}

/*The following function will remove the item*/
function removeItem(listIndex, itemIndex)
{
    //Confirm if the user wants to remove the item
    let confirmRemoval = confirm("Are you sure you want to remove the item?");

    // Check if the user wants to confirm the deletion of the item
    if(confirmRemoval === true)
    {
        //Remove the duration
        userBoard.lists[listIndex].removeItem(itemIndex);
        //Update Local Storage
        updateLocalStorage(userBoard);
        //re-do the display
        displayItems()   
    }
}

/*The following function lets the user edit an item*/
function doEditItem(listIndex, itemIndex)
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

  //Check if the user left the list blank
  if (itemName == "" || (repeatingItemChecked == false && notRepeatingItemChecked == false))
  { 
    alert('Please Fill out the item details. In particular the name and if it is a repeating item that will be used in the future.'); 
    return;
  }
  else
  {
    editItem("NaN","NaN") // Get rid of the popup
    userBoard.lists[listIndex].items[itemIndex].itemName = itemName;
    userBoard.lists[listIndex].items[itemIndex].content = itemContent;
    userBoard.lists[listIndex].items[itemIndex].itemLink = itemLink;
    userBoard.lists[listIndex].items[itemIndex].itemDueDateAndTime = itemDueDateAndTime;
    userBoard.lists[listIndex].items[itemIndex].itemDuration = itemDuration;
    //Determine if it is a repeating item or not
    if (repeatingItemChecked == true)
    {
        userBoard.lists[listIndex].items[itemIndex].repeatingItem = repeatingItemChecked;
    }
    else
    {
        userBoard.lists[listIndex].items[itemIndex].repeatingItem = repeatingItemChecked;
    }

    // Update local storage
    updateLocalStorage(userBoard);
    displayItems();
  }

}

/*The following will run when the page loads */
let pageType = localStorage.getItem(PAGE_TYPE_KEY);
displayItems()
