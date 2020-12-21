# Auto Room Clean Events

## Introduction
This project is a set of google app scripts intended to automate the creation of "Cleaning" bookings directly after a reource has been booked.  

Features include
- Creating cleaining events
- Moving cleaning events
- Removing cleaning events when a booking is canceled
- Allowing an account that is not an admin on a resource, to impact the "Cleaning" event via booking the resource.
    - Note that normally, a regular account can't directly change events on a resource. However, since the script is the one makeing the changes to the "Cleaning" event, the booking of the resource, and changing that resource on an appointment, does change the "cleaning" event as well. 
    - _Note that there is an issue with this if someone trys to move their appointment to a time where there's already a cleaning time booked. See known issues below._

## Settings

#### Number of days out
The scipt can be set to examine a set number of days into the future. The `DAYS_OUT` __const__ is currently set to '28'. This can be set in the `Settings.js` file.

#### Name
The `CLEANING_EVENT_NAME` __const__ is currently set to 'Cleaning-Auto-Reserved'. This can be set in the `Settings.js` file.

#### Event Time 
The `CLEANING_TIME` __const__ can be set in the `Settings.js` file. Currently it's 30 min.

#### Default calendar.
This is mainly used for testing. It can be set in the `Settings.js` file. Note that this is not a `const` because it may need to be changed in the code.

## How to use

1. Choose the G-Suite account that will be the owner of the process, and has access to administer the targeted resource calendars.
2. Log in as the desigated account, and visit drive.google.com. 
3. Navigate to the TODO directory in the shared team folder, and open the 'GimletAutoRoomClean' project.
4. Initialize and authorize the "scopes" needed by running the "initialize()" function in the `intialize.gs` file.
5. Change the settings in `Settings.gs` to name the events, set the time, and choose how far out. 
6. To enable tests, create a new Calendar, either of you own, or a Resource, of have an admin create a resource that you have full access to change for testing. 
7. Get the id of the cal, and put it in the `Settings.gs` file. 
8. Run tests in the `tests.gs` file, or tests in the various fuction files. 
9. Find your logs in the "My Executions" view in the Google App Script dashbaord, to make sure tests look like you expect. 


## Known Issues

- The owner/organizer running the scripts will get emails from the resource when events are moved. The scripts cause a frequent deleting of old cleaning events, especially when using the "Triggered" approach. Each change to the calendar triggers the scripts to run. If the script also then changes the calendar, the script will run again, in a bit of loop, until the change is done, and not more "Cleaning" events need to be added or removed. 

- Occasionally, timing of the script yeilds a problem when changing the time of an event. Cleaning events in general will make way, by auto-deleting before the resource trys to accept the new time, but it's best to try to make sure there's no cleaning event already in the time that the booking wants to inhabit. So, the work around is to remove the resource, first, make sure the Cleaning event is removed auto-matically (which might take a few moments), then change the booking, and rebook the resource. Related, cleaning events might appeare duplicated. This will generally be temporary, and only noticed if refreshing calendars before the script has finished sending the changes to the resource calendar. 

