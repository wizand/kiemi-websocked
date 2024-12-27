var prevPage = "NaN";
var currentPage = "NaN";
var MAX_PAGE = 3;
var currentPageIndex = 1;
var currentPageContentHolder = null;
var swipeDirection = null;

/**
 * Helper function that is triggered from the animationend -event when the container is 
 * supposedly moved out.
 * @param {*} contentElement 
 */
function removeContainer() {
    console.log("Removing " + this);
    this.remove();
}

/**
 * Helper function to remove the coming-in animation classes
 * @param {*} contentElement 
 */
function removeMoveInClasses(contentElement) {
    if ( contentElement.classList.contains("moveContentInFromLeft") ) {
        contentElement.classList.toggle("moveContentInFromLeft");
        console.log("Removed moveContentInFromLeft");
    }
    if ( contentElement.classList.contains("moveContentInFromRight") ) {
        contentElement.classList.toggle("moveContentInFromRight");
        console.log("Removed moveContentInFromRight");
    }
}

/**
 * Helper function to add the correct going-out animation depending on the swipe dir
 * @param {*} contentElement 
 */
function addMoveOutClasses(contentElement) {
    if ( swipeDirection == SWIPE_DIR.TO_RIGHT) {
        contentElement.classList.toggle("moveContentOutToRight");
    } else if ( swipeDirection == SWIPE_DIR.TO_LEFT) {
        contentElement.classList.toggle("moveContentOutToLeft");
    }
}

/**
 * Helper function to add the correct coming-in animation depending on the swipe dir
 * @param {*} contentElement 
 */
function addMoveInClasses(contentElement) {
    if ( swipeDirection == SWIPE_DIR.TO_RIGHT) {
        contentElement.classList.toggle("moveContentInFromLeft");
        console.log("Swiped from " + swipeDirection + " so moving in from left");
   } else if ( swipeDirection == SWIPE_DIR.TO_LEFT) {
    contentElement.classList.toggle("moveContentInFromRight");
       console.log("Swiped from " + swipeDirection + " so moving in from right");
   }
}

/**
 * Changes the inner container element with the one that lies wihing the contentObjects[nextPAge].
 * 
 * Animates the going-out of the previos element and coming-in of the new element taking in to
 * the account the direction from where the order ("swipe") came from.
 * 
 * @param {*} nextPage Indicates the next page container index
 */
function changePageTo(nextPage) {
    console.log("PM:changePageTo: changing page to nextPage=["+nextPage+"]");

    //Make sure there is content to move out.
    if ( currentPageContentHolder != null ) {
        
        currentPageContentHolder.runOnExit();
        var contentElement = document.getElementById(currentPageContentHolder.contentDivName);
        
        removeMoveInClasses(contentElement);
        addMoveOutClasses(contentElement);
        
        contentElement.addEventListener("animationend",removeContainer);
    }

    currentPageContentHolder = contentObjects[currentPage];  
    document.getElementById("pagecontainer").appendChild(currentPageContentHolder.getDivContent());

    currentPageContentHolder.runOnEntry();

    var newContentElement = document.getElementById(currentPageContentHolder.contentDivName);
    addMoveInClasses(newContentElement);
}

/**
 * Middleware function to connect the page index to the actual page name. Can be called to jump
 * directly to an page. "Page" in this context means the content div, not the html document.
 * @param {*} nextPageIndex 
 */
function changePageDirectlyTo(nextPageIndex) {
    prevPage = currentPage;
    currentPageIndex = nextPageIndex;
    currentPage = "page_index_" + currentPageIndex;
    changePageTo(currentPage);
}

/**
 * Function that will update the state of the page actions. F.ex. the swipe direction and 
 * current & prev page index etc before triggering the actual page content change.
 * 
 * Note that in this context the "page" is actually the content div withing the page. "Page" in the 
 * sense of html document is the same.
 * @param {*} direction 
 */
function changePageToDirection(direction) {
    prevPage = currentPage;
    if ( direction == commands.LEFT ) {
        swipeDirection = SWIPE_DIR.TO_LEFT;
        currentPageIndex = currentPageIndex -1;
        if ( currentPageIndex < 1 ) {
            currentPageIndex = MAX_PAGE; 
        }
    } else if ( commands.RIGHT ) {
        swipeDirection = SWIPE_DIR.TO_RIGHT
        currentPageIndex = currentPageIndex + 1;
        if ( currentPageIndex > MAX_PAGE ) 
        {
            currentPageIndex = 1
        }
    }


    console.log("PM:changePageToDirection: changing page to " + direction + "prevPage=["+prevPage+"] currentPage=["+currentPage+"]");
    changePageDirectlyTo(currentPageIndex);
}