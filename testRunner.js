// A test must be a function that takes a callback
// And calls it with paramaters success: boolean, message: string, error: string

module.exports =  function RunTests(...tests) {
    let index = 0;
    let passedTests = 0;
    let failedTests = 0;
    function Test(result, message, error) {
        if(result) {
            passedTests++;
            console.log("\x1b[32m", message);
        } else {
            failedTests++;
            console.log("\x1b[31m", message);
        }
        if(error) console.log("\x1b[33m", error)
        if(index < tests.length - 1) {
            index++;
            tests[index](Test);
        } else {
            console.log("\x1b[32m", "Tests passed: " + passedTests);
            if(failedTests <= 0) {
                console.log("\x1b[32m", "Tests failed: " + failedTests);
            } else {
                console.log("\x1b[31m", "Tests failed: " + failedTests);
            }
            if(passedTests === tests.length) console.log("\x1b[32m", "All tests passed!");
        }
    }
    tests[0](Test);
}