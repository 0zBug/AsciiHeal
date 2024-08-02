function getTextWidth(text, font) {
    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    context.font = font;
    return context.measureText(text).width;
}

function monospacedText(text, font) {
    var characters = text.split("");
    var maxWidth = 0;
    var i;

    for (i = 0; i < characters.length; i++) {
        var charWidth = getTextWidth(characters[i], font);
        if (charWidth > maxWidth) {
            maxWidth = charWidth;
        }
    }

    var monospacedString = "";
    
    var spaceCharacters = [" ", " ", " "];
    var spaceWidths = spaceCharacters.map(space => getTextWidth(space, font));
    
    for (i = 0; i < characters.length; i++) {
        var char = characters[i];
        var charWidth = getTextWidth(char, font);
        var remainingWidth = maxWidth - charWidth;
        var spaceCount = "";
        
        for (var j = 0; j < spaceCharacters.length; j++) {
            var count = Math.floor(remainingWidth / spaceWidths[j] / 4);
            remainingWidth -= count * spaceWidths[j];
            spaceCount += spaceCharacters[j].repeat(count);
        }

        monospacedString += char + spaceCount;
    }

    return  "⠀\n" + monospacedString.replace(/\\/g, "\\\\").replace(/\|/g, "\\|").replace(/_/g, "\\_").replace(/`/g, "\\`").replace(/~/g, "\\~");
}

document.getElementById("encode").addEventListener("click", () => {
    output.innerHTML = monospacedText(input.value, font.value);
    output.font = font.value
    characterAmount.innerHTML = output.textContent.length + " chars";
});
