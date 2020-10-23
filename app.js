'use strict';

const Homey = require('homey');
const { HomeyAPI } = require('athom-api');
const webParser = require('./webparse');

class VersionChecker extends Homey.App {
  /**
   * onInit is called when the app is initialized.
   */
  async onInit() {
    this.log('Version Checker has been initialized');
    const homeyAPI = await this.login();
    this.log('Logged in');
    const appsList = await homeyAPI.apps.getApps();
    this.checkApps(appsList);

    
  }

  checkApps(apps){
    for (const key in apps) {
      const app = apps[key];
      //console.log(`${property}: ${object[property]}`);
      //this.log(app);
      this.log("App: " + app.name+ " (" + app.id+") - " + app.origin);
      //this.log("--Current Version: " + app.version + " (" + app.channel+")");
      if (app.origin === "appstore"){
        webParser.appCheck(this, app);
      }
    }
  }
 
  async login() {

    //Authenticate against the current Homey.
    const homeyAPI = await HomeyAPI.forCurrentHomey(this.homey);

    //Example: Make the Homey say something to prove we're authenticated
    //this.log(user.fullname);
    //await homeyAPI.speechOutput.say({text: 'Hello:  Bosse'});

    return homeyAPI;
  }
}

module.exports = VersionChecker;