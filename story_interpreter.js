module.exports = class Story {
    constructor(story_data) {
        this.variables = story_data.variables;
        this.start = story_data.start;
        this.nodes = story_data.nodes;
        this.subscribers = [];
    }

    // Subscribe is how our story object will communicate with other parts of our program. You can pass in a callback
    // function into Subscribe, and that callback function will be called whenever NextNode is called to get the
    // Next part of our dialogue.
    Subscribe(callback) {
        this.subscribers.push(callback);
    }

    NotifySubscribers(nodeData) {
        this.subscribers.forEach(subscriber => {
            subscriber(nodeData);
        })
    }

    NextNode(node_name) {
        const node = this.nodes[node_name];
        if(!node) {
            console.log("Invalid node name");
            return;
        }
        let outputNode = {};
        outputNode.data = node.data;
        if(node.redirects) {
            outputNode.redirect = this.GetValidRedirect(node.redirects);
        }
        if(node.choices) {
            outputNode.choices = node.choices;
        }
        this.NotifySubscribers(outputNode);
        return outputNode;
    }

    MakeChoice(choice) {
        // Your code here!
    }

    Start() {
        return this.NextNode(this.start);
    }

    GetValidRedirect(redirects) {
        for(let i = 0; i < redirects.length; i++) {
            if(redirects[i].conditions) {
                if(this.CheckConditionSet(redirects[i].conditions)) return redirects[i];
            } else {
                return redirects[i];
            }
            
        }
        console.log("No valid redirects found! Something might be wrong with your script")
    }

    CheckConditionSet(conditions) {
        for(let i = 0; i < conditions.length; i++) {
            if(!this.CheckCondition(conditions[i])) return false;
        }
        return true;
    }

    CheckCondition(condition) {
        const value = this.variables[condition.variable];
        switch(condition.operator) {
            case '=': return value === condition.value;
                break;
            case '!=': return value !== condition.value;
                break;
            case '<': return value < condition.value;
                break;
            case '>': return value > condition.value;
                break;
            case '<=': return value <= condition.value;
                break;
            case '>=': return value >= condition.value;
                break;
            default: console.log('Invalid operator');
        }
    }
}