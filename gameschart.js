/***************************************************************************
 * This code is to be used "AS IS". DO NOT CHANGE THIS CODE IN ANYWAY.     *
 * This code is the intellectual property of Games Chart Ltd.              *
 * Any modification to this code will be considered a breach of copyright. *
 ***************************************************************************/
// JavaScript Document
window.onload = GC_updateAll;

var aImgIcon = new Array();
var imgGCIcon = new Image();
var thumbnails = new Array(10);
var imgCloseButton = new Image();
var imgGamesChartLink = new Image();
var imgPlayButton = new Image();
var imgVideo = new Image();
var titles = new Array(10);
var descriptions = new Array(10);
var gameIDs = new Array(10);
var urlVideo = new Array(10);
var urlGame  = new Array(10);

var GC_canvas;
var GC_ctx;
var canX;
var canY;
var GC_width;
var GC_height;
var GC_gameURL="";
var GC_ticker=0;
var bDoAnim=false;
var GC_animframe=0;
var GC_animdelay=0;
var ANIM_FRAMES=42;
var mouseIsDown=0;
var mouseState="MOUSE UP";
var iconX=0;
var iconY=0;
var iconW=45;
var iconH=45;

var CHART_FEATURED=0;
var CHART_OFFICIAL=1;
var currentChart=CHART_FEATURED;


var SHOW_ICON=0;
var SHOW_CHART=1;
var chartState=SHOW_ICON;

var gameW=640;
var gameH=480;

var animTrigger=200;

var chartWidth=gameW-16;
var chartBackX=0;


var offsetsX = new Array();
var GC_frameDelay=0;

var chartTitleH=58;
var entryH=30;
var elementSize=30;

// featured tab click zone
var rectFeaturedX=chartBackX+27;
var rectFeaturedY=30;
var rectFeaturedW=110;
var rectFeaturedH=elementSize-6;

// official tab click zone
var rectOfficialX=chartBackX+138;
var rectOfficialY=30;
var rectOfficialW=110;
var rectOfficialH=elementSize-6;

// close rect
var rectCloseX=chartBackX+gameW-94;
var rectCloseY=30;
var rectCloseW=elementSize-6;
var rectCloseH=elementSize-6;

// GC link rect
var rectGCLinkX=chartBackX+gameW-160;
var rectGCLinkY=gameH-60;
var rectGCLinkW=104;
var rectGCLinkH=24;

var rectAvailableChartMinY=0;
var rectAvailableChartMaxY=0;




var rectEntries=new Array();
var autostart=false;
var GC_startupcalled = false;
// date

var sessionID = "58a3aa96918c3794b0c82ca55c7cd67c"; // temp
var chronKey = "222d86ceb80a469c58f44db9600e8d30";
var gameid="66408cd91c6c95ee2a56acc5f9014b86";
var strTarget="";

var jobj_data = new Array();
var jobj_payload = new Array();
var jobj_capabilities = new Array();


var b64="NO DATA";
var appdata="NO DATA";
var response="NO RESPONSE";
var overElement=0;
var lastElement=overElement;
var allowIconAnim=true;

var readyToDraw=false;

var GC_loadDelay=0;
var GC_LOAD_DELAY_TIME=100;


var GC_loading=true;
var iconYOffset=0;

var officialID = 1;
var featuredID = 3;

var GC_started=false;

var GATEWAY_ADDRESS = "http://gameschart.com/html5_client/gateway.php";
var enabled=0;
var disabled=1;


var chartOffsetY=0;


var click=0;
var sliderDown=false;

var slideAmount=0;
var slideMin=rectCloseY+rectCloseH+8;
var slideMax=rectGCLinkY-40;
var slideSize=0;
var redTabExtra=0;
var visibleEntries=0;
var rectSliderX=rectCloseX+92;
var rectSliderY=slideMin;
var rectSliderW=8;
var rectSliderH=40;

function GamesChart() {
	
}

GamesChart.prototype = {
	start: function() {
		if (!GC_startupcalled)
		{
			GC_updateAll();
			GC_startupcalled=true;
		}
	},
	update: function() {
		if (!GC_startupcalled)
		{
			GC_updateAll();
			GC_startupcalled=true;
		}
	}
}

function GC_initVars()
{
	if (!GC_started)
	{
		//var loadInfo=document.getElementById("loadTime");
		//GC_LOAD_DELAY_TIME=loadInfo.title*1000;
		
		
		var gamediv=document.getElementById("gamesdiv");
		var time = gamediv.getAttribute("data-loadtime");
		if (time < 1)
		{
			time=1;	
		}
		if (time > 20)
		{
			time = 20;	
		}
		GC_LOAD_DELAY_TIME=time*1000;
		
		gameid = gamediv.getAttribute("data-gameid");
		
		var gw=document.getElementById("gameWidth");
		var gh=document.getElementById("gameHeight");
		
		
		gameW= document.getElementById("gcCanvas").width;
		gameH=document.getElementById("gcCanvas").height;

		
		GC_loading=true;
		setInterval(function(){GC_loading=false;},GC_LOAD_DELAY_TIME);
		GC_started=true;
	}
}


