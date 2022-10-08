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

// var selectedLayers = document.selectedLayers.layers;
var selectedLayers;

pages.forEach((p) => {
  selectedLayers = p.layers;

  var newGroup = new Group({
    name: "temp group",
  })
  
        
  selectedLayers.forEach((artboard) => {
          artboard.parent = newGroup;
  })
  
  
  newGroup.parent = p;
  
  newGroup.adjustToFit();
  
  newGroup.frame.x = 0;
  newGroup.frame.y = 0;
  
  newGroup.sketchObject.ungroup();

  context.document.actionsController().actionForID("MSCenterLayersInCanvasAction").doPerformAction(null);

  
})





sketch.UI.message("💎: Moved the contents of " + pages.length + " pages to the Origin (x = 0; y = 0)! 👋")

}