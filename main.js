var dsnv = new DanhSachNhanVien()
var validation = new Validation()

getLocalStorage()

function getEle(id) {
    return document.getElementById(id)
}


function layThongTinNhanVien(isAdd) {
    let account = getEle("tknv").value;
    let name = getEle("name").value;
    let email = getEle("email").value;
    let password = getEle("password").value;
    let date = getEle("datepicker").value;
    let salary = getEle("luongCB").value;
    let position = getEle("chucvu").value;
    let hour = getEle("gioLam").value;


// validation
    var isValid = true;
        
    
    // account
    if (isAdd) {
        isValid&=validation.kiemTraRong(
            account,
            "tbTKNV",
            "* Vui lòng nhập tài khoản."
        )&& 
        validation.kiemTraDoDaiKyTu(
            account,
            "tbTKNV",
            "* Vui lòng nhập từ 4 - 6 ký tự.",
            4,
            6
        )&&
        validation.kiemTraTrung(
            account,
            "tbTKNV",
            "* Tài khoản đã tồn tại!",
            dsnv.list
        )&&
        validation.kiemTraSo(
            account,
            "tbTKNV",
            "* Vui lòng nhập số.",
        );
    }

    // name

    isValid&=validation.kiemTraRong(
        name,
        "tbTen",
        "* Vui lòng nhập tên nhân viên."
    )&&
    validation.kiemTraChu(
        name,
        "tbTen",
        "* Vui lòng nhập chữ."
    )

    // email 
    isValid&=validation.kiemTraRong(
        email,
        "tbEmail",
        "* Vui lòng nhập email nhân viên."
    )&&
    validation.kiemTraEmail(
        email,
        "tbEmail",
        "* Email không đúng định dạng!"
    )

    //password 
    isValid&=validation.kiemTraRong(
        password,
        "tbMatKhau",
        "* Vui lòng nhập mật khẩu."
    )&&
    validation.kiemTraDoDaiKyTu(
        password,
        "tbMatKhau",
        "* Vui lòng nhập từ 6 - 10 ký tự.",
        6,
        10
    )&&
    validation.kiemTraPassword(
        password,
        "tbMatKhau",
        "* Mật khẩu phải chứa ít nhất 1 ký tự số, 1 ký tự in hoa và 1 ký tự đặc biệt."
    )

    // date
    isValid&=validation.kiemTraRong(
        date,
        "tbNgay",
        "* Vui lòng nhập trường này."
    )

    // salary
    isValid&=validation.kiemTraRong(
        salary,
        "tbLuongCB",
        "* Vui lòng nhập lương cơ bản."
    )&&
    validation.kiemTraSo(
        salary,
        "tbLuongCB",
        "* Vui lòng nhập số.",
    )&&
    validation.kiemtraLuongCoBan(
        salary,
        "tbLuongCB",
        "* Vui lòng nhập lương cơ bản từ 10.000.000 - 20.000.000."
    )

    // position
    isValid&=validation.kiemTraChucVu(
        "chucvu",
        "tbChucVu",
        "* Vui lòng chọn chức vụ."
    )


    // hour
    isValid&=validation.kiemTraRong(
        hour,
        "tbGiolam",
        "* Vui lòng nhập số giờ làm."
    )&&
    validation.kiemTraSo(
        hour,
        "tbGiolam",
        "* Vui lòng nhập số.",
    )&&
    validation.kiemTraGioLam(
        hour,
        "tbGiolam",
        "* Vui lòng nhập số giờ làm từ 80 - 200."
    )



    if (isValid) {
        let nhanVien = new NhanVien (account, name, email, password, date, salary, position, hour);
        nhanVien.tinhTongLuong();
        nhanVien.xepLoaiNhanVien();
        return nhanVien
    }

    return null;
}



// add nhan vien
function handleSubmit(event) {
    event.preventDefault();
    let nhanVien = layThongTinNhanVien(true);
    if(!nhanVien) return;

    dsnv.themNhanVien(nhanVien);
    taoBang(dsnv.list);
    setLocalStorage()
    resetInput()
    document.getElementById('btnDong').click()
}

