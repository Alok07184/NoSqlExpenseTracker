async function expensesubmit(expenseform){
    const amount = document.getElementById('amount').value;
    const description = document.getElementById('description').value;
    const category = document.getElementById('category').value;
   const itemperpage = document.getElementById('itemsperpage').value;
   localStorage.setItem('itemsperpage', itemperpage);
   console.log(itemperpage);
    const obj ={
        amount: amount,
        description: description,
        category: category
    }
    const token = localStorage.getItem('token');
    console.log(token);
    const result = await axios.post('http://127.0.0.1:5000/expense/addexpense',obj,{headers : {'Authorization': token}});
    console.log(result.status === 201)
    {
        window.location.reload(true);
    }
}
function showLeaderboard(){
    const inputElement  =document.createElement("input");
    inputElement.type = "button";
    inputElement.value = "Show Leaderboard";
    inputElement.onclick = async()=>{
        const token = localStorage.getItem('token');
       const userLeaderboardArray = await axios.get('http://127.0.0.1:5000/premium/showleaderboard',{headers : {'Authorization': token}})
       console.log(userLeaderboardArray);
       var leaderboardElement = document.getElementById('Leaderboard');
       leaderboardElement.innerHTML +=  `<h1>Leader Board</h1>`
       userLeaderboardArray.data.forEach(userData => {
        leaderboardElement.innerHTML +=  `<li> Name - ${userData.name} Total Expense- ${userData.totalexpense}</li>`
       });
    }
    document.getElementById("message").appendChild(inputElement);
}
function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}
window.addEventListener('DOMContentLoaded',async()=>{
    const token = localStorage.getItem('token');
   const itemsperpage = localStorage.getItem('itemsperpage');
    const page =1;
    const result = await axios.get(`http://127.0.0.1:5000/expense/getexpense?page=${page}&itemsperpage=${itemsperpage}`,{headers : {'Authorization': token}});
    showExpense(result.data.products);
    showpagination(result.data);
    console.log(result);
    const decodetoken = parseJwt(token);
    const premiummember = decodetoken.isprimarymember;
    if(premiummember)
    {
        const rzpbutton = document.getElementById('rzp-button1');
        rzpbutton.innerHTML = "You are Premium to Us"
        showLeaderboard();
        
    }
})
function showpagination({currentPage, hasNextPage, nextPage, hasPreviousPage, previousPage, lastPage})
{
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = "";
    if(hasPreviousPage){
        const btn2 = document.createElement('button')
        btn2.innerHTML = previousPage
        btn2.addEventListener('click',()=> getProducts(previousPage));
        pagination.appendChild(btn2);
    }
    const btn1 = document.createElement('button');
    btn1.innerHTML = `<h3>${currentPage}</h3>`;
    btn1.addEventListener('click', () =>getProducts(currentPage));
    pagination.appendChild(btn1);
    if(hasNextPage) {
        const btn3 = document.createElement('button');
        btn3.innerHTML = nextPage;
        btn3.addEventListener('click', () =>getProducts(nextPage));
        pagination.appendChild(btn3);
    }
    console.log(pagination);
}
async function getProducts(page) {
    const itemsperpage = localStorage.getItem('itemsperpage');
    const token = localStorage.getItem('token');
     const result = await axios.get(`http://127.0.0.1:5000/expense/getexpense?page=${page}&itemsperpage=${itemsperpage}`,{headers : {'Authorization': token}});
    showExpense(result.data.products);
    showpagination(result.data);
    console.log(result);
}
function showExpense(expense){
    const takList = document.getElementById('task-list');
        takList.innerHTML ="";
    expense.forEach(exp=>{
        const childNode = `<li id=${exp.id}>${exp.amount} Amount For ${exp.category} - Description ${exp.description}
        <button onclick="deleteExpense('${exp.id}')">Delete</button>
        </li>`;
        takList.innerHTML = takList.innerHTML + childNode
    })
   
}

async function deleteExpense(id)
{
    const token = localStorage.getItem('token');
    const tasklist = document.getElementById('task-list');
    const child = document.getElementById(id);
    const result = await axios.delete(`http://127.0.0.1:4000/expense/deleteexpense/${id}`,{headers: {'Authorization': token}});
   console.log(result);
    window.location.reload();

}
document.getElementById('rzp-button1').onclick = async function (e){
   
    const token  = localStorage.getItem('token');
    const response = await axios.get('http://127.0.0.1:5000/premiummembership',{headers:{'Authorization': token}});
    console.log(response);
    var options = {
        "key" : response.data.key_id,
        "order_id" : response.data.order.id,
        "handler" : async function(response){
         const res=   await axios.post('http://127.0.0.1:5000/updatepremiumstatus',{
                order_id : options.order_id,
                payment_id : response.razorpay_payment_id,
            },{headers : {'Authorization': token}})
            alert('You are a Premium account');
            const rzpbutton = document.getElementById('rzp-button1');
            rzpbutton.innerHTML = "You are Premium to Us"
            localStorage.setItem('token', res.data.token);
            showLeaderboard();
           
        },
    }
    const rzp1 = new Razorpay(options);
    rzp1.open();
    e.preventDefault();

    rzp1.on('payment.failed',function(response){
        console.log(response);
        alert('Something wrong');
    });
}


function download(){
    const token = localStorage.getItem('token');
    axios.get('http://127.0.0.1:4000/downloadexpense', {headers : {'Authorization': token}}).then(response=>{
       if(response.status === 200)
       {
        console.log(response);
        var a = document.createElement('a');
        a.href = response.data.fileUrl;
        a.download = 'expense.csv';
        a.click();
       }
       else{
        alert(response.data.error);
       }
    }).catch(error=>console.log(error));
    
}