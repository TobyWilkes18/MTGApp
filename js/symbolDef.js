function searchSymbol(url, methodType, callback){
    $.ajax({
       url : url,
       headers: {
       },
       method : methodType,
       dataType : "json",
       success : callback,
       error : function (reason, xhr){
       //alert("Player could not be found");
        console.log("error in processing your request", reason);
       }
    });
}

document.getElementById("buttonSearch").addEventListener("click", function(){

   //var root="https://api.magicthegathering.io/v1/";
   var root="https://api.scryfall.com/cards/symbology";

   var searchURL = root;
   console.log(searchURL);

    searchSymbol(searchURL, "GET", function(respJson){
        //var cardName = respJson.data[0].name;
        //var manaCost = respJson.data[0].mana_cost;
        //var cardType = respJson.data[0].type_line;
        //var cardImg = respJson.data[0].image_uris.normal;

        //console.log(manaCost);
        
        //document.getElementById("cardName").innerHTML = cardName;
        //document.getElementById("manaCost").innerHTML = manaCost;
        //document.getElementById("cardType").innerHTML = cardType;
        //document.getElementById("cardImg").src = cardImg;

        var value = document.getElementById("manaCost").innerHTML;
        console.log(value);
    }); 

});