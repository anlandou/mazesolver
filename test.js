var canvas; 
var ctx; //context 
var output; //Good

var WIDTH = 1200;
var HEIGHT = 800; 

tileWidth = 20; 
tileHeight = 20; 

tileRows = 25;
tileColumns = 40; 

dragok = false; 

boundX = 0;
boundY = 0; 

var tiles = []; 
for(i = 0; i < tileColumns; i++)
{
    tiles[i] = []; 
    for(j = 0; j < tileRows; j++)
    {
        tiles[i][j] = {x: i*(tileWidth+3), y: j*(tileHeight+3), state: 'e'};
    }
}

tiles[0][0].state = 's';
tiles[tileColumns-1][tileRows-1].state = 'f'; 

function rect(x,y,w,h,state)
{

    if(state == 's')
    {
        ctx.fillStyle = '#f6e800'
    }
    else if(state == 'f')
    {
        ctx.fillStyle = '#00a100'
    }

    else if( state == 'e')
    {
       ctx.fillStyle = '#029efc';
    }

    else if( state == 'w')
    {
       ctx.fillStyle = '#AA3015'; 
    }

    else if(state == 'x')
    {
       ctx.fillStyle = '#f57842';
    }

    else
    {
        ctx.fillStyle = '#fafafa';
    }

   
    ctx.beginPath(); 
    ctx.rect(x,y,w,h);
    ctx.closePath();
    ctx.fill(); 

}

function clear()
{
    ctx.clearRect(0,0,WIDTH,HEIGHT);
}

function draw()
{
    clear();

    for(i = 0; i < tileColumns; i++)
    {
        for(j = 0; j < tileRows; j++)
        {
        rect(tiles[i][j].x, tiles[i][j].y, tileWidth, tileHeight, tiles[i][j].state);
        }
    }
    

}

function findBiggestIndex(queue)
{
    var biggestIndex = 0; 

    for(var i = 0; i < queue.length; i++)
    {
        if(queue[i][0] + queue[i][1] > queue[biggestIndex][0] + queue[biggestIndex][1])
        {
                biggestIndex = i;
        }
    }

    return biggestIndex; 
}
function solveMaze()
{
    var queue = [[0, 0]]; 

    var pathFound = false; 

    var xLoc; 
    var yLoc; 

    while(queue.length > 0 && !pathFound)
    {
        // xLoc = Xqueue.shift(); 
        // yLoc = Yqueue.shift(); 
        
    var index = findBiggestIndex(queue); 
    xLoc = queue[index][0]; 
    yLoc = queue[index][1]; 

    queue.splice(index, 1); 

        if(xLoc > 0)
        {
            if(tiles[xLoc-1][yLoc].state == 'f')
            {
                pathFound = true;
            }
        }

        if(xLoc < tileColumns - 1 )
        {
            if(tiles[xLoc+1][yLoc].state == 'f')
            {
                pathFound = true; 
            }
        } 
        
        
        if(yLoc > 0)
        {
            if(tiles[xLoc][yLoc-1].state == 'f')
            {
                pathFound = true;
            }
        }

        if(yLoc < tileRows - 1 )
        {
            if(tiles[xLoc][yLoc+1].state == 'f')
            {
                pathFound = true; 
            }
        } 

        if(xLoc > 0)
        {
            if(tiles[xLoc-1][yLoc].state == 'e')
            {
                queue.push([xLoc-1,yLoc]);
                tiles[xLoc-1][yLoc].state = tiles[xLoc][yLoc].state + 'l'; 
            }
        }

        if(xLoc < tileColumns - 1 )
        {
            if(tiles[xLoc+1][yLoc].state == 'e')
            {
                queue.push([xLoc+1,yLoc]);
                tiles[xLoc+1][yLoc].state = tiles[xLoc][yLoc].state + 'r'; 
            }
        } 
        
        
        if(yLoc > 0)
        {
            if(tiles[xLoc][yLoc-1].state == 'e')
            {
                queue.push([xLoc,yLoc-1]); 
                tiles[xLoc][yLoc-1].state = tiles[xLoc][yLoc].state + 'u'; 
            }
        }

        if(yLoc < tileRows - 1)
        {
            if(tiles[xLoc][yLoc+1].state == 'e')
            {
                queue.push([xLoc,yLoc+1]); 
                tiles[xLoc][yLoc+1].state = tiles[xLoc][yLoc].state + 'd'; 
            }
        } 
    }

    if(!pathFound)
    {
        output.innerHTML = 'No Solution'; 
    }

    else
    {
        output.innerHTML = 'Solved!'; 
        var path = tiles[xLoc][yLoc].state; 
        var pathLength = path.length; 
        var currX = 0; 
        var currY = 0;
            for(var i = 0; i < pathLength-1; i++)
            {              

                if(path.charAt(i+1) == 'u')
                {
                    currY -= 1; 
                }

                if(path.charAt(i+1) == 'd')
                {
                    currY += 1; 
                }

                if(path.charAt(i+1) == 'r')
                {
                    currX += 1; 
                }
                
                if(path.charAt(i+1) == 'l')
                {
                    currX -= 1; 
                }

                tiles[currX][currY].state = 'x';
            }

    }
}

function reset()
{
    for(i = 0; i < tileColumns; i++)
{
    tiles[i] = []; 
    for(j = 0; j < tileRows; j++)
    {
        tiles[i][j] = {x: i*(tileWidth+3), y: j*(tileHeight+3), state: 'e'};
    }

    output.innerHTML = ''; 
}

tiles[0][0].state = 's';
tiles[tileColumns-1][tileRows-1].state = 'f'; 
}

function startUp() 
{
    canvas = document.getElementById("myCanvas"); 
    ctx = canvas.getContext("2d"); 
    output = document.getElementById("outcome"); 
    return setInterval(draw, 10);
}


function myMove(e)  //Good 
{
    x = e.pageX - canvas.offsetLeft;
    y = e.pageY - canvas.offsetTop;

    for(i = 0; i < tileColumns; i++)
    {
        for(j = 0; j < tileRows; j++)
        {
            if(i*(tileWidth+3) < x && x < i*(tileWidth+3)+tileWidth && j*(tileHeight+3) < y && y < j*(tileHeight+3)+tileHeight)
            {
                if(tiles[i][j].state == 'e' && (i != boundX || j != boundY)) //Good
                {
                    tiles[i][j].state = 'w';
                    boundX = i; 
                    boundY = j;  
                }

                else if(tiles[i][j].state == 'w' && (i != boundX || j != boundY)) //Good 
                {
                    tiles[i][j].state = 'e';
                    boundX = i; 
                    boundY = j;  
                }
            }
        }
    }
}

function myDown(e) //Good 
{
    canvas.onmousemove = myMove; 

    x = e.pageX - canvas.offsetLeft;
    y = e.pageY - canvas.offsetTop;

    for(i = 0; i < tileColumns; i++)
    {
        for(j = 0; j < tileRows; j++)
        {
            if(i*(tileWidth+3) < x && x < i*(tileWidth+3)+tileWidth && j*(tileHeight+3) < y && y < j*(tileHeight+3)+tileHeight)
            {
                if(tiles[i][j].state == 'e')
                {
                    tiles[i][j].state = 'w';

                    boundX = i; 
                    boundY = j;  
                }

                else if(tiles[i][j].state == 'w')
                {
                    tiles[i][j].state = 'e';
                    boundX = i; 
                    boundY = j; 
                }
            }
        }
    }
}

function myUp() //Good
{
    canvas.onmousemove = null;
}

startUp(); 
canvas.onmousedown = myDown; 
canvas.onmouseup = myUp; 