function GC_initCharts()
{
	GC_canvas = document.getElementById("gcCanvas");
	GC_ctx = GC_canvas.getContext("2d");
	GC_width = window.innerWidth;
	GC_height = window.innerHeight;
	GC_gameURL = window.location.href;
	//console.log("GC_gameURL:"+GC_gameURL);
	game = document.getElementById("game");
	
	for (i=0; i<ANIM_FRAMES-1; i++)
	{
		aImgIcon[i]= new Image();
		aImgIcon[i].src="http://www.howlettmedia.com/test/icon/"+i+".png";
	}
	imgIcon=new Image();
	imgIcon.src="http://www.howlettmedia.com/test/icon/41.png";
	for (i=0; i<10; i++)
	{
		rectEntries[i]=new Array(4);
		rectEntries[i][0]=0;
		rectEntries[i][1]=1;
		rectEntries[i][2]=0;
		rectEntries[i][3]=0;
		thumbnails[i] = new Array(2);
		thumbnails[i][0] = new Image();
		thumbnails[i][0].src="http://www.howlettmedia.com/test/icon/GC_icon2.png";
		thumbnails[i][1] = new Image();
		thumbnails[i][1].src="http://www.howlettmedia.com/test/icon/GC_icon2.png";
				
		titles[i] = new Array(2);
		titles[i][0] = "Featured Title "+(i+1);
		titles[i][1] = "Official Title "+(i+1);
		
		descriptions[i] = new Array(2);
		descriptions[i][0] = "Featured Description "+(i+1);
		descriptions[i][1] = "Official Description "+(i+1);
		
		gameIDs[i] = new Array(2);
		gameIDs[i][0] = "0"+i;
		gameIDs[i][1] = "1"+i;
		
		urlVideo[i] = new Array(2);
		urlVideo[i][0]=undefined;//"http://www.youtube.com/watch?v=xxNGmFVPmUE";
		urlVideo[i][1]=undefined;//"http://www.youtube.com/watch?v=xxNGmFVPmUE";
		urlGame[i]  = new Array(2);
		urlGame[i][0]="http://gameschart.com/";
		urlGame[i][1]="http://gameschart.com/";
		
	}
	imgCloseButton = new Image();
	imgCloseButton.src = "http://www.howlettmedia.com/test/closebutton.png";
	
	imgGamesChartLink = new Image();
	imgGamesChartLink.src = "http://www.howlettmedia.com/test/GC_link.png";
	
	imgPlayButton = new Image();
	imgPlayButton.src = "http://www.howlettmedia.com/test/tiny/arrowbutton.png";
	
	imgVideo = new Image();
	imgVideo.src = "http://www.howlettmedia.com/test/tiny/YT_icon.png";
	// positioning
	iconX=0;
	iconY=0;
	
	for (i=0; i<10; i++)
	{
		offsetsX[i]=-chartWidth;
	}

	imgGCIcon=null;
	imgGCIcon = new Image();
	imgGCIcon.src = "http://www.howlettmedia.com/test/icon/0.png";
	imgGCIcon.onLoad=GC_draw();
	iconYOffset=-imgGCIcon.height;
	// add event listeners
	GC_canvas.addEventListener("mousedown", GC_mouseDown, false);
    GC_canvas.addEventListener("mousemove", GC_mouseXY, false);
    GC_canvas.addEventListener("touchstart", GC_touchDown, false);
    GC_canvas.addEventListener("touchmove", GC_touchXY, true);
    GC_canvas.addEventListener("touchend", GC_touchUp, false);
	GC_canvas.addEventListener("mousewheel",GC_mousewheel, false);  
	GC_canvas.addEventListener("DOMMouseScroll", GC_mousewheel, false);  
 
    document.body.addEventListener("mouseup", GC_mouseUp, false);
    document.body.addEventListener("touchcancel",GC_touchUp, false);
	document.body.addEventListener("mousemove", GC_mouseXY, false);
	
	
	entryH=(gameH-130)/10;
	
	if (entryH < 32)
	{
		entryH=32;	
	}
	
	rectAvailableChartMinY=rectCloseY+rectCloseH;
	rectAvailableChartMaxY=rectGCLinkY;
	
	
	visibleEntries=Math.floor((gameH-elementSize*4)/entryH);
	if (visibleEntries>10)visibleEntries=10;
	
	
	
	
	console.log("AvailableMINY:"+rectAvailableChartMinY)
	console.log("AvailableMAXY:"+rectAvailableChartMaxY)
	console.log("AvailableDIFF:"+(rectAvailableChartMaxY-rectAvailableChartMinY))
	console.log("ENTRYH:"+entryH)
	
	console.log("visibleEntries:"+visibleEntries)
	
	GC_resetBackground();
	GC_resetAnims();
	GC_buildData();
	readyToDraw=true;
	return false;
}

function GC_registerGameClick(_gameid, rank)
{
	if (disabled==0)
	{
		//console.log("GAME CLICKED"+_gameid);
		strTarget="onGameClicked";
		
		var chartID=featuredID;
		if (currentChart == CHART_OFFICIAL)
		{
			chartID = officialID;	
		}
		//console.log("chartID:"+chartID);
		
		
		jobj_payload=
		{
			"gid":_gameid,
			"sid":sessionID,
			"chronKey":chronKey,
			"gameRank":rank,
			"chartID":chartID
		};
		
		jobj_data=
		{
			"target":strTarget,
			"payload":jobj_payload
		};
		appdata = rot13(Base64.encode(JSON.stringify(jobj_data)));
		
		//appdata = JSON.stringify(jobj_data);
		
		response = GC_processGameClick(GATEWAY_ADDRESS, appdata);
	}
	return response;
}


function GC_buildData()
{
	strTarget="onGameLoad";
	jobj_capabilities=
	{
		"supports64BitProcesses":"",
		"supports32BitProcesses":"",
		"hasIME":"",
		"language":"EN",
		"manufacturer":"MANU",
		"cpuArchitecture":"",
		"os":""+ "0001",
		"isEmbeddedInAcrobat":"",
		"maxLevelIDC":"",
		"windowlessDisable":"",
		"localFileReadDisable":"",
		"avHardwareDisable":"",
		"playerType":"",
		"isDebugger":"",
		"hasScreenBroadcast":"",
		"hasScreenPlayback": "",
		"hasPrinting":"",
		"hasEmbeddedVideo":"",
		"hasStreamingVideo":"",
		"hasStreamingAudio":"",
		"version":"",
		"hasAudio":"",
		"hasMP3":"",
		"hasAudioEncoder":"",
		"hasVideoEncoder":"",
		"hasTLS":"",
		"screenResolutionX":""+window.innerWidth,
		"screenResolutionY":""+window.innerHeight,
		"screenDPI":"72",
		"screenColor":"color",
		"pixelAspectRatio":"1",
		"hasAccessibility":""
	};
	
	jobj_payload=
	{
		"capabilities":jobj_capabilities,
		"chronKey":chronKey,
		"gameIDHash":""+gameid,
		"apiType":"AS2-API",
		"brainVersion":"0.0.1",
		"apiVersion":""+"ee",
		"gameURL":""+GC_gameURL
	};
	
	jobj_data=
	{
		"target":strTarget,
		"payload":jobj_payload
	};
	
	//console.log("JSON:"+JSON.stringify(jobj_data));
	//console.log("JSON:"+rot13(JSON.stringify(jobj_data)));
	
	//appdata = rot13(Base64.encode(JSON.stringify(jobj_data)));
	appdata = rot13(Base64.encode(JSON.stringify(jobj_data)));
	console.log("JSON:"+appdata);
	
	response = GC_processAppData(GATEWAY_ADDRESS, appdata);
	
	return response;
}

