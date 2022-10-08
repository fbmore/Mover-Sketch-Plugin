          var onRun = function(context) {
          var sketch = require('sketch')
var ui = require('sketch/ui')

var Artboard = require('sketch/dom').Artboard
var Text = require('sketch/dom').Text
var Page = require('sketch/dom').Page
var Group = require('sketch/dom').Group

var	document = sketch.getSelectedDocument();
var pages = document.pages;
var page = document.selectedPage;

var selectedLayers = document.selectedLayers.layers;

var nameFromFirstArtboard = selectedLayers[selectedLayers.length-1].name

var result =  nameFromFirstArtboard + "s" || "New Page"

var alertTitle = "Move " + selectedLayers.length + " items to a New Page";
var instructionalTextForInput = "Choose a name for the new destination page:";
var initialValue = result;

//// Get user input
ui.getInputFromUser(
  alertTitle,
  {
    initialValue: initialValue,
    description: instructionalTextForInput
  },
  (err, value) => {
    if (err) {
      // most likely the user canceled the input
      sketch.UI.message("💨: See you later!")

      return;
    } else {
      console.log(value);
      result = value;
      
      ///// Continue move

      var newPage = new Page({
        name: result,
      })
      
      var newGroup = new Group({
        name: result,
      })
      

      
      newPage.parent = document
      
      console.log(page.name);
      
      
              
      // var artboards = selectedLayers;
              
      selectedLayers.forEach((artboard) => {
                artboard.parent = newGroup;
              })


      newGroup.parent = newPage;
      
      newGroup.adjustToFit();

      newGroup.frame.x = 0;
      newGroup.frame.y = 0;

      newGroup.sketchObject.ungroup();

      
      // console.log(pages)
      // console.log(page)


      newPage.selected = true;

      context.document.actionsController().actionForID("MSCenterLayersInCanvasAction").doPerformAction(null);

      
      
      sketch.UI.message("💎: Moved selection to " + newPage.name + " from " + page.name + "! 👋")
      


    }
  }
);


};
          