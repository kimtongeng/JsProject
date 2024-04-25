var listArray = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : [];
console.log(listArray)
const name = document.querySelector(".name");
const phone = document.querySelector(".phone");
const email = document.querySelector(".email");
const form = document.querySelector(".form");
const tbody = document.querySelector("tbody");
const btn = document.querySelector(".form button");
var index;
function formatDate(time){
    return (time>9)? time : "0"+time;
}
function getDate(){
    let date = new Date();
    let year = date.getFullYear();
    let month = formatDate(date.getMonth()+1);
    let day = formatDate(date.getDate());
    let hour = formatDate(date.getHours());
    let min = formatDate(date.getMinutes());
    let sec = formatDate(date.getSeconds());
    let nowDate = `${year}/${month}/${day} ${hour}:${min}:${sec}`;
    return nowDate;
}
function validatingName(){
    if(name.value.trim() === ""){
        document.querySelector(".errorName").innerHTML = "Please Enter Name";
        return false;
    }
    else{
        document.querySelector(".errorName").innerHTML = "";
        return true;
    }
}

function validatingPhoneNumber(){
    let validatePhone = /^[0-9]+$/g;
    if(phone.value.trim() === ""){
        document.querySelector(".errorPhone").innerHTML = "Please Enter Phone number";
        return false;
    }
    else if(!phone.value.match(validatePhone)){
        document.querySelector(".errorPhone").innerHTML = "Phone Number most have only number";
        return false
    }
    else if(phone.value.length > 10 || phone.value.length < 8){
        document.querySelector(".errorPhone").innerHTML = "Phone Number most have 8-9 number";
        return false
    }
    else{
        document.querySelector(".errorPhone").innerHTML = "";
        return true;
    }
}
function validatingEmail(){
    let validateEmail = /^[A-Za-z0-9]+@[a-z]+\.+[a-z]{2,3}$/g
    if(email.value.trim() === ""){
        document.querySelector(".errorEmail").innerHTML = "Please Enter Email";
        return false;
    }
    else if(!email.value.match(validateEmail)){
        document.querySelector(".errorEmail").innerHTML = `Please Enter Email like this "example@example.com"`;
        return false;
    }
    else{
        document.querySelector(".errorEmail").innerHTML = '';
        return true;
    }

}
function clearFrom(){
    name.value = "";
    phone.value = "";
    email.value = "";
}
function showUserInfo(){
    tbody.innerHTML = "";
    listArray.forEach((obj,index)=>{
        let newTr = document.createElement("tr");
        newTr.innerHTML = ` 
            <td>${index+1}</td>
            <td>${obj.name}</td>
            <td>${obj.phone}</td>
            <td>${obj.email}</td>
            <td>${obj.date}</td>
            <td>
                <button class="btn btn-warning btn-edit">Edit</button>
                <button class="btn btn-danger btn-delete">Delete</button>
            </td>
        `;
        tbody.appendChild(newTr);
    })
}
showUserInfo();
form.addEventListener("click",function(e){
    let element = e.target;
    if(element.classList.contains("btn-add")){
        let nameCheck = validatingName();
        let phoneCheck = validatingPhoneNumber();
        let emailCheck = validatingEmail();
        if(nameCheck && phoneCheck && emailCheck){
            let newObject = {};
            newObject.name = name.value;
            newObject.phone = phone.value;
            newObject.email = email.value;
            newObject.date = getDate();
            listArray.push(newObject);
            
            clearFrom();
            showUserInfo();
            localStorage.setItem("userInfo",JSON.stringify(listArray));
        }
        
    }
    if(element.classList.contains("edit")){
        let nameCheck = validatingName();
        let phoneCheck = validatingPhoneNumber();
        let emailCheck = validatingEmail();
        if(nameCheck && phoneCheck && emailCheck){
            listArray[index].name = name.value;
            listArray[index].phone = phone.value;
            listArray[index].email = email.value;
            clearFrom();
            showUserInfo();
            btn.classList.remove("edit");
            btn.classList.add("btn-add");
            btn.innerHTML = "Add";
            localStorage.setItem("userInfo",JSON.stringify(listArray));
        }
        
    }
    
})
tbody.addEventListener("click",function(e){
    let element = e.target;
    if(element.classList.contains("btn-delete")){
        
        let i = element.parentElement.parentElement.children[0].innerHTML - 1;
        listArray.splice(i,1);
        showUserInfo();
        localStorage.setItem("userInfo",JSON.stringify(listArray));
    }
    if(element.classList.contains("btn-edit")){
        index = element.parentElement.parentElement.children[0].innerHTML - 1;
        name.value = listArray[index].name;
        phone.value = listArray[index].phone;
        email.value = listArray[index].email;
        btn.classList.remove("btn-add");
        btn.classList.add("edit");
        btn.innerHTML = "Edit";
    }
})