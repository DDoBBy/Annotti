const { readyTab, openTab } = require('../renderers/tab-functions.js');
const imgExtensions = ['.png', '.jpg', '.jpeg', '.PNG', '.JPG', '.JPEG'];

function breadCrumbHome(event) {
  $('#all-imgs').empty();
  showSelectedDirectories();
}

function breadCrumb(event) {
  $(event.target).parent().nextAll().remove();
  $(event.target).parent().remove();
  $('#all-imgs').empty();
  readFolder($(event.target).attr('data-paths'));
}

function composeImgElements(filePath, imgInfoId) {
  remote.getGlobal('projectManager').openFileTab(imgInfoId);
  var basename = path.basename(filePath);
  if (basename.length > 10) {
    basename = basename.slice(0, 5) + '...' + basename.slice(-5);
  }
  var element =
    '<div class="img-info" id="' +
    imgInfoId +
    '">' +
    '<img class="thumbnail" id="' +
    imgInfoId +
    '" src="' +
    filePath +
    '" style="display: block;"></img>' +
    '<a class"img-name">' +
    basename +
    '</a></div>';

  $('#all-imgs').append(element);
  $('.img-info:last-child').on('click', { imgInfoId: imgInfoId }, openTab);
}

function composeFolderElements(folderPath) {
  var basename = path.basename(folderPath);
  var element =
    '<div class="folder-info">' +
    '<img class="folder-thumbnail" id="' +
    folderPath +
    '" src="../resources/imgs/folder.png" style="display: block;"></img>' +
    '<a class"img-name">' +
    basename +
    '</a></div>';
  $('#all-imgs').append(element);
}

async function readFolder(folderPath) {
  $('#all-imgs').empty();
  var folderBreadCrumb =
    '<li class="breadcrumb-item" data-test="test"><a href="#" data-paths="' +
    folderPath +
    '">' +
    path.basename(folderPath) +
    '</a></li>';
  $('#breadcrumb-list').append(folderBreadCrumb);
  $('.breadcrumb-item:last-child').children().on('click', breadCrumb);

  var dataPaths = {};
  var dir = await fs.promises.opendir(folderPath);
  for await (const dirent of dir) {
    dataPath = path.resolve(folderPath, dirent.name);
    if (dirent.isDirectory()) composeFolderElements(dataPath);
    else {
      if (imgExtensions.includes(path.extname(dataPath))) {
        var shasum = crypto.createHash('sha1');
        shasum.update(dataPath);
        var fileID = shasum.digest('hex');
        composeImgElements(dataPath, fileID);
        dataPaths[fileID] = dataPath;
      }
    }
  }
  remote.getGlobal('projectManager').appendDataPaths(dataPaths);
  return dataPaths;
}

async function showSelectedDirectories() {
  $('#breadcrumb-list').empty();
  readyTab();
  var workingDirectory = remote.getGlobal('projectManager').workingDirectory;
  for (const folderPath of workingDirectory) {
    await composeFolderElements(folderPath);
  }
  var home =
    '<li class="breadcrumb-item" id="home"><a href="#" data-paths="' +
    workingDirectory +
    '" onClick="breadCrumbHome()">Home</a></li>';
  $('#breadcrumb-list').append(home);
}

$('.grid-view-files').on('click', '.folder-thumbnail', function (event) {
  var folderPath = $(event.target).attr('id');
  readFolder(folderPath);
});

$('document').ready(showSelectedDirectories);

// show grid view of images
$('#view-files-btn').on('click', function () {
  $('.working-area').css('display', 'grid');
  $('.tab-area').css('display', 'none');
});
