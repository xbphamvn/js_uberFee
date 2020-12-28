//Constants
const UBER_X_ARR_PRICE = [8000, 12000, 10000];
const WAIT_PRICE_X = 2000;
const UBER_SUV_ARR_PRICE = [9000, 14000, 12000];
const WAIT_PRICE_SUV = 3000;
const UBER_BLACK_ARR_PRICE = [10000, 16000, 14000];
const WAIT_PRICE_BLACK = 4000;
const MILESTONES_1 = 1;
const MILESTONES_2 = 20;
const WAIT_MILESTONES = 2;
const WAIT_TIME = 3;

//Global functions
var domID = function (id) {
    return document.getElementById(id);
}
var creEle = function (attr) {
    return document.createElement(attr);
}

//Get uber type
var getUberType = function () {
    if (domID("uberX").checked) {
        return "uberX";
    } else if (domID("uberSUV").checked) {
        return "uberSUV";
    } else if (domID("uberBlack").checked) {
        return "uberBlack";
    }
}

//Get input value
var getData = function () {
    return [getUberType(), domID("soKM").value, domID("thoiGianCho").value, domID("tblBody")];
}

//Calculate km fee
var getKmFee = function (kmValue, priceArr) {
    if (kmValue <= 0 || kmValue.trim() === "") {
        return alert('Vui lòng nhập số km lớn hơn 0!');
    } else if (kmValue <= MILESTONES_1) {
        return priceArr[0];
    } else if (kmValue <= MILESTONES_2) {
        return priceArr[0] + (kmValue - MILESTONES_1) * priceArr[1];
    } else if (kmValue > MILESTONES_2) {
        return priceArr[0] + (MILESTONES_2 - MILESTONES_1) * priceArr[1] + (kmValue - MILESTONES_2) * priceArr[2];
    }
}

var getWaitFee = function (waitTime, waitPrice) {
    if (waitTime < 0) {
        return alert('Vui lòng nhập thời gian lớn hơn 0!');
    } else if (waitTime < WAIT_MILESTONES || waitTime === "") {
        return 0;
    } else {
        return Math.round(waitTime / WAIT_TIME) * waitPrice;
    }
}

var totalFees = function () {
    var inputValue = getData();
    switch (inputValue[0]) {
        case "uberX":
            var kmFee = getKmFee(inputValue[1], UBER_X_ARR_PRICE);
            var waitFee = getWaitFee(inputValue[2], WAIT_PRICE_X);
            return kmFee + waitFee;
        case "uberSUV":
            var kmFee = getKmFee(inputValue[1], UBER_SUV_ARR_PRICE);
            var waitFee = getWaitFee(inputValue[2], WAIT_PRICE_SUV);
            return kmFee + waitFee;
        case "uberBlack":
            var kmFee = getKmFee(inputValue[1], UBER_BLACK_ARR_PRICE);
            var waitFee = getWaitFee(inputValue[2], WAIT_PRICE_BLACK);
            return kmFee + waitFee;
        default:
            return alert('Vui lòng chọn một loại xe!');
    }
}

domID("btnTinhTien").onclick = function () {
    var total = totalFees();
    domID("xuatTien").innerHTML = total;
    domID("divThanhTien").style.display = "block";
}

var kmDivider = function (kmValue) {
    if (kmValue <= MILESTONES_1) {
        return [MILESTONES_1];
    } else if (kmValue <= MILESTONES_2) {
        return [MILESTONES_1, kmValue - MILESTONES_1];
    } else if (kmValue > MILESTONES_2) {
        return [MILESTONES_1, MILESTONES_2 - MILESTONES_1, kmValue - MILESTONES_2];
    }
}

var renderRowKm = function (inputArr, priceArr) {
    var kmArr = kmDivider(inputArr[1]);
    for (var i = 0; i < kmArr.length; i++) {
        var tr = creEle("tr");
        var tdType = creEle("td");
        var tdKm = creEle("td");
        var tdPrice = creEle("td");
        var tdFee = creEle("td");

        tdType.innerHTML = inputArr[0];
        tdKm.innerHTML = kmArr[i] + " km";
        tdPrice.innerHTML = priceArr[i] + " đ";
        tdFee.innerHTML = kmArr[i] * priceArr[i] + " đ";

        tr.appendChild(tdType);
        tr.appendChild(tdKm);
        tr.appendChild(tdPrice);
        tr.appendChild(tdFee);

        inputArr[3].appendChild(tr);
    }
}

var renderRowTime = function (inputArr, priceWait) {
    if (inputArr[2] < WAIT_MILESTONES || inputArr[2].trim() === "") {
        return;
    } else {
        var tr = creEle("tr");
        var tdDesc = creEle("td");
        var tdTime = creEle("td");
        var tdPrice = creEle("td");
        var tdFee = creEle("td");

        tdDesc.innerHTML = "Thời gian chờ:";
        tdTime.innerHTML = inputArr[2] + " phút";
        tdPrice.innerHTML = priceWait + " đ";
        tdFee.innerHTML = (Math.round(inputArr[2] / WAIT_TIME) * priceWait) + " đ";

        tr.appendChild(tdDesc);
        tr.appendChild(tdTime);
        tr.appendChild(tdPrice);
        tr.appendChild(tdFee);

        inputArr[3].appendChild(tr);
    }
}

var renderRowTotal = function (inputArr) {
    var tr = creEle("tr");
    tr.className = "alert alert-success";

    var tdDesc = creEle("td");
    var tdTotal = creEle("td");

    tdDesc.setAttribute("colspan", 3);
    tdDesc.innerHTML = "Tổng cộng";
    tdTotal.innerHTML = totalFees() + " đ";

    tr.appendChild(tdDesc);
    tr.appendChild(tdTotal);

    inputArr[3].appendChild(tr);
}

var renderInvoice = function () {
    var inputValue = getData();
    if (inputValue[1] <= 0 || inputValue[1].trim() === "") {
        return alert('Vui lòng nhập số km lớn hơn 0!');
    }
    var tbAppendTo = domID("tblBody");
    tbAppendTo.innerHTML = ""; //reset first

    switch (inputValue[0]) {
        case "uberX":
            renderRowKm(inputValue, UBER_X_ARR_PRICE);
            renderRowTime(inputValue, WAIT_PRICE_X);
            renderRowTotal(inputValue);
            break;
        case "uberSUV":
            renderRowKm(inputValue, UBER_SUV_ARR_PRICE);
            renderRowTime(inputValue, WAIT_PRICE_SUV);
            renderRowTotal(inputValue);
            break;
        case "uberBlack":
            renderRowKm(inputValue, UBER_BLACK_ARR_PRICE);
            renderRowTime(inputValue, WAIT_PRICE_BLACK);
            renderRowTotal(inputValue);
            break;
        default:
            alert('Vui lòng chọn loại xe trước!');
            break;
    }
}

domID("btnInHD").onclick = function () {
    renderInvoice();
}