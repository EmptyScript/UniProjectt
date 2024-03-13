// const Web3 = require('web3');
// const web3 = new Web3('https://cdn.jsdelivr.net/npm/web3@1.5.2/dist/web3.min.js');
// Initialize Web3.js
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            window.ethereum.enable();
        } else {
            alert("Please install MetaMask to use this dApp!");
        }

        // Set your contract address and ABI
        const contractAddress = '0x4BFF2F662c7A57C281a53dC521F7A706bf7f0098'; // Replace with actual contract address
        const abi = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "email",
				"type": "string"
			}
		],
		"name": "AdminLoggedIn",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "email",
				"type": "string"
			}
		],
		"name": "AdminRegistered",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_email",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_password",
				"type": "string"
			}
		],
		"name": "loginAdmin",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_email",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_password",
				"type": "string"
			}
		],
		"name": "registerAdmin",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];
        const contract = new web3.eth.Contract(abi, contractAddress);

        // Function to handle admin registration
        document.getElementById("registerForm").addEventListener("submit", async function(event) {
            event.preventDefault(); // Prevent form submission

            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            try {
                await contract.methods.registerAdmin(email, password).send({ from: window.ethereum.selectedAddress });
                alert("Admin registered successfully!");
                window.location.href = "admin_homepage.html";
            } catch (error) {
                console.error(error);
                alert("Failed to register admin!");
            }
        });

        // Function to handle admin login
        document.getElementById("loginForm").addEventListener("submit", async function(event) {
            event.preventDefault(); // Prevent form submission

            const email = document.getElementById("loginEmail").value;
            const password = document.getElementById("loginPassword").value;

            try {
                 await contract.methods.loginAdmin(email, password).call({ from: window.ethereum.selectedAddress});
                 alert("Login successful!");
                 window.location.href = "admin_homepage.html";

                }
            catch (error) {
                console.error(error);
                alert("Login failed. Please try again later.");
            }
        });
