
function encode(text) {
    return "⠀\n" + text.replace(/./g, function(c) {
        return c + " "
    }).replace(/_  /g, "__").replace(/\\/g, "\\\\").replace(/  /g, "⠀").replace(/\|/g, "\\|").replace(/_/g, "\\_").replace(/`/g, "\\`").replace(/~/g, "\\~").replace(/ /g, " ")
}

document.getElementById("encode").addEventListener("click", () => {
    console.log(encode(input.value))
    output.innerHTML = encode(input.value)
    characterAmount.innerHTML = output.value.length + " chars"
})
