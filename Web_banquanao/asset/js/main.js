const body = document.querySelector("body");
const listProductHTML = document.querySelector('.listProduct');
const cartTab = document.getElementById('cartTab');
const overlay = document.getElementById('overlay');
const cartContent = document.querySelector('.cart-content');
const totalPriceElement = document.getElementById('totalPrice');
const toastContainer = document.getElementById('toast-container');
const modalContainer = document.querySelectorAll('.modal');
let modalBox = document.querySelectorAll('.mdl-cnt');

function getPathImage(path) {
    const pathParts = path.split('\\');
    const pathName = pathParts.pop();
    return "./asset/image/" + pathName;
} 

function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}

function showAllProducts() {
    renderProductsForPage(currentPage); // Hiển thị sản phẩm theo phân trang
    renderPaginationControls(); // Hiển thị các nút phân trang

    // Hiện lại phân trang
    const paginationContainer = document.querySelector('.pagination-controls');
    paginationContainer.classList.remove('hidden');
    scrollToSection();
}

function showSection(sectionId) {
    // Ẩn tất cả các phần nội dung
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active'); // Xóa trạng thái active
    });

    // Hiển thị phần được chọn
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.classList.add('active');
    }

    // Nếu chọn phần "Sản phẩm", hiển thị lại danh sách sản phẩm
    if (sectionId === 'products') {
        renderProducts(); // Gọi hàm hiển thị sản phẩm
        
    }
}


// Mặc định hiển thị Trang chủ
document.addEventListener('DOMContentLoaded', () => {
    showSection('home');
});


function scrollToSection() {
    const productSection = document.querySelector('.tieude'); // Đoạn bạn muốn scroll tới
    setTimeout(() => {
        productSection.scrollIntoView({ behavior: 'smooth' });
    }, 0); // Đợi DOM render xong rồi mới scroll
}




function closeModal() {
    modalContainer.forEach(item => {
        item.classList.remove('open');
    });
    console.log(modalContainer)
    body.style.overflow = "auto";
}


//-----------------Tim kiem co ban---------------------
function searchProducts() {
    const paginationContainer = document.querySelector('.pagination-controls');
    const searchInput = document.querySelector('.form-search-input').value.toLowerCase();
    if (searchInput === "") {
        // Nếu ô tìm kiếm trống, hiển thị trang chủ
        showSection('home');
        return;
    }
    
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchInput) ||
        product.desc.toLowerCase().includes(searchInput)
    );

    if (filteredProducts.length === 0) {
        // Hiển thị thông báo không tìm thấy sản phẩm
        document.querySelector('.listProduct').innerHTML = `
            <div class="no-result">
                <div class="no-result-h">Không tìm thấy kết quả</div>
                <div class="no-result-p">Xin lỗi, chúng tôi không tìm thấy sản phẩm phù hợp với tìm kiếm của bạn.</div>
                <div class="no-result-i"><i class="fa-solid fa-face-sad-cry"></i></div>
            </div>`;
    } else {
        // Hiển thị danh sách sản phẩm đã lọc
        renderProducts(filteredProducts);
        paginationContainer.classList.add('hidden');
    }
}

let cart = [];
//------Gio hang-------------
function openCart() {
    cartTab.style.right = '20px'; // Mở giỏ hàng
    overlay.classList.add('show'); // Hiển thị overlay làm mờ
    body.style.overflow = 'hidden'; // Ngừng cuộn trang
}

// Đóng giỏ hàng
function closeCart() {
    cartTab.style.right = '-500px'; // Đóng giỏ hàng
    overlay.classList.remove('show'); // Ẩn overlay
    body.style.overflow = 'auto'; // Bật lại cuộn trang
}




// Chức năng giỏ hàng
function updateCartBadge() { // Cập nhật
    const cartBadge = document.querySelector('.count-product-cart');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    cartBadge.textContent = totalItems;


    // Thêm hiệu ứng
    cartBadge.classList.add('animate');
    setTimeout(() => {
        cartBadge.classList.remove('animate');
    }, 300);

}

