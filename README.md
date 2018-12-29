# Udacity Full-Stack Web Developer Neighborhood Map Project

This project shows the ability to create a web application utilizing javascript frameworks and integrating various APIs all organized within a Model-View-ViewModel architecture.

## Files

HTML:
    * `index.html` Main application view (View)

JavaScript:
    * `js/app.js` Main application code (ViewModel)
    * `js/model.js` Data model containing place markers (Model)
    * `js/map-styles.js` Contains style definitions for Google Maps map object
    * `js/knockout-3.4.2.js` Knockout library JS file

CSS:
    * `css/style.css` Stylesheet for index.html

## Features

This application lists places I've visited around New York City.  These locations are displayed within a full screen Google Map, and can be filtered within a collapsible hamburger menu.  Clicking on a marker will open up an info window with address details obtained through FourSquare's API.

## APIs and Frameworks

Google Maps API is used for the map itself, displaying the location markers and map UI.  

Foursquare is used to acquire information on the places to display within an info window when that location is clicked.

Knockout.js (3.4.2) is used for data binding and event handling simply and easily.

Bootstrap (4.2.1) is used to provide a good looking and uniform experience across many different devices, platforms, and browsers.


