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
  