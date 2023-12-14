// Register an alarm that fires every minute
chrome.alarms.create('cleanHistory', { periodInMinutes: 1 });


// Listen for when the alarm is fired
chrome.alarms.onAlarm.addListener(function(alarm) {
  if (alarm.name === 'cleanHistory') {
    var millisecondsPerWeek = 1000 * 60 * 60 * 24 * 7; // A variable to determine how many miliseconds are in a week. so that we can clear data from a week ago. 
    var oneWeekAgo = (new Date()).getTime() - millisecondsPerWeek;
    chrome.browsingData.removeCache({ "since": oneWeekAgo }); // Clears login data on any website.
    chrome.browsingData.removeCookies({ "since": oneWeekAgo }); // Clears cache
    chrome.browsingData.removeHistory({ "since": oneWeekAgo });  // Cache & Clearing History helps with memory usage / storage. 
    // Add more remove methods as needed
    chrome.notifications.create({ // Creates a notifcation once cleanHistory is fired 
      iconUrl: 'icon.png',
      type: 'basic',
      title: 'Login Data Cleared',
      message: 'Your login data has been cleared.'
    });
  }
});