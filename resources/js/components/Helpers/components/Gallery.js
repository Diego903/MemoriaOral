import React, { Component, PropTypes } from 'react';

import { Image, Segment, Dimmer, Icon } from 'semantic-ui-react';

class Gallery extends Component {
    constructor(props) {
        super(props);

        this.state = {
        	indexShow:0,
        	images:props.images
        };
    }

    render() {
    	const {images, indexShow} = this.state;

    	const imagesList = _.map(images, (el, i) => {
    		return <Dimmer.Dimmable
		        as={Image}
		        dimmed={false}
		        dimmer={{ active:(i == indexShow?true:false), inverted:true, content:<Icon name="image" color="violet" style={{fontSize:"3rem"}}/>}}
		        size='small'
		        src={el.url}
		        key={i}
		        onClick={() => this.setState({indexShow:i})}
		      />
    		return <Dimmer active key={i} className="cursor_pointer">
    				<Image src={el.url} onClick={() => this.setState({indexShow:i})}/>
    			</Dimmer>
    	})
        return (
        	<div>
	        	<p>{images[indexShow].description}</p>
				<Image src={images[indexShow].url} fluid/>            

				<Segment basic textAlign="center">
					<Image.Group size="small" className="margin-top-10">
						{imagesList}
					</Image.Group>
				</Segment>
			</div>
        );
    }
}

export default Gallery;
