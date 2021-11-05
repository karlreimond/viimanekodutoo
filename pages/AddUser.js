import UserRegister from './components/UserRegister'

function signup(values) {
    fetch('localhost:8081/api/auth/signup',{
    method: 'POST',
    body: JSON.stringify(values),
    headers: {
        'Content-Type':'application/json'
    },
    state = {
    }
        
    });
    return (
      <div>
        <RegistrationForm onAddUser={UserSubmitHandler}/>
      </div>     
      );
}


  
  export default signup;