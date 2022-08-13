// from data.js
var tableData = data;
console.log(tableData);

// YOUR CODE HERE!

//create a function for ufo sighting
function tableDisplay (ufo) {
    //get a reference to the tbale body
    var tbody = d3.select("tbody");

    //append one table row 'tr' for each record object 
    ufo.forEach(record => {
        var row = tbody.append("tr");
        Object.entries(record).forEach(([key, value]) => {
            var cell = row.append("td");
            cell.html(value);
        });
    });
};

//initital display pf UFO sighting
tableDisplay(tableData);



//----------------filter the database-------------------------------
// create a filter button
var button = d3.select("#filter-btn");

//create a function to clear the table when apply filter
function tableDelete() {
    d3.select("tbody")
        .selectAll('tr').remove()
        .selectAll('td').remove();
};
button.on('click', function(event) {
    //whenever the filter applied, if filter inputs are relevent, the current table should be deleted
    //and only display the filterred data
    //using "preventDefault" method "tableDelete" to do this
    d3.event.preventDefault();
    tableDelete();

    var filterData = tableData;
    var inputID = document.getElementsByClassName("form-control");
    //iterate through all items
    for (var i = 0; i < inputID.length; i++) {
        var idName = inputID[i].id;
        var item = d3.select("#"+ idName).property("value");

        if (item.trim() !== ""){
            var filterData = filterData.filter(ufo => 
                ufo[idName].toUpperCase().trim() === item.toUpperCase().trim());
        };   
        
    };
    //if no record found
    if (filterData.length == 0){
        d3.select('tbody')
            .append('tr')
            .append('td')
                .attr("colspan", 7)
                .html("<h3>No record found</h3>")
    };
    tableDisplay(filterData)

});
