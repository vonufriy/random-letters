const alphabet = ['а', 'б', 'в', 'г', 'ґ', 'д', 'е', 'є', 'ж', 'з', 'и', 'і', 'ї', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ь', 'ю', 'я'];
function getLetters() {
    let array = [];
    for(let i = 0; i < 40; i++) {
        let letterIndex = parseInt(Math.random() * alphabet.length);
        array.push(alphabet[letterIndex]);
    }
    return array;   
}
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function getFontSize() {
    return Math.random() * 25 + 10;
}
  
function insertArrayIntoDOM(array) {
    const container = document.getElementById('container');
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    let letterObject = {};
    const topCoordArray = [];
    const leftCoordArray = [];

    container.innerHTML = '';

    function generateCoord() {
        let top = parseInt(Math.random() * (containerHeight - 50));
        let left = parseInt(Math.random() * (containerWidth - 50));
        let uniqTop = true;
        let uniqLeft = true;
        
        for (let i = 0; i < topCoordArray.length;i++) {
            if(Math.abs(topCoordArray[i] - top) < 10) {
                uniqTop = false
            }
        }
        for (let i = 0; i < leftCoordArray.length;i++) {
            if(Math.abs(leftCoordArray[i] - left) < 10) {
                uniqLeft = false
            }
        }
        
        if( typeof letterObject[top+left] != 'undefined' || !uniqTop || !uniqLeft) {
            return generateCoord();
        }
        return {top: top, left: left};
    }

    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        const elementDOM = document.createElement('span');
        const coords = generateCoord();
        const color = getRandomColor();
        const fontSize = getFontSize();

        elementDOM.classList.add('letter');
        elementDOM.innerText = element;

        letterObject[coords.top + coords.left] = element;

        topCoordArray.push(coords.top);
        leftCoordArray.push(coords.left);

        elementDOM.style.top = coords.top + 'px';

        elementDOM.style.left = coords.left + 'px';
        
        elementDOM.style.color = color;

        elementDOM.style.fontSize = fontSize + 'px';


        container.appendChild(elementDOM);
    }
}

function main() {
    const letterArray = getLetters();
    insertArrayIntoDOM(letterArray)
}
let button = document.getElementById('start');
button.addEventListener('click', main);