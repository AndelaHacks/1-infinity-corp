package main

import (
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"time"
	"flag"
)

// type result struct {
// 	Status       string    `json:"status"`
// 	TotalResults int       `json:"totalResults"`
// 	Articles     []article `json:"articles,omitempty"`
// }

// // source of the news
// type source struct {
// 	ID   string `json:"id"`
// 	Name string `json:"name"`
// }

// // News holder
// type article struct {
// 	//Source      source `json:"source,omitempty"`
// 	Author      string `json:"author,omitempty"`
// 	Title       string `json:"title,omitempty"`
// 	Description string `json:"description,omitempty"`
// 	//URL         string `json:"url,omitempty"`
// 	//URLToImage  string `json:"urlToImage,omitempty"`
// 	//PublishedAt string `json:"publishedAt,omitempty"`
// 	Content     string `json:"content,omitempty"`
// }

const (
	apiEndpoint1 string = "https://newsapi.org/v2/everything" // sources
	apiEndpoint2 string = "https://newsapi.org/v2/top-headlines"
	apiEndpoint3 string = "https://newsapi.org/v2/sources"
	apiKey       string = "87d5495100204ee0af02b65139095e09"
)

var client = &http.Client{Timeout: 15 * time.Second}

func getInput() []string {
	flag.Parse()
	return flag.Args()
}



func checkError(err error) {
	if err != nil {
		log.Fatal(err)
		panic(err)
	}
}

var cPath string = "/mnt/c/Users/0x6f736f646f/Desktop/"

func getData() ([][]byte) {
	var b [][]byte
	log.SetFlags(log.Lshortfile)
	arguments := getInput()
	for _, topic := range arguments {
		req, err := http.NewRequest("GET", apiEndpoint1, nil)
		req.Header.Add("Accept", "application/json")
		checkError(err)
		q := req.URL.Query()
		q.Add("apiKey", apiKey)
		q.Add("sortBy", "publishedAt")
		q.Add("sources", topic)
		q.Add("language", "en")
		//q.Add("from", "2018-11-07")
		//q.Add("to", "2018-11-08")
		req.URL.RawQuery = q.Encode()
		log.Print("Url ", req.URL.RawQuery)
		resp, err := client.Do(req)
		if err != nil {
			return nil
		}
		defer resp.Body.Close()
		a, _ := ioutil.ReadAll(resp.Body)
		if err != nil {
			log.Print("here")
			return nil
		}
		b = append(b, a)
	}
	return b
}


func toFile(b [][]byte){
	var i int
	i = 1
	for _, val := range b{
		f, err := os.OpenFile("message" + string(i) + ".json", os.O_APPEND|os.O_CREATE|os.O_RDWR, 0666)
		if err != nil {
			log.Fatal(err)
		}
		defer f.Close()
		f.Write(val)
		i++
	}
}

func main() {
	b := getData()
	toFile(b)
}