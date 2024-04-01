import { giaTriTrungBinhTheoDuong } from './tuyenDuong.js';

// Hàm kiểm tra xem tên đường đã nhập có khớp với các tuyến đường trong giaTriTrungBinhTheoDuong không
function kiemTraTenDuong(tenDuong) {
    var duongKhongDau = tenDuong.replace(/\s+/g, '').toLowerCase(); // Định nghĩa biến duongKhongDau ở đây
    if (Object.keys(giaTriTrungBinhTheoDuong).includes(duongKhongDau)) {
        return true;
    } else {
        alert("Tên đường không tồn tại hoặc chưa được cập nhật !");
        return false;
    }
}

function dienGiaTriTrungBinh() {
    var selectedDuong = document.getElementById("tuyen-duong").value;
    var giaTriInput = document.getElementById("gia-trung-binh");
    var duongKhongDau = selectedDuong.replace(/\s+/g, '').toLowerCase(); // Đảm bảo duongKhongDau được định nghĩa trước khi sử dụng
    var giaTriTrungBinh = giaTriTrungBinhTheoDuong[duongKhongDau];

    // Kiểm tra xem tên đường có tồn tại không
    if (kiemTraTenDuong(selectedDuong)) {
        if (giaTriTrungBinh !== undefined) {
            giaTriInput.value = giaTriTrungBinh;
        } else {
            giaTriInput.value = ""; // Nếu không tìm thấy giá trị trung bình, xóa giá trị hiện tại của ô input
        }
    }
}


// Hàm để định dạng số với dấu phẩy sau mỗi 3 chữ số và tự đánh dấu mỗi 3 số 0
function formatNumberWithCommas(number) {
    var parts = number.toString().split(".");
    var decimalPart = parts[1] ? parts[1].replace(/0{2}$/, "") : ""; // Loại bỏ hai số 0 sau dấu thập phân (nếu có)
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    var formattedNumber = parts[0] + (decimalPart ? "." + decimalPart : ""); // Thêm lại phần thập phân nếu có
    return formattedNumber;
}

// Hàm tính giá đất
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

//Ẩn hiện giá trị tài sản gắn liền với đất
function toggleInputVisibility() {
    var taiSanInput = document.getElementById("tai-san-input");
    var checkBox = document.getElementById("co-tai-san");
    if (checkBox.checked) {
        taiSanInput.classList.remove("hidden");
    } else {
        taiSanInput.classList.add("hidden");
    }
}

//Tính giá trị tài sản gắn liền với đất
function tinhGiaTriTaiSan() {
    var dienTich = parseFloat(document.getElementById("dien-tich").value);
    var giaTriTaiSan = dienTich * 8000000; // Giá trị tài sản = diện tích * 8,000,000

    var ketQuaElement = document.getElementById("ket-qua-tai-san");
    if (!isNaN(giaTriTaiSan) && giaTriTaiSan > 0) {
        ketQuaElement.innerHTML = "Giá trị tài sản gắn liền với đất dự kiến là: " + formatNumberWithCommas2(giaTriTaiSan.toFixed(2)) + " VNĐ";
    } else {
        ketQuaElement.innerHTML = "Vui lòng nhập diện tích hợp lệ.";
    }
}
//format cho giá trị tài sản tính ra
function formatNumberWithCommas2(number) {
    var parts = number.toString().split(".");
    var decimalPart = parts[1] ? parts[1].replace(/0{2}$/, "") : ""; // Loại bỏ hai số 0 sau dấu thập phân (nếu có)
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    var formattedNumber = parts[0] + (decimalPart ? "." + decimalPart : ""); // Thêm lại phần thập phân nếu có
    return formattedNumber;
}


//Tổng giá trị tài sản (Đất + nhà)
function tinhTongGiaTri() {
    var kichThuoc = parseFloat(document.getElementById("kich-thuoc").value.replace(/,/g, ""));
    var giaTrungBinh = parseFloat(document.getElementById("gia-trung-binh").value.replace(/,/g, ""));
    var giaDat = kichThuoc * giaTrungBinh;
    var ketQuaDiv = parseFloat(formatNumberWithCommas(giaDat.toFixed(2)).replace(/,/g, ''));


    var dienTich = parseFloat(document.getElementById("dien-tich").value);
    var giaTriTaiSan = dienTich * 8000000; // Giá trị tài sản = diện tích * 8,000,000
    var ketQuaTaiSanDiv = parseFloat(formatNumberWithCommas(giaTriTaiSan.toFixed(2)).replace(/,/g, ''));



    if (!isNaN(ketQuaDiv) && !isNaN(ketQuaTaiSanDiv)) {
        var tongGiaTri = ketQuaDiv + ketQuaTaiSanDiv;

        document.getElementById("tong-gia-tri").innerText = tongGiaTri + " VNĐ";
    } else {
        console.error("Giá trị không hợp lệ!");
    }
}






document.getElementById("dien-tich").addEventListener("input", tinhGiaTriTaiSan);
document.getElementById("co-tai-san").addEventListener("change", toggleInputVisibility);
document.getElementById("tuyen-duong").addEventListener("change", dienGiaTriTrungBinh);
document.getElementById("tinh-button").addEventListener("click", tinhGiaDat);
document.getElementById("tinh-tong-tai-san").addEventListener("click", tinhTongGiaTri);