function adjustQuantity(productId, action) {
    const product = cart.find(item => item.id === productId);
    if (product) {
        if (action === 'increase') {
            product.quantity += 1;
        } else if (action === 'decrease') {
            product.quantity -= 1;
            if (product.quantity <= 0) {
                removeFromCart(productId);
                return; // Không còn sp thì dừng
            }
        }
    }
    updateCartDisplay(); // Hiển thị trong giỏ hàng
    saveCartToLocalStorage(); // Lưu lại trên local storage
    updateCartBadge(); // Cập nhât trên icon giỏ hàng
}

//  Hiển thị trong giỏ hàng
function updateCartDisplay() {
    const cartContent = document.querySelector('.cart-content');
    cartContent.innerHTML = ''; // Clear previous content

    let total = 0;

    if (cart.length === 0) {
        cartContent.innerHTML = '<p>Không có sản phẩm nào trong giỏ hàng.</p>';
    } else {
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            const itemSize = item.size === undefined ? 'Chưa chọn size' : item.size;

            const cartItemHTML = `
                <div class="cart-item">
                    <div class="cart-item-details">
                        <span class="cart-item-name">${item.name}</span>
                        
                        <span class="cart-item-price">${formatCurrency(itemTotal)}</span>
                    </div>
                    <span class="cart-item-size">Kích thước: ${itemSize}</span>
                    <div class="cart-item-controls">
                        <div class="quantity-controls">
                            <button onclick="adjustQuantity(${item.id}, 'decrease')">-</button>
                            <span class="cart-item-quantity">${item.quantity}</span>
                            <button onclick="adjustQuantity(${item.id}, 'increase')">+</button>
                        </div>
                        <button class="remove-button" onclick="removeFromCart(${item.id})">Xóa</button>
                    </div>
                </div>
            `;
            cartContent.innerHTML += cartItemHTML;
        });
    }

    const totalPriceElement = document.getElementById('totalPrice');
    totalPriceElement.textContent = formatCurrency(total);
}

// Thêm vào giỏ hàng
function addToCart(productId) {
    const product = products.find(item => item.id === productId);
    const existingProduct = cart.find(item => item.id === productId);

    if (existingProduct) {
        existingProduct.quantity += 1; // Số lượng tăng
        showToast(`Đã có ${existingProduct.quantity} ${product.name} trong giỏ hàng`);
    } else {
        cart.push({ ...product, quantity: 1 }); // Thêm sp chưa có vào giỏ hàng
        showToast(`${product.name} đã được thêm váo giỏ hàng.`);
    }

    updateCartDisplay();
    saveCartToLocalStorage();
    updateCartBadge();
}

// Xóa khỏi giỏ hàng
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
    saveCartToLocalStorage();
    updateCartBadge();
}

// Lưu vào localstorage
function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Tải dữ liệu localStorage
function loadCartFromLocalStorage() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        cart = JSON.parse(storedCart);
        updateCartDisplay();
        updateCartBadge();
    }
}

// 
function addCartButtonListeners() {
    const addCartButtons = document.querySelectorAll('.addCart');
    addCartButtons.forEach(button => {
        button.onclick = () => {
            const productId = parseInt(button.parentElement.dataset.id);
            addToCart(productId);
        };
    });
}

// Khởi tạo giỏ hàng
function initializeCart() {
    loadCartFromLocalStorage();
    addCartButtonListeners();
}
//-------Slide---------
let slideIndex = 1;
let slideInterval;

// Initialize the slideshow
document.addEventListener('DOMContentLoaded', () => {
    showSlides(slideIndex);
    startAutoSlide();
});

// Display the current slide
function showSlides(n) {
    const slides = document.querySelectorAll('#slideshow-wrapper .slide');
    const dots = document.querySelectorAll('#slideshow-wrapper .dot');

    if (n > slides.length) slideIndex = 1;
    if (n < 1) slideIndex = slides.length;

    slides.forEach(slide => slide.style.display = 'none');
    dots.forEach(dot => dot.classList.remove('active'));

    slides[slideIndex - 1].style.display = 'block';
    dots[slideIndex - 1].classList.add('active');
}

