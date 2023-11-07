import React, { Component } from 'react'
import NewsItem from './NewsItem'


export class News extends Component {
    
    constructor(){
        super()
        console.log("Hello I am a constructor form news component")

        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
    }

    async componentDidMount(){
        console.log("cdm")
        let url = "https://newsapi.org/v2/top-headlines?country=in&apikey=a985b92d3c0045749b33f444df0b3765&page=1&pageSize=20";
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults})
    }

    handlePrevClick = async ()=>{
        let url = `https://newsapi.org/v2/top-headlines?country=in&apikey=a985b92d3c0045749b33f444df0b3765&page=${this.state.page - 1}&pageSize=20`;
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
         
        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles
        })
    }

    handleNextClick = async ()=>{
        alert(this.state.page +1)
        alert(this.state.totalResults)
        alert(Math.ceil(this.state.totalResults/20))
        if(this.state.page + 1 >  Math.ceil(this.state.totalResults/20)){

        }
        else {
            let url = `https://newsapi.org/v2/top-headlines?country=in&apikey=a985b92d3c0045749b33f444df0b3765&page=${this.state.page + 1}&pageSize=20`;
            let data = await fetch(url);
            let parsedData = await data.json();
            console.log(parsedData);
            
            this.setState({
                page: this.state.page + 1,
                articles: parsedData.articles
        })
    }
    }

  render() {
    return (
      <div className='container my-3'>
        <h1>News Monkey - Top Headlines</h1>
        <div className='row'>
        {this.state.articles.map((element)=>{
            return <div className="col-md-4" key={element.url}>
            <NewsItem title={element.title?element.title:""} description= {element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url}/>        
           </div>
        })}
        </div>
        <div className='container d-flex justify-content-between'>
            <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
            <button type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News
