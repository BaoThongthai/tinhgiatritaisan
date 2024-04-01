// Import module giaTriTrungBinhTheoDuong từ tệp 'tuyenDuong.js'
import { giaTriTrungBinhTheoDuong } from './tuyenDuong.js';

// Hàm kiểm tra xem tên đường có tồn tại trong danh sách không
function kiemTraTenDuong(tenDuong) {
    var duongKhongDau = tenDuong.replace(/\s+/g, '').toLowerCase(); // Loại bỏ dấu cách và chuyển thành chữ thường
    if (!Object.keys(giaTriTrungBinhTheoDuong).includes(duongKhongDau)) { // Nếu không có tên đường trong danh sách
        alert("Tên đường không tồn tại hoặc chưa được cập nhật !");
        return false;
    }
    return true;
}

// Hàm điền giá trị trung bình khi chọn tuyến đường
function dienGiaTriTrungBinh() {
    var selectedDuong = $("#tuyen-duong").val(); // Lấy giá trị được chọn từ dropdown
    var giaTriInput = $("#gia-trung-binh"); // Ô input để điền giá trị trung bình
    var duongKhongDau = selectedDuong.replace(/\s+/g, '').toLowerCase(); // Loại bỏ dấu cách và chuyển thành chữ thường
    var giaTriTrungBinh = giaTriTrungBinhTheoDuong[duongKhongDau]; // Lấy giá trị trung bình từ danh sách

    if (kiemTraTenDuong(selectedDuong)) { // Kiểm tra xem tên đường có hợp lệ không
        if (!isNaN(giaTriTrungBinh)) { // Kiểm tra xem giá trị trung bình có phải là số không
            giaTriTrungBinh *= 2.1; // Nhân giá trị trung bình với 2
            
            giaTriInput.val(giaTriTrungBinh !== undefined ? giaTriTrungBinh : ""); // Điền giá trị trung bình vào ô input
        } else {
            alert(giaTriTrungBinhTheoDuong[duongKhongDau]);
        }
    }
}

// Hàm định dạng số với dấu phẩy phân tách hàng nghìn
function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Hàm tính giá đất khi nhập kích thước và giá trung bình
function tinhGiaDat() {
    var kichThuoc = parseFloat($("#kich-thuoc").val().replace(/,/g, "")); // Lấy giá trị kích thước và loại bỏ dấu phẩy
    var giaTrungBinh = parseFloat($("#gia-trung-binh").val().replace(/,/g, "")); // Lấy giá trị giá trung bình và loại bỏ dấu phẩy
    var ketQuaElement = $("#ket-qua"); // Element để hiển thị kết quả

    if (isNaN(kichThuoc) || isNaN(giaTrungBinh) || kichThuoc <= 0 || giaTrungBinh <= 0) {
        ketQuaElement.text("Vui lòng nhập giá trị hợp lệ."); // Hiển thị thông báo lỗi nếu giá trị không hợp lệ
    } else {
        var giaDat = kichThuoc * giaTrungBinh; // Tính giá đất
        ketQuaElement.html("Giá đất dự kiến là: " + formatNumberWithCommas(giaDat.toFixed(2)) + " VNĐ"); // Hiển thị kết quả
    }
}

// Hàm hiển thị hoặc ẩn input tài sản gắn liền với đất
function toggleInputVisibility() {
    var taiSanInput = $("#tai-san-input"); // Input tài sản
    var checkBox = $("#co-tai-san"); // Checkbox để chọn có hoặc không có tài sản
    taiSanInput.toggleClass("hidden", !checkBox.prop("checked")); // Ẩn hoặc hiển thị input tài sản tùy thuộc vào trạng thái của checkbox
}

// Hàm tính giá trị tài sản gắn liền với đất
function tinhGiaTriTaiSan() {
    var dienTich = parseFloat($("#dien-tich").val()); // Lấy giá trị diện tích
    var giaTriTaiSan = dienTich * 8000000; // Tính giá trị tài sản
    var ketQuaElement = $("#ket-qua-tai-san"); // Element để hiển thị kết quả

    if (!isNaN(giaTriTaiSan) && giaTriTaiSan > 0) {
        ketQuaElement.html("Giá trị tài sản gắn liền với đất dự kiến là: " + formatNumberWithCommas(giaTriTaiSan.toFixed(2)) + " VNĐ"); // Hiển thị kết quả
    } else {
        ketQuaElement.html("Vui lòng nhập diện tích hợp lệ."); // Hiển thị thông báo lỗi nếu diện tích không hợp lệ
    }
}



// Hàm tính tổng giá trị đất và tài sản gắn liền với đất
function tinhTongGiaTri() {
    var kichThuoc = parseFloat($("#kich-thuoc").val().replace(/,/g, "")); // Lấy giá trị kích thước và loại bỏ dấu phẩy
    var giaTrungBinh = parseFloat($("#gia-trung-binh").val().replace(/,/g, "")); // Lấy giá trị giá trung bình và loại bỏ dấu phẩy
    var giaDat = kichThuoc * giaTrungBinh; // Tính giá trị đất

    var dienTich = parseFloat($("#dien-tich").val()); // Lấy giá trị diện tích
    var giaTriTaiSan = dienTich * 8000000; // Tính giá trị tài sản
    var ketQuaDiv = parseFloat(giaDat.toFixed(2)); // Làm tròn giá trị đất
    var ketQuaTaiSanDiv = parseFloat(giaTriTaiSan.toFixed(2)); // Làm tròn giá trị tài sản

    if (!isNaN(ketQuaDiv) && !isNaN(ketQuaTaiSanDiv)) {
        var tongGiaTri = ketQuaDiv + ketQuaTaiSanDiv; // Tính tổng giá trị
        var formattedTongGiaTri = formatNumberWithCommas(tongGiaTri.toFixed(2)).replace(/(\.00|(?<=\.\d)0+)$/, ''); // Định dạng giá trị tổng
        $("#tong-gia-tri").text(formattedTongGiaTri + " VNĐ"); // Hiển thị giá trị tổng
    } else {
        console.error("Giá trị không hợp lệ!"); // Log lỗi nếu giá trị không hợp lệ
    }
}

// Sự kiện khi người dùng nhập diện tích
$("#dien-tich").on("input", tinhGiaTriTaiSan);
// Sự kiện khi người dùng thay đổi trạng thái của checkbox có tài sản
$("#co-tai-san").on("change", toggleInputVisibility);
// Sự kiện khi người dùng thay đổi tuyến đường
$("#tuyen-duong").on("change", dienGiaTriTrungBinh);
// Sự kiện khi người dùng nhấn nút tính giá đất
$("#tinh-button").on("click", tinhGiaDat);
// Sự kiện khi người dùng nhấn nút tính tổng giá trị
$("#tinh-tong-tai-san").on("click", tinhTongGiaTri);




