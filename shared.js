// Constants used as KEYS for LocalStorage
const LIST_INDEX_KEY = "selectedListIndex";
const BOARD_DATA_KEY = "boardLocalData";
const PAGE_TYPE_KEY = "pageTypeData";
const WEEKLY_PLANNER_DATA_KEY = "weeklyPlannerData";
const SAVED_KEY = "savedStatusData";

/*The following are classes: Board, List, Item */
class Board
{
  /*Constructor*/
  constructor(boardTitle = "New Board", boardColor =  "FFB300", textColor = "FFFFFF")
  {
    this._boardTitle = boardTitle;
    this._lists = [];
    this._boardColor = boardColor;
    this._textColor = textColor;
  }

  /*Accessor*/
  get boardTitle()
  {
    return this._boardTitle;
  }

  get lists()
  {
    return this._lists;
  }

  get boardColor()
  {
    return this._boardColor;
  }

  get listLength()
  {
    return this._lists.length;
  }

  get textColor()
  {
    return this._textColor;
  }

  /*Mutator*/
  set boardTitle(newBoardTitle)
  {
    this._boardTitle = newBoardTitle;
  }
  
  set boardColor(newColor)
  {
    this._boardColor = newColor;
  }

  set textColor(newTextColor)
  {
    this._textColor = newTextColor;
  }

  /*Method*/
  addList(listName, listIndex)
  {
   // Create a new list
   let list = new List(listName, listIndex); 
   // Add the new list to the board
   this._lists.push(list);
  }

  removeList(listIndex)
  {
    // Remove the List
    this._lists.splice(listIndex, 1);
    //Fix up the indexing for each list proceeding
    for (let i = listIndex; i < this._lists.length; i++)
    {
      let newIndex = this._lists[i].index - 1;
      this._lists[i]._index = newIndex;
    }
  }

  fromData(data)
  {
    // Board Title and Color are not an array while Lists is an array
    this._boardTitle = data._boardTitle;
    this._boardColor = data._boardColor;
    this._textColor = data._textColor;

    //Define an empty/clean array 
    this._lists = [];
    // The following loop runs through every list in the data array
    for(let i = 0 ; i < data._lists.length; i++)
    {
        // The following extracts a List from memory and adds it to the empty array
        let list = new List();
        list.fromData(data._lists[i]); 
        this._lists.push(list); 
    }     
  }
}

class List
{
  /*Constructor*/
  constructor(listName, listIndex)
  {
    this._listName = listName;
    this._index = listIndex;
    this._items = [];
    this._dueTodayItems = [];
    this._overdueItems = [];
  }
  
  /*Accessor*/
  get listName()
  {
    return this._listName;
  }
  
  get index()
  {
    return this._index;
  }

  get items()
  {
    return this._items;
  }

  get itemsLength()
  {
    return this._items.length;
  }

  get dueTodayItems()
  {
    return this._dueTodayItems;
  }

  get overdueItems()
  {
    return this._overdueItems;
  }

  get dueTodayItemsLength()
  {
    return this._dueTodayItems.length;
  }

  get overdueItemsLength()
  {
    return this._overdueItems.length;
  }

  /*Mutator*/
  set listName(newListName)
  {
    this._listName = newListName;
  }

  set index(newIndex)
  {
    this._index = newIndex;
  }

  set dueTodayItems(newDueTodayItems)
  {
    this._dueTodayItems = newDueTodayItems;
  }

  set overdueItems(newOverdueItems)
  {
    this._overdueItems = newOverdueItems;
  }

  /*Method*/
  addItem(itemName, itemContent, itemLink, itemDueDateAndTime, itemDuration, repeatingItem, itemComplete)
  {
   // Create a new item
   let item = new Item(itemName, itemContent, itemLink, itemDueDateAndTime, itemDuration, repeatingItem, itemComplete); 
   // Add the new item to the list
   this._items.push(item);
  }

  removeItem(itemIndex)
  {
    // Remove the Item
    this._items.splice(itemIndex, 1);
  }

  fromData(data)
  {
    // Board Title and Color are not an array while Lists is an array
    this._listName = data._listName;
    this._index = data._index;

    //Define an empty/clean array 
    this._items = [];
    // The following loop runs through every list in the data array
    for(let i = 0 ; i < data._items.length; i++)
    {
        // The following extracts a List from memory and adds it to the empty array
        let item = new Item();
        item.fromData(data._items[i]); 
        this._items.push(item); 
    }     
  }
}

class Item
{
  /*Constructor*/
  constructor(itemName, itemContent = "", itemLink = "", itemDueDateAndTime = "", itemDuration = "", repeatingItem = true, itemComplete = false)
  {
    this._itemName = itemName;
    this._content = itemContent;
    this._itemLink = itemLink;
    this._itemDueDateAndTime = itemDueDateAndTime;
    this._itemDuration = itemDuration;
    this._repeatingItem = repeatingItem;
    this._itemComplete = itemComplete;
  }

