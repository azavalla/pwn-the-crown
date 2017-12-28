pragma solidity ^0.4.11;


import "./Heritable.sol";


contract Crown is Heritable(12 hours) {
    uint public lastBid;
    uint public lastRoyalBid;
    uint public currentKingRulingStartDate;


    function Crown() public payable {
        // Bidding starts at 0.1 ether
        lastBid = 0.1 ether;
        lastRoyalBid = 0.1 ether;
        currentKingRulingStartDate = now;
    }

    // Has he gone mad, the king can open the castle vaults,
    // take all the gold and flee, leaving the kingdom reduced to rubble.
    function openVaultsAndFlee() external onlyOwner {
        require(kingIsMad());
        selfdestruct(owner);
    }

    function claimCrown() public payable {
        require(msg.sender != owner);
        require(msg.sender != heir);
        require(msg.value >= lastBid + lastBid * 10/100);
        owner.transfer(lastBid + lastBid * 5/100);
        
        heir = owner;
        owner = msg.sender;
        lastBid = msg.value;
        currentKingRulingStartDate = now;
        heartbeat();
    }

    function heirClaimCrown() public payable onlyHeir {
        require(ownerLives());
        require(msg.value >= lastRoyalBid + lastRoyalBid * 10/100);
        proclaimDeath();
    }

    function kingDefendCrown() public payable onlyOwner {
        require(!ownerLives());
        require(msg.value >= lastRoyalBid + lastRoyalBid * 10/100);
        heartbeat();
    }

    function kingIsInDanger() public view returns (bool) {
        return !ownerLives();
    }

    function getCurrentPrize() public view returns (uint) {
        return this.balance;
    }

    // Be careful, leading a kingdom can drive you insane.
    function kingIsMad() public view returns (bool) {
        return now - currentKingRulingStartDate >= 10 days;
    }

    // NO-OPs
    // what is the best way to no-op an inherited method?
    function setHeir(address) public {}
}
