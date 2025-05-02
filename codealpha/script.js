// بيانات الصور الحقيقية من Unsplash
const images = [
    { 
        src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb', 
        caption: 'منظر طبيعي خلاب', 
        category: 'nature' 
    },
    { 
        src: 'https://images.unsplash.com/photo-1452570053594-1b985d6ea890', 
        caption: 'جبال شاهقة', 
        category: 'nature' 
    },
    { 
        src: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df', 
        caption: 'مدينة نيويورك', 
        category: 'architecture' 
    },
    { 
        src: 'https://images.unsplash.com/photo-1496568816309-51d7c20e3b21', 
        caption: 'برج خليفة', 
        category: 'architecture' 
    },
    { 
        src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330', 
        caption: 'امرأة مبتسمة', 
        category: 'people' 
    },
    { 
        src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d', 
        caption: 'رجل وسيم', 
        category: 'people' 
    },
    { 
        src: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f', 
        caption: 'غروب الشمس', 
        category: 'nature' 
    },
    { 
        src: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07', 
        caption: 'زهور الربيع', 
        category: 'nature' 
    },
    { 
        src: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f', 
        caption: 'عارضة أزياء', 
        category: 'people' 
    }
];

// المحتوى الإنجليزي
const englishContent = {
    title: "IMAGE GALLERY",
    searchPlaceholder: "Search images...",
    filterAll: "All",
    filterNature: "Nature",
    filterArchitecture: "Architecture",
    filterPeople: "People",
    previous: "Previous",
    next: "Next",
    languageBtn: "العربية"
};

// العناصر DOM
const gallery = document.getElementById('gallery');
const searchInput = document.getElementById('searchInput');
const filterButtons = document.querySelectorAll('.filter-btn');
const languageBtn = document.getElementById('languageBtn');
const galleryTitle = document.getElementById('galleryTitle');
const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const modalCaption = document.getElementById('modalCaption');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const closeBtn = document.querySelector('.close');

let currentImages = [];
let currentIndex = 0;
let isEnglish = false;

// تهيئة المعرض
function initGallery() {
    renderGallery(images);
    currentImages = images;
}

// عرض الصور في المعرض
function renderGallery(imagesToRender) {
    gallery.innerHTML = '';
    imagesToRender.forEach((image, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.dataset.index = index;
        galleryItem.dataset.category = image.category;
        
        const img = document.createElement('img');
        img.src = image.src;
        img.alt = image.caption;
        
        const caption = document.createElement('div');
        caption.className = 'caption';
        caption.textContent = image.caption;
        
        galleryItem.appendChild(img);
        galleryItem.appendChild(caption);
        gallery.appendChild(galleryItem);
        
        // حدث النقر لفتح النافذة
        galleryItem.addEventListener('click', () => openModal(index, imagesToRender));
    });
}

// فتح النافذة بالصورة المحددة
function openModal(index, imagesArray) {
    currentImages = imagesArray;
    currentIndex = index;
    modal.style.display = 'block';
    updateModal();
}

// تحديث محتوى النافذة
function updateModal() {
    modalImage.src = currentImages[currentIndex].src;
    modalCaption.textContent = currentImages[currentIndex].caption;
}

// إغلاق النافذة
function closeModal() {
    modal.style.display = 'none';
}

// تصفية الصور حسب الفئة
function filterImages(category) {
    if (category === 'all') {
        renderGallery(images);
        currentImages = images;
        return;
    }
    
    const filteredImages = images.filter(image => image.category === category);
    renderGallery(filteredImages);
    currentImages = filteredImages;
}

// بحث الصور
function searchImages(query) {
    const searchedImages = images.filter(image => 
        image.caption.toLowerCase().includes(query.toLowerCase())
    );
    renderGallery(searchedImages);
    currentImages = searchedImages;
}

// تبديل اللغة
function toggleLanguage() {
    isEnglish = !isEnglish;
    
    if (isEnglish) {
        // التبديل إلى الإنجليزية
        galleryTitle.textContent = englishContent.title;
        searchInput.placeholder = englishContent.searchPlaceholder;
        document.querySelector('[data-filter="all"]').textContent = englishContent.filterAll;
        document.querySelector('[data-filter="nature"]').textContent = englishContent.filterNature;
        document.querySelector('[data-filter="architecture"]').textContent = englishContent.filterArchitecture;
        document.querySelector('[data-filter="people"]').textContent = englishContent.filterPeople;
        prevBtn.textContent = englishContent.previous;
        nextBtn.textContent = englishContent.next;
        languageBtn.textContent = englishContent.languageBtn;
        document.body.style.direction = 'ltr';
        document.documentElement.lang = 'en';
    } else {
        // التبديل إلى العربية
        galleryTitle.textContent = 'معرض الصور';
        searchInput.placeholder = 'ابحث عن الصور...';
        document.querySelector('[data-filter="all"]').textContent = 'الكل';
        document.querySelector('[data-filter="nature"]').textContent = 'الطبيعة';
        document.querySelector('[data-filter="architecture"]').textContent = 'معالم';
        document.querySelector('[data-filter="people"]').textContent = 'أشخاص';
        prevBtn.textContent = 'السابق';
        nextBtn.textContent = 'التالي';
        languageBtn.textContent = 'English';
        document.body.style.direction = 'rtl';
        document.documentElement.lang = 'ar';
    }
}

// أحداث المستخدم
searchInput.addEventListener('input', (e) => {
    searchImages(e.target.value);
});

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        filterImages(button.dataset.filter);
    });
});

languageBtn.addEventListener('click', toggleLanguage);

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    updateModal();
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % currentImages.length;
    updateModal();
});

closeBtn.addEventListener('click', closeModal);

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// التنقل بواسطة لوحة المفاتيح
document.addEventListener('keydown', (e) => {
    if (modal.style.display === 'block') {
        if (e.key === 'ArrowLeft') {
            currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
            updateModal();
        } else if (e.key === 'ArrowRight') {
            currentIndex = (currentIndex + 1) % currentImages.length;
            updateModal();
        } else if (e.key === 'Escape') {
            closeModal();
        }
    }
});

// بدء تشغيل المعرض
initGallery();