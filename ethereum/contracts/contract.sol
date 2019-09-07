pragma solidity ^0.5;

contract StepmotorContract {

    string productrequest_epc; 
        
    string productdelivery_epc; 
    
    address payable owner;

    address payable buyer; 

    uint256 public bid;

    bool private _accepted_by_owner; 

    constructor(string memory pepc) public {
        owner  = address(0x7C1fceaa36036A7f9c90842D28DbE4FCc453F65a); 
        productrequest_epc = pepc; 
        _accepted_by_owner = false;
    }

    function placeBid() public payable {
        if (! _accepted_by_owner) {
            buyer = msg.sender; 
            bid = 1000000000000000000;
        }
    }

    function accept() public {
        if (msg.sender == owner) {
        
        } else {
            revert("Only contract owner can call this function.") ;  
        }
    }

    function commissionedProduct(string memory epc) public {
        if (msg.sender == buyer) {
            productdelivery_epc = epc;
        } else {
            revert("Only buyer can set the commissionedProduct");
        }
    }

    function finalize() public {
        if (msg.sender == owner) {
            owner.transfer(bid);

	    // Uncomment next line to selfdestruct contract and send 
            // remaining Ethers back to the owner.
            // Warning: if contract selfdestructs, it's no longer callable
            // (even not possible to get balances etc.)
            // selfdestruct(owner);
        }
    }

    function getCommissionedProduct() public returns (string memory) {
        return productdelivery_epc;
    }

    function getAccepted() public returns (bool) {
        return _accepted_by_owner;
    }

    function getBid() public returns (uint) {
        return bid;
    }

    function getBuyer() public returns (address) {
        return buyer;
    }
}
