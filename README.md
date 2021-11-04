# Discord Bot

This readme will be a temporary place to store my thoughts on the initial desing of the project

## Embed Portal

Portal to manage and create the messages that will be in the discord guild

### Bot back-end architecture

-   Typescript app running on Node.JS and being hosted on Heroku/GCloud?
    -   Discord.JS as the bot framework
        -   Use the base from [Discord bot Template](https://github.com/thomasreichmann/discord-bot-template)
            -   Add relevant commands to the template
    -   express.JS as the web framework
        -   Add an express side to the original bot template
    -   firestore db as the data storage

### Portal front-end architecture

-   Typescript app using React as a web framework and hosted on firebase

### User stories

Workflows that the user will follow to create, delete and edit embeds.

##### create new message through the portal

-   click "create new message" in the portal
    -   send a get request to the bot asking for the channels in the guild
    -   select which channel to send the message to
    -   fill out the title, content, color, footer, etc ...
    -   click "confirm"
        -   send the info as a post request to the bot's express back-end
            -   receive the response indicating success/failure and containing the message ID
                -   send the message ID and info to the firestore db

##### receive create message post from portal

-   create a embed using the post info
    -   send the embed to the channel that the post info channelID is referring to
        -   take the resulting message ID and send it as a response to the post

##### edit message through the portal

-   get all messages from the firestore db
    -   select which message to edit
        -   edit in the modal the fields you are interested in
        -   select "save"
            -   send the message ID and new info as a post to the bot
                -   receive the response indicating success/failure
                    -   show dialog indicating the status

##### re-send the message through portal

-   get all messages from the firestore db
    -   on the list containing all of the messages, find the one you are interested in and click "re-send"
        -   send the message ID to the "re-send" endpoint
            -   receive the response with the new message ID
                -   store the new message ID in the firestore db
                    -   show success dialog

##### delete the message through portal

-   get all messages from the firestore db
    -   on the list containing all of the messages, find the one you are interested in and click "delete"
        -   send the message ID to the "delete" endpoint
            -   receive the response indicating successful/unsuccessful deletion
                -   show success/failure dialog
