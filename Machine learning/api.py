from flask import Flask
import sentiments as s
from smtplib import SMTP
from email.message import EmailMessage
import webhoseio
import json, pickle
from newsapi import NewsApiClient


open_file = open("Pickled/email.pickle", "rb")
email = pickle.load(open_file)
open_file.close()

open_file = open("Pickled/password.pickle", "rb")
password = pickle.load(open_file)
print(password)
open_file.close()

api = Flask(__name__)

def sendMail():
	msg = EmailMessage()
	msg.set_content("We are live! Tena!!!")
	addr = ["pancakesdeath@protonmail.com", "shalom.nyende@gmail.com", "alphanganga@gmail.com", "ndemokelvinonkundi@gmail.com"]
	msg["To"] = addr
	msg["Subject"] = "Fake News"
	msg["From"] = email
	s = SMTP("smtp.gmail.com", port=25)
	s.starttls()
	s.login(user=email, password=password)
	s.send_message(msg, to_addrs=addr)
	s.quit()


@api.route("/")
def index():
	return json.dumps({
		"message": "Success"
		})

@api.route("/data/<message>/<tags>", methods=["GET", "PUT"])
def data(message, tags):
	a = s.sentiment(str(message))
	if a[0] == 1:
		sendMail()
		return json.dumps({
			"message": "Validity not confirmed. We've notified our validators to check further."
			})
	else:
		return json.dumps({
			"message": "Valid News",
			"urls": getRelation(tags)
			})


def getRelation(topic):
	urls = []
	for i in topic:
		newsapi = NewsApiClient(api_key="87d5495100204ee0af02b65139095e09")
		top_headlines = newsapi.get_top_headlines(q=i,
                                          sources='bbc-news,the-verge',
                                          language='en')
		urls.append(top_headlines["urls"])
	return urls

	    
# 	# Get the next batch of posts

# 	    output = webhoseio.get_next()

	    
# 	# Print the site of the first post

# 	    print output['posts'][0]['thread']['site']

if __name__ == '__main__':
	api.run()