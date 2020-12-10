var enabled;
chrome.storage.local.get(['skipEnabled', 'stealthEnabled', 'background'], function (result) {
	console.log(result.skipEnabled);
	console.log(result.stealthEnabled);
	enabled = result.skipEnabled;
	stealth = result.stealthEnabled;
	document.getElementById("backgroundInput").value = result.background;
	if (enabled == true) {
		document.getElementById("active").innerText = "Echo Test Skip is Enabled";
		document.getElementById("toggle").innerText = "Disable";
		document.getElementById("toggle").style.background = "#cc2929";
		document.getElementById("toggle").style.borderColor = "#a62323";
		document.getElementById("colorBar").style.background = "#29cc41";
	} else {
		document.getElementById("active").innerText = "Echo Test Skip is Disabled";
		document.getElementById("toggle").innerText = "Enable";
		document.getElementById("toggle").style.background = "#29cc41";
		document.getElementById("toggle").style.borderColor = "#23a636";
		document.getElementById("colorBar").style.background = "#cc2929";
	}
	if(stealth){
		document.getElementById("stealth").innerText = "Disable Stealth Mode";
	} else {
		document.getElementById("stealth").innerText = "Enable Stealth Mode";
	}
});

document.getElementById("toggle").addEventListener("click", toggleActive);
document.getElementById("stealth").addEventListener("click", stealthActive);
document.getElementById("backgroundInput").addEventListener("input", updateBackground);

function toggleActive() {
	if (enabled == true) {
		chrome.storage.local.set({
			'skipEnabled': false
		}, function () {
			window.location.reload();
		});
	} else {
		chrome.storage.local.set({
			'skipEnabled': true
		}, function () {
			window.location.reload();
		});
	}
}

function stealthActive() {
	if (stealth == true) {
		chrome.storage.local.set({
			'stealthEnabled': false
		}, function () {
			window.location.reload();
		});
	} else {
		chrome.storage.local.set({
			'stealthEnabled': true
		}, function () {
			window.location.reload();
		});
	}
}

function updateBackground(){
	chrome.storage.local.set({'background': document.getElementById("backgroundInput").value}, function () {});
}