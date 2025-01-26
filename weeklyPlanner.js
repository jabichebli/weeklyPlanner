
/*Generate the Table*/
function generateWeeklyTable()
{
    let thisWeeksSectionRef = document.getElementById("thisWeeksSection");
    let output = "";
    let date = ["Monday", "Tuesday", "Wednesday","Thursday","Friday","Saturday","Sunday"];

        // Run through the loop for all AM times and all PM times
    for(let i = 0; i < date.length; i++)
    {
        output += `<div class="mdl-cell mdl-cell--4-col"><h4>${date[i]}</h4>
        <div class = "w3-panel mdl-shadow--2dp mdl-grid mdl-cell--12-col day-list board-panel" style = "background-color: #383838; border-radius: 4px; margin-top: 0px; width: auto; height: auto; position: relative; min-height: 40px;border-top-right-radius: 0px;border-top-left-radius: 0px;padding-bottom: 30px;" id = "toDoListItems"  ondrop="drop(event)" ondragover="allowDrop(event)"></div>
        </div>`;
    }

    //Generate the table 
    thisWeeksSectionRef.innerHTML += output;
}

/*Generate To Do List Items*/
function generateToDoListItems()
{
    // Define the element that will have html modified
    let toDoListItemsRef = document.getElementById("toDoListItems");
    let output = "";
    let boardTextColor = userBoard.textColor;
    let boardName = userBoard.boardTitle;

    document.getElementById("boardName").innerHTML = `${boardName}`;
    
    // Go through every list
    for(let i = 0; i < userBoard.listLength; i++)
    {
        //Obtain the list name
        let listName = userBoard.lists[i].listName;
        
        // Check if there are any items in the list
        if(userBoard.lists[i].itemsLength != 0)
        {
            output += `<button class = "collapsible"><h6 style = "text-decoration: underline; font-weight: bold; color: #${boardTextColor};">${listName}</h6></button><div class="content" ondrop="drop(event)" ondragover="allowDrop(event)">`;
        }
        // Go through every item
        for(let k = 0; k < userBoard.lists[i].itemsLength; k++)
        {
            //Obtain the item name and item due date
            let itemName = userBoard.lists[i].items[k].itemName;
            let itemDueDate = userBoard.lists[i].items[k].itemDueDateAndTime;
            let itemDuration = userBoard.lists[i].items[k].itemDuration;
            let dueDateAndTime = new Date(itemDueDate);
            
            // Check if there is a due date
            if(dueDateAndTime == "")
            {
              // if there is no due date 
                output += `<div class="list-item" id = "list${i}item${k}" draggable="true" ondragstart="drag(event)"><p style = "font-weight:bold; margin-bottom: 0px;">${itemName}<p></div><br>`;
            }
            else if((dueDateAndTime == "") && (itemDuration == "00:00" || itemDuration == ""))
            {
              // If there is no due date and duration
                output += `<div class="list-item" id = "list${i}item${k}" draggable="true" ondragstart="drag(event)"> <p style = "font-weight:bold; margin-bottom: 0px;">${itemName}<br> <span class="mdl-chip mdl-chip--contact" style = "background: #CE0000;color: white; border-radius: 10px;">
                <span class="mdl-chip__contact mdl-color--teal mdl-color-text--white" style = "border-radius: 10px;">&#128197;</span>
                <span class="mdl-chip__text" style = "font-size: 11px;">${dueDateAndTime.toDateString()}</span>
                </span></p></div>`;
            }
            else
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
              // Adds the item
              output += `<div class="list-item" id = "list${i}item${k}" draggable="true" ondragstart="drag(event)"><div><a onclick = " viewList(${i})" class = "list-name" id = "listName" name = "listIndex">${listName}</a></div>&nbsp;<p style = "font-weight:bold; margin-bottom: 0px;"><input type="checkbox" id="weeklyItem${k}List${i}"><label for="weeklyItem${k}List${i}">${itemName}</label><br> <span class="mdl-chip mdl-chip--contact" style = "background: #CE0000;color: white; border-radius: 10px;">
                <span class="mdl-chip__contact mdl-color--teal mdl-color-text--white due-date" style = "border-radius: 10px;">&#128197;</span>
                <span class="mdl-chip__text" style = "font-size: 11px;">${dueDateAndTime.toDateString()}</span>
                </span>&nbsp;<span class="mdl-chip mdl-chip--contact" style = "background: #EFAD00; border-radius: 10px;">
                <span class="mdl-chip__contact mdl-color--teal mdl-color-text--white duration-time" style = "border-radius: 10px;">&#9202;</span>
                <span class="mdl-chip__text" style = "font-size: 11px;background-color: #EFAD00; color: white;">${duration}</span></span>
                </p></div>`;
            }
        }
        output += `<br><br><br></div>`;
    }

    toDoListItemsRef.innerHTML = output;

    //Update the SAVED_KEY
    localStorage.getItem(SAVED_KEY, "dataReset");
}

