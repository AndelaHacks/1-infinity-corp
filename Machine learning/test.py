import pickle

save_email = open("Pickled/email.pickle", "wb")
pickle.dump(email, save_email)
save_email.close()

save_password = open("Pickled/password.pickle", "wb")
pickle.dump(password, save_password)
save_password.close()
