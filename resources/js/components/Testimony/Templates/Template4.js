import React, { Component, PropTypes } from 'react';

import {Segment, Header, Icon, Image, Accordion} from 'semantic-ui-react';
import { Gallery } from '../../Helpers/Helpers';

class Template4 extends Component {

    constructor(props) {
        super(props);

        this.state = {
            titulo:"3 Tomas guerrilleras en una semana",
            descripcion:<p><strong>Lorem Ipsum</strong> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</p>,
            activeIndex:0
        };
    }

    handleClick = (e, titleProps) => {
	    const { index } = titleProps
	    const { activeIndex } = this.state
	    const newIndex = activeIndex === index ? -1 : index

	    this.setState({ activeIndex: newIndex })
    }

    render() {
    	const {titulo, descripcion, activeIndex} = this.state;

    	const images = [
        		{
        			url:"https://www.eluniversal.com.co/sites/default/files/08ataquesdelasfarc-4coles.jpg",
        			description:"1 It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."
        		},
        		{
        			url:"https://i.ytimg.com/vi/9QhogS62Tcc/maxresdefault.jpg",
        			description:"2 It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."
        		},
        		{
        			url:"https://i.ytimg.com/vi/9QhogS62Tcc/maxresdefault.jpg",
        			description:"3 It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."
        		},
        		{
        			url:"https://www.elpais.com.co/files/article_main/uploads/2017/10/21/59eb9b3a69b47.jpeg",
        			description:"4 It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."
        		}
        	];

        return (
            <Segment basic>

                <Segment basic>
                    <Header as="h2">
                        {titulo}
                        <Header.Subheader>
                            <Icon name="male"/> Jose Luis Capote Mosquera
                        </Header.Subheader>
                        <Header.Subheader>
                            <Icon name="world"/> Toribio (Cauca)
                        </Header.Subheader>
                    </Header>
                </Segment>

				<Accordion styled fluid>
					<Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
						<Icon name='dropdown' />
						Descripción
					</Accordion.Title>
					<Accordion.Content active={activeIndex === 0}>
                        <Segment basic style={{textAlign:"justify"}}>
                            {descripcion}
                        </Segment>
					</Accordion.Content>

					<Accordion.Title active={activeIndex === 1} index={1} onClick={this.handleClick}>
						<Icon name='dropdown' />
						Galeria
					</Accordion.Title>
					<Accordion.Content active={activeIndex === 1}>
                            <Gallery images={images}/>
					</Accordion.Content>

					<Accordion.Title active={activeIndex === 2} index={2} onClick={this.handleClick}>
						<Icon name='dropdown' />
						Audio
					</Accordion.Title>
					<Accordion.Content active={activeIndex === 2}>
                        <audio src="http://developer.mozilla.org/@api/deki/files/2926/=AudioTest_(1).ogg" controls controlsList="nodownload" style={{width:"100%"}}>
                            Your browser does not support the <code>audio</code> element.
                        </audio>
					</Accordion.Content>

					<Accordion.Title active={activeIndex === 3} index={3} onClick={this.handleClick}>
						<Icon name='dropdown' />
						Video
					</Accordion.Title>
					<Accordion.Content active={activeIndex === 3}>
                        <video controls width="100%"  controlsList="nodownload">
							<source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4"/>
								Your browser does not support the video tag.
						</video>
					</Accordion.Content>
				</Accordion>
            </Segment>
        );
    }
}

export default Template4;
