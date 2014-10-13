//�Ｚ ���� �ý��� API�� �̿��Ͽ�, 
//����� ��ȣ���� �ҷ��´�.
var fileSystemObj = new FileSystem();

var path;//�����Ͱ� �ִ� ���

var loadFile = function () {
    //curWidget ���丮�� �ִ��� Ȯ���Ѵ�.
    if (fileSystemObj.isValidCommonPath(curWidget.id) != 1) {
        //������ �����.
        fileSystemObj.createCommonDir(curWidget.id);
    }
    path = curWidget.id + "/isuda.dat";
};

//���� �б�
var readFile = function () {
    var result, jsFileObj;

    jsFileObj = fileSystemObj.openCommonFile(path, "r");
    if (jsFileObj) {
        //������ ������ �����͸� �д´�.
        result = jsFileObj.readAll();

        fileSystemObj.closeFile(jsFileObj);
    }
    else {
        result = false;
    }

    return result;
};

//���� ����
var writeFile = function (val) {
    var jsFileObj;

    //������ ���� ����.
    jsFileObj = fileSystemObj.openCommonFile(path, "w");
    jsFileObj.writeAll(val);

    //������ �ݴ´�.
    fileSystemObj.closeFile(jsFileObj);

};