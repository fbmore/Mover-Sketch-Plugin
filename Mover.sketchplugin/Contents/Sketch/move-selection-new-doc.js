          var onRun = function(context) {
          var sketch = require('sketch')
var ui = require('sketch/ui')

var Document = require('sketch/dom').Document
var Artboard = require('sketch/dom').Artboard
var Text = require('sketch/dom').Text
var Page = require('sketch/dom').Page

var	document = sketch.getSelectedDocument();
var pages = document.pages;
var page = document.selectedPage;

var selectedLayers = document.selectedLayers.layers;
          
var nameFromFirstArtboard = selectedLayers[selectedLayers.length-1].name

var result =  nameFromFirstArtboard + "s" || "New Page"

var alertTitle = "Move " + selectedLayers.length + " items to a New Document";
var instructionalTextForInput = "🚨 Please note that local symbols and styles\nwill not be transferred.\n\nChoose a name for the new destination page:";
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
      
      var newDoc = new Document({
        name: page.name,
      })
            
      
      newPage.parent = newDoc
      
      // remove empty first page in new doc

      newDoc.pages.splice(0, 1)
            
              
      // var artboards = selectedLayers;
              
      selectedLayers.forEach((artboard) => {
                artboard.parent = newPage;
      })
      
      // console.log(pages)
      // console.log(page)


      newPage.selected = true;

      context.newDoc.actionsController().actionForID("MSCenterLayersInCanvasAction").doPerformAction(null);

      
      
      sketch.UI.message("💎: Moved selection to new Doc! 👋")
      


    }
  }
);


};
          