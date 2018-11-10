
#--------------------------------------------------------------
# Include Libraries
#--------------------------------------------------------------
import random, nltk, pickle, itertools
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

from nltk.tokenize import word_tokenize

from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.feature_extraction.text import TfidfVectorizer, TfidfTransformer
from sklearn import metrics
from sklearn.feature_selection import SelectKBest, chi2
from sklearn.cross_validation import cross_val_score
from sklearn.pipeline import Pipeline

from nltk.classify.scikitlearn import SklearnClassifier
from sklearn.naive_bayes import MultinomialNB, GaussianNB, BernoulliNB
from sklearn.linear_model import LogisticRegression, SGDClassifier, PassiveAggressiveClassifier
from sklearn.svm import SVC, LinearSVC, NuSVC
from nltk.classify import ClassifierI
from scipy.stats import mode
from statistics import mean
#--------------------------------------------------------------
# Importing dataset using pandas dataframe
#--------------------------------------------------------------
train_df = pd.read_csv("train.csv")
test_df = pd.read_csv("test.csv")

train_df.set_index("id", inplace=True)
test_df.set_index("id", inplace=True)

for col in train_df.columns:
    train_df.dropna(axis=0, subset=[col], inplace=True)

for col in test_df.columns:
    test_df.dropna(axis=0, subset=[col], inplace=True)

y = train_df.label
train_df = train_df.drop('label', axis=1)
train_df.shape


train_df['title'] = train_df['title'].apply(lambda x: " ".join(x.lower() for x in x.split()))
#train_df["title"] = train_df.title.str.lower()
train_df['author'] = train_df['author'].apply(lambda x: " ".join(x.lower() for x in x.split()))
#train_df["author"] = train_df.author.str.lower()
train_df['text'] = train_df['text'].apply(lambda x: " ".join(x.lower() for x in x.split()))
#train_df["text"] = train_df.text.str.lower()

test_df['title'] = test_df['title'].apply(lambda x: " ".join(x.lower() for x in x.split()))
#test_df["title"] = test_df.title.str.lower()
test_df['author'] = test_df['author'].apply(lambda x: " ".join(x.lower() for x in x.split()))
#test_df["author"] = test_df.author.str.lower()
test_df['text'] = test_df['text'].apply(lambda x: " ".join(x.lower() for x in x.split()))
#test_df["text"] = test_df.text.str.lower()
save_train = open("Pickled/train.pickle", "wb")
pickle.dump(train_df, save_train)
save_train.close()

save_test = open("Pickled/test.pickle", "wb")
pickle.dump(test_df, save_test)
save_test.close()

save_y = open("Pickled/y.pickle", "wb")
pickle.dump(y, save_y)
save_y.close()

X_train, X_test, y_train, y_test = train_test_split(train_df['text'], y, test_size=0.33, random_state=53)

tfidf_vect = TfidfVectorizer()
tfidf_train = tfidf_vect.fit_transform(X_train)
tfidf_test = tfidf_vect.transform(X_test)

class VoteClassifier(ClassifierI):
    #docstring for VoteClassifier
    def __init__(self, *classifiers):
        self._classifiers = classifiers
    
    def classify(self, features):
        votes =[]
        for c in self._classifiers:
            v = c.predict(features)
            votes.append(v)
        return str(mode(votes)[0])

    def confidence(self, features):
        votes =[]
        for c in self._classifiers:
            v = c.predict(features)
            votes.append(v)
        choice_votes = int(mode(votes)[1])
        conf = choice_votes / len(votes)
        return conf
    def test_accuracy(self, x2,x3,x4,x5,x6):
        average = mean([x2,x3,x4,x5,x6])
        return average

BNB = BernoulliNB()
BNB.fit(tfidf_train, y_train)
pred = BNB.predict(tfidf_test)
score = metrics.accuracy_score(y_test, pred)
x2 = metrics.accuracy_score(y_test, pred)
print("BernoulliNB Naive Bayes Accuracy:   %0.3f" % score)
#cm = metrics.confusion_matrix(y_test, pred, labels=[0,1])
#plot_confusion_matrix(cm, classes=[0, 1])

save_classifier = open("Pickled/BernoulliNB.pickle", "wb")
pickle.dump(BNB, save_classifier)
save_classifier.close()

LR = LogisticRegression()
LR.fit(tfidf_train, y_train)
pred = LR.predict(tfidf_test)
score = metrics.accuracy_score(y_test, pred)
x3 = metrics.accuracy_score(y_test, pred)
print("LogisticRegression Accuracy:   %0.3f" % score)
#cm = metrics.confusion_matrix(y_test, pred, labels=[0,1])
#plot_confusion_matrix(cm, classes=[0, 1])

save_classifier = open("Pickled/LogisticRegression.pickle", "wb")
pickle.dump(LR, save_classifier)
save_classifier.close()

SGD_1 = SGDClassifier()
SGD_1.fit(tfidf_train, y_train)
pred = SGD_1.predict(tfidf_test)
score = metrics.accuracy_score(y_test, pred)
x4 = metrics.accuracy_score(y_test, pred)
print("SGDClassifier Accuracy:   %0.3f" % score)
#cm = metrics.confusion_matrix(y_test, pred, labels=[0,1])
#plot_confusion_matrix(cm, classes=[0, 1])

save_classifier = open("Pickled/SGDClassifier.pickle", "wb")
pickle.dump(SGD_1, save_classifier)
save_classifier.close()

SVC_1 = SVC()
SVC_1.fit(tfidf_train, y_train)
pred = SGD_1.predict(tfidf_test)
score = metrics.accuracy_score(y_test, pred)
x5 = metrics.accuracy_score(y_test, pred)
print("Support Vector Clustering Accuracy:   %0.3f" % score)
#cm = metrics.confusion_matrix(y_test, pred, labels=[0,1])
#plot_confusion_matrix(cm, classes=[0, 1])

save_classifier = open("Pickled/SVC.pickle", "wb")
pickle.dump(SVC_1, save_classifier)
save_classifier.close()

LSVC_1 = LinearSVC()
LSVC_1.fit(tfidf_train, y_train)
pred = LSVC_1.predict(tfidf_test)
score = metrics.accuracy_score(y_test, pred)
x6 = metrics.accuracy_score(y_test, pred)
print("Linear Support Vector Clustering Accuracy:   %0.3f" % score)
#cm = metrics.confusion_matrix(y_test, pred, labels=[0,1])
#plot_confusion_matrix(cm, classes=[0, 1])

save_classifier = open("Pickled/LinearSVC.pickle", "wb")
pickle.dump(LSVC_1, save_classifier)
save_classifier.close()

voted_classifier = VoteClassifier(BNB, LR, SGD_1, SVC_1, LSVC_1)

print("Voted classifier accuracy percent: ", voted_classifier.test_accuracy(x2,x3,x4,x5,x6))
