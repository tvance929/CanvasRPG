var interface = new function () {
    this.fillInfo = function () {
        if (thePlayer) {
            $("#infoInfo").html("");
            //$("#infoAccordion").show();
        }
        //Physical section
        $("#infoName").html(thePlayer.getName());
        $("#infoLevel").html(thePlayer.level);
        $("#infoLifePoints").html(thePlayer.lifePoints);
        $("#infoXP").html(thePlayer.xp);
        $("#infoStr").html(thePlayer.strength);
        $("#infoDex").html(thePlayer.dexterity);
        $("#infoPty").html(thePlayer.piety);

        //Weapons section
        $("#infoSword").html(thePlayer.sword);
        $("#infoDagger").html(thePlayer.dagger);
        $("#infoStaff").html(thePlayer.staff);
        $("#infoBow").html(thePlayer.bow);
        $("#infoDual").html(thePlayer.dualWield);
    };

    this.initInfo = function () {
        $("#infoInfo").html("Please create a new character.");
        //$("#infoAccordion").hide();
        $(".characterLabels").html(" ");
    }
};