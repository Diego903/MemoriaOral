import React, { Component } from 'react';

import { connect } from 'react-redux';
import store from '../../redux/store';

import { Header, Container, Segment, Grid, Button, Card, Icon, Image } from 'semantic-ui-react';
import Slider from 'react-animated-slider';

class Home extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
        };
    }

    componentWillMount() {
        
    } 

    render()
    {
        return (
            <Segment basic style={{padding:"0px", marginTop:"-30px"}}>
                <Slider autoplay={10000}>
                    <div className="slider-content" style={{ background: "url('https://cdn.wallpapersafari.com/47/2/yU7WfC.jpg') no-repeat center center" }}>
                        <div className="inner">
                            <Segment textAlign="center" basic>
                                <Header as="h1" inverted>Why do we use it?</Header>
                                <Header as="p" inverted>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</Header>
                            </Segment>
                        </div>
                    </div>
                    <div className="slider-content" style={{ background: "url('http://2.bp.blogspot.com/-siboHA31a8E/VjTayM-0Z8I/AAAAAAAABG8/-OKpzhXh7Oo/s1600/Centro_Historico_Popayan_03.JPG') no-repeat center center" }}>
                        <div className="inner">
                            <Segment textAlign="center" basic vertical={true}>
                                <Header as="h1" inverted>What is Lorem Ipsum?</Header>
                                <Header as="p" inverted>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Header>
                            </Segment>
                        </div>
                    </div>
                    <div className="slider-content" style={{ background: "url('https://static.wixstatic.com/media/39814d_eaefe2380d384d3f9b58af7cecc3336c~mv2.jpg') no-repeat center center" }}>
                        <div className="inner">
                            <Segment textAlign="center" basic vertical={true}>
                                <Header as="h1" inverted>Where does it come from?</Header>
                                <Header as="p" inverted>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.</Header>
                            </Segment>
                        </div>
                    </div>
                </Slider>

                <Container style={{marginTop:"2rem"}}>
                    <Header>Inicio del sistema</Header>
                    <Grid>
                        <Grid.Column computer={12} tablet={10} mobile={16}>
                            <p>
                              Te eum doming eirmod, nominati pertinacia argumentum ad his. Ex eam alia facete scriptorem,
                              est autem aliquip detraxit at. Usu ocurreret referrentur at, cu epicurei appellantur vix. Cum
                              ea laoreet recteque electram, eos choro alterum definiebas in. Vim dolorum definiebas an. Mei
                              ex natum rebum iisque.
                            </p>
                            <p>
                              Audiam quaerendum eu sea, pro omittam definiebas ex. Te est latine definitiones. Quot wisi
                              nulla ex duo. Vis sint solet expetenda ne, his te phaedrum referrentur consectetuer. Id vix
                              fabulas oporteat, ei quo vide phaedrum, vim vivendum maiestatis in.
                            </p>
                            <p>
                              Eu quo homero blandit intellegebat. Incorrupte consequuntur mei id. Mei ut facer dolores
                              adolescens, no illum aperiri quo, usu odio brute at. Qui te porro electram, ea dico facete
                              utroque quo. Populo quodsi te eam, wisi everti eos ex, eum elitr altera utamur at. Quodsi
                              convenire mnesarchum eu per, quas minimum postulant per id.
                            </p>
                            <p>
                              Audiam quaerendum eu sea, pro omittam definiebas ex. Te est latine definitiones. Quot wisi
                              nulla ex duo. Vis sint solet expetenda ne, his te phaedrum referrentur consectetuer. Id vix
                              fabulas oporteat, ei quo vide phaedrum, vim vivendum maiestatis in.
                            </p>
                            <p>
                              Eu quo homero blandit intellegebat. Incorrupte consequuntur mei id. Mei ut facer dolores
                              adolescens, no illum aperiri quo, usu odio brute at. Qui te porro electram, ea dico facete
                              utroque quo. Populo quodsi te eam, wisi everti eos ex, eum elitr altera utamur at. Quodsi
                              convenire mnesarchum eu per, quas minimum postulant per id.
                            </p>
                        </Grid.Column>
                        <Grid.Column computer={4} tablet={6} mobile={16}>
                            <Image src="data:image/jpeg;base64,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"/>
                            <Image src="data:image/jpeg;base64,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"/>
                        </Grid.Column>
                    </Grid>

                    <Grid>
                        <Grid.Column computer={4} tablet={8} mobile={16}>
                            <Card
                                centered
                                fluid
                                image='https://i.pinimg.com/originals/3b/ae/bc/3baebc6a262f662f2624409085a51336.jpg'
                                header='Elliot Baker'
                                meta='Friend'
                                description='Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat.'
                                extra={<a>
                                        <Icon name='user' />
                                        16 Friends
                                      </a>}
                              />
                        </Grid.Column>
                        <Grid.Column computer={4} tablet={8} mobile={16}>
                            <Card
                                centered
                                fluid
                                image='https://i.pinimg.com/originals/3b/ae/bc/3baebc6a262f662f2624409085a51336.jpg'
                                header='Elliot Baker'
                                meta='Friend'
                                description='Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat.'
                                extra={<a>
                                        <Icon name='user' />
                                        16 Friends
                                      </a>}
                              />
                        </Grid.Column>
                        <Grid.Column computer={4} tablet={8} mobile={16}>
                            <Card
                                centered
                                fluid
                                image='https://i.pinimg.com/originals/3b/ae/bc/3baebc6a262f662f2624409085a51336.jpg'
                                header='Elliot Baker'
                                meta='Friend'
                                description='Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat.'
                                extra={<a>
                                        <Icon name='user' />
                                        16 Friends
                                      </a>}
                              />
                        </Grid.Column>
                        <Grid.Column computer={4} tablet={8} mobile={16}>
                            <Card
                                centered
                                fluid
                                image='https://i.pinimg.com/originals/3b/ae/bc/3baebc6a262f662f2624409085a51336.jpg'
                                header='Elliot Baker'
                                meta='Friend'
                                description='Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat.'
                                extra={<a>
                                        <Icon name='user' />
                                        16 Friends
                                      </a>}
                              />
                        </Grid.Column>
                        <Grid.Column computer={4} tablet={8} mobile={16}>
                            <Card
                                centered
                                fluid
                                image='https://i.pinimg.com/originals/3b/ae/bc/3baebc6a262f662f2624409085a51336.jpg'
                                header='Elliot Baker'
                                meta='Friend'
                                description='Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat.'
                                extra={<a>
                                        <Icon name='user' />
                                        16 Friends
                                      </a>}
                              />
                        </Grid.Column>
                    </Grid>
                </Container>
            </Segment>
        );
    }
}


const mapStateToProps = state => {
    return {
        
    }
}

const mapDispatchToProps = dispatch => {
    return {
        
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);
