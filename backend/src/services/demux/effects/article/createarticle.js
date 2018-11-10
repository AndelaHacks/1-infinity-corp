function createArticle(state, payload, blockInfo, context) {
  const article = {
    _id: {
      timestamp: payload.data.timestamp,
      author: payload.data.author
    },
    author: payload.data.author,
    user: payload.data.user,
    title: payload.data.title,
    content: payload.data.content,
    tags: payload.data.tags,
    category: payload.data.category
  };
  context.socket.emit("newarticle", article);
}

export default createArticle;
