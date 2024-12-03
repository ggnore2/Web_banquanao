function checkLogin() {
    let currentUser = JSON.parse(localStorage.getItem("currentuser"));
    if(currentUser == null || currentUser.userType == 0) {
        document.querySelector("body").innerHTML = `<div class="access-denied-section">
            <img class="access-denied-img" src="asset/image/screenshot-2024-11-28-220303-1732868068648-17328680695361692082549.webp" alt="">
        </div>`
    }
}
window.onload = checkLogin();

document.querySelector(".Admin-sideBar-Top-Title").addEventListener("click", e => {
    window.location.href = "index.html";
})
// thống kê
function getAmoumtProduct() {
    let products = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : [];
    return products.length;
}

// Get amount user
function getAmoumtUser() {
    let accounts = localStorage.getItem("accounts") ? JSON.parse(localStorage.getItem("accounts")) : [];
    return accounts.length;
}

// Get amount user
function getMoney() {
    let tongTien = 0;
    let orders = localStorage.getItem("orders") ? JSON.parse(localStorage.getItem("orders")) : [];
    orders.forEach(item => {
        tongTien += item.tongTien;
    });
    return tongTien;
}
// thống kê dashboard
document.getElementById("amount-user").innerHTML = getAmoumtUser();
document.getElementById("amount-product").innerHTML = getAmoumtProduct();
document.getElementById("doanh-thu").innerHTML = vnd(getMoney());

// Doi sang dinh dang tien VND
function vnd(price) {
    return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}

const menuLi = document.querySelectorAll(`.Admin-sideBar-Content > ul > li > a`);
const subMenu = document.querySelectorAll(".sub-menu");

for(let i = 0; i < menuLi.length; i++){
    menuLi[i].addEventListener("click", event => {
        event.preventDefault();
        for(let j=0; j<subMenu.length;j++){
            subMenu[j].setAttribute("style",`max-height: 0px`);
        }
        const menuLiHeight = menuLi[i].parentNode.querySelector('ul .menuItems').offsetHeight; 
        menuLi[i].parentNode.querySelector('ul').setAttribute("style",`max-height: ${menuLiHeight}px`);
    });
};

// navigation for the webpage 
const sidebars = document.querySelectorAll(".sub-menu li a");
const AdminContentMain = document.querySelectorAll(".Admin-Content-Main");
for(let i = 0; i < sidebars.length; i++) {
    sidebars[i].onclick = function (e) {
        e.preventDefault();
        document.querySelector(".Admin-Content-Main.Active").classList.remove("Active");
        AdminContentMain[i].classList.add("Active");
    };
}


// account_list
// Hiển thị dữ liệu ngay lập tức khi thêm sản phẩm thành công
function showAccountFromLocal() {
    // lấy toàn bộ danh mục trong local
    const accounts = JSON.parse(localStorage.getItem("accounts")) || [];
    // xây dựng cấu trúc html cho danh mục
    let htmlResult ='';
    accounts.forEach(element =>{
        htmlResult = htmlResult + `<tr>                                    
                                    <td>${element.userType}</td>                                
                                    <td>${element.fullname}</td>                                   
                                    <td>${element.password}</td>  
                                    <td>${element.phone}</td> 
                                    <td>${element.status}</td>
                                    <td>${element.cancellations}</td>                              
                                    <td><button data-id="${element.id}" class="Fix">Sửa</button>|<button data-id="${element.id}" class="Delete">Xóa</button>
                                    |<button data-id="${element.id}" class="Ban" id="${element.id}">Khóa | Gỡ Khóa</button></td>
                                </tr>`;
    });
    // đưa kết quả toàn bộ danh mục vào tbody của table
    document.querySelector(".accountTable").innerHTML = htmlResult;
}   

