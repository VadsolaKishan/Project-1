let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".resetBtn");
let newGame = document.querySelector(".newGame");
let status = document.querySelector("#status");
let statusContainer = document.querySelector(".statusContainer")

let currentPlayer = true;

const winPatterns = [
    [0,1,2],[0,3,6],[0,4,8],
    [2,4,6],[1,4,7],[3,4,5],
    [2,5,8],[6,7,8]
];

boxes.forEach((box) => {
    box.addEventListener("click",() => {

        if(box.innerText !== "")
        return;

        if(currentPlayer)
        {
            box.innerText = "X";
            currentPlayer = false;
        }

        else
        {
            box.innerText = "O";
            currentPlayer = true;
        }
        cheakWinner();
    });
});

const showWinner = (winner) => {
    if(winner)
    {
        status.innerText = `🎉 Congratulation, Winner is ${winner}`;
        statusContainer.classList.add("hide");
    }
    else 
    {
        status.innerText = `🤝 Match is Draw`;
    }

    for(let box of boxes)
    {
        box.disabled = true;
    }
};

const cheakWinner = () => {
    for(let pattern of winPatterns)
    {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText; 
        let pos3Val = boxes[pattern[2]].innerText; 

        if(pos1Val != "" && pos2Val != "" && pos3Val != "")
        {
            if(pos1Val === pos2Val && pos2Val === pos3Val)
            {
                showWinner(pos1Val);
                return;
            }
        }
    }

    if ([...boxes].every(box => box.innerText !== "")) 
    {
        statusContainer.classList.remove("hide");
        showWinner(null);
    }
};

const enableButton = () => {
    for(let box of boxes)
    {
        box.disabled = false;
        box.innerText = "";
    }
};

const resetButton = () => {
    currentPlayer = true;
    enableButton();
    statusContainer.classList.add("hide");
    status.innerText = "";
};

resetBtn.addEventListener("click", resetButton);
newGame.addEventListener("click",resetButton);