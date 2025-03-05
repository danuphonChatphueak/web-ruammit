
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
            <div>
                <img src="http://localhost:7000${img.image_path}" width="200" />
                <p><strong>ชื่อห้อง:</strong> ${img.room_name}</p>
                <p><strong>จำนวนคน:</strong> ${img.limit_user}</p>
                
            </div>
        `).join("");
  
        document.getElementById("room_info").innerHTML = html;
    } catch (error) {
        console.error("❌ Error loading images:", error);
        document.getElementById("room_info").innerHTML = "<p>⚠️ ไม่สามารถโหลดภาพได้</p>";
    }
  }
  
  // ✅ โหลดรูปเมื่อหน้าเว็บโหลดเสร็จ
  window.onload = loadImages;
  





async function uploadImage() {
    const fileInput = document.getElementById("image-upload");
    const roomName = document.getElementById("room-name").value.trim();
    const limitusers = parseInt(document.getElementById("member-count").value.trim(), 10);
    const typeName = document.getElementById("category").value.trim();
    const gendertype = document.getElementById("gender").value.trim();
    const descrip = document.getElementById("additional-info").value.trim();


    if (!roomName) {
        alert("❌ กรุณาใส่ชื่อของคุณ!");
        return;
    }

    if (!typeName) {
        alert("❌ กรุณาใส่ชื่อกิจกรรม!");
        return;
    }

    if (!gendertype) {
        alert("❌ กรุณาgender!");
        return;
    }

    if (!fileInput.files.length) {
        alert("❌ กรุณาเลือกไฟล์ก่อน!");
        return;
    }

    if (isNaN(limitusers)) {
        alert("❌ กรุณาใส่จำนวนคนที่เป็นตัวเลข!");
        return;
    }

    let formData = new FormData();
    formData.append("room_name", roomName);
    formData.append("type", typeName);
    formData.append("description", descrip);
    formData.append("gender", gendertype);
    formData.append("limit_user", limitusers);
    formData.append("image", fileInput.files[0]);
    

    try {
        let response = await fetch("http://localhost:7000/upload", {  // ✅ ใช้ `POST /upload`
            method: "POST",
            body: formData
        });

        let result = await response.json();
        if (response.ok) {
            alert("✅ อัปโหลดสำเร็จ!");
            loadImages();  // ✅ โหลดรูปใหม่หลังอัปโหลด
        } else {
            alert("❌ อัปโหลดไม่สำเร็จ: " + result.message);
        }
    } catch (error) {
        console.error("❌ เกิดข้อผิดพลาดในการอัปโหลดรูปภาพ:", error);
        alert("❌ อัปโหลดล้มเหลว!");
    }
}
