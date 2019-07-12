import React, { Component, PropTypes } from 'react';

import axios from 'axios';

import { Search, Button, Segment } from 'semantic-ui-react';

class SearchServer extends Component {
    constructor(props) {
        super(props);

        this.state = {
        	results:[],
        	isLoading:false,
        	value:""
        }

        this.selectPredeterminate = this.selectPredeterminate.bind(this);
    }

    componentDidMount() {
        this.selectPredeterminate(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.selectPredeterminate(nextProps);
    }

    selectPredeterminate(props_){    	
        if("predetermined" in props_ && props_.predetermined){
        	axios({
				method:props_.method?props_.method:"post",
				url:props_.url,
				data:{search:props_.predetermined}
			})
			.then((response) => {
				this.setState({
					value:response.data[0].title,
					results:response.data
				});
			})

        }
    }

    handleResultSelect = (e, data) => {
    	this.setState({ value: data.result.title })

    	if('handleResultSelect' in this.props){
    		this.props.handleResultSelect(e, data)
    	}
    }

	handleSearchChange = (e, data) => {
		this.setState({ isLoading: true, value:data.value })

		if('handleSearchChange' in this.props){
    		this.props.handleSearchChange(e, data);
    	}
		if(this.props.url){
			var dataServer = {
				search:data.value
			};

			axios({
				method:this.props.method?this.props.method:"post",
				url:this.props.url,
				data:dataServer
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
        	<Segment basic style={{padding:"0px"}}>
        		<div className={"field "+("required" in this.props?"required":"")}>
        			
	        		{
	        			"label" in this.props?
	        			<label>
		        			{this.props.label}
		        		</label>:""
	        		}
        		
		            <Search
		            	input={{ icon: 'search', fluid: true, name:('name' in this.props)?this.props.name:""}}
		            	fluid
			            loading={isLoading}
			            onResultSelect={this.handleResultSelect}
			            onSearchChange={this.handleSearchChange}
			            results={results}
			            value={value}
			            noResultsMessage="Sin resultados."
			            size={this.props.size}
			          />
	          	</div>
          	</Segment>
        );
    }
}

export default SearchServer;
