import React, { createContext, useState, useContext, useEffect } from 'react';

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
    const [language, setLanguage] = useState(() => localStorage.getItem('fimo_language') || 'EN');
    const [user, setUser] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('fimo_user')) || null;
        } catch {
            return null;
        }
    });
    const [searchQuery, setSearchQuery] = useState('');
    const [cartItems, setCartItems] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('fimo_cart')) || [];
        } catch {
            return [];
        }
    });
    const [likedItems, setLikedItems] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('fimo_wishlist')) || [];
        } catch {
            return [];
        }
    });

    const [boughtItems, setBoughtItems] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('boughtItems')) || [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('fimo_language', language);
    }, [language]);

    useEffect(() => {
        localStorage.setItem('fimo_cart', JSON.stringify(cartItems));
    }, [cartItems]);

    useEffect(() => {
        localStorage.setItem('fimo_wishlist', JSON.stringify(likedItems));
    }, [likedItems]);

    useEffect(() => {
        localStorage.setItem('boughtItems', JSON.stringify(boughtItems));
    }, [boughtItems]);

    useEffect(() => {
        if (user) {
            localStorage.setItem('fimo_user', JSON.stringify(user));
        } else {
            localStorage.removeItem('fimo_user');
        }
    }, [user]);

    const translations = {
        EN: {
            home: "HOME",
            blog: "BLOG",
            shop: "SHOP",
            customize: "CUSTOMIZE",
            features: "FEATURES",
            search: "SEARCH",
            search_placeholder: "Search for products, categories...",
            cart: "SHOPPING BAG",
            wishlist: "MY WISHLIST",
            empty_state: "No items found. Start exploring!",
            continue_shopping: "CONTINUE SHOPPING",
            add_to_bag: "ADD TO BAG",
            view_collection: "VIEW COLLECTION",
            buy_now: "BUY NOW",
            remove: "REMOVE",
            profile: "PROFILE",
            login: "LOGIN WITH GOOGLE",
            logout: "LOGOUT",
            welcome: "Welcome",
            orders: "MY ORDERS",
            organic_cotton: "100% Organic Cotton",
            organic_cotton_desc: "Breathable, soft, and sustainable fabric for everyday comfort.",
            premium_stitching: "Premium Stitching",
            premium_stitching_desc: "Durable seams that ensure long-lasting wear without losing shape.",
            eco_dye: "Eco-Friendly Dye",
            eco_dye_desc: "Colors that stay vibrant wash after wash without harsh chemicals.",
            perfect_fit: "Perfect Fit",
            perfect_fit_desc: "Designed to provide maximum comfort and a stylish look for any occasion.",
            redefining_quality: "Redefining Quality.",
            premium_desc: "Premium sustainable fabrics designed for exactly who you are.",
            story_title: "The Story of FIMO",
            story_lead: "We started with a simple belief: Clothing should not only look stunning but feel like a second skin.",
            story_body: "Every thread we select, every stitch we make is guided by our obsession with quality. Our garments undergo rigorous testing and are crafted from 100% organic cotton to ensure unparalleled durability and breathability.",
            ultimate_comfort: "Ultimate Comfort",
            no_chemicals: "Harsh Chemicals",
            explore_quality: "Explore Quality",
            footer_text: "FIMO - Your brand, your style.",
            works_title: "Our Works",
            main_desc: "FIMO is a brand that creates high-quality, stylish, and comfortable clothing. Each T-shirt and pants are made of high-quality fabrics, suitable for everyday and sportswear. Our goal is to transform your style into comfort and aesthetics.",
            sizes_label: "Sizes:",
            colors_label: "Colors:",
            no_matches: "Oops! No matching products found.",
            latest_title: "Latest from FIMO",
            latest_desc: "Insights, news, and behind the seams.",
            read_article: "Read Article",
            notify_label: "Notify me for new collections",
            email_placeholder: "Enter your email",
            subscribe: "Subscribe",
            design_yours: "DESIGN YOURS",
            custom_studio: "FIMO CUSTOM STUDIO",
            pause_rotation: "PAUSE ROTATION",
            auto_rotate: "AUTO ROTATE",
            select_color: "SELECT COLOR",
            fabric: "FABRIC",
            promo_code: "PROMO CODE",
            enter_code: "Enter code...",
            apply: "APPLY",
            clear: "CLEAR",
            discount_applied: "discount applied!",
            estimated_total: "ESTIMATED TOTAL",
            confirm_design: "CONFIRM DESIGN",
            blog_post1_title: "The Future of Organic Cotton",
            blog_post1_excerpt: "Discover how sustainable farming is changing the way we think about everyday apparel and comfort.",
            blog_post1_content: "At FIMO, we believe that high-performance sportswear starts with the soil. Our latest collection is crafted from 100% GOTS-certified organic cotton, ensuring breathability for your toughest workouts and softest recovery days. We are committed to a zero-waste manufacturing process.",
            blog_post2_title: "Dyeing Without the Damage",
            blog_post2_excerpt: "Our new eco-friendly dyeing process eliminates harsh chemicals while maintaining vibrant, lasting colors.",
            blog_post2_content: "Traditional textile dyeing is one of the world's most polluting processes. FIMO's new 'Aqua-Save' technology reduces water usage by 90% and uses plant-based pigments. This means your gym gear stays vibrant longer without harming your skin or the planet.",
            blog_post3_title: "Designing the Perfect Fit",
            blog_post3_excerpt: "A behind-the-scenes look at how FIMO engineers the ultimate silhouette for every body type.",
            blog_post3_content: "Clothing shouldn't restrict your movement; it should enhance it. Our design lab uses 3D body scanning to create the 'FIMO Kinetic Cut'—a unique paneling system that moves with your muscles. Whether it's a marathon or a coffee run, we've got you covered.",
            sustainability: "Sustainability",
            innovation: "Innovation",
            design: "Design"
        },
        UZ: {
            home: "BOSH SAHIFA",
            blog: "BLOG",
            shop: "DO'KON",
            customize: "DIZAYN",
            features: "XUSUSIYATLAR",
            search: "QIDIRUV",
            search_placeholder: "Mahsulotlar, toifalar qidirish...",
            cart: "SAVATCHA",
            wishlist: "YOQTIRILGANLAR",
            empty_state: "Hech narsa topilmadi. Izlashni boshlang!",
            continue_shopping: "XARIDNI DAVOM ETTIRISH",
            add_to_bag: "SAVATCHAGA QO'SHISH",
            view_collection: "TO'PLAMNI KO'RISH",
            buy_now: "HOZIR SOTIB OLISH",
            remove: "O'CHIRISH",
            profile: "PROFIL",
            login: "GOOGLE ORQALI KIRISH",
            logout: "CHIQISH",
            welcome: "Xush kelibsiz",
            orders: "MENING BUYURTMALARIM",
            organic_cotton: "100% Tabiiy Paxta",
            organic_cotton_desc: "Kundalik qulaylik uchun nafas oladigan, yumshoq va barqaror mato.",
            premium_stitching: "Premium Tikuv",
            premium_stitching_desc: "Shaklini yo'qotmasdan uzoq vaqt xizmat qiladigan mustahkam choklar.",
            eco_dye: "Ekologik Bo'yoq",
            eco_dye_desc: "Qattiq kimyoviy moddalarsiz, yuvilganda ham yorqin qoladigan ranglar.",
            perfect_fit: "Mukammal Bichim",
            perfect_fit_desc: "Har qanday vaziyat uchun maksimal qulaylik va zamonaviy ko'rinish.",
            redefining_quality: "Sifatni qayta belgilash.",
            premium_desc: "Siz uchun maxsus ishlab chiqilgan premium barqaror matolar.",
            story_title: "FIMO Tarixi",
            story_lead: "Biz oddiy ishonch bilan boshladik: Kiyim nafaqat ajoyib ko'rinishi, balki ikkinchi teri kabi sezilishi kerak.",
            story_body: "Biz tanlagan har bir ip, biz qilgan har bir chok sifatga bo'lgan sadoqatimiz bilan boshqariladi. Bizning kiyimlarimiz qat'iy sinovdan o'tadi va 100% organik paxtadan tayyorlanadi.",
            ultimate_comfort: "Cheksiz Qulaylik",
            no_chemicals: "Zararli Kimyoviy Moddalar",
            explore_quality: "Sifatni Kashf Etish",
            footer_text: "FIMO - Sizning brendingiz, sizning uslubingiz.",
            works_title: "Bizning Ishlarimiz",
            main_desc: "FIMO - yuqori sifatli, zamonaviy va qulay kiyimlar yaratadigan brend. Har bir futbolka va shim kundalik va sport kiyimlari uchun mos bo'lgan yuqori sifatli matolardan tayyorlangan. Bizning maqsadimiz uslubingizni qulaylik va estetikaga aylantirishdir.",
            sizes_label: "O'lchamlar:",
            colors_label: "Ranglar:",
            no_matches: "Oops! Mos mahsulotlar topilmadi.",
            latest_title: "FIMO-dan yangiliklar",
            latest_desc: "Ma'lumotlar, yangiliklar va chok ortidagi sirlar.",
            read_article: "Maqolani o'qish",
            notify_label: "Yangi to'plamlar haqida xabar bering",
            email_placeholder: "Emailingizni kiriting",
            subscribe: "Obuna bo'lish",
            design_yours: "O'Z DIZAYNINGIZNI YARATING",
            custom_studio: "FIMO MAXSUS STUDIYASI",
            pause_rotation: "ROTATSIYANI TO'XTATISH",
            auto_rotate: "AVTO ROTATSIYA",
            select_color: "RANGNI TANLANG",
            fabric: "MATO",
            promo_code: "PROMO KOD",
            enter_code: "Kod kiriting...",
            apply: "QO'LLASH",
            clear: "TOZALASH",
            discount_applied: "chegirma qo'llanildi!",
            estimated_total: "TAXMINIY JAMI",
            confirm_design: "DIZAYNNI TASDIQLASH",
            blog_post1_title: "Organik paxtaning kelajagi",
            blog_post1_excerpt: "Barqaror dehqonchilik kundalik kiyim va qulaylik haqidagi fikrimizni qanday o'zgartirayotganini bilib oling.",
            blog_post1_content: "FIMO-da biz yuqori samarali sport kiyimlari tuproqdan boshlanishiga ishonamiz. Bizning so'nggi to'plamimiz 100% GOTS sertifikatiga ega organik paxtadan tayyorlangan bo'lib, eng qiyin mashg'ulotlaringiz va eng yumshoq dam olish kunlaringiz uchun nafas olishni ta'minlaydi. Biz chiqindisiz ishlab chiqarish jarayoniga sodiqmiz.",
            blog_post2_title: "Zararsiz bo'yash",
            blog_post2_excerpt: "Yangi ekologik toza bo'yash jarayonimiz yorqin va mustahkam ranglarni saqlab qolgan holda qattiq kimyoviy moddalarni yo'q qiladi.",
            blog_post2_content: "An'anaviy to'qimachilikni bo'yash dunyodagi eng ifloslantiruvchi jarayonlardan biridir. FIMO-ning yangi 'Aqua-Save' texnologiyasi suv sarfini 90% ga kamaytiradi va o'simlik asosidagi pigmentlardan foydalanadi. Bu sizning sport kiyimingiz teringizga yoki sayyoramizga zarar yetkazmasdan uzoqroq yorqin qolishini anglatadi.",
            blog_post3_title: "Mukammal bichimni loyihalash",
            blog_post3_excerpt: "FIMO har bir tana turi uchun qanday qilib mukammal siluetni yaratishi haqida sahna ortidagi ko'rinish.",
            blog_post3_content: "Kiyim sizning harakatingizni cheklamasligi kerak; u uni kuchaytirishi kerak. Bizning dizayn laboratoriyamiz 'FIMO Kinetic Cut' — mushaklaringiz bilan birga harakatlanadigan noyob panel tizimini yaratish uchun 3D tana skaneridan foydalanadi. Marafon bo'ladimi yoki qahva ichishga chiqishmi, biz sizni himoya qildik.",
            sustainability: "Ekologiya",
            innovation: "Innovatsiya",
            design: "Dizayn"
        },
        RU: {
            home: "ГЛАВНАЯ",
            blog: "БЛОГ",
            shop: "МАГАЗИН",
            customize: "КАСТОМИЗАЦИЯ",
            features: "ФУНКЦИИ",
            search: "ПОИСК",
            search_placeholder: "Поиск товаров, категорий...",
            cart: "КОРЗИНА",
            wishlist: "ИЗБРАННОЕ",
            empty_state: "Ничего не найдено. Начните исследовать!",
            continue_shopping: "ПРОДОЛЖИТЬ ПОКУПКИ",
            add_to_bag: "В КОРЗИНУ",
            view_collection: "ПОСМОТРЕТЬ КОЛЛЕКЦИЮ",
            buy_now: "КУПИТЬ СЕЙЧАС",
            remove: "УДАЛИТЬ",
            profile: "ПРОФИЛЬ",
            login: "ВОЙТИ ЧЕРЕЗ GOOGLE",
            logout: "ВЫЙТИ",
            welcome: "Добро пожаловать",
            orders: "МОИ ЗАКАЗЫ",
            organic_cotton: "100% Органический хлопок",
            organic_cotton_desc: "Дышащая, мягкая и экологичная ткань для повседневного комфорта.",
            premium_stitching: "Премиальная прошивка",
            premium_stitching_desc: "Прочные швы, обеспечивающие долговечность без потери формы.",
            eco_dye: "Эко-красители",
            eco_dye_desc: "Цвета, которые остаются яркими после стирок без агрессивных химикатов.",
            perfect_fit: "Идеальная посадка",
            perfect_fit_desc: "Разработано для максимального комфорта и стильного вида в любой ситуации.",
            redefining_quality: "Переосмысление качества.",
            premium_desc: "Премиальные экологичные ткани, созданные специально для вас.",
            story_title: "История FIMO",
            story_lead: "Мы начали с простой веры: одежда должна не только выглядеть потрясающе, но и ощущаться как вторая кожа.",
            story_body: "Каждая нить, которую мы выбираем, каждый стежок, который мы делаем, продиктованы нашей одержимостью качеством. Наша одежда проходит строгие испытания и изготавливается из 100% органического хлопка.",
            ultimate_comfort: "Абсолютный комфорт",
            no_chemicals: "Вредные химикаты",
            explore_quality: "Исследуйте качество",
            footer_text: "FIMO - Ваш бренд, ваш стиль.",
            works_title: "Наши Работы",
            main_desc: "FIMO - это бренд, который создает высококачественную, стильную и удобную одежду. Каждая футболка и брюки изготовлены из качественных тканей, подходящих для повседневной и спортивной одежды. Наша цель - превратить ваш стиль в комфорт и эстетику.",
            sizes_label: "Размеры:",
            colors_label: "Цвета:",
            no_matches: "Упс! Подходящих товаров не найдено.",
            latest_title: "Последнее от FIMO",
            latest_desc: "Инсайты, новости и то, что стоит за швами.",
            read_article: "Читать статью",
            notify_label: "Уведомить меня о новых коллекциях",
            email_placeholder: "Введите ваш email",
            subscribe: "Подписаться",
            design_yours: "СОЗДАЙ СВОЙ ДИЗАЙН",
            custom_studio: "КАСТОМ-СТУДИЯ FIMO",
            pause_rotation: "ПАУЗА ВРАЩЕНИЯ",
            auto_rotate: "АВТОВРАЩЕНИЕ",
            select_color: "ВЫБЕРИТЕ ЦВЕТ",
            fabric: "ТКАНЬ",
            promo_code: "ПРОМОКОД",
            enter_code: "Введите код...",
            apply: "ПРИМЕНИТЬ",
            clear: "ОЧИСТИТЬ",
            discount_applied: "скидка применена!",
            estimated_total: "ИТОГО",
            confirm_design: "ПОДТВЕРДИТЬ ДИЗАЙН",
            blog_post1_title: "Будущее органического хлопка",
            blog_post1_excerpt: "Узнайте, как устойчивое земледелие меняет наше представление о повседневной одежде и комфорте.",
            blog_post1_content: "В FIMO мы верим, что высокоэффективная спортивная одежда начинается с почвы. Наша последняя коллекция изготовлена из 100% органического хлопка, сертифицированного GOTS, что обеспечивает воздухопроницаемость для самых тяжелых тренировок и самых мягких дней восстановления. Мы стремимся к безотходному производственному процессу.",
            blog_post2_title: "Окрашивание без вреда",
            blog_post2_excerpt: "Наш новый экологически чистый процесс окрашивания исключает использование агрессивных химикатов, сохраняя при этом яркие и стойкие цвета.",
            blog_post2_content: "Традиционное крашение текстиля — один из самых загрязняющих процессов в мире. Новая технология FIMO «Aqua-Save» сокращает потребление воды на 90% и использует пигменты на растительной основе. Это означает, что ваша спортивная экипировка дольше остается яркой, не нанося вреда вашей коже или планете.",
            blog_post3_title: "Проектирование идеальной посадки",
            blog_post3_excerpt: "Закулисный взгляд на то, как FIMO создает идеальный силуэт для любого типа фигуры.",
            blog_post3_content: "Одежда не должна ограничивать ваши движения; она должна усиливать их. Наша дизайн-лаборатория использует 3D-сканирование тела для создания изделия «FIMO Kinetic Cut» — уникальной системы панелей, которая движется вместе с вашими мышцами. Будь то марафон или поход за кофе, мы позаботимся о вас.",
            sustainability: "Экологичность",
            innovation: "Инновации",
            design: "Дизайн"
        }
    };

    const t = (key) => {
        return translations[language]?.[key] || translations['EN'][key] || key;
    };

    const languages = [
        { code: 'UZ', name: 'O\'zbekcha' },
        { code: 'RU', name: 'Русский' },
        { code: 'EN', name: 'English' }
    ];

    const changeLanguage = (code) => {
        setLanguage(code);
    };

    const addToCart = (product) => {
        setCartItems(prev => [...prev, { ...product, cartId: Date.now() }]);
    };

    const removeFromCart = (cartId) => {
        setCartItems(prev => prev.filter(item => item.cartId !== cartId));
    };

    const toggleLike = (product) => {
        setLikedItems(prev => {
            const isLiked = prev.find(item => item.id === product.id);
            if (isLiked) {
                return prev.filter(item => item.id !== product.id);
            }
            return [...prev, product];
        });
    };

    const loginUser = (userData) => {
        setUser(userData);
    };

    const logoutUser = () => {
        setUser(null);
        localStorage.removeItem('fimo_user');
    };

    const toggleBuy = (product) => {
        setBoughtItems(prev => {
            const isBought = prev.find(item => item.id === product.id);
            if (isBought) {
                return prev.filter(item => item.id !== product.id);
            }
            return [...prev, product];
        });
    };

    const clearBought = () => {
        setBoughtItems([]);
    };

    const value = {
        language,
        languages,
        changeLanguage,
        searchQuery,
        setSearchQuery,
        cartItems,
        addToCart,
        removeFromCart,
        likedItems,
        toggleLike,
        boughtItems,
        toggleBuy,
        clearBought,
        user,
        loginUser,
        logoutUser,
        t
    };

    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    );
};
