// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract ResQ {
    struct Beneficiary {
        string did;
        string uid;
        uint256 fundsReceived;
    }

    struct Donor {
        string did;
        string aadhaar;
        uint256 balance;
    }

    mapping(address => Beneficiary) public beneficiaries;
    mapping(address => Donor) public donors;

    event BeneficiaryRegistered(
        address indexed beneficiary,
        string did,
        string uid
    );
    event DonorRegistered(address indexed donor, string did, string aadhaar);
    event FundsDisbursed(address indexed beneficiary, uint256 amount);
    event DonationReceived(address indexed donor, uint256 amount); // New event

    modifier onlyAdmin() {
        require(
            msg.sender == address(this),
            "Only admin can call this function"
        );
        _;
    }

    function registerBeneficiary(
        address _beneficiary,
        string memory _did,
        string memory _uid
    ) public {
        require(
            bytes(beneficiaries[_beneficiary].did).length == 0,
            "Already registered as Beneficiary"
        );
        beneficiaries[_beneficiary] = Beneficiary(_did, _uid, 0);
        emit BeneficiaryRegistered(_beneficiary, _did, _uid);
    }

    function registerDonor(
        address _donor,
        string memory _did,
        string memory _aadhaar
    ) public {
        require(bytes(donors[_donor].did).length == 0, "Donor already exists");
        // Initialize balance to 0 when registering
        donors[_donor] = Donor(_did, _aadhaar, 0);
        emit DonorRegistered(_donor, _did, _aadhaar);
    }

    function disburseFunds(address _beneficiary, uint256 _amount) public {
        require(
            bytes(beneficiaries[_beneficiary].did).length != 0,
            "Beneficiary not registered"
        );
        require(
            address(this).balance >= _amount,
            "Insufficient funds in contract"
        );

        beneficiaries[_beneficiary].fundsReceived += _amount;
        payable(_beneficiary).transfer(_amount);
        emit FundsDisbursed(_beneficiary, _amount);
    }

    function getBeneficiaryDetails(
        address _beneficiary
    ) public view returns (Beneficiary memory) {
        return beneficiaries[_beneficiary];
    }

    function getDonorDetails(
        address _donor
    ) public view returns (Donor memory) {
        return donors[_donor];
    }

    // Modified receive function
    receive() external payable {
        require(msg.value > 0, "Deposit amount must be greater than zero");
        require(
            bytes(donors[msg.sender].did).length != 0,
            "Donor not registered"
        );
        donors[msg.sender].balance += msg.value;
        emit DonationReceived(msg.sender, msg.value);
    }
}