function GC_resetAnims()
{	
	for (i=0; i<10; i++)
	{
		offsetsX[i]=-chartWidth;
	}
	overElement=0;
	chartOffsetY=0;
	rectSliderY=slideMin;
}

function GC_resetBackground()
{
	chartBackX=-chartWidth;
}

function GC_resetChartLayout()
{
	currentChart=CHART_FEATURED	;
}

function GC_init()
{
	
}

function GC_loadImages()
{
	
}

function GC_updateRects()
{
	rectFeaturedX=chartBackX+27;
	rectFeaturedY=30;
	rectFeaturedW=110;
	rectFeaturedH=elementSize-6;
	
	// official tab click zone
	rectOfficialX=chartBackX+138;
	rectOfficialY=30;
	rectOfficialW=110;
	rectOfficialH=elementSize-6;
	rectCloseX=chartBackX+gameW-94;
	rectCloseY=30;
	rectCloseW=elementSize-6;
	rectCloseH=elementSize-6;

	rectGCLinkX=chartBackX+gameW-194;
	rectGCLinkY=gameH-60;
	rectGCLinkW=128;
	rectGCLinkH=32;
	rectSliderX=rectCloseX+rectCloseW+rectSliderW+4;
	
	
	entryH=(gameH-130)/10;
	
	if (entryH < 32)
	{
		entryH=32;	
	}
	
	

	rectAvailableChartMinY=rectCloseY+rectCloseH;
	rectAvailableChartMaxY=rectGCLinkY;
	visibleEntries=Math.floor((gameH-elementSize*4)/entryH);
	if (visibleEntries>10)visibleEntries=10;
	
	slideMin=rectCloseY+rectCloseH+8;
	slideMax=rectGCLinkY-40;
	
	slideSize=slideMax-slideMin;
	
	slideAmount=((10-visibleEntries)*entryH);
	
	
	
	//console.log("entries:"+visibleEntries);
	//console.log("slidesize:"+slideSize);
	//console.log("slideAmount:"+slideAmount);
	
	
	

}

function GC_update()
{
	// general GC_ticker
	
	if (!GC_loading)
	{
		GC_ticker++;
		if (GC_ticker > 60)
		{
			GC_ticker = 1;	
		}
	
		// GC_animdelay GC_ticker
		if (allowIconAnim)
		{
			if (GC_animdelay < animTrigger)
			{
				GC_animdelay++;	
			}
			else
			{
				GC_animdelay=0;
				GC_animframe=0;
				animTrigger=50+(Math.floor(Math.random()*400));
				bDoAnim=true;
				
			}
			if (bDoAnim) 
			{
				if (GC_frameDelay==1)
				{
					GC_frameDelay=0;
					if (GC_animframe < ANIM_FRAMES-2)
					{
						GC_animframe++;	
					}
					else
					{
						GC_animframe=0;
						bDoAnim=false;
					}
				}
				else
				{
					GC_frameDelay=1;	
				}
			}	
		}
		
		
		
		// mouse tracking
		/*if (canX > iconX && canX < iconX+iconW && canY>iconY && canY < iconY+iconH && GC_animframe==0) 
		{
			//GC_animframe=0;
			bDoAnim=true
		}*/
		
		// chart animation
		if (chartState == SHOW_CHART)
		{
			// bring in the backdrop
			if (chartBackX<64)
			{
				diff = (16-chartBackX)/8;
				chartBackX = chartBackX+diff;
			}
			else
			{
				chartBackX=64;	
			}
			chartBackX=16+(iconW/2);
			
			// bring in the items once the backdrop has reached halfway
			if (chartBackX>-chartWidth/2)
			{
				// animate chart positions
				for (i=0; i<10; i++)
				{
					if (i==0)
					{
						diff = (16-offsetsX[i])/8;
						offsetsX[i] = offsetsX[i]+diff;
					}
					else
					{
						if (offsetsX[i-1]>-(chartWidth/2))
						{
							diff = (16-offsetsX[i])/8;
							offsetsX[i] = offsetsX[i]+diff;
						}
					}
					if (offsetsX[i]>0)
					{
						offsetsX[i]=0;
					}
				}
			}
		}
		if (iconYOffset<0)
		{
			var diff=(0-iconYOffset)/4;
			iconYOffset+=diff;
		}
		
		GC_updateRects();
	}
}


