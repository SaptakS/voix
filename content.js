//alert('hello world');


var langs =
[['Afrikaans',       ['af-ZA']],
 ['Bahasa Indonesia',['id-ID']],
 ['Bahasa Melayu',   ['ms-MY']],
 ['Català',          ['ca-ES']],
 ['Čeština',         ['cs-CZ']],
 ['Deutsch',         ['de-DE']],
 ['English',         ['en-AU', 'Australia'],
                     ['en-CA', 'Canada'],
                     ['en-IN', 'India'],
                     ['en-NZ', 'New Zealand'],
                     ['en-ZA', 'South Africa'],
                     ['en-GB', 'United Kingdom'],
                     ['en-US', 'United States']],
 ['Español',         ['es-AR', 'Argentina'],
                     ['es-BO', 'Bolivia'],
                     ['es-CL', 'Chile'],
                     ['es-CO', 'Colombia'],
                     ['es-CR', 'Costa Rica'],
                     ['es-EC', 'Ecuador'],
                     ['es-SV', 'El Salvador'],
                     ['es-ES', 'España'],
                     ['es-US', 'Estados Unidos'],
                     ['es-GT', 'Guatemala'],
                     ['es-HN', 'Honduras'],
                     ['es-MX', 'México'],
                     ['es-NI', 'Nicaragua'],
                     ['es-PA', 'Panamá'],
                     ['es-PY', 'Paraguay'],
                     ['es-PE', 'Perú'],
                     ['es-PR', 'Puerto Rico'],
                     ['es-DO', 'República Dominicana'],
                     ['es-UY', 'Uruguay'],
                     ['es-VE', 'Venezuela']],
 ['Euskara',         ['eu-ES']],
 ['Français',        ['fr-FR']],
 ['Galego',          ['gl-ES']],
 ['Hrvatski',        ['hr_HR']],
 ['IsiZulu',         ['zu-ZA']],
 ['Íslenska',        ['is-IS']],
 ['Italiano',        ['it-IT', 'Italia'],
                     ['it-CH', 'Svizzera']],
 ['Magyar',          ['hu-HU']],
 ['Nederlands',      ['nl-NL']],
 ['Norsk bokmål',    ['nb-NO']],
 ['Polski',          ['pl-PL']],
 ['Português',       ['pt-BR', 'Brasil'],
                     ['pt-PT', 'Portugal']],
 ['Română',          ['ro-RO']],
 ['Slovenčina',      ['sk-SK']],
 ['Suomi',           ['fi-FI']],
 ['Svenska',         ['sv-SE']],
 ['Türkçe',          ['tr-TR']],
 ['български',       ['bg-BG']],
 ['Pусский',         ['ru-RU']],
 ['Српски',          ['sr-RS']],
 ['한국어',            ['ko-KR']],
 ['中文',             ['cmn-Hans-CN', '普通话 (中国大陆)'],
                     ['cmn-Hans-HK', '普通话 (香港)'],
                     ['cmn-Hant-TW', '中文 (台灣)'],
                     ['yue-Hant-HK', '粵語 (香港)']],
 ['日本語',           ['ja-JP']],
 ['Lingua latīna',   ['la']]];


//showInfo('info_start');

function updateCountry() {
  for (var i = select_dialect.options.length - 1; i >= 0; i--) {
    select_dialect.remove(i);
  }
  var list = langs[select_language.selectedIndex];
  for (var i = 1; i < list.length; i++) {
    select_dialect.options.add(new Option(list[i][1], list[i][0]));
  }
  select_dialect.style.visibility = list[1].length == 1 ? 'hidden' : 'visible';
}