function handleProcessAccountData(event){
    const clicked = event.target;
    // lấy ra tất cả danh mục trong local
    const accounts = JSON.parse(localStorage.getItem("accounts")) || [];
    if(clicked.classList.contains("Delete") && confirm("Bạn Chắn Chắn Muốn Xóa ?")){
        const id_Delete = clicked.getAttribute("data-id");
        // mảng lọc ra phần tử cần delete
        const newFilterAccounts = accounts.filter(
            element => {
                return element.id != id_Delete;             
            }
        );
        // lưu vào localStorage
        localStorage.setItem("accounts",JSON.stringify(newFilterAccounts));
        // rerender web
        showAccountFromLocal();
    }
    else if(clicked.classList.contains("Fix")){
        // lấy id
        const updateAccountBtn = document.querySelector(".updateAccountBtn");
        const idEdit = clicked.getAttribute("data-id");
        updateAccountBtn.setAttribute("data-id",idEdit);
        const editingAccount = accounts.find(element => {
            if(element.id == idEdit){
                return element;
            }
        });
        // đưa value lên ô input đang chỉnh sửa 
        for(let i = 0; i < AdminContentMain.length; i++) {
            AdminContentMain[i].classList.remove("Active");
        }
        AdminContentMain[7].classList.add("Active");

        document.querySelectorAll(".FixingForm .dataProducts input").forEach(element =>{
            element.value = editingAccount[element.name];     
        });
    }else if(clicked.classList.contains("Ban")){
        const idBan = clicked.getAttribute("data-id");
        const banAccount  = accounts.map(element =>{
                if(element.id == idBan){
                    if(element.status !== 0){             
                        return {
                            fullname: element.fullname,
                            phone: element.phone,
                            password: element.password,
                            address: element.address,
                            email: element.email,
                            status: 0,
                            join: element.join,
                            cart: element.cart,
                            cancellations: element.cancellations,
                            userType: element.userType,
                            id: element.id
                        };
                    }
                    else{                                             
                        return {
                            fullname: element.fullname,
                            phone: element.phone,
                            password: element.password,
                            address: element.address,
                            email: element.email,
                            status: 1,
                            join: element.join,
                            cart: element.cart,
                            cancellations: 0,
                            userType: element.userType,
                            id: element.id
                        };
                    }
                }
                else{
                    return element;
                }
            });
            localStorage.setItem("accounts",JSON.stringify(banAccount));
            showAccountFromLocal();
    }
}


function handleUpdateAccount(event){
    event.preventDefault();
    let success = true;
    const inputAllFixingSelector = document.querySelectorAll(".FixingForm .dataProducts input");

    let fullNameUser = document.getElementById('fullname').value;
    let phoneUser = document.getElementById('phone').value;
    let passwordUser = document.getElementById('password').value;
    let passwordConfirmation = document.getElementById('password_confirmation').value;
    let emailUser = document.getElementById('email').value;
    let addressUser = document.getElementById('address').value;
    // thực hiện validate
    for(let i=0; i<inputAllFixingSelector.length; i++){
        let inputAllValue = inputAllFixingSelector[i].value;
        let inputAllValueName = inputAllFixingSelector[i].name;
        let divErrorMessage = document.querySelectorAll(".FixingForm .dataProducts .formGroup .errorMessage");
        if(inputAllFixingSelector[i].name !== "password_confirmation"){
            if(inputAllValue == ""){
                inputAllFixingSelector[i].classList.add("error");
                inputAllFixingSelector[i].focus();
                let errorMessage = inputAllValueName + " Không Được Bỏ Trống";
                divErrorMessage[i].textContent = errorMessage;
                success = false;
            }else{
                inputAllFixingSelector[i].classList.remove("error"); 
                divErrorMessage[i].textContent ="";       
            }
        }
        else{
            if (passwordConfirmation !== passwordUser) {
                document.getElementById('password_confirmation').value = '';
                inputAllFixingSelector[i].classList.add("error");
                inputAllFixingSelector[i].focus();
                let errorMessage =" Mật khẩu không khớp";
                divErrorMessage[i].textContent = errorMessage;
                success = false;
            } else {
                inputAllFixingSelector[i].classList.remove("error"); 
                divErrorMessage[i].textContent ="";
            }
        }
    }
    
    
    if(success){             
    const accounts = JSON.parse(localStorage.getItem("accounts")) || [];        
    const idUpdate = document.querySelector(".updateAccountBtn").getAttribute("data-id");
    
    const accountUpdate = accounts.map(element =>{
        if(element.id == idUpdate){
            return {
                fullname: fullNameUser,
                phone: phoneUser,
                password: passwordUser,
                address: addressUser,
                email: emailUser,
                status: element.status,
                join: element.join,
                cart: element.cart,
                cancellations: element.cancellations,
                userType: element.userType,
                id: element.id
            };
        }
        else{
                return element;
            }
        });
        localStorage.setItem("accounts",JSON.stringify(accountUpdate));
        for(let i = 0 ; i < AdminContentMain.length ; i++){
            AdminContentMain[i].classList.remove("Active");
        }
        AdminContentMain[1].classList.add("Active");
        showAccountFromLocal();
    }
}
document.querySelector(".updateAccountBtn").addEventListener("click",handleUpdateAccount);

showAccountFromLocal();

document.querySelector(".accountTable").addEventListener("click",handleProcessAccountData);

// thanh tìm kiếm
const searchBar = document.getElementById("searchBar");
const accountList = document.querySelectorAll(".accountTable tr");

