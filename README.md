<p align="center">
  <img src="https://github.com/DDoBBy/Annotti/blob/master/app/resources/imgs/annotti_1.png">
</p>

# Annotti
Data annotation tool for deep learning

# Intallation
You need NVM v12.8.2.
```
git clone https://github.com/DDoBBy/Annotti.git
npm install
npm start
```
# Functions
* __Common__

    <img width="400px" src="https://user-images.githubusercontent.com/43779313/91729543-ad8aa380-ebdf-11ea-98df-fc06f4c56d45.png">
    
    You can select a task between **'Classification'** and **'Object Detection'**.  
    You can select multiple folders for your task.
    _____
    <img width="400px" src="https://user-images.githubusercontent.com/43779313/91730685-03138000-ebe1-11ea-8373-74e6b2291d7e.png">
    
    You can add a label by clicking '+' button on the right.  
    You can change a label color through the popup window that appears when you click the label.  
    _____
    <img align="left" height="200px" src="https://user-images.githubusercontent.com/43779313/91732603-67cfda00-ebe3-11ea-971e-efc19d110fe7.png">  
    <br>Folder : Move to top-level folder <br>
    <br>Analytics : Labeling Analytics <br>
    <br>Info : Guide for Annotti <br>
    <br>Export : Export json file for labeling <br>
    <br>
    
* __Classification__

    Classification
    
* __Object Detection__

    Object Detection
    
## Code structure
```
  ├─ main         : Related to main process
  ├─ renderers    : Related to renderer processes
  ├─ commons      : Used for both processes
  ├─ templates    : html files
  ├─ resources
  │   ├─ imgs
  │   └─ styles   : css files
  ├─ main.js      : main process
  └─ package.json : npm guide
```

	
