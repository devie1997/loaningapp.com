const submitNewClient = document.getElementById("submit-new-client");
const addNewClient = document.getElementById("add-new-client");
const addNewClientBox = document.getElementById("add-new-client-box");
const exitNewClientBox = document.getElementById("exit-new-client-box");
const updateClientInfo = document.getElementById("update-client-info");
const paymentUpdate = document.getElementById("payment-update");
const clientDetails = document.getElementById("client-details");
const namePage = document.getElementById("name-page");
const exitTable = document.getElementById("exit-table");
const clientName = document.getElementById("client-name").value;
const loanAmount = document.getElementById("loan-amount").value;
const payDate = document.getElementById("pay-date").value;
const thead = document.querySelector("thead");
const tbody = document.querySelector("tbody");
const newClientArray = [];
let lastClickedClient = null;

addNewClient.addEventListener("click", () => {
  addNewClientBox.style.display = "block";
  addNewClient.style.display = "none";
  document.getElementById("client-name").value = "";
  document.getElementById("loan-amount").value = "";
  document.getElementById("pay-date").value = "";
});

exitNewClientBox.addEventListener("click", () => {
  addNewClientBox.style.display = "none";
  addNewClient.style.display = "block";
});

updateClientInfo.addEventListener("click", () => {
  paymentUpdate.style.display = "block";
  updateClientInfo.style.display = "none";
  clientDetails.style.display = "none";
});
exitTable.addEventListener("click", () => {
  namePage.style.display = "block";
  clientDetails.style.display = "none";
  addNewClient.style.display = "block";
});
submitNewClient.addEventListener("click", () => {
  const clientName = document.getElementById("client-name").value;
  const loanAmount = document.getElementById("loan-amount").value;
  const payDate = document.getElementById("pay-date").value;
  const interest = loanAmount * 0.35;
  const totalAmount = interest + parseFloat(loanAmount);
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const currentDate = `${year}-${month}-${day}`;

  const client = {
    name: {
      clientname: clientName,
    },
    header: {
      date: "Date",
      amount: "Amount",
      interest: "Interest",
      total: "Total",
      douAmount: "Dou Date",
    },
    body: {
      todayDate: currentDate,
      loan: "R " + loanAmount,
      interest: "R " + interest,
      total: "R " + totalAmount,
      pay: payDate,
    },
  };

  newClientArray.push(client);
  displayClientNames();
  addNewClientBox.style.display = "none";
  addNewClient.style.display = "block";
});

function displayClientNames() {
  namePage.innerHTML = "";

  newClientArray.forEach((clientInfo, index) => {
    const clientNameDiv = document.createElement("div");
    const clientNameSpan = document.createElement("span");
    namePage.appendChild(clientNameDiv);
    clientNameDiv.appendChild(clientNameSpan);
    clientNameSpan.textContent = clientInfo.name.clientname;
    clientNameDiv.addEventListener("click", () => {
      thead.innerHTML = "";
      tbody.innerHTML = "";
      lastClickedClient = newClientArray[index];
      const tableHeadRow = document.createElement("tr");
      thead.appendChild(tableHeadRow);
      Object.values(clientInfo.header).forEach((headText) => {
        const th = document.createElement("th");
        tableHeadRow.appendChild(th);
        th.textContent = headText;
      });

      const tableBodyRow = document.createElement("tr");
      tbody.appendChild(tableBodyRow);
      Object.values(clientInfo.body).forEach((bodyData) => {
        const td = document.createElement("td");
        tableBodyRow.appendChild(td);
        td.textContent = bodyData;
      });
      clientDetails.style.display = "block";
      addNewClient.style.display = "none";
      namePage.style.display = "none";
    });
  });
}

const selectPaymentType = document.getElementById("select-payment-type");
const interestPaid = document.getElementById("interest-paid");
const selectOptionBox = document.getElementById("select-option-box");

selectPaymentType.addEventListener("click", () => {
  if (selectPaymentType.value === "full-loan") {
    const fullLoan = document.getElementById("full-loan");
    fullLoan.style.display = "block";
    selectOptionBox.style.display = "block";
  } else if (selectPaymentType.value === "interest-paid") {
    interestPaid.style.display = "block";
    selectOptionBox.style.display = "block";
  } else if (selectPaymentType.value === "specific-amount") {
    selectOptionBox.style.display = "block";
    const specificAmountBox = document.getElementById("specific-amount-box");
    specificAmountBox.style.display = "block";
  } else if (selectPaymentType.value === "no-payment-received") {
    selectOptionBox.style.display = "block";
  }
});

const submitUpdate = document.getElementById("submit-update");
submitUpdate.style.display = "none";
submitUpdate.addEventListener("click", (event) => {
  event.preventDefault();
  const clientHeaderObjact = Object.keys(lastClickedClient.header).length;
  paymentUpdate.style.display = "none";
  if (selectPaymentType.value === "full-loan" && lastClickedClient !== null) {
    const fullLoan = document.getElementById("full-loan");
    fullLoan.style.display = "block";
    lastClickedClient.header.paid = "Paid";
    lastClickedClient.body.paidInFull = "In Full";
    thead.innerHTML = "";
    tbody.innerHTML = "";
    selectOptionBox.style.display = "block";
  } else if (
    selectPaymentType.value === "interest-paid" &&
    lastClickedClient !== null
  ) {
    console.log(lastClickedClient.body.interest);
    lastClickedClient.header.Paid = "Paid";
    lastClickedClient.body.paid = "Interest";
    lastClickedClient.header.reason = "Reason";
    const reasonInput = document.getElementById("reason-input").value;
    lastClickedClient.body.reason = reasonInput;
    interestPaid.style.display = "block";
    console.log(lastClickedClient);
    thead.innerHTML = "";
    tbody.innerHTML = "";
    selectOptionBox.style.display = "block";
  } else if (
    selectPaymentType.value === "specific-amount" &&
    lastClickedClient !== null
  ) {
    const reasonForSpecificAmount = document.getElementById(
      "reason-for-specific-amount"
    ).value;
    const specificAmountInput = document.getElementById(
      "specific-amount-input"
    ).value;
    lastClickedClient.header.paid = "Paid";
    lastClickedClient.body.paid = specificAmountInput;
    lastClickedClient.header.reason = "Reason";
    lastClickedClient.body.reason = reasonForSpecificAmount;
    thead.innerHTML = "";
    tbody.innerHTML = "";
    selectOptionBox.style.display = "block";
  } else if (
    selectPaymentType.value === "no-payment-received" &&
    lastClickedClient !== null
  ) {
    selectOptionBox.style.display = "block";
  }

  namePage.style.display = "block";
  selectOptionBox.style.display = "none";
  updateClientInfo.style.display = "block";
  addNewClient.style.display = "block";
});

if (selectPaymentType.value === null) {
  submitUpdate.style.display = "none";
} else {
  submitUpdate.style.display = "block";
}
