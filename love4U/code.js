var cur_interval;
var cur_status=0;
var line_idx=0;
var ourTime=0;

$(document).ready(function(){
	$(".space").html("&nbsp;&nbsp;")
	setTimeout("typeLine()",1000);
	ourTime=Date.parse(new Date("2017-02-24 22:05:20"))/1000;
	setTimeout("cntTime()",500);
	cur_interval=setInterval("cur_twinkle()",200);
	setTimeout(function(){
		$('#Isay').fadeIn(3000);
		setTimeout(function(){
			$('#time').fadeIn(3000);
		},3500);
	},70000);
})

function cur_twinkle()
{
	if(cur_status==0){
		$($('#code .cursor')[line_idx]).show();
		cur_status++;
	}
	else{
		$($('#code .cursor')[line_idx]).hide();
		cur_status--;
	}
}

function typeLine(){
	if(line_idx>=$('#code span').length){
		setTimeout(function(){
			$($('#code span')[$('#code span').length-2]).text("\"I love u all the way to the moon and the back.\"");
			setTimeout(function(){
				$($('#code span')[$('#code span').length-2]).text("\"全世界我最爱你.\"");
				setTimeout(function(){
					$($('#code span')[$('#code span').length-2]).text("\"全宇宙我最爱你.\"");
				},3000)
			},5000);
		},4000)
		return;
	}
	var obj=$('#code span')[line_idx];
	var p=new RegExp("delay");
	var res=p.test($(obj).attr('class'));
	if(res){
		setTimeout(function(){
			$(obj).show();
			var str_arr=$(obj).text().split('');
			$(obj).text("");
			var now_arr=[];
			setTimeout(function(){typing(obj,str_arr,0,now_arr)},getRandomInt(50,150));
		},getRandomInt(1000,3000));
	}
	else {
		$(obj).show();
		var str_arr=$(obj).text().split('');
		$(obj).text("");
		var now_arr=[];
		setTimeout(function(){typing(obj,str_arr,0,now_arr)},getRandomInt(50,150));
	}
}

function typing(obj,str_arr,char_idx,now_arr){
	if(char_idx>=str_arr.length){
		line_idx++;
		clearInterval(cur_interval);
		$($('#code .cursor')[line_idx-1]).hide();
		cur_interval=setInterval("cur_twinkle()",200);
		typeLine();
		return;
	}
	now_arr.push(str_arr[char_idx]);
	$(obj).text(now_arr.join(''));
	setTimeout(function(){typing(obj,str_arr,char_idx+1,now_arr)},getRandomInt(50,150));
}

function cntTime()
{
	var clock=Date.parse(new Date())/1000-ourTime;
	$($('#time .digit')[3]).text(clock%60);
	$($('#time .digit')[2]).text(Math.floor(clock/60)%60);
	$($('#time .digit')[1]).text(Math.floor(clock/3600)%24);
	$($('#time .digit')[0]).text(Math.floor(clock/86400));
	setTimeout("cntTime()",500);
}

function getRandomInt(min,max)
{
	return Math.floor(Math.random()*(max-min+1))+min;
}