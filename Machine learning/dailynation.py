import requests
from bs4 import BeautifulSoup as bs
import json

BASEURL = "https://mobile.nation.co.ke/"

urls = []


def get_urls():
    tag = "h"
    r = requests.get(BASEURL)
    data = r.text
    soup = bs(data, "html.parser")
    i = 1
    while i < 7:
        for it in soup.find_all('a'):
            if it.parent.name == tag + str(i):
                urls.append(it["href"])
        i += 1
    # print(urls)


get_urls()
news = []
def getData():
    for i in urls:
        r = requests.get(BASEURL + i)
        data = r.text
        soup = bs(data, "html.parser")
        jambo = ""
        for it in soup.find_all("p", {"MsoNormal"}):
            jambo += str(it)
        if jambo is not "":
            jambo = jambo.replace('<p class="MsoNormal">', "")
            jambo = jambo.replace("<p>", "")
            jambo = jambo.replace("</p>", "")
            jambo = jambo.replace("<strong>", "")
            jambo = jambo.replace("</strong>", "")
            jambo = jambo.replace("<span>", "")
            jambo = jambo.replace("</span>", "")
            jambo = jambo.replace("<em>", "")
            jambo = jambo.replace("</em", "")
            jambo = jambo.replace('<figure>\n<img alt="" src="/image/view/-/4843546/medRes/2164854/-/crahwc/-/buf1.jpg" width="100%"/>\n<figcaption>\n<div><span>', "")

            j = {
                "content": jambo,
            }
        news.append(j)
    return news



data = getData()
dat = json.dumps(data)

with open("dailynation.json", "w") as f:
    f.write(str(dat))
    f.close()
