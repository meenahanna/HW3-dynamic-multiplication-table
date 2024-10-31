/*
File: script.js
GUI Assignment: Creating an Interactive Dynamic Table
Mena Hanna, UMass Lowell Computer Science, mena_hanna@student.uml.edu
Copyright (c) 2024 by Mena Hanna. All rights reserved. 
May be freely copied or excerpted for educational purposes with credit to the author.

Updated by Mena Hanna on October 30, 2024

Description:
This JavaScript file adds interactive functionality to the dynamic multiplication table web app.
It reads user inputs from the form, validates them, and generates a multiplication table based on the input ranges.
The script includes functions for form validation to handle edge cases (e.g., min values greater than max values).
Error messages display in-line within the form, and the table is dynamically generated within the specified HTML container.
The JavaScript also includes a debounce function for better input handling and a function to clear previous error messages.
*/

document.addEventListener('DOMContentLoaded', function() {
    const button = document.querySelector('#tableForm button');
    button.addEventListener('click', generateTable);
});

function debounce(func, delay) {
    let debounceTimer;
    return function() {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func.apply(this, arguments), delay);
    };
}

function generateTable() {
    // Get user inputs
    var minCol = parseInt(document.getElementById("minCol").value);
    var maxCol = parseInt(document.getElementById("maxCol").value);
    var minRow = parseInt(document.getElementById("minRow").value);
    var maxRow = parseInt(document.getElementById("maxRow").value);
    
    // Clear all previous error messages
    document.querySelectorAll('.error-message').forEach(function(error) {
        error.innerHTML = "";
        error.style.display = "none";
    });

    let valid = true;

    // Check if the input values are within the allowed range
    if (minCol < -50 || minCol > 50) {
        displayError("errorMinCol", "Value must be between -50 and 50");
        valid = false;
    }


    if (maxCol < -50 || maxCol > 50) {
        displayError("errorMaxCol", "Value must be between -50 and 50");
        valid = false;
    }

    if (minRow < -50 || minRow > 50) {
        displayError("errorMinRow", "Value must be between -50 and 50");
        valid = false;
    }

    if (maxRow < -50 || maxRow > 50) {
        displayError("errorMaxRow", "Value must be between -50 and 50");
        valid = false;
    }

    if (minCol > maxCol) {
        displayError("errorMinCol", "Minimum value must be less than or equal to Maximum Column Value");
        valid = false;
    }

    if (minRow > maxRow) {
        displayError("errorMinRow", "Minimum value must be less than or equal to Maximum Row Value");
        valid = false;
    }

    if (!valid) {
        return;
    }
    
    // Clear existing table
    var table = document.getElementById("mytable");
    table.innerHTML = "";
    
    var output = "<tr><th class='no-border'></th>";
    
    // Create top header row
    for (var j = minCol; j <= maxCol; j++) {
        output += "<th>" + j + "</th>";
    }
    output += "</tr>";
    
    // Create rows for the table
    for (var i = minRow; i <= maxRow; i++) {
        output += "<tr><th>" + i + "</th>";
        for (var j = minCol; j <= maxCol; j++) {
            output += "<td>" + (i * j) + "</td>";
        }
        output += "</tr>";
    }
    
    // Add generated output to the table
    table.innerHTML = output;

    // Change button text to "Regenerate Table" after the first generation
    document.querySelector('button').innerText = "Regenerate Table";
}

function displayError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.innerHTML = message;
    errorElement.style.display = "block";
}