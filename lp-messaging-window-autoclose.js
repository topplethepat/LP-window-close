// track conversation flow states
let conversationStates = {
    startedWithBot: false,
    transferredToHuman: false,
    transferredToSurveyBot: false,
    surveyEnded: false,
    currentAgentName: null,
    currentAgentId: null
};

// just a list of our bot names
const BOT_AGENTS = ['Viking Virtual Agent', 'Survey Bot'];

// quick check if agent is a bot
function isBot(agentName) {
    return BOT_AGENTS.includes(agentName);
}

// handles closing the chat window
function handleChatClose() {
    setTimeout(() => {
        const closeButton = document.querySelector('[data-lp-point="minimize"]');
        if (closeButton) {
            closeButton.click();
        }
    }, 3000);
}

// main logic to keep track of the conversation
lpTag.events.bind({
    eventName: "conversationInfo",
    appName: "lpUnifiedWindow",
    func: function(data) {
        if (data.agentName) {
            conversationStates.currentAgentName = data.agentName;
            conversationStates.currentAgentId = data.agentId;

            if (data.agentName === 'Viking Virtual Agent' && !conversationStates.transferredToHuman) {
                conversationStates.startedWithBot = true;
            }
            else if (!isBot(data.agentName) && conversationStates.startedWithBot) {
                conversationStates.transferredToHuman = true;
            }
            else if (data.agentName === 'Survey Bot' && conversationStates.transferredToHuman) {
                conversationStates.transferredToSurveyBot = true;
            }
        }
    }
});

// watch for state changes in the chat, includes an "else" if bot closes convo due to unavailable agents
lpTag.events.bind({
    eventName: "state",
    appName: "lpUnifiedWindow",
    func: function(data) {
        if (data.state === "ended" && conversationStates.transferredToSurveyBot) {
            conversationStates.surveyEnded = true;
            handleChatClose();
        }
          else if (data.state === "ended" && !conversationStates.transferredToSurveyBot) {
            handleChatClose();
        }
    }
});

// helper to check the flow status
function getConversationFlow() {
    return {
        startedWithBot: conversationStates.startedWithBot,
        transferredToHuman: conversationStates.transferredToHuman,
        transferredToSurveyBot: conversationStates.transferredToSurveyBot,
        surveyEnded: conversationStates.surveyEnded,
        currentAgent: conversationStates.currentAgentName
    };
}

// make the helper available globally
window.checkConversationFlow = getConversationFlow;

// invoke the above code and close window after 15 sec
function handleChatClose() {
    console.log('wait 15 seconds before closing the chat window...');
    setTimeout(() => {
        const closeButton = document.querySelector('[data-lp-point="minimize"]');
        if (closeButton) {
            console.log('closing chat window');
            closeButton.click();
        } else {
            console.log('close button not found');
        }
    }, 15000); // 15 second delay
}
