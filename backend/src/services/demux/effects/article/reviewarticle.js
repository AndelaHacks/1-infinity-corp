function reviewArticle(state, payload, blockInfo, context) {
  const article = {
    _id: {
      timestamp: payload.data.timestamp,
      author: payload.data.author
    },
    author: payload.data.author,
    reviewer: payload.data.reviewer,
    review: payload.data.review
  };
  context.socket.emit("review", article);
}

export default reviewArticle;