/*The following sets the board colors */
function generateBoardColor()
{
    let boardColor = userBoard.boardColor;
    let textColor = userBoard.textColor;
  
    /*Change the board Header and Menu*/
    //Header and Header Title
    document.getElementById("boardHeader").style.backgroundColor = "#" + boardColor;
    document.getElementById("boardName").style.color = "#" + textColor;
    //Menu and Dropdown Options
    document.getElementById("menuButton").style.backgroundColor = "#" + boardColor;
    document.getElementById("menuButton").style.color = "#" + textColor;
    document.getElementById("menuDropdown").style.backgroundColor = "#" + boardColor;
    document.getElementById("board").style.color = "#" + textColor;
    document.getElementById("todaysWork").style.color = "#" + textColor;
    document.getElementById("reset").style.color = "#" + textColor;
    document.getElementById("overdueWork").style.color = "#" + textColor;
  
}

/*The following code makes the items draggable and droppable */
function allowDrop(ev) {
    ev.preventDefault();
}
  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}
  function drop(ev) {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
    saveWeeklyPlanner();
}

/*The following function saves the weekly planner */
function saveWeeklyPlanner()
{
  // Get the HTML
  let toDoListItemsRef = document.getElementById("toDoListItems");
  let thisWeeksSectionRef = document.getElementById("thisWeeksSection");
  let weeklyPlanner = JSON.stringify([toDoListItemsRef.innerHTML,thisWeeksSectionRef.innerHTML]);

  //Save the HTML to memory
  localStorage.setItem(WEEKLY_PLANNER_DATA_KEY, weeklyPlanner)
  localStorage.setItem(SAVED_KEY, "savedData");
}

/*The following function determines whether a reset new display should be shown or a saved one */
function determineDisplay()
{
  //Check if there is anything saved
  let savedOrNot = localStorage.getItem(SAVED_KEY);
  if (savedOrNot == "savedData")
  {
    let weeklyPlanner = JSON.parse(localStorage.getItem(WEEKLY_PLANNER_DATA_KEY)); // Get the weekly planner code
    document.getElementById("toDoListItems").innerHTML = weeklyPlanner[0]; //Display the weekly planner
    document.getElementById("thisWeeksSection").innerHTML = weeklyPlanner[1];
  }
  else
  {
    //reset and display the items 
    document.getElementById("toDoListItems").innerHTML =  "";
    document.getElementById("thisWeeksSection").innerHTML = "";
    generateToDoListItems();
    generateWeeklyTable();
  }
}

/*The following resets the board*/
function resetWeeklyPlanner()
{
  let confirmation = confirm("Are you sure you want to reset the board?")

  //Check if the user has confirmed reset
  if(confirmation == true)
  {
    localStorage.setItem(SAVED_KEY, "resetData");
    location.reload();
  }
  
}

/*The following runs when the page loads*/
generateBoardColor();
determineDisplay();

/*The following code makes the divs collapsable */
let coll = document.getElementsByClassName("collapsible");
for (let i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    } 
  });
}