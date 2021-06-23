function NhanVien (account, name, email, password, date, salary, position, hour) {
    this.account = account;
    this.name = name;
    this.email = email;
    this.password = password;
    this.date = date;
    this.salary = salary;
    this.position = position;
    this.hour = hour;
    this.totalSalary = 0;
    this.type = "Nhân viên trung bình";

    this.tinhTongLuong = function () {
        switch (this.position) {
            case "SEP":
                this.totalSalary = this.salary * 3;
                break;
            
            case "TRUONG PHONG":
                this.totalSalary = this.salary * 2;
                break;
        
            default:
                this.totalSalary = this.salary * 1;
                break;
        }
    };

    this.xepLoaiNhanVien = function () {
        if (this.hour < 160) {
            this.type = "Nhân viên trung bình"
        } 
        
        if (this.hour >= 160) {
            this.type = "Nhân viên khá"
        }
        
        if (this.hour >= 176) {
            this.type = "Nhân viên giỏi"
        }
        
        if (this.hour >= 192) {
            this.type = "Nhân viên xuất sắc"
        }
    };
}