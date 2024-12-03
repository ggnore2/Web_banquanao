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
document.querySelector(".return").addEventListener("click", e => {
  window.location.href="index.html";
});
//lỗi thông tin trống trang thanh toán
function submitPayment(event) {
    event.preventDefault(); // Ngừng hành động mặc định của nút submit (chuyển trang)
    const inputs = document.querySelectorAll('.address-form .form-group input, .address-form .form-group select, .agreement input'); 
    const agreeCheckbox = document.getElementById('agree');
    let success = true;
    inputs.forEach(input => {
        const inputValue = input.value;
        const errorMessageDiv = input.nextElementSibling;
        console.log(errorMessageDiv);
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
      const paymentMethod = document.getElementById('pttt');
      const method = paymentMethod.value;
      const addressDetail = document.getElementById("address").value;
      const City = document.getElementById("city").value;
      const District = document.getElementById("district").value;
      const Ward = document.getElementById("ward").value;
      axios.get('https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json')
  .then(function(response){
      const data = response.data;
      const city = data.find(city => city.Id === City);
      const district = city.Districts.find(district => district.Id === District);
      const ward = district.Wards.find(ward => ward.Id === Ward);
      const fullDetailAddress = addressDetail +","+ ward.Name+","+ district.Name +","+ city.Name;
      const orders = JSON.parse(localStorage.getItem("orders"))||[];
      const updateOrders = orders.map(element => {
        if(element.id === orders[orders.length - 1].id){
          return {
            id: element.id,
            id_customer : element.id_customer,
            cart: element.cart,
            status: element.status,
            start_order: element.start_order,
            tongTien: element.tongTien,
            full_Detail_Address: fullDetailAddress,
            payment_method: method
          }
        }
        else{
          return element;
        }
      });
      localStorage.setItem("orders",JSON.stringify(updateOrders));
    })
      if (method === 'cash') {
        window.alert('Bạn đã chọn thanh toán bằng tiền mặt.');
        window.location.href ="index.html";
      } else {
        const cardNumber = document.getElementById('card-number').value;
        const cardName = document.getElementById('card-name').value;
        const expiryDate = document.getElementById('expiry-date').value;
        const cvv = document.getElementById('cvv').value;

        if (cardNumber!=='' && cardName!=='' && expiryDate!=='' && cvv!=='') {
          window.alert('Thanh toán bằng ATM thành công!');
          window.location.href="index.html";
        } else {
          window.alert('Vui lòng nhập đầy đủ thông tin thẻ.');
        }
      }
    }
}
const mainBtn = document.querySelector(".btn-payment");
mainBtn.addEventListener("click", submitPayment);
// **************************************************************************

function initializePayment() {
    const paymentMethod = document.getElementById('pttt');
    const dynamicContent = document.getElementById('dynamic-content');

    // Xử lý sự kiện khi thay đổi phương thức thanh toán
    paymentMethod.addEventListener('change', function () {
      if (paymentMethod.value === 'atm') {
        dynamicContent.innerHTML = `
          <div class="form-atm">
            <label for="card-number">Số thẻ:</label>
            <input type="text" id="card-number" placeholder="Nhập số thẻ">
          </div>
          <div class="form-atm">
            <label for="card-name">Tên chủ thẻ:</label>
            <input type="text" id="card-name" placeholder="Nhập tên chủ thẻ">
          </div>
          <div class="form-atm">
            <label for="expiry-date">Ngày hết hạn:</label>
            <input type="month" id="expiry-date">
          </div>
          <div class="form-atm">
            <label for="cvv">CVV:</label>
            <input type="password" id="cvv" placeholder="Nhập CVV">
          </div>
        `;
      } else {
        dynamicContent.innerHTML = '';
      }
    });
  }


  // Khởi chạy hàm khi tải trang
  window.onload = initializePayment();