  /*Accessor*/
  get itemName()
  {
    return this._itemName;
  }

  get content()
  {
    return this._content;
  }

  get itemDueDateAndTime()
  {
    return this._itemDueDateAndTime;
  }

  get itemLink()
  {
    return this._itemLink;
  }

  get itemDuration()
  {
    return this._itemDuration;
  }

  get repeatingItem()
  {
    return this._repeatingItem;
  }

  get itemComplete()
  {
    return this._itemComplete;
  }

  /*Mutator*/
  set itemName(newItemName)
  {
    this._itemName = newItemName;
  }

  set content(newContent)
  {
    this._content = newContent;
  }

  set itemDueDateAndTime(newDueDateAndTime)
  {
    this._itemDueDateAndTime = newDueDateAndTime;
  }

  set itemLink(newItemLink)
  {
    this._itemLink = newItemLink;
  }

  set itemDuration(newItemDuration)
  {
    this._itemDuration = newItemDuration;
  }

  set repeatingItem(newRepeatingItemVerdict)
  {
    this._repeatingItem = newRepeatingItemVerdict;
  }

  set itemComplete(newCompletionVerdict)
  {
    this._itemComplete = newCompletionVerdict;
  }

  /*Method*/
  fromData(data)
  {
    this._itemName = data._itemName;
    this._content = data._itemContent;
    this._itemLink =  data._itemLink;
    this._itemDueDateAndTime = data._itemDueDateAndTime;
    this._itemDuration = data._itemDuration;
    this._repeatingItem = data._repeatingItem;
    this._itemComplete = data._itemComplete;
  }
}

// This function checks if data stored with the keys exists.
function checkIfDataExistsLocalStorage()
{
    // Retrieve the data at the key BOARD_DATA_KEY
    let data = localStorage.getItem(BOARD_DATA_KEY);

    // Checks if data exists, is not null, is not a blank string and is not undefined
    if ((data != "undefined") && (data !== null) && (data !== ""))
    {
        return true;
    }
    else
    {
        return false;
    }

}

// This function stores provided data in local storage at the key BOARD_DATA_KEY
function updateLocalStorage(data)
{

    // Checks if the data is an object (since objects need to be stringified first)
    if (typeof(data) === 'object')
    {
      listData = JSON.stringify(data);
    }

    localStorage.setItem(BOARD_DATA_KEY, listData);
}

// This function retrieves data from local storage at the key BOARD_DATA_KEY.
function getDataLocalStorage()
{
    // Retrieve the data at the key BOARD_DATA_KEY
    let data = localStorage.getItem(BOARD_DATA_KEY);
    
    // Check if the data is an object
    try
    {
      data = JSON.parse(data);
    }
    catch (e)
    {
      console.log(e);
    }
    finally
    {
        return data;
    }

}

// Global LockerList instance variable
let userBoard = new Board();
// check if data exists at the key BOARD_DATA_KEY in local storage
let dataIsValid = checkIfDataExistsLocalStorage();
// check if local storage is available
if (typeof(Storage) !== "undefined")
{
    // Determine if Data is exists or not
    if (dataIsValid === true)
    {
      let data = getDataLocalStorage();
      userBoard.fromData(data);
    }
}


/*Menu Toggle*/
function menuToggle() {
    document.getElementById("menuDropdown").classList.toggle("show"); // When the user clicks on the button, toggle between hiding and showing the dropdown content
  }
  
/* Close Menu */
window.onclick = function(event) {
  // Close the dropdown if the user clicks outside of it
  if (!event.target.matches('#menuButton')) {
    let dropdowns = document.getElementsByClassName("menu-dropdown-content");
    let  i;
    for (i = 0; i < dropdowns.length; i++) {
      let openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

/*Takes the user to the overdue page */
function overduePage()
{
  // Update the key
  localStorage.setItem(PAGE_TYPE_KEY,"overDue");
  //Take the user to another page
  window.location.href = "sectionItems.html";
}

/*Takes the user to the today page */
function todayPage()
{
  // Update the key
  localStorage.setItem(PAGE_TYPE_KEY,"today");
  //Take the user to another page
  window.location.href = "sectionItems.html";
}

/*The following function takes the user to the specific list*/
function viewList(listIndex)
{
  // Update the key
  localStorage.setItem(LIST_INDEX_KEY,listIndex);
  //Take the user to the specific list page
  window.location.href = "specificList.html";
  
}

/*Changes the checked status when an item is complete*/
function changeCheckedStatus(id, listIndex, itemIndex, refreshPage)
{
  // Change the completion status
  userBoard.lists[listIndex].items[itemIndex].itemComplete = document.getElementById(id.id).checked;
  //Update local storage
  updateLocalStorage(userBoard);

  if (refreshPage == "display")
  {
    displayItems();
  }
  else if (refreshPage == "board")
  {
    displayList(userBoard);
  }

}