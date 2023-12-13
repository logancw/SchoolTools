// Register an alarm that fires every minute
chrome.alarms.create('cleanHistory', { periodInMinutes: 1 });


// Listen for when the alarm is fired
chrome.alarms.onAlarm.addListener(function(alarm) {
  if (alarm.name === 'cleanHistory') {
    var millisecondsPerWeek = 1000 * 60 * 60 * 24 * 7;
    var oneWeekAgo = (new Date()).getTime() - millisecondsPerWeek;
    chrome.browsingData.removeCache({ "since": oneWeekAgo });
    chrome.browsingData.removeCookies({ "since": oneWeekAgo });
    chrome.browsingData.removeDownloads({ "since": oneWeekAgo });
    chome.browsingData.removeHistory({ "since": oneWeekAgo });
    // Add more remove methods as needed
    console.log("Cleared login data.");
  }
});