function handleFilterAccounts(){
    // lấy tất cả products từ local ra 
    const accounts = JSON.parse(localStorage.getItem("accounts")) || []; 
    // chuyển đổi tên sản phẩm cần tìm về dạng chữ in thường
    const searchTerm = searchBar.value.toLowerCase(); 
    // duyệt mảng sản phẩm có tên sp chứa kí tự trong thanh tìm kiếm   
    for(let i=0;i<accounts.length;i++){
        const accountNumber = accounts[i].phone.toLowerCase(); 
        if (accountNumber.includes(searchTerm)){
            accountList[i].style.display ="";
        }else{
            accountList[i].style.display ="none";
        }
    } 
};
searchBar.addEventListener("keyup",handleFilterAccounts);



function sumTotalBill(objectsList){
    const products = JSON.parse(localStorage.getItem("products")) || [];
    let TotalBill = 0;
    for(let i = 0 ; i < objectsList.length ; i++){
        if(products[i].id === objectsList[i].idProduct){
            TotalBill += products[i].ProductPrice * objectsList[i].soLuong;
        }
    }
    return TotalBill;
}

// Function to cancel an order
function cancelOrder(userId) {
    // Set the cancellation limit
    const accounts = JSON.parse(localStorage.getItem("accounts")) || [];
    const CANCELLATION_LIMIT = 3;
    const accountUpdate = accounts.map(element =>{
        if(element.id === userId){
            if( element.cancellations < CANCELLATION_LIMIT){
                return {
                    fullname: element.fullname,
                    phone: element.phone,
                    password: element.password,
                    address: element.address,
                    email: element.email,
                    status: element.status,
                    join: element.join,
                    cart: element.cart,
                    cancellations: element.cancellations+1,
                    userType: element.userType,
                    id: element.id
                };
            }
            else if(element.cancellations === CANCELLATION_LIMIT){
                return {
                    fullname: element.fullname,
                    phone: element.phone,
                    password: element.password,
                    address: element.address,
                    email: element.email,
                    status: 0,
                    join: element.join,
                    cart: element.cart,
                    cancellations: element.cancellations,
                    userType: element.userType,
                    id: element.id
                };
            }
            else{
                return element;
            }
        }
        else{
            return element;
        }
        });
        localStorage.setItem("accounts",JSON.stringify(accountUpdate));
        showAccountFromLocal();
}
function showOrderfromLocal() {
    // lấy toàn bộ danh mục trong local
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    // xây dựng cấu trúc html cho danh mục
    let htmlResult ='';
    orders.forEach(element =>{
        if(element.status === 0){
            htmlResult = htmlResult + `<tr>                                   
            <td>${element.id}</td>                                    
            <td>${element.id_customer}</td>  
            <td>${element.start_order}</td>
            <td>${element.full_Detail_Address}</td>   
            <td>${element.payment_method}</td>                                    
            <td>
                <button data-id="${element.id}" class="Details">Xem</button>
            </td>                                                                                                            
            <td>
                <button data-id="${element.id}" class="nonConfirmOrder">Chưa Xác Nhận</button>
            </td> 
            <td>
                <button data-id="${element.id}" class="Remove">Xóa</button>
            </td>
        </tr>`;   
        }
        else if(element.status === 1){
            htmlResult = htmlResult + `<tr>                                   
            <td>${element.id}</td>                                    
            <td>${element.id_customer}</td> 
            <td>${element.start_order}</td>  
            <td>${element.full_Detail_Address}</td>   
            <td>${element.payment_method}</td>                                     
            <td>
                <button data-id="${element.id}" class="Details">Xem</button>
            </td>                                                                                                            
            <td>
                <button data-id="${element.id}" class="nonConfirmOrder confirmOrder">Đã Xác Nhận</button>
            </td> 
            <td>
                <button data-id="${element.id}" class="Remove">Xóa</button>
            </td>
        </tr>`;
        }
        else if(element.status === 2){
            htmlResult = htmlResult + `<tr>                                   
            <td>${element.id}</td>                                    
            <td>${element.id_customer}</td> 
            <td>${element.start_order}</td>   
            <td>${element.full_Detail_Address}</td>   
            <td>${element.payment_method}</td>                                    
            <td>
                <button data-id="${element.id}" class="Details">Xem</button>
            </td>                                                                                                            
            <td>
                <button data-id="${element.id}" class="nonConfirmOrder confirmOrder">Giao Hàng Thành Công</button>
            </td> 
            <td>
                <button data-id="${element.id}" class="Remove">Xóa</button>
            </td>
        </tr>`;     
        }
        else if(element.status === -1){
            htmlResult = htmlResult + `<tr>                                   
            <td>${element.id}</td>                                    
            <td>${element.id_customer}</td> 
            <td>${element.start_order}</td>   
            <td>${element.full_Detail_Address}</td>   
            <td>${element.payment_method}</td>                                  
            <td>
                <button data-id="${element.id}" class="Details">Xem</button>
            </td>                                                                                                            
            <td>
                <button data-id="${element.id}" class="cancelOrder ">Đã Bị Hủy</button>
            </td> 
            <td>
                <button data-id="${element.id}" class="Remove">Xóa</button>
            </td>
        </tr>`;  
        idCus = Number(element.id_customer);
        cancelOrder(idCus);
        }
    });
    // đưa kết quả toàn bộ danh mục vào tbody của table
    document.querySelector(".ordersTable").innerHTML = htmlResult;
}


