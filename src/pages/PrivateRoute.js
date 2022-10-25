import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
// will remove later
// import { useUserContext } from '../context/user_context';

const PrivateRoute = ({children, ...rest}) => {
// const {myUser} = useUserContext()
const {user} = useAuth0()

  return (
    <Route {...rest} render={()=>{
      return user ? children : <Redirect to='/'></Redirect>
    }}>
    </Route>
    //note that here, I'm spreading the the values gotten from rest
  )
};
export default PrivateRoute;


//children signifies whatever is in the private route i.e the component
//rest operator is used when working with function parameters. So what the rest is gathering is everything that we pass in the in the private route asides the component i.e grabbing the rest of the privateroute properties asides the children. Hence the word, REST


//note that it takes longer for us to get the user from our context than it normally would be from the auth0 hence us creating a wrapper

// hence instead of getting the user from our context we get the user from auth0 