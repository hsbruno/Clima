
$(function(){
  //Ação do botão
  $('button').bind('click', function(){
    //recebe cidade informada pelo user
    var city = $('#city').val();
    //Recebe data atual
    var now = new Date();
    //URL/Parametros
    var url = "https://query.yahooapis.com/v1/public/yql?format=json&rnd="+ now.getFullYear() + now.getMonth() + now.getDay() + now.getHours() + "&diagnostics=true&callback=?&q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='"+city+"')and u='c'";
    //Ajax
    $.ajax({
      url:encodeURI(url),
      dataType:'json',
      type:'GET',
      beforeSend:function(){
        $('#cityName').html('<img style="width:150px; heigth:150px;" src="img/load.gif">');
      },
      success:function(data){
        //verifica se os daods estão de acordo
        if(data !== null && data.query !== null && data.query.results !== null && data.query.results.channel.description !== 'Yahoo! weather Error'){
            //Seleciona os dados da API
            var tempo = data.query.results.channel.item.condition.temp; //Temperatura
            var tempoTxt = data.query.results.channel.item.condition.text; //String do clima
            var day = data.query.results.channel.item.condition.date;//dia atual
            var sunrise = data.query.results.channel.astronomy.sunrise;//nascer do sol
            var sunset = data.query.results.channel.astronomy.sunset;//por do sol
            var cityName = data.query.results.channel.location.city;//city name
            var stateName = data.query.results.channel.location.region;//state
            //Imprime resultado.
            $('#temp').html(tempo+'°C');
            $('#tempTxt').html(tempoTxt);
            $('#sunrise').html('Sunrise: <b>'+sunrise+'</b>');
            $('#sunset').html('Sunset: <b>'+sunset+'</b>');
            $('#day').html(day);
            $('#cityName').html(cityName+","+stateName);
            //Condicional de clima
            switch (tempoTxt) {
              case 'Clear':
                $('.img').attr({src:'img/clear/sol.png'});
              break;
                case 'Cloudy':
                  $('.img').attr({src:'img/nebuloso/cloud.png'});
                break;
                  case 'Mostly Cloudy':
                    $('.img').attr({src:'img/nebuloso/cloud.png'});
                  break;
                    case 'Partly Cloudy':
                      $('.img').attr({src:'img/nebuloso/sol.png'});
                    break;
                      case 'Scattered Thunderstorms':
                        $('.img').attr({src:'img/nebuloso/storm.png'});
                      break;
                        case 'Rain':
                          $('.img').attr({src:'img/nebuloso/storm.png'});
                        break;
            }
            //recebe a quantidade de infos
            var len = data.query.results.channel.item.forecast.length;
            //Matriz de exibição
            semana = [];
            //Recebe os demais dias
            for(x=0;x<len;x++){
              var date = data.query.results.channel.item.forecast[x].date;
              var days = data.query.results.channel.item.forecast[x].day;
              var high = data.query.results.channel.item.forecast[x].high;
              var low = data.query.results.channel.item.forecast[x].low;
              var textDays = data.query.results.channel.item.forecast[x].text;
              var code = data.query.results.channel.item.forecast[x].code;
              //get all values
              var str = "<b>"+days+"</b> "+
                        "<br><b>"+high+"° </b>"+
                        "<i>"+ low+"°</i>"+
                        "<br>"+textDays;
              //insere os dados no final da matriz
              semana.push(str);
            }
            //imprime os dias da semana
            for(i=0;i<8;i++){
              //Aqui o indice é atribuido ao ID da div
              $("#teste"+i).html(semana[i]);
            }
        }
      },
      //Exibe mensagem em caso de erro
      error:function(){
        $('#temp').html('erro');
      }
    });
  });
});
