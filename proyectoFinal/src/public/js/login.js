
const form = document.getElementById('loginForm');

form.addEventListener('submit',async evt=>{
    evt.preventDefault();
    const data = new FormData(form);
    const obj = {};
    data.forEach((value,key)=>obj[key]=value)

    const response = await fetch('/api/sessions/login',{
        method:'POST',
        body:JSON.stringify(obj),
        headers:{
            "Content-Type":"application/json"
        }
    })
    const result = await response.json();
    if(result.status==="error")
    window.location.replace('/api/sessions/loginFail');
    else{
        window.location.replace('/inicio');
    }
})