<p align="center">
  <img src="https://github.com/DDoBBy/Annotti/blob/master/app/resources/imgs/annotti_1.png">
</p>

# Annotti
Data annotation tool for deep learning

# Intallation
You need NVM v12.8.2.
```
git clone https://github.com/DDoBBy/Annotti.git
```
```
npm install
```
```
npm start
```
# Functions
* ### __Common__

    <img width="400px" src="https://user-images.githubusercontent.com/43779313/91729543-ad8aa380-ebdf-11ea-98df-fc06f4c56d45.png">
    
    You can select a task between **'Classification'** and **'Object Detection'**.  
    You can select multiple folders for your task.
    _____
    <img width="400px" src="https://user-images.githubusercontent.com/43779313/91989160-25d1a000-ed6b-11ea-8f2e-00e900b1976c.gif">
    
    You can add a label by clicking '+' button on the right.  
    You can change a label color through the popup window that appears when you click the label.  
    If you check the label, that label will be activated.  
    
    <img width="400px" src="https://github.com/DDoBBy/Annotti/blob/master/app/resources/gifs/delete_label.gif">
    
    You can delete label by clicking 'x' button on the label.
    _____
    <img align="left" height="200px" src="https://user-images.githubusercontent.com/43779313/91732603-67cfda00-ebe3-11ea-971e-efc19d110fe7.png">  
    <br>Folder : Move to top-level folder <br>
    <br>Analytics : Labeling Analytics <br>
    <br>Info : Guide for Annotti <br>
    <br>Export : Export json file for labeling <br>
    <br>
    
     **Analytics**
    
     <img width="400px" src="https://user-images.githubusercontent.com/43779313/91989345-616c6a00-ed6b-11ea-9850-d41d1d4985e4.gif">
    
     You can see the graph of labeling when you click the second button on the left.
    
* ### __Classification__

    <img width="600px" src="https://user-images.githubusercontent.com/43779313/91987427-ffab0080-ed68-11ea-8b72-1aced0ef1472.png">  
    <img width="600px" src="https://github.com/DDoBBy/Annotti/blob/master/app/resources/gifs/classification_sunflower.gif">
    
    You can annotate images by clicking or dragging images while pushing 'alt' after you activate the label.  
    
    <img width="400px" src="https://github.com/DDoBBy/Annotti/blob/master/app/resources/gifs/classification_zoom.gif">
    
    You can see full image by clicking thumbnail.
    
* ### __Object Detection__

    <img width="600px" src="https://github.com/DDoBBy/Annotti/blob/master/app/resources/gifs/detection_road.gif">
    <img width="600px" src="https://user-images.githubusercontent.com/43779313/91992889-a397aa80-ed6f-11ea-8d09-d2efebde4d8b.gif">
    
    You can add a box by dragging while pushing 'alt' after you activate the label.  
    You can move or resize a box.
    You can delete a box by pushing 'D'.
    
    
# Json File structure

   * ### Classification
   results / classification.json
    
```json
{
    labelID: {
	"name": labelName,
	"files": [fileName1, fileName2, fileNameN]
    }
}
```
   * ### Object Detection
   results / detection-labelInfos.json
    
```json
{
    labelID: {
	"name": labelName,
	"color": color(hexa),
	"boxtoFile": {
		boxID: fileID
	},
	"numBoxes": NumberOfBoxes
    }
}
```
	
   results / detection-boxInfos.json
    
```json
{
    fileID: {
	boxID: {
		"labelID": labelID,
		"x1": x1,
		"y1": y1,
		"x2": x2,
		"y2": y2
	}
    }
}
```
	
   results / detection-dataPaths.json
    
```json
{
    fileID: filePath,
    fileID: filePath
}
```
<br>

## Code structure
```
  ├─ app  
  │   ├─ main             : Related to main process
  │   ├─ project_managers : Related to each project manager
  │   ├─ renderers        : Related to renderer processes
  │   ├─ templates        : js files for html
  │   ├─ utils
  │   ├─ app.global.css
  │   ├─ resources
  │   │   ├─ imgs         : Annotti icons
  │   │   └─ gifs         : Related to Annotti guide
  │   └─ main.js          : main process
  └─ package.json     : npm guide
```

	
