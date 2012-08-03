var thePlayer;

jQuery(document).ready(function () {
    //First thing, check for storage ability and then saved game.
    if (gameData.storageAvailable()) {
        if (gameData.hasSavedGame()) {
            thePlayer = gameData.createSavedPlayer(interface.fillInfo);  //With callback function!
        }
        else {
            interface.initInfo();
        }
    }
    
 

    $("#infoAccordion").accordion();
    $("#optionsAccordion").accordion();

    $("#btnCreatePlayer").click(function () {
        if ($("#txtPlayerName").val() == "") {
            alert("Need Name");
        }
        else {
            thePlayer = new player($("#txtPlayerName").val());
            alert("You created the player named: " + thePlayer.getName());
            interface.fillInfo();
        }
    });

    $("#btnSaveGame").click(function () {
        if (!thePlayer) {
            alert("You haven't created a player yet.");
        }
        else {
            if (gameData.saveGame()) {
                alert("Game saved");
            }
        }
    });

    $("#btnDeleteGame").click(function () {
        if (!gameData.hasSavedGame()) {
            alert("There is no saved game.");
        }
        else {
            if (gameData.deleteSavedGame()) {
                interface.initInfo();
            }
        }
    });
});


