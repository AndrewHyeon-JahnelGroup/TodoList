import React from "react";
import App, { Container as NextContainer } from "next/app";
import Head from "next/head";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import Navbar from "../components/Navbar";

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    if (ctx.req && ctx.req.session.passport) {
      pageProps.user = ctx.req.session.passport.user;
    }

    return { pageProps };
  }

  constructor(props) {
    super(props);

    // fetch('/user/lists')

    this.state = {
      user: props.pageProps.user,
      tasklists: []
    };
  }

  render() {
    const { Component, pageProps } = this.props;

    const props = {
      ...pageProps,
      user: this.state.user,
    };

    const style = {
      marginTop: '50px',
      backgroundColor: '#D5CAFA',
      WebkitBoxShadow: 'inset 3px 3px 5px 5px rgba(0,0,0,0.75)',
      MozBoxShadow: 'inset 3px 3px 5px 5px rgba(0,0,0,0.75)',
      boxShadow: 'inset 3px 3px 5px 5px rgba(0,0,0,0.75)',
    }

    return (
      <NextContainer>
        <Head>
          <title>Todo List</title>
        </Head>
        <Container>
          <Jumbotron style={style}>
            <Component {...props} />
          </Jumbotron>
        </Container>
      </NextContainer>
    );
  }
}

export default MyApp;