// Navigate between slides
function changeSlide(n) {
    clearInterval(slideInterval); // Stop auto-slide on manual interaction
    showSlides(slideIndex += n);
    startAutoSlide(); // Restart auto-slide
}

// Jump to a specific slide
function currentSlide(n) {
    clearInterval(slideInterval);
    showSlides(slideIndex = n);
    startAutoSlide();
}

// Auto-slide functionality
function startAutoSlide() {
    slideInterval = setInterval(() => {
        showSlides(slideIndex += 1);
    }, 3000); // Change slide every 3 seconds
}




//---------------------------------------- Dang nhap & Dang ky--------------------------------

// Chuyen doi qua lai SignUp & Login 
let signup = document.querySelector('.signup-link');
let login = document.querySelector('.login-link');
let container = document.querySelector('.signup-login .modal-container');
login.addEventListener('click', () => {
    container.classList.add('active');
})

signup.addEventListener('click', () => {
    container.classList.remove('active');
})

let signupbtn = document.getElementById('signup');
let loginbtn = document.getElementById('login');
let formsg = document.querySelector('.modal.signup-login')
signupbtn.addEventListener('click', () => {
    formsg.classList.add('open');
    container.classList.remove('active');
    body.style.overflow = "hidden";
})

loginbtn.addEventListener('click', () => {
    document.querySelector('.form-message-check-login').innerHTML = '';
    formsg.classList.add('open');
    container.classList.add('active');
    body.style.overflow = "hidden";
})
// Kiểm tra xem có tài khoản đăng nhập không ?
function kiemtradangnhap() {
    let currentUser = localStorage.getItem('currentuser');
    if (currentUser != null) {
        let user = JSON.parse(currentUser);
        document.querySelector('.auth-container').innerHTML = `<span class="text-dndk">Tài khoản</span>
            <span class="text-tk" data-id="${user.id}" >${user.fullname} <i class="fa-sharp fa-solid fa-caret-down"></span>`
        document.querySelector('.header-middle-right-menu').innerHTML = `<li><a href="javascript:;" onclick="myAccount()"><i class="fa-light fa-circle-user"></i> Tài khoản của tôi</a></li>
            <li class="border"><a id="logout" href="javascript:;"><i class="fa-light fa-right-from-bracket"></i> Đăng xuất </a></li>`
        document.querySelector('#logout').addEventListener('click', logOut)
    }
}

