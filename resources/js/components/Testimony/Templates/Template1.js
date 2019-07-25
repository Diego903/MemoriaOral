import React, { Component, PropTypes } from 'react';

import {Segment, Header, Icon, Card, Image} from 'semantic-ui-react';

class Template1 extends Component {

    constructor(props) {
        super(props);

        this.state = {
            titulo:"3 Tomas guerrilleras en una semana",
            descripcion:<p><strong>Lorem Ipsum</strong> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</p>,
        };
    }

    render() {
    	const {titulo, descripcion} = this.state;
        return (
            <Segment basic>
            	<Segment basic>
	            	<Header as="h2" dividing>
	            		{titulo}
	            		<Header.Subheader>
	            			<Icon name="male"/> Jose Luis Capote Mosquera
	            		</Header.Subheader>
	            		<Header.Subheader>
	            			<Icon name="world"/> Toribio (Cauca)
	            		</Header.Subheader>
	            	</Header>
            	</Segment>

				<Segment basic className="justify">
					{descripcion}
				</Segment>

        		<Segment basic textAlign="center">
        			<Card.Group centered>
						<Card>
							<Image src='https://verdadabierta.com/wp-content/uploads/2017/10/toribio-5.jpg' wrapped ui={false} />
							<Card.Content>
								<Card.Header>Escuela Juan Ernesto Silva - Toribio</Card.Header>
								<Card.Meta>
									<span className='date'>Junio 12 de 2006</span>
								</Card.Meta>
								<Card.Description>
									It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
								</Card.Description>
							</Card.Content>
						</Card>
						<Card>
							<Image src='https://verdadabierta.com/wp-content/uploads/2017/10/toribio-5.jpg' wrapped ui={false} />
							<Card.Content>
								<Card.Header>Escuela Juan Ernesto Silva - Toribio</Card.Header>
								<Card.Meta>
									<span className='date'>Junio 12 de 2006</span>
								</Card.Meta>
								<Card.Description>
									It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
								</Card.Description>
							</Card.Content>
						</Card>
						<Card>
							<Image src='https://i.ytimg.com/vi/9QhogS62Tcc/maxresdefault.jpg' wrapped ui={false} />
							<Card.Content>
								<Card.Header>Escuela Juan Ernesto Silva - Toribio</Card.Header>
								<Card.Meta>
									<span className='date'>Junio 12 de 2006</span>
								</Card.Meta>
								<Card.Description>
									It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
								</Card.Description>
							</Card.Content>
						</Card>
					</Card.Group>
					<Segment basic>
						<Header as="h3">Audio del testimonio</Header>
						<audio src="http://developer.mozilla.org/@api/deki/files/2926/=AudioTest_(1).ogg" controls controlsList="nodownload" style={{width:"80%"}}>
						  Your browser does not support the <code>audio</code> element.
						</audio>
					</Segment>
					<video controls width="100%"  controlsList="nodownload">
						<source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4"/>
							Your browser does not support the video tag.
					</video>
				</Segment>

            </Segment>
        );
    }
}

export default Template1;