function GC_draw() 
{
	if (!GC_loading)
	{
		if (disabled==0)
		{
			if (chartState == SHOW_ICON)
			{
				GC_canvas.width  = gameW;
				GC_canvas.height = gameH;
				GC_canvas.style.left = 0;
				GC_canvas.style.top = 0;
				GC_ctx.font="12px Arial";
				//GC_ctx.fillStyle = "rgb(255,240,255)";
				//GC_ctx.fillText( "screen w: "+window.innerWidth,16,GC_canvas.height);
				//GC_ctx.fillText( "screen h: "+window.innerHeight,110,GC_canvas.height);
				//GC_ctx.fillText( "frame counter: "+GC_ticker,200,GC_canvas.height);
				//GC_ctx.fillText( ""+mouseState+" X: " + canX + " Y: " + canY,310 ,GC_canvas.height);
				
				
				GC_ctx.drawImage(aImgIcon[GC_animframe], gameW-(iconW+8), 8, iconW, iconH);
				GC_ctx.drawImage(aImgIcon[GC_animframe], gameW-(iconW+8), 8, iconW, iconH);
				if (!allowIconAnim)
				{
					GC_ctx.drawImage(imgIcon, gameW-(iconW+8), 8, iconW, iconH);
				}
			}
			else if (chartState == SHOW_CHART)
			{
				if (readyToDraw)
				{
					var selectedx=0;
					var selectedy=0;
					var selectedw=0;
					var selectedh=0;
					var minDrawY=(iconH>>1)+12;
					GC_canvas.width  = gameW;
					GC_canvas.height = gameH;
					GC_canvas.style.left = 0;
					GC_canvas.style.top = 0;
					
					//GC_ctx.fillStyle = "rgba(80,80,80, 0.80)";
					//GC_ctx.fillRect(chartBackX+2, (iconH>>1)+2, gameW-58, gameH-42);
					
					GC_ctx.fillStyle = "rgba(128,128,128, 0.50)";
					GC_ctx.fillRect(0, 0, gameW, gameH);
					
					GC_ctx.fillStyle = "rgba(90,90,90, 0.10)";
					GC_ctx.fillRect(chartBackX-5, (iconH>>1)-4, gameW-51, gameH-36);
					
					GC_ctx.fillStyle = "rgba(90,90,90, 0.20)";
					GC_ctx.fillRect(chartBackX-2, (iconH>>1)-2, gameW-53, gameH-34);
					
					//GC_ctx.fillStyle = "rgba(80,80,80, 0.20)";
					//GC_ctx.fillRect(chartBackX+8, (iconH>>1)+8, gameW-64, gameH-48);
					
					
					GC_ctx.fillStyle = "rgb(255,255,255)";
					GC_ctx.drawImage(aImgIcon[GC_animframe], gameW-(iconW+8), 8, iconW, iconH);
					
					
					GC_ctx.fillStyle = "rgb(255,255,255)";
					GC_ctx.fillRect(chartBackX, (iconH>>1), gameW-(16+iconW), gameH-45);	
					
				
					for (i=0; i<10; i++)
					{	
						var playIconSize=(entryH/2)+1;
						
						var elementx=offsetsX[i]+(iconW/2);
						var elementy=chartOffsetY+chartTitleH+(i)*(entryH+1);
	
						rectEntries[i][0]=elementx;
						rectEntries[i][1]=elementy;
						rectEntries[i][2]=gameW-iconW;
						rectEntries[i][3]=entryH;
						
						var num=""+(i+1);
						var numW=GC_ctx.measureText(num).width;
						var numH=2;//GC_ctx.measureText(num).height;
						var tabH=entryH;
						var tabY=elementy;
						var minTabY=minDrawY+26;
						
						//tabH-minDrawY
						if (elementy <= (rectGCLinkY-entryH)+(entryH) && elementy>=(rectCloseY+rectCloseH)-(entryH))
						{
							if (elementy<minTabY)
							{
								tabY=minTabY;
								tabH=entryH-((minTabY)-elementy);
								if (tabH<0)
								{
									tabH=0;	
								}
							}
							else if (elementy+entryH>rectGCLinkY)
							{
								
								tabH=entryH-(entryH-(rectGCLinkY-elementy));
								if (tabH<0)
								{
									tabH=0;	
								}	
							}
							if (i+1==overElement)
							{
								GC_ctx.fillStyle = "rgb(255,0,0)"; 
								
								
								
								GC_ctx.fillRect(elementx-redTabExtra, tabY,entryH+redTabExtra, tabH); 
								
								
								
								GC_ctx.font="bold 12px Arial";
								GC_ctx.fillStyle = "rgb(255,255,255)";
								
								if (elementy>minTabY-8 && elementy<rectGCLinkY-entryH)
								{
									GC_ctx.fillText( num, (elementx+(entryH/5))-redTabExtra, elementy+(entryH-(entryH/5)));
								}
								
								
								
								
								
								playIconSize=(entryH/2)+1;
								if ( redTabExtra < 10 )  redTabExtra+=2;
							}
							else
							{
								GC_ctx.fillStyle = "rgb(50,50,50)";
								GC_ctx.fillRect(elementx,tabY,entryH,tabH);
								GC_ctx.font="bold 12px Arial";
								GC_ctx.fillStyle = "rgb(255,255,255)";
								if (elementy>minTabY-8 && elementy<rectGCLinkY-entryH)
								{
								GC_ctx.fillText( num, elementx+(entryH/5),elementy+(entryH-(entryH/5)));
								}
								playIconSize=(entryH/2)+1;
							}

							elementx=elementx+entryH+2;

							GC_ctx.drawImage(thumbnails[i][currentChart], elementx,elementy,entryH,entryH);	
							elementx=elementx+entryH+2;
							
							var chartStart=offsetsX[i]+(iconW/2);	
							var blockw=(chartStart+gameW)-(elementx+iconW);  // gameW-((entryH*3)+3);
							var blockh=entryH;
							
							if (i%2==1)
							{
								GC_ctx.fillStyle = "rgb(235,235,235)";
							}
							else
							{
								GC_ctx.fillStyle = "rgb(255,255,255)";	
							}
							GC_ctx.fillRect(elementx,elementy,blockw-2,blockh);		

							if (i+1==overElement)
							{
								selectedx=elementx-(iconW-6);
								selectedy=elementy;
								selectedw=blockw+(iconW-6);
								selectedh=blockh;
								
								GC_ctx.fillStyle = "rgb(255,50,50)";
								elementx=elementx+11;
							}
							else
							{
								GC_ctx.fillStyle = "rgb(50,50,50)";
								elementx=elementx+12;
							}
							
							var strTitle=titles[i][currentChart];
							
							//console.log(titles[i][currentChart]);
							
							if (gameW < 480)
							{
								if (titles[i][currentChart].length > 20)
								{
									strTitle=titles[i][currentChart].substring(0, 20)+"...";
								}
							}
							
							GC_ctx.fillText( strTitle,elementx, elementy+20);
							GC_ctx.font="12px Arial";
							
							var entryW = GC_ctx.measureText(titles[i][currentChart]).width+GC_ctx.measureText(descriptions[i][currentChart]).width;
							
							//console.log("GAMEW:"+gameW);
							GC_ctx.fillStyle = "rgb(50,50,50)";
							if (gameW > 520)
							{
								elementx=elementx + GC_ctx.measureText(titles[i][currentChart]).width + 16;
								GC_ctx.fillText( descriptions[i][currentChart],elementx, elementy+20);
							}
							
							elementx=(offsetsX[i]+(iconW/2))+blockw+entryH;
							if (urlGame[i][currentChart] != undefined) {
								GC_ctx.drawImage(imgPlayButton, elementx+(playIconSize/2), elementy+(playIconSize/2), playIconSize,playIconSize);
							}
							elementx=(offsetsX[i]+(iconW/2))+blockw;
							if (urlVideo[i][currentChart] != undefined) {
								GC_ctx.drawImage(imgVideo, elementx+(playIconSize/2), elementy+(playIconSize/2), playIconSize,playIconSize);
							}
						}
					}
					
					
					
					
					
					
					GC_ctx.fillStyle = "rgb(255,255,255)";
					GC_ctx.fillRect(chartBackX, (iconH>>1), gameW-(16+iconW), minDrawY+4);
					GC_ctx.fillRect(chartBackX,rectGCLinkY, gameW-(16+iconW), minDrawY+4);
					
					
					
					GC_ctx.fillStyle = "rgb(255,0,0)";
					GC_ctx.fillRect(chartBackX+24,32,4,elementSize-11);
					
					GC_ctx.fillStyle = "rgb(50,50,50)";
					GC_ctx.fillRect(rectFeaturedX+1,30,(rectCloseX - rectFeaturedX)-10,elementSize-6);				
					GC_ctx.fillRect(rectCloseX, rectCloseY, rectCloseW, rectCloseH);
					
					GC_ctx.drawImage(imgCloseButton, rectCloseX, rectCloseY, rectCloseW, rectCloseH);
					GC_ctx.drawImage(imgGamesChartLink, rectGCLinkX, rectGCLinkY, rectGCLinkW, rectGCLinkH);
					
					GC_ctx.fillRect(rectFeaturedX+1,30,(rectCloseX - rectFeaturedX)-10,elementSize-6);		
	
					
					GC_ctx.font="bold 12px Arial";
					GC_ctx.fillStyle = "rgb(50,50,50)";
					
					GC_ctx.fillRect(rectFeaturedX+1,rectFeaturedY, rectFeaturedW+rectOfficialW+8,rectFeaturedH);
					
					if (currentChart==CHART_FEATURED)
					{
						GC_ctx.fillStyle = "rgb(255,255,255)";
						GC_ctx.fillRect(rectFeaturedX,rectFeaturedY,rectFeaturedW,rectFeaturedH);
						
						GC_ctx.fillStyle = "rgb(50,50,50)";
						GC_ctx.fillText("Featured Games",chartBackX+32,47);
						
						GC_ctx.fillStyle = "rgb(255,255,255)";
						GC_ctx.fillText("Official Chart",chartBackX+32+rectFeaturedW,47);
						
						
					}
					else if (currentChart==CHART_OFFICIAL)
					{
						GC_ctx.fillStyle = "rgb(255,255,255)";
						GC_ctx.fillRect(rectOfficialX,rectOfficialY,rectOfficialW,rectOfficialH);
						
						GC_ctx.fillStyle = "rgb(255,255,255)";
						GC_ctx.fillText("Featured Games",chartBackX+32,47);
						
						GC_ctx.fillStyle = "rgb(50,50,50)";
						GC_ctx.fillText("Official Chart",chartBackX+32+rectOfficialW,47);
					}
					if (visibleEntries < 10)
					{
					GC_ctx.fillStyle = "rgb(50,50,50)";
					GC_ctx.fillRect(rectSliderX, rectSliderY, rectSliderW, rectSliderH);
					}
					if (selectedy+2>minTabY)
					{
						// shadow top
						GC_ctx.fillStyle = "rgba(200,200,200, 0.30)";
						GC_ctx.fillRect(selectedx,selectedy-4,selectedw,1);
						GC_ctx.fillStyle = "rgba(180,180,180, 0.40)";
						GC_ctx.fillRect(selectedx,selectedy-3,selectedw,1);
						GC_ctx.fillStyle = "rgba(160,160,160, 0.50)";
						GC_ctx.fillRect(selectedx,selectedy-2,selectedw,1);
						GC_ctx.fillStyle = "rgba(100,100,100, 0.50)";
						GC_ctx.fillRect(selectedx,selectedy-1,selectedw,1);
					}
					if (selectedy+selectedh+4>minTabY && selectedy+selectedh+4<rectGCLinkY)
					{
						// shadow bottom
						GC_ctx.fillStyle = "rgba(140,140,140, 0.50)";
						GC_ctx.fillRect(selectedx,selectedy+selectedh+1,selectedw,1);
						GC_ctx.fillStyle = "rgba(160,160,160, 0.50)";
						GC_ctx.fillRect(selectedx,selectedy+selectedh+2,selectedw,1);
						GC_ctx.fillStyle = "rgba(180,180,180, 0.40)";
						GC_ctx.fillRect(selectedx,selectedy+selectedh+3,selectedw,1);
						GC_ctx.fillStyle = "rgba(200,200,200, 0.30)";
						GC_ctx.fillRect(selectedx,selectedy+selectedh+4,selectedw,1);
					}
				}
			}
		}
	}
	/*GC_ctx.fillStyle = "rgb(255,255,255)";
	GC_ctx.fillRect(16,gameH-80,gameW-16,80);	
	GC_ctx.fillStyle = "rgb(50,50,50)";
	GC_ctx.fillText(b64,8, gameH-8);*/

}

