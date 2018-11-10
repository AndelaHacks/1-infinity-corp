async function reviewArticle(state, payload, blockInfo, context) {
  const Article = state.article;
  try {
    const article = await Article.findById({
      timestamp: payload.data.timestamp,
      author: payload.data.author
    }).exec();

    const newreview = {
      reviewer: payload.data.reviewer,
      review: payload.data.review
    };

    // Add to reviews array
    article.reviews.unshift(newreview);

    await article.save();
  } catch (err) {
    console.error(err);
  }
}

export default reviewArticle;
