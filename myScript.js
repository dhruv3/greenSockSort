/**
 * Created with JetBrains WebStorm.
 * User: Dhruv
 * Date: 12/27/16
 * Time: 1:39 AM
 * To change this template use File | Settings | File Templates.
 */
var t1 = new TimelineLite();

function insertionSort(){
    var inputText = document.getElementById("input").value;
    var arrayOfNumbers = inputText.split(",");

    var key, i;
    createBoxes(arrayOfNumbers);
    var transitionJSON = {};
    var arrContainer = $('#resultContainer').find('.numBox');

    for (var j=0; j<arrayOfNumbers.length; j++) {

        key = arrayOfNumbers[j];
        i = j-1;
        t1.add(TweenLite.set(arrContainer[j], {backgroundColor: 'yellow'}));
        t1.pause(3);
        t1.resume();
        while (i>=0 && arrayOfNumbers[i]>key) {
            arrayOfNumbers[i+1] = arrayOfNumbers[i];
            if(transitionJSON[j] != null){
                transitionJSON[j] = transitionJSON[j] + i + "," + (i+1) + ";";
            }
            else{
                transitionJSON[j] = i + "," + (i+1) + ";";
            }
            i = i-1;
        }
        arrayOfNumbers[i+1] = key;
        if(j != 0){
            transitionJSON[j] = transitionJSON[j] + j + "," + (i+1);
            animate(arrContainer, transitionJSON[j]);
        }

    }

    document.getElementById("output").innerHTML = arrayOfNumbers;

}

function animate(arrContainer, transitionJSON){
    var getIndexes, oldIndex, newIndex;
    var totalTransition = transitionJSON.split(';');

    getIndexes = totalTransition[totalTransition.length - 1].split(',');
    var oldIndex1 = getIndexes[0];
    var newIndex1 = getIndexes[1];
    var distMoved =  (oldIndex1 - newIndex1)*75;
    t1.add(TweenLite.to(arrContainer[oldIndex1], 0.5, {y: '-=100px', ease:Back.easeInOut}));
    t1.pause(1);
    t1.resume();
    t1.add(TweenLite.to(arrContainer[oldIndex1], 0.5, {x: '-=' + distMoved +'px', ease:Back.easeInOut}));
    t1.pause(1);
    t1.resume();

    for(var index= 0; index < totalTransition.length - 1; index++){
        getIndexes = totalTransition[index].split(',');
        oldIndex = getIndexes[0];
        newIndex = getIndexes[1];
        t1.add(TweenLite.to(arrContainer[oldIndex], 0.5, {x: '+=75px', ease:Back.easeInOut}));
        t1.pause(1);
        t1.resume();
    }

    t1.add(TweenLite.to(arrContainer[oldIndex1], 0.5, {y: '+=100px', ease:Back.easeInOut}));
    t1.pause(1);
    t1.resume();
}

function createBoxes(arrayOfNumbers){
    var $result = document.getElementById("resultContainer");
    if($($result).children().length != 0){
        $($result).empty();
    }
    for(var i = 0; i < arrayOfNumbers.length; i++){
        var $box = $("<div class='numBox'></div>");
        $box.html(arrayOfNumbers[i]);
        $box.appendTo($result);
    }
}