function searchOrders(){
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const startDate = new Date(document.getElementById('startDate').value);
    const endDate = new Date(document.getElementById('endDate').value);
    const orderList = document.querySelectorAll(".ordersTable tr");
    
    for(let i = 0 ; i < orders.length ; i++){
        const orderDate = new Date(orders[i].start_order);
            if(orderDate >= startDate && orderDate <= endDate){
                orderList[i].style.display = "";
            }
            else{
                orderList[i].style.display = "none";
            }
        }
}

document.getElementById('order_status').addEventListener("click",e => {
    const orderList = document.querySelectorAll(".ordersTable tr");
    let order_status = document.getElementById('order_status').value;
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    for(let i = 0 ; i < orders.length ; i++){
        if(orders[i].status == order_status){
            orderList[i].style.display = "";
        }
        else{
            orderList[i].style.display = "none";
        }
    }
});

function handleProcessDetailData(event){
    const clicked = event.target;
    // lấy ra tất cả danh mục trong local
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    if(clicked.classList.contains("Remove") && confirm("Bạn Chắn Chắn Muốn Xóa ?")){
        const id_Delete = clicked.getAttribute("data-id");
        //mảng lọc ra phần tử cần delete
        const newFilterOrders = orders.filter(
            element => {
                return element.id != id_Delete;             
            }
        );
        //lưu vào localStorage
        localStorage.setItem("orders",JSON.stringify(newFilterOrders));
        //rerender web
        showOrderfromLocal();
        //console.log("delete");
    }
    else if(clicked.classList.contains("Details")){
        const idDetail = clicked.getAttribute("data-id");
        for(let i = 0; i < AdminContentMain.length; i++){
            AdminContentMain[i].classList.remove("Active");
        }
        AdminContentMain[6].classList.add("Active");
             
        //console.log(idDetail);
        const orders = JSON.parse(localStorage.getItem("orders")) || [];
        // lọc ra đơn hàng chính
        let detailOrder = orders.find(element => {
            return element.id == idDetail;
        });
        const detailProducts = detailOrder.cart;
        //console.log(detailProducts);
        let tongTien = 0;
        //từ đơn hàng chính truy xuất ra sản phẩm 
        //console.log(products);
        let htmlResult ='';
        detailProducts.forEach(e => {
            htmlResult = htmlResult + `<tr>
                                        <td>${e.id}</td>
                                        <td><img style=" width: 70px;" src="${getPathImage(e.image)}" alt="productImg"></td>
                                        <td>${e.name}</td>
                                        <td>${vnd(e.price)}</td>
                                        <td>${e.catagory}</td>
                                        <td>${e.quantity}</td>
                                        <td>${vnd((e.price) * (e.quantity))}</td>
                                    </tr>`;
            tongTien += (e.price) * (e.quantity);
        });
        htmlResult += `<tr class="totalDisplay">
                                            <td colspan="6">Tổng Cộng:</td>
                                            <td>${vnd(tongTien)}</td>
                                        </tr>`;
        
            // đưa kết quả toàn bộ danh mục vào tbody của table
            document.querySelector(".detailsTable").innerHTML = htmlResult;       
    } 
    else if(clicked.classList.contains("nonConfirmOrder")){
        const idConfirmOrder = clicked.getAttribute("data-id");
        const confirmedOrder  = orders.map(element =>{
            if(element.id == idConfirmOrder){   
                if(element.status === 0) {
                return {           
                    id: element.id,
                    id_customer : element.id_customer,
                    cart: element.cart,
                    status: 1,
                    start_order: element.start_order,
                    tongTien: element.tongTien,
                    full_Detail_Address: element.full_Detail_Address,
                    payment_method: element.payment_method
                    };
                }
                else{
                     return {
                        id: element.id,
                        id_customer : element.id_customer,
                        cart: element.cart,
                        status: 0,
                        start_order: element.start_order,
                        tongTien: element.tongTien,
                        full_Detail_Address: element.full_Detail_Address,
                        payment_method: element.payment_method
                        };
                    }
                }
                else{
                    return element;
                }
        });
        localStorage.setItem("orders",JSON.stringify(confirmedOrder));
        showOrderfromLocal();
    }  
}

document.querySelector(".ordersTable").addEventListener("click",handleProcessDetailData);

