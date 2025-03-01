let accounts = [];

document.getElementById('accountForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const accountName = document.getElementById('accountName').value;
    const accountType = document.getElementById('accountType').value;

    const newAccount = {
        name: accountName,
        type: accountType,
        balance: 0
    };

    accounts.push(newAccount);
    updateAccountList();
    document.getElementById('accountForm').reset();
});

function updateAccountList() {
    const accountList = document.getElementById('accounts');
    const accountSelect = document.getElementById('accountSelect');
    accountList.innerHTML = '';
    accountSelect.innerHTML = '';

    accounts.forEach((account, index) => {
        const li = document.createElement('li');
        li.textContent = `${account.name} (${account.type}) - Balance: $${account.balance}`;
        accountList.appendChild(li);

        const option = document.createElement('option');
        option.value = index;
        option.textContent = account.name;
        accountSelect.appendChild(option);
    });

    document.getElementById('accountActions').classList.remove('hidden');
}

document.getElementById('depositBtn').addEventListener('click', function() {
    const index = document.getElementById('accountSelect').value;
    const amount = parseFloat(document.getElementById('amount').value);
    if (index !== '' && !isNaN(amount) && amount > 0) {
        accounts[index].balance += amount;
        updateAccountList();
        document.getElementById('amount').value = '';
    } else {
        alert("Please enter a valid amount to deposit.");
    }
});

document.getElementById('withdrawBtn').addEventListener('click', function() {
    const index = document.getElementById('accountSelect').value;
    const amount = parseFloat(document.getElementById('amount').value);
    if (index !== '' && !isNaN(amount) && amount > 0) {
        if (accounts[index].balance >= amount) {
            accounts[index].balance -= amount;
            updateAccountList();
            document.getElementById('amount').value = '';
        } else {
            alert("Insufficient funds.");
        }
    } else {
        alert("Please enter a valid amount to withdraw.");
    }
});

document.getElementById('deleteBtn').addEventListener('click', function() {
    const index = document.getElementById('accountSelect').value;
    if (index !== '') {
        accounts.splice(index, 1);
        updateAccountList();
        document.getElementById('amount').value = '';
    } else {
        alert("Please select an account to delete.");
    }
});
