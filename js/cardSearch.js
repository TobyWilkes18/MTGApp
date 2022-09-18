
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
        console.log("error in processing your request", reason);
       }
    });
   }


/* Master listen on search - Start of main */
   document.getElementById("buttonSearch").addEventListener("click", function(){
        var cardNameSearch = document.getElementById("userInput").value;
        //console.log(cardNameSearch);

       //var root="https://api.magicthegathering.io/v1/"; //Alternate API (Not Supported)
       var root="https://api.scryfall.com/cards/search?"; //Main API (Full support)
       var cardSearchParam = "q=";                        //Search Query Preface

       var searchURL = root+cardSearchParam+cardNameSearch;
       //console.log(searchURL);

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

/* Identify beginning and end of element then flatten*/ 
        for(i; i<manaArray.length; i++){
            //console.log(i+" - i number")
            if (manaArray[i] == "{") {
                arrPos = i;
            }
            if (manaArray[i] == "}") {
                symbolArray[l] = manaArray.slice(arrPos,(i+1)).join("");
                l+=1;
            }
        }

        //console.log(symbolArray);

/* ----------------- */
/* Card Mana Symbols */
/* ----------------- */

/* Start GET for symbols */
        var searchURLMana = "https://api.scryfall.com/symbology";

        searchCard(searchURLMana, "GET", function(respJson){
            var manaArrayLength = respJson.data.length;
            //console.log(manaArrayLength + "manaArrayLength");
            var manaSave = [];

/* Bind JSON to array from endpoint search*/
            for(let m=0; m<symbolArray.length; m++){
                for(let r=0; r<manaArrayLength; r++){
                    if(symbolArray[m]==respJson.data[r].symbol){
                        //console.log(respJson.data[r].symbol);
                        manaSave[m] = respJson.data[r].svg_uri;
                    }
                }
            }
            
            //console.log(manaSave);

/* Purge previous element to stop duplicates and overlap */   
            const manaSymbolList = document.getElementById("manaCost");
            while (manaSymbolList.hasChildNodes()) {
                manaSymbolList.removeChild(manaSymbolList.firstChild);
            }
            

/* Read array for img url and append */
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

/* --------------- */
/* Card Legalities */
/* --------------- */

/* Return endpoint for legalities */
        const legalCheck = respJson.data[0].legalities;

/* Purge previous element to stop duplicates and overlap */       
        const legalList = document.getElementById("legalList");
            while (legalList.hasChildNodes()) {
                legalList.removeChild(legalList.firstChild);
            }
/* Read and bind JSON entries for "legalities" to append as li */
        for(const t in legalCheck){
            $(document).ready(function() {
                var format = t;
                var legalType = legalCheck[t];
                var ulFormat = document.getElementById("legalList");
                var liFormat = document.createElement("li");
                var spanFormat = document.createElement("span");
                    if(legalType == "legal"){
                        //var spanText = document.createTextNode("Legal");
                        //spanFormat.appendChild(spanText);
                        spanFormat.innerHTML="Legal";
                        spanFormat.classList.add("badge", "text-bg-success");
                    }
                    else{
                        spanFormat.innerHTML="Banned";
                        spanFormat.classList.add("badge", "text-bg-danger");
                    }
                
                //var textLegal = document.createTextNode(format+" : "+legalType);
                var textLegal = document.createTextNode(format+" : ");

                liFormat.classList.add("list-group-item");
                //liFormat.classList.add("d-inline");
                
                liFormat.appendChild(textLegal);
                ulFormat.appendChild(liFormat).appendChild(spanFormat);
                //ulFormat.appendChild(spanFormat);

                console.log(legalCheck[t]);
            });
        }

        console.log(legalCheck);

/* Apply endpoint data from primary GET call*/
        document.getElementById("cardName").innerHTML = cardName;
        //document.getElementById("manaCost").innerHTML = manaCost;
        document.getElementById("cardType").innerHTML = cardType;
        document.getElementById("cardImg").src = cardImg;

    });

   });
/* End of main */