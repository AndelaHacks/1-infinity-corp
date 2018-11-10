async function createArticle(state, payload, blockInfo, context) {
  const Article = state.article;
  try {
    let article = await Article.find({
      _id: {
        timestamp: payload.data.timestamp,
        author: payload.data.author
      }
    }).exec();

    // if article already exists do not insert it in again
    if (article.length !== 0) return;

    // cast the upcoming id to ObjectId, just to be sure, and then use that ID to query the User

    // let user = await User.findOne({ email: payload.data.user }).exec();
    // console.log(payload.data);

    article = new Article({
      _id: {
        timestamp: payload.data.timestamp,
        author: payload.data.author
      },
      author: payload.data.author,
      user: payload.data.user,
      title: payload.data.title,
      content: payload.data.content,
      tags: payload.data.tags,
      category: payload.data.category,
      articleConfirmed: true
    });
    await article.save();
  } catch (err) {
    console.error(err);
  }
}

export default createArticle;