// event handlers

function GC_mouseUp() {
	mouseState="MOUSE UP";
    mouseIsDown = 0;
	sliderDown=false;
    GC_mouseXY();
}
 
function GC_touchUp() {
    mouseState="MOUSE UP";
    mouseIsDown = 1;
    // no touch to track, so just show state
	
	sliderDown=false;		
	
}
 
function GC_mousewheel() {
	var e = window.event || e; // old IE support
	var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
	console.debug("DELTA:"+delta);
	
	var oldY=rectSliderY;
	rectSliderY=rectSliderY-(delta*5);
	if (rectSliderY < slideMin)
	{
		rectSliderY=slideMin;
	}
	if (rectSliderY > slideMax)
	{
		rectSliderY=slideMax;
	}
	
	if (rectSliderY>oldY)
	{
		console.log(""+(slideSize/slideAmount));
		console.log(""+(slideAmount/slideSize));
		chartOffsetY-=((slideAmount/slideSize)*(rectSliderY-oldY));
	}
	else if (rectSliderY<oldY)
	{
		console.log(""+(slideSize/slideAmount));
		console.log(""+(slideAmount/slideSize))
		chartOffsetY+=((slideAmount/slideSize)*(oldY-rectSliderY));
	}
}

function GC_mouseDown() {
	mouseState="MOUSE DOWN";
    mouseIsDown = 1;
	
	if (chartState == SHOW_ICON)
	{
		chartState = SHOW_CHART;
		
		if (click==0)
		{
			
		}
		else
		{
				
		}
		xoffset = -chartWidth;
		// mouse tracking
		if (canX > iconX && canX < iconX+45 && canY>iconY && canY < iconY+iconH) 
		{
			
		}
	}
	else if (chartState == SHOW_CHART)
	{
		if (canX > rectCloseX && canX < rectCloseX+rectCloseW && canY > rectCloseY && canY < rectCloseY+rectCloseH) 
		{
			chartState = SHOW_ICON;
			GC_resetChartLayout();
			GC_resetBackground();
			GC_resetAnims();
		}
		else
		{
			if (canX > rectOfficialX && canX < rectOfficialX+rectOfficialW && canY > rectOfficialY && canY < rectOfficialY+rectOfficialH) 
			{
				if (currentChart == CHART_FEATURED)
				{
					currentChart = CHART_OFFICIAL;
					GC_resetAnims();
				}
			}
			else if (canX > rectFeaturedX && canX < rectFeaturedX+rectFeaturedW && canY > rectFeaturedY && canY < rectFeaturedY+rectFeaturedH) 
			{
				if (currentChart == CHART_OFFICIAL)
				{
					currentChart = CHART_FEATURED;
					GC_resetAnims();
				}
			}
			else if (canX > rectGCLinkX && canX < rectGCLinkX+rectGCLinkW && canY > rectGCLinkY && canY < rectGCLinkY+rectGCLinkH) 
			{
				window.open("http://www.gameschart.com");
			}
			else if (canX > rectSliderX && canX < rectSliderX+rectSliderW && canY > rectSliderY && canY < rectSliderY+rectSliderH) 
			{
				sliderDown=true;		
			}
			for (i=0; i<10; i++)
			{
				if (canX > rectEntries[i][0] && canX < rectEntries[i][0]+rectEntries[i][2] && canY > rectEntries[i][1] && canY < rectEntries[i][1]+rectEntries[i][3])
				{
					resp = GC_registerGameClick(gameIDs[i][currentChart], ""+(i+1));
					//console.log("response:"+resp);
					if (canX>(rectEntries[i][0]+rectEntries[i][2])-entryH)
					{
						//console.log("GAME CLICKED (PLAY BUTTON):"+i+1);
						if (urlGame[i][currentChart] != undefined) {
							window.open(urlGame[i][currentChart]);
						}
					}
					else if (canX>(rectEntries[i][0]+rectEntries[i][2])-(entryH*2))
					{
						//console.log("VIDEO CLICKED:"+i+1);
						if (urlVideo[i][currentChart] != undefined) {
							window.open(urlVideo[i][currentChart]);
						}
					}
					else
					{
						//console.log("GAME CLICKED:"+i+1);	
						if (urlGame[i][currentChart] != undefined) {
							window.open(urlGame[i][currentChart]);
						}
					}
				}
			}
		}
	}

   GC_mouseXY();
}
 
