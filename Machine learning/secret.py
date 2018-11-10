import pickle

save_ckey = open("Pickled/ckey.pickle", "wb")
pickle.dump(ckey, save_ckey)
save_ckey.close()

save_csecret = open("Pickled/csecret.pickle", "wb")
pickle.dump(csecret, save_csecret)
save_csecret.close()

save_atoken = open("Pickled/atoken.pickle", "wb")
pickle.dump(ckey, save_atoken)
save_atoken.close()

save_asecret = open("Pickled/asecret.pickle", "wb")
pickle.dump(asecret, save_asecret)
save_asecret.close()
