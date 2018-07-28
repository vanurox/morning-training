var order_details = [];
var price_list = {
    pizza: 150,
    burger: 50,
    sandwich: 80
};
var grand_total = 0;
var al = document.getElementById("alert");

var toastValue = false;
var toastToggle;
function addItem(){
    var item = items.options[items.selectedIndex].value; // fetching item name from drop down
    if(itemPresent(item)) // checking whether the same item is present or not 
    {   
        //update item quantity which is already present in the list
        updateItem(item);
    }else{
        // add Item to the array
        insertItem(item);
    }
    generateHtml();
}

updateItem = (item)=>{
    var index = findItemIndexByName(item);
    var order = order_details[index];
    order.quantity = +qty.value + +order.quantity;
    order.rowTotal = +order.quantity * +order.price;
}


insertItem = (item)=>{
if (item !== "0" && qty.value !== "") {
        var price = price_list[item];
        var order = {
            itemName: item,
            quantity: qty.value,
            price: price,
            rowTotal: +qty.value * +price
        };

        order_details.push(order);
    }
}

findItemIndexByName = (itemName)=>{
    var result = order_details.findIndex(
        function(v) {
            return v.itemName == itemName
        }
    );
    return result;
}


itemPresent = (itemName)=>{
   var result = findItemIndexByName(itemName);
    return result == -1 ? false : true;
}

function generateHtml(){
    var elem = '';
    grand_total = 0;
    order_details.forEach(function(v,i){
        elem+= '<div class="row">';
        elem+= '<div class="box">' + v.itemName +'</div>';
        elem += `<div class="box"><input value="${v.quantity}" onchange="editRow(this,${v.quantity},${i})"/></div>`;
        elem += '<div class="box">' + v.price +'</div>';
        elem += `<div class="box" id="rowTotal${i}">${v.rowTotal}</div>`;
        elem += '<div class="box delete" onclick="deleteRow(' + i + ',\'' + v.itemName +  '\')">Delete</div>';
        elem+= '</div>';
        grand_total += +v.rowTotal;
    });
    fillDetails.innerHTML = elem;
    grandTotal.innerHTML = grand_total;
}

// function editRow(){
editRow = (box,old_qty,index)=>{
    // console.log(box.value);
    var order = order_details[index];
    if(old_qty != box.value){
        order.quantity = box.value;
        order.rowTotal = +box.value * order.price;
        // generateHtml();
        document.getElementById("rowTotal"+index).innerHTML = order.rowTotal;
        
    }
}

function deleteRow(index,itemName){
    order_details.splice(index,1);
    toggleToast(itemName + ' Deleted');
    generateHtml();
}

function toggleToast(msg){
        if(toastValue == false){
            showBox(msg);
            toastValue = true;
        }
        toastToggle = setInterval(function(){
            if(toastValue == true)
            {
                hideBox();
                toastValue = false;
                clearInterval(toastToggle);
            }
        },3000);
}

function showBox(msg){
    al.innerHTML = msg;
    al.style.opacity = 1;
    al.style.left = "0%";
}

function hideBox(){
    al.innerHTML = '';
    al.style.opacity = 0;
    al.style.left = "-20%";
}