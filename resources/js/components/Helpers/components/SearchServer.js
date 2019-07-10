import React, { Component, PropTypes } from 'react';

import axios from 'axios';

import { Search, Button } from 'semantic-ui-react';

class SearchServer extends Component {
    constructor(props) {
        super(props);

        this.state = {
        	results:[],
        	isLoading:false,
        	value:""
        }
    }

    handleResultSelect = (e, data) => {
    	this.setState({ value: data.result.title })

    	if('handleResultSelect' in this.props){
    		this.props.handleResultSelect(e, data)
    	}
    }

	handleSearchChange = (e, { value }) => {
		this.setState({ isLoading: true, value })

		if(this.props.url){
			var data = {
				search:value
			};

			axios({
				method:this.props.method?this.props.method:"post",
				url:this.props.url,
				data
			})
			.then((response) => {
				this.setState({
					isLoading:false,
					results:response.data
				})
			})
		}
	}

    render() {
    	const {results, isLoading, value} = this.state;
        return (
            <Search
            	input={{ icon: 'search', fluid: true }}
            	fluid
	            loading={isLoading}
	            onResultSelect={this.handleResultSelect}
	            onSearchChange={this.handleSearchChange}
	            results={results}
	            value={value}
	            noResultsMessage="Sin resultados."
	            size={this.props.size}
	          />
        );
    }
}

export default SearchServer;
