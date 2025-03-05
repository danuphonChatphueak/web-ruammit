document.addEventListener("DOMContentLoaded", () => {
    fetchLocationAndUsers(); // ดึงข้อมูลตำแหน่งและจำนวนเพื่อน
});

/**
 * ดึงตำแหน่งปัจจุบันของผู้ใช้และจำนวนเพื่อน
 */
async function fetchLocationAndUsers() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            document.getElementById("location").textContent = `📍 (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`;

            try {
                const apiKey = 'a6e44500d38f456abef635e45c100f21'; // ใส่ API Key ของคุณที่นี่
                const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`);
                const data = await response.json();

                if (data.results && data.results.length > 0) {
                    const location = data.results[0].components;
                    const district = location.city || location.town || location.county || "ไม่พบข้อมูล";
                    const province = location.state || location.province || "ไม่พบข้อมูล";
                    document.getElementById("location").textContent = `📍 ${district}, ${province}`;
                } else {
                    document.getElementById("location").textContent = "📍 ไม่พบข้อมูลตำแหน่ง";
                }
            } catch (error) {
                console.error(error);
                document.getElementById("location").textContent = "📍 ไม่สามารถดึงข้อมูลตำแหน่งได้";
            }
        }, (error) => {
            console.error(error);
            document.getElementById("location").textContent = "📍 ไม่สามารถดึงข้อมูลตำแหน่งได้";
        });
    } else {
        document.getElementById("location").textContent = "📍 ไม่สามารถดึงข้อมูลตำแหน่งได้";
    }

    // กำหนดจำนวนเพื่อนแบบจำลอง
    const friendsCount = 10;
    document.getElementById("friends-count").textContent = `เพื่อน: ${friendsCount} คน`;
}
