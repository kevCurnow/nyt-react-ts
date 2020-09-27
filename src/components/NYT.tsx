import React from 'react';
import './NYT.css';
import NYTDisplay from './NYTDisplay';


let pageNumber = 0;
type NYTState = {
   searchString: string,
   begin?: string,
   end?: string,
   resultsArray: [] ,
}


class NYT extends React.Component<{}, NYTState> {
    constructor(props: {}){
        super(props);
            this.state = {
                resultsArray: [],
                searchString: '',
                begin: '',
                end: ''

            };
    }

    handleSubmit(e: any) {
        e.preventDefault();
        pageNumber = 0;
        this.fetchResults();
    }

    searchChange(s: string) {
        this.setState({
            searchString: s
        });
    }

    beginChange(b: string) {
        this.setState({
            begin: b
        });
    }

    endChange(e: string) {
        this.setState({
            end: e
        });
    }

    fetchResults = () => {
        const baseURL: string = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
        const key  = 'Dn2LanhjArgo8SDwhGkToX2S3ayoRdqh';
        let url : string =  `${baseURL}?q=${this.state.searchString}&page=${pageNumber}&api-key=${key}`;
        
        if(this.state.begin !== ''){
            url += `&begin_date=${this.state.begin}`;
        } 
        if(this.state.end !== ''){
            url += `&end_date=${this.state.end}`;
        }

        fetch(url)
        .then(response => response.json())
        .then(json => {this.setState({
            resultsArray: json.response.docs
        })
        })
        .catch(err => console.log(err));
        
    }

    changePageNumber = (e: any, direction: any) => {
        e.preventDefault();
        if(direction === 'down') {
            if(pageNumber > 0) {
                pageNumber = pageNumber - 1;
                this.fetchResults();
            }
        }

        if(direction === 'up') {
            pageNumber = pageNumber + 1;
            this.fetchResults();
        }
    };


    render(){
        return(
            <div>
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <p>
                    <label htmlFor="search">Enter a SINGLE search term (required): </label>
                    <input type="text" className="search" onChange={(e) => this.searchChange(e.target.value)} required />
                    </p>
                    <p>
                    <label htmlFor="start-date">Enter an optional state date (format YYYYMMDD): </label>
                    <input type="date" className="start-date"  onChange={(e) => this.beginChange(e.target.value)} pattern="[0-9]{8}" />
                    </p>
                    <p>
                    <label htmlFor="end-date">Enter an optional end date (format YYYYMMDD): </label>
                    <input type="date" className="end-date" onChange={(e) => this.endChange(e.target.value)} pattern="[0-9]{8}" />
                    </p>
                    <p>
                        <button className="submit">Submit Search</button>
                    </p>
                </form>
                {
                    this.state.resultsArray.length > 0 ? <NYTDisplay results = {this.state.resultsArray} pageNumber={this.changePageNumber} /> : null
                }
                
            </div>
        )
    }
}

export default NYT;