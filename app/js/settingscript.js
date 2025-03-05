function changeSection(sectionId) {
    // ซ่อนทุกๆ section
    let sections = document.querySelectorAll('.section');
    sections.forEach(section => section.style.display = 'none');

    // เปลี่ยนแปลงเมนูที่เลือก
    let menuItems = document.querySelectorAll('.sidebar ul li');
    menuItems.forEach(item => item.classList.remove('active'));
    document.querySelector(`.sidebar ul li[onclick="changeSection('${sectionId}')"]`).classList.add('active');

    // แสดง section ที่เลือก
    document.getElementById(sectionId).style.display = 'block';
}

function openPopup() {
    document.getElementById('popup').style.display = 'flex';
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
}

function saveEmail() {
    let newEmail = document.getElementById('newEmail').value;
    document.getElementById('email').innerText = newEmail;
    closePopup();
}

function submitFeedback() {
    let feedback = document.getElementById('feedbackText').value;
    alert('ข้อเสนอแนะของคุณ: ' + feedback);
    document.getElementById('feedbackText').value = '';
}

// Default เริ่มต้นที่บัญชีของคุณ
changeSection('account');