function GC_touchDown() {
    mouseIsDown = 1;
    GC_touchXY();
}
 
 
function GC_mouseXY(e) {
	
	try
	{
	
		if (!e) var e = window.event;
		if (disabled==0)
		{
			if (navigator.appName == 'Microsoft Internet Explorer')
			{
				mouseX = e.offsetX;
				mouseY = e.offsetY;
			}
			else
			{
				mouseX = e.pageX - $(e.target).offset().left;
				mouseY = e.pageY - $(e.target).offset().top;
			}
		
			canX = mouseX;
			canY = mouseY;
			
			if (e.pageX > GC_canvas.offsetLeft)
			{
				if (chartState == SHOW_ICON)
				{
					var x=iconX;
					var y=iconY;
					var w=iconW;
					var h=iconH;
				
					if (canX > x && canX < x+w && canY > y && canY < y+h) 
					{
						GC_animframe=0;
						bDoAnim=false;
						allowIconAnim=false;
						e.target.style.cursor = 'hand';
					}
					else
					{
						if (!allowIconAnim)
						{
							GC_animframe=0;
							bDoAnim=true;		
						}
						allowIconAnim=true;
						e.target.style.cursor = 'default';
					}
				}
			}
			if (chartState == SHOW_CHART)
			{
				if (canX>=rectSliderX+(rectSliderW*3))
				{
					sliderDown=false;	
				}
				
				if (canX > rectCloseX && canX < rectCloseX+rectCloseW && canY > rectCloseY && canY < rectCloseY+rectCloseH) 
				{
					e.target.style.cursor = 'hand';
				}
				else if (canX > rectOfficialX && canX < rectOfficialX+rectOfficialW && canY > rectOfficialY && canY < rectOfficialY+rectOfficialH) 
				{
					e.target.style.cursor = 'hand';
				}
				else if (canX > rectFeaturedX && canX < rectFeaturedX+rectFeaturedW && canY > rectFeaturedY && canY < rectFeaturedY+rectFeaturedH) 
				{
					e.target.style.cursor = 'hand';
				}
				else if (canX > rectGCLinkX && canX < rectGCLinkX+rectGCLinkW && canY > rectGCLinkY && canY < rectGCLinkY+rectGCLinkH) 
				{
					e.target.style.cursor = 'hand';
				}
				else if (sliderDown && canX<rectSliderX+(rectSliderW*2))
				{
					var oldY=rectSliderY;
					rectSliderY=canY-(rectSliderH/2);
					if (rectSliderY < slideMin)
					{
						rectSliderY=slideMin;
					}
					if (rectSliderY > slideMax)
					{
						rectSliderY=slideMax;
					}
					
					if (rectSliderY>oldY)
					{
						console.log(""+(slideSize/slideAmount));
						console.log(""+(slideAmount/slideSize));
						chartOffsetY-=((slideAmount/slideSize)*(rectSliderY-oldY));
					}
					else if (rectSliderY<oldY)
					{
						console.log(""+(slideSize/slideAmount));
						console.log(""+(slideAmount/slideSize))
						chartOffsetY+=((slideAmount/slideSize)*(oldY-rectSliderY));
					}
				}
				else
				{
					for (i=0; i<10; i++)
					{
						if (canX > rectEntries[0][0] && canX < rectEntries[0][0]+rectEntries[0][2] && canY > rectEntries[0][1] && canY < rectEntries[9][1]+rectEntries[9][3])
						{
							e.target.style.cursor = 'hand';	
						}
						else
						{
							e.target.style.cursor = 'default';	
						}
					}
				}
				for (i=0; i<10; i++)
				{
					var x=offsetsX[i]+(iconW/2);
					var y=chartOffsetY+chartTitleH+(i)*(entryH+1);
					var w=gameW-iconW;
					var h=entryH+1;
				
					if (canX > x && canX < x+w && canY > y && canY < y+h) 
					{
						lastElement=overElement;
						overElement=i+1;
						if (overElement!=lastElement)
						{
							redTabExtra=0;
						}
					}
				}
			}
		}
	}
	catch (err){}
}
 
