function getPathImage(path) {
    const pathParts = path.split('\\');
    const pathName = pathParts.pop();
    return "./asset/image/" + pathName;
}
function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}

function renderCart(){
    let tongTien = 0 ;
    const cart = JSON.parse(localStorage.getItem("cart")) || [] ;
    const cart_buy_now = JSON.parse(localStorage.getItem("cart_buy_now")) || [];
    const cartFake = JSON.parse(localStorage.getItem("cartFake")) || [];
    let htmlResult = "";
    if(JSON.parse(localStorage.getItem("cart"))){
    cart.forEach(element => {
        htmlResult += `<li>
                        <div><img class="img-sp" src="${getPathImage(element.image)}"></div>
                        <div class="name-sp">Tên Sản Phẩm: ${element.name}</div>
                        <div><p class="price-sp">Giá: ${formatCurrency(element.price)}</p></div>
                        <div><p class="quantity-sp">Số Lượng${element.quantity}</p></div>
                        <div><input type="text" class="voucher-code" placeholder="Nhập mã voucher">
                            <button class="apply-voucher-btn" onclick="applyVoucher()">Áp dụng</button></div>
                    </li>`;
        tongTien += element.quantity * element.price;
    });
    document.querySelector(".total-sp").innerHTML = `<h1>Tổng Tiền: ${formatCurrency(tongTien)} VND</h1>`;
}else {
    cart_buy_now.forEach(element => {
        htmlResult += `<li>
                        <div><img class="img-sp" src="${getPathImage(element.image)}"></div>
                        <div class="name-sp">Tên Sản Phẩm: ${element.name}</div>
                        <div><p class="price-sp">Giá: ${formatCurrency(element.price)}</p></div>
                        <div><p class="quantity-sp">Số Lượng: ${element.quantity}</p></div>
                        <div><input type="text" class="voucher-code" placeholder="Nhập mã voucher">
                            <button class="apply-voucher-btn" onclick="applyVoucher()">Áp dụng</button></div>
                    </li>`;
        tongTien += element.price * element.quantity;
    });
    document.querySelector(".total-sp").innerHTML = `<h1>Tổng Tiền: ${formatCurrency(tongTien)} VND</h1>`;
}
    document.querySelector(".cartContainer").innerHTML = htmlResult;
    localStorage.removeItem("cart_buy_now");
    localStorage.setItem("cart",JSON.stringify(cartFake));
    localStorage.removeItem("cartFake");
}
renderCart();
// Hàm để áp dụng voucher
function applyVoucher() {
    const voucherCode = document.querySelector('.voucher-code').value;
    
    if (voucherCode) {
        alert(`Voucher "${voucherCode}" đã được áp dụng!`);
        toggleVoucherPopup(); // Đóng popup sau khi áp dụng voucher
    } else {
        alert('Vui lòng nhập mã voucher.');
    }
}
// document.querySelector(".btn-payment").addEventListener("click", element=>{
//     element.preventDefault();
//     window.location.href="index.html";
// });

document.querySelector(".material-icons").addEventListener("click", e => {
    window.location.href="index.html";
});
//lỗi thông tin trống trang thanh toán
function submitPayment(event) {
    event.preventDefault(); // Ngừng hành động mặc định của nút submit (chuyển trang)
    const inputs = document.querySelectorAll('.address-form .form-group input, .address-form .form-group select, .agreement input'); // Chọn tất cả các input và select
    const agreeCheckbox = document.getElementById('agree');
    let success = true;
    inputs.forEach(input => {
        const inputValue = input.value;
        const errorMessageDiv = input.nextElementSibling; 
        if (inputValue === "") {
            if (!errorMessageDiv) {
                const errorDiv = document.createElement('div');
                errorDiv.classList.add('errorMessage');
                input.parentNode.appendChild(errorDiv);
            }
            input.classList.add("error"); 
            input.focus();
            input.nextElementSibling.textContent = input.name + " không được bỏ trống"; // Hiển thị thông báo lỗi
            success = false; //
        } else {
            input.classList.remove("error");
            if (errorMessageDiv) {
                errorMessageDiv.textContent = ""; // Xóa thông báo lỗi
            }
        }
    });
    if (!agreeCheckbox.checked) {
        const errorMessageDiv = agreeCheckbox.nextElementSibling;
        if (!errorMessageDiv) {
            const errorDiv = document.createElement('div');
            errorDiv.classList.add('errorMessage');
            agreeCheckbox.parentNode.appendChild(errorDiv);
        }
        agreeCheckbox.classList.add("error");
        agreeCheckbox.nextElementSibling.textContent = "Bạn phải đồng ý với các điều khoản và chính sách.";
        success = false;
    } else {
        agreeCheckbox.classList.remove("error");
        const errorMessageDiv = agreeCheckbox.nextElementSibling;
        if (errorMessageDiv) {
            errorMessageDiv.textContent = ""; // Xóa thông báo lỗi
        }
    }
    if (success) {
        window.location.href = "index.html";
    }
}
const mainBtn = document.querySelector(".btn-payment");
mainBtn.addEventListener("click", submitPayment);