function setLocalStorage() {
    localStorage.setItem("DSNV",JSON.stringify(dsnv.list))
}

function getLocalStorage() {
    if(localStorage.getItem("DSNV")) {
        dsnv.list = JSON.parse(localStorage.getItem("DSNV"));
        taoBang(dsnv.list)
    }
}

// show nhan vien
function taoBang(list) {
    let bangNhanVien = ""
    list.map((nv, index) => {
        let pos = ""
        switch (nv.position) {
            case "SEP":
                pos = "Giám đốc"
                break;
        
            case "TRUONG PHONG":
                pos = "Trưởng Phòng"
                break;

            case "NHAN VIEN":
                pos = "Nhân Viên"
                break;
        }

        bangNhanVien += `
            <tr>
                <td>${nv.account}</td>
                <td>${nv.name}</td>
                <td>${nv.email}</td>
                <td>${nv.date}</td>
                <td>${pos}</td>
                <td>${nv.totalSalary.toLocaleString()}</td>
                <td>${nv.type}</td>
                <td>
                    <button type="button" class="btn btn-danger mb-2" onclick="xoaNhanVien(${index})">XOÁ</button>
                    <button type="button" class="btn btn-primary" data-toggle="modal"
                    data-target="#myModal" onclick="handleSua(${index})">SỬA</button>
                </td>
            </tr>
        `
    })

    getEle("tableDanhSach").innerHTML = bangNhanVien
    
}


// xoa nhan vien
function xoaNhanVien(index) {
    dsnv.xoaNhanVien(index)
    taoBang(dsnv.list)
    setLocalStorage()
}


// sua nhan vien
function handleSua(index) {
    getEle("btnThemNV").classList.add("d-none");
    getEle("btnCapNhat").classList.remove("d-none");
    getEle("header-title").innerHTML = "CẬP NHẬT NHÂN VIÊN";
    document.querySelectorAll(".sp-thongbao").forEach(span => {
        span.innerHTML = ""
    })
    

    let nhanVien = dsnv.suaNhanVien(index)

    if (nhanVien) {
        getEle("tknv").value = nhanVien.account;
        getEle("tknv").disabled = true;

        getEle("name").value = nhanVien.name;
        getEle("email").value = nhanVien.email;
        getEle("password").value = nhanVien.password;
        getEle("datepicker").value = nhanVien.date;
        getEle("luongCB").value = nhanVien.salary;
        getEle("chucvu").value = nhanVien.position;
        getEle("gioLam").value = nhanVien.hour;
    }

}


// cap nhat nhan vien
function capNhatNhanVien() {
    let nhanVien = layThongTinNhanVien(false);

    if (nhanVien) {
        getEle("btnThemNV").classList.remove("d-none");
        getEle("btnCapNhat").classList.add("d-none");
        getEle("header-title").innerHTML = "THÊM NHÂN VIÊN";
        getEle("tknv").disabled = false;

        dsnv.capNhatNhanVien(nhanVien);
        taoBang(dsnv.list);
        setLocalStorage()
        resetInput();
        document.getElementById('btnDong').click()

    }

}


// tim kiem nhan vien
getEle("btnTimNV").addEventListener("click", e => {
    var key = getEle("searchName").value

    let mangNVTimKiem = dsnv.timKiemNhanVien(key)

    taoBang(mangNVTimKiem)

})


// reset input
function resetInput() {
    getEle("tknv").value = "";
    getEle("name").value = "";
    getEle("email").value = "";
    getEle("password").value = "";
    // getEle("datepicker").value = "";
    getEle("luongCB").value = "";
    getEle("chucvu").selectedIndex = 0;
    getEle("gioLam").value = "";
}

function handleClose() {
    resetInput()
    getEle("tknv").disabled = false;

}

function setLayoutAddBtn(params) {
    getEle("tknv").disabled = false;
    resetInput()
    getEle("btnThemNV").classList.remove("d-none");
    getEle("btnCapNhat").classList.add("d-none");
    getEle("header-title").innerHTML = "THÊM NHÂN VIÊN";    
}