function GC_touchXY(e) {
	
	if (!e) var e = window.event;
	try
	{
		if (disabled==0)
		{
			if (navigator.appName == 'Microsoft Internet Explorer')
			{
				mouseX = e.offsetX;
				mouseY = e.offsetY;
			}
			else
			{
				mouseX = e.targetTouches[0].pageX - $(e.target).offset().left;
				mouseY = e.targetTouches[0].pageY - $(e.target).offset().top;
			}
		
		
			canX = mouseX;
			canY = mouseY;
		}
	}
	catch (err){}
}

function GC_checkAutoLoad()
{
	//console.log("check autoload");
	var gamediv=document.getElementById("gamesdiv");
	try
	{
		if (gamediv.getAttribute("data-autoload") == "false")
		{
			autostart=false;
		}
		else {
			autostart=true;	
		}
	}
	catch (err)
	{
		autostart=true;	
	}
	
}

// update screen

window.requestAnimFrame = (function(callback) {
        return window.requestAnimationFrame || 
        window.webkitRequestAnimationFrame || 
        window.mozRequestAnimationFrame || 
        window.oRequestAnimationFrame || 
        window.msRequestAnimationFrame ||
        function(callback) {
          window.setTimeout(callback, 1000 / 60);
        };
      })();

	function GC_updateAll() 
	{
		if (!GC_loading)
		{	
			var GC_canvas = document.getElementById("gcCanvas");
			var GC_context = GC_canvas.getContext("2d");
			
			if (GC_ticker == 0)
			{
				GC_initCharts();
			}
			// clear stage
			GC_context.clearRect(0, 0, GC_canvas.width, GC_canvas.height);
			GC_draw();
		}
		else
		{
			if (GC_loading)
			{
				GC_initVars();
			}
		}
		// render stage
		GC_update();
		// request new frame
		requestAnimFrame(function() {
		GC_updateAll();
		});
	}
	
window.onload = function() {
	GC_checkAutoLoad();
	if (autostart)
	{
		GC_updateAll();
	}
};


var chart=0;
var row =0;
var resp="NO RESPONSE";
function GC_processGameClick(url, datain)
{	
	
	try
	{
		
		
		var FULLURL=url+"?data="+datain;
		//console.log("FULL URL:"+FULLURL);
		
		
		jQuery.post( FULLURL, function(data) 
		{ 
			//console.log("GAME CLICKED");							   
			//console.log("DATA2:"+data);			   
		});
		
		/*
		var FULLURL=url+"?data="+datain;
		console.log("FULL URL:"+FULLURL);
		jQuery.post(FULLURL, 
		
		
		function(data) {
			console.log("RAW DATA"+data);
			resp = JSON.parse(data.toString());
			console.log("RESPONSE"+resp);
			
			// if (resp == "OK") {
			//return chartData;
			//}
		});
		*/
	}
	catch (err)
	{
		//console.log("ARSEBAGS 2");
	}
	return resp;
}

function GC_processAppData(url, datain)
{	
	resp="NO RESPONSE";
	try
	{
		var FULLURL=url+"?data="+datain;
		//console.log("FULL URL:"+FULLURL);
		
		
		jQuery.post( FULLURL, function(data) 
		{ 
			//console.log("NEW FUNCTION");							   
			//console.log(data);
			//console.log(data);
			var chartData = data;


			try
			{
				disabled=chartData.disabled;
				
				if (disabled == undefined)
				{
					disabled=0;
				}
				//console.log("GOT DISABLED VAR: " + disabled);
			}
			catch (err)
			{
				//console.log("ERROR - disabling");
				disabled=1;
			}
			//enabled=1;
			if (disabled==0)
			{

				var stuff3 = "";
				//console.log("chartData:"+chartData.tabs[0].name);
				//console.log("stuff3:"+stuff3);
		
				for (i=0; i<10; i++)
				{
					thumbnails[i] = new Array(2);
					titles[i] = new Array(2);
					descriptions[i] = new Array(2);
					gameIDs[i] = new Array(2);
				
					urlVideo[i] = new Array(2);
					urlGame[i]  = new Array(2);
					
					thumbnails[i][0] = new Image();
					thumbnails[i][1] = new Image();
					
					// featured
					var img="http://www.howlettmedia.com/test/icon/GC_icon2.png";
					var name="Your game here";
					var description="Click here for details.";
					var gameid="000";
					var videoLink="http://www.youtube.com/watch?v=LXuJW-pCXks";
					var gameLink="http://www.gameschart.com";
					var img2="http://www.howlettmedia.com/test/icon/GC_icon2.png";
					var name2="Your game here";
					var description2="Click here for details.";
					var gameid2="000";
					var videoLink2="http://www.youtube.com/watch?v=LXuJW-pCXks";
					var gameLink2="http://www.gameschart.com";
	
					if ( chartData.tabs[0].rows[i].thumbnail_loc != undefined )
						img = chartData.tabs[0].rows[i].thumbnail_loc;
						//console.log("THUMB1:"+img);
		
					if ( chartData.tabs[0].rows[i].name != undefined )
						name = chartData.tabs[0].rows[i].name;
	
					if ( chartData.tabs[0].rows[i].primary_cat != undefined )
						description = chartData.tabs[0].rows[i].primary_cat;
	
					if ( chartData.tabs[0].rows[i].id != undefined )
							gameid = chartData.tabs[0].rows[i].id;
							
							//console.log("GAME ID:"+gameid);
					
					//if ( chartData.tabs[0].rows[i].video_url != undefined )
					//	videoLink = "http://www.youtube.com/watch?v="+chartData.tabs[0].rows[i].video_url;
						
						
					try {
							
							var vlink = chartData.tabs[0].rows[i].video_url;
							if (vlink.length > 1)
							{
								videoLink ="http://www.youtube.com/watch?v="+ chartData.tabs[1].rows[i].video_url;
							}
							else
							{
								videoLink =undefined;//"http://www.youtube.com/watch?v=ztYVgu5dbPE";
							}
							
						}
						catch (err) {//console.log("TEST 5");
						}		
						
						
				
	
					if ( chartData.tabs[0].rows[i].game_link != undefined )
						gameLink = chartData.tabs[0].rows[i].game_link;
	
					// official
					try
					{
						try 
						{
							var t = chartData.tabs[1].rows[i].thumbnail_loc;
							var start = (t.length)-3;
							var end = t.length;
							var ext = t.substring(start, end);
							//console.log("EXT:"+ext);
							if (ext == "png" || ext == "jpg" || ext == "gif" || ext == "bmp")
							{
								img2=t;
								//console.log("VALID IMAGE");
							}
							else
							{
								//console.log("INVALID IMAGE");
							}
						}
						catch (err) {
							//console.log("TEST 1");
							}
						
						//if ( chartData.tabs[1].rows[i].name != undefined )
						try {
							
							name2 = chartData.tabs[1].rows[i].name;
						}
						catch (err) {
							//console.log("TEST 2");
							}
						//if ( chartData.tabs[1].rows[i].primary_cat != undefined )
						try {
							description2 = chartData.tabs[1].rows[i].primary_cat;
						}
						catch (err) {//console.log("TEST 3");
						}
						//if ( chartData.tabs[1].rows[i].id != undefined )
						try {
							gameid2 = chartData.tabs[1].rows[i].id;
						}
						catch (err) {//console.log("TEST 4");
						}
						//if ( chartData.tabs[1].rows[i].video_url != undefined )
						try {
							
							var vlink = chartData.tabs[1].rows[i].video_url;
							if (vlink.length > 1)
							{
								videoLink2 ="http://www.youtube.com/watch?v="+ chartData.tabs[1].rows[i].video_url;
							}
							else
							{
								videoLink2 =undefined;//"http://www.youtube.com/watch?v=ztYVgu5dbPE";
							}
							
						}
						catch (err) {//console.log("TEST 5");
						}
						//if ( chartData.tabs[1].rows[i].game_link != undefined )
						try {
							var glink = chartData.tabs[1].rows[i].game_link;
							if (glink.length > 1)
							{
								gameLink2 = chartData.tabs[1].rows[i].game_link;
							}
							else
							{
								gameLink2 = "http://www.gameschart.com";
							}
							
						}
						catch (err) {//console.log("TEST 6");
						}
						
						
					}
					catch (err)
					{
						//console.log("ERROR");
					}
					
					if (name2 == undefined)
					{
						name2 = "No name";
					}
					
					if (description2 == undefined)
					{
						description2 = "No description";
					}
					thumbnails[i][0].src=img;
					thumbnails[i][1].src=img2;
					
					titles[i][0] = name;
					titles[i][1] = name2;
					
					descriptions[i][0] = description;
					descriptions[i][1] = description2;
					
					gameIDs[i][0] = gameid;
					gameIDs[i][1] = gameid2;
	
					urlVideo[i][0]=videoLink;
					urlVideo[i][1]=videoLink2;
					
					urlGame[i][0]=gameLink;
					urlGame[i][1]=gameLink2;
					
				}
				
				sessionID=chartData.sessionID;
				//console.log("SESSION ID:" + sessionID);
				return chartData;						   
										   
			}
		}, "json" );
	}
	catch (err)
	{
		
	}
}

