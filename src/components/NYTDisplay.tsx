import React, {FunctionComponent} from 'react';

type passedProps = {
    results: [],
    pageNumber: any,
}

const NYTDisplay: FunctionComponent<(passedProps)> = props => {
    return(
        <div>
            <div>
                <div>
                    <button onClick={(e) => props.pageNumber(e, 'down')}>Previous 10</button>
                    <button onClick={(e) => props.pageNumber(e, 'up')}>Next 10</button>
                </div>
                {props.results.map((result: any) => {
                    return (
                        <div key={result._id}>
                        <a href = {result.web_url}>
                        <h2>{result.headline.main}</h2>
                        </a>
                        {result.multimedia.length > 0 ? <img alt={result.headline.main} src={`http://nytimes.com/${result.multimedia[0].url}`} /> : 'No Images Available'}
                        <h3>
                            {result.keywords.length > 0 ? 'Keywords: ' : ''}
                        </h3>
                        <ul>
                            {result.keywords.map((keyword: any) => <li key={keyword.value}>{keyword.value}</li>)}
                        </ul>
                        </div>

                    )
                })}
            </div>
        </div>
    )
}

export default NYTDisplay;