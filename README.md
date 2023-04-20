# rocketchat-tweaks
Collection of tweaks.

(Important: This sort of tweaks are very fragile during upgrades and may need review.)

1. Display messages on channels starting from bottom (last tested 6.1.2)

        Add display-from-bottom/custom.css to Workspace > Layout > Custom CSS

2. Click on message to open thread (last tested 6.1.2) - It has a variable at start that by default is true meaning it will open also for messages with no thread started

        Add  click-message-thread/custom-login.js to Workspace > Layout > Scripts > Custom Script for Logged In Users

3. Add some warning sign to omnichannel chats innactive for too long (last tested 6.1.2) - It has variables at beginning to control times for periodic execution and initial execution, as well for max time before adding warning, for the warning message itself and for controlling debug on browser console. 


        Add  omnichannel-alert/custom-login.js to Workspace > Layout > Scripts > Custom Script for Logged In Users

4. Hide usernames from list of suggestion when using @ mentions. If you configure in Layount to hide usernames and on user preferences, including in default ones under Accounts settings, the list of suggestions when using @ still presents it, which is the reason for this css tweak. (last tested 6.1.2)

        Add click-message-thread/custom.css to Workspace > Layout > Custom CSS

5. Presents over the user's status as tip its actual status text and not the stateus precense value. (last tested 6.1.3) It has am intervalSeconds variable at start to configure how long before making any calls to the user info to check its status text has changed. It also depends that you use usernames as labels and not the users real names.

        Add display-user-status/custom.js to Workspace > Layout > Scripts > Custom Script for Logged In Users


