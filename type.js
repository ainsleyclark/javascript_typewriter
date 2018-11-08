requestAnimationFrame(typer);

const words = `
 Testing type writer.
 And now some more text.
 You can remove some<<<<<<<<<<<delete text as well.
 Displays a typing effect on the home page.
 If you want to speed up the rate of characters just subtract from the start time.
 I have added an example that randomly speeds up every 1/20 character. 
 To slow down just add to the start time.`;

const leftChar = ":>";
const textContainer = document.getElementById('typingText');
const speed = 100;
var startTime;
var lastCharPos;
var currentLine;

for (let i = 0; i < 2; i++) {
  textContainer.appendChild(Object.assign(document.createElement("div"), {
    className: "typed--typed-text",
    textContent: ""
  }));
}
// removes top line, clears it and adds to bottom of container
function newLine() {
  currentLine = textContainer.querySelector(".typed--typed-text");
  textContainer.removeChild(currentLine);
  textContainer.appendChild(currentLine);
  currentLine.textContent = leftChar;
}


function typer(time) {
  var str = "";
  if (startTime === undefined) {
    newLine();
    startTime = time;
    lastCharPos = 0;
  }

  // 1 in 20 characters are 50ms faster
  if (Math.random() < 0.05) { startTime -= 50 }

  const charPos = (time - startTime) / speed | 0;
  while (lastCharPos <= charPos) {
    const char = words[(lastCharPos++) % words.length];
    if (char === "\n") {
      currentLine.textContent += str;
      str = "";
      newLine();
    } else if (char === "<") {
      const text = currentLine.textContent;
      currentLine.textContent = text.substring(0,text.length-1);
    } else {
      str += char;
    }
  }
  currentLine.textContent += str;
  requestAnimationFrame(typer);
}