// // Kiểm tra xem có tài khoản đăng nhập không ?
// function kiemtradangnhap() {
//     let currentUser = localStorage.getItem('currentuser');
//     if (currentUser != null) {
//         let user = JSON.parse(currentUser);
//         document.querySelector('.auth-container').innerHTML = `<span class="text-dndk">Tài khoản</span>
//             <span class="text-tk">${user.fullname} <i class="fa-sharp fa-solid fa-caret-down"></span>`
//         document.querySelector('.header-middle-right-menu').innerHTML = `<li><a href="javascript:;" onclick="myAccount()"><i class="fa-light fa-circle-user"></i> Tài khoản của tôi</a></li>
//             <li><a href="javascript:;" onclick="orderHistory()"><i class="fa-regular fa-bags-shopping"></i> Đơn hàng đã mua</a></li>
//             <li class="border"><a id="logout" href="javascript:;"><i class="fa-light fa-right-from-bracket"></i> Thoát tài khoản</a></li>`
//         document.querySelector('#logout').addEventListener('click', logOut)
//     }
// }
// Dang nhap & Dang ky
function modalCloseForm() {
    document.querySelectorAll('.modal').forEach(element => {
        element.classList.remove("open");
    });
    body.style.overflow = "auto";
}
// Chức năng đăng ký
let signupButton = document.getElementById('signup-button');
let loginButton = document.getElementById('login-button');
signupButton.addEventListener('click', () => {
    event.preventDefault();
    let fullNameUser = document.getElementById('fullname').value;
    let phoneUser = document.getElementById('phone').value;
    let passwordUser = document.getElementById('password').value;
    let passwordConfirmation = document.getElementById('password_confirmation').value;
    let checkSignup = document.getElementById('checkbox-signup').checked;
    // Check validate
    if (fullNameUser.length == 0) {
        document.querySelector('.form-message-name').innerHTML = 'Vui lòng nhập họ vâ tên';
        document.getElementById('fullname').focus();
    } else if (fullNameUser.length < 3) {
        document.getElementById('fullname').value = '';
        document.querySelector('.form-message-name').innerHTML = 'Vui lòng nhập họ và tên lớn hơn 3 kí tự';
    } else {
        document.querySelector('.form-message-name').innerHTML = '';
    }
    if (phoneUser.length == 0) {
        document.querySelector('.form-message-phone').innerHTML = 'Vui lòng nhập vào số điện thoại';
    } else if (phoneUser.length != 10) {
        document.querySelector('.form-message-phone').innerHTML = 'Vui lòng nhập vào số điện thoại 10 số';
        document.getElementById('phone').value = '';
    } else {
        document.querySelector('.form-message-phone').innerHTML = '';
    }
    if (passwordUser.length == 0) {
        document.querySelector('.form-message-password').innerHTML = 'Vui lòng nhập mật khẩu';
    } else if (passwordUser.length < 6) {
        document.querySelector('.form-message-password').innerHTML = 'Vui lòng nhập mật khẩu lớn hơn 6 kí tự';
        document.getElementById('password').value = '';
    } else {
        document.querySelector('.form-message-password').innerHTML = '';
    }
    if (passwordConfirmation.length == 0) {
        document.querySelector('.form-message-password-confi').innerHTML = 'Vui lòng nhập lại mật khẩu';
    } else if (passwordConfirmation !== passwordUser) {
        document.querySelector('.form-message-password-confi').innerHTML = 'Mật khẩu không khớp';
        document.getElementById('password_confirmation').value = '';
    } else {
        document.querySelector('.form-message-password-confi').innerHTML = '';
    }
    if (checkSignup != true) {
        document.querySelector('.form-message-checkbox').innerHTML = 'Vui lòng check đăng ký';
    } else {
        document.querySelector('.form-message-checkbox').innerHTML = '';
    }
    let accounts = localStorage.getItem('accounts') ? JSON.parse(localStorage.getItem('accounts')) : [];
    if (fullNameUser && phoneUser && passwordUser && passwordConfirmation && checkSignup) {
        if (passwordConfirmation == passwordUser) {
            let user = {
                fullname: fullNameUser,
                phone: phoneUser,
                password: passwordUser,
                address: '',
                email: '',
                status: 1,
                join: new Date(),
                cart: [],
                userType: 0,
                id: accounts.length + 1
            }
            let checkloop = accounts.some(account => {
                return account.phone == user.phone;
            })
            if (!checkloop) {
                accounts.push(user);
                localStorage.setItem('accounts', JSON.stringify(accounts));
                localStorage.setItem('currentuser', JSON.stringify(user));
                showToast(`Đăng ký thành công`);
                modalCloseForm();
                kiemtradangnhap();
                updateAmount();
            } else {
                showToast(`Tài khoản đã tồn tại`);
            }
        } else {
            showToast(`Sai mật khẩu`);
        }
    }
}
)

// Dang nhap
loginButton.addEventListener('click', () => {
    event.preventDefault();
    let phonelog = document.getElementById('phone-login').value;
    let passlog = document.getElementById('password-login').value;
    let accounts = JSON.parse(localStorage.getItem('accounts'));

    if (phonelog.length == 0) {
        document.querySelector('.form-message.phonelog').innerHTML = 'Vui lòng nhập vào số điện thoại';
    } else if (phonelog.length != 10) {
        document.querySelector('.form-message.phonelog').innerHTML = 'Vui lòng nhập vào số điện thoại 10 số';
        document.getElementById('phone-login').value = '';
    } else {
        document.querySelector('.form-message.phonelog').innerHTML = '';
    }

    if (passlog.length == 0) {
        document.querySelector('.form-message-check-login').innerHTML = 'Vui lòng nhập mật khẩu';
    } else if (passlog.length < 6) {
        document.querySelector('.form-message-check-login').innerHTML = 'Vui lòng nhập mật khẩu lớn hơn 6 kí tự';
        document.getElementById('passwordlogin').value = '';
    } else {
        document.querySelector('.form-message-check-login').innerHTML = '';
    }

    if (phonelog && passlog) {
        let vitri = accounts.findIndex(item => item.phone == phonelog);
        if (vitri == -1) {
            showToast(`Tài khoản của bạn không tồn tại`)
        } else if (accounts[vitri].password == passlog) {
            if (accounts[vitri].status == 0) {
                showToast(`Tài khoản của bạn đã bị khóa`)
            } else {
                localStorage.setItem('currentuser', JSON.stringify(accounts[vitri]));
                showToast(`Đăng nhập thành công`);
                modalCloseForm();
                kiemtradangnhap();
                checkAdmin();
                updateAmount();
            }
        } else {
            showToast(`Sai mật khẩu`)
        }
    }
})

