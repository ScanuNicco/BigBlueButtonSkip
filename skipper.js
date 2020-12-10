chrome.storage.local.get(['skipEnabled', 'stealthEnabled', 'background'], function (result) {
	console.log(result.skipEnabled);
	console.log(result.stealthEnabled);
	console.log(result.background);
	enabled = result.skipEnabled;
	stealth = result.stealthEnabled;
	background = result.background;
	if(result.background == undefined){
		background = "#06172A";
	}
	document.body.style.background = background;
	if (enabled == true) {
		if (!stealth) {
			var loadingScreen = document.createElement("div");
			loadingScreen.innerHTML = "<div style='width: 100vw; height: 100vh; z-index=10000000000000000; background: " + background + "; text-align: center; position: fixed; top: 0vh; color: white;' id='skipper-loading-popup'><!--<h1>Skipping Echo Test. Please Wait...</h1>--><img style=' margin-top: 45vh' src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgifimage.net%2Fwp-content%2Fuploads%2F2017%2F09%2Fajax-loading-gif-transparent-background-8.gif&f=1&nofb=1' width='50px'></div>";
			document.body.appendChild(loadingScreen);
			document.getElementById("app").style.opacity = "0";
		}

		function eventFire(el, etype) {
			if (el.fireEvent) {
				el.fireEvent('on' + etype);
			} else {
				var evObj = document.createEvent('Events');
				evObj.initEvent(etype, true, false);
				el.dispatchEvent(evObj);
			}
		}

		var loadInterval = setInterval(isLoaded, 100);

		function isLoaded() {
			if (document.getElementsByClassName('jumbo--Z12Rgj4')[0] !== undefined) { /* The buttons have loaded, click them */
				console.log("Loaded!");
				eventFire(document.getElementsByClassName('jumbo--Z12Rgj4')[0], 'click');
				if (!stealth) {
					document.getElementsByClassName("portal--27FHYi")[0].style.opacity = "0";
				}
				clearInterval(loadInterval);
				setTimeout(function () { //Give the first prompt 500ms to close, then start checking the buttons again
					var loadInterval = setInterval(isEchoLoaded, 100);
				}, 500);
			} else {
				console.log("Not Loaded!")
			}
		}

		function isEchoLoaded() {
			if (document.getElementsByClassName('jumbo--Z12Rgj4')[0] !== undefined) { /* The buttons have loaded, click them */
				eventFire(document.getElementsByClassName('jumbo--Z12Rgj4')[0], 'click');
				if (!stealth) {
					document.getElementById('skipper-loading-popup').style.display = 'none';
					document.getElementById("app").style.opacity = "1";
					document.getElementsByClassName("portal--27FHYi")[0].style.opacity = "1";
				}
				clearInterval(loadInterval);
			}
		}

	}
});
