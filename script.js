// script.js

// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Get the form and result paragraph
    const inputElement = document.getElementById("input");
    const result = document.getElementById("result");

    inputElement.addEventListener("input", () => {
        const inputText = inputElement.value;
        if (inputText.slice(-1) == ' ') return

        if (inputText == "")
        {
            console.log(inputText)
            result.innerHTML = "";
            return;
        }


        const words = inputText.split(' ');

        let html = getBTree(words);

        result.innerHTML = html;
    });
});


function getBTree(nodes) {
    return buildSubtreeHtml(0, nodes)
}

function buildSubtreeHtml(index, nodes) {
    let ch1 = nodes[2 * index + 1];
    let style ="style=\"border: 2px solid; border-radius: 9999px; padding: 3px; position: absolute; top: 50px; background-color: white; "

    if (index % 2 === 0 && index !== 0) style += " left: "
    else if (index % 2 !== 0 && index !== 0) style += " right: "

    let gap = 100;
    let rowNum = getRowNum(index);

    console.log(rowNum)

    if (index + 1 > 0) {
        gap = gap / (rowNum)^2
    }

    //console.log(index + ' -> ' + gap)


    if (ch1 === undefined) {
        style += ` ${gap}px;\"`
        return `<div id="n${index}" ${style}> ${nodes[index]} </div>`;
    }

    let ch2 = nodes[2 * index + 2];

    if (ch2 === undefined) {
        style += ` ${gap}px;\"`

        return `<div id="n${index}" ${style} > ${nodes[index]}
                    <div id="n${2 * index + 1}" ${style} > ${ch1} </div>
                 </div>`;
    }

    if (index != 0) style += ` ${gap}px;\"`

    let html = `<div id="n${index}" ${style} \"> ${nodes[index]}
                  ${buildSubtreeHtml(2 * index + 1, nodes)} 
                  ${buildSubtreeHtml(2 * index + 2, nodes)}
                </div>`

    return html;
}



function buildSubtree(index, nodes) {
    let ch1 = nodes[2 * index + 1];

    if (ch1 === undefined) {
        return {
            val: nodes[index],
            children: []
        }
    }

    let ch2 = nodes[2 * index + 2];

    if (ch2 === undefined) {
        return {
            val: nodes[index],
            children: [ch1]
        }
    }

    let res = {
        val: nodes[index],
        children: [buildSubtree(2 * index + 1, nodes), buildSubtree(2 * index + 2, nodes)]
    }

    return res;
}


function getRowNum(index) {
    return Math.floor(Math.log2(index + 1));
}


