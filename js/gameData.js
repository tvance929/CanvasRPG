
//If I need to pass information into it (such as a constructor would have done) I can simply write a 
//public function 'this.publicFunction = function (foo, bar, foo){}  and set properties this way.
var gameData = new function () {

    //    var internalFunction = function () {

    //    };

    //May need this later 
    this.init = function () {
    };

    this.storageAvailable = function () {
        if (typeof (Storage) !== "undefined") {
            return true;
        }
        else {
            return false;
        }
    };

    this.hasSavedGame = function () {
        return localStorage.characterName;
    }

    this.getFromStorage = function (key, isJSON) {

    }

    this.saveGame = function () {
        try {
            localStorage.characterName = thePlayer.getName();
            localStorage.characterStr = 10;
            localStorage.characterDex = 12;
            localStorage.characterPty = 14;
            return true;
        } catch (e) {
            alert(e);
            return false;
        }
    }

    this.deleteSavedGame = function () {
        try {
            delete localStorage["characterName"];
            return true;
        } catch (e) {
            alert(e);
            return false;
        }
    }



    this.getSavedGameInfo = function () {
        return localStorage.savedGame;
    }

    this.getSavedPlayerName = function () {
        return localStorage.characterName;
    }

    this.createSavedPlayer = function (callbackFunction) {
        thePlayer = new player(localStorage.characterName);
        thePlayer.strength = localStorage.characterStr;
        thePlayer.dexterity = localStorage.characterDex;
        thePlayer.piety = localStorage.characterPty;
        callbackFunction();
    }
};



//JQUERY WAY
//Self-Executing Anonymous Func: Part 2 (Public & Private)
//(function (skillet, $, undefined) {
//    //Private Property
//    var isHot = true;

//    //Public Property
//    skillet.ingredient = "Bacon Strips";

//    //Public Method
//    skillet.fry = function () {
//        var oliveOil;

//        addItem("\t\n Butter \n\t");
//        addItem(oliveOil);
//        console.log("Frying " + skillet.ingredient);
//    };

//    //Private Method
//    function addItem(item) {
//        if (item !== undefined) {
//            console.log("Adding " + $.trim(item));
//        }
//    }
//} (window.skillet = window.skillet || {}, jQuery));

