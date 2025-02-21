pragma solidity ^0.8.28;

contract ResQ {
    struct Beneficiary {
        string did; // Decentralized Identity (DID)
        string uid;
        address wallet; // Wallet Address
        uint256 fundsReceived; // Track disbursed funds
    }

    struct Donor {
        string did; // Decentralized Identity (DID)
        string aadhaar; // Aadhaar Number (hashed)
        address wallet; // Wallet Address
        uint256 balance;
    }

    mapping(address => Beneficiary) public beneficiaries;
    mapping(address => Donor) public donors;

    event FundsDisbursed(address indexed beneficiary, uint256 amount);
    event DonorDeposit(address indexed donor, uint256 amount);
    event BeneficiaryRegistered(address indexed wallet, string did);

    address public admin;

    modifier notRegisteredB() {
        require(
            bytes(beneficiaries[msg.sender].did).length == 0,
            "Already registered"
        );
        _;
    }

    modifier notRegisteredD() {
        require(
            bytes(beneficiaries[msg.sender].did).length == 0,
            "Already registered"
        );
        _;
    }

    constructor() {
        admin = msg.sender; // Only admin can register beneficiaries
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    function registerBeneficiary(
        address _wallet,
        string memory _did,
        string memory _uid
    ) public notRegisteredB {
        require(
            beneficiaries[_wallet].wallet == address(0),
            "Beneficiary already exists"
        );

        beneficiaries[_wallet] = Beneficiary({
            did: _did,
            uid: _uid,
            wallet: _wallet,
            fundsReceived: 0
        });

        emit BeneficiaryRegistered(_wallet, _did);
    }

    function registerDonor(
        address _wallet,
        string memory _did,
        string memory _aadhaar
    ) public notRegisteredD {
        require(
            beneficiaries[_wallet].wallet == address(0),
            "Donor already exists"
        );

        donors[_wallet] = Donor({
            did: _did,
            aadhaar: _aadhaar,
            wallet: _wallet,
            balance: 0
        });

        emit BeneficiaryRegistered(_wallet, _did);
    }

    function depositFunds() public payable {
        require(msg.value > 0, "Deposit amount must be greater than zero");
        donors[msg.sender].balance += msg.value;
        emit DonorDeposit(msg.sender, msg.value);
    }

    function disburseFunds(address _wallet, uint256 _amount) public onlyAdmin {
        require(_amount > 0, "Amount must be greater than zero");
        require(
            address(this).balance >= _amount,
            "Insufficient funds in contract"
        );
        require(
            beneficiaries[_wallet].wallet != address(0),
            "Beneficiary not registered"
        );

        payable(_wallet).transfer(_amount);
        beneficiaries[_wallet].fundsReceived += _amount;

        emit FundsDisbursed(_wallet, _amount);
    }

    function getBeneficiaryDetails(
        address _wallet
    ) public view returns (string memory, string memory, uint256) {
        require(
            beneficiaries[_wallet].wallet != address(0),
            "Beneficiary not found"
        );
        return (
            beneficiaries[_wallet].did,
            beneficiaries[_wallet].uid,
            beneficiaries[_wallet].fundsReceived
        );
    }

    function getDonorDetails(
        address _wallet
    ) public view returns (string memory, string memory, uint256) {
        require(donors[_wallet].wallet != address(0), "Beneficiary not found");
        return (
            donors[_wallet].did,
            donors[_wallet].aadhaar,
            donors[_wallet].balance
        );
    }

    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