// thanh tìm kiếm
function handleFilterOrders(){
    const orderList = document.querySelectorAll(".ordersTable tr");
    // lấy tất cả products từ local ra 
    const orders = JSON.parse(localStorage.getItem("orders")) || []; 
    // chuyển đổi tên sản phẩm cần tìm về dạng chữ in thường
    const searchTerm = searchBar.value.toLowerCase(); 
    // duyệt mảng sản phẩm có tên sp chứa kí tự trong thanh tìm kiếm   
    for(let i=0;i<orders.length;i++){
        const cusID = orders[i].id_customer.toLowerCase(); 
        if(searchTerm != ""){
            if (cusID == searchTerm){
                orderList[i].style.display ="";
            }else{
                orderList[i].style.display ="none";
            }
        }else{
            showOrderfromLocal();
        }     
    } 
};
searchBar.addEventListener("keyup",handleFilterOrders);

//product add
const mainBtn = document.querySelector(".mainBtn");
// hàm hiển thị ảnh
// function getPathImage(path) {
//     const pathParts = path.split("\\");
//     const pathName = pathParts.pop();
//     return "./assets/img/products/" + pathName;
// }

function submitProductForm(event){
    const inputAllSelector = document.querySelectorAll(".addingForm .dataProducts input");
    let success = true;
    event.preventDefault();
    // thực hiện validate
    for(let i=0; i<inputAllSelector.length; i++){
        let inputAllValue = inputAllSelector[i].value;
        let inputAllValueName = inputAllSelector[i].name;
        let divErrorMessage = document.querySelectorAll(".addingForm .dataProducts .formGroup .errorMessage");
        if(inputAllValue ===""){
            inputAllSelector[i].classList.add("error");
            inputAllSelector[i].focus();
            let errorMessage = inputAllValueName + " Không Được Bỏ Trống";
            divErrorMessage[i].textContent = errorMessage;
            success = false;
        }else{
            inputAllSelector[i].classList.remove("error"); 
            divErrorMessage[i].textContent ="";       
        }
    }
    
    if(success){             
    const products = JSON.parse(localStorage.getItem("products")) || [];
    // Kiểm tra tên sản phẩm có tồn tại trong ds hay ko
    const ProductName = document.querySelector(".addingForm .dataProducts .ProductName").value;  
    let isProductNameExist = products.some(element =>{
            return element.ProductName === ProductName; 
        });
               
    // Nếu tên sản phẩm chưa tồn tại thì mới lưu thông tin sản phẩm vào localStorage
    if(isProductNameExist){
        document.querySelector(".addingForm .dataProducts .formGroup .ProductName").focus();
        document.querySelector(".addingForm .dataProducts .formGroup .ProductName").classList.add("error");
        document.querySelector(".addingForm .dataProducts .formGroup .errorMessage").textContent ="Sản Phẩm Đã Tồn Tại Trong DS"
    }else{
        document.querySelector(".addingForm .dataProducts .formGroup .ProductName").classList.remove("error");
        document.querySelector(".addingForm .dataProducts .formGroup .errorMessage").textContent ="";

        // tạo đối tượng product mới
        let dataForm = {}; 
        // 1.lấy dữ liệu input
        document.querySelectorAll(".addingForm input")
        .forEach( element => {            
                dataForm[element.name]=element.value;                         
        });
        dataForm["desc"] = document.getElementById("description").value;
        // console.log(dataForm);
        // 2.1 push đối tượng product vào mảng 
        // mỗi product cần phải có 1 ID unique để phân biệt
        dataForm["quantity"]=0;
        dataForm["status"] = 1;
        dataForm["id"] = products.length + 1;
        dataForm["price"] = Number(dataForm["price"]);
        const productsNew = [dataForm,...products];
        // 2.2 lưu trữ dữ liệu products đến localStorage
        localStorage.setItem("products", JSON.stringify(productsNew));
        //console.log(products);

        document.querySelectorAll(".addingForm input")
        .forEach( element => {
        element.value = '';        
        });
        //console.log(dataForm);
        // showProductfromLocal();
        window.onload = renderProducts();
    }
    }
};
mainBtn.addEventListener("click", submitProductForm);
// showProductfromLocal();

function findBestSeller(products)
 { let bestSeller = products[0];
     for (let i = 1; i < products.length; i++) { 
        if (products[i].quantity > bestSeller.quantity) 
            { 
                bestSeller = products[i]; 
            } 
        } 
        return bestSeller; 
    }

// product list
const products = JSON.parse(localStorage.getItem("products")) || [];
const updateBtn = document.querySelector(".updateBtn");