function checkAdmin() {
    let user = JSON.parse(localStorage.getItem('currentuser'));
    if(user && user.userType == 1) {
        let node = document.createElement(`li`);
        node.innerHTML = `<a href="./admin.html"><i class="fa-solid fa-gear"></i> Quản lý cửa hàng</a>`
        document.querySelector('.header-middle-right-menu').prepend(node);
    } 
}


function logOut() {
    let accounts = JSON.parse(localStorage.getItem('accounts'));
    user = JSON.parse(localStorage.getItem('currentuser'));
    let vitri = accounts.findIndex(item => item.phone == user.phone)
    accounts[vitri].cart.length = 0;
    for (let i = 0; i < user.cart.length; i++) {
        accounts[vitri].cart[i] = user.cart[i];
    }
    localStorage.setItem('accounts', JSON.stringify(accounts));
    localStorage.removeItem('currentuser');
    window.location = "/";
}



window.onload = kiemtradangnhap();


function userInfo() {
    let user = JSON.parse(localStorage.getItem('currentuser'));
    document.getElementById('infoname').value = user.fullname;
    document.getElementById('infophone').value = user.phone;
    document.getElementById('infoemail').value = user.email;
    document.getElementById('infoaddress').value = user.address;
    if (user.email == undefined) {
        infoemail.value = '';
    }
    if (user.address == undefined) {
        infoaddress.value = '';
    }
}


//----------------------------------------------------------------
function toggleMenu() {
    const categoryMenu = document.getElementById('category-menu');
    if (categoryMenu.classList.contains('open')) {
        categoryMenu.classList.remove('open'); // Đóng menu
    } else {
        categoryMenu.classList.add('open'); // Mở menu
    }
}

// Lọc sản phẩm theo danh mục
function filterProducts(category) {
    const filteredProducts = products.filter(product => product.catagory === category);

    const listProductHTML = document.querySelector('.listProduct');
    const paginationContainer = document.querySelector('.pagination-controls');

    if (filteredProducts.length === 0) {
        // Hiển thị thông báo không tìm thấy sản phẩm
        document.getElementById("tieude").style.display = "block";
        listProductHTML.innerHTML = `<div class="no-result"><div class="no-result-h">Tìm kiếm không có kết quả</div><div class="no-result-p">Xin lỗi, chúng tôi không thể tìm được kết quả hợp với tìm kiếm của bạn</div><div class="no-result-i"><i class="fa-solid fa-face-sad-cry"></i></div></div>`;
        paginationContainer.classList.add('hidden'); // Ẩn nút phân trang
    } else {
        // Hiển thị danh sách sản phẩm
        renderProducts(filteredProducts);
        paginationContainer.classList.add('hidden'); // Ẩn nút phân trang
    }

    // Ẩn menu sau khi chọn
    const categoryMenu = document.getElementById('category-menu');
    categoryMenu.classList.remove('show');
}

// Hiển thị danh sách sản phẩm
function renderProducts(productList) {
    const listProductHTML = document.querySelector('.listProduct');
    listProductHTML.innerHTML = ''; // Xóa nội dung cũ
    productList.forEach(product => {
        const productHTML = `
        <div class="item" data-id="${product.id}">
            <img src="${getPathImage(product.image)}" alt="${product.name}" onclick="openProductDetail(${product.id})">
            <h2 onclick="openProductDetail(${product.id})">${product.name}</h2>
            <div class="price">${formatCurrency(product.price)}</div>
        </div>`;
        listProductHTML.innerHTML += productHTML;
        scrollToSection();
    });
}





