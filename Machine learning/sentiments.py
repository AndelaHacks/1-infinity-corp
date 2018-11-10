
#--------------------------------------------------------------
# Include Libraries
#--------------------------------------------------------------
import random, nltk, pickle, itertools
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

from nltk.tokenize import word_tokenize

from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.feature_extraction.text import TfidfVectorizer, TfidfTransformer, CountVectorizer
from sklearn import metrics
from sklearn.feature_selection import SelectKBest, chi2
from sklearn.cross_validation import cross_val_score
from sklearn.pipeline import Pipeline

from sklearn.neighbors import KNeighborsClassifier
from nltk.classify.scikitlearn import SklearnClassifier
from sklearn.naive_bayes import MultinomialNB, GaussianNB, BernoulliNB
from sklearn.linear_model import LogisticRegression, SGDClassifier, PassiveAggressiveClassifier
from sklearn.svm import SVC, LinearSVC, NuSVC
from nltk.classify import ClassifierI
from scipy.stats import mode
from statistics import mean

class VoteClassifier(ClassifierI):
    """docstring for VoteClassifier"""
    def __init__(self, *classifiers):
        self._classifiers = classifiers
    
    def classify(self, features):
        votes =[]
        for c in self._classifiers:
            v = c.predict(features)
            votes.append(v)
        return int(mode(votes)[0])

    def confidence(self, features):
        votes =[]
        for c in self._classifiers:
            v = c.predict(features)
            votes.append(v)
        choice_votes = int(mode(votes)[1])
        conf = choice_votes / len(votes)
        return conf
    #def test_accuracy(x2,x3,x4,x5,x6):
    #    average = mean([x2,x3,x4,x5,x6])
    #    return average

open_file = open("Pickled/train.pickle", "rb")
train_df = pickle.load(open_file)
open_file.close()

open_file = open("Pickled/test.pickle", "rb")
test_df = pickle.load(open_file)
open_file.close()

open_file = open("Pickled/y.pickle", "rb")
y = pickle.load(open_file)
open_file.close()

X_train, X_test, y_train, y_test = train_test_split(train_df['Content'], y, test_size=0.33, random_state=53)

tfidf_vect = TfidfVectorizer(stop_words="english")
tfidf_train = tfidf_vect.fit_transform(X_train)
tfidf_test = tfidf_vect.transform(X_test)

open_file = open("Pickled/BernoulliNB.pickle", "rb")
BNB = pickle.load(open_file)
#pred = BNB.predict(tfidf_test)
#x2 = metrics.accuracy_score(y_test, pred)
open_file.close()

open_file = open("Pickled/LogisticRegression.pickle", "rb")
LR = pickle.load(open_file)
#pred = LR.predict(tfidf_test)
#x3 = metrics.accuracy_score(y_test, pred)
open_file.close()

open_file = open("Pickled/SGDClassifier.pickle", "rb")
SGD_1 = pickle.load(open_file)
#pred = SGD_1.predict(tfidf_test)
#x4 = metrics.accuracy_score(y_test, pred)
open_file.close()

open_file = open("Pickled/LinearSVC.pickle", "rb")
LSVC_1 = pickle.load(open_file)
#pred = LSVC_1.predict(tfidf_test)
#x5 = metrics.accuracy_score(y_test, pred)
open_file.close()

open_file = open("Pickled/SVC.pickle", "rb")
SVC_1 = pickle.load(open_file)
#pred = SVC_1.predict(tfidf_test)
#x6 = metrics.accuracy_score(y_test, pred)
open_file.close()

open_file = open("Pickled/KNeighborsClassifier.pickle", "rb")
neigh = pickle.load(open_file)
open_file.close()


voted_classifier = VoteClassifier(BNB, LR, SGD_1, SVC_1, LSVC_1, neigh)
def sentiment(text):
    new_vect = tfidf_vect.transform([text.lower()])

    return voted_classifier.classify(new_vect), voted_classifier.confidence(new_vect)