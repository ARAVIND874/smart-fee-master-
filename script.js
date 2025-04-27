const loginPage = document.getElementById('loginPage');
const billingPage = document.getElementById('billingPage');
const billForm = document.getElementById('billForm');
const billsTableBody = document.querySelector('#billsTable tbody');
const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');

loginForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  if (username === 'admin' && password === '1234') {
    loginPage.classList.add('hidden');
    billingPage.classList.remove('hidden');
  } else {
    loginError.classList.remove('hidden');
  }
});

billForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const regNo = document.getElementById('registerNo').value;
  const name = document.getElementById('studentName').value;
  const dept = document.getElementById('department').value;
  const type = document.getElementById('billType').value;
  const sem = document.getElementById('semesterNumber').value;
  const amount = document.getElementById('billAmount').value;
  const date = document.getElementById('billDate').value;

  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td>${regNo}</td>
    <td>${name}</td>
    <td>${dept}</td>
    <td>${type}</td>
    <td>${sem}</td>
    <td>₹${amount}</td>
    <td>${date}</td>
    <td><button onclick="generateReceipt('${regNo}','${name}','${dept}','${type}','${sem}','${amount}','${date}')">Print</button></td>
  `;
  billsTableBody.appendChild(tr);

  billForm.reset();
});

function generateReceipt(regNo, name, dept, type, sem, amount, date) {
  billingPage.classList.add('hidden');
  document.getElementById('billReceipt').classList.remove('hidden');

  document.getElementById('receiptNo').innerText = `#COL-${Math.floor(Math.random() * 90000) + 10000}`;
  document.getElementById('issueDate').innerText = new Date().toLocaleDateString();
  document.getElementById('rReg').innerText = regNo;
  document.getElementById('rName').innerText = name;
  document.getElementById('rDept').innerText = dept;
  document.getElementById('rType').innerText = type;
  document.getElementById('rSem').innerText = sem;
  document.getElementById('rAmount').innerText = amount;
  document.getElementById('rDate').innerText = date;

  // Amount in words
  document.getElementById('rAmountWords').innerText = numberToWords(amount).toUpperCase() + " ONLY";
}

function triggerPrint() {
  window.print();
}

// Amount to words function
function numberToWords(num) {
  const a = ['','one','two','three','four','five','six','seven','eight','nine','ten',
             'eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'];
  const b = ['','','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'];

  if ((num = num.toString()).length > 9) return 'overflow';
  let n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{3})$/);
  if (!n) return; 
  let str = '';
  str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + ' crore ' : '';
  str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + ' lakh ' : '';
  str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + ' thousand ' : '';
  str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) : '';
  return str.trim();
}
