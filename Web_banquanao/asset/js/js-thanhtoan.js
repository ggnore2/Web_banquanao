function getPathImage(path) {
    const pathParts = path.split('\\');
    const pathName = pathParts.pop();
    return "./asset/image/" + pathName;
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
                        <div><p class="price-sp">Giá: ${element.price}</p></div>
                        <div><p class="quantity-sp">Số Lượng${element.quantity}</p></div>
                        <div><input type="text" class="voucher-code" placeholder="Nhập mã voucher">
                            <button class="apply-voucher-btn" onclick="applyVoucher()">Áp dụng</button></div>
                    </li>`;
        tongTien += element.quantity * element.price;
    });
    document.querySelector(".total-sp").innerHTML = `<h1>Tổng Tiền: ${tongTien} VND</h1>`;
}else {
    cart_buy_now.forEach(element => {
        htmlResult += `<li>
                        <div><img class="img-sp" src="${getPathImage(element.image)}"></div>
                        <div class="name-sp">Tên Sản Phẩm: ${element.name}</div>
                        <div><p class="price-sp">Giá: ${element.price}</p></div>
                        <div><p class="quantity-sp">Số Lượng: ${element.quantity}</p></div>
                        <div><input type="text" class="voucher-code" placeholder="Nhập mã voucher">
                            <button class="apply-voucher-btn" onclick="applyVoucher()">Áp dụng</button></div>
                    </li>`;
        tongTien = element.price
    });
    document.querySelector(".total-sp").innerHTML = `<h1>Tổng Tiền: ${tongTien} VND</h1>`;
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
document.querySelector(".btn-payment").addEventListener("click", element=>{
    element.preventDefault();
    console.log("123");
    window.location.href="index.html";
});

document.querySelector(".material-icons").addEventListener("click", e => {
    window.location.href="index.html";
});