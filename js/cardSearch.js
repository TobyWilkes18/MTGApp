
/* Ajax Call Prototype */
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

/* Post for data return on input param (Name Search) */
    searchCard(searchURL, "GET", function(respJson){
        var cardName = respJson.data[0].name;
        var manaCost = respJson.data[0].mana_cost;
        var cardType = respJson.data[0].type_line;
        var cardImg = respJson.data[0].image_uris.normal;

/* Cut and shut initial array */
        const manaArray = manaCost.split("");
        manaArray.join();
        //console.log(manaArray):

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
                symbolArray[l] = manaArray.slice(arrPos,(i+1)).join("");
                l+=1;
            }
        }

        console.log(symbolArray);

        var searchURLMana = "https://api.scryfall.com/symbology";

        searchCard(searchURLMana, "GET", function(respJson){
            var manaArrayLength = respJson.data.length;
            console.log(manaArrayLength + "manaArrayLength");
            var manaSave = [];

            for(let m=0; m<symbolArray.length; m++){
                for(let r=0; r<manaArrayLength; r++){
                    if(symbolArray[m]==respJson.data[r].symbol){
                        console.log(respJson.data[r].symbol);
                        manaSave[m] = respJson.data[r].svg_uri;
                    }
                }
            }
            
            console.log(manaSave);

            
            const manaSymbolList = document.getElementById("manaCost");
            while (manaSymbolList.hasChildNodes()) {
                manaSymbolList.removeChild(manaSymbolList.firstChild);
            }


            for(let n=0;n<manaSave.length;n++){
                $(document).ready(function() {
                    var url = manaSave[n];
                    var manaSymbol = new Image();
                    manaSymbol.src = url;
                    manaSymbol.id = "manaSymbol";
                    $('#manaCost').append(manaSymbol).width(30);
                });
            }
        });


        document.getElementById("cardName").innerHTML = cardName;
        //document.getElementById("manaCost").innerHTML = manaCost;
        document.getElementById("cardType").innerHTML = cardType;
        document.getElementById("cardImg").src = cardImg;

    });

   });