//-------------------------Format Date------------------------------
function formatDate(date) {
    let fm = new Date(date);
    let yyyy = fm.getFullYear();
    let mm = fm.getMonth() + 1;
    let dd = fm.getDate();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    return dd + '/' + mm + '/' + yyyy;
}



let selectedProduct = null; // Store the currently viewed product
let detailQuantity = 1; // Default quantity for the detail modal

let currentProductId = null; // Store the current product ID for actions
// Open product detail modal
function openProductDetail(productId) {
    // Find the product using its ID
    const product = products.find(item => item.id === productId);
    if (!product) return;

    // Set the selected product
    selectedProduct = product;
    detailQuantity = 1;
    currentProductId = productId;

    // Populate modal content
    document.getElementById('product-detail-image').setAttribute("src",`${getPathImage(product.image)}`)
    document.getElementById('product-detail-name').textContent = product.name;
    document.getElementById('product-detail-price').textContent = formatCurrency(product.price);
    document.getElementById('detail-quantity').textContent = detailQuantity;
    document.getElementById('product-detail-description').textContent = product.desc;
    // Show the modal
    document.getElementById('product-detail-tab').style.display = 'flex';
}

// Close product detail modal
function closeProductDetail() {
    document.getElementById('product-detail-tab').style.display = 'none';
}

// Adjust quantity in the detail modal
function adjustDetailQuantity(action) {
    if (action === 'increase') {
        detailQuantity += 1;
    } else if (action === 'decrease' && detailQuantity > 1) {
        detailQuantity -= 1;
    }
    document.getElementById('detail-quantity').textContent = detailQuantity;
}

let selectedSize = null; // Variable to track the selected size

function selectSize(size) {
    // Update the selected size
    selectedSize = size;

    // Highlight the selected button
    const sizeButtons = document.querySelectorAll('.size-btn');
    sizeButtons.forEach(btn => btn.classList.remove('selected')); // Remove the 'selected' class from all buttons

    // Add the 'selected' class to the clicked button
    const selectedButton = Array.from(sizeButtons).find(btn => btn.textContent === size);
    if (selectedButton) {
        selectedButton.classList.add('selected');
    }
}

// Add to cart from the detail modal
function addToCartFromDetail() {
    if (!selectedSize) {
        showToast(`Hãy chọn size trước`)
        return;
    }

    const product = products.find(item => item.id === currentProductId);

    if (!product) return;

    const cartItem = {
        ...product,
        size: selectedSize, // Include the selected size
        quantity: detailQuantity,
    };

    // Check if the same product with the same size already exists in the cart
    const existingItem = cart.find(item => item.id === cartItem.id && item.size === cartItem.size);
    if (existingItem) {
        existingItem.quantity += cartItem.quantity;
    } else {
        cart.push(cartItem);
    }

    updateCartDisplay();
    updateCartBadge();
    saveCartToLocalStorage();

    // Show a toast message
    showToast(`${product.name} (${selectedSize}) đã được thêm vào giỏ hàng!`);

    // Close the popup
    closeProductDetail();
}
function getProduct(item) {
    let products = JSON.parse(localStorage.getItem('products'));
    let infoProductCart = products.find(sp => item.id == sp.id)
    let product = {
        ...infoProductCart,
        ...item
    }
    return product;
}

// Biến phân trang
let products = [];
const productsPerPage = 8;
let currentPage = 1;

// Hiển thị sản phẩm cho một trang cụ thể
function renderProductsForPage(page) {
    const start = (page - 1) * productsPerPage;
    const end = start + productsPerPage;
    const paginatedProducts = products.slice(start, end);

    const listProductHTML = document.querySelector('.listProduct');
    listProductHTML.innerHTML = ''; // Xóa nội dung cũ

    paginatedProducts.forEach(product => {
        const productHTML = `
            <div class="item" data-id="${product.id}">
                <img src="${getPathImage(product.image)}" alt="${product.name}" onclick="openProductDetail(${product.id})">
                <h2 onclick="openProductDetail(${product.id})">${product.name}</h2>
                <div class="price">${formatCurrency(product.price)}</div>
                
            </div>`;
        listProductHTML.innerHTML += productHTML;
    });
}

