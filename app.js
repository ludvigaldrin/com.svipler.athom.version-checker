'use strict';

const Homey = require('homey');
const { HomeyAPI } = require('athom-api');

class VersionChecker extends Homey.App {
  /**
   * onInit is called when the app is initialized.
   */
  async onInit() {
    this.log('Version Checker has been initialized');
    const homeyAPI = await this.login();
    this.log('Logged in');
    const appsList = await homeyAPI.apps.getApps();
    //this.log("Apps fetched: " + appsList.length);
    var count = Object.keys(appsList).length();
    this.log("Number of apps fetched: " + count);
    //this.checkApps(appsList);
  }

  checkApps(apps){
    for (i = 0; i < apps.length; i++) {
      this.log(apps[i]);
      break;
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