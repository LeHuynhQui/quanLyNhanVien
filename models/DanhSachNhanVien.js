function DanhSachNhanVien() {
    this.list = [];

    this.timViTriIndex = function(account) {
        let index = this.list.findIndex(nv => nv.account == account)
        return index
    }

    this.themNhanVien = function (nhanVien) {
        this.list.push(nhanVien)
    };

    this.xoaNhanVien = function (index) {
        this.list.splice(index,1)
    };

    this.suaNhanVien = function (index) {
        return this.list[index]
    }

    this.capNhatNhanVien = function (nhanVien) {
        let index = this.timViTriIndex(nhanVien.account);
        if (index!== -1) {
            this.list[index] = nhanVien
        }
    };


    this.timKiemNhanVien = function (key) {
        // chuyen tieng viet co dau sang khong dau
        function removeAccents(str) {
            return str.normalize('NFD')
                      .replace(/[\u0300-\u036f]/g, '')
                      .replace(/đ/g, 'd').replace(/Đ/g, 'D');
        }


        // thuc hien tim kiem
        let mangTimKiem = [];
        this.list.map(nv => {
            if(removeAccents(nv.type).toLowerCase().indexOf(removeAccents(key).toLowerCase()) !==-1) {
                mangTimKiem.push(nv)
            }
        })
        return mangTimKiem;
    };
    
}