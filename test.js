const Story = require('./story_interpreter');
const RunTests = require('./testRunner');
const _ = require('lodash');
const {readFileSync} = require('fs');

var story_data_json = readFileSync('./testChoices.json');

function TestFirstChoiceNeg(callback) {
    let story_data = JSON.parse(story_data_json);
    let returns = false
    let valid_return = false
    let valid_state = false

    const story = new Story(story_data)
    const choice = story_data.nodes.first.choices[0]
    story.Subscribe(node => {
        returns = true
        const correct = story_data.nodes.second
        if(_.isEqual(node, correct)) {
            valid_return = true
        }
        if(story.variables.affinity === -1) {
            valid_state = true
        }
    })
    story.MakeChoice(choice)
    if(!returns) {
        callback(false, "Failed Choice 'I'm doing something mean': NextNode was not called when the choice was made")
    } else if(!valid_return) {
        callback(false, "Failed Choice 'I'm doing something mean': An invalid next node was returned after the choice was made")
    } else if(!valid_state) {
        callback(false, "Failed Choice 'I'm doing something mean': The variable 'affinity' was not set to the correct value")
    } else {
        callback(true, "Passed Choice 'I'm doing something mean'")
    }
}

function TestFirstChoicePos(callback) {
    let story_data = JSON.parse(story_data_json)
    let returns = false
    let valid_return = false
    let valid_state = false

    const story = new Story(story_data)
    const choice = story_data.nodes.first.choices[1]
    story.Subscribe(node => {
        returns = true
        const correct = story_data.nodes.second
        if(_.isEqual(node, correct)) {
            valid_return = true
        }
        if(story.variables.affinity === 1) {
            valid_state = true
            
        }
    })
    story.MakeChoice(choice)
    if(!returns) {
        callback(false, "Failed Choice 'Let's do something nice': NextNode was not called when the choice was made")
    } else if(!valid_return) {
        callback(false, "Failed Choice 'Let's do something nice': An invalid next node was returned after the choice was made")
    } else if(!valid_state) {
        callback(false, "Failed Choice 'Let's do something nice': The variable 'affinity' was not set to the correct value")
    } else {
        callback(true, "Passed Choice 'Let's do something nice'")
    }
}

function SecondChoiceNegNeg(callback) {
    let story_data = JSON.parse(story_data_json)
    story_data.variables.affinity -= 1;
    let returns = false
    let valid_return = false
    let valid_state = false

    const story = new Story(story_data)
    const choice = story_data.nodes.second.choices[0]
    story.Subscribe(node => {
        returns = true
        const correct = story_data.nodes.badEnding
        if(_.isEqual(node, correct)) {
            valid_return = true
        }
        if(story.variables.affinity === -2) {
            valid_state = true
        }
    })
    story.MakeChoice(choice)
    if(!returns) {
        callback(false, "Failed Choice 'You suck!' after a negative first choice: NextNode was not called when the choice was made")
    } else if(!valid_return) {
        callback(false, "Failed Choice 'You suck!' after a negative first choice: An invalid next node was returned after the choice was made")
    } else if(!valid_state) {
        callback(false, "Failed Choice 'You suck!' after a negative first choice: The variable 'affinity' was not set to the correct value")
    } else {
        callback(true, "Passed Choice 'You suck!' after a negative first choice")
    }
}

function SecondChoicePosNeg(callback) {
    let story_data = JSON.parse(story_data_json)
    story_data.variables.affinity += 1;
    let returns = false
    let valid_return = false
    let valid_state = false

    const story = new Story(story_data)
    const choice = story_data.nodes.second.choices[0]
    story.Subscribe(node => {
        returns = true
        const correct = story_data.nodes.neutralEnding
        if(_.isEqual(node, correct)) {
            valid_return = true
        }
        if(story.variables.affinity === 0) {
            valid_state = true
        }
    })
    story.MakeChoice(choice)
    if(!returns) {
        callback(false, "Failed Choice 'You suck!' after a positive first choice: NextNode was not called when the choice was made")
    } else if(!valid_return) {
        callback(false, "Failed Choice 'You suck!' after a positive first choice: An invalid next node was returned after the choice was made")
    } else if(!valid_state) {
        callback(false, "Failed Choice 'You suck!' after a positive first choice: The variable 'affinity' was not set to the correct value")
    } else {
        callback(true, "Passed Choice 'You suck!' after a positive first choice")
    }
}

function SecondChoiceNegPos(callback) {
    let story_data = JSON.parse(story_data_json)
    story_data.variables.affinity -= 1;
    let returns = false
    let valid_return = false
    let valid_state = false

    const story = new Story(story_data)
    const choice = story_data.nodes.second.choices[1]
    story.Subscribe(node => {
        returns = true
        const correct = story_data.nodes.neutralEnding
        if(_.isEqual(node, correct)) {
            valid_return = true
        }
        if(story.variables.affinity === 0) {
            valid_state = true
        }
    })
    story.MakeChoice(choice)
    if(!returns) {
        callback(false, "Failed Choice 'Hey you're pretty cool' after a negative first choice: NextNode was not called when the choice was made")
    } else if(!valid_return) {
        callback(false, "Failed Choice 'Hey you're pretty cool' after a negative first choice: An invalid next node was returned after the choice was made")
    } else if(!valid_state) {
        callback(false, "Failed Choice 'Hey you're pretty cool' after a negative first choice: The variable 'affinity' was not set to the correct value")
    } else {
        callback(true, "Passed Choice 'Hey you're pretty cool' after a negative first choice")
    }
}

function SecondChoicePosPos(callback) {
    let story_data = JSON.parse(story_data_json)
    story_data.variables.affinity += 1;
    let returns = false
    let valid_return = false
    let valid_state = false

    const story = new Story(story_data)
    const choice = story_data.nodes.second.choices[1]
    story.Subscribe(node => {
        returns = true
        const correct = story_data.nodes.goodEnding
        if(_.isEqual(node, correct)) {
            valid_return = true
        }
        if(story.variables.affinity === 2) {
            valid_state = true
        }
    })
    story.MakeChoice(choice)
    if(!returns) {
        callback(false, "Failed Choice 'Hey you're pretty cool' after a negative first choice: NextNode was not called when the choice was made")
    } else if(!valid_return) {
        callback(false, "Failed Choice 'Hey you're pretty cool' after a negative first choice: An invalid next node was returned after the choice was made")
    } else if(!valid_state) {
        callback(false, "Failed Choice 'Hey you're pretty cool' after a negative first choice: The variable 'affinity' was not set to the correct value")
    } else {
        callback(true, "Passed Choice 'Hey you're pretty cool' after a positive first choice")
    }
}



RunTests(TestFirstChoiceNeg, TestFirstChoicePos, SecondChoiceNegNeg, SecondChoicePosNeg, SecondChoiceNegPos, SecondChoicePosPos)