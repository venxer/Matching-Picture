var cardOrder = ["a", "a", "b", "b", "c", "c", "d", "d", "e", "e", "f", "f", "g", "g", "h", "h"];
var nonClickable = []; 
var findingSecond = false;
var cardOne;
var cardTwo;
var cardOneId;
var cardTwoId;
var canClick = true;
var score = 0;

function initialize()
{
    console.log(cardOrder); //starting cardOrder
    randomize(cardOrder);
    console.log(cardOrder); //randomized cardOrder
	document.getElementById("score").innerHTML = score;
}
function randomize(arr)
{
    curLength = arr.length;
    while(0 != curLength)
    {
        ran = Math.floor(Math.random() * curLength);
        curLength -= 1;
        temp = arr[curLength];
        arr[curLength] = arr[ran];
        arr[ran] = temp;
    }
    return arr;
}
function isClicked(cardId)
{
	console.log("canClick: " + canClick); 
    if(canClick && nonClickable.indexOf(cardId) == -1)
    {
		score++;
		document.getElementById("score").innerHTML = score;
        console.log(cardId);
        findingSecond = !findingSecond;
        if(findingSecond) //if first card is clicked
        {
            cardOneId = cardId;
            cardOne = cardOrder[cardId];
            nonClickable.push(cardOneId);
            console.log("cardOne: " + cardOne);
        }
        else // if second card is clicked
        {
            cardTwoId = cardId;
            cardTwo = cardOrder[cardId];
            console.log("cardTwo: " + cardTwo);
            nonClickable.splice(nonClickable.indexOf(cardOneId)); 
            matching = matchingCard(cardOne, cardTwo); //checks if matching and resets values
            console.log("matching: " + matching);
			if(matching)
			{
				nonClickable.push(cardOneId, cardTwoId); //if matching, cards can no longer be clickable
			}
			else //if not matching
			{
				console.log("pretime");
				canClick = false; //allows cards to no longer be clickable
				setTimeout(() => {
					getImage(100); //goes back to questionMark
					canClick = true;
					console.log("posttime");
				}, 1000);
			}
        }	
    }
}
function matchingCard(c1, c2)
{   
    cardOne = undefined;
    cardTwo = undefined;
    return c1 == c2;
}
function getImage(cardId)
{
	console.log("GETIMAGE(" + cardId + ") canclick: " + canClick);
    image = document.getElementById(cardId);
    if(cardId == 100 && !findingSecond)
    {
        image1 = document.getElementById(cardOneId); 
        image1.src = "icons/questionMark.png";
		console.log("changed card 1 to questionMark");
		image2 = document.getElementById(cardTwoId); 
        image2.src = "icons/questionMark.png"; 
		console.log("changed card 2 to questionMark");
    }
	if(canClick)
	{
		if(cardOrder[cardId] == "a")
		{
			image.src = "icons/cabbage.png";
		}
		if(cardOrder[cardId] == "b")
		{
			image.src = "icons/carrot.png";
		}    
		if(cardOrder[cardId] == "c")
		{
			image.src = "icons/corn.png";
		}    
		if(cardOrder[cardId] == "d")
		{
			image.src = "icons/glove.png";
		}    
		if(cardOrder[cardId] == "e")
		{
			image.src = "icons/hay.png";
		}    
		if(cardOrder[cardId] == "f")
		{
			image.src = "icons/pitchfork.png";
		}
		if(cardOrder[cardId] == "g")
		{
			image.src = "icons/shear.png";
		}
		if(cardOrder[cardId] == "h")
		{
			image.src = "icons/yarn.png";
		}
	}
}
function reset()
{
	score = 0;
	document.getElementById("score").innerHTML = score;
	for(let x = 0; x < 16; x++)
	{
		document.getElementById(x).src = "icons/questionMark.png";
	}
	nonClickable =[];
	randomize(cardOrder);
	console.log("RESET!")
}
function getScore()
{
	return score;
}