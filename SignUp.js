import * as yup from "https://cdn.jsdelivr.net/npm/yup@1.2.0/+esm";
const inp = document.querySelectorAll("input")
const signUpBtn = document.getElementById("signUpBtn")
const signUpSchema = yup.object({
  fullName: yup.string().required('Full Name is required'),
  email: yup.string().email('Please enter a valid email address').required('Email is required'),
  password: yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
});
signUpBtn.addEventListener("click",async (e)=>{
    e.preventDefault()
    const regData = {
      fullName: inp[0].value,
      email: inp[1].value,
      password: inp[2].value
  }
  try {
    await signUpSchema.validate(regData, { abortEarly: false})
    createNewUser() 
} catch (error) {
    Toastify({
        className: "toast-bottom-center",
        text: error.errors.join(", "),
        duration: 3000,
        gravity: "bottom", 
        position: "center",
        style: {
          background: "white",
          color: "#7d2dfe",
          fontSize: "16px",
          padding: "6px 12px",
          borderRadius: "6px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
        },
    }).showToast();
}

})
function createNewUser(){

const url = new URL('https://67f98151094de2fe6ea1bf29.mockapi.io/portfolio/contact/yahoo');
url.searchParams.append('email', inp[1].value); //https://PROJECT_TOKEN.mockapi.io/tasks?completed=false
fetch(url, {
  method: 'GET',
  headers: {'content-type':'application/json'},
}).then(res => {
  if (res.ok) {
      return res.json();
  }
  // handle error
}).then(data => {
  if (data == undefined || data == ""){
    const newUser = {
      fullName: inp[0].value,
      email: inp[1].value,
      password: inp[2].value,
      permission: "user" ,
    };
    fetch('https://67f98151094de2fe6ea1bf29.mockapi.io/portfolio/contact/yahoo', {
      method: 'POST',
      headers: {'content-type':'application/json'},
      // Send your data in the request body as JSON
      body: JSON.stringify(newUser)
    }).then(res => {
      if (res.ok) {
          return res.json();
      }
      // handle error
    }).then(task => {
      console.log("added")
      Toastify({
        className: "toast-bottom-center",
        text: "Your Yahoo email has been successfully created! Welcome aboard!",
        duration: 3000,
        gravity: "bottom", 
        position: "center",
        style: {
          background: "white",
          color: "#7d2dfe",
          fontSize: "16px",
          padding: "6px 12px",
          borderRadius: "6px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
        },
    }).showToast();
    setTimeout(() => {
      location.assign("index.html");
    }, 3000);
    }).catch(error => {
      console.log("error")
    })

  }else{
    console.log("tekrari")
    Toastify({
      className: "toast-bottom-center",
      text: "Unfortunately, this Yahoo email address is already in use. Please try a different one.",
      duration: 3000,
      gravity: "bottom", 
      position: "center",
      style: {
        background: "white",
        color: "#7d2dfe",
        fontSize: "16px",
        padding: "6px 12px",
        borderRadius: "6px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
      },
  }).showToast();
  }
  
}).catch(error => {
  console.log(error);
})
}