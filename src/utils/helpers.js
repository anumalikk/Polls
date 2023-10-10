export function formatDate (timestamp) {
    const d = new Date(timestamp)
    const time = d.toLocaleTimeString('en-US')
    return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString()
  }
  
  export const questionsWithAvatar = (quess, useres) => {
  const questionsWithAvatar = {};

  for (const questionId in quess) {
    if (quess.hasOwnProperty(questionId)) {
      const question = { ...quess[questionId] }; // Clone the original question object
      const authorId = question.author;
      const author = useres[authorId];

      if (author) {
        question.authorInfo = {
          id: author.id,
          name: author.name,
          avatarURL: author.avatarURL,
        };
      }

      questionsWithAvatar[questionId] = question;
    }
  }
  return questionsWithAvatar;
};

export const sortQuestionsByTimestamp = (questions) => {
  // Create a new object with sorted questions without modifying the original
  const sortedQuestions = Object.fromEntries(
    Object.entries(questions).sort(([, a], [, b]) => b.timestamp - a.timestamp)
  );

  return sortedQuestions;
};

// Function to calculate the score for a user
function calculateUserScore(user) {
  const createdQuestionsCount = user.questions.length;
  const answeredQuestionsCount = Object.keys(user.answers).length;
  const score = createdQuestionsCount + answeredQuestionsCount;
  return { ...user, score };
}

// Function to calculate scores for all users and return the modified users object
export function calculateScoresAndReturnUsers(users) {
  const usersWithScores = Object.keys(users).map((userId) => {
    return calculateUserScore(users[userId]);
  });

  return usersWithScores;
}
  