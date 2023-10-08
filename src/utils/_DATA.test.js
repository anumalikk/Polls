const {_saveQuestionAnswer} = require("./_DATA");
const {_saveQuestion} = require("./_DATA");

describe("_saveQuestion", () => {
    it("This test case would return true if correct parameters are passed to _saveQuestion API", async () => {
        const response = await _saveQuestion({
            optionOneText: "option 1",
            optionTwoText: "option 2",
            author: "sarahedo"
        });

        expect(response).toBeTruthy();
    });

    it("This test case would return error if any of the required parameter is not passed to _saveQuestion", async () => {
        const response = await _saveQuestion({
            optionOneText: undefined,
            optionTwoText: "option 2",
            author: "sarahedo"
        }).catch(e => e);

        expect(response).toBe("Please provide optionOneText, optionTwoText, and author");
    });
});

describe("_saveQuestionAnswer", () => {
    it("This test case would return true if correct parameters are passed to _saveQuestionAnswer API", async () => {
        const response = await _saveQuestionAnswer({
            authedUser: "sarahedo",
            qid: "loxhs1bqm25b708cmbf3g",
            answer: "optionTwo"
        });

        expect(response).toBeTruthy();
    });

    it("This test case would return error if any of the required parameter is not passed to _saveQuestionAnswer API", async () => {
        const response = await _saveQuestionAnswer({
            authedUser: "sarahedo",
            qid: undefined,
            answer: "optionOne"
        }).catch(e => e);

        expect(response).toBe("Please provide authedUser, qid, and answer");
    });
});
