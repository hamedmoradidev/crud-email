import * as yup from "https://cdn.jsdelivr.net/npm/yup@1.2.0/+esm";

const logInbtn = document.getElementById("logInbtn")
const inp = document.querySelectorAll("form>input")
const loginForm =  document.getElementById("loginForm")
const emailWindow = document.getElementById("emailWindow")
const mailTitleMobile = document.getElementById("mailTitleMobile")
const mailSenderMobile = document.getElementById("mailSenderMobile")
const mailMessageMobile = document.getElementById("mailMessageMobile")
const signOutButton = document.querySelectorAll(".signOutButton")
const userEmail = document.getElementById("userEmail")
const userAvatar = document.getElementById("userAvatar")
const userfullName = document.getElementById("userFullName")
const mailTitle = document.getElementById("mailTitle")
const mailSender = document.getElementById("mailSender")
const mailMessage = document.getElementById("mailMessage")
let userGlobal = null
const editForm = document.querySelectorAll("#settings input")
const adminWindow = document.getElementById("adminWindow")
const usersListTableBody = document.querySelector("#usersList tbody")
const signInSchema = yup.object({
    email: yup.string().email('Invalid email format').required('Email is required'),
    password: yup.string().required('Password is required'),
})
logInbtn.addEventListener("click", async (e) => {
    e.preventDefault()
    const formData = {
        email: inp[0].value,
        password: inp[1].value
    }
    try {
        await signInSchema.validate(formData, { abortEarly: false})
        if(inp[0].value == "admin" || inp[0].value == "admin@yahoo.com"){
            if(inp[1].value == "admin"){
                signInAdmin()
                console.log("admin")
            }
        }else{
            signInUser()
        }    
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

////sign in///
function signInUser(){
    Toastify({
        className: "toast-bottom-center",
        text: "Loading...",
        duration: 100,
        gravity: "bottom", 
        position: "center",
        style: {
          background: "white",
          color: "#7d2dfe",
          fontSize: "16px",
          padding: "6px 12px",
          borderRadius: "6px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
          zIndex: "999"
        },
    }).showToast();
    const url = new URL('https://67f98151094de2fe6ea1bf29.mockapi.io/portfolio/contact/yahoo');
    url.searchParams.append('email', inp[0].value); //https://PROJECT_TOKEN.mockapi.io/tasks?completed=false
    fetch(url, {
    method: 'GET',
    headers: {'content-type':'application/json'},
    }).then(res => {
    if (res.ok) {
        return res.json();
    }
    // handle error
    }).then(user => {
    // mockapi returns only incomplete tasks
        console.log(user[0])
        userGlobal = user[0]
        console.log(userGlobal)
        Toastify({
            className: "toast-bottom-center",
            text: "You have successfully logged in.",
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
            loginForm.style.display = "none"
            emailWindow.style.display = "block"    
        }, 1000);
        renderInbox(user[0])
    }).catch(error => {
    // handle error
    Toastify({
        className: "toast-bottom-center",
        text: "Oops! That user doesn’t exist.",
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

    console.log(error)
    })
}
function signInAdmin(){
    Toastify({
        className: "toast-bottom-center",
        text: "Loading...",
        duration: 100,
        gravity: "bottom", 
        position: "center",
        style: {
          background: "white",
          color: "#7d2dfe",
          fontSize: "16px",
          padding: "6px 12px",
          borderRadius: "6px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
          zIndex: "999"
        },
    }).showToast();
    fetch('https://67f98151094de2fe6ea1bf29.mockapi.io/portfolio/contact/yahoo', {
        method: 'GET',
        headers: {'content-type':'application/json'},
      }).then(res => {
        if (res.ok) {
            return res.json();
        }
        // handle error
      }).then(usersList => {
        console.log("logged in as super admin!")
        console.log(usersList)
        Toastify({
            className: "toast-bottom-center",
            text: "Welcome, Super Admin!",
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
            loginForm.style.display = "none"
            adminWindow.style.display = "block"    
            renderAdmin(usersList)
        }, 1000);
      }).catch(error => {
        console.log(error)
        Toastify({
            className: "toast-bottom-center",
            text: "No user found with that information.",
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
    
      })
}
////sign in////
////user edit///
editForm[5].addEventListener("click", () => {
    console.log("edit clicked")
    if((editForm[3].value != "") && (editForm[4].value != "")){
        if((editForm[3].value != userGlobal.fullName) || (editForm[4].value != userGlobal.password)){
            console.log("ok")
            performEdit(editForm[2].value)
        }else{
            Toastify({
                className: "toast-bottom-center",
                text: "No changes were made!",
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
                  zIndex: "999"
                },
            }).showToast();        
        }
    }else{
        Toastify({
            className: "toast-bottom-center",
            text: "Fields cannot be left empty.",
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
              zIndex: "999"
            },
        }).showToast();        
    }
})
function performEdit(id){
    fetch(`https://67f98151094de2fe6ea1bf29.mockapi.io/portfolio/contact/yahoo/${id}`, {
        method: 'PUT', // or PATCH
        headers: {'content-type':'application/json'},
        body: JSON.stringify({fullName: editForm[3].value, password: editForm[4].value})
      }).then(res => {
        if (res.ok) {
            return res.json();
        }
        // handle error
      }).then(task => {
        Toastify({
            className: "toast-bottom-center",
            text: "Your information has been successfully updated.",
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
              zIndex: "999"
            },
        }).showToast();

      }).catch(error => {
        // handle error
      })}

////user edit///
////user delete///
editForm[6].addEventListener("click", () => {
    if (confirm("If you confirm this message your account will be permanently deleted from database and it can not be recovered!") == true){
        performDelete(editForm[2].value)
    }
})
function performDelete(id){
fetch(`https://67f98151094de2fe6ea1bf29.mockapi.io/portfolio/contact/yahoo/${id}`, {
    method: 'DELETE',
  }).then(res => {
    if (res.ok) {
        return res.json();
    }
    // handle error
  }).then(task => {
    Toastify({
        className: "toast-bottom-center",
        text: "Account deletion successful. Logging out now.",
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
          zIndex: "999"
        },
    }).showToast();
    console.log("deleted")
    setTimeout(() => {
        location.reload()
    }, 2000);


 
  }).catch(error => {
    // handle error
  })
}
////user delete///
////admin delete////
function adminDelete(id){
    console.log("admin delete clicked")
    fetch(`https://67f98151094de2fe6ea1bf29.mockapi.io/portfolio/contact/yahoo/${id}`, {
        method: 'DELETE',
      }).then(res => {
        if (res.ok) {
            return res.json();
        }
        // handle error
      }).then(task => {
        Toastify({
            className: "toast-bottom-center",
            text: "User account has been deleted.",
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
              zIndex: "999"
            },
        }).showToast();
        console.log(task)
        setTimeout(() => {
            usersListTableBody.innerHTML = null
            signInAdmin()
    
        }, 1000);
      }).catch(error => {
        // handle error
    })
}
////admin delete////
////admin edit////
function adminEdit(userId, userFullName, userPassword, elem){
    let fullNameValue = elem.parentElement.parentElement.children[4].children[0].value
    let passwordValue = elem.parentElement.parentElement.children[5].children[0].value
    console.log(userId);
    console.log(userFullName);
    console.log(userPassword);
    if((fullNameValue != "") && (passwordValue != "")){
        if((fullNameValue != userFullName) || (passwordValue != userPassword)){
            console.log("not repeated")
            fetch(`https://67f98151094de2fe6ea1bf29.mockapi.io/portfolio/contact/yahoo/${userId}`, {
                method: 'PUT', // or PATCH
                headers: {'content-type':'application/json'},
                body: JSON.stringify({fullName: fullNameValue, password: passwordValue})
              }).then(res => {
                if (res.ok) {
                    return res.json();
                }
                // handle error
              }).then(task => {
                Toastify({
                    className: "toast-bottom-center",
                    text: "Database changes saved successfully!",
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
                      zIndex: "999"
                    },
                }).showToast();
    
                
              }).catch(error => {
                console.log(error);
                
              })
        }else{
            Toastify({
                className: "toast-bottom-center",
                text: "Please update the fields first.",
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
                  zIndex: "999"
                },
            }).showToast();        
        }    
    }else{
        Toastify({
            className: "toast-bottom-center",
            text: "Please fill in all fields.",
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
              zIndex: "999"
            },
        }).showToast();                
    }
}
////admin edit////
signOutButton.forEach((btn) => {
    btn.addEventListener("click", () => {
        console.log("clicked");
        Toastify({
            className: "toast-bottom-center",
            text: "Logout successful. You will be leaving shortly.",
            duration: 2000,
            gravity: "bottom", 
            position: "center",
            style: {
              background: "white",
              color: "#7d2dfe",
              fontSize: "16px",
              padding: "6px 12px",
              borderRadius: "6px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
              zIndex: "999"
            },
        }).showToast();
        setTimeout(() => {
            location.reload()
        }, 2000);
    })    
})

