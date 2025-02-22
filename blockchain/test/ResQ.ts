import { expect } from "chai";
import { ethers } from "hardhat";
import { parseEther } from "ethers";

describe("ResQ", function () {
  let ResQ: any;
  let resQ: any;
  let admin: any;
  let donor: any;
  let beneficiary: any;
  let addr1: any;

  beforeEach(async function () {
    // Get the contract and signers
    ResQ = await ethers.getContractFactory("ResQ");
    [admin, donor, beneficiary, addr1] = await ethers.getSigners();

    // Deploy the contract
    resQ = await ResQ.deploy();
  });

  describe("Beneficiary Registration", function () {
    it("Should register a beneficiary", async function () {
      const _did = "did:example:beneficiary1";
      const _uid = "UID12345";

      await resQ.registerBeneficiary(beneficiary.address, _did, _uid);

      const { did, uid, fundsReceived } = await resQ.getBeneficiaryDetails(
        beneficiary.address
      );
      expect(did).to.equal(_did);
      expect(uid).to.equal(_uid);
      expect(fundsReceived).to.equal(0);
    });

    it("Should revert if already registered as a beneficiary", async function () {
      const _did = "did:example:beneficiary1";
      const _uid = "UID12345";

      await resQ.registerBeneficiary(beneficiary.address, _did, _uid);

      await expect(
        resQ.registerBeneficiary(beneficiary.address, _did, _uid)
      ).to.be.revertedWith("Already registered as Beneficiary");
    });
  });

  describe("Donor Registration and Fund Deposit", function () {
    it("Should register a donor and deposit funds", async function () {
      const _did = "did:example:donor1";
      const _aadhaar = "Aadhaar123";

      await resQ.registerDonor(donor.address, _did, _aadhaar);

      const { did, aadhaar, balance } = await resQ.getDonorDetails(
        donor.address
      );
      expect(did).to.equal(_did);
      expect(aadhaar).to.equal(_aadhaar);
      expect(balance).to.equal(0);

      const depositAmount = parseEther("10");
      await donor.sendTransaction({
        to: resQ.address,
        value: depositAmount,
      });

      const updatedDonor = await resQ.getDonorDetails(donor.address);
      expect(updatedDonor.balance).to.equal(depositAmount);
    });

    it("Should revert if already registered as a donor", async function () {
      const _did = "did:example:donor1";
      const _aadhaar = "Aadhaar123";

      await resQ.registerDonor(donor.address, _did, _aadhaar);

      await expect(
        resQ.registerDonor(donor.address, _did, _aadhaar)
      ).to.be.revertedWith("Donor already exists");
    });

    it("Should revert if deposit amount is zero", async function () {
      await expect(
        donor.sendTransaction({
          to: resQ.address,
          value: 0,
        })
      ).to.be.revertedWith("Deposit amount must be greater than zero");
    });
  });

  describe("Fund Disbursement", function () {
    it("Should disburse funds to a registered beneficiary", async function () {
      const _did = "did:example:beneficiary1";
      const _uid = "UID12345";
      await resQ.registerBeneficiary(beneficiary.address, _did, _uid);

      const depositAmount = parseEther("10");
      await donor.sendTransaction({
        to: resQ.address,
        value: depositAmount,
      });

      const disburseAmount = parseEther("5");
      await resQ.disburseFunds(beneficiary.address, disburseAmount);

      const beneficiaryDetails = await resQ.getBeneficiaryDetails(
        beneficiary.address
      );
      expect(beneficiaryDetails.fundsReceived).to.equal(disburseAmount);

      const contractBalance = await ethers.provider.getBalance(resQ.address);
      expect(contractBalance).to.equal(depositAmount - disburseAmount);
    });

    it("Should revert if trying to disburse funds to an unregistered beneficiary", async function () {
      const disburseAmount = parseEther("5");
      await expect(
        resQ.disburseFunds(beneficiary.address, disburseAmount)
      ).to.be.revertedWith("Beneficiary not registered");
    });

    it("Should revert if insufficient funds in the contract", async function () {
      const _did = "did:example:beneficiary1";
      const _uid = "UID12345";
      await resQ.registerBeneficiary(beneficiary.address, _did, _uid);

      const disburseAmount = parseEther("5");
      await expect(
        resQ.disburseFunds(beneficiary.address, disburseAmount)
      ).to.be.revertedWith("Insufficient funds in contract");
    });
  });

  describe("Edge Case Scenarios", function () {
    it("Should allow multiple donors to deposit funds", async function () {
      const depositAmount1 = parseEther("10");
      const depositAmount2 = parseEther("20");

      await donor.sendTransaction({
        to: resQ.address,
        value: depositAmount1,
      });

      await addr1.sendTransaction({
        to: resQ.address,
        value: depositAmount2,
      });

      const donorDetails = await resQ.getDonorDetails(donor.address);
      const addr1Details = await resQ.getDonorDetails(addr1.address);

      expect(donorDetails.balance).to.equal(depositAmount1);
      expect(addr1Details.balance).to.equal(depositAmount2);
    });

    it("Should revert if disburse amount exceeds contract balance", async function () {
      const _did = "did:example:beneficiary1";
      const _uid = "UID12345";
      await resQ.registerBeneficiary(beneficiary.address, _did, _uid);

      const depositAmount = parseEther("10");
      await donor.sendTransaction({
        to: resQ.address,
        value: depositAmount,
      });

      const disburseAmount = parseEther("20");
      await expect(
        resQ.disburseFunds(beneficiary.address, disburseAmount)
      ).to.be.revertedWith("Insufficient funds in contract");
    });
  });
});
