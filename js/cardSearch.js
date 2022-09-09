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

        const manaArray = manaCost.split("");
        manaArray.join();

        console.log(manaArray);
        //console.log(manaArray[0]);
        //console.log(manaArray[1]);
        //console.log(manaArray[2]);
        //console.log("---");
        //console.log(manaArray.length);

        let i = 0;
        let l = 0;
        let arrPos = 0;
        var symbolArray = [];

        for(i; i<manaArray.length; i++){
            //console.log(i+" - i number")
            if (manaArray[i] == "{") {
                arrPos = i;
                //console.log(arrPos+" - arrPos");
            }
            if (manaArray[i] == "}") {
                console.log(l+" - l iteration");
                symbolArray[l] = manaArray.slice(arrPos,(i+1));
                l+=1;
            }
        }

        //for(let m=0; m<symbolArray.length; m++){
        //    console.log(symbolArray[m]);
        //    console.log("---");
        //}
        console.log(symbolArray);

        //searchCard(searchURL, "GET", function(respJson){
        //    
        //});

        
        document.getElementById("cardName").innerHTML = cardName;
        document.getElementById("manaCost").innerHTML = manaCost;
        document.getElementById("cardType").innerHTML = cardType;
        document.getElementById("cardImg").src = cardImg;
    });

   });