String.prototype.visualLength = function()
{
    var ruler = $("ruler");
    ruler.innerHTML = this;
    return ruler.offsetWidth;
}


function rot( t, u, v ) {
 return String.fromCharCode( ( ( t - u + v ) % ( v * 2 ) ) + u );
}
function rot13( s ) {
 var b = [], c, i = s.length,
  a = 'a'.charCodeAt(), z = a + 26,
  A = 'A'.charCodeAt(), Z = A + 26;
 while(i--) {
  c = s.charCodeAt( i );
  if( c>=a && c<z ) { b[i] = rot( c, a, 13 ); }
  else if( c>=A && c<Z ) { b[i] = rot( c, A, 13 ); }
  else { b[i] = s.charAt( i ); }
 }
 return b.join( '' );
}
function rot5( s ) {
 var b = [], c, i = s.length,
  a = '0'.charCodeAt(), z = a + 10;
 while(i--) {
  c = s.charCodeAt( i );
  if( c>=a && c<z ) { b[i] = rot( c, a, 5 ); }
  else { b[i] = s.charAt( i ); }
 }
 return b.join( '' );
}
function rot135( s ) {
 return rot13( rot5( s ) );
}




var Base64 = {
// private property
_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

// public method for encoding
encode : function (input) {
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;

    input = Base64._utf8_encode(input);

    while (i < input.length) {

        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);

        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;

        if (isNaN(chr2)) {
            enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
            enc4 = 64;
        }

        output = output +
        Base64._keyStr.charAt(enc1) + Base64._keyStr.charAt(enc2) +
        Base64._keyStr.charAt(enc3) + Base64._keyStr.charAt(enc4);

    }

    return output;
},

// public method for decoding
decode : function (input) {
    var output = "";
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0;

    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

    while (i < input.length) {

        enc1 = Base64._keyStr.indexOf(input.charAt(i++));
        enc2 = Base64._keyStr.indexOf(input.charAt(i++));
        enc3 = Base64._keyStr.indexOf(input.charAt(i++));
        enc4 = Base64._keyStr.indexOf(input.charAt(i++));

        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;

        output = output + String.fromCharCode(chr1);

        if (enc3 != 64) {
            output = output + String.fromCharCode(chr2);
        }
        if (enc4 != 64) {
            output = output + String.fromCharCode(chr3);
        }

    }

    output = Base64._utf8_decode(output);

    return output;

},

// private method for UTF-8 encoding
_utf8_encode : function (string) {
    string = string.replace(/\r\n/g,"\n");
    var utftext = "";

    for (var n = 0; n < string.length; n++) {

        var c = string.charCodeAt(n);

        if (c < 128) {
            utftext += String.fromCharCode(c);
        }
        else if((c > 127) && (c < 2048)) {
            utftext += String.fromCharCode((c >> 6) | 192);
            utftext += String.fromCharCode((c & 63) | 128);
        }
        else {
            utftext += String.fromCharCode((c >> 12) | 224);
            utftext += String.fromCharCode(((c >> 6) & 63) | 128);
            utftext += String.fromCharCode((c & 63) | 128);
        }

    }

    return utftext;
},

// private method for UTF-8 decoding
_utf8_decode : function (utftext) {
    var string = "";
    var i = 0;
    var c = c1 = c2 = 0;

    while ( i < utftext.length ) {

        c = utftext.charCodeAt(i);

        if (c < 128) {
            string += String.fromCharCode(c);
            i++;
        }
        else if((c > 191) && (c < 224)) {
            c2 = utftext.charCodeAt(i+1);
            string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
            i += 2;
        }
        else {
            c2 = utftext.charCodeAt(i+1);
            c3 = utftext.charCodeAt(i+2);
            string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
            i += 3;
        }

    }
    return string;
}
}