var create_email = false;
var final_transcript = '';
var recognizing = false;
var ignore_onend;
var start_timestamp;
if (!('webkitSpeechRecognition' in window)) {
  upgrade();
} else {
  //start_button.style.display = 'inline-block';
  var recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;

  recognition.onstart = function() {
    recognizing = true;
    //showInfo('info_speak_now');
    ////start_img.src = 'mic-animate.gif';
  };

  recognition.onerror = function(event) {
    if (event.error == 'no-speech') {
      //start_img.src = 'mic.gif';
      //showInfo('info_no_speech');
      ignore_onend = true;
    }
    if (event.error == 'audio-capture') {
      //start_img.src = 'mic.gif';
      //showInfo('info_no_microphone');
      ignore_onend = true;
    }
    if (event.error == 'not-allowed') {
      if (event.timeStamp - start_timestamp < 100) {
        //showInfo('info_blocked');
      } else {
        //showInfo('info_denied');
      }
      ignore_onend = true;
    }
  };

  recognition.onend = function() {
    recognizing = false;
    if (ignore_onend) {
      return;
    }
    //start_img.src = 'mic.gif';
    if (!final_transcript) {
      //showInfo('info_start');
      return;
    }
    //showInfo('');
    if (window.getSelection) {
      /*window.getSelection().removeAllRanges();
      var range = document.createRange();
      range.selectNode(document.getElementById('final_span'));
      window.getSelection().addRange(range);*/
    }
    if (create_email) {
      create_email = false;
      createEmail();
    }
  };

  recognition.onresult = function(event) {
    var interim_transcript = '';
    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        final_transcript += event.results[i][0].transcript;
      } else {
        interim_transcript += event.results[i][0].transcript;
      }
    }
    final_transcript = capitalize(final_transcript);
    //final_span.innerHTML = linebreak(final_transcript);
    //interim_span.innerHTML = linebreak(interim_transcript);
    if (final_transcript || interim_transcript) {
      showButtons('inline-block');
    }
    console.log(interim_transcript);
    if (interim_transcript == 'play') {
      console.log('We are going to play');
      var video = document.getElementsByTagName('video')[0];
      video.play();
    }
    if (interim_transcript == 'stop') {
      console.log('We are going to stop');
      var video = document.getElementsByTagName('video')[0];
      video.pause();
    }
    if (interim_transcript == 'loud') {
      console.log('We are going to go loud');
      var video = document.getElementsByTagName('video')[0];
      video.volume = video.volume + 0.25;
    }
    if (interim_transcript == 'soft') {
      console.log('We are going to go soft');
      var video = document.getElementsByTagName('video')[0];
      video.volume = video.volume - 0.25;
    }
    if (interim_transcript == 'next') {
      console.log('We are going to play next song');
      var next = document.getElementsByClassName('ytp-next-button ytp-button')[0]; 
      next.click();
    } 
    if (interim_transcript == 'fullscreen') {
      console.log('We are going fullscreen');
      var fullscreen = document.getElementsByClassName('ytp-fullscreen-button ytp-button')[0]; 
      fullscreen.click();
    } 
   if (interim_transcript == 'subtitles') {
      console.log('We are showing subtitles');
      var sub = document.getElementsByClassName('ytp-subtitles-button ytp-button')[0]; 
      sub.click();
    } 
   if (interim_transcript == 'like') {
      console.log('We are liking page');
      var like = document.getElementsByClassName('yt-uix-button yt-uix-button-size-default yt-uix-button-opacity yt-uix-button-has-icon no-icon-markup like-button-renderer-like-button like-button-renderer-like-button-unclicked  yt-uix-post-anchor yt-uix-tooltip')[0]; 
      like.click();
    }
   if (interim_transcript == 'dislike') {
      console.log('We are disliking page');
      var dislike = document.getElementsByClassName('yt-uix-button yt-uix-button-size-default yt-uix-button-opacity yt-uix-button-has-icon no-icon-markup like-button-renderer-dislike-button like-button-renderer-dislike-button-unclicked  yt-uix-post-anchor yt-uix-tooltip')[0]; 
      dislike.click();
    }
	  if (interim_transcript == 'subscribe') {
      console.log('We are disliking page');
      var sub = document.getElementsByClassName('yt-uix-button yt-uix-button-size-default yt-uix-button-subscribe-branded yt-uix-button-has-icon no-icon-markup yt-uix-subscription-button yt-can-buffer')[0]; 
      sub.click();
    }
   if (interim_transcript == 'theater') {
      console.log('We are show theater mode');
      var view = document.getElementsByClassName('ytp-size-button ytp-button')[0]; 
      view.click();
    }
	
    	
	var str=interim_transcript;
	var str1 = str.split(" ");
	for (var i=0;i<str1.length;i++)
 	{
     		var words = str1[i].split(" ");
     		var so = (words[0]);
 	}
	if(so == "search")
	{
		var result = str.replace(/^search\s/i, " ");
      console.log("We are going to search");
	document.getElementById('masthead-search-term').value=result;
    }
  };
}

startButton();

function upgrade() {
  //start_button.style.visibility = 'hidden';
  //showInfo('info_upgrade');
}

var two_line = /\n\n/g;
var one_line = /\n/g;
function linebreak(s) {
  return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
}

var first_char = /\S/;
function capitalize(s) {
  return s.replace(first_char, function(m) { return m.toUpperCase(); });
}

function createEmail() {
  var n = final_transcript.indexOf('\n');
  if (n < 0 || n >= 80) {
    n = 40 + final_transcript.substring(40).indexOf(' ');
  }
  var subject = encodeURI(final_transcript.substring(0, n));
  var body = encodeURI(final_transcript.substring(n + 1));
  window.location.href = 'mailto:?subject=' + subject + '&body=' + body;
}

function copyButton() {
  if (recognizing) {
    recognizing = false;
    recognition.stop();
  }
  copy_button.style.display = 'none';
  copy_info.style.display = 'inline-block';
  //showInfo('');
}

function emailButton() {
  if (recognizing) {
    create_email = true;
    recognizing = false;
    recognition.stop();
  } else {
    createEmail();
  }
  email_button.style.display = 'none';
  email_info.style.display = 'inline-block';
  //showInfo('');
}

function startButton() {
  if (recognizing) {
    recognition.stop();
    return;
  }
  console.log("inside");
  final_transcript = '';
  recognition.lang = 'en-US';
  recognition.start();
  ignore_onend = false;
  //final_span.innerHTML = '';
  //interim_span.innerHTML = '';
  ////start_img.src = 'mic-slash.gif';
  //showInfo('info_allow');
  showButtons('none');
}


var current_style;
function showButtons(style) {
  if (style == current_style) {
    return;
  }
  current_style = style;
  //copy_button.style.display = style;
  //email_button.style.display = style;
  //copy_info.style.display = 'none';
  //email_info.style.display = 'none';
}
