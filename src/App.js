import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Navbar, Sidebar, Footer } from './components'
import styled from 'styled-components'
import { Home, About, Cart, Error, PrivateRoute, Products, SingleProduct, Checkout, AuthWrapper } from './pages'

function App() {
  return (
    <AuthWrapper>
    <Router>
      <Navbar/>
      <Sidebar/>
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route exact path='/about'>
          <About />
        </Route>
        <Route exact path='/cart'>
          <Cart />
        </Route>
        <Route exact path='/products'>
          <Products />
        </Route>
        <Route exact path='/products/:id' children={<SingleProduct/>}/>
        <PrivateRoute exact path='/checkout'>
          <Checkout />
        </PrivateRoute>
        <Route exact path='*'>
          <Error />
        </Route>
      </Switch>
      <Footer/>
    </Router>
    </AuthWrapper>
  )
}

export default App