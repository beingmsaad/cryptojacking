"function displayPlaceholders(arr){\n\tvar i = 0;\n\tsetInterval(\n\t\tfunction(){\n\t\t\t$( \"#data\" ).attr(\"placeholder\", arr[i]);\n\t\t\ti++;\n\t\t\tif(i >= urls.length) i = 0;\n\t\t},2500);\n}\n\n$( \"#data\" ).hover(function() {\n  $( this ).attr( \"placeholder\", \"Enter URL here\" );\n});\n\n$('#data').keydown(function (e){\n    if(e.keyCode == 13){\n        e.preventDefault();\n        $(\"form\").submit();\n    }\n})\n\n$('#go').click(function(e){\n    e.preventDefault();\n    $(\"form\").submit();\n});\n\n\n$('.placeholder').on('click', '#download a', function(event) {\n    ga('send', 'event', 'download', 'click', event.which);\n    switch (event.which) {\n        case 1:\n            break;\n            alert('Confused? Try using the other click button and \"Save link as...\"');\n            return false;\n            break;\n        case 2:\n            alert('Confused? Try using the right click button and \"Save link as...\"');\n            return false;\n            break;\n        case 3:\n            //alert('Right Mouse button pressed.');\n            return false;\n            break;\n        default:\n            alert('Hmmm... You have a strange Mouse!');\n            return false;\n    }\n});\n\nfunction createCookie(name, value, days) {\n\tif (days) {\n\t\tvar date = new Date();\n\t\tdate.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));\n\t\tvar expires = \"; expires=\" + date.toGMTString();\n\t}\n\telse var expires = \"\";\n\tdocument.cookie = name + \"=\" + value + expires + \"; path=/;\";\n}\n\nfunction colors_true(spinner){\n    if(spinner === true){\n        $(\".submit\").removeClass( \"spinner\" );\n    }\n    $(\".bounce1\").css(\"cssText\", \"background-color: #f7b903;\");\n    $(\".bounce2\").css(\"cssText\", \"background-color: #5bb6fd\");\n    $(\".bounce3\").css(\"cssText\", \"background-color: #d13360\");\n}\n\nfunction secondsTimeSpanToHMS(s) {\n    s = Math.floor (s);\n    var h = Math.floor(s/3600); //Get whole hours\n    s -= h*3600;\n    var m = Math.floor(s/60); //Get remaining minutes\n    s -= m*60;\n    return h+\":\"+(m < 10 ? '0'+m : m)+\":\"+(s < 10 ? '0'+s : s); //zero padding on minutes and seconds\n}\n\nfunction isJSON(string){\n    var jsonString = string;\n    try {\n      json = JSON.parse(jsonString);\n    } catch (exception) {\n      json = null;\n    }\n\n    if (json) {\n        return true;\n    } else {\n        return false;\n    }\n}\n\n\nfunction forceDownload(blob, filename) {\n    var a = document.createElement('a');\n    a.download = filename;\n    a.href = blob;\n    a.click();\n  }\n  \n  // Current blob size limit is around 500MB for browsers\n  function downloadResource(url, filename) {\n    if (!filename) filename = url.split('\\\\').pop().split('/').pop();\n    fetch(url, {\n        headers: new Headers({\n          'Origin': location.origin\n        }),\n        mode: 'cors'\n      })\n      .then(response => response.blob())\n      .then(blob => {\n        let blobUrl = window.URL.createObjectURL(blob);\n        forceDownload(blobUrl, filename);\n      })\n      .catch(e => console.error(e));\n  }\n\n\n\n// var jqxhr = $.ajax( \"https://geoip-db.com/json/\", {dataType: \"json\"} )\n// .done(function( data ) {\n//     if( data.country_code === 'US' ) {\n//         // if( document.referrer.search('google') > 0 ){\n//         //     var tomorrow = new Date();\n//         //     var expire = tomorrow.setDate(tomorrow.getDate() + 1);\n//         //     document.cookie = \"g=1; expires=\" + expire +\"; path=/\";\n//         // }\n//         $('<iframe src=\"//rcm-na.amazon-adsystem.com/e/cm?o=1&p=288&l=ur1&category=amazonhomepage&f=ifr&linkID=56b43992752a885e4ec0949da5f4f229&t=savelink-20&tracking_id=savelink-20\" width=\"320\" height=\"50\" scrolling=\"no\" border=\"0\" marginwidth=\"0\" style=\"border:none;\" frameborder=\"0\"></iframe>').appendTo('footer')\n//     }\n// })\n// .fail(function() {\n//     console.log( \"error\" );\n// })\n// .always(function() {\n//     // console.log( \"complete\" );\n// });"
