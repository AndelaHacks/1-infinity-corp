"""
import sentiments as s
from tweepy import Stream
from tweepy import OAuthHandler
from tweepy.streaming import StreamListener
import json, pickle
from http.client import IncompleteRead

#consumer key, consumer secret, access token, access secret.
open_file = open("Pickled/ckey.pickle", "rb")
ckey = pickle.load(open_file)
open_file.close()

open_file = open("Pickled/csecret.pickle", "rb")
csecret = pickle.load(open_file)
open_file.close()

open_file = open("Pickled/atoken.pickle", "rb")
atoken = pickle.load(open_file)
open_file.close()

open_file = open("Pickled/asecret.pickle", "rb")
asecret = pickle.load(open_file)
open_file.close()

class listener(StreamListener):

    def on_data(self, data):
        try:
            all_data = json.loads(data)
            
            tweet = all_data["text"]
            #sentiment_value , confidence = 
            s.sentiment([tweet.lower()])

            print(tweet, sentiment_value, confidence)
            #if confidence*100 >= 80:
            #output = open("twitter-out.txt", "a")
            #output.write(sentiment_value)
            #output.write("\n")
            #output.close()  

            return True
        except:
            return True

    def on_error(self, status):
        print (status)

auth = OAuthHandler(ckey, csecret)
auth.set_access_token(atoken, asecret)

#twitterStream = Stream(auth, listener())
#twitterStream.filter(track=["Trump"])

while True:
    try:
        # Connect/reconnect the stream
        twitterStream = Stream(auth, listener())
        # DON'T run this approach async or you'll just create a ton of streams!
        twitterStream.filter(track=["Trump"])
    except IncompleteRead:
        # Oh well, reconnect and keep trucking
        continue
    except KeyboardInterrupt:
        # Or however you want to exit this loop
        twitterStream.disconnect()
        break
"""
#Import the necessary methods from tweepy library
from tweepy.streaming import StreamListener
from tweepy import OAuthHandler
from tweepy import Stream
import sentiments as s
import json, pickle
from http.client import IncompleteRead

#consumer key, consumer secret, access token, access secret.
open_file = open("Pickled/ckey.pickle", "rb")
ckey = pickle.load(open_file)
open_file.close()

open_file = open("Pickled/csecret.pickle", "rb")
csecret = pickle.load(open_file)
open_file.close()

open_file = open("Pickled/atoken.pickle", "rb")
atoken = pickle.load(open_file)
open_file.close()

open_file = open("Pickled/asecret.pickle", "rb")
asecret = pickle.load(open_file)
open_file.close()


#This is a basic listener that just prints received tweets to stdout.
class StdOutListener(StreamListener):

    def on_data(self, data):
        print(data)
        return True

    def on_error(self, status):
        print(status)


if __name__ == '__main__':

    #This handles Twitter authetification and the connection to Twitter Streaming API
    l = StdOutListener()
    auth = OAuthHandler(ckey, csecret)
    auth.set_access_token(atoken, asecret)
    stream = Stream(auth, l)

    #This line filter Twitter Streams to capture data by the keywords: 'python', 'javascript', 'ruby'
    stream.filter(track=['python', 'javascript', 'ruby'])