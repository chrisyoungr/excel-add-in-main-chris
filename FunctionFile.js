// The initialize function must be run each time a new page is loaded.
(function () {
    Office.initialize = function (reason) {
        // If you need to initialize something you can do so here.
    };
})();

var jQueryScript = document.createElement('script');
jQueryScript.setAttribute('src', 'https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js');
document.head.appendChild(jQueryScript);

function FORMULABOT(query, query2, query3, query4) {

    var QuestionPrepration = query + " " + (query2 ? query2 : '') + " " +  (query3 ? query3 : '') + " " + (query4 ? query4 : '');
   // console.log(QuestionPrepration);
    var activeStateToken = localStorage.getItem('token');
   
    if (activeStateToken === null) {
        return 'inactive user';
    }
    else {
        return new Promise(function (resolve, reject) {
            try {

                var DataStructure = {
                    "input": QuestionPrepration,
                    "platform": "Excel",
                    "outputType": "Freeform"
                };

                var settings = {
                    "method": "POST",
                    "headers": {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + activeStateToken
                    },
                    "body": JSON.stringify(DataStructure)
                };
                fetch("https://excelformulabot.com/api/1.1/wf/freeform/", settings).then(function (response) {
                    response.json().then(function (json) {
                           // console.log(json);
                           resolve(json.response.output);
                    });
                });
            }
            catch (error) {
                resolve(0);
            }
        });
    };

}
CustomFunctions.associate("FORMULABOT", FORMULABOT);
