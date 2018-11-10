import createArticle from "./createarticle";
import reviewArticle from "./reviewarticle";

const account = process.env.EOSIO_CONTRACT_ACCOUNT;

export default [
  {
    actionType: `${account}::newarticle`, // account::action name
    updater: createArticle
  },
  {
    actionType: `${account}::review`,
    updater: reviewArticle
  }
];
