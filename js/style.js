var time = 60;
var giliran = 0;
function setGiliran(data){
  this.giliran = parseInt(data);
}
function getGiliran(){
  return this.giliran;
}
function setTime(data){
  this.time = parseInt(data);
}
function getTime(){
  return this.time;
}
$(function(){
  $('select').material_select();
  $("#btn-next").hide();

  $("#wadah").each(function(){
    $("#wadah").height($(window).height());
  });

  $("body").append('<div class="container"><div class="col-md-12 tengah-text" style="margin-top:10px"><b><i><span style="color:red;font-size:12px">Copyright 2017 @al_mwh</span></i></b></div></div');

  $("#box1").fadeTo('slow', 0.5);
  $("#box2").fadeTo('slow', 0.5);

  $("#text-timer").html("0"+(parseInt($("#input").val())/60)+":00")

  $("#btn-acak").click(function(){
    $("#btn-acak").hide();
    $("#btn-next").removeClass("waves-effect waves-light submit").addClass('disabled');
    $("#btn-next").show();
    $("#btn-start").addClass("waves-effect waves-light submit").removeClass('disabled');
    $("#loading").show();
    setTimeout(function(){
      $("#loading").hide();
      $("#loading2").fadeIn(1000);
      $("#title-giliran").html("GILIRAN PASLON "+getGiliran());
      setTimeout(function(){$("#loading2").fadeOut(1000);}, 2000);
    }, 5000);


    var x = Math.floor((Math.random() * 2) + 1);
    $("#box"+x).fadeTo('slow', 1);
    setGiliran(x);
    if(x==1){
      $("#box2").fadeTo('slow', 0.5);
    }else if(x==2){
      $("#box1").fadeTo('slow', 0.5);
    }
  });
  $("#btn-next").click(function(){
    $("#btn-next").hide();
    $("#btn-acak").removeClass("waves-effect waves-light submit").addClass('disabled');
    $("#btn-acak").show();
    $("#btn-start").addClass("waves-effect waves-light submit").removeClass('disabled');

    if(getGiliran()==1){
      setGiliran(2);
      $("#box2").fadeTo('slow', 1);
      $("#box1").fadeTo('slow', 0.5);
    }else if(getGiliran()==2){
      setGiliran(1);
      $("#box1").fadeTo('slow', 1);
      $("#box2").fadeTo('slow', 0.5);
    }

    $("#loading2").fadeIn(1000);
    $("#title-giliran").html("GILIRAN PASLON "+getGiliran());
    setTimeout(function(){$("#loading2").fadeOut(1000);}, 2000);
  });
  $("#btn-start").click(function(){
    $("#btn-start").removeClass("waves-effect waves-light submit").addClass('disabled');
    $.playSound('sound/ping.mp3');
    timer(getTime());
  });
  $("#input").change(function(){
    var data = $("#input").val();
    if(data=="90"){
      $("#text-timer").html("01:30");
    }else{
      $("#text-timer").html("0"+(parseInt($("#input").val())/60)+":00");
    }
    $("#box1").fadeTo('slow', 0.5);
    $("#box2").fadeTo('slow', 0.5);
    $("#btn-next").hide();
    $("#btn-acak").show();
    $("#btn-acak").addClass("waves-effect waves-light submit").removeClass('disabled');
    $("#btn-next").addClass("waves-effect waves-light submit").removeClass('disabled');
    setTime(data-1);

  });
});

function timer(num){
  var tampil = "";
  if(num>-1 && num<60){
    if(num<10){
      if(num>0){
        $.playSound('sound/bBefore.mp3');
      }else if(num==0){
        $.playSound('sound/bStop.mp3');
        $("#btn-acak").addClass("waves-effect waves-light submit").removeClass('disabled');
        $("#btn-next").addClass("waves-effect waves-light submit").removeClass('disabled');
      }
      console.log(num);
      tampil = "00:0"+num;

    }else{
      tampil = "00:"+num;
    }
  }else if(num>=60 && num<120){
    var xy = num-60;
    if(xy<10){
      tampil = "01:0"+xy;
    }else{
      tampil = "01:"+xy;
    }
  }else if(num==120){
    tampil = "02:00";
  }else{
    tampil = "00:00";
  }
  $("#text-timer").html(tampil);
  if(num>=0){
    setTimeout(function(){
      act(num);
    }, 1000);
  }
}

function act(number){
  var now = number - 1;
  timer(now);
}
