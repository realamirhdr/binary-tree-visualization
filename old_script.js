// script.js

// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Get the form and result paragraph

    const inputElement = document.getElementById("input");
    const result = document.getElementById("result");

    inputElement.addEventListener("input", () => {
        const inputText = inputElement.value;
        const words = inputText.split(' ');

        let html = getTree(words);

        //console.log(html)

        //result.innerHTML = html;
    });
});



function getTree(nodes) {
    let style = `<style>`


    nodes = nodes.filter(item => item !== '');

    let count = nodes.length;
    let numberOfRows = 0;

    while (Math.pow(2, numberOfRows) <= count){
        numberOfRows++;
    }

    let tree = `<div id="tree">`;

    for (let i = 0; i < numberOfRows; i++) {
        style += `#row${i} {
                    display: flex;
                    gap: ${numberOfRows - i}rem;  
                    } `

        let row = `<div id="row${i}">`;

        let startingIndex = Math.pow(2, i) - 1;

        if (i === 0) {
            startingIndex = 0;
        }

        let endingIndex = startingIndex + Math.pow(2, i);

        for (let j = startingIndex; j < endingIndex ; j++) {
            let c = nodes[j] ?? ' ';

            let node = produceNode(c);

            row += node;
        }

        row += '</div>'

        tree += row;
    }

    style += '</style>';
    tree += '</div>';

    return style + tree;
}

function produceNode(c) {
    if (c == ' ') {
        return `<div> ${c} </div>`
    }
    return `<div id="node" class="border-2 border-solid p-1"> ${c} </div>`
}