// Hiển thị các nút phân trang
function renderPaginationControls() {
    const paginationContainer = document.querySelector('.pagination-controls');
    paginationContainer.innerHTML = ''; // Xóa nút cũ

    const totalPages = Math.ceil(products.length / productsPerPage);
    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.classList.add('page-button');
        if (i === currentPage) button.classList.add('active');
        button.addEventListener('click', () => {
            currentPage = i;
            renderProductsForPage(currentPage);
            renderPaginationControls();
            scrollToSection();
        });
        paginationContainer.appendChild(button);
    }
}

// Back to top
window.onscroll = () => {
    let backtopTop = document.querySelector(".back-to-top")
    if (document.documentElement.scrollTop > 100) {
        backtopTop.classList.add("active");
    } else {
        backtopTop.classList.remove("active");
    }
}


// Auto hide header on scroll
const headerNav = document.querySelector(".header-bottom");
let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
    if(lastScrollY < window.scrollY) {
        headerNav.classList.add("hide")
    } else {
        headerNav.classList.remove("hide")
    }
    lastScrollY = window.scrollY;
})


// Tải dữ liệu từ localStorage
function loadProductsFromLocalStorage() {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
        products = JSON.parse(storedProducts);
    }
}

// Khởi tạo trang web
function initApp() {
    loadProductsFromLocalStorage();
    renderProductsForPage(currentPage);
    renderPaginationControls();
    initializeCart()
}

// Gọi hàm khởi tạo khi trang tải xong
document.addEventListener('DOMContentLoaded', initApp);

document.querySelector(".checkout-btn").addEventListener("click",e =>{
    window.location.href='thantoan.html';
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const thisCart = cart;
    let total = 0;
    cart.forEach(item => {
         itemTotal = item.price * item.quantity;
         total += itemTotal;
    })
    let orders = localStorage.getItem('orders') ? JSON.parse(localStorage.getItem('orders')) : []; 
    let order ={
        id: orders.length + 1,
        id_customer : document.querySelector(".auth-container .text-tk").getAttribute("data-id"),
        cart: thisCart,
        tongTien: total,
    }
    console.log(order);
    orders.push(...orders,order);
    localStorage.setItem("orders",JSON.stringify(orders));
});

document.querySelector('.buyNow').addEventListener("click",e =>{
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartFake = cart;
    localStorage.setItem("cartFake",JSON.stringify(cartFake));
    localStorage.removeItem("cart");
    let cart_buy_now = localStorage.getItem('cart_buy_now') ? JSON.parse(localStorage.getItem('cart_buy_now')) : [];
    
    
    if (!selectedSize) {
        showToast(`Hãy chọn size trước`)
        return;
    }

    const product = products.find(item => item.id === currentProductId);

    if (!product) return;

    const cartItem = {
        ...product,
        size: selectedSize, // Include the selected size
        quantity: detailQuantity,
    };

    // Check if the same product with the same size already exists in the cart
    const existingItem = cart.find(item => item.id === cartItem.id && item.size === cartItem.size);
    if (existingItem) {
        existingItem.quantity += cartItem.quantity;
    } else {
        cart_buy_now.push(cartItem);
    }
    localStorage.setItem("cart_buy_now",JSON.stringify(cart_buy_now));
    
    let total = 0;
    cart_buy_now.forEach(item => {
         itemTotal = item.price * item.quantity;
         total += itemTotal;
    })

    let orders = localStorage.getItem('orders') ? JSON.parse(localStorage.getItem('orders')) : []; 
    let order ={
        id: orders.length + 1,
        id_customer : document.querySelector(".auth-container .text-tk").getAttribute("data-id"),
        cart: cart_buy_now,
        tongTien: total,
    }
    console.log(order);
    orders.push(order);
    localStorage.setItem("orders",JSON.stringify(orders));
    window.location.href = "thantoan.html";
});
window.onload = checkAdmin();