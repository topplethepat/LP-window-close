# liveperson-window-autoclose
Auto close the liveperson window if agent ends convo but after the survey is completed

## What it does

This script automatically closes the chat window after:
- Initial bot interaction
- Transfer to human agent
- Survey completion

## How to use

1. Add the script to your website
2. The script will automatically track messaging states
3. Messaging window closes automatically 15 seconds after survey completion

## Features

- Tracks conversation flow from bot to human agent
- Waits for survey completion
- Closes chat window automatically
- Includes debug helpers

## Debug Helper

Check conversation flow status in browser console:
```javascript
checkConversationFlow()
```

## Setup

Just copy the script and include it in your website after the LivePerson Web Tag init

## Requirements

- LivePerson Web Tag (lpTag) must be present on the page
- vanilla JavaScript, so no additional dependencies needed

## Notes

This is a utility script and not officially associated with LivePerson. It works with standard LivePerson lpTag bind events

## License

MIT
