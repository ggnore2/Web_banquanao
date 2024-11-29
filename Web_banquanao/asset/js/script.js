function checkLogin() {
    let currentUser = JSON.parse(localStorage.getItem("currentuser"));
    if(currentUser == null || currentUser.userType == 0) {
        document.querySelector("body").innerHTML = `<div class="access-denied-section">
            <img class="access-denied-img" src="asset/image/40.jpg" alt="">
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

// chưa hoàn thành ( xác nhận đơn hàng thành công cho KH true /false)
// const confirm_order_display = document.querySelectorAll(".nonConfirmOrder");
// let confirm_order = false;

// for(let index = 0 ; index < confirm_order_display.length; index++){
//     confirm_order_display[index].addEventListener("click",event => {
//         event.preventDefault();
//         if(!confirm_order){
//             confirm_order_display[index].classList.add("confirmOrder");
//             confirm_order_display[index].textContent ="Đã Xác Nhận";
            
//         }
//     });
// }

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
                                    <td><button data-id=${element.id} class="Delete">Xóa</button></td>
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
}
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


// order list 
// const orders = [{id: "123",cusID: "999",Products:[{idProduct:"b3ba0c41-6514-4043-aa4c-ccbb801860f7" , soLuong: 2},
//                 {idProduct:"79f87cc3-dfa1-4d12-9a26-c30464a62681", soLuong: 1}],tongTien:170000},
//                 {id:"456",cusID:"357",Products:[{idProduct:"b4a31cb2-1335-47fc-957e-353001b0efc4",soLuong:1}] , tongTien:50000}];

// localStorage.setItem("orders",JSON.stringify(orders));

function showOrderfromLocal() {
    // lấy toàn bộ danh mục trong local
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    // xây dựng cấu trúc html cho danh mục
    let htmlResult ='';
    orders.forEach(element =>{
        htmlResult = htmlResult + `<tr>                                   
                                    <td>${element.id}</td>                                    
                                    <td>${element.id_customer}</td>                                    
                                    <td>
                                        <button data-id="${element.id}" class="Details">Xem</button>
                                    </td>                                                                                                            
                                    <td><button class="nonConfirmOrder">Chưa Xác Nhận</button></td>                                    
                                    <td><button data-id="${element.id}" class="Remove">Xóa</button></td>
                                </tr>`;
    });
    // đưa kết quả toàn bộ danh mục vào tbody của table
    document.querySelector(".ordersTable").innerHTML = htmlResult;
}

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
        console.log("delete");
    }
    else if(clicked.classList.contains("Details")){
        const idDetail = clicked.getAttribute("data-id");
        for(let i = 0; i < AdminContentMain.length; i++){
            AdminContentMain[i].classList.remove("Active");
        }
        AdminContentMain[6].classList.add("Active");
             
        console.log(idDetail);
        const orders = JSON.parse(localStorage.getItem("orders")) || [];
        // lọc ra đơn hàng chính
        let detailOrder = orders.find(element => {
            return element.id == idDetail;
        });
        const detailProducts = detailOrder.cart;
        console.log(detailProducts);
        let tongTien = 0;
        //từ đơn hàng chính truy xuất ra sản phẩm 
        console.log(products);
        let htmlResult ='';
        detailProducts.forEach(e => {
            htmlResult = htmlResult + `<tr>
                                        <td>${e.id}</td>
                                        <td><img style=" width: 70px;" src="${getPathImage(e.image)}" alt="productImg"></td>
                                        <td>${e.name}</td>
                                        <td>${e.price}</td>
                                        <td>${e.catagory}</td>
                                        <td>${e.quantity}</td>
                                        <td>${(e.price) * (e.quantity)}</td>
                                    </tr>`;
            tongTien += (e.price) * (e.quantity);
        });
        htmlResult += `<tr class="totalDisplay">
                                            <td colspan="6">Tổng Cộng:</td>
                                            <td>${tongTien}đ</td>
                                        </tr>`;
        
            // đưa kết quả toàn bộ danh mục vào tbody của table
            document.querySelector(".detailsTable").innerHTML = htmlResult;       
    }    }

document.querySelector(".ordersTable").addEventListener("click",handleProcessDetailData);

// thanh tìm kiếm
const orderList = document.querySelectorAll(".ordersTable tr");

function handleFilterOrders(){
    // lấy tất cả products từ local ra 
    const orders = JSON.parse(localStorage.getItem("orders")) || []; 
    // chuyển đổi tên sản phẩm cần tìm về dạng chữ in thường
    const searchTerm = searchBar.value.toLowerCase(); 
    // duyệt mảng sản phẩm có tên sp chứa kí tự trong thanh tìm kiếm   
    for(let i=0;i<orders.length;i++){
        const orderID = orders[i].id.toLowerCase(); 
        if (orderID.includes(searchTerm)){
            orderList[i].style.display ="";
        }else{
            orderList[i].style.display ="none";
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
        dataForm["status"] = 1;
        dataForm["id"] = products.length + 1;
        dataForm["price"] = Number(dataForm["price"]);
        const productsNew = [dataForm,...products];
        // 2.2 lưu trữ dữ liệu products đến localStorage
        localStorage.setItem("products", JSON.stringify(productsNew));
        console.log(products);

        document.querySelectorAll(".addingForm input")
        .forEach( element => {
        element.value = '';        
        });
        console.log(dataForm);
        // showProductfromLocal();
        window.onload = renderProducts();
    }
    }
};
mainBtn.addEventListener("click", submitProductForm);
// showProductfromLocal();



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
                            <td>${element.price}</td>                                    
                            <td>${element.catagory}</td>                                                                       
                            <td><button data-id="${element.id}" class="Fix">Sửa</button>|<button data-id="${element.id}" class="Delete">Xóa</button></td>
                        </tr>`;
    });
    // đưa kết quả toàn bộ danh mục vào tbody của table
    productsTable.innerHTML = htmlResult;
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
// function extractFileName() { 
//     const fileInput = document.getElementById('ProductImg');
//      if (fileInput.files.length > 0) {
//         // Get the file name directly from the File object 
//         const fileName = fileInput.files[0].name; console.log("File name:", fileName); 
//         alert("File name: " + fileName); 
//     } 
//         else { 
//             console.log("No file selected."); 
//         }
//      }
// extractFileName();
// function getPathImage2(path){
//     const filePath = "C:\\fakepath\\6.jpg";

// // Find the last index of the backslash
// const lastIndex = path.lastIndexOf('\\');

// // Extract the substring starting just after the last backslash
// const fileName = filePath.substring(lastIndex + 1);

// console.log("File name:", fileName);

// }

function handleProcessData(event){
    const clicked = event.target;
    // lấy ra tất cả danh mục trong local
    const products = JSON.parse(localStorage.getItem("products")) || [];
    if(clicked.classList.contains("Delete") && confirm("Bạn Chắn Chắn Muốn Xóa ?")){
        const id_Delete = clicked.getAttribute("data-id");
        console.log(id_Delete);
        // mảng lọc ra phần tử cần delete
        const newFilterProducts = products.filter(
            element => {
                return element.id != id_Delete;             
            }
        );
        console.log(newFilterProducts);
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

}
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
    console.log(idUpdate);
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
        <td>${element.price}</td>                                    
        <td>${element.catagory}</td>                                                                       
        <td><button data-id="${element.id}" class="Fix">Sửa</button>|<button data-id="${element.id}" class="Delete">Xóa</button></td>
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
    console.log(AdminContentMain);
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





    




