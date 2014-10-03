//삼성 파일 시스템 API를 이용하여, 
//저장된 번호들을 불러온다.
var fileSystemObj = new FileSystem();

var path;//데이터가 있는 경로

var loadFile = function () {
    //curWidget 디렉토리가 있는지 확인한다.
    if (fileSystemObj.isValidCommonPath(curWidget.id) != 1) {
        //없으면 만든다.
        fileSystemObj.createCommonDir(curWidget.id);
    }
    path = curWidget.id + "/isuda.dat";
}

//파일 읽기
var readFile = function () {
    var result, jsFileObj;

    jsFileObj = fileSystemObj.openCommonFile(path, "r");
    if (jsFileObj) {
        //파일이 있으면 데이터를 읽는다.
        result = jsFileObj.readAll();

        fileSystemObj.closeFile(jsFileObj);
    }
    else {
        result = false;
    }

    return result;
}

//파일 쓰기
var writeFile = function (val) {
    var jsFileObj;

    //파일을 새로 쓴다.
    jsFileObj = fileSystemObj.openCommonFile(path, "w");
    jsFileObj.writeAll(val);

    //파일을 닫는다.
    fileSystemObj.closeFile(jsFileObj);

}