/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2016 Rurio Luca
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

var _docRef = app.activeDocument;
var _activeLayer = _docRef.activeLayer;
var _docName = _docRef.name;
var _docPath = _docRef.path;

init();

function init() {

    alert("Welcome! I know you do not want to make cuts for all resolutions hand... but do not worry I'll take !", "Welcome");


    // Ask user for output folder
    var outputFolder = Folder.selectDialog("Select a folder to export images");
    if (outputFolder == null) {
        alert("No folder selected. Exting...by", "Error!");
        return(0);
    }


    // Make output Android folders (LDPI,MDPI,HDPI,XHDPI)
    var dirxxxhdpi = Folder(outputFolder + "/android/res/drawable-xxxhdpi");
    if (!dirxxxhdpi.exists)
        dirxxxhdpi.create();

    var dirxxhdpi = Folder(outputFolder + "/android/res/drawable-xxhdpi");
    if (!dirxxhdpi.exists)
        dirxxhdpi.create();

    var dirxhdpi = Folder(outputFolder + "/android/res/drawable-xhdpi");
    if (!dirxhdpi.exists)
        dirxhdpi.create();
    var dirhdpi = Folder(outputFolder + "/android/res/drawable-hdpi");
    if (!dirhdpi.exists)
        dirhdpi.create();
    var dirtvdpi = Folder(outputFolder + "/android/res/drawable-tvdpi");
    if (!dirtvdpi.exists)
        dirtvdpi.create();
    var dirmdpi = Folder(outputFolder + "/android/res/drawable-mdpi");
    if (!dirmdpi.exists)
        dirmdpi.create();
    var dirldpi = Folder(outputFolder + "/android/res/drawable-ldpi");
    if (!dirldpi.exists)
        dirldpi.create();




  
    var diriphone = Folder(outputFolder + "/ios/iphone/");
    if (!diriphone.exists)
        diriphone.create();
    
    var tempDocName = _docName.replace(/\.[^\.]+$/, ''),
            docFolder = Folder(_docPath + '/' + _docName);


    // Open file
    open(docFolder);




    // Android 
    // XXXHDPI
    resizeAndroid(dirxxxhdpi, '400%');
    // XXHDPI
    resizeAndroid(dirxxhdpi, '300%');
    // XHDPI
    resizeAndroid(dirxhdpi, '200%');
    // HDPI
    resizeAndroid(dirhdpi, '150%');
    // TVDPI
    resizeAndroid(dirtvdpi, '133%');
    // MDPI
    resizeAndroid(dirmdpi, '100%');
    // LDPI
    resizeAndroid(dirldpi, '75%');

    // iOS 
    // IPHONE
    resizeIphone(diriphone, '100%', 1);
    resizeIphone(diriphone, '200%', 2);
    resizeIphone(diriphone, '300%', 3);
  


    // Close and do not save
    app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);



    alert("Thank you ,Rurio Luca", "Success,Done process");


    function resizeAndroid(folder, percent) {

      
        var tempname = _docName.replace(/\s+/g, '_').replace(/([a-z\d])([A-Z])/g, '$1_$2').toLowerCase();
        var index = tempname.indexOf(".");
        var filename = tempname.substr(0, index);
         

        // Set export options
        var opts, file;
        opts = new ExportOptionsSaveForWeb();
        opts.format = SaveDocumentType.PNG;
        opts.transparency = true;
        opts.blur = 0.0;
        opts.interlaced = false;
        opts.optimized = true;
        opts.includeProfile = false;
        opts.quality = 100;
        opts.PNG8 = false;


        // Duplicate, resize and export
        var tempfile = app.activeDocument.duplicate();
        if (percent!= undefined)
            tempfile.resizeImage(percent, percent);


        file = new File(folder + "/" + filename + ".png");
        tempfile.exportDocument(file, ExportType.SAVEFORWEB, opts);
        tempfile.close(SaveOptions.DONOTSAVECHANGES);
    }


    function resizeIphone(folder, percent, type) {

  
        var tempname = _docName.replace(/\s+/g, '_').replace(/([a-z\d])([A-Z])/g, '$1_$2').toLowerCase();
        var indexof = tempname.indexOf(".");
        var filename = tempname.substr(0, indexof);
        //use extension if set 

     
        // Set export options
        var opts, file;
        opts = new ExportOptionsSaveForWeb();
        opts.transparency = true;
        opts.optimized = true;
        opts.includeProfile = false;
        opts.blur = 0.0;
        opts.quality = 100;
        opts.PNG8 = false;
        opts.format = SaveDocumentType.PNG;
        opts.interlaced = false;
        


        // Duplicate, resize and export
        var tempfile = app.activeDocument.duplicate();
        if (percent != undefined)
            tempfile.resizeImage(percent, percent);

        switch (type) {
            case 1:
                file = new File(folder + "/" + filename + ".png");
                break;
            case 2:
                file = new File(folder + "/" + filename + "@2x.png");
                break;
            case 3:
                file = new File(folder + "/" + filename + "@3x.png");
                break;
            default :
                file = new File(folder + "/" + filename + ".png");
                break;
        }

        tempfile.exportDocument(file, ExportType.SAVEFORWEB, opts);
        tempfile.close(SaveOptions.DONOTSAVECHANGES);
    }
}


