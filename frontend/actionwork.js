async function submit1(signinform){
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    const obj ={
        name: name,
        email: email,
        password: password,
        totalexpense : 0,
        isprimarymember: false,
        expenses : [],
        
    }
    const response = await axios.post('http://127.0.0.1:5000/api/user/signup',obj);
    console.log(response);
    if(response.data.message === 'User created successfully')
   window.location.href = "signin.html";
}

async function submit2(loginfrm){
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const obj ={
        email: email,
        password: password,
    }

    const response = await axios.post('http://127.0.0.1:5000/api/user/login',obj);
    console.log(response);
    localStorage.setItem('token', response.data.token);
    if(response.data.success){
        window.location.href = "expense.html";
    }
}

async function submitforgot(forgotform){
    const email  = document.getElementById('emailforgot').value;
    const obj ={
        email
    }
    const result = await axios.post('http://127.0.0.1:4000/password/forgotpassword',obj );
    console.log(result);
}