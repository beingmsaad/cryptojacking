";window.CloudflareApps=window.CloudflareApps||{};CloudflareApps.siteId=\"b17f6447d6a1176abc5910284f57ffa3\";CloudflareApps.installs=CloudflareApps.installs||{};;(function(){'use strict'\nCloudflareApps.internal=CloudflareApps.internal||{}\nvar errors=[]\nCloudflareApps.internal.placementErrors=errors\nvar errorHashes={}\nfunction noteError(options){var hash=options.selector+'::'+options.type+'::'+(options.installId||'')\nif(errorHashes[hash]){return}\nerrorHashes[hash]=true\nerrors.push(options)}\nvar initializedSelectors={}\nvar currentInit=false\nCloudflareApps.internal.markSelectors=function markSelectors(){if(!currentInit){check()\ncurrentInit=true\nsetTimeout(function(){currentInit=false})}}\nfunction check(){var installs=window.CloudflareApps.installs\nfor(var installId in installs){if(!installs.hasOwnProperty(installId)){continue}\nvar selectors=installs[installId].selectors\nif(!selectors){continue}\nfor(var key in selectors){if(!selectors.hasOwnProperty(key)){continue}\nvar hash=installId+'::'+key\nif(initializedSelectors[hash]){continue}\nvar els=document.querySelectorAll(selectors[key])\nif(els&&els.length>1){noteError({type:'init:too-many',option:key,selector:selectors[key],installId:installId})\ninitializedSelectors[hash]=true\ncontinue}else if(!els||!els.length){continue}\ninitializedSelectors[hash]=true\nels[0].setAttribute('cfapps-selector',selectors[key])}}}\nCloudflareApps.querySelector=function querySelector(selector){if(selector==='body'||selector==='head'){return document[selector]}\nCloudflareApps.internal.markSelectors()\nvar els=document.querySelectorAll('[cfapps-selector=\"'+selector+'\"]')\nif(!els||!els.length){noteError({type:'select:not-found:by-attribute',selector:selector})\nels=document.querySelectorAll(selector)\nif(!els||!els.length){noteError({type:'select:not-found:by-query',selector:selector})\nreturn null}else if(els.length>1){noteError({type:'select:too-many:by-query',selector:selector})}\nreturn els[0]}\nif(els.length>1){noteError({type:'select:too-many:by-attribute',selector:selector})}\nreturn els[0]}}());(function(){'use strict'\nvar prevEls={}\nCloudflareApps.createElement=function createElement(options,prevEl){options=options||{}\nCloudflareApps.internal.markSelectors()\ntry{if(prevEl&&prevEl.parentNode){var replacedEl\nif(prevEl.cfAppsElementId){replacedEl=prevEls[prevEl.cfAppsElementId]}\nif(replacedEl){prevEl.parentNode.replaceChild(replacedEl,prevEl)\ndelete prevEls[prevEl.cfAppsElementId]}else{prevEl.parentNode.removeChild(prevEl)}}\nvar element=document.createElement('cloudflare-app')\nvar container\nif(options.pages&&options.pages.URLPatterns&&!CloudflareApps.matchPage(options.pages.URLPatterns)){return element}\ntry{container=CloudflareApps.querySelector(options.selector)}catch(e){}\nif(!container){return element}\nif(!container.parentNode&&(options.method==='after'||options.method==='before'||options.method==='replace')){return element}\nif(container===document.body){if(options.method==='after'){options.method='append'}else if(options.method==='before'){options.method='prepend'}}\nswitch(options.method){case'prepend':if(container.firstChild){container.insertBefore(element,container.firstChild)\nbreak}\ncase'append':container.appendChild(element)\nbreak\ncase'after':if(container.nextSibling){container.parentNode.insertBefore(element,container.nextSibling)}else{container.parentNode.appendChild(element)}\nbreak\ncase'before':container.parentNode.insertBefore(element,container)\nbreak\ncase'replace':try{var id=element.cfAppsElementId=Math.random().toString(36)\nprevEls[id]=container}catch(e){}\ncontainer.parentNode.replaceChild(element,container)}\nreturn element}catch(e){if(typeof console!=='undefined'&&typeof console.error!=='undefined'){console.error('Error creating Cloudflare Apps element',e)}}}}());(function(){'use strict'\nCloudflareApps.matchPage=function matchPage(patterns){if(!patterns||!patterns.length){return true}\nvar loc=document.location.host+document.location.pathname\nif(window.CloudflareApps&&CloudflareApps.proxy&&CloudflareApps.proxy.originalURL){var url=CloudflareApps.proxy.originalURL.parsed\nloc=url.host+url.path}\nfor(var i=0;i<patterns.length;i++){var re=new RegExp(patterns[i],'i')\nif(re.test(loc)){return true}}\nreturn false}}());CloudflareApps.installs[\"MftTg7VFh0IX\"]={appId:\"MVNZ0q2GLRR4\",scope:{}};;CloudflareApps.installs[\"MftTg7VFh0IX\"].options={\"account\":{\"accountId\":\"guVe1WA_2vfE\",\"service\":\"agile-seo2\",\"userId\":2017},\"apiTokens\":[\"MxwKOTPDHLcbXmf\"],\"hash\":\"b17f6447d6a1176abc5910284f57ffa3\",\"settings\":[{\"encoding\":null,\"id\":1790,\"url_exclusion_path\":\"\",\"url_path\":\"https://www.techno360.in/*\"}],\"subdomain_toggle\":false,\"website_url\":\"https://www.techno360.in/\"};;CloudflareApps.installs[\"YijZQFJpUyOk\"]={appId:\"0VJ1mCYqPTh4\",scope:{}};;CloudflareApps.installs[\"YijZQFJpUyOk\"].options={\"color\":{\"custom\":\"#1623df\",\"strategy\":\"custom\"},\"position\":{\"value\":\"bottom-right\"},\"shape\":{\"icon\":\"pointer\",\"radius\":1,\"showBackground\":true}};;CloudflareApps.installs[\"y4W2VlhH082l\"]={appId:\"1QBPNdXPwt-s\",scope:{}};;CloudflareApps.installs[\"y4W2VlhH082l\"].options={\"refresh_interval\":540};(function(){var script = document.createElement('script');script.src = '/cdn-cgi/apps/body/RLxGOIcsAA7LzHU_gKH11xpZZps.js';document.head.appendChild(script);})();"