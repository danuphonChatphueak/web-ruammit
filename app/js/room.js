

async function loadImageDetail() {
    const params = new URLSearchParams(window.location.search);
    const imageId = params.get("id"); // ดึงค่า id จาก URL

    if (!imageId) {
        document.getElementById("imageDetail").innerHTML = "<p>❌ ไม่พบข้อมูล</p>";
        return;
    }

    let response = await fetch(`http://localhost:7000/image/${imageId}`); // ดึงข้อมูลจาก API
    let img = await response.json();

    if (img.error) {
        document.getElementById("imageDetail").innerHTML = "<p>❌ ไม่พบรูปภาพ</p>";
        return;
    }

    let html = `

                <h2><strong>ชื่อห้องกิจกรรม:</strong> ${img.room_name}</h2>
                <div class="c1">
                <img src="${img.image_path}" width="400" />
                <button id="enter1" >
                เข้าร่วม</div>
                </button>
                </div>
                <div class="c2">
                <p>ประเภทกิจกรรม: ${img.type}</p>
                <br>
                <p>$เพศ: ${img.gender}</p>
                <br>
                <p>จำนวนคน: ${img.limit_user}</p>
                <br>
                <p>คำอธิบายห้องกิจกรรม: ${img.description}</p>
                <br>
                </div>
                <br><br>             
            `;

    document.getElementById("imageDetail").innerHTML = html;
}

function goBack() {
    window.history.back(); // กลับไปหน้าก่อนหน้า
}

window.onload = loadImageDetail ;
