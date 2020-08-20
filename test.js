var canvas; 
var ctx; //context 
var output; 

var WIDTH = 1200;
var HEIGHT = 800; 

tileWidth = 20; 
tileHeight = 20; 

tileRows = 25;
tileColumns = 40; 

boundX = 0;
boundY = 0; 

var tiles = []; 
for(i = 0; i < tileColumns; i++)
{
    tiles[i] = []; 
    for(j = 0; j < tileRows; j++)
    {
        tiles[i][j] = {x: i*(tileWidth+3), y: j*(tileHeight+3), state: 'empty'};
    }
}

tiles[0][0].state = 'start';
tiles[tileColumns-1][tileRows-1].state = 'finish'; 

function rect(x,y,w,h,state)
{
    if(state == 'start')
    {
        ctx.fillStyle = '#f6e800'
    }
    else if(state == 'finish')
    {
        ctx.fillStyle = '#00a100'
    }

    else if( state == 'empty')
    {
       ctx.fillStyle = '#029efc';
    }

    else if( state == 'wall')
    {
       ctx.fillStyle = '#432409';
    }

    else if( state == 'x')
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
    ctx.fillStyle = '#029efc';
    
    for(i = 0; i < tileColumns; i++)
    {
        for(j = 0; j < tileRows; j++)
        {
        rect(tiles[i][j].x,tiles[i][j].y,tileWidth, tileHeight, tiles[i][j].state);
        }
    }
    

}

function solveMaze()
{
    var Xqueue = [0]; 
    var Yqueue = [0]; 

    var pathFound = false; 

    var xLoc; 
    var yLoc; 

    while(Xqueue.length > 0 && !pathFound)
    {
        xLoc = Xqueue.shift(); 
        yLoc = Yqueue.shift(); 
        
        if(xLoc > 0)
        {
            if(tiles[xLoc-1][yLoc].state == 'finish')
            {
                pathFound = true;
            }
        }

        if(xLoc < tileColumns -1 )
        {
            if(tiles[xLoc+1][yLoc].state == 'finish')
            {
                pathFound = true; 
            }
        } 
        
        
        if(yLoc > 0)
        {
            if(tiles[xLoc][yLoc-1].state == 'finish')
            {
                pathFound = true;
            }
        }

        if(yLoc < tileRows -1 )
        {
            if(tiles[xLoc][yLoc+1].state == 'finish')
            {
                pathFound = true; 
            }
        } 

        if(xLoc > 0)
        {
            if(tiles[xLoc-1][yLoc].state == 'empty')
            {
                Xqueue.push(xLoc-1);
                Yqueue.push(yLoc); 
                tiles[xLoc-1][yLoc].state = tiles[xLoc][yLoc].state + 'left'; 
            }
        }

        if(xLoc < tileColumns - 1 )
        {
            if(tiles[xLoc+1][yLoc].state == 'empty')
            {
                Xqueue.push(xLoc+1);
                Yqueue.push(yLoc); 
                tiles[xLoc+1][yLoc].state = tiles[xLoc][yLoc].state + 'right'; 
            }
        } 
        
        
        if(yLoc > 0)
        {
            if(tiles[xLoc][yLoc-1].state == 'empty')
            {
                Xqueue.push(xLoc);
                Yqueue.push(yLoc)-1; 
                tiles[xLoc][yLoc-1].state = tiles[xLoc][yLoc].state + 'up'; 
            }
        }

        if(yLoc < tileRows - 1)
        {
            if(tiles[xLoc][yLoc+1].state == 'empty')
            {
                Xqueue.push(xLoc);
                Yqueue.push(yLoc+1); 
                tiles[xLoc][yLoc+1].state = tiles[xLoc][yLoc].state + 'down'; 
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
            for(var i = 0; i < pathLength; i++)
            {
                if(path.charAt(i+1) == 'up')
                {
                    currY -= 1; 
                }

                if(path.charAt(i+1) == 'down')
                {
                    currY += 1; 
                }

                if(path.charAt(i+1) == 'right')
                {
                    currX += 1; 
                }
                
                if(path.charAt(i+1) == 'left')
                {
                    currX -= 1; 
                }

                tiles[currX][currY].state = 'x'; 
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
        tiles[i][j] = {x: i*(tileWidth+3), y: j*(tileHeight+3), state: 'empty'};
    }

    output.innerHTML = ''; 
}

tiles[0][0].state = 'start';
tiles[tileColumns-1][tileRows-1].state = 'finish'; 
}

function startUp() 
{
    canvas = document.getElementById("myCanvas"); 
    ctx = canvas.getContext("2d"); 
    output = document.getElementById("outcome"); 
    return setInterval(draw, 10);
}


function myMove(e)
{
    x = e.pageX - canvas.offsetLeft;
    y = e.pageY - canvas.offsetTop;

    for(i = 0; i < tileColumns; i++)
    {
        for(j = 0; j < tileRows; j++)
        {
            if(i*(tileWidth+3) < x && x < i*(tileWidth+3)+tileWidth && j*(tileHeight+3) < y && y < j*(tileHeight+3)+tileHeight)
            {
                if(tiles[i][j].state == 'empty' && (i != boundX || j != boundY))
                {
                    tiles[i][j].state = 'wall';
                    boundX = i; 
                    boundY = j;  
                }

                else if(tiles[i][j].state == 'wall' && (i != boundX || j != boundY))
                {
                    tiles[i][j].state = 'empty';
                    boundX = i; 
                    boundY = j;  
                }
            }
        }
    }
}

function myDown(e)
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
                if(tiles[i][j].state == 'empty')
                {
                    tiles[i][j].state = 'wall';

                    boundX = i; 
                    boundY = j;  
                }

                else if(tiles[i][j].state == 'wall')
                {
                    tiles[i][j].state = 'empty';
                    boundX = i; 
                    boundY = j; 
                }
            }
        }
    }
}

function myUp()
{
    canvas.onmousemove = null;
}

startUp(); 
canvas.onmousedown = myDown; 
canvas.onmouseup = myUp; 