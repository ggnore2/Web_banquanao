// //Khoi tao danh sach san pham
// function createProduct() {
//     if (localStorage.getItem('products') == null) {
//         let products = [{
//             ProductImg: "C:\\fakepath\\AIR+FORCE+1+'07.png",
//             ProductName: "nike9",
//             ProductPrice: "50000",
//             ProductSize: "41",
//             ProductType: "giay",
//             id:"c8c79f7f-1e3c-4de8-a182-2883d214c9a5"
//         },
//         {
//             ProductImg: "C:\\fakepath\\AIR+FORCE+1+'07.png",
//             ProductName: "nike5",
//             ProductPrice: "50000",
//             ProductSize: "41",
//             ProductType: "giay",
//             id:"c066e644-6852-4f74-a2b1-16b748765dc7"
//         },
//         {
//             ProductImg: "C:\\fakepath\\AIR+FORCE+1+'07.png",
//             ProductName: "nike3",
//             ProductPrice: "50000",
//             ProductSize: "41",
//             ProductType: "giay",
//             id:"ffc415e3-6adf-4572-8cdb-052671204543"
//         },
//         {
//             ProductImg: "C:\\fakepath\\AIR+FORCE+1+'07.png",
//             ProductName: "nike2",
//             ProductPrice: "50000",
//             ProductSize: "41",
//             ProductType: "giay",
//             id:"5993b432-ba36-479f-88b2-eeef7729869c"
//         },
//         {
//             ProductImg: "C:\\fakepath\\AIR+FORCE+1+'07.png",
//             ProductName: "nike",
//             ProductPrice: "50000",
//             ProductSize: "41",
//             ProductType: "giay",
//             id:"93c08fb3-3d98-41fe-97db-b773e5d3ec4e"
//         },
//         {
//             ProductImg: "C:\\fakepath\\AIR+FORCE+1+'07.png",
//             ProductName: "balenciaga",
//             ProductPrice: "50000",
//             ProductSize: "41",
//             ProductType: "giay",
//             id:"c2104af8-429c-4721-bd3e-6932691f1a75"
//         },
//         {
//             ProductImg: "C:\\fakepath\\AIR+FORCE+1+'07.png",
//             ProductName: "bitis33",
//             ProductPrice: "50000",
//             ProductSize: "41",
//             ProductType: "giay",
//             id:"02b111c6-c431-4997-893b-536412d55996"
//         },
//         {
//             ProductImg: "C:\\fakepath\\AIR+FORCE+1+'07.png",
//             ProductName: "bitis",
//             ProductPrice: "50000",
//             ProductSize: "41",
//             ProductType: "giay",
//             id:"c361f84b-510e-4c09-ab2d-a4eddade6e63"
//         },
//         {
//             ProductImg: "C:\\fakepath\\AIR+FORCE+1+'07.png",
//             ProductName: "balenciaga3",
//             ProductPrice: "50000",
//             ProductSize: "41",
//             ProductType: "giay",
//             id:"b3ba0c41-6514-4043-aa4c-ccbb801860f7"
//         },
//         {
//             ProductImg: "C:\\fakepath\\AIR+FORCE+1+'07.png",
//             ProductName: "balenciaga8",
//             ProductPrice: "50000",
//             ProductSize: "41",
//             ProductType: "giay",
//             id:"79f87cc3-dfa1-4d12-9a26-c30464a62681"
//         },
//         {
//             ProductImg: "C:\\fakepath\\AIR+FORCE+1+'07.png",
//             ProductName: "adidas",
//             ProductPrice: "50000",
//             ProductSize: "41",
//             ProductType: "giay",
//             id:"b4a31cb2-1335-47fc-957e-353001b0efc4"
//         },
        
//         ]
//         localStorage.setItem('products', JSON.stringify(products));
//     }
// }

// // Create admin account 
// function createAccount() {
//     let accounts = localStorage.getItem("accounts");
//     if (!accounts) {
//         accounts = [];
//         accounts.push({
//             confirmPassword: "tẻgwdwgwrg",
//             email: "kyle88@gmail.com",
//             fullName: "nguyen van a",
//             id: "73f1daae-b2b4-4c8d-a66f-5fb1e3899e56",
//             password: "dsbcyusdgd",
//             phoneNumber: "0123456789",
//             userName: "ajxa"
//         })
//         accounts.push({
//             confirmPassword: "tẻgwdwgwrg",
//             email: "kyle99@gmail.com",
//             fullName: "nguyen van b",
//             id: "02a60d8a-c4e3-479a-8c37-2f96774e664e",
//             password: "dsbcyusdgd",
//             phoneNumber: "0909888888",
//             userName: "bjxb"
//         })
//         localStorage.setItem('accounts', JSON.stringify(accounts));
//     }
// }
// window.onload = createProduct();
// window.onload = createAccount();

