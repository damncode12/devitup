#Collects a list of all external URLs found on the site
from urllib.error import HTTPError, URLError
from urllib.request import urlopen

from bs4 import BeautifulSoup

from orielly_website_crawler import getInternalLinks, splitAddress, getExternalLinks

allExtLinks = set()
allIntLinks = set()


def getAllExternalLinks(siteUrl):
    try:
        if not siteUrl:
            return

        # Check if the URL is valid (not empty or '/')
        if siteUrl.strip() == '/':
            return
        html = urlopen(siteUrl)
        bsObj = BeautifulSoup(html, features="lxml")
        internalLinks = getInternalLinks(bsObj, splitAddress(siteUrl)[0])
        externalLinks = getExternalLinks(bsObj, splitAddress(siteUrl)[0])
        for link in externalLinks:
            if link not in allExtLinks:
                allExtLinks.add(link)
                print(link)
        for link in internalLinks:
            if link not in allIntLinks:
                print("About to get link: " + link)
                allIntLinks.add(link)
                getAllExternalLinks(link)
    except (HTTPError, URLError, ValueError) as e:
        print("Error: " + str(e))


getAllExternalLinks("http://oreilly.com")