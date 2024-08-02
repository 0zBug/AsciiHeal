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

    var spaceCharacters = [
        { char: "\u200A", width: getTextWidth("\u200A", font) }, 
        { char: "\u2800", width: getTextWidth("\u2800", font) },
        { char: "\u2007", width: getTextWidth("\u2007", font) },
        { char: "\u2003", width: getTextWidth("\u2003", font) }, 
        { char: "\u2002", width: getTextWidth("\u2002", font) },
        { char: " ", width: getTextWidth(" ", font) },
        { char: "\u2004", width: getTextWidth("\u2004", font) }, 
        { char: "\u2005", width: getTextWidth("\u2005", font) },
        { char: "\u2008", width: getTextWidth("\u2008", font) },
        { char: "\u2009", width: getTextWidth("\u2009", font) },
        { char: "\u2006", width: getTextWidth("\u2006", font) },
    ];

    for (i = 0; i < characters.length; i++) {
        var char = characters[i];
        var charWidth = getTextWidth(char, font);
        var remainingWidth = maxWidth - charWidth;
        var spaceCount = "";

        for (var j = 0; j < spaceCharacters.length; j++) {
            var space = spaceCharacters[j];
            var count = Math.floor(remainingWidth / space.width / 4);
            if (count > 0) {
                spaceCount += space.char.repeat(count);
                remainingWidth -= count * space.width;
            }
        }

        monospacedString += char + spaceCount;
    }

    return "\u2800\n" + monospacedString.replace(/\\/g, "\\\\").replace(/\|/g, "\\|").replace(/_/g, "\\_").replace(/`/g, "\\`").replace(/~/g, "\\~").replace(/\*/g, "\\*").replace(/\>/g, "\\>");
}

document.getElementById("encode").addEventListener("click", () => {
    output.innerHTML = monospacedText(input.value, font.value);
    characterAmount.innerHTML = output.textContent.length + " chars";
});
