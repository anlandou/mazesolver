var canvas; 
var ctx; //context 

var WIDTH = 1200;
var HEIGHT = 800; 

tileWidth = 20; 
tileHeight = 20; 

tileRows = 25;
tileColumns = 40; 

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

function startUp() 
{
    canvas = document.getElementById("myCanvas"); 
    ctx = canvas.getContext("2d"); 
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
                if(tiles[i][j].state == 'empty')
                {
                    tiles[i][j].state = 'wall';
                }

                else if(tiles[i][j].state == 'wall')
                {
                    tiles[i][j].state = 'empty';
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
                    
                }

                else if(tiles[i][j].state == 'wall')
                {
                    tiles[i][j].state = 'empty';
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