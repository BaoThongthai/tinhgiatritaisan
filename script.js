import { giaTriTrungBinhTheoDuong } from './tuyenDuong.js';

function kiemTraTenDuong(tenDuong) {
    var duongKhongDau = tenDuong.replace(/\s+/g, '').toLowerCase();
    if (!Object.keys(giaTriTrungBinhTheoDuong).includes(duongKhongDau)) {
        alert("Tên đường không tồn tại hoặc chưa được cập nhật !");
        return false;
    }
    return true;
}

function dienGiaTriTrungBinh() {
    var selectedDuong = document.getElementById("tuyen-duong").value;
    var giaTriInput = document.getElementById("gia-trung-binh");
    var duongKhongDau = selectedDuong.replace(/\s+/g, '').toLowerCase();
    var giaTriTrungBinh = giaTriTrungBinhTheoDuong[duongKhongDau];

    if (kiemTraTenDuong(selectedDuong)) {
        giaTriInput.value = giaTriTrungBinh !== undefined ? giaTriTrungBinh : "";
    }
}

function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function tinhGiaDat() {
    var kichThuoc = parseFloat(document.getElementById("kich-thuoc").value.replace(/,/g, ""));
    var giaTrungBinh = parseFloat(document.getElementById("gia-trung-binh").value.replace(/,/g, ""));
    var ketQuaElement = document.getElementById("ket-qua");

    if (isNaN(kichThuoc) || isNaN(giaTrungBinh) || kichThuoc <= 0 || giaTrungBinh <= 0) {
        ketQuaElement.innerText = "Vui lòng nhập giá trị hợp lệ.";
    } else {
        var giaDat = kichThuoc * giaTrungBinh;
        ketQuaElement.innerHTML = "Giá đất dự kiến là: " + formatNumberWithCommas(giaDat.toFixed(2)) + " VNĐ";
    }
}

function toggleInputVisibility() {
    var taiSanInput = document.getElementById("tai-san-input");
    var checkBox = document.getElementById("co-tai-san");
    taiSanInput.classList.toggle("hidden", !checkBox.checked);
}

function tinhGiaTriTaiSan() {
    var dienTich = parseFloat(document.getElementById("dien-tich").value);
    var giaTriTaiSan = dienTich * 8000000;
    var ketQuaElement = document.getElementById("ket-qua-tai-san");

    if (!isNaN(giaTriTaiSan) && giaTriTaiSan > 0) {
        ketQuaElement.innerHTML = "Giá trị tài sản gắn liền với đất dự kiến là: " + formatNumberWithCommas(giaTriTaiSan.toFixed(2)) + " VNĐ";
    } else {
        ketQuaElement.innerHTML = "Vui lòng nhập diện tích hợp lệ.";
    }
}

function tinhTongGiaTri() {
    var kichThuoc = parseFloat(document.getElementById("kich-thuoc").value.replace(/,/g, ""));
    var giaTrungBinh = parseFloat(document.getElementById("gia-trung-binh").value.replace(/,/g, ""));
    var giaDat = kichThuoc * giaTrungBinh;
    var ketQuaDiv = parseFloat(giaDat.toFixed(2));

    var dienTich = parseFloat(document.getElementById("dien-tich").value);
    var giaTriTaiSan = dienTich * 8000000;
    var ketQuaTaiSanDiv = parseFloat(giaTriTaiSan.toFixed(2));

    if (!isNaN(ketQuaDiv) && !isNaN(ketQuaTaiSanDiv)) {
        var tongGiaTri = ketQuaDiv + ketQuaTaiSanDiv;
        // Loại bỏ các số thập phân không cần thiết
        var formattedTongGiaTri = formatNumberWithCommas(tongGiaTri.toFixed(2)).replace(/(\.00|(?<=\.\d)0+)$/, '');
        document.getElementById("tong-gia-tri").innerText = formattedTongGiaTri + " VNĐ";
    } else {
        console.error("Giá trị không hợp lệ!");
    }
}

document.getElementById("dien-tich").addEventListener("input", tinhGiaTriTaiSan);
document.getElementById("co-tai-san").addEventListener("change", toggleInputVisibility);
document.getElementById("tuyen-duong").addEventListener("change", dienGiaTriTrungBinh);
document.getElementById("tinh-button").addEventListener("click", tinhGiaDat);
document.getElementById("tinh-tong-tai-san").addEventListener("click", tinhTongGiaTri);
