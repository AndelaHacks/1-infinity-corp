import requests
import json
from bs4 import BeautifulSoup

urls = []

def getUrls():
    i = 1
    while i < 1000:
        r = requests.get("http://www.mediamaxnetwork.co.ke/news/national/page/"+str(i))
        data = r.text
        soup = BeautifulSoup(data, "html.parser")
        for it in soup.find_all('a', {'more-link'}):
            urls.append(it["href"])
        i += 1
            
getUrls()

def getData():
    news = []
    for url in urls:
        r = requests.get(url)
        data = r.text
        soup = BeautifulSoup(data, "html.parser")
        jambo = ""
        for it in soup.find_all("p", ["p3"]):
            jambo += str(it)
        if jambo is not "":
            jambo = jambo.replace("<i>", "")
            jambo = jambo.replace("</i>", "")
            jambo = jambo.replace("<span>", "")
            jambo = jambo.replace("<b>", "")
            jambo = jambo.replace("</b>", "")
            jambo = jambo.replace('<span class="s1>"', "")
            jambo = jambo.replace('<span class="s2>"', "")
            jambo = jambo.replace('<span class="s3>"', "")
            jambo = jambo.replace('<span class="s4>"', "")
            jambo = jambo.replace('<span class="s5>"', "")
            jambo = jambo.replace('<span class="s6>"', "")
            jambo = jambo.replace("</span>", "")
            jambo = jambo.replace('<span class="s4">', "")
            jambo = jambo.replace('<p class="p3">', "")
            jambo = jambo.replace('<span class="Apple-converted-space">', "")
            jambo = jambo.replace("<p>", "")
            jambo = jambo.replace("</p>", "")
            j = {
                "content": jambo
            }
            news.append(j)
    return news

data = getData()
dat = json.dumps(data)

with open("kenya.json", "w") as f:
    f.write(str(dat))
    f.close()
