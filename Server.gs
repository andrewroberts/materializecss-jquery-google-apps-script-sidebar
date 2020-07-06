function onOpen() {
  SpreadsheetApp
    .getUi()
    .createMenu('Sidebar')
    .addItem('Open', 'onOpenSidebar')
    .addToUi()
}

function onOpenSidebar() {

  var ui = HtmlService.createTemplateFromFile('Sidebar')
    .evaluate()
    .setTitle('Materialize CSS Sidebar Example')
  
  SpreadsheetApp.getUi().showSidebar(ui)
}

function onFormSubmit(form) {

  var spreadsheet = SpreadsheetApp.getActive()
  var sheet = getSheet(spreadsheet) 
  var photoUrl = (form.filepath) ? DriveApp.createFile(form.photo).getUrl() : ''
  
  sheet.appendRow([
    new Date(),
    form.first_name,
    form.last_name,
    form.password,
    form.email,
    photoUrl
  ])
  
  // Private Functions
  // -----------------
  
  function getSheet(spreadsheet) {
    
    var sheet = spreadsheet.getSheetByName('Results')  
    
    if (sheet === null) {
      sheet = spreadsheet.insertSheet().setName('Results')
    }
    
    if (sheet.getRange('A1').getValue() === '') {
    
      sheet
        .getRange('A1:F1')
        .setValues([['Timestamp', 'First Name', 'Last Name', 'Password', 'Email', 'Photo']])
        
      sheet.setFrozenRows(1)
    }
    
    return sheet
  }
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent()
}