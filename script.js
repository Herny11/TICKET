function formatCliente(cliente)
{
  
    cliente.value=cliente.value.replace(/[.-]/g, '')
    .replace( /^(\d{1,2})(\d{3})(\d{3})(\w{1})$/, '$1$2$3-$4')

  
}
$(document).ready(function(){
  
    $("#virtual-keyboard a").on('click', function() {
        if ($(this).attr('data') == 'DEL') {
            board_text = $('#txt_rut').val();
            board_text = board_text.substring(0, board_text.length-1);
            $('#txt_rut').val(board_text);
        } else {
            $('#txt_rut').val($('#txt_rut').val() + $(this).attr('data'));
        }
        
    });
});


var cupon;
var Fn = {
  validaRut : function (rutCompleto) {
  rutCompleto = rutCompleto.replace("‐","-");
  if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test( rutCompleto ))
    return false;
  var tmp   = rutCompleto.split('-');
  var digv  = tmp[1]; 
  var rut   = tmp[0];
  if ( digv == 'K' ) digv = 'k' ;
    return (Fn.dv(rut) == digv );
  },
  dv : function(T){
    var M=0,S=1;
    for(;T;T=Math.floor(T/10))
      S=(S+T%10*(9-M++%6))%11;
    return S?S-1:'k';
 }
}      
function validar(){

  if (Fn.validaRut( $("#txt_rut").val() )){
    rut_ticket = $("#txt_rut").val();
    cupon = parseInt($("#txt_rut").val());
    aleatorio = Math.round(Math.random()*(100 -4)) + 4;
    let HTMLString = '<div class="container text-center"> <img id= "logo-ticket"src="img/logo.png" alt="Logotipo"> <br> <h3>CUPÓN<br></h3> <h2 id="numero">' + parseInt(cupon/aleatorio) + '</h2> <h4 id="fecha"></h4> <h4 id="HoraActual"> </h4> <h5>¡GRACIAS POR VISITARNOS! <br><br>The Luxury Experience <br> ONE</h5></div>  ';
    const body = document.getElementById('body');
    body.innerHTML = HTMLString;
    
    setTimeout(showTime(), 1000);
    imprimir();
  } 
  else {
   alert("El RUT ingresado es invalido");
  }
}
function showTime(){
  myDate = new Date();
  day = myDate.getDate();
  month = myDate.getMonth();
  year = myDate.getFullYear();
  hours = myDate.getHours();
  minutes = myDate.getMinutes();
  seconds = myDate.getSeconds();
  if (hours < 10) hours = 0 + hours;
  if (minutes < 10) minutes = "0" + minutes;
  if (seconds < 10) seconds = "0" + seconds;
  if (month< 10) month = "0" + month;
  if (day < 10) day = "0" + day;
  $("#fecha").text(day+ "/" + month + "/" + year);
  $("#HoraActual").text(hours+ ":" +minutes+ ":" +seconds);
  setTimeout("showTime()", 200);
}
setTimeout(showTime(), 1000)
function imprimir() {
  window.print();
  window.location = "index.html";
}


      
      