const itemsPerPage = 10;
let currentPage = 1;
// Hiển thị dữ liệu ngay lập tức khi thêm sản phẩm thành công
function renderProducts(){
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const productsTable = document.querySelector(".productsTable");
    productsTable.innerHTML = '';

    const startIndex = (currentPage - 1) * itemsPerPage; 
    const endIndex = startIndex + itemsPerPage;

    const productsToShow = products.slice(startIndex, endIndex);
    // xây dựng cấu trúc html cho danh mục
    let htmlResult ='';
    productsToShow.forEach(element =>{
        htmlResult = htmlResult + `<tr>                                   
                            <td>${element.id}</td>                                   
                            <td><img style=" width: 70px;" src="${getPathImage(element.image)}" alt="productImg"></td>                                    
                            <td>${element.name}</td>                                   
                            <td>${vnd(element.price)}</td>                                    
                            <td>${element.catagory}</td>   
                            <td>${element.quantity}</td>                                    
                            <td>${vnd(element.TongTien)}</td>                                                                     
                            <td><button data-id="${element.id}" class="Fix">Sửa</button>|<button data-id="${element.id}" class="Delete">Xóa</button>
                            |<button data-id="${element.id}" class="Details">DS Orders</button></td>
                        </tr>`;
    });

    // đưa kết quả toàn bộ danh mục vào tbody của table
    productsTable.innerHTML = htmlResult;

    const bestSeller = findBestSeller(products);
    let htmlBestSellerResult = `<tr><td style="padding:15px; font-weight: bold;">${bestSeller.name}</td></tr>`;

    document.querySelector(".productsSellerTable").innerHTML = htmlBestSellerResult;
} 
function renderPagination(){
    const paginationControls = document.getElementById('paginationControls'); 
    paginationControls.innerHTML = ''; 
    const totalPages = Math.ceil(products.length / itemsPerPage); 
    for (let i = 1; i <= totalPages; i++) { 
        const button = document.createElement('button'); 
        button.classList.add('paginationButton'); 
        button.textContent = i; 
        if (i === currentPage){ 
            button.disabled = true;
            button.classList.add("paginationButtonActive"); 
        } 
        button.addEventListener('click', () => { 
            currentPage = i;                      
            renderProducts(); 
            renderPagination();           
        }); 
        paginationControls.appendChild(button); 
    }
}  


function getPathImage(path) {
    const pathParts = path.split('\\');
    const pathName = pathParts.pop();
    return "./asset/image/" + pathName;
} 

