
const products = [
    {
      "name": "Samsung Galaxy S23 Ultra 5G",
      "image": "/uploads/samsung_s23_ultra.jpg",
      "description": "Samsung Galaxy S23 Ultra 5G with Snapdragon 8 Gen 2, 12GB RAM, 256GB Storage, 200MP Quad Camera, 5000mAh Battery, 120Hz AMOLED Display, S Pen support.",
      "brand": "Samsung",
      "category": "Mobile Phones",
      "price": 124999,
      "countInStock": 5,
      "rating": 4.7,
      "numReviews": 320
    },
    {
      "name": "iPhone 15 Pro Max",
      "image": "/uploads/iphone_15_pro_max.jpg",
      "description": "Apple iPhone 15 Pro Max with A17 Pro chip, 8GB RAM, 256GB Storage, 48MP Triple Camera, 6.7-inch Super Retina XDR Display, Titanium Body, iOS 17.",
      "brand": "Apple",
      "category": "Mobile Phones",
      "price": 159900,
      "countInStock": 3,
      "rating": 4.8,
      "numReviews": 450
    },
    {
      "name": "OnePlus 11 5G",
      "image": "/uploads/oneplus_11.jpg",
      "description": "OnePlus 11 5G with Snapdragon 8 Gen 2, 16GB RAM, 256GB Storage, 50MP Hasselblad Camera, 5000mAh Battery, 100W Fast Charging, 120Hz AMOLED Display.",
      "brand": "OnePlus",
      "category": "Mobile Phones",
      "price": 61999,
      "countInStock": 7,
      "rating": 4.5,
      "numReviews": 280
    },
    {
      "name": "Google Pixel 7 Pro",
      "image": "/uploads/pixel_7_pro.jpg",
      "description": "Google Pixel 7 Pro with Google Tensor G2, 12GB RAM, 256GB Storage, 50MP Triple Camera, 5000mAh Battery, 120Hz LTPO OLED Display, Android 14.",
      "brand": "Google",
      "category": "Mobile Phones",
      "price": 84999,
      "countInStock": 4,
      "rating": 4.6,
      "numReviews": 210
    },
    {
      "name": "Xiaomi 13 Pro",
      "image": "/uploads/xiaomi_13_pro.jpg",
      "description": "Xiaomi 13 Pro with Snapdragon 8 Gen 2, 12GB RAM, 256GB Storage, 50MP Leica Camera, 120W Fast Charging, 120Hz AMOLED Display, 4820mAh Battery.",
      "brand": "Xiaomi",
      "category": "Mobile Phones",
      "price": 79999,
      "countInStock": 6,
      "rating": 4.4,
      "numReviews": 190
    },
    {
      "name": "Realme GT Neo 5",
      "image": "/uploads/realme_gt_neo_5.jpg",
      "description": "Realme GT Neo 5 with Snapdragon 8+ Gen 1, 16GB RAM, 256GB Storage, 50MP Sony IMX890 Camera, 240W Fast Charging, 144Hz AMOLED Display.",
      "brand": "Realme",
      "category": "Mobile Phones",
      "price": 43999,
      "countInStock": 8,
      "rating": 4.3,
      "numReviews": 160
    },
    {
      "name": "Vivo X90 Pro",
      "image": "/uploads/vivo_x90_pro.jpg",
      "description": "Vivo X90 Pro with MediaTek Dimensity 9200, 12GB RAM, 512GB Storage, 50MP Zeiss Camera, 120W Fast Charging, 4870mAh Battery, 120Hz AMOLED Display.",
      "brand": "Vivo",
      "category": "Mobile Phones",
      "price": 84999,
      "countInStock": 5,
      "rating": 4.5,
      "numReviews": 200
    },
    {
      "name": "iQOO 11 5G",
      "image": "/uploads/iqoo_11.jpg",
      "description": "iQOO 11 5G with Snapdragon 8 Gen 2, 16GB RAM, 256GB Storage, 50MP Camera, 120W Fast Charging, 5000mAh Battery, 144Hz AMOLED Display.",
      "brand": "iQOO",
      "category": "Mobile Phones",
      "price": 59999,
      "countInStock": 9,
      "rating": 4.4,
      "numReviews": 180
    },
    {
      "name": "Nothing Phone (2)",
      "image": "/uploads/nothing_phone_2.jpg",
      "description": "Nothing Phone (2) with Snapdragon 8+ Gen 1, 12GB RAM, 256GB Storage, Glyph Interface, 50MP Dual Camera, 120Hz OLED Display, 4700mAh Battery.",
      "brand": "Nothing",
      "category": "Mobile Phones",
      "price": 44999,
      "countInStock": 6,
      "rating": 4.2,
      "numReviews": 150
    },
    {
      "name": "Asus ROG Phone 7",
      "image": "/uploads/asus_rog_phone_7.jpg",
      "description": "Asus ROG Phone 7 with Snapdragon 8 Gen 2, 16GB RAM, 512GB Storage, 165Hz AMOLED Display, 6000mAh Battery, AirTriggers, Gaming Mode.",
      "brand": "Asus",
      "category": "Mobile Phones",
      "price": 89999,
      "countInStock": 3,
      "rating": 4.6,
      "numReviews": 180
    },
    {
      "name": "Motorola Edge 40 Pro",
      "image": "/uploads/motorola_edge_40_pro.jpg",
      "description": "Motorola Edge 40 Pro with Snapdragon 8 Gen 2, 12GB RAM, 512GB Storage, 50MP Triple Camera, 165Hz P-OLED Display, 4600mAh Battery, 125W Fast Charging.",
      "brand": "Motorola",
      "category": "Mobile Phones",
      "price": 74999,
      "countInStock": 5,
      "rating": 4.5,
      "numReviews": 140
    },
    {
      "name": "Poco F5 Pro",
      "image": "/uploads/poco_f5_pro.jpg",
      "description": "Poco F5 Pro with Snapdragon 8+ Gen 1, 12GB RAM, 256GB Storage, 64MP OIS Camera, 5000mAh Battery, 120W Fast Charging, 144Hz AMOLED Display.",
      "brand": "Poco",
      "category": "Mobile Phones",
      "price": 38999,
      "countInStock": 7,
      "rating": 4.3,
      "numReviews": 170
    },
    {
      "name": "Oppo Reno 10 Pro+",
      "image": "/uploads/oppo_reno_10_pro_plus.jpg",
      "description": "Oppo Reno 10 Pro+ with Snapdragon 8+ Gen 1, 12GB RAM, 256GB Storage, 50MP Periscope Camera, 100W Fast Charging, 120Hz AMOLED Display.",
      "brand": "Oppo",
      "category": "Mobile Phones",
      "price": 58999,
      "countInStock": 5,
      "rating": 4.4,
      "numReviews": 160
    }
  ];
  export default products;