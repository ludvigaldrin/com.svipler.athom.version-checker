const rp = require('request-promise');
const $ = require('cheerio');


function appCheck(_this, app){
    var url = 'https://homey.app/sv-se/app/'+app.id+'/test';
    rp(url)
    .then(function(html){
      const data = $('.value', html);
      const onlineVersion = data[1].children[0].data;
      const currentVersion = app.version;
      if (onlineVersion != currentVersion){
        _this.log("App: " + app.name+ " (" + app.id+")");
        _this.log("--Installed Version: " + app.version + " (" + app.channel+")");
        _this.log("--Onlined Version: "+onlineVersion);
        _this.log("--Update Available: "+url);
      }

    })
    .catch(function(err){
        _this.log("App: " + app.name+ " (" + app.id+")");
        _this.log("Error fetching: " + url);
    });
} 

module.exports = {appCheck};