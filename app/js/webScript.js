//ปุ่มค้นหา
document.getElementById("search-button").addEventListener("click", function () {
  document.querySelector(".search-box").classList.toggle("active");
  document.querySelector(".search-btn").classList.toggle("active");
});

document.getElementById("search-back").addEventListener("click", function () {
  document.querySelector(".search-box").classList.toggle("active");
  document.querySelector(".search-btn").classList.toggle("active");
});

//ปุ่มเมนูโปรไฟล์
document.getElementById("menu-button").addEventListener("click", function () {
  document.querySelector(".menu-box").classList.toggle("active");
  document.querySelector(".menu-button").classList.toggle("active");
});

document.getElementById("menu-back").addEventListener("click", function () {
  document.querySelector(".menu-button").classList.toggle("active");
  document.querySelector(".menu-box").classList.toggle("active");
});

//ชนิดกิจกรรม
document.getElementById("app-box").addEventListener("click", function () {
  document.querySelector(".app-box").classList.toggle("active");
  document.querySelector(".app-button").classList.toggle("active");
  document.querySelector(".app-back").classList.toggle("active");
});

document.getElementById("app-back").addEventListener("click", function () {
  document.querySelector(".app-box").classList.toggle("active");
  document.querySelector(".app-button").classList.toggle("active");
  document.querySelector(".app-back").classList.toggle("active");
});

const button = document.getElementById("scrollRight");

button.onclick = () => {
  document.getElementById("block_kind").scrollLeft += 150;
};

const btn = document.getElementById("scrollLeft");

btn.onclick = () => {
  document.getElementById("block_kind").scrollLeft -= 150;
};


//ห้องกิจกรรม
async function loadImages() {
  try {
      let response = await fetch("http://localhost:7000/image");
      let images = await response.json();

      if (!Array.isArray(images) || images.length === 0) {
          console.warn("⚠️ ไม่มีรูปภาพที่โหลดได้");
          document.getElementById("room_info").innerHTML = "<p>❌ ไม่พบรูปภาพ</p>";
          return;
      }

      let html = images.map(img => `
          <div  onclick="viewDetail('${img.room_id}')">
              <img src="${img.image_path}">
              <p><strong>ชื่อห้อง:</strong> ${img.room_name}</p>
              <p><strong>เพศ:</strong> ${img.gender}</p>
              <p><strong>จำนวนคน:</strong> ${img.limit_user}</p>
              
          </div>
      `).join("");

      document.getElementById("room_info").innerHTML = html;
  } catch (error) {
      console.error("❌ Error loading images:", error);
      document.getElementById("room_info").innerHTML = "<p>⚠️ ไม่สามารถโหลดภาพได้</p>";
  }
}

function viewDetail(id) {
  window.location.href = `room.html?id=${id}`; 
}

// ✅ โหลดรูปเมื่อหน้าเว็บโหลดเสร็จ
window.onload = loadImages;


//สร้างห้อง
document.getElementById("create-room").addEventListener("click", function () {
  window.open("create.html", "_blank");
});

document.getElementById("chat-popup").addEventListener("click", function () {
  window.open("chat.html", "_blank");
});