function createProduct() {
    if (localStorage.getItem('products') == null) {
        let products = [{
            "id": 1,
            "status": 1,
            "name": "2024 T1 World Champions Jacket",
            "price": 2500000,
            "image":"C:\\fakepath\\5.png",
            "catagory": "Jacket",
            "desc": "Tri ân cho nhà vô địch World 2024 - Chất liệu Polyester 100% - Thời gian đảm bảo chất lượng sản phẩm hơn 1 năm kể từ ngày sản xuất"
        },
        {
            "id": 2,
            "status": 1,
            "name": "2024 T1 World Champions Jersey",
            "price": 2350000,
            "image": "C:\\fakepath\\2.jpg",
            "catagory": "Jersey",
            "desc": "Tri ân cho nhà vô địch World 2024 - Áo đấu với chất liệu Polyester 100% - Thời gian đảm bảo chất lượng sản phẩm hơn 1 năm kể từ ngày sản xuất"
        },
        {
            "id": 3,
            "status": 1,
            "name": "2024 T1 World Champions T-Shirt",
            "price": 1800000,
            "image": "C:\\fakepath\\3.png",
            "catagory": "T-Shirt",
            "desc": "Tri ân cho nhà vô địch World 2024 - Chất liệu Cotton 72%, Polyester 28%  - Thời gian đảm bảo chất lượng sản phẩm hơn 1 năm kể từ ngày sản xuất"
        },
        {
            "id": 4,
            "status": 1,
            "name": "T1 Logo Sweatshirt",
            "price": 1100000,
            "image": "C:\\fakepath\\4.jpg",
            "catagory": "Sweatshirt",
            "desc": "Chất liệu Cotton 100% - Thời gian đảm bảo chất lượng sản phẩm hơn 1 năm kể từ ngày sản xuất"
        },
        {
            "id": 5,
            "status": 1,
            "name": "T1 Logo Windbreaker",
            "price": 500000,
            "image": "C:\\fakepath\\5.png",
            "catagory": "Jacket",
            "desc": "Áo khoác chống thấm nước - Chất liệu Polyester 100% - Thời gian đảm bảo chất lượng sản phẩm hơn 1 năm kể từ ngày sản xuất"
        },
        {
            "id": 6,
            "status": 1,
            "name": "T1 Logo Polo Shirt",
            "price": 1000000,
            "image": "C:\\fakepath\\6.jpg",
            "catagory": "Polo",
            "desc": "Áo Polo gọn nhẹ - Chất liệu Cotton 72.1%, Polyester 23.6%, Elastane 4.3% - Thời gian đảm bảo chất lượng sản phẩm hơn 1 năm kể từ ngày sản xuất"
        },
        {
            "id": 7,
            "status": 1,
            "name": "T1 20th Anniv. Faker T-Shirt",
            "price": 2500000,
            "image": "C:\\fakepath\\7.jpg",
            "catagory": "T-Shirt",
            "desc": "Chiếc áo kỷ niệm 20 năm thành lập tổ chức T1 - Chất liệu Cotton 100% - Thời gian đảm bảo chất lượng sản phẩm hơn 1 năm kể từ ngày sản xuất"
        },
        {
            "id": 8,
            "status": 1,
            "name": "T1 20th Anniv. BoxeR T-Shirt",
            "price": 1500000,
            "image": "C:\\fakepath\\8.jpg",
            "catagory": "T-Shirt",
            "desc": "Chiếc áo kỷ niệm 20 năm thành lập tổ chức T1 - Chất liệu Cotton 100% - Thời gian đảm bảo chất lượng sản phẩm hơn 1 năm kể từ ngày sản xuất"
        },
        {
            "id": 9,
            "status": 1,
            "name": "T1 Hwarang Zip-Up Hoodie",
            "price": 1000000,
            "image": "C:\\fakepath\\9.jpg",
            "catagory": "Hoodie",
            "desc": "Hoodie của đội tuyển T1 Valorant - Chất liệu Cotton 100% - Thời gian đảm bảo chất lượng sản phẩm hơn 1 năm kể từ ngày sản xuất"
        },
        {
            "id": 10,
            "status": 1,
            "name": "T1 Logo Half Zip-up",
            "price": 560000,
            "image": "C:\\fakepath\\10.jpg",
            "catagory": "Sweatshirt",
            "desc": "Được làm từ Cotton 100% - Thời gian đảm bảo chất lượng sản phẩm hơn 1 năm kể từ ngày sản xuất"
        },
        {
            "id": 11,
            "status": 1,
            "name": "T1 Players T-Shirt - Zeus",
            "price": 550000,
            "image": "C:\\fakepath\\11.jpg",
            "catagory": "T-Shirt",
            "desc": "Áo thun khắc tên tuyển thủ Zeus - Được làm từ Cotton 100% - Thời gian đảm bảo chất lượng sản phẩm hơn 1 năm kể từ ngày sản xuất"
        },
        {
            "id": 12,
            "status": 1,
            "name": "T1 Players T-Shirt - Oner",
            "price": 550000,
            "image": "C:\\fakepath\\12.jpg",
            "catagory": "T-Shirt",
            "desc": "Áo thun khắc tên tuyển thủ Onen - Được làm từ Cotton 100% - Thời gian đảm bảo chất lượng sản phẩm hơn 1 năm kể từ ngày sản xuất"
        },
        {
            "id": 13,
            "status": 1,
            "name": "T1 Players T-Shirt - Gumayusi",
            "price": 550000,
            "image": "C:\\fakepath\\13.jpg",
            "catagory": "T-Shirt",
            "desc": "Áo thun khắc tên tuyển thủ Gumuyusi - Được làm từ Cotton 100% - Thời gian đảm bảo chất lượng sản phẩm hơn 1 năm kể từ ngày sản xuất"
        },
        {
            "id": 14,
            "status": 1,
            "name": "T1 Players T-Shirt - Keria",
            "price": 550000,
            "image": "C:\\fakepath\\14.jpg",
            "catagory": "T-Shirt",
            "desc": "Áo thun khắc tên tuyển thủ Keria - Được làm từ Cotton 100% - Thời gian đảm bảo chất lượng sản phẩm hơn 1 năm kể từ ngày sản xuất"
        },
        {
            "id": 15,
            "status": 1,
            "name": "T1 One and Only T-Shirt",
            "price": 800000,
            "image": "C:\\fakepath\\15.jpg",
            "catagory": "T-Shirt",
            "desc": "Được làm từ Cotton 100% - Thời gian đảm bảo chất lượng sản phẩm hơn 1 năm kể từ ngày sản xuất"
        },
        {
            "id": 16,
            "status": 1,
            "name": "T1 MSI 2024 T-Shirt",
            "price": 750000,
            "image": "C:\\fakepath\\16.jpg",
            "catagory": "T-Shirt",
            "desc": "Phiên bản cho giải đấu MSI Thành Đô 2024- Được làm từ Cotton 100% - Thời gian đảm bảo chất lượng sản phẩm hơn 1 năm kể từ ngày sản xuất"
        },
        {
            "id": 17,
            "status": 1,
            "name": "T1 Black Hoodie",
            "price": 450000,
            "image": "C:\\fakepath\\17.jpg",
            "catagory": "Hoodie",
            "desc": "Được làm từ Cotton 100% - Thời gian đảm bảo chất lượng sản phẩm hơn 1 năm kể từ ngày sản xuất"
        },
        {
            "id": 18,
            "status": 1,
            "name": "T1 Players Sweatshirt - Zeus",
            "price": 600000,
            "image": "C:\\fakepath\\18.jpg",
            "catagory": "Sweatshirt",
            "desc": "Áo len khắc tên tuyển thủ Zeus - Được làm từ Cotton 100% - Thời gian đảm bảo chất lượng sản phẩm hơn 1 năm kể từ ngày sản xuất"
        },
        {
            "id": 19,
            "status": 1,
            "name": "T1 Players Sweatshirt - Oner",
            "price": 600000,
            "image": "C:\\fakepath\\19.jpg",
            "catagory": "Sweatshirt",
            "desc": "Áo len khắc tên tuyển thủ Oner - Được làm từ Cotton 100% - Thời gian đảm bảo chất lượng sản phẩm hơn 1 năm kể từ ngày sản xuất"
        },
        {
            "id": 20,
            "status": 1,
            "name": "T1 Players Sweatshirt - Faker",
            "price": 600000,
            "image": "C:\\fakepath\\20.jpg",
            "catagory": "Sweatshirt",
            "desc": "Áo len khắc tên tuyển thủ Faker - Được làm từ Cotton 100% - Thời gian đảm bảo chất lượng sản phẩm hơn 1 năm kể từ ngày sản xuất"
        },
        {
            "id": 21,
            "status": 1,
            "name": "T1 Players Sweatshirt - Gumayusi",
            "price": 600000,
            "image": "C:\\fakepath\\21.jpg",
            "catagory": "Sweatshirt",
            "desc": "Áo len khắc tên tuyển thủ Gumayusi - Được làm từ Cotton 100% - Thời gian đảm bảo chất lượng sản phẩm hơn 1 năm kể từ ngày sản xuất"
        },
        {
            "id": 22,
            "status": 1,
            "name": "T1 Players Sweatshirt - Keria",
            "price": 600000,
            "image": "C:\\fakepath\\22.jpg",
            "catagory": "Sweatshirt",
            "desc": "Áo len khắc tên tuyển thủ Gumayusi - Được làm từ Cotton 100% - Thời gian đảm bảo chất lượng sản phẩm hơn 1 năm kể từ ngày sản xuất"
        },
        {
            "id": 23,
            "status": 1,
            "name": "T1 Logo Fleece Jacket",
            "price": 575000,
            "image": "C:\\fakepath\\23.jpg",
            "catagory": "Jacket",
            "desc": "Chất liệu Polyester 100% - Được làm từ Cotton 100% - Thời gian đảm bảo chất lượng sản phẩm hơn 1 năm kể từ ngày sản xuất"
        },
        {
            "id": 24,
            "status": 1,
            "name": "2023 T1 World Champions Sweatshirt",
            "price": 800000,
            "image": "C:\\fakepath\\24.jpg",
            "catagory": "Sweatshirt",
            "desc": "Tri ân cho nhà vô địch World 2023 - Được làm từ Cotton 100% - Thời gian đảm bảo chất lượng sản phẩm hơn 1 năm kể từ ngày sản xuất"
        },
        {
            "id": 25,
            "status": 1,
            "name": "T1 Players Hoodie - Faker",
            "price": 560000,
            "image": "C:\\fakepath\\25.jpg",
            "catagory": "Hoodie",
            "desc": "Hoodie khắc tên tuyển thủ Faker - Được làm từ Cotton 100% - Thời gian đảm bảo chất lượng sản phẩm hơn 1 năm kể từ ngày sản xuất"
        },
        {
            "id": 26,
            "status": 1,
            "name": "Faker Denim Shirt Jacket - Black",
            "price": 440000,
            "image": "C:\\fakepath\\26.jpg",
            "catagory": "Jacket",
            "desc": "Chất liệu 70% Cotton, 30% Polyester - Thời gian đảm bảo chất lượng sản phẩm hơn 1 năm kể từ ngày sản xuất"
        },
        {
            "id": 27,
            "status": 1,
            "name": "T1 Logo T-Shirts",
            "price": 500000,
            "image": "C:\\fakepath\\27.jpg",
            "catagory": "T-Shirt",
            "desc": "Chất liệu 100% Cotton - Thời gian đảm bảo chất lượng sản phẩm hơn 1 năm kể từ ngày sản xuất"
        },
        {
            "id": 28,
            "status": 1,
            "name": "2024 T1 Uniform Jersey",
            "price": 2000000,
            "image": "C:\\fakepath\\28.jpg",
            "catagory": "Jersey",
            "desc": "Áo đấu chính thức của T1 2024 - Chất liệu 100% Polyester - Thời gian đảm bảo chất lượng sản phẩm hơn 1 năm kể từ ngày sản xuất"
        },
        {
            "id": 29,
            "status": 1,
            "name": "T1 X REKKLES T-Shirt",
            "price": 600000,
            "image": "C:\\fakepath\\29.jpg",
            "catagory": "T-Shirt",
            "desc": "Chất liệu 100% Cotton - Thời gian đảm bảo chất lượng sản phẩm hơn 1 năm kể từ ngày sản xuất"
        },
        {
            "id": 30,
            "status": 1,
            "name": "2023 T1 Long Sleeve Polo Shirt",
            "price": 750000,
            "image": "C:\\fakepath\\30.jpg",
            "catagory": "Polo",
            "desc": "Chất liệu 100% Cotton - Thời gian đảm bảo chất lượng sản phẩm hơn 1 năm kể từ ngày sản xuất"
        },
        {
            "id": 31,
            "status": 1,
            "name": "[FAKER X VANDYTHEPINK] T-Shirt",
            "price": 700000,
            "image": "C:\\fakepath\\31.jpg",
            "catagory": "T-Shirt",
            "desc": "Collab với thương hiệu VANDYTHEPINK - Chất liệu 100% Cotton - Thời gian đảm bảo chất lượng sản phẩm hơn 1 năm kể từ ngày sản xuất"
        },
        {
            "id": 32,
            "status": 1,
            "name": "2024 T1 World Champions Ball Cap",
            "price": 400000,
            "image": "C:\\fakepath\\32.png",
            "catagory": "Accessory",
            "desc": "Nón tri ân khoảnh khắc vô địch Wolrd 2024 - Chất liệu 100% Cotton - Thời gian đảm bảo chất lượng sản phẩm hơn 1 năm kể từ ngày sản xuất"
        },

        {
            "id": 33,
            "status": 1,
            "name": "T1 Logo Backpack",
            "price": 200000,
            "image": "C:\\fakepath\\33.jpg",
            "catagory": "Accessory",
            "desc": "Chất liệu CORDURA Ni-lông - Thời gian đảm bảo chất lượng sản phẩm hơn 1 năm kể từ ngày sản xuất"
        },
        {
            "id": 34,
            "status": 1,
            "name": "[FAKER X VANDYTHEPINK] Hoodie",
            "price": 700000,
            "image": "C:\\fakepath\\34.jpg",
            "catagory": "Hoodie",
            "desc": "Collab với thương hiệu VANDYTHEPINK - Chất liệu 100% Cotton - Thời gian đảm bảo chất lượng sản phẩm hơn 1 năm kể từ ngày sản xuất"
        },
        {
            "id": 35,
            "status": 1,
            "name": "[FAKER X VANDYTHEPINK] Jacket",
            "price": 700000,
            "image": "C:\\fakepath\\35.jpg",
            "catagory": "Jacket",
            "desc": "Collab với thương hiệu VANDYTHEPINK - Chất liệu 100% Cotton - Thời gian đảm bảo chất lượng sản phẩm hơn 1 năm kể từ ngày sản xuất"
        },
        {
            "id": 36,
            "status": 1,
            "name": "T1 Logo Beanie",
            "price": 200000,
            "image": "C:\\fakepath\\36.jpg",
            "catagory": "Accessory",
            "desc": "Chất liệu Acrylic 100% - Thời gian đảm bảo chất lượng sản phẩm hơn 1 năm kể từ ngày sản xuất"
        },
        {
            "id": 37,
            "status": 1,
            "name": "[T1 X Mongi] Summer Vibes PVC Tote Bag",
            "price": 100000,
            "image": "C:\\fakepath\\37.jpg",
            "catagory": "Accessory",
            "desc": "Túi Tote bảo vệ môi trường với các Mongi siêu đáng yêu - Thời gian đảm bảo chất lượng sản phẩm hơn 1 năm kể từ ngày sản xuất"
        },
        {
            "id": 38,
            "status": 1,
            "name": "T1 Logo Sock",
            "price": 200000,
            "image": "C:\\fakepath\\38.jpg",
            "catagory": "Accessory",
            "desc": "Chất liệu 100%  Cotton - Thời gian đảm bảo chất lượng sản phẩm hơn 1 năm kể từ ngày sản xuất"
        },
        {
            "id": 39,
            "status": 1,
            "name": "T1 Wristband",
            "price": 100000,
            "image": "C:\\fakepath\\39.jpg",
            "catagory": "Accessory",
            "desc": "Chất liệu 100% Cao su - Thời gian đảm bảo chất lượng sản phẩm hơn 1 năm kể từ ngày sản xuất"
        },
        {
            "id": 40,
            "status": 1,
            "name": "[FAKER X VANDYTHEPINK] Desk Mat",
            "price": 250000,
            "image": "C:\\fakepath\\40.jpg",
            "catagory": "Accessory",
            "desc": "Collab với thương hiệu VANDYTHEPINK - Chất liệu 60% Cao su, 40% Polyester - Thời gian đảm bảo chất lượng sản phẩm hơn 1 năm kể từ ngày sản xuất"
        },
        ]
        localStorage.setItem('products', JSON.stringify(products));
    }
}


function createAdminAccount() {
    let accounts = localStorage.getItem("accounts");
    if (!accounts) {
        accounts = [];
        accounts.push({
            fullname: "Lý Chí Bảo",
            phone: "0912345678",
            password: "123456",
            address: 'https://github.com/hgbaodev',
            email: 'lychibao200t@gmail.com',
            status: 1,
            join: new Date(),
            cart: [],
            userType: 1,
            id: 1
        })
        localStorage.setItem('accounts', JSON.stringify(accounts));
    }
}
window.onload = createProduct();
window.onload = createAdminAccount();