function renderAdmin(usersList){
    usersList.map((user, index) => {
        if(index != 0){
            console.log(user)
            usersListTableBody.innerHTML += `<tr class="bg-white shadow rounded-xl">
            <td class="cursor-not-allowed px-4 py-2"><img width="30px" height"30px" src=${user.avatar} alt=""></td>
            <td class="cursor-not-allowed px-4 py-2 text-gray-500">${user.email}</td>
            <td class="cursor-not-allowed px-4 py-2 text-gray-500">${user.id}</td>
            <td class="cursor-not-allowed px-4 py-2 text-gray-500">${user.permission}</td>
            <td class="px-4 py-2"><input class="border border-gray-300 rounded-xl px-3 py-1 w-full" type="text" value="${user.fullName}"></td>
            <td class="px-4 py-2"><input class="border border-gray-300 rounded-xl px-3 py-1 w-full" value="${user.password}"></td>
            <td class="px-4 py-2"><input onclick="adminEdit('${user.id}','${user.fullName}','${user.password}',this)" id="adminEditBtn" type="button" value="Edit" class="text-yahoo border border-yahoo hover:text-white hover:bg-hover rounded-xl px-4 py-1 transition cursor-pointer" /></td>
            <td class="px-4 py-2"><input onclick="adminDelete(${user.id})" type="button" value="Delete" class="text-yahoo border border-yahoo hover:text-white hover:bg-hover rounded-xl px-4 py-1 transition cursor-pointer" /></td>
            </tr>`    
        }else{
            usersListTableBody.innerHTML += `<tr class="bg-white shadow rounded-xl *:cursor-not-allowed">
            <td class="cursor-not-allowed px-4 py-2"><img width="30px" height"30px" src=${user.avatar} alt=""></td>
            <td class="cursor-not-allowed px-4 py-2 text-gray-500">${user.email}</td>
            <td class="cursor-not-allowed px-4 py-2 text-gray-500">${user.id}</td>
            <td class="cursor-not-allowed px-4 py-2 text-gray-500">${user.permission}</td>
            <td class="px-4 py-2"><input disabled class="rounded-xl px-3 py-1 w-full" type="text" value="${user.fullName}"></td>
            <td class="px-4 py-2"><input disabled class="rounded-xl px-3 py-1 w-full" value="${user.password}"></td>
            <td class="px-4 py-2"></td>
            <td class="px-4 py-2"></td>
            </tr>`    
        }
    })
}
function renderInbox(user){
    console.log(user)
    userEmail.innerHTML = user.email
    userAvatar.src = user.avatar
    userfullName.innerText = user.fullName
    mailTitle.innerHTML = user.title
    mailSender.innerHTML = user.sender
    mailMessage.innerHTML = user.message
    mailTitleMobile.innerHTML = user.title
    mailSenderMobile.innerHTML = user.sender
    mailMessageMobile.innerHTML = user.message

    editForm[0].value = user.email
    editForm[1].value = user.permission
    editForm[2].value = user.id
    editForm[3].value = user.fullName
    editForm[4].value = user.password
}
window.adminDelete = adminDelete;
window.adminEdit = adminEdit;

