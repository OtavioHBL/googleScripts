function replaceInSheet(values, regex, replace_with) {
    
    //loop over the rows in the array
    for (var row in values) {
        const x = values[row][0];
        // const regexzado = x.match(/^(?:^|\W)Done(?:$|\W)([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2])) - ([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))/);
        const regexzado = regex.exec(x);
        if (regexzado) {
          regex.lastIndex = 0
          //use Array.map to execute a replace call on each of the cells in the row.
        var replaced_values = values[row].map(function(original_value) {
            return original_value.toString().replace(regexzado[0], replace_with);
        });
    
        //replace the original row values with the replaced values
        values[row] = replaced_values;
        }
        
        
    }
    }
    function runReplaceInSheet() {
    
    var spreadsheet = SpreadsheetApp.getActive()
    var sheet = spreadsheet.getActiveSheet();
    // Range das alterações     
    var range = sheet.getRange("A1:A999");
    var startRow = 2; // First row of data to process
    var numRows = 2; // UPDATE number of rows to process
    // Fetch the range of cells 
    var dataRange = sheet.getRange(startRow, 4, numRows, 1) // Numbers of rows to process
        // Fetch values for each row in the Range
    var data = dataRange.getValues();
    for (var i = 0; i < data.length; ++i) {
        var row = data[i];
        var v = row[3]; // edit: don't need this
        var values = range.getValues();
            // Replace Names
        // Regex pras alterações
        var regex = /^(?:^|\W)Done(?:$|\W)([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2])) - ([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))/;
        replaceInSheet(values, regex, 'Done');
    
        //write the updated values to the sheet, again less call;less overhead
        range.setValues(values);
    }
    }