function handleProcessData(event){
    const clicked = event.target;
    // lấy ra tất cả danh mục trong local
    const products = JSON.parse(localStorage.getItem("products")) || [];
    if(clicked.classList.contains("Delete") && confirm("Bạn Chắn Chắn Muốn Xóa ?")){
        const id_Delete = clicked.getAttribute("data-id");
        //console.log(id_Delete);
        // mảng lọc ra phần tử cần delete
        const newFilterProducts = products.filter(
            element => {
                return element.id != id_Delete;             
            }
        );
        //console.log(newFilterProducts);
        // lưu vào localStorage
        localStorage.setItem("products",JSON.stringify(newFilterProducts));
        // rerender web
        // showProductfromLocal()
        renderProducts();
    }

    else if(clicked.classList.contains("Fix")){
        // lấy id
    
        const idEdit = clicked.getAttribute("data-id");
        updateBtn.setAttribute("data-id",idEdit);

        const products = JSON.parse(localStorage.getItem("products")) || []; 
        const editingProduct = products.find(element => {
            if(element.id == idEdit){
                return element;
            }
        });
        // đưa value lên ô input đang chỉnh sửa 
        for(let i = 0; i < AdminContentMain.length; i++) {
            AdminContentMain[i].classList.remove("Active");
        }
        AdminContentMain[5].classList.add("Active");

        document.querySelectorAll(".FixingForm .dataProducts input").forEach(element =>{
            element.value = editingProduct[element.name];     
        });
        document.querySelector(".FixingForm .dataImgProduct input").value = null;
        // const elementEditing = products.find(
        //     element => {
        //         return element.id === idEdit;
        //     }
        // );
        // lưu element cần sửa vào local
        // localStorage.setItem("editedElement", JSON.stringify(elementEditing));
    }
    else if(clicked.classList.contains("Details")){
        const idDetail = clicked.getAttribute("data-id");

        for(let i = 0; i < AdminContentMain.length; i++){
            AdminContentMain[i].classList.remove("Active");
        }
        AdminContentMain[8].classList.add("Active");
             
        //console.log(idDetail);
        const orders = JSON.parse(localStorage.getItem("orders")) || [];
        // lọc ra đơn hàng chính
        const product_order = orders.filter(e => {
            return e.cart.find( i => {
                    return i.id == idDetail ;
            })
        });
        document.querySelector(".ordersDetailTable").innerHTML = "";
        let htmlResult = "";

        product_order.forEach(element => {
            if(element.status === 0){
                htmlResult = htmlResult + `<tr>                                   
                <td>${element.id}</td>                                    
                <td>${element.id_customer}</td>  
                <td>${element.start_order}</td>  
                <td>${element.full_Detail_Address}</td>   
                <td>${element.payment_method}</td>                                    
                <td>
                    <button data-id="${element.id}" class="Details">Xem</button>
                </td>                                                                                                            
                <td>
                    <button data-id="${element.id}" class="nonConfirmOrder">Chưa Xác Nhận</button>
                </td> 
                <td>
                    <button data-id="${element.id}" class="Remove">Xóa</button>
                </td>
            </tr>`;   
            }
            else if(element.status === 1){
                htmlResult = htmlResult + `<tr>                                   
                <td>${element.id}</td>                                    
                <td>${element.id_customer}</td> 
                <td>${element.start_order}</td> 
                <td>${element.full_Detail_Address}</td>   
            <td>${element.payment_method}</td>                                      
                <td>
                    <button data-id="${element.id}" class="Details">Xem</button>
                </td>                                                                                                            
                <td>
                    <button data-id="${element.id}" class="nonConfirmOrder confirmOrder">Đã Xác Nhận</button>
                </td> 
                <td>
                    <button data-id="${element.id}" class="Remove">Xóa</button>
                </td>
            </tr>`;
            }
            else if(element.status === 2){
                htmlResult = htmlResult + `<tr>                                   
                <td>${element.id}</td>                                    
                <td>${element.id_customer}</td> 
                <td>${element.start_order}</td>   
                <td>${element.full_Detail_Address}</td>   
            <td>${element.payment_method}</td>                                    
                <td>
                    <button data-id="${element.id}" class="Details">Xem</button>
                </td>                                                                                                            
                <td>
                    <button data-id="${element.id}" class="nonConfirmOrder confirmOrder">Giao Hàng Thành Công</button>
                </td> 
                <td>
                    <button data-id="${element.id}" class="Remove">Xóa</button>
                </td>
            </tr>`;     
            }
            else if(element.status === -1){
                htmlResult = htmlResult + `<tr>                                   
                <td>${element.id}</td>                                    
                <td>${element.id_customer}</td> 
                <td>${element.start_order}</td>     
                <td>${element.full_Detail_Address}</td>   
            <td>${element.payment_method}</td>                                
                <td>
                    <button data-id="${element.id}" class="Details">Xem</button>
                </td>                                                                                                            
                <td>
                    <button data-id="${element.id}" class="cancelOrder ">Đã Bị Hủy</button>
                </td> 
                <td>
                    <button data-id="${element.id}" class="Remove">Xóa</button>
                </td>
            </tr>`;  
        }
        });
        document.querySelector(".ordersDetailTable").innerHTML = htmlResult;
    }
}
document.querySelector(".ordersDetailTable").addEventListener("click",handleProcessDetailData);
// showProductfromLocal();
renderProducts();
renderPagination();
document.querySelector(".productsTable").addEventListener("click",handleProcessData);

// product edit
function handleUpdate(event){
    let success = true;
    const inputAllFixingSelector = document.querySelectorAll(".FixingForm .dataProducts input");
    event.preventDefault();
    // thực hiện validate
    for(let i=0; i<inputAllFixingSelector.length; i++){
        let inputAllValue = inputAllFixingSelector[i].value;
        let inputAllValueName = inputAllFixingSelector[i].name;
        let divErrorMessage = document.querySelectorAll(".FixingForm .dataProducts .formGroup .errorMessage");
        if(inputAllValue === ""){
            inputAllFixingSelector[i].classList.add("error");
            inputAllFixingSelector[i].focus();
            let errorMessage = inputAllValueName + " Không Được Bỏ Trống";
            divErrorMessage[i].textContent = errorMessage;
            success = false;
        }else{
            inputAllFixingSelector[i].classList.remove("error"); 
            divErrorMessage[i].textContent ="";       
        }
    }

    if(success){             
    const products = JSON.parse(localStorage.getItem("products")) || [];        
    const ProductName = document.querySelector(".FixingForm .dataProducts .formGroup .ProductName").value;
    const ProductType = document.querySelector(".FixingForm .dataProducts .formGroup .ProductType").value;
    const ProductSize = document.querySelector(".FixingForm .dataProducts .formGroup .ProductSize").value;
    const ProductPrice = document.querySelector(".FixingForm .dataProducts .formGroup .ProductPrice").value;
    const ProductImg = document.querySelector(".FixingForm .dataImgProduct input").value;
    const idUpdate = updateBtn.getAttribute("data-id");
    //console.log(idUpdate);
    if(ProductImg === "" || ProductImg === null){
        const productsUpdate = products.map(element =>{
            if(element.id == idUpdate){
                return {
                    id: element.id,
                    name: ProductName,
                    catagory: ProductType,
                    size: ProductSize,
                    price: ProductPrice,
                    image: element.image
                };
            }else{
                    return element;
                }
            });
            localStorage.setItem("products",JSON.stringify(productsUpdate));
    // showProductfromLocal();
    renderProducts();
    }
    else{
        const productsUpdate = products.map(element =>{
            if(element.id == idUpdate){
                return {
                    id: element.id,
                    name: ProductName,
                    catagory: ProductType,
                    size: ProductSize,
                    price: ProductPrice,
                    image: ProductImg
                };
            }else{
                    return element;
                }
            });
            localStorage.setItem("products",JSON.stringify(productsUpdate));
    // showProductfromLocal();
    renderProducts();
    }
    }
    for(let i = 0 ; i < AdminContentMain.length ; i++){
        AdminContentMain[i].classList.remove("Active");
    }
    AdminContentMain[3].classList.add("Active");
}
updateBtn.addEventListener("click",handleUpdate);


