//JavaScript for project 2

//Extra Feature
//Animated win notification


//Game starts when shuffle is clicked 
$(document).ready ( function(){


	var t = 0;
	var l = 0;
	var a = 0;
	var rows = 4;
	var cols = 4;
	var winner;
	//Assigns left and right empty position in the puzzle
	var emptyX = 300 + "px";
	var emptyY = 300 + "px";
	var start = false; 
	var stop;
	var puzzle = $("#puzzlearea");
	var puzzlepieces = puzzle.children();
	var sButton = document.getElementById("shufflebutton");	
	
	for(a = 0; a<puzzlepieces.length; a++){
		
		posX = (t * 100) + "px";
		posY = (l * 100 )+ "px";
		var bPosX = t * -100 + "px"
		var bPosY = -l * 100 + "px"; 
		$(puzzlepieces[a]).addClass("puzzlepiece");
		puzzlepieces[a].style.top = posX;
		puzzlepieces[a].style.left = posY;
		puzzlepieces[a].style.backgroundPosition = + bPosY + bPosX ; 
		puzzlepieces[a].addEventListener("mouseover", function(){
						
				if (canMove(posX, posY)){
					
					puzzlepieces[a].addClassName("movablepiece");
				}		
				else if ($(puzzlepieces[a]).hasClass("moveablepiece")){
					puzzlepieces[a].removeClass("moveablepiece");
				}
				
		});
		puzzlepieces[a].addEventListener("click", swapTiles(a));
			
		l++;	
			if (l > 3){
				t++;
				l = 0;
			}
	}
	
	
	//Changes tile pieces 
	function swapTiles(index){
			
			var tempX = puzzlepieces[index].style.top;
			var tempY = puzzlepieces[index].style.left;
			
			if (canMove(puzzlepieces[index].style.top, puzzlepieces[index].left)){
					
				puzzlepieces[index].style.top = emptyY;
				emptyY = tempX ;
				puzzlepieces[index].style.left = emptyX;
				emptyX = tempY;
			}
		
			if(Winner()){
				
				$(".explanation").innerHTML = "Winner";
				puzzle.style.backgroundImage = "url('winner.gif') ";
				for (var k = 0; k<puzzlepieces.length;k++){
				
					puzzlepieces[a].style.backgroundPosition = "-" + puzzlepieces[a].style.left + " -" + puzzlepieces[a].style.top; 
					
				}
			}
	};
	
	//Shuffles pieces before game starts 
	var pieces = [];
	sButton.click(function (){
		start = true;
		//Allow for mutiple shifts
		for(n = 0; n < 400; n++){
			//Shifts all 15 pieces
			for(m = 0; m < puzzlepieces.length; m++){
				
				 var pX= (puzzlepieces[m].style.top); 
				 var pY= puzzlepieces[m].style.left;

				if(canMove(tX,tY)){
					
					pieces.push(puzzlepieces[m]);
				}
			
			}	
			swapTiles(Math.floor(Math.random()* tiles.length));
			//Clears array for new tiles that can be moved
			pieces = [];
		}
	});
	
	
	
	//Checks to see if a piece can be moved
	function canMove(cPieceX, cPieceY){
		//var mStatus = false;
		if (start){
			var tPos = (emptyX - parseInt(cPieceX));
			var lPos = (emptyY - parseInt(cPiecey));
			
				if(((tPos === 0) && (lPosY === 100)) || ((tPos ===100) && (lPos === 0))){
					
					return true;
				}
				return false;
		}
	};
	
	//Indicated pieces that cn be moved
	/*var hovering = function moveablePiece(){
		
		if(canMove()){
			this.addClass("moveablepiece");
			
		}
		else if (this.hasClass("moveablepiece")){
			this.removeClass("moveablepiece");
		}
	};*/
	

	function Winner (){
		if (start){
			
			tNum = 1;
			for (var i = 0; i < puzzlepieces.length; i++){
				PosX = parseInt(puzzlepieces[i].style.top);
				PosY = parseInt(puzzlepieces[i].style.left);
				
				if((PosX = (i% rows * 100)) || (PosY = (i/cols * 100))){
				
					return true;
					break;
				}
			}
			return false;
		}
	}

});