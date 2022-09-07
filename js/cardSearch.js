function searchCard(url, methodType, callback){
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
        var cardNameSearch = document.getElementById("userInput").value;
        console.log(cardNameSearch);

       //var root="https://api.magicthegathering.io/v1/";
       var root="https://api.scryfall.com/cards/search?";
       var cardSearchParam = "q=";

       var searchURL = root+cardSearchParam+cardNameSearch;
       console.log(searchURL);

    searchCard(searchURL, "GET", function(respJson){
        var cardName = respJson.data[0].name;
        var manaCost = respJson.data[0].mana_cost;
        var cardType = respJson.data[0].type_line;
        var cardImg = respJson.data[0].image_uris.normal;

        console.log(manaCost);
        
        document.getElementById("cardName").innerHTML = cardName;
        document.getElementById("manaCost").innerHTML = manaCost;
        document.getElementById("cardType").innerHTML = cardType;
        document.getElementById("cardImg").src = cardImg;
    });

   });