// thanh tìm kiếm

function handleFilterProducts(){
    // lấy tất cả products từ local ra 
    const products = JSON.parse(localStorage.getItem("products")) || []; 
    let htmlResult = '';
    document.querySelector(".productsTable").innerHTML = '';
    products.forEach(element => {
        htmlResult = htmlResult + `<tr>                                   
        <td>${element.id}</td>                                   
        <td><img style=" width: 70px;" src="${getPathImage(element.image)}" alt="productImg"></td>                                    
        <td>${element.name}</td>                                   
        <td>${vnd(element.price)}</td>                                    
        <td>${element.catagory}</td>                                                                       
        <td><button data-id="${element.id}" class="Fix">Sửa</button>|<button data-id="${element.id}" class="Delete">Xóa</button>|<button data-id="${element.id}" class="Details">DS Orders</button></td>
    </tr>`;
    });
    document.querySelector(".productsTable").innerHTML = htmlResult;
    const productList = document.querySelectorAll(".productsTable tr");
    // chuyển đổi tên sản phẩm cần tìm về dạng chữ in thường
    const searchTerm = searchBar.value.toLowerCase(); 
    // duyệt mảng sản phẩm có tên sp chứa kí tự trong thanh tìm kiếm   
    for(let i=0;i<products.length;i++){
        const productName = products[i].catagory.toLowerCase(); 
        if (productName.includes(searchTerm)){
            productList[i].style.display ="";
        }else{
            productList[i].style.display ="none";
        }
    } 
};
searchBar.addEventListener("keyup",handleFilterProducts);

document.querySelector(".returnPage").addEventListener("click", element => {
    element.preventDefault();
    for(let i = 0 ; i < AdminContentMain.length ; i++){
        AdminContentMain[i].classList.remove("Active");
    }
    AdminContentMain[2].classList.add("Active");
    //console.log(AdminContentMain);
});
document.querySelector(".returnProductPage").addEventListener("click", element => {
    element.preventDefault();
    for(let i = 0 ; i < AdminContentMain.length ; i++){
        AdminContentMain[i].classList.remove("Active");
    }
    AdminContentMain[3].classList.add("Active");
    //console.log(AdminContentMain);
});
// show thông tin tài khoản admin
const body = document.querySelector("body");
const modalContainer = document.querySelectorAll('.modal');
let modalBox = document.querySelectorAll('.mdl-cnt');

function closeModal() {
    modalContainer.forEach(item => {
        item.classList.remove('open');
    });
    body.style.overflow = "auto";
}

let container = document.querySelector('.info-admin .modal-container');
let formsg = document.querySelector('.modal.info-admin')

const currentuser = JSON.parse(localStorage.getItem("currentuser")) || [];

document.querySelector(".ri-arrow-down-s-fill").addEventListener("click", e => {
    let htmlResult = `<div>
                        Họ Tên: ${currentuser.fullname}
                        <br>
                        <br>
                        Số Điện Thoại: ${currentuser.phone}
                        <br>
                        <br>
                        Địa Chỉ: ${currentuser.address}
                        <br>
                        <br>
                        Email: ${currentuser.email}
                        <br>
                        <br>
                        Mật Khẩu: ${currentuser.password}
                        <br>
                        <br>
                        </div>`;
    document.querySelector(".infoAdminContainer").innerHTML = htmlResult;
    formsg.classList.add('open');
    container.classList.remove('active');
    body.style.overflow = "hidden";
    console.log(formsg);
});

// **************************************************************************************************************
    //hiệu ứng active cho sidebar
    // Lắng nghe sự kiện click cho tất cả các li trong sidebar
const sidebarItems = document.querySelectorAll('.Admin-sideBar-Content ul li a');

sidebarItems.forEach(item => {
    item.addEventListener('click', function() {
        // Loại bỏ lớp active từ tất cả các mục
        sidebarItems.forEach(i => i.classList.remove('active'));
        
        // Thêm lớp active vào mục hiện tại
        item.classList.add('active');
    });
});
//****************************************************************************************************************
window.onload = showOrderfromLocal();





    




